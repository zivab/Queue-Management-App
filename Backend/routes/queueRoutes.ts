import express from 'express';
import {
  getQueuesDetails,
  addMessageToQueue,
  getNextMessage,
  deleteQueue,
} from '../controllers/queueController';

const router = express.Router();

router.get('/queues_details', getQueuesDetails);
router.route('/queues/:queue_name').get(getNextMessage).post(addMessageToQueue);
router.delete('/queues/:queue_name', deleteQueue);

export default router;
