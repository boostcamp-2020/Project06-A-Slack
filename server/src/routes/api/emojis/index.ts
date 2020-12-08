import express from 'express';
import * as emojiController from './emojis.controllers';

const router = express.Router();

router.get('/', emojiController.getEmojiList);
router.post('/', emojiController.createEmoji);

export default router;
