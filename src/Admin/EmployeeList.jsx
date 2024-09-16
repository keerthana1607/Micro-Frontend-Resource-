
// import React, { useState, useEffect } from 'react';
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
// import AdminLayout from './Ad'; // Import AdminLayout component

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [unmappedEmployees, setUnmappedEmployees] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({
//     userName: '',
//     userPassword: '',
//     userMobile: '',
//     userEmail: '',
//     userAddress: '',
//     role: '',
//     skills: ''
//   });

//   useEffect(() => {
//     fetchEmployees();
//     fetchUnmappedEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUserList');
//       if (response.ok) {
//         const data = await response.json();
//         setEmployees(data);
//       } else {
//         console.error('Failed to fetch employees');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchUnmappedEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUnmappedUser');
//       if (response.ok) {
//         const data = await response.json();
//         setUnmappedEmployees(data);
//       } else {
//         console.error('Failed to fetch unmapped employees');
//       }
//     } catch (error) {
//       console.error('Error fetching unmapped employees:', error);
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     // Reset form fields when the modal is closed
//     setNewEmployee({
//       userName: '',
//       userPassword: '',
//       userMobile: '',
//       userEmail: '',
//       userAddress: '',
//       role: '',
//       skills: ''
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/user/doUserInsert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//       });

//       if (response.ok) {
//         await response.json();
//         // Fetch the updated list of employees and unmapped employees
//         fetchEmployees();
//         fetchUnmappedEmployees();
//         handleClose(); // Close the modal and reset form
//       } else {
//         console.error('Failed to add employee');
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     }
//   };

//   const getEmployeeStatus = (employeeId) => {
//     return unmappedEmployees.some(emp => emp.userId === employeeId) ? 'Available' : 'Assigned';
//   };

//   return (
//     <AdminLayout>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Employee
//       </Button>
//       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">ID</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Name</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Mobile</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Email</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Address</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Skills</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Status</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.userId}>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userId}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userName}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userMobile}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userEmail}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userAddress}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.skills}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>
//                   <Button
//                     variant="contained"
//                     color={getEmployeeStatus(employee.userId) === 'Available' ? 'success' : 'error'}
//                     style={{ backgroundColor: getEmployeeStatus(employee.userId) === 'Available' ? '#81c784' : '#e57373', color: 'white' }}
//                   >
//                     {getEmployeeStatus(employee.userId)}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Employee</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="User Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userName"
//             value={newEmployee.userName}
//             onChange={handleInputChange}
//           />
        
//           <TextField
//             margin="dense"
//             label="User Mobile"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userMobile"
//             value={newEmployee.userMobile}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Email"
//             type="email"
//             fullWidth
//             variant="outlined"
//             name="userEmail"
//             value={newEmployee.userEmail}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Address"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userAddress"
//             value={newEmployee.userAddress}
//             onChange={handleInputChange}
//           />
//           {/* <TextField
//             margin="dense"
//             label="Role"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="role"
//             value={newEmployee.role}
//             onChange={handleInputChange}
//           /> */}
//           <TextField
//             margin="dense"
//             label="Skills"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="skills"
//             value={newEmployee.skills}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEmployee} color="primary">
//             Add Employee
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default EmployeeTable;


// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Typography
// } from '@mui/material';
// import AdminLayout from './Ad'; // Import AdminLayout component

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [unmappedEmployees, setUnmappedEmployees] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({
//     userName: '',
//     userPassword: '',
//     userMobile: '',
//     userEmail: '',
//     userAddress: '',
//     role: 'employee', // Set default role to 'employee'
//     skills: ''
//   });

//   useEffect(() => {
//     fetchEmployees();
//     fetchUnmappedEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUserList');
//       if (response.ok) {
//         const data = await response.json();
//         // Filter employees to include only those with the role 'employee'
//         const filteredEmployees = data.filter(emp => emp.role === 'employee');
//         setEmployees(filteredEmployees);
//       } else {
//         console.error('Failed to fetch employees');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchUnmappedEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/user/getAllUnmappedUser');
//       if (response.ok) {
//         const data = await response.json();
//         setUnmappedEmployees(data);
//       } else {
//         console.error('Failed to fetch unmapped employees');
//       }
//     } catch (error) {
//       console.error('Error fetching unmapped employees:', error);
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     // Reset form fields when the modal is closed
//     setNewEmployee({
//       userName: '',
//       userPassword: '',
//       userMobile: '',
//       userEmail: '',
//       userAddress: '',
//       role: 'employee', // Keep default role
//       skills: ''
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const response = await fetch('http://localhost:7737/user/doUserInsert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//       });

//       if (response.ok) {
//         await response.json();
//         // Fetch the updated list of employees and unmapped employees
//         fetchEmployees();
//         fetchUnmappedEmployees();
//         handleClose(); // Close the modal and reset form
//       } else {
//         console.error('Failed to add employee');
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     }
//   };

//   const getEmployeeStatus = (employeeId) => {
//     return unmappedEmployees.some(emp => emp.userId === employeeId) ? 'Available' : 'Assigned';
//   };

//   return (
//     <AdminLayout>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Employee
//       </Button>
//       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">ID</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Name</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Mobile</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Email</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Address</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Skills</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Status</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.userId}>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userId}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userName}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userMobile}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userEmail}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userAddress}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.skills}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>
//                   <Button
//                     variant="contained"
//                     color={getEmployeeStatus(employee.userId) === 'Available' ? 'success' : 'error'}
//                     style={{ backgroundColor: getEmployeeStatus(employee.userId) === 'Available' ? '#81c784' : '#e57373', color: 'white' }}
//                   >
//                     {getEmployeeStatus(employee.userId)}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Employee</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="User Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userName"
//             value={newEmployee.userName}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Mobile"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userMobile"
//             value={newEmployee.userMobile}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Email"
//             type="email"
//             fullWidth
//             variant="outlined"
//             name="userEmail"
//             value={newEmployee.userEmail}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Address"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userAddress"
//             value={newEmployee.userAddress}
//             onChange={handleInputChange}
//           />
//           {/* Removed the TextField for role */}
//           <TextField
//             margin="dense"
//             label="Skills"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="skills"
//             value={newEmployee.skills}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEmployee} color="primary">
//             Add Employee
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default EmployeeTable;


//----------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Typography
// } from '@mui/material';
// import AdminLayout from './Ad'; // Import AdminLayout component

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [unmappedEmployees, setUnmappedEmployees] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({
//     userName: '',
//     userPassword: '',
//     userMobile: '',
//     userEmail: '',
//     userAddress: '',
//     role: 'employee', // Set default role to 'employee'
//     skills: '',
//     Experience: '', // Add new fields
//     projectsWorked: '',
//     degree: '',
//     dob: '',
//     state: '',
//     bloodGroup: '',
//     languages: ''
//   });
  
//   const [loading, setLoading] = useState(false); // Add loading state

//   useEffect(() => {
//     fetchEmployees();
//     fetchUnmappedEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7777/user/getAllUserList');
//       if (response.ok) {
//         const data = await response.json();
//         // Filter employees to include only those with the role 'employee'
//         const filteredEmployees = data.filter(emp => emp.role === 'employee');
//         setEmployees(filteredEmployees);
//       } else {
//         console.error('Failed to fetch employees');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchUnmappedEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7777/user/getAllUnmappedUser');
//       if (response.ok) {
//         const data = await response.json();
//         setUnmappedEmployees(data);
//       } else {
//         console.error('Failed to fetch unmapped employees');
//       }
//     } catch (error) {
//       console.error('Error fetching unmapped employees:', error);
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     // Reset form fields when the modal is closed
//     setNewEmployee({
//       userName: '',
//       userPassword: '',
//       userMobile: '',
//       userEmail: '',
//       userAddress: '',
//       role: 'employee', // Keep default role
//       skills: ''
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     setLoading(true); // Show loader

//     try {
//       const response = await fetch('http://localhost:7777/user/doUserInsert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//       });

//       if (response.ok) {
//         await response.json();
//         // Fetch the updated list of employees and unmapped employees
//         fetchEmployees();
//         fetchUnmappedEmployees();
//         handleClose(); // Close the modal and reset form
//       } else {
//         console.error('Failed to add employee');
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   const getEmployeeStatus = (employeeId) => {
//     return unmappedEmployees.some(emp => emp.userId === employeeId) ? 'Available' : 'Assigned';
//   };

//   return (
//     <AdminLayout>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Employee
//       </Button>
//       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">ID</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Name</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Mobile</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Email</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Address</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Skills</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Status</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.userId}>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userId}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userName}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userMobile}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userEmail}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userAddress}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.skills}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>
//                   <Button
//                     variant="contained"
//                     color={getEmployeeStatus(employee.userId) === 'Available' ? 'success' : 'error'}
//                     style={{ backgroundColor: getEmployeeStatus(employee.userId) === 'Available' ? '#81c784' : '#e57373', color: 'white' }}
//                   >
//                     {getEmployeeStatus(employee.userId)}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Employee</DialogTitle>
//         <DialogContent>
//   <TextField
//     margin="dense"
//     label="User Name"
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="userName"
//     value={newEmployee.userName}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="User Password" // Added field
//     type="password"
//     fullWidth
//     variant="outlined"
//     name="userPassword"
//     value={newEmployee.userPassword}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="User Mobile"
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="userMobile"
//     value={newEmployee.userMobile}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="User Email"
//     type="email"
//     fullWidth
//     variant="outlined"
//     name="userEmail"
//     value={newEmployee.userEmail}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="User Address"
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="userAddress"
//     value={newEmployee.userAddress}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Skills"
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="skills"
//     value={newEmployee.skills}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Experience" // Added field
//     type="number"
//     fullWidth
//     variant="outlined"
//     name="Experience"
//     value={newEmployee.Experience}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Projects Worked" // Added field
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="projectsWorked"
//     value={newEmployee.projectsWorked}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Degree" // Added field
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="degree"
//     value={newEmployee.degree}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Date of Birth" // Added field
//     type="date"
//     fullWidth
//     variant="outlined"
//     InputLabelProps={{ shrink: true }}
//     name="dob"
//     value={newEmployee.dob}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="State" // Added field
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="state"
//     value={newEmployee.state}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Blood Group" // Added field
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="bloodGroup"
//     value={newEmployee.bloodGroup}
//     onChange={handleInputChange}
//   />
//   <TextField
//     margin="dense"
//     label="Languages" // Added field
//     type="text"
//     fullWidth
//     variant="outlined"
//     name="languages"
//     value={newEmployee.languages}
//     onChange={handleInputChange}
//   />
// </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEmployee} color="primary" disabled={loading}>
//             Add Employee
//           </Button>
//         </DialogActions>
//         {loading && (
//           <div className="spinner">
//             <div className="loader l1"></div>
//             <div className="loader l2"></div>
//           </div>
//         )} {/* Display loader */}
//       </Dialog>

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
//           z-index: 1;
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

// export default EmployeeTable;

//---------------------------------------------
// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Typography
// } from '@mui/material';
// import AdminLayout from './Ad'; // Import AdminLayout component

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [unmappedEmployees, setUnmappedEmployees] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openDetailModal, setOpenDetailModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [newEmployee, setNewEmployee] = useState({
//     userName: '',
//     userPassword: '',
//     userMobile: '',
//     userEmail: '',
//     userAddress: '',
//     role: 'employee',
//     skills: '',
//     experience: '',
//     projectsWorked: '',
//     degree: '',
//     dob: '',
//     state: '',
//     bloodGroup: '',
//     languages: ''
//   });
//   const [loading, setLoading] = useState(false); // Add loading state

//   useEffect(() => {
//     fetchEmployees();
//     fetchUnmappedEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7777/user/getAllUserList');
//       if (response.ok) {
//         const data = await response.json();
//         const filteredEmployees = data.filter(emp => emp.role === 'employee');
//         setEmployees(filteredEmployees);
//       } else {
//         console.error('Failed to fetch employees');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchUnmappedEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7777/user/getAllUnmappedUser');
//       if (response.ok) {
//         const data = await response.json();
//         setUnmappedEmployees(data);
//       } else {
//         console.error('Failed to fetch unmapped employees');
//       }
//     } catch (error) {
//       console.error('Error fetching unmapped employees:', error);
//     }
//   };

//   const handleOpenAddModal = () => {
//     setOpenAddModal(true);
//     setNewEmployee({
//       userName: '',
//       userPassword: '',
//       userMobile: '',
//       userEmail: '',
//       userAddress: '',
//       role: 'employee',
//       skills: '',
//       experience: '',
//       projectsWorked: '',
//       degree: '',
//       dob: '',
//       state: '',
//       bloodGroup: '',
//       languages: ''
//     });
//   };

//   const handleCloseAddModal = () => {
//     setOpenAddModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     setLoading(true); // Show loader

//     try {
//       const response = await fetch('http://localhost:7777/user/doUserInsert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//       });

//       if (response.ok) {
//         await response.json();
//         fetchEmployees();
//         fetchUnmappedEmployees();
//         handleCloseAddModal(); // Close the modal and reset form
//       } else {
//         console.error('Failed to add employee');
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   const getEmployeeStatus = (employeeId) => {
//     return unmappedEmployees.some(emp => emp.userId === employeeId) ? 'Available' : 'Assigned';
//   };

//   const handleRowClick = (employee) => {
//     setSelectedEmployee(employee);
//     setOpenDetailModal(true);
//   };

//   const handleCloseDetailModal = () => {
//     setOpenDetailModal(false);
//     setSelectedEmployee(null); // Clear selected employee when modal closes
//   };

//   return (
//     <AdminLayout>
//       <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
//         Add Employee
//       </Button>
//       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">ID</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Name</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Email</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Skills</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Experience</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Status</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.userId}>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userId}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{
//                       borderRadius: '12px',
//                       backgroundColor: '#e0f7fa',
//                       color: '#00796b',
//                       textTransform: 'none',
//                       padding: '5px 10px'
//                     }}
//                     onClick={() => handleRowClick(employee)}
//                   >
//                     {employee.userName}
//                   </Button>
//                 </TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userEmail}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.skills}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.experience}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd', textAlign: 'center' }}>
//                   <Button
//                     variant="contained"
//                     color={getEmployeeStatus(employee.userId) === 'Available' ? 'success' : 'error'}
//                     style={{ backgroundColor: getEmployeeStatus(employee.userId) === 'Available' ? '#81c784' : '#e57373', color: 'white' }}
//                   >
//                     {getEmployeeStatus(employee.userId)}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Employee Modal */}
//       <Dialog open={openAddModal} onClose={handleCloseAddModal}>
//         <DialogTitle>Add New Employee</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="User Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userName"
//             value={newEmployee.userName}
//             onChange={handleInputChange}
//           />
        
//           <TextField
//             margin="dense"
//             label="User Mobile"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userMobile"
//             value={newEmployee.userMobile}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Email"
//             type="email"
//             fullWidth
//             variant="outlined"
//             name="userEmail"
//             value={newEmployee.userEmail}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="User Address"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userAddress"
//             value={newEmployee.userAddress}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Skills"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="skills"
//             value={newEmployee.skills}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Experience"
//             type="number"
//             fullWidth
//             variant="outlined"
//             name="experience"
//             value={newEmployee.experience}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Projects Worked"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="projectsWorked"
//             value={newEmployee.projectsWorked}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Degree"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="degree"
//             value={newEmployee.degree}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Date of Birth"
//             type="date"
//             fullWidth
//             variant="outlined"
//             name="dob"
//             value={newEmployee.dob}
//             onChange={handleInputChange}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="State"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="state"
//             value={newEmployee.state}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Blood Group"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="bloodGroup"
//             value={newEmployee.bloodGroup}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Languages"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="languages"
//             value={newEmployee.languages}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAddModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEmployee} color="primary" disabled={loading}>
//             {loading ? 'Adding...' : 'Add Employee'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Detailed Employee Modal */}
//       <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
//         <DialogTitle>Employee Details</DialogTitle>
//         <DialogContent>
//           {selectedEmployee && (
//             <>
//               <TextField
//                 margin="dense"
//                 label="User Name"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.userName}
//                 InputProps={{ readOnly: true }}
//               />
//                  <TextField
//             margin="dense"
//             label="User Mobile"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userMobile"
//             value={selectedEmployee.userMobile}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="User Email"
//             type="email"
//             fullWidth
//             variant="outlined"
//             name="userEmail"
//             value={selectedEmployee.userEmail}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="User Address"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userAddress"
//             value={selectedEmployee.userAddress}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Skills"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="skills"
//             value={selectedEmployee.skills}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Experience"
//             type="number"
//             fullWidth
//             variant="outlined"
//             name="experience"
//             value={selectedEmployee.experience}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Projects Worked"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="projectsWorked"
//             value={selectedEmployee.projectsWorked}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Degree"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="degree"
//             value={selectedEmployee.degree}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Date of Birth"
//             type="date"
//             fullWidth
//             variant="outlined"
//             name="dob"
//             value={selectedEmployee.dob}
//             InputProps={{ readOnly: true }}
            
//           />
//           <TextField
//             margin="dense"
//             label="State"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="state"
//             value={selectedEmployee.state}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Blood Group"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="bloodGroup"
//             value={selectedEmployee.bloodGroup}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Languages"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="languages"
//             value={selectedEmployee.languages}
//             InputProps={{ readOnly: true }}
//           />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDetailModal} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default EmployeeTable;


//------------------------------validation
// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   FormHelperText
// } from '@mui/material';
// import AdminLayout from './Ad'; // Import AdminLayout component

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [unmappedEmployees, setUnmappedEmployees] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openDetailModal, setOpenDetailModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [newEmployee, setNewEmployee] = useState({
//     userName: '',
//     userPassword: '',
//     userMobile: '',
//     userEmail: '',
//     userAddress: '',
//     role: 'employee',
//     skills: '',
//     experience: '',
//     projectsWorked: '',
//     degree: '',
//     dob: '',
//     state: '',
//     bloodGroup: '',
//     languages: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({}); // For form validations

//   // All states in India
//   const states = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
//     'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
//     'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
//     'Uttarakhand', 'West Bengal'
//   ];

//   const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
//   const experienceLevels = ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'];

//   useEffect(() => {
//     fetchEmployees();
//     fetchUnmappedEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7777/user/getAllUserList');
//       if (response.ok) {
//         const data = await response.json();
//         const filteredEmployees = data.filter(emp => emp.role === 'employee');
//         setEmployees(filteredEmployees);
//       } else {
//         console.error('Failed to fetch employees');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchUnmappedEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:7777/user/getAllUnmappedUser');
//       if (response.ok) {
//         const data = await response.json();
//         setUnmappedEmployees(data);
//       } else {
//         console.error('Failed to fetch unmapped employees');
//       }
//     } catch (error) {
//       console.error('Error fetching unmapped employees:', error);
//     }
//   };

//   const handleOpenAddModal = () => {
//     setOpenAddModal(true);
//     setNewEmployee({
//       userName: '',
//       userPassword: '',
//       userMobile: '',
//       userEmail: '',
//       userAddress: '',
//       role: 'employee',
//       skills: '',
//       experience: '',
//       projectsWorked: '',
//       degree: '',
//       dob: '',
//       state: '',
//       bloodGroup: '',
//       languages: ''
//     });
//     setFormErrors({});
//   };

//   const handleCloseAddModal = () => {
//     setOpenAddModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     const phonePattern = /^\d{10}$/;
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

//     if (!newEmployee.userName) errors.userName = 'User Name is required';
//     if (!newEmployee.userEmail) {
//       errors.userEmail = 'User Email is required';
//     } else if (!emailPattern.test(newEmployee.userEmail)) {
//       errors.userEmail = 'Email must be a valid Gmail address';
//     }
//     if (!newEmployee.userMobile) {
//       errors.userMobile = 'User Mobile is required';
//     } else if (!phonePattern.test(newEmployee.userMobile)) {
//       errors.userMobile = 'Mobile number must be exactly 10 digits';
//     }
//     if (!newEmployee.experience) errors.experience = 'Experience is required';
//     if (!newEmployee.state) errors.state = 'State is required';
//     if (!newEmployee.bloodGroup) errors.bloodGroup = 'Blood Group is required';
//     if (!newEmployee.dob) errors.dob = 'Date of Birth is required';

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleAddEmployee = async () => {
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:7777/user/doUserInsert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//       });

//       if (response.ok) {
//         await response.json();
//         fetchEmployees();
//         fetchUnmappedEmployees();
//         handleCloseAddModal();
//       } else {
//         console.error('Failed to add employee');
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getEmployeeStatus = (employeeId) => {
//     return unmappedEmployees.some(emp => emp.userId === employeeId) ? 'Available' : 'Assigned';
//   };

//   const handleRowClick = (employee) => {
//     setSelectedEmployee(employee);
//     setOpenDetailModal(true);
//   };

//   const handleCloseDetailModal = () => {
//     setOpenDetailModal(false);
//     setSelectedEmployee(null);
//   };

//   return (
//     <AdminLayout>
//       <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
//         Add Employee
//       </Button>
//       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">ID</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Name</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Email</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Skills</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Experience</Typography>
//               </TableCell>
//               <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
//                 <Typography variant="h6">Status</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.userId}>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userId}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{
//                       borderRadius: '12px',
//                       backgroundColor: '#e0f7fa',
//                       color: '#00796b',
//                       textTransform: 'none',
//                       padding: '5px 10px'
//                     }}
//                     onClick={() => handleRowClick(employee)}
//                   >
//                     {employee.userName}
//                   </Button>
//                 </TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.userEmail}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.skills}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{employee.experience}</TableCell>
//                 <TableCell style={{ border: '1px solid #ddd' }}>{getEmployeeStatus(employee.userId)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Employee Modal */}
//       <Dialog open={openAddModal} onClose={handleCloseAddModal}>
//         <DialogTitle>Add New Employee</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="User Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userName"
//             value={newEmployee.userName}
//             onChange={handleInputChange}
//             error={!!formErrors.userName}
//             helperText={formErrors.userName}
//           />
//           <TextField
//             margin="dense"
//             label="User Mobile"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userMobile"
//             value={newEmployee.userMobile}
//             onChange={handleInputChange}
//             error={!!formErrors.userMobile}
//             helperText={formErrors.userMobile}
//           />
//           <TextField
//             margin="dense"
//             label="User Email"
//             type="email"
//             fullWidth
//             variant="outlined"
//             name="userEmail"
//             value={newEmployee.userEmail}
//             onChange={handleInputChange}
//             error={!!formErrors.userEmail}
//             helperText={formErrors.userEmail}
//           />
//           <TextField
//             margin="dense"
//             label="User Address"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="userAddress"
//             value={newEmployee.userAddress}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Skills"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="skills"
//             value={newEmployee.skills}
//             onChange={handleInputChange}
//           />
//           <FormControl fullWidth variant="outlined" margin="dense" error={!!formErrors.experience}>
//             <InputLabel>Experience</InputLabel>
//             <Select
//               name="experience"
//               value={newEmployee.experience}
//               onChange={handleInputChange}
//               label="Experience"
//             >
//               {experienceLevels.map((level) => (
//                 <MenuItem key={level} value={level}>
//                   {level}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.experience}</FormHelperText>
//           </FormControl>
//           <TextField
//             margin="dense"
//             label="Projects Worked"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="projectsWorked"
//             value={newEmployee.projectsWorked}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Degree"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="degree"
//             value={newEmployee.degree}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Date of Birth"
//             type="date"
//             fullWidth
//             variant="outlined"
//             name="dob"
//             value={newEmployee.dob}
//             onChange={handleInputChange}
//             InputLabelProps={{ shrink: true }}
//             error={!!formErrors.dob}
//             helperText={formErrors.dob}
//           />
//           <FormControl fullWidth variant="outlined" margin="dense" error={!!formErrors.state}>
//             <InputLabel>State</InputLabel>
//             <Select
//               name="state"
//               value={newEmployee.state}
//               onChange={handleInputChange}
//               label="State"
//             >
//               {states.map((state) => (
//                 <MenuItem key={state} value={state}>
//                   {state}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.state}</FormHelperText>
//           </FormControl>
//           <FormControl fullWidth variant="outlined" margin="dense" error={!!formErrors.bloodGroup}>
//             <InputLabel>Blood Group</InputLabel>
//             <Select
//               name="bloodGroup"
//               value={newEmployee.bloodGroup}
//               onChange={handleInputChange}
//               label="Blood Group"
//             >
//               {bloodGroups.map((group) => (
//                 <MenuItem key={group} value={group}>
//                   {group}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.bloodGroup}</FormHelperText>
//           </FormControl>
//           <TextField
//             margin="dense"
//             label="Languages"
//             type="text"
//             fullWidth
//             variant="outlined"
//             name="languages"
//             value={newEmployee.languages}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAddModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEmployee} color="primary" disabled={loading}>
//             {loading ? 'Adding...' : 'Add Employee'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Detailed Employee Modal */}
//       <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
//         <DialogTitle>Employee Details</DialogTitle>
//         <DialogContent>
//           {selectedEmployee && (
//             <>
//               <TextField
//                 margin="dense"
//                 label="User Name"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.userName}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="User Mobile"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.userMobile}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="User Email"
//                 type="email"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.userEmail}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="User Address"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.userAddress}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Skills"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.skills}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Experience"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.experience}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Projects Worked"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.projectsWorked}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Degree"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.degree}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Date of Birth"
//                 type="date"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.dob}
//                 InputProps={{ readOnly: true }}
//                 InputLabelProps={{ shrink: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="State"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.state}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Blood Group"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.bloodGroup}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 label="Languages"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={selectedEmployee.languages}
//                 InputProps={{ readOnly: true }}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDetailModal} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AdminLayout>
//   );
// };

// export default EmployeeTable;


import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import AdminLayout from './Ad'; // Import AdminLayout component

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [unmappedEmployees, setUnmappedEmployees] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    userName: '',
    userPassword: '',
    userMobile: '',
    userEmail: '',
    userAddress: '',
    role: 'employee',
    skills: '',
    experience: '',
    projectsWorked: '',
    degree: '',
    dob: '',
    state: '',
    bloodGroup: '',
    languages: ''
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // For form validations

  // All states in India
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const experienceLevels = ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'];

  useEffect(() => {
    fetchEmployees();
    fetchUnmappedEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:7777/user/getAllUserList');
      if (response.ok) {
        const data = await response.json();
        const filteredEmployees = data.filter(emp => emp.role === 'employee');
        setEmployees(filteredEmployees);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchUnmappedEmployees = async () => {
    try {
      const response = await fetch('http://localhost:7777/user/getAllUnmappedUser');
      if (response.ok) {
        const data = await response.json();
        setUnmappedEmployees(data);
      } else {
        console.error('Failed to fetch unmapped employees');
      }
    } catch (error) {
      console.error('Error fetching unmapped employees:', error);
    }
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setNewEmployee({
      userName: '',
      userPassword: '',
      userMobile: '',
      userEmail: '',
      userAddress: '',
      role: 'employee',
      skills: '',
      experience: '',
      projectsWorked: '',
      degree: '',
      dob: '',
      state: '',
      bloodGroup: '',
      languages: ''
    });
    setFormErrors({});
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!newEmployee.userName) errors.userName = 'User Name is required';
    if (!newEmployee.userEmail) {
      errors.userEmail = 'User Email is required';
    } else if (!emailPattern.test(newEmployee.userEmail)) {
      errors.userEmail = 'Email must be a valid Gmail address';
    }
    if (!newEmployee.userMobile) {
      errors.userMobile = 'User Mobile is required';
    } else if (!phonePattern.test(newEmployee.userMobile)) {
      errors.userMobile = 'Mobile number must be exactly 10 digits';
    }
    if (!newEmployee.experience) errors.experience = 'Experience is required';
    if (!newEmployee.state) errors.state = 'State is required';
    if (!newEmployee.bloodGroup) errors.bloodGroup = 'Blood Group is required';
    if (!newEmployee.dob) errors.dob = 'Date of Birth is required';
    else {
      const dobYear = new Date(newEmployee.dob).getFullYear();
      if (dobYear > 2006) {
        errors.dob = 'Date of Birth must be on or before the year 2006';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEmployee = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:7777/user/doUserInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        await response.json();
        fetchEmployees();
        fetchUnmappedEmployees();
        handleCloseAddModal();
      } else {
        console.error('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeStatus = (employeeId) => {
    return unmappedEmployees.some(emp => emp.userId === employeeId) ? 'Available' : 'Assigned';
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedEmployee(null);
  };

  return (
    <AdminLayout>
      <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
        Add Employee
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
                <Typography variant="h6">ID</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
                <Typography variant="h6">Skills</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
                <Typography variant="h6">Experience</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd' }}>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.userId}>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.userId}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#e0f7fa',
                      color: '#00796b',
                      textTransform: 'none',
                      padding: '5px 10px'
                    }}
                    onClick={() => handleRowClick(employee)}
                  >
                    {employee.userName}
                  </Button>
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.userEmail}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.skills}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.experience}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <Button
                    style={{
                      borderRadius: '12px',
                      backgroundColor: getEmployeeStatus(employee.userId) === 'Assigned' ? '#c8e6c9' : '#ffcdd2',
                      color: getEmployeeStatus(employee.userId) === 'Assigned' ? '#388e3c' : '#c62828',
                      textTransform: 'none',
                      padding: '5px 10px'
                    }}
                  >
                    {getEmployeeStatus(employee.userId)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Employee Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            name="userName"
            value={newEmployee.userName}
            onChange={handleInputChange}
            error={!!formErrors.userName}
            helperText={formErrors.userName}
          />
          <TextField
            margin="dense"
            label="User Mobile"
            type="text"
            fullWidth
            variant="outlined"
            name="userMobile"
            value={newEmployee.userMobile}
            onChange={handleInputChange}
            error={!!formErrors.userMobile}
            helperText={formErrors.userMobile}
          />
          <TextField
            margin="dense"
            label="User Email"
            type="email"
            fullWidth
            variant="outlined"
            name="userEmail"
            value={newEmployee.userEmail}
            onChange={handleInputChange}
            error={!!formErrors.userEmail}
            helperText={formErrors.userEmail}
          />
          <TextField
            margin="dense"
            label="User Address"
            type="text"
            fullWidth
            variant="outlined"
            name="userAddress"
            value={newEmployee.userAddress}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Skills"
            type="text"
            fullWidth
            variant="outlined"
            name="skills"
            value={newEmployee.skills}
            onChange={handleInputChange}
          />
          <FormControl fullWidth variant="outlined" margin="dense" error={!!formErrors.experience}>
            <InputLabel>Experience</InputLabel>
            <Select
              name="experience"
              value={newEmployee.experience}
              onChange={handleInputChange}
              label="Experience"
            >
              {experienceLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.experience}</FormHelperText>
          </FormControl>
          <TextField
            margin="dense"
            label="Projects Worked"
            type="text"
            fullWidth
            variant="outlined"
            name="projectsWorked"
            value={newEmployee.projectsWorked}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Degree"
            type="text"
            fullWidth
            variant="outlined"
            name="degree"
            value={newEmployee.degree}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="outlined"
            name="dob"
            value={newEmployee.dob}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            error={!!formErrors.dob}
            helperText={formErrors.dob}
          />
          <FormControl fullWidth variant="outlined" margin="dense" error={!!formErrors.state}>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={newEmployee.state}
              onChange={handleInputChange}
              label="State"
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.state}</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="dense" error={!!formErrors.bloodGroup}>
            <InputLabel>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={newEmployee.bloodGroup}
              onChange={handleInputChange}
              label="Blood Group"
            >
              {bloodGroups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.bloodGroup}</FormHelperText>
          </FormControl>
          <TextField
            margin="dense"
            label="Languages"
            type="text"
            fullWidth
            variant="outlined"
            name="languages"
            value={newEmployee.languages}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} color="primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Employee'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detailed Employee Modal */}
      <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <>
              <TextField
                margin="dense"
                label="User Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.userName}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="User Mobile"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.userMobile}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="User Email"
                type="email"
                fullWidth
                variant="outlined"
                value={selectedEmployee.userEmail}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="User Address"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.userAddress}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Skills"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.skills}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Experience"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.experience}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Projects Worked"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.projectsWorked}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Degree"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.degree}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Date of Birth"
                type="date"
                fullWidth
                variant="outlined"
                value={selectedEmployee.dob}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="State"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.state}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Blood Group"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.bloodGroup}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                label="Languages"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedEmployee.languages}
                InputProps={{ readOnly: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default EmployeeTable;
