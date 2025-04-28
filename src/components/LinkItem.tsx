import React from 'react';

interface LinkItemProps {
  label: string;
  url: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ label, url }) => {
  return (
    <a href={url} className="text-blue-500 hover:underline">
      {label}
    </a>
  );
};

export default LinkItem;
