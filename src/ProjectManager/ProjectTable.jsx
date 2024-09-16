// // import React, { useState, useEffect } from 'react';
// // import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// // import AdminLayout from './Ad'; // Import AdminLayout component
// // import ProjectCard from './ProjectCard'; // Import ProjectCard component

// // const ProjectTable = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [open, setOpen] = useState(false);
// //   const [newProject, setNewProject] = useState({
// //     projectName: '',
// //     description: '',
// //     startDate: '',
// //     endDate: '',
// //     requirementSkills: '',
// //     members: 0,
// //     projectStatus: ''
// //   });

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);

// //   const fetchProjects = async () => {
// //     try {
// //       const response = await fetch('http://localhost:7777/projects/create');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setProjects(data);
// //       } else {
// //         console.error('Failed to fetch projects');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching projects:', error);
// //     }
// //   };

// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewProject((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleAddProject = async () => {
// //     try {
// //       const response = await fetch('http://localhost:7777/projects/create', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(newProject),
// //       });

// //       if (response.ok) {
// //         await response.json();
// //         fetchProjects(); // Fetch the updated list of projects
// //         setNewProject({ // Reset form fields
// //           projectName: '',
// //           description: '',
// //           startDate: '',
// //           endDate: '',
// //           requirementSkills: '',
// //           members: 0,
// //           projectStatus: ''
// //         });
// //         handleClose(); // Close the modal
// //       } else {
// //         console.error('Failed to add project');
// //       }
// //     } catch (error) {
// //       console.error('Error adding project:', error);
// //     }
// //   };

// //   return (
// //     <AdminLayout>
// //       <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
// //         Add Project
// //       </Button>
// //       <Grid container spacing={2}>
// //         {projects.map((project) => (
// //           <Grid item key={project.projectId}>
// //             <ProjectCard project={project} />
// //           </Grid>
// //         ))}
// //       </Grid>

// //       <Dialog open={open} onClose={handleClose}>
// //         <DialogTitle>Add New Project</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             margin="dense"
// //             label="Project Name"
// //             type="text"
// //             fullWidth
// //             variant="outlined"
// //             name="projectName"
// //             value={newProject.projectName}
// //             onChange={handleInputChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Description"
// //             type="text"
// //             fullWidth
// //             variant="outlined"
// //             name="description"
// //             value={newProject.description}
// //             onChange={handleInputChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Start Date"
// //             type="date"
// //             fullWidth
// //             variant="outlined"
// //             name="startDate"
// //             value={newProject.startDate}
// //             onChange={handleInputChange}
// //             InputLabelProps={{ shrink: true }}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="End Date"
// //             type="date"
// //             fullWidth
// //             variant="outlined"
// //             name="endDate"
// //             value={newProject.endDate}
// //             onChange={handleInputChange}
// //             InputLabelProps={{ shrink: true }}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Required Skills"
// //             type="text"
// //             fullWidth
// //             variant="outlined"
// //             name="requirementSkills"
// //             value={newProject.requirementSkills}
// //             onChange={handleInputChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Members"
// //             type="number"
// //             fullWidth
// //             variant="outlined"
// //             name="members"
// //             value={newProject.members}
// //             onChange={handleInputChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Project Status"
// //             type="text"
// //             fullWidth
// //             variant="outlined"
// //             name="projectStatus"
// //             value={newProject.projectStatus}
// //             onChange={handleInputChange}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleClose} color="primary">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleAddProject} color="primary">
// //             Add Project
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </AdminLayout>
// //   );
// // };

// // export default ProjectTable;


// import React, { useState, useEffect } from 'react';
// import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// import AdminLayout from './Ad'; // Import AdminLayout component
// import ProjectCard from './ProjectCard'; // Import ProjectCard component

// const ProjectTable = () => {
//   const [projects, setProjects] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newProject, setNewProject] = useState({
//     projectName: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     requirementSkills: '',
//     members: 0,
//     projectStatus: '',
//     userId: '' // Add userId to state
//   });

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/project/getAll'); // Adjust the URL if needed
//       if (response.ok) {
//         const data = await response.json();
//         setProjects(data);
//       } else {
//         console.error('Failed to fetch projects');
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddProject = async () => {
//     try {
//       const userId = getUserId(); // Retrieve userId from session storage
//       const response = await fetch('http://localhost:7737/project/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...newProject, userId }), // Include userId in the request payload
//       });

//       if (response.ok) {
//         await response.json();
//         fetchProjects(); // Fetch the updated list of projects
//         setNewProject({ // Reset form fields
//           projectName: '',
//           description: '',
//           startDate: '',
//           endDate: '',
//           requirementSkills: '',
//           members: 0,
//           projectStatus: '',
//           userId: '' // Reset userId as well
//         });
//         handleClose(); // Close the modal
//       } else {
//         console.error('Failed to add project');
//       }
//     } catch (error) {
//       console.error('Error adding project:', error);
//     }
//   };

//   const getUserId = () => {
//     return sessionStorage.getItem('userId'); // Retrieve userId from session storage
//   };

//   return (
//     <AdminLayout>
//       <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
//         Add Project
//       </Button>
//       <Grid container spacing={2}>
//         {projects.map((project) => (
//           <Grid item key={project.projectId}>
//             <ProjectCard project={project} />
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Project</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Project Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="projectName"
//             value={newProject.projectName}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Description"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="description"
//             value={newProject.description}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Start Date"
//             type="date"
//             fullWidth
//             variant="outlined"
//             name="startDate"
//             value={newProject.startDate}
//             onChange={handleInputChange}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="End Date"
//             type="date"
//             fullWidth
//             variant="outlined"
//             name="endDate"
//             value={newProject.endDate}
//             onChange={handleInputChange}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Required Skills"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="requirementSkills"
//             value={newProject.requirementSkills}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Members"
//             type="number"
//             fullWidth
//             variant="outlined"
//             name="members"
//             value={newProject.members}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Project Status"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="projectStatus"
//             value={newProject.projectStatus}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddProject} color="primary">
//             Add Project
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default ProjectTable;
