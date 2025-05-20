import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Lightbulb as LightbulbIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: 'Interactive Learning',
      description: 'Engage with AI concepts through interactive lessons designed for students in grades 6-12.',
    },
    {
      icon: <AssignmentIcon fontSize="large" color="primary" />,
      title: 'Hands-on Projects',
      description: 'Apply your knowledge by building real AI projects with guidance from mentors.',
    },
    {
      icon: <PeopleIcon fontSize="large" color="primary" />,
      title: 'Mentor Support',
      description: 'Connect with experienced mentors who will guide your learning journey.',
    },
    {
      icon: <LightbulbIcon fontSize="large" color="primary" />,
      title: 'Age-Appropriate Content',
      description: 'Content tailored to different grade levels, ensuring the right challenge for every student.',
    },
    {
      icon: <CodeIcon fontSize="large" color="primary" />,
      title: 'Coding Skills',
      description: 'Learn programming fundamentals necessary for AI development.',
    },
    {
      icon: <PsychologyIcon fontSize="large" color="primary" />,
      title: 'AI Ethics',
      description: 'Understand the ethical implications and responsible use of artificial intelligence.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Learn AI the Fun Way
              </Typography>
              <Typography variant="h5" paragraph>
                An educational platform designed specifically for students in grades 6-12 to explore the exciting world of artificial intelligence.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://source.unsplash.com/random/600x400/?ai,technology,education"
                alt="AI Education"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Platform Features
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Everything you need to start your AI learning journey
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Courses Preview Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Featured Courses
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Start your AI learning journey with these popular courses
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[1, 2, 3].map((course) => (
              <Grid item xs={12} md={4} key={course}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://source.unsplash.com/random/600x400/?ai,technology,${course}`}
                    alt={`Course ${course}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {['Introduction to AI', 'Machine Learning Basics', 'AI Ethics for Students'][course - 1]}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {[
                        'Learn the fundamentals of artificial intelligence and how it impacts our daily lives.',
                        'Discover how machines can learn from data and make predictions.',
                        'Understand the ethical considerations and responsible use of AI technology.',
                      ][course - 1]}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/courses')}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" size="large" onClick={() => navigate('/courses')}>
              View All Courses
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Ready to Start Your AI Journey?
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Join our platform today and begin exploring the exciting world of artificial intelligence with the guidance of experienced mentors.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/register')}>
          Sign Up Now
        </Button>
      </Container>
    </Box>
  );
};

export default Home;

