import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";

function AddPatternsForm() {
  const [patternsName, setPatternsName] = useState("");
  const [marksDistribution, setMarksDistribution] = useState({
    "2_marks": 5,
    "8_marks": 3,
    "10_marks": 2,
  });
  const [totalMarks, setTotalMarks] = useState(0);

  // Automatically calculate total marks whenever marksDistribution changes
  useEffect(() => {
    const total =
      marksDistribution["2_marks"] * 2 +
      marksDistribution["8_marks"] * 8 +
      marksDistribution["10_marks"] * 10;
    setTotalMarks(total);
  }, [marksDistribution]);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/patterns/add-pattern", {
        pattern_name: patternsName,
        marks_distribution: marksDistribution,
        total_marks: totalMarks,
      });

      alert("Patterns Added Successfully!");
      setPatternsName("");
      setMarksDistribution({ "2_marks": 0, "8_marks": 0, "10_marks": 0 });
    } catch (error) {
      console.error("Error adding pattern:", error);
      alert("Failed to add pattern.");
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
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              color="rgb(24, 67, 99)"
              fontWeight="bold"
            >
              Add Question Paper Patterns
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Pattern Name"
                  fullWidth
                  value={patternsName}
                  onChange={(e) => setPatternsName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="2 Marks Questions"
                  type="number"
                  fullWidth
                  value={marksDistribution["2_marks"]}
                  onChange={(e) =>
                    setMarksDistribution({
                      ...marksDistribution,
                      "2_marks": Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="8 Marks Questions"
                  type="number"
                  fullWidth
                  value={marksDistribution["8_marks"]}
                  onChange={(e) =>
                    setMarksDistribution({
                      ...marksDistribution,
                      "8_marks": Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="10 Marks Questions"
                  type="number"
                  fullWidth
                  value={marksDistribution["10_marks"]}
                  onChange={(e) =>
                    setMarksDistribution({
                      ...marksDistribution,
                      "10_marks": Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Total Marks"
                  type="number"
                  fullWidth
                  value={totalMarks}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
              onClick={handleSubmit}
            >
              Add Pattern
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AddPatternsForm;
