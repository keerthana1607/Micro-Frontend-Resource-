
// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Button,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import AdminLayout from './Ad'; // Ensure this is the correct import path

// const ViewProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('http://localhost:7737/project/getAll');
//         if (response.ok) {
//           const data = await response.json();
//           setProjects(data);
//         } else {
//           console.error('Failed to fetch projects');
//         }
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleAssign = async (project) => {
//     setSelectedProject(project);
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUnmappedUser'); // Replace with your actual endpoint
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Fetched user data:', data); // Debugging

//       // Assuming your employee data structure has a field `role`
//       const employeesList = data.filter(user => user.role === 'employee');
//       console.log('Filtered employees:', employeesList); // Debugging

//       // Extract skills required from the project
//       const requiredSkills = project.requirementSkills ? project.requirementSkills.toLowerCase().split(',').map(skill => skill.trim()) : [];

//       // Filter employees based on required skills
//       const filteredList = employeesList.filter(employee => {
//         const employeeSkills = employee.skills ? employee.skills.toLowerCase().split(',').map(skill => skill.trim()) : [];
//         return requiredSkills.some(requiredSkill => employeeSkills.includes(requiredSkill));
//       });

//       setEmployees(employeesList);
//       setFilteredEmployees(filteredList);
//       setSelectedEmployees([]); // Reset selected employees
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     } finally {
//       setLoading(false);
//       setOpenDialog(true);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployees((prevSelected) =>
//       prevSelected.includes(employee.userId)
//         ? prevSelected.filter(id => id !== employee.userId)
//         : [...prevSelected, employee.userId]
//     );
//   };

//   const handleAllocate = async () => {
//     if (!selectedProject) return;

//     try {
//       const response = await fetch(`http://localhost:7737/project/update/${selectedProject.projectId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selectedEmployees), // Send array directly
//       });

//       const responseText = await response.text(); // Get the response text for debugging

//       if (response.ok) {
//         console.log('Response:', responseText); // Log the successful response

//         // Fetch the updated list of projects and employees
//         const responseProjects = await fetch('http://localhost:7737/project/getAll');
//         const dataProjects = await responseProjects.json();
//         setProjects(dataProjects);

//         const responseEmployees = await fetch('http://localhost:7737/user/getAllUnmappedUser');
//         const dataEmployees = await responseEmployees.json();
//         const employeesList = dataEmployees.filter(user => user.role === 'employee');
//         setEmployees(employeesList);

//         // Close the dialog
//         handleCloseDialog();

//         // Show success alert
//         Swal.fire({
//           icon: 'success',
//           title: 'Employees Allocated',
//           text: 'Employees have been successfully allocated to the project.',
//           confirmButtonText: 'OK'
//         });
//       } else {
//         console.error('Failed to allocate employees:', responseText); // Log the response text
//         Swal.fire({
//           icon: 'error',
//           title: 'Allocation Failed',
//           text: `Failed to allocate employees: ${responseText}`,
//           confirmButtonText: 'OK'
//         });
//       }
//     } catch (error) {
//       console.error('Error allocating employees:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while allocating employees.',
//         confirmButtonText: 'OK'
//       });
//     }
//   };

//   return (
//     <AdminLayout>
//       <Grid container spacing={3} style={{ padding: '15px' }}>
//         {projects.map((project) => {
//           const isAllocated = Array.isArray(project.emp) && project.emp.length > 0;
//           const projectStatus = isAllocated ? 'Project Allocated' : 'Pending';

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={project.projectId}>
//               <Card 
//                 style={{ 
//                   borderRadius: '12px', 
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
//                   position: 'relative'
//                 }}
//               >
//                 <CardContent style={{ paddingBottom: '80px' }}>
//                   <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
//                     {project.projectName || 'No Project Name'}
//                   </Typography>
//                   <Chip 
//                     label={projectStatus}
//                     style={{
//                       marginTop: '10px',
//                       borderRadius: '20px',
//                       padding: '5px 10px',
//                       backgroundColor: isAllocated ? '#4caf50' : '#ffa31a',
//                       color: '#fff',
//                       fontWeight: 'bold'
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
//                     <strong>Description:</strong> {project.description || 'No Description'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Start Date:</strong> {project.startDate || 'No Start Date'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>End Date:</strong> {project.endDate || 'No End Date'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Skills Required:</strong> {project.requirementSkills || 'No Skills Required'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Members:</strong> {project.members || 'No Members'}
//                   </Typography>
//                 </CardContent>
//                 {projectStatus === 'Pending' && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       borderRadius: '20px',
//                     }}
//                     onClick={() => handleAssign(project)}
//                   >
//                     Assign
//                   </Button>
//                 )}
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Employee Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Select Employees</DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <CircularProgress />
//           ) : (
//             <List>
//               {filteredEmployees.length === 0 ? (
//                 <ListItem>
//                   <ListItemText primary="No employees found with required skills" />
//                 </ListItem>
//               ) : (
//                 filteredEmployees.map((employee) => (
//                   <ListItem key={employee.userId}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={selectedEmployees.includes(employee.userId)}
//                           onChange={() => handleEmployeeSelect(employee)}
//                         />
//                       }
//                       label={
//                         <ListItemText
//                           primary={employee.userName}
//                           secondary={
//                             <>
//                               <div>{employee.userEmail}</div>
//                               <div><strong>Skills:</strong> {employee.skills}</div>
//                             </>
//                           }
//                         />
//                       }
//                     />
//                   </ListItem>
//                 ))
//               )}
//             </List>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//           <Button onClick={handleAllocate} color="primary" disabled={selectedEmployees.length === 0}>
//             Allocate
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default ViewProjects;



// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Button,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
//   Checkbox,
//   FormControlLabel,
//   TextField
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import AdminLayout from './Ad'; // Ensure this is the correct import path

// const ViewProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openTaskDialog, setOpenTaskDialog] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [taskDescription, setTaskDescription] = useState('');

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('http://localhost:7737/project/getAll');
//         if (response.ok) {
//           const data = await response.json();
//           setProjects(data);
//         } else {
//           console.error('Failed to fetch projects');
//         }
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleAssign = async (project) => {
//     setSelectedProject(project);
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUnmappedUser'); // Replace with your actual endpoint
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Fetched user data:', data); // Debugging

//       // Assuming your employee data structure has a field `role`
//       const employeesList = data.filter(user => user.role === 'employee');
//       console.log('Filtered employees:', employeesList); // Debugging

//       // Extract skills required from the project
//       const requiredSkills = project.requirementSkills ? project.requirementSkills.toLowerCase().split(',').map(skill => skill.trim()) : [];

//       // Filter employees based on required skills
//       const filteredList = employeesList.filter(employee => {
//         const employeeSkills = employee.skills ? employee.skills.toLowerCase().split(',').map(skill => skill.trim()) : [];
//         return requiredSkills.some(requiredSkill => employeeSkills.includes(requiredSkill));
//       });

//       setEmployees(employeesList);
//       setFilteredEmployees(filteredList);
//       setSelectedEmployees([]); // Reset selected employees
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     } finally {
//       setLoading(false);
//       setOpenDialog(true);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleCloseTaskDialog = () => {
//     setOpenTaskDialog(false);
//     setTaskDescription(''); // Clear the task description
//   };

//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployees((prevSelected) =>
//       prevSelected.includes(employee.userId)
//         ? prevSelected.filter(id => id !== employee.userId)
//         : [...prevSelected, employee.userId]
//     );
//   };

//   const handleCreateTasks = async () => {
//     if (!selectedProject || !taskDescription.trim()) return;

//     try {
//       console.log('Creating tasks with description:', taskDescription);

//       // Create tasks for selected employees
//       const taskCreationPromises = selectedEmployees.map(employeeId =>
//         fetch('http://localhost:7737/task/create', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             taskName: taskDescription,
//             taskStatus: 'Not Started',
//             estimatedHours: 0,
//             project: {
//               projectId: selectedProject.projectId,
//             },
//             assignedTo: employeeId,
//           }),
//         })
//       );

//       // Wait for all tasks to be created
//       await Promise.all(taskCreationPromises);

//       // Update the project with selected employees
//       const response = await fetch(`http://localhost:7737/project/update/${selectedProject.projectId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selectedEmployees), // Sending array of employee IDs
//       });

//       const responseText = await response.text(); // Get the response text for debugging

//       if (response.ok) {
//         console.log('Response:', responseText); // Log the successful response

//         // Fetch the updated list of projects and employees
//         const responseProjects = await fetch('http://localhost:7737/project/getAll');
//         const dataProjects = await responseProjects.json();
//         setProjects(dataProjects);

//         const responseEmployees = await fetch('http://localhost:7737/user/getAllUnmappedUser');
//         const dataEmployees = await responseEmployees.json();
//         const employeesList = dataEmployees.filter(user => user.role === 'employee');
//         setEmployees(employeesList);

//         // Close the dialogs
//         handleCloseDialog();
//         handleCloseTaskDialog();

//         // Show success alert
//         Swal.fire({
//           icon: 'success',
//           title: 'Employees Allocated',
//           text: 'Employees have been successfully allocated to the project and tasks created.',
//           confirmButtonText: 'OK'
//         });
//       } else {
//         console.error('Failed to allocate employees:', responseText); // Log the response text
//         Swal.fire({
//           icon: 'error',
//           title: 'Allocation Failed',
//           text: `Failed to allocate employees: ${responseText}`,
//           confirmButtonText: 'OK'
//         });
//       }
//     } catch (error) {
//       console.error('Error allocating employees:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while allocating employees.',
//         confirmButtonText: 'OK'
//       });
//     }
//   };

//   return (
//     <AdminLayout>
//       <Grid container spacing={3} style={{ padding: '15px' }}>
//         {projects.map((project) => {
//           const isAllocated = Array.isArray(project.emp) && project.emp.length > 0;
//           const projectStatus = isAllocated ? 'Project Allocated' : 'Pending';

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={project.projectId}>
//               <Card 
//                 style={{ 
//                   borderRadius: '12px', 
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
//                   position: 'relative'
//                 }}
//               >
//                 <CardContent style={{ paddingBottom: '80px' }}>
//                   <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
//                     {project.projectName || 'No Project Name'}
//                   </Typography>
//                   <Chip 
//                     label={projectStatus}
//                     style={{
//                       marginTop: '10px',
//                       borderRadius: '20px',
//                       padding: '5px 10px',
//                       backgroundColor: isAllocated ? '#4caf50' : '#ffa31a',
//                       color: '#fff',
//                       fontWeight: 'bold'
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
//                     <strong>Description:</strong> {project.description || 'No Description'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Start Date:</strong> {project.startDate || 'No Start Date'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>End Date:</strong> {project.endDate || 'No End Date'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Skills Required:</strong> {project.requirementSkills || 'No Skills Required'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Members:</strong> {project.members || 'No Members'}
//                   </Typography>
//                 </CardContent>
//                 {projectStatus === 'Pending' && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       borderRadius: '20px',
//                     }}
//                     onClick={() => handleAssign(project)}
//                   >
//                     Assign
//                   </Button>
//                 )}
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Employee Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Select Employees</DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <CircularProgress />
//           ) : (
//             <List>
//               {filteredEmployees.length === 0 ? (
//                 <ListItem>
//                   <ListItemText primary="No employees found with required skills" />
//                 </ListItem>
//               ) : (
//                 filteredEmployees.map((employee) => (
//                   <ListItem key={employee.userId}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={selectedEmployees.includes(employee.userId)}
//                           onChange={() => handleEmployeeSelect(employee)}
//                         />
//                       }
//                       label={
//                         <ListItemText
//                           primary={employee.userName}
//                           secondary={
//                             <>
//                               <div>{employee.userEmail}</div>
//                               <div><strong>Skills:</strong> {employee.skills}</div>
//                             </>
//                           }
//                         />
//                       }
//                     />
//                   </ListItem>
//                 ))
//               )}
//             </List>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//           <Button 
//             onClick={() => setOpenTaskDialog(true)} 
//             color="primary" 
//             disabled={selectedEmployees.length === 0}
//           >
//             Create Task
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Task Dialog */}
//       <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Create Task</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="taskDescription"
//             label="Task Description"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={taskDescription}
//             onChange={(e) => setTaskDescription(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseTaskDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateTasks} color="primary" disabled={!taskDescription.trim()}>
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default ViewProjects;


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Button,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemText,
//   Checkbox,
//   FormControlLabel,
//   TextField,
//   IconButton
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import AddIcon from '@mui/icons-material/Add';
// import AdminLayout from './Ad'; // Ensure this is the correct import path

// const ViewProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openTaskDialog, setOpenTaskDialog] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [tasks, setTasks] = useState([{ description: '' }]);
//   const [creatingTasks, setCreatingTasks] = useState(false);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('http://localhost:7737/project/getAll');
//         if (response.ok) {
//           const data = await response.json();
//           setProjects(data);
//         } else {
//           console.error('Failed to fetch projects');
//         }
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleAssign = async (project) => {
//     setSelectedProject(project);
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUnmappedUser');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();

//       const employeesList = data.filter(user => user.role === 'employee');
//       const requiredSkills = project.requirementSkills ? project.requirementSkills.toLowerCase().split(',').map(skill => skill.trim()) : [];

//       const filteredList = employeesList.filter(employee => {
//         const employeeSkills = employee.skills ? employee.skills.toLowerCase().split(',').map(skill => skill.trim()) : [];
//         return requiredSkills.some(requiredSkill => employeeSkills.includes(requiredSkill));
//       });

//       setEmployees(employeesList);
//       setFilteredEmployees(filteredList);
//       setSelectedEmployees([]);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     } finally {
//       setLoading(false);
//       setOpenDialog(true);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleCloseTaskDialog = () => {
//     setOpenTaskDialog(false);
//     setTasks([{ description: '' }]); // Reset tasks when dialog closes
//   };

//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployees((prevSelected) =>
//       prevSelected.includes(employee.userId)
//         ? prevSelected.filter(id => id !== employee.userId)
//         : [...prevSelected, employee.userId]
//     );
//   };

//   const handleAddTask = () => {
//     setTasks([...tasks, { description: '' }]);
//   };

//   const handleTaskChange = (index, value) => {
//     const newTasks = [...tasks];
//     newTasks[index].description = value;
//     setTasks(newTasks);
//   };

//   const handleCreateTasks = async () => {
//     if (!selectedProject || !tasks.some(task => task.description.trim())) return;

//     setCreatingTasks(true); // Show loader

//     try {
//       const taskCreationPromises = selectedEmployees.flatMap(employeeId =>
//         tasks.map(task =>
//           fetch('http://localhost:7737/task/create', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               taskName: task.description,
             
//               project: {
//                 projectId: selectedProject.projectId,
//               },
//               assignedTo: employeeId,
//             }),
//           })
//         )
//       );

//       await Promise.all(taskCreationPromises);

//       const response = await fetch(`http://localhost:7737/project/update/${selectedProject.projectId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selectedEmployees),
//       });

//       if (response.ok) {
//         const responseProjects = await fetch('http://localhost:7737/project/getAll');
//         const dataProjects = await responseProjects.json();
//         setProjects(dataProjects);

//         const responseEmployees = await fetch('http://localhost:7737/user/getAllUnmappedUser');
//         const dataEmployees = await responseEmployees.json();
//         const employeesList = dataEmployees.filter(user => user.role === 'employee');
//         setEmployees(employeesList);

//         handleCloseDialog();
//         handleCloseTaskDialog();

//         Swal.fire({
//           icon: 'success',
//           title: 'Employees Allocated',
//           text: 'Employees have been successfully allocated to the project and tasks created.',
//           confirmButtonText: 'OK'
//         });
//       } else {
//         const responseText = await response.text();
//         Swal.fire({
//           icon: 'error',
//           title: 'Allocation Failed',
//           text: `Failed to allocate employees: ${responseText}`,
//           confirmButtonText: 'OK'
//         });
//       }
//     } catch (error) {
//       console.error('Error allocating employees:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while allocating employees.',
//         confirmButtonText: 'OK'
//       });
//     } finally {
//       // Ensure loader is visible for at least 3 seconds
//       setTimeout(() => setCreatingTasks(false), 3000);
//     }
//   };

//   return (
//     <AdminLayout>
//       <Grid container spacing={3} style={{ padding: '15px' }}>
//         {projects.map((project) => {
//           const isAllocated = Array.isArray(project.emp) && project.emp.length > 0;
//           const projectStatus = isAllocated ? 'Project Allocated' : 'Pending';

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={project.projectId}>
//               <Card 
//                 style={{ 
//                   borderRadius: '12px', 
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
//                   position: 'relative'
//                 }}
//               >
//                 <CardContent style={{ paddingBottom: '80px' }}>
//                   <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
//                     {project.projectName || 'No Project Name'}
//                   </Typography>
//                   <Chip 
//                     label={projectStatus}
//                     style={{
//                       marginTop: '10px',
//                       borderRadius: '20px',
//                       padding: '5px 10px',
//                       backgroundColor: isAllocated ? '#4caf50' : '#ffa31a',
//                       color: '#fff',
//                       fontWeight: 'bold'
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
//                     <strong>Description:</strong> {project.description || 'No Description'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Start Date:</strong> {project.startDate || 'No Start Date'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>End Date:</strong> {project.endDate || 'No End Date'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Skills Required:</strong> {project.requirementSkills || 'No Skills Required'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
//                     <strong>Members:</strong> {project.members || 'No Members'}
//                   </Typography>
//                 </CardContent>
//                 {projectStatus === 'Pending' && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       borderRadius: '20px',
//                     }}
//                     onClick={() => handleAssign(project)}
//                   >
//                     Assign
//                   </Button>
//                 )}
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Employee Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Select Employees</DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <div className="spinner">
//               <div className="loader l1"></div>
//               <div className="loader l2"></div>
//             </div>
//           ) : (
//             <List>
//               {filteredEmployees.length === 0 ? (
//                 <ListItem>
//                   <ListItemText primary="No employees found with required skills" />
//                 </ListItem>
//               ) : (
//                 filteredEmployees.map((employee) => (
//                   <ListItem key={employee.userId}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={selectedEmployees.includes(employee.userId)}
//                           onChange={() => handleEmployeeSelect(employee)}
//                         />
//                       }
//                       label={
//                         <ListItemText
//                           primary={employee.userName}
//                           secondary={
//                             <>
//                               <div>{employee.userEmail}</div>
//                               <div><strong>Skills:</strong> {employee.skills}</div>
//                             </>
//                           }
//                         />
//                       }
//                     />
//                   </ListItem>
//                 ))
//               )}
//             </List>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//           <Button 
//             onClick={() => setOpenTaskDialog(true)} 
//             color="primary" 
//             disabled={selectedEmployees.length === 0}
//           >
//             Create Task
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Task Dialog */}
//       <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Create Tasks</DialogTitle>
//         <DialogContent style={{ position: 'relative' }}>
//           {creatingTasks && (
//             <div className="spinner">
//               <div className="loader l1"></div>
//               <div className="loader l2"></div>
//             </div>
//           )}
//           <div style={{ paddingTop: creatingTasks ? '60px' : '0' }}>
//             {tasks.map((task, index) => (
//               <TextField
//                 key={index}
//                 autoFocus={index === tasks.length - 1}
//                 margin="dense"
//                 label={`Task Description ${index + 1}`}
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={task.description}
//                 onChange={(e) => handleTaskChange(index, e.target.value)}
//                 style={{ marginBottom: '10px' }}
//               />
//             ))}
//             <IconButton onClick={handleAddTask} color="primary">
//               <AddIcon />
//             </IconButton>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseTaskDialog} color="primary">
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleCreateTasks} 
//             color="primary" 
//             disabled={tasks.every(task => !task.description.trim())}
//           >
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Loader Styling */}
//       <style jsx>{`
//         .spinner {
//           border: 0 solid transparent;
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//         }

