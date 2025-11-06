const express = require('express');
const router = express.Router();
const {
  getMessages,
  createMessage,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');

router.route('/').post(createMessage);
router.route('/:conversationId').get(getMessages);
router.route('/:id/read').put(markAsRead);
router.route('/:id').delete(deleteMessage);

module.exports = router;