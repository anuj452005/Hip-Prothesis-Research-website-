import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import '../styles/features.css';

// Import icons
import Model3dIcon from '@mui/icons-material/ViewInAr';
import ResearchIcon from '@mui/icons-material/Science';
import MaterialsIcon from '@mui/icons-material/Category';
import TypesIcon from '@mui/icons-material/Difference';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CoreFeatures = () => {
  return (
    <Box className="features-section">
      <Container maxWidth="lg">
        <Typography className="features-heading">Core Features</Typography>
        <Typography className="features-subheading">
          Explore our comprehensive resources on hip prosthesis technology
        </Typography>
        <Box className="features-divider" />
        
        <Box className="features-grid">
          {/* 3D Model Feature */}
          <Box 
            component={motion.div}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="feature-card model"
          >
            <Box className="feature-icon">
              <Model3dIcon sx={{ fontSize: 30, color: '#3f51b5' }} />
            </Box>
            <Typography className="feature-title">3D Model</Typography>
            <Typography className="feature-description">
              Explore interactive 3D models of hip prosthesis with detailed visualization
            </Typography>
            <Link to="/model" className="feature-link">
              Explore Models <ArrowForwardIcon fontSize="small" />
            </Link>
          </Box>
          
          {/* Research Feature */}
          <Box 
            component={motion.div}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="feature-card research"
          >
            <Box className="feature-icon">
              <ResearchIcon sx={{ fontSize: 30, color: '#8b5cf6' }} />
            </Box>
            <Typography className="feature-title">Research</Typography>
            <Typography className="feature-description">
              Learn about hip anatomy and the evolution of prosthesis technology
            </Typography>
            <Link to="/research" className="feature-link">
              Explore Research <ArrowForwardIcon fontSize="small" />
            </Link>
          </Box>
          
          {/* Materials Feature */}
          <Box 
            component={motion.div}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="feature-card materials"
          >
            <Box className="feature-icon">
              <MaterialsIcon sx={{ fontSize: 30, color: '#0ea5e9' }} />
            </Box>
            <Typography className="feature-title">Materials</Typography>
            <Typography className="feature-description">
              Discover the materials used in modern prostheses and their properties
            </Typography>
            <Link to="/materials" className="feature-link">
              Explore Materials <ArrowForwardIcon fontSize="small" />
            </Link>
          </Box>
          
          {/* Types Feature */}
          <Box 
            component={motion.div}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="feature-card types"
          >
            <Box className="feature-icon">
              <TypesIcon sx={{ fontSize: 30, color: '#f59e0b' }} />
            </Box>
            <Typography className="feature-title">Types</Typography>
            <Typography className="feature-description">
              Learn about different types of hip prostheses and their applications
            </Typography>
            <Link to="/types" className="feature-link">
              Explore Types <ArrowForwardIcon fontSize="small" />
            </Link>
          </Box>
        </Box>
        
        <Link to="/" className="explore-more-button">
          Explore More Features <ArrowForwardIcon fontSize="small" />
        </Link>
        
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Box 
            component="img" 
            src="/images/icons/interactive.svg" 
            alt="Interactive Features" 
            sx={{ width: 40, height: 40, mb: 2 }}
          />
          <Typography className="interactive-heading">
            Interactive Features
          </Typography>
          <Typography className="interactive-subheading">
            Advanced tools powered by the latest technology
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CoreFeatures;
