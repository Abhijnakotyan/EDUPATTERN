const mongoose = require('mongoose');

const PatternSchema = new mongoose.Schema({
    pattern_name: { type: String, required: true },
    marks_distribution: {
        '2_marks': Number,
        '8_marks': Number,
        '10_marks': Number
    },
    sub_questions: [
        {
            question_number: String, // e.g., 1a, 1b
            marks: Number
        }
    ],
    total_marks: { type: Number, required: true }
});

module.exports = mongoose.model('Pattern', PatternSchema);
