const express = require('express');
const Patterns = require('../models/Patterns'); 

const router = express.Router();

// Add Pattern Route
router.post('/add-pattern', async (req, res) => {
    const { pattern_name, marks_distribution, sub_questions, total_marks } = req.body;

    if (!pattern_name || !marks_distribution || !total_marks) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPattern = new Patterns({
        pattern_name,
        marks_distribution,
        sub_questions,
        total_marks
    });

    await newPattern.save();
    res.status(201).json({ message: 'Pattern added successfully.' });
});

// Get All Patterns Route
router.get('/get-patterns', async (req, res) => {
    const patterns = await Patterns.find();
    res.status(200).json(patterns);
});

module.exports = router;
