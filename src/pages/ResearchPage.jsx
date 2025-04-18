import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Paper, Divider, Chip, Button, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';

const ResearchPage = () => {
  return (
    <Container maxWidth="lg" className="research-page" sx={{ py: 4 }}>
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
          Research Overview
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
          Exploring the science, history, and innovation behind hip prosthesis technology
        </Typography>
        <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/research-explorer"
            startIcon={<ArticleIcon />}
            sx={{ borderRadius: 8, px: 3 }}
          >
            Research Explorer
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SchoolIcon />}
            sx={{ borderRadius: 8, px: 3 }}
            onClick={() => document.getElementById('current-research').scrollIntoView({ behavior: 'smooth' })}
          >
            Current Research
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <Grid item xs={12}>
          <Card elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
            <Grid container>
              <Grid item xs={12} md={7} sx={{ p: 3 }}>
                <Typography variant="h4" component="h2" color="primary" gutterBottom>
                  Hip Anatomy and Degeneration
                </Typography>
                <Typography variant="body1" paragraph>
                  The hip joint is one of the largest weight-bearing joints in the human body. It consists of a ball (femoral head) and socket (acetabulum) that allows for fluid movement in multiple directions.
                </Typography>
                <Typography variant="body1" paragraph>
                  Hip degeneration can occur due to various factors including osteoarthritis, rheumatoid arthritis, traumatic injuries, and avascular necrosis. These conditions can lead to pain, stiffness, and reduced mobility, often necessitating hip replacement surgery.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="Osteoarthritis" color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  <Chip label="Rheumatoid Arthritis" color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  <Chip label="Avascular Necrosis" color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  <Chip label="Traumatic Injury" color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ height: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                  <img
                    src="/images/research/hip-anatomy.svg"
                    alt="Hip Anatomy Illustration"
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <TimelineIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0 }}>
              History and Evolution of Hip Prostheses
            </Typography>
          </Box>

          <Card elevation={3} sx={{ mb: 5, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image="/images/research/hip-implant-evolution.svg"
              alt="Evolution of Hip Implant Technology"
              sx={{ objectFit: 'contain', bgcolor: '#f5f7fa' }}
            />
          </Card>

          <Box className="timeline" sx={{ position: 'relative', maxWidth: '900px', mx: 'auto', '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: { xs: '20px', md: '50%' },
            width: '4px',
            bgcolor: 'primary.main',
            transform: { md: 'translateX(-2px)' }
          }}}>
            {/* Timeline Item 1 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                position: 'relative',
                mb: 5,
                ml: { xs: '40px', md: 0 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '15px',
                  left: { xs: '-40px', md: 'calc(50% - 10px)' },
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  zIndex: 1
                }
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: { md: '45%' },
                  ml: { md: 'auto' },
                  mr: { md: '10%' },
                  position: 'relative'
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>1891: First Attempt</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>German surgeon Themistocles Glück</Typography>
                <Typography variant="body1">
                  Created the first artificial hip joint using ivory, which was fixed to bone with nickel-plated screws.
                </Typography>
              </Paper>
            </Box>

            {/* Timeline Item 2 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                position: 'relative',
                mb: 5,
                ml: { xs: '40px', md: 0 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '15px',
                  left: { xs: '-40px', md: 'calc(50% - 10px)' },
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  zIndex: 1
                }
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: { md: '45%' },
                  mr: { md: 'auto' },
                  ml: { md: '10%' },
                  position: 'relative'
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>1940s: Metal Prostheses</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Austin Moore and Frederick Thompson</Typography>
                <Typography variant="body1">
                  Introduction of metal femoral head replacements, marking a significant advancement in hip replacement technology.
                </Typography>
              </Paper>
            </Box>

            {/* Timeline Item 3 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                position: 'relative',
                mb: 5,
                ml: { xs: '40px', md: 0 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '15px',
                  left: { xs: '-40px', md: 'calc(50% - 10px)' },
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  zIndex: 1
                }
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: { md: '45%' },
                  ml: { md: 'auto' },
                  mr: { md: '10%' },
                  position: 'relative'
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>1960s: Modern THR</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Sir John Charnley</Typography>
                <Typography variant="body1">
                  Developed the modern low-friction total hip replacement using a metal stem and ball with a polyethylene socket, revolutionizing hip replacement surgery.
                </Typography>
              </Paper>
            </Box>

            {/* Timeline Item 4 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                position: 'relative',
                mb: 5,
                ml: { xs: '40px', md: 0 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '15px',
                  left: { xs: '-40px', md: 'calc(50% - 10px)' },
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  zIndex: 1
                }
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: { md: '45%' },
                  mr: { md: 'auto' },
                  ml: { md: '10%' },
                  position: 'relative'
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>1970s-1990s: Material Innovations</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Era of Material Science</Typography>
                <Typography variant="body1">
                  Introduction of titanium alloys, ceramic components, and improved polyethylene, significantly enhancing prosthesis performance and longevity.
                </Typography>
              </Paper>
            </Box>

            {/* Timeline Item 5 */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                position: 'relative',
                mb: 5,
                ml: { xs: '40px', md: 0 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '15px',
                  left: { xs: '-40px', md: 'calc(50% - 10px)' },
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  zIndex: 1
                }
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: { md: '45%' },
                  ml: { md: 'auto' },
                  mr: { md: '10%' },
                  position: 'relative'
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>2000s-Present: Modern Designs</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Contemporary Advancements</Typography>
                <Typography variant="body1">
                  Development of highly cross-linked polyethylene, advanced ceramic materials, and minimally invasive surgical techniques, pushing the boundaries of hip replacement technology.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mt: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <BarChartIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0 }}>
              Research Statistics
            </Typography>
          </Box>

          <Card elevation={3} sx={{ mb: 5, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image="/images/research/research-stats.svg"
              alt="Hip Prosthesis Research Statistics"
              sx={{ objectFit: 'contain', bgcolor: '#f5f7fa' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                Based on meta-analysis of clinical studies with 15+ years follow-up data from international joint registries
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon color="primary" sx={{ fontSize: 24, mr: 2 }} />
              <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0 }}>
                Purpose and Significance
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Hip prostheses are designed to restore function and relieve pain in patients with damaged hip joints. The design of each prosthesis aims to achieve multiple critical objectives:
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  sx={{ height: '100%' }}
                >
                  <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                    <Typography variant="h6" gutterBottom color="primary">Biomechanical Excellence</Typography>
                    <Typography variant="body2">
                      • Replicate natural hip biomechanics<br />
                      • Allow for proper load transfer to bone<br />
                      • Accommodate patient-specific anatomy and activity levels
                    </Typography>
                  </Paper>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  sx={{ height: '100%' }}
                >
                  <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                    <Typography variant="h6" gutterBottom color="primary">Material Performance</Typography>
                    <Typography variant="body2">
                      • Provide long-term durability (ideally 15-20+ years)<br />
                      • Minimize wear and debris generation<br />
                      • Ensure biocompatibility with surrounding tissues
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ScienceIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0 }}>
              Material Comparison
            </Typography>
          </Box>

          <Card elevation={3} sx={{ mb: 5, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image="/images/research/material-comparison.svg"
              alt="Hip Prosthesis Material Comparison"
              sx={{ objectFit: 'contain', bgcolor: '#f5f7fa' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Comparative analysis of key performance metrics across different hip prosthesis materials
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={3} sx={{ p: 4, borderRadius: 2 }} id="current-research">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon color="primary" sx={{ fontSize: 24, mr: 2 }} />
              <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0 }}>
                Current Research Trends
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              The field of hip prosthesis research continues to evolve, with several exciting areas of focus:
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  component={motion.div}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="/images/research/3d-printing.svg"
                      alt="3D Printing for Hip Prostheses"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">Additive Manufacturing</Typography>
                      <Typography variant="body2">
                        3D printing technologies are enabling the creation of patient-specific implants with complex internal structures that promote bone ingrowth and optimize mechanical properties.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  component={motion.div}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="/images/research/smart-materials.svg"
                      alt="Smart Materials for Hip Prostheses"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">Smart Materials</Typography>
                      <Typography variant="body2">
                        Development of bioactive coatings and smart materials that can detect wear, infection, or loosening, potentially allowing for early intervention before catastrophic failure.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  component={motion.div}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="/images/research/regenerative.svg"
                      alt="Regenerative Approaches for Hip Prostheses"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">Regenerative Approaches</Typography>
                      <Typography variant="body2">
                        Integration of tissue engineering and regenerative medicine principles to develop implants that actively promote tissue regeneration and integration with the host bone.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ArticleIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0 }}>
              Featured Research Papers
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="/images/research/papers/research-paper-1.svg"
                  alt="Research Paper on Ceramic Composites"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Advanced Ceramic Composites for Hip Prosthesis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    This comprehensive review examines the latest developments in ceramic composites for hip prosthesis applications, with particular focus on alumina-zirconia composites and silicon nitride-based materials.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Chip label="Materials Science" size="small" color="primary" variant="outlined" />
                    <Button
                      variant="text"
                      color="primary"
                      component={Link}
                      to="/research-explorer"
                      size="small"
                    >
                      View in Explorer
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="/images/research/papers/research-paper-2.svg"
                  alt="Research Paper on Machine Learning"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Machine Learning for Predicting Hip Prosthesis Outcomes
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    This systematic review evaluates the application of machine learning algorithms in predicting outcomes following hip replacement surgery, analyzing 42 studies employing various ML techniques.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Chip label="AI & Predictive Models" size="small" color="primary" variant="outlined" />
                    <Button
                      variant="text"
                      color="primary"
                      component={Link}
                      to="/research-explorer"
                      size="small"
                    >
                      View in Explorer
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/research-explorer"
              startIcon={<ArticleIcon />}
              sx={{ borderRadius: 8, px: 4 }}
            >
              Explore All Research Papers
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResearchPage;
