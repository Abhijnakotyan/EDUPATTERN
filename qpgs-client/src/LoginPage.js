import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });

            alert(response.data.message);

            // Redirect Based on Role
            if (response.data.role === 'Admin') {
                navigate('/admin-dashboard');
            } else if (response.data.role === 'Teacher') {
                navigate('/dashboard');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <Container
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: "url('/asset/login.jpg')",  
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Paper 
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: 'rgb(255, 255, 255)' // Optional: Add a translucent effect
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'rgb(28, 97, 114)', fontWeight: 'bold' }}>
                    Login
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        sx={{ py: 1.5 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;
