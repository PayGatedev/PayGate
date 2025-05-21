import express from 'express';
import {
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    AbortMultipartUploadCommand,
    ListPartsCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '../aws/s3';

const router = express.Router();

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

const checkEnvVariables = () => {
    if (!BUCKET_NAME) {
        console.error("S3_BUCKET_NAME environment variable is missing");
        return false;
    }
    if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        console.error("Not set environment variables");
        return false;
    }
    return true;
};

router.post('/start-upload', async (req, res) => {
    if (!checkEnvVariables()) return res.status(500).json({ error: 'Server configuration error for S3.' });

    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
        return res.status(400).json({ error: 'fileName and fileType are required.' });
    }

    const safeFileName = String(fileName).replace(/[^a-zA-Z0-9_.\-\/]/g, '_');
    const key = `uploads/${Date.now()}_${safeFileName}`;

    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: fileType,
    };

    try {
        const command = new CreateMultipartUploadCommand(params);
        const multipartUpload = await s3Client.send(command);
        console.log(`Multipart upload initiated for key: ${multipartUpload.Key}, UploadId: ${multipartUpload.UploadId}`);
        res.json({
            uploadId: multipartUpload.UploadId,
            key: multipartUpload.Key,
        });
    } catch (error: any) {
        console.error('Error initiating multipart upload:', error);
        res.status(500).json({ error: 'Failed to initiate multipart upload', details: error.message });
    }
});

router.post('/get-upload-urls', async (req, res) => {
    if (!checkEnvVariables()) return res.status(500).json({ error: 'Server configuration error for S3.' });

    const { key, uploadId, partsCount } = req.body;

    if (!key || !uploadId || !partsCount) {
        return res.status(400).json({ error: 'key, uploadId, partsCount are required.' });
    }

    const urls = [];
    try {
        for (let i = 1; i <= partsCount; i++) {
            const params = {
                Bucket: BUCKET_NAME,
                Key: key,
                UploadId: uploadId,
                PartNumber: i,
            };
            const command = new UploadPartCommand(params);
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            urls.push({ partNumber: i, signedUrl });
        }
        console.log(`Generated ${urls.length} pre-signed URLs for UploadId: ${uploadId}, Key: ${key}`);
        res.json({ urls });
    } catch (error: any) {
        console.error('Error generating pre-signed URLs:', error);
        res.status(500).json({ error: 'Failed to generate pre-signed URLs', details: error.message  });
    }
});

router.post('/complete-upload', async (req, res) => {
    if (!checkEnvVariables()) return res.status(500).json({ error: 'Server configuration error for S3.' });

    const { key, uploadId, parts } = req.body;

    if (!key || !uploadId || !Array.isArray(parts) || parts.length === 0) {
        return res.status(400).json({ error: 'key, uploadId, and a non-empty parts array are required.' });
    }

    const sortedParts = parts
        .filter(part => part.ETag && typeof part.PartNumber === 'number')
        .sort((a, b) => a.PartNumber - b.PartNumber);

    if (sortedParts.length !== parts.length) {
        return res.status(400).json({ error: 'Invalid parts array. Each part must have ETag and PartNumber.' });
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: sortedParts,
        },
    };

    try {
        const command = new CompleteMultipartUploadCommand(params);
        const result = await s3Client.send(command);
        console.log(`Multipart upload completed for Key: ${result.Key}, Location: ${result.Location}`);
        res.json({
            message: 'Upload completed successfully!',
            location: result.Location,
            bucket: result.Bucket,
            key: result.Key,
            eTag: result.ETag
        });
    } catch (error: any) {
        console.error('Error completing multipart upload:', error);
        res.status(500).json({ error: 'Failed to complete multipart upload', details: error.message });
    }
});

router.post('/abort-upload', async (req, res) => {
    if (!checkEnvVariables()) return res.status(500).json({ error: 'Server configuration error for S3.' });

    const { key, uploadId } = req.body;

    if (!key || !uploadId) {
        return res.status(400).json({ error: 'key and uploadId are required.' });
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        UploadId: uploadId,
    };

    try {
        const command = new AbortMultipartUploadCommand(params);
        await s3Client.send(command);
        console.log(`Multipart upload aborted for Key: ${key}, UploadId: ${uploadId}`);
        res.json({ message: 'Multipart upload aborted successfully.' });
    } catch (error: any) {
        console.error('Error aborting multipart upload:', error);
        res.status(500).json({ error: 'Failed to abort multipart upload', details: error.message });
    }
});

router.get('/list-parts', async (req, res) => {
    if (!checkEnvVariables()) return res.status(500).json({ error: 'Server configuration error for S3.' });

    const { key, uploadId } = req.query;

    const s3Key = typeof key === 'string' ? key : undefined;
    const s3UploadId = typeof uploadId === 'string' ? uploadId : undefined;

    if (!s3Key || !s3UploadId) {
        return res.status(400).json({ error: 'key and uploadId query parameters are required and must be strings.' });
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: s3Key,
        UploadId: s3UploadId,
    };

    try {
        const command = new ListPartsCommand(params);
        const data = await s3Client.send(command);
        console.log(`Listed parts for UploadId: ${s3UploadId}, Key: ${s3Key}`);
        res.json({
            parts: data.Parts || [],
            isTruncated: data.IsTruncated,
            nextPartNumberMarker: data.NextPartNumberMarker,
        });
    } catch (error: any) {
        console.error('Error listing parts:', error);
        res.status(500).json({ error: 'Failed to list parts', details: error.message });
    }
});

export {router as s3UploadRouter};