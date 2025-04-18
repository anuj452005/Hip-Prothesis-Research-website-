import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScienceIcon from '@mui/icons-material/Science';
import BarChartIcon from '@mui/icons-material/BarChart';
import BiotechIcon from '@mui/icons-material/Biotech';
import '../styles/hero.css';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Generate random positions for particles
  const particles = React.useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.3,
      duration: 10 + Math.random() * 20,
      offsetX: Math.random() * 100 - 50 + (i % 2 === 0 ? -20 : 20),
      offsetY: Math.random() * 100 - 50 + (i % 2 === 0 ? -20 : 20)
    }));
  }, []);

  return (
    <Box className="hero-section" sx={{ backgroundImage: 'url("/images/hero/hero-bg-gradient.svg")' }}>
      {/* Animated particles */}
      <Box className="hero-particles">
        {particles.map((particle, i) => (
          <Box
            key={i}
            component={motion.div}
            className="particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: particle.opacity
            }}
            animate={{
              y: [null, `calc(${particle.y}% + ${particle.offsetY}px)`],
              x: [null, `calc(${particle.x}% + ${particle.offsetX}px)`]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: particle.duration,
              ease: "easeInOut"
            }}
            sx={{
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              position: 'absolute'
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="hero-content">
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hero-badge"
              >
                <ScienceIcon fontSize="small" className="hero-badge-icon" />
                Advanced Biomaterial Research
              </Box>

              <Typography
                component={motion.h1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-title"
                variant="h1"
              >
                Hip Prosthesis Research
              </Typography>

              <Typography
                component={motion.p}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-subtitle"
                variant="h6"
              >
                Exploring materials, design, and innovation in hip replacement technology for improved patient outcomes and longer-lasting implants.
              </Typography>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hero-buttons"
              >
                <Link to="/model" className="hero-button-primary">
                  Explore 3D Models
                </Link>
                <Link to="/research" className="hero-button-secondary">
                  Learn More <ArrowForwardIcon fontSize="small" />
                </Link>
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="hero-stats"
              >
                <Box className="hero-stat">
                  <Box className="hero-stat-icon-container">
                    <BiotechIcon className="hero-stat-icon" />
                  </Box>
                  <Typography className="hero-stat-value">15+</Typography>
                  <Typography className="hero-stat-label">Material Types</Typography>
                </Box>
                <Box className="hero-stat">
                  <Box className="hero-stat-icon-container">
                    <BarChartIcon className="hero-stat-icon" />
                  </Box>
                  <Typography className="hero-stat-value">20+</Typography>
                  <Typography className="hero-stat-label">Design Variations</Typography>
                </Box>
                <Box className="hero-stat">
                  <Box className="hero-stat-icon-container">
                    <ScienceIcon className="hero-stat-icon" />
                  </Box>
                  <Typography className="hero-stat-value">95%</Typography>
                  <Typography className="hero-stat-label">Success Rate</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hero-image-container"
              sx={{ position: 'relative', zIndex: 2 }}
            >
              <Box
                component={motion.img}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                src="/images/hero/hip-prosthesis-3d.svg"
                alt="Hip Prosthesis 3D Model"
                className="hero-image-main"
                sx={{ filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))' }}
              />
              <Box
                component={motion.img}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                src="/images/hero/decorative-element.svg"
                alt="Decorative Element"
                className="hero-image-bg"
              />
              <Box
                component={motion.img}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.9, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                src="/images/hero/hip-anatomy.svg"
                alt="Hip Anatomy"
                className="hero-image-anatomy"
                sx={{ filter: 'drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.1))' }}
              />

              {/* Floating measurement indicators */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="measurement-indicator"
                sx={{
                  position: 'absolute',
                  top: '30%',
                  right: isMobile ? '5%' : '0',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 10
                }}
              >
                <Box component="span" sx={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }}></Box>
                Titanium Alloy Stem
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="measurement-indicator"
                sx={{
                  position: 'absolute',
                  top: '15%',
                  left: isMobile ? '10%' : '5%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 10
                }}
              >
                <Box component="span" sx={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }}></Box>
                Ceramic Head
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
