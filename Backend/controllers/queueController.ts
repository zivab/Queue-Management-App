import { Request, Response } from 'express';
import QueueService from '../services/queueService';

export const getQueuesDetails = async (_req: Request, res: Response) => {
  try {
    const queuesDetails = await QueueService.getAllQueuesDetails();
    res.status(200).json({
      status: queuesDetails.length === 0 ? 'No Data' : 'success',
      data: queuesDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      details: 'Internal server error',
    });
  }
};

export const addMessageToQueue = async (req: Request, res: Response) => {
  const { queue_name: queueName } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      status: 'error',
      details:
        'The message property is missing in the request body. Please provide a message to create a new queue or add a new message to the existing queue.',
    });
  }

  try {
    const isNewQueue = await QueueService.addMessageToQueue(queueName, message);
    res.status(201).json({
      status: 'success',
      details: isNewQueue
        ? `A new queue ${queueName} was created`
        : `Message added to existing queue ${queueName}`,
      message,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNextMessage = async (req: Request, res: Response) => {
  const { queue_name: queueName } = req.params;
  const timeout = req.query.timeout
    ? parseInt(req.query.timeout as string)
    : parseInt(process.env.TIMEOUT || '10000');

  try {
    const result = await QueueService.getNextMessage(queueName, timeout);

    switch (result.status) {
      case 'success':
        res.status(200).json({ status: 'success', message: result.message });
        break;
      case 'queue_empty':
        res.status(204).json({
          status: 'No Content',
          details: `Queue ${queueName} exists but has no more messages`,
        });
        break;
      case 'queue_not_found':
        res.status(404).json({
          status: 'Not Found',
          details: `Queue ${queueName} does not exist`,
        });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteQueue = async (req: Request, res: Response) => {
  const { queue_name: queueName } = req.params;

  try {
    const queueExists = await QueueService.queueExists(queueName);

    if (!queueExists) {
      return res.status(404).json({
        status: 'error',
        details: `Queue ${queueName} does not exist`,
      });
    }

    await QueueService.deleteQueue(queueName);
    res.status(200).json({
      status: 'success',
      details: `Queue ${queueName} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
