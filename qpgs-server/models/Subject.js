const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subject_name: { type: String, required: true, unique: true },
    modules: [{ module_number: Number, module_name: String }],
    syllabus: { type: String }  // Added syllabus field
});

module.exports = mongoose.model('Subject', SubjectSchema);
