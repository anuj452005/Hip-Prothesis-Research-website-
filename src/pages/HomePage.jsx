import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Grid, Button, Card, CardContent, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CoreFeatures from '../components/CoreFeatures';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  return (
    <Box className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <CoreFeatures />

      <Box
        sx={{
          py: 8,
          background: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(139, 92, 246, 0.05) 100%)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                      AI Recommendation System
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Our advanced AI system analyzes patient data to provide personalized prosthesis recommendations, considering factors like age, activity level, and bone quality.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/ai-recommendation"
                      sx={{
                        borderRadius: 8,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        mt: 1
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Try AI Recommendation
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <Box
                        component="img"
                        src="/images/features/ai-recommendation.svg"
                        alt="AI Recommendation"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.02) 0%, rgba(59, 130, 246, 0.05) 100%)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2, color: 'info.main' }}>
                      Stress Simulation
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Visualize mechanical stress distribution on different prosthesis designs under various loading conditions with our interactive 3D simulation tool.
                    </Typography>
                    <Button
                      variant="contained"
                      color="info"
                      component={Link}
                      to="/stress-simulation"
                      sx={{
                        borderRadius: 8,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        mt: 1
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Try Stress Simulation
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <Box
                        component="img"
                        src="/images/features/stress-simulation.svg"
                        alt="Stress Simulation"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.02) 0%, rgba(139, 92, 246, 0.05) 100%)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main' }}>
                      Research Explorer
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Access and search through a comprehensive database of scientific literature on hip prosthesis technology, with filters for materials, outcomes, and more.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/research-explorer"
                      sx={{
                        borderRadius: 8,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        mt: 1
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Explore Research
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <Box
                        component="img"
                        src="/images/features/research-explorer.svg"
                        alt="Research Explorer"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(5, 150, 105, 0.05) 100%)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2, color: 'success.main' }}>
                      Environmental Scorecard
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Evaluate the environmental sustainability of different prosthesis materials and manufacturing processes with our comprehensive scoring system.
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      component={Link}
                      to="/environmental-scorecard"
                      sx={{
                        borderRadius: 8,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        mt: 1
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Scorecard
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <Box
                        component="img"
                        src="/images/features/environmental-scorecard.svg"
                        alt="Environmental Scorecard"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
