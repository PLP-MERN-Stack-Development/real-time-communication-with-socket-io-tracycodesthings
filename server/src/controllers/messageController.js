const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all messages for a conversation
// @route   GET /api/messages/:conversationId
// @access  Public
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ conversationId: req.params.conversationId })
    .sort({ createdAt: 1 })
    .select('-__v');
  res.json(messages);
});

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { conversationId, sender, content, messageType } = req.body;
  
  if (!conversationId || !sender || !content) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  const message = await Message.create({
    conversationId,
    sender,
    content,
    messageType: messageType || 'text',
  });
  
  res.status(201).json(message);
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Public
const markAsRead = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  const message = await Message.findById(req.params.id);
  
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  
  if (!message.readBy.includes(userId)) {
    message.readBy.push(userId);
    await message.save();
  }
  
  res.json(message);
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Public
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  
  await message.deleteOne();
  res.json({ message: 'Message removed' });
});

module.exports = {
  getMessages,
  createMessage,
  markAsRead,
  deleteMessage,
};