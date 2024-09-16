// // src/pages/ProjectDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
// import Swal from 'sweetalert2';
// import ProjectManagerDashboard from './ProjectDashboard';

// const ProjectDetailPage = () => {
//     const [project, setProject] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [taskDetails, setTaskDetails] = useState({}); // State to store task details for each employee

//     useEffect(() => {
//         const fetchProjectDetails = async () => {
//             try {
//                 const storedProjectId = sessionStorage.getItem('projectId');
//                 if (!storedProjectId) {
//                     throw new Error('No project ID found in session');
//                 }

//                 const response = await fetch(`http://localhost:7777/project/getbyId/${storedProjectId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProject(data);

//                     // Fetch task details for each employee
//                     const employeePromises = data.emp
//                         .filter(emp => emp.role === 'employee')
//                         .map(emp => fetch(`http://localhost:7777/status/getByUserId/${emp.userId}`).then(res => res.json()));

//                     const results = await Promise.all(employeePromises);
//                     const tasksByEmployee = {};

//                     results.forEach(taskArray => {
//                         taskArray.forEach(task => {
//                             if (!tasksByEmployee[task.emp.userId]) {
//                                 tasksByEmployee[task.emp.userId] = [];
//                             }
//                             tasksByEmployee[task.emp.userId].push({
//                                 statusId: task.statusId,
//                                 taskStatus: task.taskStatus,
//                                 taskName: task.task.taskName,
//                                 totalHours: task.totalHours,
//                             });
//                         });
//                     });

