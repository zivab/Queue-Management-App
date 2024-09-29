import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetQueuesQuery, useAddMessageMutation } from '@/services/api';

export function AddMessageButton() {
  const [open, setOpen] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState('');
  const [message, setMessage] = useState('');
  const { data: { data: queues } = {} } = useGetQueuesQuery();
  const [addMessage] = useAddMessageMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedQueue && message) {
      try {
        await addMessage({ queueId: selectedQueue, message }).unwrap();
        setOpen(false);
        setSelectedQueue('');
        setMessage('');
      } catch (error) {
        console.error('Error adding message:', error);
      }
    }
  };

  const handleQueueSelect = (value: string) => {
    setSelectedQueue(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Add a new message</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='font-semibold'>Add a new message to the queue</div>
          <DialogDescription>
            Please select a queue and add a message to it
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='queue' className='text-right'>
                Queue
              </Label>
              <Select onValueChange={handleQueueSelect} value={selectedQueue}>
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Select a queue' />
                </SelectTrigger>
                <SelectContent>
                  {queues?.map((queue) => (
                    <SelectItem key={queue.uuid} value={queue.queueName}>
                      {queue.queueName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='message' className='text-right'>
                Message
              </Label>
              <Textarea
                id='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='col-span-3'
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Add message</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
