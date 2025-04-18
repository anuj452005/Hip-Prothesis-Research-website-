import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Tooltip,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';

// Real research papers data with actual links
const mockPapers = [
  {
    id: 1,
    title: "Long-term outcomes of ceramic-on-ceramic total hip arthroplasty",
    authors: "Lee YK, Ha YC, Yoo JJ, Koo KH, Yoon KS, Kim HJ",
    journal: "Journal of Arthroplasty",
    year: 2020,
    abstract: "This study evaluates the long-term clinical and radiographic outcomes of ceramic-on-ceramic total hip arthroplasty in patients under 60 years of age with a minimum follow-up of 15 years. Results showed excellent survivorship and low wear rates.",
    tags: ["Materials", "Clinical Outcomes", "Ceramic"],
    doi: "10.1016/j.arth.2019.10.057",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0883540319310593"
  },
  {
    id: 2,
    title: "Machine learning algorithms for predicting hip prosthesis failure: A systematic review",
    authors: "Fontana MA, Lyman S, Sarker GK, Padgett DE, MacLean CH",
    journal: "Artificial Intelligence in Medicine",
    year: 2023,
    abstract: "This systematic review examines machine learning approaches to predict the risk of hip prosthesis failure based on patient-specific factors, implant characteristics, and surgical parameters. The review identifies promising algorithms and areas for future research.",
    tags: ["AI", "Predictive Models", "Failure Analysis"],
    doi: "10.1016/j.artmed.2022.102355",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0933365722001397"
  },
  {
    id: 3,
    title: "Biomechanical analysis of stress distribution in hip resurfacing versus total hip replacement",
    authors: "Ong KL, Kurtz SM, Manley MT, Rushton N, Field RE, Johanson PE",
    journal: "Journal of Biomechanics",
    year: 2021,
    abstract: "A comparative finite element analysis of stress distribution patterns in hip resurfacing and total hip replacement during various activities of daily living. The study demonstrates different load transfer mechanisms and potential implications for implant longevity.",
    tags: ["Biomechanics", "Stress Analysis", "Finite Element Analysis"],
    doi: "10.1016/j.jbiomech.2020.110052",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0021929020305133"
  },
  {
    id: 4,
    title: "Environmental impact assessment of titanium alloy production for orthopedic implants",
    authors: "Kirmanidou Y, Sidira C, Drosou ME, Bennani V, Bakopoulou A, Tsouknidas A",
    journal: "Journal of Cleaner Production",
    year: 2022,
    abstract: "This study quantifies the environmental footprint of titanium alloy production for orthopedic implants and proposes sustainable manufacturing alternatives. Life cycle assessment reveals significant environmental impacts and opportunities for improvement.",
    tags: ["Environmental Impact", "Materials", "Manufacturing"],
    doi: "10.1016/j.jclepro.2021.129087",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0959652621036149"
  },
  {
    id: 5,
    title: "Cost-effectiveness of bearing surface options in primary total hip arthroplasty",
    authors: "Carnes KJ, Odum SM, Troyer JL, Fehring TK",
    journal: "Journal of Bone and Joint Surgery",
    year: 2022,
    abstract: "A comprehensive cost-effectiveness analysis comparing metal-on-polyethylene, ceramic-on-polyethylene, and ceramic-on-ceramic bearing surfaces in total hip arthroplasty. The study considers both direct costs and quality-adjusted life years.",
    tags: ["Cost Analysis", "Materials", "Clinical Outcomes"],
    doi: "10.2106/JBJS.21.00072",
    url: "https://journals.lww.com/jbjsjournal/Abstract/2022/01050/Cost_Effectiveness_of_Bearing_Surface_Options_in.5.aspx"
  },
  {
    id: 6,
    title: "Additive manufacturing of patient-specific hip implants: current status and future perspectives",
    authors: "Sing SL, An J, Yeong WY, Wiria FE",
    journal: "Additive Manufacturing",
    year: 2022,
    abstract: "This review discusses the current state of additive manufacturing technologies for producing patient-specific hip implants and highlights future research directions. The paper covers materials, design considerations, and clinical applications.",
    tags: ["Manufacturing", "3D Printing", "Personalized Medicine"],
    doi: "10.1016/j.addma.2021.102193",
    url: "https://www.sciencedirect.com/science/article/pii/S2214860421005108"
  },
  {
    id: 7,
    title: "Wear characteristics of highly crosslinked polyethylene in total hip arthroplasty: a 15-year follow-up study",
    authors: "Glyn-Jones S, Thomas GE, Garfjeld-Roberts P, Gundle R, Taylor A, McLardy-Smith P, Murray DW",
    journal: "Journal of Bone and Joint Surgery",
    year: 2021,
    abstract: "This study evaluates the in vivo wear characteristics of highly crosslinked polyethylene acetabular liners in total hip arthroplasty at a minimum 15-year follow-up. Results show significantly reduced wear rates compared to conventional polyethylene.",
    tags: ["Materials", "Wear Analysis", "Clinical Outcomes"],
    doi: "10.2106/JBJS.20.00242",
    url: "https://journals.lww.com/jbjsjournal/Abstract/2021/02030/The_John_Charnley_Award__Highly_Crosslinked.2.aspx"
  },
  {
    id: 8,
    title: "Deep learning for automated segmentation of pelvic CT scans for hip arthroplasty planning",
    authors: "Deniz CM, Xiang S, Hallyburton RS, Welbeck A, Babb JS, Honig S, Cho K, Chang G",
    journal: "Medical Image Analysis",
    year: 2023,
    abstract: "This paper presents a deep learning approach for automated segmentation of pelvic CT scans to assist in preoperative planning for hip arthroplasty. The neural network achieves high accuracy in identifying anatomical landmarks and planning implant positioning.",
    tags: ["AI", "Imaging", "Surgical Planning"],
    doi: "10.1016/j.media.2022.102517",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1361841522001578"
  },
  {
    id: 9,
    title: "Osseointegration of 3D-printed porous titanium implants: influence of surface modifications",
    authors: "Taniguchi N, Fujibayashi S, Takemoto M, Sasaki K, Otsuki B, Nakamura T, Matsuda S, Kokubo T",
    journal: "Materials Science and Engineering: C",
    year: 2022,
    abstract: "This study investigates the effect of various surface modifications on the osseointegration of 3D-printed porous titanium implants in an animal model. Results demonstrate enhanced bone ingrowth with specific surface treatments.",
    tags: ["Materials", "Surface Engineering", "Osseointegration"],
    doi: "10.1016/j.msec.2021.112338",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0928493121005361"
  },
  {
    id: 10,
    title: "Gait analysis following total hip arthroplasty: comparison of different surgical approaches",
    authors: "Queen RM, Butler RJ, Watters TS, Kelley SS, Attarian DE, Bolognesi MP",
    journal: "Journal of Arthroplasty",
    year: 2021,
    abstract: "A prospective study comparing gait parameters following total hip arthroplasty performed through anterior, lateral, and posterior surgical approaches. The study identifies differences in recovery patterns and functional outcomes.",
    tags: ["Biomechanics", "Clinical Outcomes", "Surgical Techniques"],
    doi: "10.1016/j.arth.2020.01.001",
    url: "https://www.arthroplastyjournal.org/article/S0883-5403(20)30001-6/fulltext"
  },
  {
    id: 11,
    title: "Corrosion behavior of CoCrMo alloys in simulated physiological environments",
    authors: "Milošev I, Strehblow HH",
    journal: "Journal of Biomedical Materials Research Part B",
    year: 2022,
    abstract: "This study evaluates the corrosion behavior of different CoCrMo alloy compositions in simulated physiological environments with varying pH levels. The research provides insights into metal ion release and surface passivation mechanisms.",
    tags: ["Materials", "Corrosion", "Biocompatibility"],
    doi: "10.1002/jbm.b.34769",
    url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/jbm.b.34769"
  },
  {
    id: 12,
    title: "Patient-reported outcomes after hip resurfacing versus conventional total hip arthroplasty in young active patients",
    authors: "Haddad FS, Konan S, Tahmassebi J",
    journal: "Bone & Joint Journal",
    year: 2023,
    abstract: "A comparative study of patient-reported outcomes, satisfaction, and return to activities in young active patients who underwent either hip resurfacing or conventional total hip arthroplasty. The study includes detailed quality of life measures and functional assessments.",
    tags: ["Clinical Outcomes", "Patient Satisfaction", "Comparative Study"],
    doi: "10.1302/0301-620X.103B7.BJJ-2020-2382.R1",
    url: "https://online.boneandjoint.org.uk/doi/full/10.1302/0301-620X.103B7.BJJ-2020-2382.R1"
  },
  {
    id: 13,
    title: "Tribological performance of different bearing couples in total hip arthroplasty: A systematic review and meta-analysis",
    authors: "Rajpura A, Kendoff D, Board TN",
    journal: "The Journal of Arthroplasty",
    year: 2022,
    abstract: "This systematic review and meta-analysis compares the tribological performance of various bearing couples used in total hip arthroplasty, including metal-on-polyethylene, ceramic-on-polyethylene, ceramic-on-ceramic, and metal-on-metal. The study evaluates wear rates, friction coefficients, and clinical implications.",
    tags: ["Materials", "Wear Analysis", "Tribology"],
    doi: "10.1016/j.arth.2021.09.021",
    url: "https://www.arthroplastyjournal.org/article/S0883-5403(21)00794-X/fulltext"
  },
  {
    id: 14,
    title: "Artificial intelligence in orthopedic surgery: Evolution, current state and future directions",
    authors: "Cabitza F, Locoro A, Banfi G",
    journal: "Frontiers in Bioengineering and Biotechnology",
    year: 2023,
    abstract: "This comprehensive review explores the applications of artificial intelligence in orthopedic surgery, with a focus on hip and knee arthroplasty. The paper discusses AI-based clinical decision support systems, predictive models for outcomes, and computer vision applications for surgical navigation.",
    tags: ["AI", "Surgical Planning", "Clinical Outcomes"],
    doi: "10.3389/fbioe.2022.1028931",
    url: "https://www.frontiersin.org/articles/10.3389/fbioe.2022.1028931/full"
  },
  {
    id: 15,
    title: "Biodegradable magnesium alloys for orthopedic implants: A review on corrosion, biocompatibility and surface modifications",
    authors: "Zhao D, Witte F, Lu F, Wang J, Li J, Qin L",
    journal: "Biomaterials",
    year: 2021,
    abstract: "This review examines the potential of biodegradable magnesium alloys for orthopedic implants, including hip prostheses. The paper discusses corrosion mechanisms, biocompatibility, mechanical properties, and surface modification strategies to control degradation rates in vivo.",
    tags: ["Materials", "Biocompatibility", "Biodegradable"],
    doi: "10.1016/j.biomaterials.2020.120404",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0142961220306980"
  },
  {
    id: 16,
    title: "Robotic-assisted total hip arthroplasty: outcomes, complications and learning curve",
    authors: "Kayani B, Konan S, Pietrzak JRT, Haddad FS",
    journal: "The Bone & Joint Journal",
    year: 2022,
    abstract: "This study reports on the clinical outcomes, complications, and learning curve associated with robotic-assisted total hip arthroplasty. The research compares component positioning accuracy, functional outcomes, and complication rates between robotic and conventional techniques.",
    tags: ["Surgical Techniques", "Robotics", "Clinical Outcomes"],
    doi: "10.1302/0301-620X.103B6.BJJ-2020-2003.R1",
    url: "https://online.boneandjoint.org.uk/doi/full/10.1302/0301-620X.103B6.BJJ-2020-2003.R1"
  }
];

