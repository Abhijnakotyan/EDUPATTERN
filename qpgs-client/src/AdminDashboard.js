import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Typography, List, IconButton, Paper, Box, Card, CardContent
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

function AdminDashboard() {
    const [subjectName, setSubjectName] = useState('');
    const [moduleData, setModuleData] = useState([{ module_number: 1, module_name: '' }]);
    const [syllabus, setSyllabus] = useState('');
    const [subjects, setSubjects] = useState([]);

    // Fetch Subjects
    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await axios.get('http://localhost:5000/api/admin/get-subjects');
            setSubjects(response.data);
        };
        fetchSubjects();
    }, []);

    // Add Subject
    const handleAddSubject = async () => {
        await axios.post('http://localhost:5000/api/admin/add-subject', {
            subject_name: subjectName,
            modules: moduleData,
            syllabus
        });

        alert('Subject added successfully!');
        setSubjectName('');
        setModuleData([{ module_number: 1, module_name: '' }]);
        setSyllabus('');

        // Refresh subject list
        const response = await axios.get('http://localhost:5000/api/admin/get-subjects');
        setSubjects(response.data);
    };

    // Delete Subject
    const handleDeleteSubject = async (id) => {
        await axios.delete(`http://localhost:5000/api/admin/delete-subject/${id}`);
        alert('Subject deleted successfully!');

        // Refresh subject list
        const response = await axios.get('http://localhost:5000/api/admin/get-subjects');
        setSubjects(response.data);
    };

    // Add New Module Field
    const addModuleField = () => {
        setModuleData([...moduleData, { module_number: moduleData.length + 1, module_name: '' }]);
    };

    // Handle Module Input
    const handleModuleChange = (index, field, value) => {
        const updatedModules = [...moduleData];
        updatedModules[index][field] = value;
        setModuleData(updatedModules);
    };

    return (
        <Container
                      maxWidth={false}
                      disableGutters
                      sx={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        backgroundImage: "url('/asset/background.jpg')", // Update image path
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        color: "white",
                        p: 4,
                      }}
                    >
            <Paper 
                elevation={10}
                sx={{ 
                    p: 5, 
                    width: '100%', 
                    maxWidth: 700, 
                    textAlign: 'center', 
                    borderRadius: 3, 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    backdropFilter: "blur(10px)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#0D47A1', fontWeight: 'bold' }}>
                    Admin Dashboard
                </Typography>

                {/* Add Subject Form */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                    <TextField
                        label="Subject Name"
                        fullWidth
                        variant="filled"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />

                    {moduleData.map((module, index) => (
                        <TextField
                            key={index}
                            label={`Module ${module.module_number}`}
                            fullWidth
                            variant="filled"
                            value={module.module_name}
                            onChange={(e) => handleModuleChange(index, 'module_name', e.target.value)}
                        />
                    ))}

                    <TextField
                        label="Syllabus"
                        multiline
                        rows={3}
                        fullWidth
                        variant="filled"
                        value={syllabus}
                        onChange={(e) => setSyllabus(e.target.value)}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" color="primary" onClick={addModuleField}>
                            + Add Module
                        </Button>

                        <Button variant="contained" color="primary" onClick={handleAddSubject}>
                            📖 Add Subject
                        </Button>
                    </Box>
                </Box>

                {/* Subject List */}
                <Typography variant="h5" sx={{ mt: 4, color: '#0D47A1', fontWeight: 'bold' }}>
                    Subjects List
                </Typography>

                <List sx={{ mt: 2 }}>
                    {subjects.map((subject) => (
                        <Card 
                            key={subject._id} 
                            sx={{ 
                                mb: 2, 
                                backgroundColor: '#ffffff', 
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': { boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)" }
                            }}
                        >
                            <CardContent 
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center' 
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                        {subject.subject_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {subject.syllabus}
                                    </Typography>
                                </Box>
                                <IconButton onClick={() => handleDeleteSubject(subject._id)} color="error">
                                    <Delete />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default AdminDashboard;