//         .loader {
//           width: inherit;
//           height: inherit;
//           position: absolute;
//         }

//         .loader::before,
//         .loader::after {
//           content: '';
//           border: 3px solid #505065;
//           border-radius: 50%;
//           width: inherit;
//           height: inherit;
//           position: absolute;
//           opacity: 1;
//         }

//         .l1::before,
//         .l1::after {
//           animation: clockwiseZ 2.5s infinite;
//         }

//         .l2::after,
//         .l2::before {
//           animation: anticlockwiseZ 2.5s infinite;
//         }

//         @keyframes clockwiseZ {
//           0%, 100% {
//             transform: rotateY(0);
//           }
//           50% {
//             transform: rotateY(180deg) skew(-10deg, -5deg);
//           }
//         }

//         @keyframes anticlockwiseZ {
//           0%, 100% {
//             transform: rotateX(0);
//           }
//           50% {
//             transform: rotateX(-180deg) skew(10deg, 5deg);
//           }
//         }
//       `}</style>
//     </AdminLayout>
//   );
// };

// export default ViewProjects;

//------------------------------------------------------------------------------------------okie final

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import Swal from 'sweetalert2';
import AdminLayout from './Ad'; // Ensure this is the correct import path

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  
  useEffect(() => {
    const fetchProjectsAndRoles = async () => {
      try {
        const projectsResponse = await fetch('http://localhost:7777/project/getAll');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        const rolesResponse = await fetch('http://localhost:7777/project/roles');
        const rolesData = await rolesResponse.json();
        // Optionally use rolesData here if needed
      } catch (error) {
        console.error('Error fetching projects or roles:', error);
      }
    };

    fetchProjectsAndRoles();
  }, []);

  const getProjectStatus = (project) => {
    if (!project.emp || project.emp.length === 0) {
        return 'Completed';
    }

    const hasEmployee = project.emp.some(employee => employee.role === 'employee');
    if (hasEmployee) return 'Project Allocated';

    const hasRole = project.emp.some(employee => employee.role === 'project manager');
    return hasRole ? 'Pending' : 'Unknown';
};
  const handleAssign = async (project) => {
    setSelectedProject(project);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:7777/user/getAllUnmappedUser');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const employeesList = data.filter(user => user.role === 'employee');
      const requiredSkills = project.requirementSkills ? project.requirementSkills.toLowerCase().split(',').map(skill => skill.trim()) : [];

      const filteredList = employeesList.filter(employee => {
        const employeeSkills = employee.skills ? employee.skills.toLowerCase().split(',').map(skill => skill.trim()) : [];
        return requiredSkills.some(requiredSkill => employeeSkills.includes(requiredSkill));
      });

      setEmployees(employeesList);
      setFilteredEmployees(filteredList);
      setSelectedEmployees([]);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employee.userId)
        ? prevSelected.filter(id => id !== employee.userId)
        : [...prevSelected, employee.userId]
    );
  };

  const handleCreateAssignments = async () => {
    if (!selectedProject || selectedEmployees.length === 0) return;

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:7777/project/update/${selectedProject.projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEmployees),
      });

      if (response.ok) {
        const responseProjects = await fetch('http://localhost:7777/project/getAll');
        const dataProjects = await responseProjects.json();
        setProjects(dataProjects);

        handleCloseDialog();

        Swal.fire({
          icon: 'success',
          title: 'Employees Allocated',
          text: 'Employees have been successfully allocated to the project.',
          confirmButtonText: 'OK'
        });
      } else {
        const responseText = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Allocation Failed',
          text: `Failed to allocate employees: ${responseText}`,
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error allocating employees:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while allocating employees.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Grid container spacing={3} style={{ padding: '15px' }}>
        {projects.map((project) => {
          const projectStatus = getProjectStatus(project);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.projectId}>
              <Card 
                style={{ 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
                  position: 'relative'
                }}
              >
                <CardContent style={{ paddingBottom: '80px' }}>
                  <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                    {project.projectName || 'No Project Name'}
                  </Typography>
                  <Chip 
    label={projectStatus}
    style={{
        marginTop: '10px',
        borderRadius: '20px',
        padding: '5px 10px',
        backgroundColor: projectStatus === 'Project Allocated' 
            ? '#4caf50' 
            : projectStatus === 'Completed' 
            ? '#6600cc' 
            : '#ffa31a',
        color: '#fff',
        fontWeight: 'bold'
    }}
/>

                  <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                    <strong>Description:</strong> {project.description || 'No Description'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                    <strong>Start Date:</strong> {project.startDate || 'No Start Date'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                    <strong>End Date:</strong> {project.endDate || 'No End Date'}
                  </Typography>
                 
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                    <strong>Members:</strong> {project.members || 'No Members'}
                    
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                    <strong>Requirements:</strong> {project.requirementSkills || 'No requirements'}
                    
                  </Typography>
                </CardContent>
                {projectStatus === 'Pending' && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      borderRadius: '20px',
                    }}
                    onClick={() => handleAssign(project)}
                  >
                    Assign
                  </Button>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Employee Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Select Employees</DialogTitle>
        <DialogContent>
          {loading ? (
            <div className="spinner">
              <div className="loader l1"></div>
              <div className="loader l2"></div>
            </div>
          ) : (
            <List>
              {filteredEmployees.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No employees found with required skills" />
                </ListItem>
              ) : (
                filteredEmployees.map((employee) => (
                  <ListItem key={employee.userId}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedEmployees.includes(employee.userId)}
                          onChange={() => handleEmployeeSelect(employee)}
                        />
                      }
                      label={
                        <ListItemText
                          primary={employee.userName}
                          secondary={
                            <>
                              <div>{employee.userEmail}</div>
                              <div>{employee.skills}</div>
                              
                            </>
                          }
                        />
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button 
            onClick={handleCreateAssignments} 
            color="primary" 
            disabled={selectedEmployees.length === 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loader Styling */}
      <style jsx>{`
        .spinner {
          border: 0 solid transparent;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .loader {
          width: inherit;
          height: inherit;
          position: absolute;
        }

        .loader::before,
        .loader::after {
          content: '';
          border: 3px solid #505065;
          border-radius: 50%;
          width: inherit;
          height: inherit;
          position: absolute;
          opacity: 1;
        }

        .l1::before,
        .l1::after {
          animation: clockwiseZ 2.5s infinite;
        }

        .l2::after,
        .l2::before {
          animation: anticlockwiseZ 2.5s infinite;
        }

        @keyframes clockwiseZ {
          0%, 100% {
            transform: rotateY(0);
          }
          50% {
            transform: rotateY(180deg) skew(-10deg, -5deg);
          }
        }

        @keyframes anticlockwiseZ {
          0%, 100% {
            transform: rotateX(0);
          }
          50% {
            transform: rotateX(-180deg) skew(10deg, 5deg);
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default ViewProjects;


//----------------------------------------------------------------------------randamization

