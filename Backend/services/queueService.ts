import { v4 as uuidv4 } from 'uuid';

interface QueueData {
  messages: string[];
  createdAt: string;
  uuid: string;
}

interface QueueDetails {
  queueName: string;
  messageCount: number;
  createdAt: string;
  uuid: string;
}

const queues: Map<string, QueueData> = new Map();

class QueueService {
  static async getAllQueuesDetails(): Promise<QueueDetails[]> {
    return Array.from(queues.entries()).map(([queueName, queue]) => ({
      queueName,
      messageCount: queue.messages.length,
      createdAt: queue.createdAt,
      uuid: queue.uuid,
    }));
  }

  static async addMessageToQueue(
    queueName: string,
    message: string
  ): Promise<boolean> {
    let queue = queues.get(queueName);
    const isNewQueue = !queue;

    if (!queue) {
      const now = new Date();
      now.setHours(now.getHours() + 3); // Adjust to GMT+3
      queue = {
        messages: [],
        createdAt: now.toISOString(),
        uuid: uuidv4(),
      };
      queues.set(queueName, queue);
    }

    queue.messages.push(message);
    return isNewQueue;
  }

  static async getNextMessage(
    queueName: string,
    timeout: number
  ): Promise<{
    message: string | null;
    status: 'success' | 'queue_empty' | 'queue_not_found';
  }> {
    const queue = queues.get(queueName);

    if (!queue) {
      return { message: null, status: 'queue_not_found' };
    }

    if (queue.messages.length === 0) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ message: null, status: 'queue_empty' }),
          timeout
        );
      });
    }

    return { message: queue.messages.shift() || null, status: 'success' };
  }

  static async queueExists(queueName: string): Promise<boolean> {
    return queues.has(queueName);
  }

  static async deleteQueue(queueName: string): Promise<void> {
    queues.delete(queueName);
  }
}

export default QueueService;
