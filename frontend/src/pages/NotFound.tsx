import React from "react";
import { Container, Typography, Box } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h3" gutterBottom>
          404 - Not Found
        </Typography>
        <Typography variant="h6">
          The page you're looking for doesn't exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
