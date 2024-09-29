import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddQueueMutation } from '../../services/api';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Queue name is required')
    .max(50, 'Queue name must be at most 50 characters'),
  message: yup
    .string()
    .required('Message is required')
    .max(200, 'Message must be at most 200 characters'),
});

const AddQueueButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addQueue] = useAddQueueMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { name: string; message: string }) => {
    try {
      await addQueue(data).unwrap();
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating queue:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add New Queue</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new queue</DialogTitle>
          <DialogDescription>
            Enter the following fields to create a new queue
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>Queue Name</Label>
              <Input id='name' {...register('name')} />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor='message'>Message</Label>
              <Textarea id='message' {...register('message')} />
              {errors.message && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className='mt-4'>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQueueButton;
