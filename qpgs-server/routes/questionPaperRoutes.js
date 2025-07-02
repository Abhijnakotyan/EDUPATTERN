const express = require('express');
const Question = require('../models/Question');
const Patterns = require('../models/Patterns');

const router = express.Router();

router.post('/generate-paper', async (req, res) => {
    console.log("🟢 Received Request:", req.body);

    const { subject, pattern_id } = req.body;

    if (!subject || !pattern_id) {
        return res.status(400).json({ message: 'Subject and Pattern are required.' });
    }

    try {
        const pattern = await Patterns.findById(pattern_id);
        if (!pattern) {
            return res.status(404).json({ message: 'Pattern not found.' });
        }

        console.log("🟢 Found Pattern:", pattern.pattern_name);

        let selectedQuestions = [];
        let totalMarks = 0;

        // Define the marks distribution
        const questionTypes = [
            { marks: 2, count: pattern.marks_distribution['2_marks'] },
            { marks: 8, count: pattern.marks_distribution['8_marks'] },
            { marks: 10, count: pattern.marks_distribution['10_marks'] }
        ];

        for (const qType of questionTypes) {
            if (qType.count > 0) {
                const questions = await Question.aggregate([
                    { $match: { subject, marks: qType.marks } }, 
                    { $sample: { size: qType.count } } 
                ]);

                console.log(`🟢 Selected ${questions.length} questions for ${qType.marks} marks`);

                if (questions.length !== qType.count) {
                    return res.status(400).json({
                        message: `Error: Expected ${qType.count} questions for ${qType.marks} marks, but got ${questions.length}.`
                    });
                }

                selectedQuestions.push(...questions);
                totalMarks += questions.reduce((sum, q) => sum + q.marks, 0);
            }
        }

        // Ensure final marks match the pattern exactly
        if (totalMarks !== pattern.total_marks) {
            return res.status(400).json({
                message: `Error: Expected ${pattern.total_marks} marks, but got ${totalMarks} marks.`
            });
        }

        console.log("🟢 Successfully Generated Question Paper.");
        res.status(200).json({ questions: selectedQuestions });

    } catch (error) {
        console.error("🔴 Error generating paper:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
