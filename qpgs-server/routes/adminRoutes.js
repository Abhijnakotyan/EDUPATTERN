const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

// Add Subject with Syllabus
router.post('/add-subject', async (req, res) => {
    const { subject_name, modules, syllabus } = req.body;

    if (!subject_name || !modules || !syllabus) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newSubject = new Subject({ subject_name, modules, syllabus });
    await newSubject.save();

    res.status(201).json({ message: 'Subject added successfully.' });
});

// Get All Subjects Route
router.get('/get-subjects', async (req, res) => {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
});

// Delete Subject Route
router.delete('/delete-subject/:id', async (req, res) => {
    const { id } = req.params;

    await Subject.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subject deleted successfully.' });
});

module.exports = router;
