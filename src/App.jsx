import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton, Box, CssBaseline, Container, Grid, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './App.css'

// Import pages
import HomePage from './pages/HomePage'
import ModelViewerPage from './pages/ModelViewerPage'
import ResearchPage from './pages/ResearchPage'
import TypesPage from './pages/TypesPage'
import MaterialsPage from './pages/MaterialsPage'
import ManufacturingPage from './pages/ManufacturingPage'
import CostAnalysisPage from './pages/CostAnalysisPage'
import FatiguePage from './pages/FatiguePage'
import EnvironmentalPage from './pages/EnvironmentalPage'
import ReferencesPage from './pages/ReferencesPage'

// Import new enhancement pages
import AIRecommendationPage from './pages/AIRecommendationPage'
import StressSimulationPage from './pages/StressSimulationPage'
import ReportGeneratorPage from './pages/ReportGeneratorPage'
import ResearchExplorerPage from './pages/ResearchExplorerPage'
import EnvironmentalScorecard from './pages/EnvironmentalScorecard'
import MaterialAnalysisPage from './pages/MaterialAnalysisPage'

// Create modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', // Modern purple
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#06b6d4',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '1rem',
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(15, 23, 42, 0.05)',
    '0px 1px 3px rgba(15, 23, 42, 0.1), 0px 1px 2px rgba(15, 23, 42, 0.06)',
    '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
    '0px 10px 15px -3px rgba(15, 23, 42, 0.1), 0px 4px 6px -2px rgba(15, 23, 42, 0.05)',
    '0px 20px 25px -5px rgba(15, 23, 42, 0.1), 0px 10px 10px -5px rgba(15, 23, 42, 0.04)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 3px rgba(15, 23, 42, 0.1), 0px 1px 2px rgba(15, 23, 42, 0.06)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 3px rgba(15, 23, 42, 0.1), 0px 1px 2px rgba(15, 23, 42, 0.06)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0px 1px 3px rgba(15, 23, 42, 0.1), 0px 1px 2px rgba(15, 23, 42, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 10px 15px -3px rgba(15, 23, 42, 0.1), 0px 4px 6px -2px rgba(15, 23, 42, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(15, 23, 42, 0.1), 0px 1px 2px rgba(15, 23, 42, 0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: '3D Model', path: '/model' },
    { text: 'Research', path: '/research' },
    { text: 'Types', path: '/types' },
    { text: 'Materials', path: '/materials' },
    { text: 'Manufacturing', path: '/manufacturing' },
    { text: 'Cost Analysis', path: '/cost-analysis' },
    { text: 'Fatigue Analysis', path: '/fatigue' },
    { text: 'Environmental Impact', path: '/environmental' },
    { text: 'References', path: '/references' },
    // New enhancement pages
    { text: 'AI Recommendation', path: '/ai-recommendation' },
    { text: 'Stress Simulation', path: '/stress-simulation' },
    { text: 'Report Generator', path: '/report-generator' },
    { text: 'Research Explorer', path: '/research-explorer' },
    { text: 'Environmental Scorecard', path: '/environmental-scorecard' },
    { text: 'Material Analysis', path: '/material-analysis' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="sticky" color="primary" elevation={0} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
            color: 'text.primary'
          }}>
            <Toolbar sx={{ py: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 2, color: 'primary.main' }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'primary.main',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    mr: 1
                  }}
                />
                Hip Prosthesis Research
              </Typography>

              {/* Desktop navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {[...menuItems.slice(0, 5),
                  menuItems.find(item => item.text === 'Research Explorer'),
                  menuItems.find(item => item.text === 'Material Analysis')
                ].map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{
                      fontWeight: 500,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.2s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '80%',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 280,
                boxShadow: 3,
                borderRight: 'none',
              }
            }}
          >
            <Box
              sx={{ width: 280 }}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <Box sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
              }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    mr: 2
                  }}
                />
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Navigation
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <List sx={{ '& .MuiListItem-root': { mb: 1 } }}>
                  {menuItems.map((item) => (
                    <ListItem
                      key={item.text}
                      component={Link}
                      to={item.path}
                      disablePadding
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        mb: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          py: 1.5,
                          px: 2,
                          borderRadius: 2,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            backgroundColor: 'rgba(37, 99, 235, 0.08)'
                          }
                        }}
                      >
                        <ListItemText
                          primary={item.text}
                          sx={{
                            fontWeight: window.location.hash === `#${item.path}` ? 700 : 500,
                            fontSize: '0.95rem',
                            color: window.location.hash === `#${item.path}` ? 'primary.main' : 'text.primary'
                          }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/model" element={<ModelViewerPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/types" element={<TypesPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/manufacturing" element={<ManufacturingPage />} />
              <Route path="/cost-analysis" element={<CostAnalysisPage />} />
              <Route path="/fatigue" element={<FatiguePage />} />
              <Route path="/environmental" element={<EnvironmentalPage />} />
              <Route path="/references" element={<ReferencesPage />} />
              {/* New enhancement routes */}
              <Route path="/ai-recommendation" element={<AIRecommendationPage />} />
              <Route path="/stress-simulation" element={<StressSimulationPage />} />
              <Route path="/report-generator" element={<ReportGeneratorPage />} />
              <Route path="/research-explorer" element={<ResearchExplorerPage />} />
              <Route path="/environmental-scorecard" element={<EnvironmentalScorecard />} />
              <Route path="/material-analysis" element={<MaterialAnalysisPage />} />
            </Routes>
          </Box>

          <Box
            component="footer"
            sx={{
              py: 6,
              px: 2,
              mt: 'auto',
              backgroundColor: 'rgba(248, 250, 252, 0.8)',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        mr: 2
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      Hip Prosthesis Research
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    A comprehensive educational resource for hip replacement technology, providing detailed information about materials, designs, and innovations in prosthetic implants.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    © {new Date().getFullYear()} Hip Prosthesis Research Project
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Quick Links
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {menuItems.slice(0, 6).map((item) => (
                      <Link
                        key={item.text}
                        to={item.path}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s ease-in-out'
                        }}
                        className="footer-link"
                      >
                        {item.text}
                      </Link>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    About This Project
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Created for educational purposes to provide comprehensive information about hip prosthesis technology.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    All information is based on scientific research and academic sources.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to="/references"
                      sx={{ borderRadius: 8 }}
                    >
                      References
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to="/research-explorer"
                      sx={{ borderRadius: 8 }}
                    >
                      Research Explorer
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