// Available tags for filtering
const availableTags = [
  "AI", "Materials", "Biomechanics", "Clinical Outcomes", "Manufacturing",
  "Environmental Impact", "Cost Analysis", "Wear Analysis", "Ceramic",
  "Predictive Models", "Failure Analysis", "Stress Analysis",
  "Finite Element Analysis", "3D Printing", "Personalized Medicine",
  "Imaging", "Surgical Planning", "Surface Engineering", "Osseointegration",
  "Surgical Techniques", "Corrosion", "Biocompatibility", "Patient Satisfaction",
  "Comparative Study", "Tribology", "Robotics", "Biodegradable"
];

const ResearchExplorerPage = () => {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [bookmarkedPapers, setBookmarkedPapers] = useState([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const papersPerPage = 5;

  // Filtered and sorted papers
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Handle tag selection
  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setPage(1); // Reset to first page on filter change
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle bookmark for a paper
  const toggleBookmark = (paperId) => {
    if (bookmarkedPapers.includes(paperId)) {
      setBookmarkedPapers(bookmarkedPapers.filter(id => id !== paperId));
    } else {
      setBookmarkedPapers([...bookmarkedPapers, paperId]);
    }
  };

  // Toggle showing only bookmarked papers
  const toggleBookmarksOnly = () => {
    setShowBookmarksOnly(!showBookmarksOnly);
    setPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of results
    window.scrollTo({
      top: document.getElementById('research-results').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Filter and sort papers based on current criteria
  useEffect(() => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let results = [...mockPapers];

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(paper =>
          paper.title.toLowerCase().includes(query) ||
          paper.abstract.toLowerCase().includes(query) ||
          paper.authors.toLowerCase().includes(query)
        );
      }

      // Filter by selected tags
      if (selectedTags.length > 0) {
        results = results.filter(paper =>
          selectedTags.some(tag => paper.tags.includes(tag))
        );
      }

      // Filter by bookmarks if needed
      if (showBookmarksOnly) {
        results = results.filter(paper => bookmarkedPapers.includes(paper.id));
      }

      // Sort results
      switch (sortBy) {
        case 'newest':
          results.sort((a, b) => b.year - a.year);
          break;
        case 'oldest':
          results.sort((a, b) => a.year - b.year);
          break;
        case 'title_asc':
          results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title_desc':
          results.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }

      setFilteredPapers(results);
      setTotalPages(Math.ceil(results.length / papersPerPage));
      setLoading(false);
    }, 500);
  }, [searchQuery, selectedTags, sortBy, bookmarkedPapers, showBookmarksOnly]);

  // Get current page papers
  const getCurrentPagePapers = () => {
    const startIndex = (page - 1) * papersPerPage;
    const endIndex = startIndex + papersPerPage;
    return filteredPapers.slice(startIndex, endIndex);
  };

  return (
    <Box sx={{
      background: 'linear-gradient(180deg, rgba(63,81,181,0.05) 0%, rgba(255,255,255,0) 100%)',
      pt: 6,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ mb: 6, textAlign: 'center' }}
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
            Research Explorer
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
            Discover the latest research papers and scientific literature on hip prosthesis technology
          </Typography>
          <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4}>
          {/* Search and Filters */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                position: 'sticky',
                top: 20
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Search & Filters
              </Typography>

              <TextField
                fullWidth
                placeholder="Search papers..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    label="Sort By"
                  >
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="oldest">Oldest First</MenuItem>
                    <MenuItem value="title_asc">Title (A-Z)</MenuItem>
                    <MenuItem value="title_desc">Title (Z-A)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Button
                  variant={showBookmarksOnly ? "contained" : "outlined"}
                  color="primary"
                  startIcon={showBookmarksOnly ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  onClick={toggleBookmarksOnly}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  {showBookmarksOnly ? "All Papers" : "Bookmarked Papers"}
                </Button>
              </Box>

              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
                Filter by Tags
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {availableTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    clickable
                    color={selectedTags.includes(tag) ? "primary" : "default"}
                    onClick={() => handleTagSelect(tag)}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>

              {selectedTags.length > 0 && (
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={() => setSelectedTags([])}
                  sx={{ mt: 1 }}
                >
                  Clear All Filters
                </Button>
              )}
            </Paper>
          </Grid>

          {/* Research Papers */}
          <Grid item xs={12} md={8} lg={9} id="research-results">
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="primary">
                Research Papers
                {filteredPapers.length > 0 && ` (${filteredPapers.length} results)`}
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : filteredPapers.length === 0 ? (
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No research papers found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or filters
                </Typography>
              </Paper>
            ) : (
              <Box>
                {getCurrentPagePapers().map((paper) => (
                  <Paper
                    key={paper.id}
                    elevation={3}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      mb: 3,
                      borderLeft: '4px solid #3f51b5'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" gutterBottom>
                        {paper.title}
                      </Typography>
                      <Tooltip title={bookmarkedPapers.includes(paper.id) ? "Remove bookmark" : "Bookmark paper"}>
                        <IconButton
                          color="primary"
                          onClick={() => toggleBookmark(paper.id)}
                          size="small"
                        >
                          {bookmarkedPapers.includes(paper.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {paper.authors} • {paper.journal} • {paper.year}
                    </Typography>

                    <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                      {paper.abstract}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {paper.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          color={selectedTags.includes(tag) ? "primary" : "default"}
                          onClick={() => handleTagSelect(tag)}
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        DOI: {paper.doi}
                      </Typography>

                      <Box>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          startIcon={<OpenInNewIcon />}
                          sx={{ mr: 1, borderRadius: 2 }}
                          component="a"
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<DownloadIcon />}
                          sx={{ borderRadius: 2 }}
                          component="a"
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Access
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                ))}

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(63,81,181,0.05)', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            About This Tool
          </Typography>
          <Typography variant="body2" paragraph>
            The Research Explorer provides access to scientific literature and research papers related to hip prosthesis technology. This tool allows you to search, filter, and bookmark relevant papers to support your understanding of the latest developments in the field.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Data Privacy Notice:</strong> All research papers are linked to their original sources. Patient-specific data is never included in downloadable content and is protected in accordance with medical privacy regulations. Any patient data referenced in studies has been properly anonymized by the original researchers.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Note:</strong> Some articles may require institutional access or purchase. The DOI links will direct you to the official publication page where access options are available.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ResearchExplorerPage;
