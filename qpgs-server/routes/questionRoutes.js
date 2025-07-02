const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Add Question Route
router.post('/add-question', async (req, res) => {
    const { question_text, marks, module, subject, difficulty_level, CO, PO, BL } = req.body;

    if (!question_text || !marks || !module || !subject || !difficulty_level || !CO || !PO || !BL) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newQuestion = new Question({
        question_text,
        marks,
        module,
        subject,
        difficulty_level,
        CO,
        PO,
        BL
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully.' });
});

module.exports = router;
