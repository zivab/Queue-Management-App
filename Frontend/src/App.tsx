import React from 'react';
import { useGetQueuesQuery } from './services/api';
import QueueList from './components/QueueList/QueueList';
import AddQueueButton from './components/AddQueueButton/AddQueueButton';
import { ModeToggle } from './components/ui/modeToggle';
import { AddMessageButton } from './components/AddMessageButton/AddMessageButton';

const App: React.FC = () => {
  const {
    data: { data: queues } = {},
    isLoading,
    isError,
  } = useGetQueuesQuery();

  const existingQueues = queues && queues.length > 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading queues</div>;

  return (
    <div className='w-full flex justify-center mt-10'>
      <div className='w-[80%] h-96 p-4'>
        <div>
          <h1 className='text-3xl font-semibold mb-4 font-poppins mt-3 bg-gradient-to-r from-[#2d4d59] dark:from-slate-300/90 to-[#6d28d9] dark:to-[#6d28d9]/80  bg-clip-text text-transparent w-fit'>
            Queue Management Application
          </h1>
          <h2 className='text-lg mb-4 dark:text-slate-400 font-dmSans text-[#003246]'>
            {queues?.length === 0
              ? 'There are no available queues'
              : `Number of available queues: ${queues?.length}`}
          </h2>
          <div className='flex gap-2'>
            <AddQueueButton />
            {existingQueues && <AddMessageButton />}
          </div>
          {existingQueues && <QueueList queues={queues || []} />}
        </div>
      </div>
      <ModeToggle />
    </div>
  );
};

export default App;
