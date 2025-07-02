import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, Typography } from '@mui/material';

function PatternList() {
    const [patterns, setPatterns] = useState([]);

    useEffect(() => {
        const fetchPatterns = async () => {
            const response = await axios.get('http://localhost:5000/api/patterns/get-patterns');
            setPatterns(response.data);
        };
        fetchPatterns();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Saved Question Paper Patterns
            </Typography>
            <List>
                {patterns.map((pattern, index) => (
                    <ListItem key={index}>
                        {pattern.pattern_name} - Total Marks: {pattern.total_marks}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default PatternList;
