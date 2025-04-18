import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import MaterialComparisonPanel from '../components/MaterialComparisonPanel';

const MaterialAnalysisPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ 
          mb: 6, 
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(63,81,181,0.05) 0%, rgba(255,255,255,0) 100%)',
          py: 5,
          borderRadius: 4,
          px: 3
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          color="primary" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textShadow: '0px 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          Material Analysis
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6
          }}
        >
          Scientific comparison of materials used in hip prosthesis manufacturing
        </Typography>
        <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <MaterialComparisonPanel />
      </Box>
    </Container>
  );
};

export default MaterialAnalysisPage;
