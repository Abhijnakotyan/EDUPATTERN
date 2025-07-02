const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question_text: { type: String, required: true },
    marks: { type: Number, required: true },
    module: { type: Number, required: true },
    subject: { type: String, required: true },
    difficulty_level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    CO: { type: String, required: true },
    PO: { type: String, required: true },
    BL: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
