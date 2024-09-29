import React from 'react';
import QueueCard from '../QueueCard/QueueCard';

interface Queue {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface QueueListProps {
  queues: Queue[];
}

const QueueList: React.FC<QueueListProps> = ({ queues }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12'>
      {queues.map((queue) => (
        <QueueCard key={queue.id} queue={queue} />
      ))}
    </div>
  );
};

export default QueueList;
