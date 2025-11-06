const Conversation = require('../models/Conversation');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all conversations for a user
// @route   GET /api/conversations/:userId
// @access  Public
const getUserConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.params.userId,
  })
    .sort({ lastMessageTime: -1 })
    .select('-__v');
  res.json(conversations);
});

// @desc    Get conversation by ID
// @route   GET /api/conversations/detail/:id
// @access  Public
const getConversationById = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id).select('-__v');
  
  if (!conversation) {
    res.status(404);
    throw new Error('Conversation not found');
  }
  
  res.json(conversation);
});

// @desc    Create new conversation
// @route   POST /api/conversations
// @access  Public
const createConversation = asyncHandler(async (req, res) => {
  const { participants, type } = req.body;
  
  if (!participants || participants.length < 2) {
    res.status(400);
    throw new Error('At least 2 participants required');
  }
  
  // Check if conversation already exists between these participants
  if (type === 'private') {
    const existingConversation = await Conversation.findOne({
      type: 'private',
      participants: { $all: participants, $size: participants.length },
    });
    
    if (existingConversation) {
      return res.json(existingConversation);
    }
  }
  
  const conversation = await Conversation.create({
    participants,
    type: type || 'private',
  });
  
  res.status(201).json(conversation);
});

// @desc    Update conversation
// @route   PUT /api/conversations/:id
// @access  Public
const updateConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  
  if (!conversation) {
    res.status(404);
    throw new Error('Conversation not found');
  }
  
  const updatedConversation = await Conversation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json(updatedConversation);
});

// @desc    Delete conversation
// @route   DELETE /api/conversations/:id
// @access  Public
const deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  
  if (!conversation) {
    res.status(404);
    throw new Error('Conversation not found');
  }
  
  await conversation.deleteOne();
  res.json({ message: 'Conversation removed' });
});

module.exports = {
  getUserConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation,
};