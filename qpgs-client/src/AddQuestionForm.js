import React, { useState } from 'react';
import { TextField, Button, Container, MenuItem, Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

function AddQuestionForm() {
    const [question, setQuestion] = useState('');
    const [marks, setMarks] = useState('');
    const [module, setModule] = useState('');
    const [subject, setSubject] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [co, setCO] = useState('');
    const [po, setPO] = useState('');
    const [bl, setBL] = useState('');

    const handleSubmit = async () => {
        if (!question || !marks || !module || !subject || !difficulty || !co || !po || !bl) {
            alert('Please fill all fields.');
            return;
        }

        await axios.post('http://localhost:5000/api/questions/add-question', {
            question_text: question,
            marks: Number(marks),
            module: Number(module),
            subject,
            difficulty_level: difficulty,
            CO: co,
            PO: po,
            BL: bl
        });

        alert('Question Added Successfully!');
        setQuestion('');
        setMarks('');
        setModule('');
        setSubject('');
        setDifficulty('');
        setCO('');
        setPO('');
        setBL('');
    };

    return (
        <>
      <Navbar /> 
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
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                     <Typography
                                  variant="h4"
                                  gutterBottom
                                  align="center"
                                  color="rgb(24, 67, 99)"
                                  fontWeight="bold"
                                >
                        Add a New Question
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Question Text" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Marks" type="number" fullWidth value={marks} onChange={(e) => setMarks(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Module" type="number" fullWidth value={module} onChange={(e) => setModule(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Subject" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Difficulty Level" select fullWidth value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Hard">Hard</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="CO (Course Outcome)" fullWidth value={co} onChange={(e) => setCO(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="PO (Program Outcome)" fullWidth value={po} onChange={(e) => setPO(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="BL (Bloom's Taxonomy Level)" fullWidth value={bl} onChange={(e) => setBL(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
                        Add Question
                    </Button>
                </CardContent>
            </Card>
        </Container>
        </>
    );
}

export default AddQuestionForm;