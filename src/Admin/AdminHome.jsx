// import * as React from 'react';
// import { Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import WorkIcon from '@mui/icons-material/Work';
// import PeopleIcon from '@mui/icons-material/People';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { Route, Routes, Link } from 'react-router-dom';
// import EmployeeTable from './EmployeeList'; // Ensure the correct path is used
// // Import other components as needed
// // import HomePage from './HomePage';
// // import ProjectsPage from './ProjectsPage';
// // import NotificationsPage from './NotificationsPage';

// const drawerWidth = 240;

// export default function AdminHome() {
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = () => {
//     sessionStorage.clear(); // Clear session storage
//     window.location.href = '/'; // Redirect to home page
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         <ListItem button component={Link} to="/adminhome">
//           <HomeIcon />
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/projects">
//           <WorkIcon />
//           <ListItemText primary="Projects" />
//         </ListItem>
//         <ListItem button component={Link} to="/employeeslist">
//           <PeopleIcon />
//           <ListItemText primary="Employees" />
//         </ListItem>
//         <ListItem button component={Link} to="/notifications">
//           <NotificationsIcon />
//           <ListItemText primary="Notifications" />
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         <ListItem>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleLogout}
//             sx={{ margin: '16px', width: '100%' }}
//           >
//             Logout
//           </Button>
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'black' }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             bgcolor: 'black',
//             color: 'white',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open
//       >
//         {drawer}
//       </Drawer>
//       <main
//         style={{
//           flexGrow: 1,
//           padding: '24px',
//           marginTop: '64px',
//           backgroundColor: '#f5f5f5',
//           minHeight: '100vh'
//         }}
//       >
//         <Routes>
//         <Route path="/employeeslist" element={<EmployeeTable />} />
//           {/* <Route path="/adminhome" element={<HomePage />} />
//           <Route path="/projects" element={<ProjectsPage />} />
         
//           <Route path="/notifications" element={<NotificationsPage />} /> */}
//         </Routes>
//       </main>
//     </div>
//   );
// }

import React from 'react';
import { Grid, Paper } from '@mui/material';
import PieChart from './PieChart'; // Import PieChart component
import Barchart from './Barchart'; // Import Barchart component
import AdminLayout from './Ad'; // Import AdminLayout component

const AdminHome = () => {
  return (
    <AdminLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <PieChart width={500} height={500} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Barchart width={500} height={500} />
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminHome;
