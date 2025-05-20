import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { getCourses } from '../features/courses/courseSlice';
import { getProjects } from '../features/projects/projectSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const { courses, loading: coursesLoading } = useSelector((state: RootState) => state.courses);
  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/login');
    } else {
      dispatch(getCourses());
      dispatch(getProjects());
    }
  }, [isAuthenticated, authLoading, navigate, dispatch]);

  if (authLoading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Mock data for the dashboard
  const enrolledCourses = courses.slice(0, 3);
  const recentProjects = projects.slice(0, 3);
  const upcomingDeadlines = [
    { id: 1, title: 'Submit AI Ethics Project', date: '2023-06-15', course: 'AI Ethics' },
    { id: 2, title: 'Complete Machine Learning Quiz', date: '2023-06-18', course: 'Machine Learning Basics' },
    { id: 3, title: 'Group Project Presentation', date: '2023-06-22', course: 'Introduction to AI' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user.role === 'student' ? `Grade ${user.grade} Student` : user.role === 'mentor' ? 'Mentor' : 'Administrator'}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Progress Summary */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Your Progress
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h4">{enrolledCourses.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enrolled Courses
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h4">{recentProjects.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Projects
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <TimelineIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h4">68%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Progress
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h4">1</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned Mentor
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Enrolled Courses */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Your Courses
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {coursesLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : enrolledCourses.length > 0 ? (
                <List>
                  {enrolledCourses.map((course, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={course.title} src={course.thumbnail} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={course.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                            </Typography>
                            {` — ${course.description.substring(0, 60)}...`}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                  You are not enrolled in any courses yet.
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <Button size="small" color="primary" onClick={() => navigate('/courses')}>
                View All Courses
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recent Projects */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Your Projects
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {projectsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : recentProjects.length > 0 ? (
                <List>
                  {recentProjects.map((project, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>
                          <AssignmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={project.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Typography>
                            {` — ${project.description.substring(0, 60)}...`}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                  You don't have any active projects.
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <Button size="small" color="primary" onClick={() => navigate('/projects')}>
                View All Projects
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Upcoming Deadlines
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {upcomingDeadlines.map((deadline) => (
                  <ListItem key={deadline.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {deadline.date.split('-')[2]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={deadline.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Due: {new Date(deadline.date).toLocaleDateString()}
                          </Typography>
                          {` — ${deadline.course}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

