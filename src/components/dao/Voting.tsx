import { useState } from 'react'

const Voting = () => {
  const [votes, setVotes] = useState<{ [key: string]: number }>({ idea1: 0, idea2: 0 })

  const handleVote = (idea: string) => {
    setVotes(prev => ({ ...prev, [idea]: prev[idea] + 1 }))
  }

  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="font-bold text-lg mb-2">What should we create next?</h2>
      {Object.entries(votes).map(([idea, count]) => (
        <div key={idea} className="flex items-center justify-between mb-2">
          <span>{idea}</span>
          <button onClick={() => handleVote(idea)} className="bg-indigo-500 text-white px-2 py-1 rounded">
            Vote ({count})
          </button>
        </div>
      ))}
    </div>
  )
}

export default Voting
