import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import AddQuestionForm from './AddQuestionForm';
import AddPatternsForm from './AddPatternsForm';
import GeneratePaper from './GeneratePaper';

function App() {
    return (
        <Router>
            <Routes>
                {/* Default Route - Redirect to Login */}
                <Route path="/" element={<LoginPage />} />

                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                {/* Teacher Routes */}
                <Route path="/dashboard" element={<TeacherDashboard />} />
                <Route path="/add-question" element={<AddQuestionForm />} />
                <Route path="/add-pattern" element={<AddPatternsForm />} />
                <Route path="/generate-paper" element={<GeneratePaper />} />

                {/* Catch-all for unknown routes - Redirect to Login */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
