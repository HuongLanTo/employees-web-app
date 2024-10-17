import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to Employee Management System
        </Typography>
        <Typography variant="h6" align="center">
          Please login or register to manage employees.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