//                     setTaskDetails(tasksByEmployee);
//                 } else {
//                     console.error('Failed to fetch project details');
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Fetch Error',
//                         text: 'Failed to fetch project details.',
//                         confirmButtonText: 'OK'
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error fetching project details:', error);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Fetch Error',
//                     text: 'Error occurred while fetching project details.',
//                     confirmButtonText: 'OK'
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjectDetails();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!project) {
//         return <div>No project details available.</div>;
//     }

//     const employeeMembers = project.emp.filter(emp => emp.role === 'employee');

//     return (
//         <ProjectManagerDashboard>
//             <div style={{ padding: '20px' }}>
//                 <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
//                     Team Members
//                 </Typography>
//                 <Box display="flex" flexDirection="row" flexWrap="wrap" gap="20px">
//                     {employeeMembers.length > 0 ? (
//                         employeeMembers.map(employee => (
//                             <Card variant="outlined" style={{ minWidth: '300px', flex: '1 0 21%', marginBottom: '20px' }} key={employee.userId}>
//                                 <CardContent>
//                                     <Typography variant="h6" component="div">
//                                         <strong>Name:</strong> {employee.userName}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Email:</strong> {employee.userEmail || 'N/A'}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Mobile:</strong> {employee.userMobile || 'N/A'}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Role:</strong> {employee.role}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Skills:</strong> {employee.skills || 'N/A'}
//                                     </Typography>
//                                     Display task details
//                                     {taskDetails[employee.userId] && taskDetails[employee.userId].length > 0 ? (
//                                         <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//                                             <Table>
//                                                 <TableHead>
//                                                     <TableRow>
//                                                         <TableCell><strong>Task Name</strong></TableCell>
//                                                         <TableCell><strong>Status</strong></TableCell>
//                                                         <TableCell><strong>Total Hours</strong></TableCell>
//                                                     </TableRow>
//                                                 </TableHead>
//                                                 <TableBody>
//                                                     {taskDetails[employee.userId].map(task => (
//                                                         <TableRow key={task.statusId}>
//                                                             <TableCell>{task.taskName}</TableCell>
//                                                             <TableCell>{task.taskStatus}</TableCell>
//                                                             <TableCell>{task.totalHours}</TableCell>
//                                                         </TableRow>
//                                                     ))}
//                                                 </TableBody>
//                                             </Table>
//                                         </TableContainer>
//                                     ) : (
//                                         <Typography>No tasks found for this employee.</Typography>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         ))
//                     ) : (
//                         <Typography>No team members with the role 'employee'.</Typography>
//                     )}
//                 </Box>
//             </div>
//         </ProjectManagerDashboard>
//     );
// };

// export default ProjectDetailPage;

//-----------------------------------------------------------------
// src/pages/ProjectDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
// import Swal from 'sweetalert2';
// import ProjectManagerDashboard from './ProjectDashboard';

// const ProjectDetailPage = () => {
//     const [project, setProject] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [taskDetails, setTaskDetails] = useState({}); // State to store task details for each employee

//     useEffect(() => {
//         const fetchProjectDetails = async () => {
//             try {
//                 const storedProjectId = sessionStorage.getItem('projectId');
//                 if (!storedProjectId) {
//                     throw new Error('No project ID found in session');
//                 }

//                 // Fetch project details
//                 const projectResponse = await fetch(`http://localhost:7777/project/getbyId/${storedProjectId}`);
                
//                 if (!projectResponse.ok) {
//                     throw new Error('Failed to fetch project details');
//                 }
                
//                 const projectData = await projectResponse.json();
//                 setProject(projectData);

//                 // Fetch task details for each employee
//                 const employeePromises = projectData.emp
//                     .filter(emp => emp.role === 'employee')
//                     .map(emp => 
//                         fetch(`http://localhost:7777/status/getByUserId/${emp.userId}`)
//                             .then(res => {
//                                 if (!res.ok) throw new Error(`Failed to fetch tasks for user ${emp.userId}`);
//                                 return res.text(); // Get response as text first
//                             })
//                             .then(text => {
//                                 try {
//                                     return JSON.parse(text); // Parse the text as JSON
//                                 } catch (error) {
//                                     throw new Error(`Invalid JSON response for user ${emp.userId}: ${text}`);
//                                 }
//                             })
//                     );

//                 const results = await Promise.all(employeePromises);
//                 const tasksByEmployee = {};

//                 results.forEach(taskArray => {
//                     taskArray.forEach(task => {
//                         if (!tasksByEmployee[task.emp.userId]) {
//                             tasksByEmployee[task.emp.userId] = [];
//                         }
//                         tasksByEmployee[task.emp.userId].push({
//                             statusId: task.statusId,
//                             taskStatus: task.taskStatus,
//                             taskName: task.task.taskName,
//                             totalHours: task.totalHours,
//                         });
//                     });
//                 });

//                 setTaskDetails(tasksByEmployee);
//             } catch (error) {
//                 console.error('Error fetching project details:', error);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Fetch Error',
//                     text: error.message || 'An error occurred while fetching project details.',
//                     confirmButtonText: 'OK'
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjectDetails();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!project) {
//         return <div>No project details available.</div>;
//     }

//     const employeeMembers = project.emp.filter(emp => emp.role === 'employee');

//     return (
//         <ProjectManagerDashboard>
//             <div style={{ padding: '20px' }}>
//                 <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
//                     Team Members
//                 </Typography>
//                 <Box display="flex" flexDirection="row" flexWrap="wrap" gap="20px">
//                     {employeeMembers.length > 0 ? (
//                         employeeMembers.map(employee => (
//                             <Card variant="outlined" style={{ minWidth: '300px', flex: '1 0 21%', marginBottom: '20px' }} key={employee.userId}>
//                                 <CardContent>
//                                     <Typography variant="h6" component="div">
//                                         <strong>Name:</strong> {employee.userName}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Email:</strong> {employee.userEmail || 'N/A'}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Mobile:</strong> {employee.userMobile || 'N/A'}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Role:</strong> {employee.role}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Skills:</strong> {employee.skills || 'N/A'}
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary">
//                                         <strong>Experience:</strong> {employee.experience || 'N/A'}
//                                     </Typography>

//                                     {/* Display task details */}
//                                     {taskDetails[employee.userId] && taskDetails[employee.userId].length > 0 ? (
//                                         <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//                                             <Table>
//                                                 <TableHead>
//                                                     <TableRow>
//                                                         <TableCell><strong>Task Name</strong></TableCell>
//                                                         <TableCell><strong>Status</strong></TableCell>
//                                                         <TableCell><strong>Total Hours</strong></TableCell>
//                                                     </TableRow>
//                                                 </TableHead>
//                                                 <TableBody>
//                                                     {taskDetails[employee.userId].map(task => (
//                                                         <TableRow key={task.statusId}>
//                                                             <TableCell>{task.taskName}</TableCell>
//                                                             <TableCell>{task.taskStatus}</TableCell>
//                                                             <TableCell>{task.totalHours}</TableCell>
//                                                         </TableRow>
//                                                     ))}
//                                                 </TableBody>
//                                             </Table>
//                                         </TableContainer>
//                                     ) : (
//                                         <Typography>No tasks found for this employee.</Typography>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         ))
//                     ) : (
//                         <Typography>No team members with the role 'employee'.</Typography>
//                     )}
//                 </Box>
//             </div>
//         </ProjectManagerDashboard>
//     );
// };

// export default ProjectDetailPage;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import Swal from 'sweetalert2';
import ProjectManagerDashboard from './ProjectDashboard';

const TaskStatusButton = ({ status }) => {
    let color;
    let text;

    switch (status) {
        case 'In progress':
            color = '#ffbf00'; // Mustard yellow
            text = 'In Progress';
            break;
        case 'Completed':
            color = '#009688'; // Teal
            text = 'Completed';
            break;
        default:
            color = '#B0BEC5'; // Default color (grey)
            text = 'Unknown';
            break;
    }

    return (
        <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: color, color: 'white', width: '90%' }}
        >
            {text}
        </Button>
    );
};

const ProjectDetailPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taskDetails, setTaskDetails] = useState({}); // State to store task details for each employee

    useEffect(() => {
        const fetchProjectDetails = async (projectId) => {
            try {
                const projectResponse = await fetch(`http://localhost:7777/project/getbyId/${projectId}`);
                if (!projectResponse.ok) {
                    throw new Error('Failed to fetch project details');
                }
                const projectData = await projectResponse.json();
                return projectData;
            } catch (error) {
                console.error('Error fetching project details:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Error',
                    text: error.message || 'An error occurred while fetching project details.',
                    confirmButtonText: 'OK'
                });
                return null;
            }
        };

        const fetchTasksForEmployees = async (employeeIds) => {
            try {
                const taskPromises = employeeIds.map(userId =>
                    fetch(`http://localhost:7777/status/getByUserId/${userId}`)
                        .then(res => {
                            if (!res.ok) throw new Error(`Failed to fetch tasks for user ${userId}`);
                            return res.json();
                        })
                );

                const tasksResults = await Promise.all(taskPromises);
                const tasksByEmployee = {};

                tasksResults.forEach(taskArray => {
                    taskArray.forEach(task => {
                        if (!tasksByEmployee[task.emp.userId]) {
                            tasksByEmployee[task.emp.userId] = [];
                        }
                        tasksByEmployee[task.emp.userId].push({
                            statusId: task.statusId,
                            taskStatus: task.taskStatus,
                            taskName: task.task.taskName,
                            totalHours: task.totalHours,
                        });
                    });
                });

                setTaskDetails(tasksByEmployee);
            } catch (error) {
                console.error('Error fetching tasks for employees:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Error',
                    text: error.message || 'An error occurred while fetching task details.',
                    confirmButtonText: 'OK'
                });
            }
        };

        const fetchProjectData = async () => {
            try {
                const storedProjectId = sessionStorage.getItem('projectId');

                if (storedProjectId) {
                    const projectData = await fetchProjectDetails(storedProjectId);

                    if (projectData) {
                        setProjects([projectData]); // Assuming one project for simplicity
                        const employeeIds = projectData.emp
                            .filter(emp => emp.role === 'employee')
                            .map(emp => emp.userId);
                        await fetchTasksForEmployees(employeeIds);
                    }
                } else {
                    const storedUserId = sessionStorage.getItem('userId'); // Adjust if userId is stored elsewhere

                    if (!storedUserId) {
                        throw new Error('No user ID found in session');
                    }

                    const projectsResponse = await fetch(`http://localhost:7777/project/getByUserId/${storedUserId}`);
                    if (!projectsResponse.ok) throw new Error('Failed to fetch projects for user');
                    const projectsData = await projectsResponse.json();
                    setProjects(projectsData);

                    const employeeIds = projectsData.flatMap(project =>
                        project.emp
                            .filter(emp => emp.role === 'employee')
                            .map(emp => emp.userId)
                    );

                    await fetchTasksForEmployees(employeeIds);
                }
            } catch (error) {
                console.error('Error fetching project data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Error',
                    text: error.message || 'An error occurred while fetching project data.',
                    confirmButtonText: 'OK'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (projects.length === 0) {
        return <div>No project details available.</div>;
    }

    const employeeMembers = projects[0].emp.filter(emp => emp.role === 'employee');

    return (
        <ProjectManagerDashboard>
            <div style={{ padding: '20px' }}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
                    Team Members
                </Typography>
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap="20px">
                    {employeeMembers.length > 0 ? (
                        employeeMembers.map(employee => (
                            <Card variant="outlined" style={{ minWidth: '300px', flex: '1 0 21%', marginBottom: '20px' }} key={employee.userId}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        <strong>Name:</strong> {employee.userName}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Email:</strong> {employee.userEmail || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Mobile:</strong> {employee.userMobile || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Role:</strong> {employee.role}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Skills:</strong> {employee.skills || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Experience:</strong> {employee.experience || 'N/A'}
                                    </Typography>

                                    {/* Display task details */}
                                    {taskDetails[employee.userId] && taskDetails[employee.userId].length > 0 ? (
                                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><strong>Task Name</strong></TableCell>
                                                        <TableCell><strong>Status</strong></TableCell>
                                                        <TableCell><strong>Total Hours</strong></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {taskDetails[employee.userId].map(task => (
                                                        <TableRow key={task.statusId}>
                                                            <TableCell>{task.taskName}</TableCell>
                                                            <TableCell>
                                                                <TaskStatusButton status={task.taskStatus} />
                                                            </TableCell>
                                                            <TableCell>{task.totalHours}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Typography>No tasks found for this employee.</Typography>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No team members with the role 'employee'.</Typography>
                    )}
                </Box>
            </div>
        </ProjectManagerDashboard>
    );
};

export default ProjectDetailPage;
