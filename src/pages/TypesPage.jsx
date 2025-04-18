import React from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia, Divider, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const TypesPage = () => {
  return (
    <Box sx={{
      background: 'linear-gradient(180deg, rgba(63,81,181,0.05) 0%, rgba(255,255,255,0) 100%)',
      pt: 6,
      pb: 8
    }}>
      <Container maxWidth="lg" className="types-page">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ mb: 8, textAlign: 'center' }}
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
            Types of Hip Prostheses
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
            Exploring different designs and their specific applications in hip replacement surgery
          </Typography>
          <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
        </Box>

      <Grid container spacing={6} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            whileHover={{ y: -15, boxShadow: 8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            sx={{
              height: '100%',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 4,
              border: '1px solid rgba(63,81,181,0.1)',
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image="/images/types/total-hip-replacement.svg"
              alt="Total Hip Replacement (THR)"
            />
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                color="primary"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  borderBottom: '2px solid rgba(63,81,181,0.2)',
                  pb: 1,
                  mb: 2
                }}
              >
                Total Hip Replacement (THR)
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem'
                }}
              >
                Description
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Replaces both the acetabulum (socket) and the femoral head (ball) of the hip joint.
              </Typography>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Components
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>
                <li><Typography variant="body2">Acetabular cup (metal shell with liner)</Typography></li>
                <li><Typography variant="body2">Femoral head (ball)</Typography></li>
                <li><Typography variant="body2">Femoral stem</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Pros
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem', color: '#2e7d32' }}>
                <li><Typography variant="body2">Complete joint replacement</Typography></li>
                <li><Typography variant="body2">Excellent pain relief</Typography></li>
                <li><Typography variant="body2">Improved mobility</Typography></li>
                <li><Typography variant="body2">Long-term solution</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Cons
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem', color: '#c62828' }}>
                <li><Typography variant="body2">More extensive surgery</Typography></li>
                <li><Typography variant="body2">Longer recovery time</Typography></li>
                <li><Typography variant="body2">Potential for wear and loosening</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Use Cases
              </Typography>
              <Typography variant="body2">
                Severe osteoarthritis, rheumatoid arthritis, avascular necrosis, and fractures in older patients.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            whileHover={{ y: -15, boxShadow: 8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            sx={{
              height: '100%',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 4,
              border: '1px solid rgba(63,81,181,0.1)',
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image="/images/types/partial-hip-replacement.svg"
              alt="Partial Hip Replacement (PHR)"
            />
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                color="primary"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  borderBottom: '2px solid rgba(63,81,181,0.2)',
                  pb: 1,
                  mb: 2
                }}
              >
                Partial Hip Replacement (PHR)
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem'
                }}
              >
                Description
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Replaces only the femoral head (ball) while retaining the natural acetabulum (socket).
              </Typography>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Components
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>
                <li><Typography variant="body2">Femoral head (ball)</Typography></li>
                <li><Typography variant="body2">Femoral stem</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Pros
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem', color: '#2e7d32' }}>
                <li><Typography variant="body2">Less invasive procedure</Typography></li>
                <li><Typography variant="body2">Shorter surgery time</Typography></li>
                <li><Typography variant="body2">Quicker recovery</Typography></li>
                <li><Typography variant="body2">Less bone removal</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Cons
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem', color: '#c62828' }}>
                <li><Typography variant="body2">Potential acetabular erosion</Typography></li>
                <li><Typography variant="body2">May require conversion to THR later</Typography></li>
                <li><Typography variant="body2">Less predictable pain relief</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Use Cases
              </Typography>
              <Typography variant="body2">
                Femoral neck fractures in elderly patients with healthy acetabulum, limited life expectancy, or lower activity levels.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            whileHover={{ y: -15, boxShadow: 8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            sx={{
              height: '100%',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 4,
              border: '1px solid rgba(63,81,181,0.1)',
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image="/images/types/hip-resurfacing.svg"
              alt="Hip Resurfacing"
            />
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                color="primary"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  borderBottom: '2px solid rgba(63,81,181,0.2)',
                  pb: 1,
                  mb: 2
                }}
              >
                Hip Resurfacing
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem'
                }}
              >
                Description
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Preserves more of the femoral bone by reshaping the femoral head and capping it with a metal covering instead of removing it entirely.
              </Typography>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Components
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>
                <li><Typography variant="body2">Metal cap for femoral head</Typography></li>
                <li><Typography variant="body2">Metal acetabular cup</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Pros
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem', color: '#2e7d32' }}>
                <li><Typography variant="body2">Bone preservation</Typography></li>
                <li><Typography variant="body2">Lower dislocation risk</Typography></li>
                <li><Typography variant="body2">Easier revision if needed</Typography></li>
                <li><Typography variant="body2">Better for high-activity patients</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Cons
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', marginTop: 0, marginBottom: '1rem', color: '#c62828' }}>
                <li><Typography variant="body2">Metal ion concerns</Typography></li>
                <li><Typography variant="body2">Not suitable for all patients</Typography></li>
                <li><Typography variant="body2">Femoral neck fracture risk</Typography></li>
              </ul>

              <Typography
                variant="subtitle2"
                color="primary.dark"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.8rem',
                  mt: 2
                }}
              >
                Use Cases
              </Typography>
              <Typography variant="body2">
                Younger, active patients with good bone quality and appropriate anatomy. Less common now due to concerns about metal-on-metal bearings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{ mt: 10 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(63,81,181,0.08) 0%, rgba(255,255,255,0.5) 100%)',
            mb: 4,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '10%',
                width: '80%',
                height: 4,
                borderRadius: 2,
                backgroundColor: 'primary.main',
              }
            }}
          >
            Side-by-Side Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 2 }}>
            Compare the key features of different hip prosthesis types to understand which option might be most suitable for specific patient needs.
          </Typography>
        </Paper>

        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: 'auto',
            border: '1px solid rgba(63,81,181,0.1)',
            '&:hover': {
              boxShadow: 8,
            },
            transition: 'box-shadow 0.3s ease'
          }}
        >
          <Box sx={{ p: 3 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(63,81,181,0.08)' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', borderBottom: '3px solid #3f51b5', color: '#3f51b5', fontWeight: 700, fontSize: '1rem' }}>Feature</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', borderBottom: '3px solid #3f51b5', color: '#3f51b5', fontWeight: 700, fontSize: '1rem' }}>Total Hip Replacement</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', borderBottom: '3px solid #3f51b5', color: '#3f51b5', fontWeight: 700, fontSize: '1rem' }}>Partial Hip Replacement</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', borderBottom: '3px solid #3f51b5', color: '#3f51b5', fontWeight: 700, fontSize: '1rem' }}>Hip Resurfacing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', backgroundColor: 'rgba(63,81,181,0.03)' }}>Bone Preservation</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Low</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Medium</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>High</td>
                </tr>
                <tr style={{ backgroundColor: 'rgba(245,245,245,0.5)' }}>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', backgroundColor: 'rgba(63,81,181,0.03)' }}>Recovery Time</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>3-6 months</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>2-3 months</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>3-6 months</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', backgroundColor: 'rgba(63,81,181,0.03)' }}>Longevity</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', color: '#2e7d32' }}>15-20+ years</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>10-15 years</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>10-15 years</td>
                </tr>
                <tr style={{ backgroundColor: 'rgba(245,245,245,0.5)' }}>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', backgroundColor: 'rgba(63,81,181,0.03)' }}>Activity Restrictions</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Moderate</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', color: '#c62828' }}>Moderate to High</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', color: '#2e7d32' }}>Low</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', backgroundColor: 'rgba(63,81,181,0.03)' }}>Revision Difficulty</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', color: '#c62828' }}>Moderate to High</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Moderate</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', color: '#2e7d32' }}>Low to Moderate</td>
                </tr>
                <tr style={{ backgroundColor: 'rgba(245,245,245,0.5)' }}>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', backgroundColor: 'rgba(63,81,181,0.03)' }}>Best For</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Older patients, severe arthritis</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Elderly with fractures</td>
                  <td style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>Young, active patients</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Card>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Note: The suitability of each prosthesis type depends on individual patient factors including age, activity level, bone quality, and specific medical conditions.
          </Typography>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default TypesPage;
