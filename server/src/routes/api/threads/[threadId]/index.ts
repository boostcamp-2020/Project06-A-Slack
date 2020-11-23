import express from 'express';
import * as threadIdController from './threadId.controller';

const router = express.Router({ mergeParams: true });

router.get('/', threadIdController.getThread);
router.post('/', threadIdController.modifyThread);
router.delete('/', threadIdController.deleteThread);
router.post('/pin', threadIdController.pinThread);

export default router;
