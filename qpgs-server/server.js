const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/qpgs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Sample Route for Testing
app.get('/', (req, res) => res.send('QPGS API Running Successfully!'));

app.listen(5000, () => console.log('🚀 Server running on port 5000'));

const questionRoutes = require('./routes/questionRoutes');
app.use('/api/questions', questionRoutes);

const patternsRoutes = require('./routes/patternsRoutes'); 
app.use('/api/patterns', patternsRoutes);               

const questionPaperRoutes = require('./routes/questionPaperRoutes');
app.use('/api/question-paper', questionPaperRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


