import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, TextField, MenuItem, Button, Typography, Card, 
  CardContent, Box, Grid, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper 
} from '@mui/material';
import Navbar from "./Navbar";

function GeneratePaper() {
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState('');
  const [questions, setQuestions] = useState([]);
  const [patternDetails, setPatternDetails] = useState(null);

  // Fetch subjects and patterns on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-subjects');
        setSubjects(response.data);
      } catch (error) {
        alert("❌ Failed to fetch subjects.");
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchPatterns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patterns/get-patterns');
        setPatterns(response.data);
      } catch (error) {
        alert("❌ Failed to fetch patterns.");
        console.error("Error fetching patterns:", error);
      }
    };

    fetchSubjects();
    fetchPatterns();
  }, []);

  // Generate Question Paper
  const generatePaper = async () => {
    if (!subject.trim() || !selectedPattern) {
      alert("❌ Subject and Pattern are required.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/question-paper/generate-paper',
        { subject, pattern_id: selectedPattern },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setQuestions(response.data.questions || []);
      setPatternDetails(patterns.find(p => p._id === selectedPattern));
    } catch (error) {
      alert(error.response?.data?.message || "❌ Failed to generate paper.");
      console.error("Error generating paper:", error);
    }
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
          backgroundImage: "url('/asset/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          p: 4,
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  color="rgb(24, 67, 99)"
                  fontWeight="bold"
                >
                  Generate Question Paper
                </Typography>

                <Box sx={{ p: 2 }}>
                  {/* Subject Dropdown */}
                  <TextField
                    label="Select Subject"
                    select
                    fullWidth
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    margin="normal"
                    required
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  >
                    {subjects.length > 0 ? (
                      subjects.map((subj) => (
                        <MenuItem key={subj._id} value={subj.subject_name}>
                          {subj.subject_name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No Subjects Available</MenuItem>
                    )}
                  </TextField>

                  {/* Pattern Dropdown */}
                  <TextField
                    label="Select Pattern"
                    select
                    fullWidth
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value)}
                    margin="normal"
                    required
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  >
                    {patterns.length > 0 ? (
                      patterns.map((pattern) => (
                        <MenuItem key={pattern._id} value={pattern._id}>
                          {pattern.pattern_name} (Total Marks: {pattern.total_marks})
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No Patterns Available</MenuItem>
                    )}
                  </TextField>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={generatePaper}
                    sx={{ mt: 2, fontSize: 16, fontWeight: 'bold', py: 1 }}
                  >
                    Generate Paper
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Display Generated Question Paper */}
        {questions.length > 0 && patternDetails && (
          <Box
            id="question-paper"
            sx={{
              mt: 5,
              p: 3,
              backgroundColor: '#f9f9f9',
              borderRadius: 2,
              border: '1px solid #ddd'
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}
            >
              {patternDetails.pattern_name}
            </Typography>

            {Object.entries(patternDetails.marks_distribution).map(([markType, count], sectionIndex) => {
              const markValue = parseInt(markType.split('_')[0]);
              const filteredQuestions = questions.filter(q => q.marks === markValue);

              if (filteredQuestions.length === 0) return null;

              return (
                <Box key={markType} sx={{ my: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}
                  >
                    {sectionIndex === 0 ? "Part A" : sectionIndex === 1 ? "Part B" : "Part C"} - {markValue} Marks Questions
                  </Typography>

                  <TableContainer component={Paper} sx={{ boxShadow: 0, border: '1px solid #ccc' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                        <TableRow>
                          <TableCell><b>Sl. No.</b></TableCell>
                          <TableCell><b>Question</b></TableCell>
                          <TableCell><b>Marks</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredQuestions.map((q, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{q.question_text}</TableCell>
                            <TableCell>{q.marks}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              );
            })}

            <Typography
              variant="h6"
              align="right"
              sx={{ fontWeight: 'bold', mt: 3, color: '#333' }}
            >
              Total Marks: {patternDetails.total_marks}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default GeneratePaper;
