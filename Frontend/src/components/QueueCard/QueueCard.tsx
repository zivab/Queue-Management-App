import React from 'react';
import {
  useDeleteQueueMutation,
  useFetchNextMessageMutation,
} from '../../services/api';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Trash, LoaderCircle } from 'lucide-react';

interface Queue {
  uuid: string;
  queueName: string;
  messageCount: number;
  createdAt: string;
}

interface QueueCardProps {
  queue: Queue;
}

const QueueCard: React.FC<QueueCardProps> = ({ queue }) => {
  const [deleteQueue] = useDeleteQueueMutation();
  const [fetchNextMessage, { data: nextMessage, isLoading: messageLoading }] =
    useFetchNextMessageMutation();

  const handleDelete = async () => {
    try {
      await deleteQueue(queue.queueName);
    } catch (error) {
      console.error('Error deleting queue:', error);
    }
  };

  const handleFetchNextMessage = () => {
    fetchNextMessage(queue.queueName);
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 text-gray-500/90'>
            <div className='text-sm text-gray-500/80 dark:text-gray-400/80'>
              Queue Name:
            </div>
            <CardTitle className='text-gray-600 text-sm dark:text-slate-400 break-all'>
              {queue.queueName}
            </CardTitle>
          </div>
          <div className='flex gap-1 text-sm'>
            <div className='text-gray-500/80 dark:text-gray-400/80'>
              Messages In Queue:
            </div>
            <div className='text-sm dark:text-slate-400'>
              {queue.messageCount}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='break-all'>
        {nextMessage?.message && (
          <p className='mt-2 text-sm text-gray-500/80 dark:text-gray-400/80'>
            Message:
            <span className='text-gray-600 dark:text-slate-400 ml-2 font-normal text-sm'>
              {nextMessage.message}
            </span>
          </p>
        )}
        {messageLoading && (
          <div className='flex flex-col items-center text-center justify-center gap-2'>
            <LoaderCircle className='animate-spin text-[#6d28d9]' />
            <p className='text-gray-600/70 dark:text-gray-400/80'>Loading...</p>
          </div>
        )}
        {queue.messageCount === 0 && !messageLoading && (
          <p className='mt-2 text-gray-500/80 dark:text-slate-400/80 font-normal text-sm'>
            <span className='text-gray-600 dark:text-slate-400  font-normal text-sm'>
              There are no more messages in the queue.
            </span>
          </p>
        )}
        <p className='text-xs text-gray-500/80 mt-2 dark:text-slate-400'>
          Created at: {new Date(queue.createdAt).toLocaleString()}
        </p>
        <p className='text-xs text-gray-500/80 dark:text-slate-400'>
          UUID: {queue.uuid}
        </p>

        {}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={handleFetchNextMessage} variant='default'>
          Fetch Next Message
        </Button>
        <Button
          onClick={handleDelete}
          variant='outline'
          className='flex items-center gap-2'
        >
          <Trash className='h-[1rem] w-[1rem]' />
          <div>Delete Queue</div>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QueueCard;
