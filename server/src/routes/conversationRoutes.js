const express = require('express');
const router = express.Router();
const {
  getUserConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation,
} = require('../controllers/conversationController');

router.route('/').post(createConversation);
router.route('/:userId').get(getUserConversations);
router.route('/detail/:id').get(getConversationById);
router.route('/:id').put(updateConversation).delete(deleteConversation);

module.exports = router;