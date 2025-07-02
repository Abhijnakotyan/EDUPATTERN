const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Plain password for simplicity
    role: { type: String, enum: ['Admin', 'Teacher'], required: true }
});

module.exports = mongoose.model('User', UserSchema);
