import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "./Header";
import AppSnackbar from "./Snackbar";
import { addEmployee, updateEmployee } from "../redux/empSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [empMail, setEmpMail] = useState('');
  const [phone, setPhone] = useState('');
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(true);
  const [isEditable, setEditable] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const store = useSelector((state) => state);
  const { email } = store?.user?.data;
  const { data: empData, id } = store?.empList;

  const handleClose = () => {
    setOpen(false);
  };

  const onEdit = (id) => {
    empData?.forEach(elem => {
        if (elem.id === id) {
            const { name, empMail, phone } = elem;
            setName(name)
            setEmpMail(empMail)
            setPhone(phone)
            setEditable(true);
            dispatch(updateEmployee(id))
        }
    });
  }

  const onDelete = (id) => {
    const filteredData = rows?.filter(item => item.id !== id);
    setRows(filteredData);
  }

  useEffect(() => {
    if (!name || !empMail || !phone) setDisabled(true);
    else setDisabled(false);
  }, [name, empMail, phone])

  useEffect(() => {
    dispatch(addEmployee(rows));
  }, [dispatch, rows])

  const onSave = () => {

    const emp = {
        id: rows?.length + 1,
        name,
        empMail,
        phone,
    }
    isEditable ? setRows(rows?.map(row => {
        if (row.id !== emp.id) return {...emp, id: row.id };
        else return row;
  })) : setRows(prevItems => [...prevItems, emp]);

    setEditable(false);
    setName('');
    setEmpMail('');
    setPhone('');
  }

  return (
    <>
      <Header userId={email} />
      <AppSnackbar open={open} error="" handleClose={handleClose} />
      <div className="app-table" style={{ padding: '2em'}}>
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Add Employee
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '1em' }}>
            <Box style={{ width: '30%'}}>
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Box>
            <Box style={{ width: '30%'}}>
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={empMail}
                    onChange={(e) => setEmpMail(e.target.value)}
                />
            </Box>
            <Box style={{ width: '30%'}}>
                <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    label="Phone"
                    variant="standard"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </Box>
            <Box>
                <Button
                    variant="outlined"
                    disabled={isDisabled}
                    onClick={() => onSave()}
                >
                    <AddIcon />
                </Button>
            </Box>
      </Box>
      <br /><br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map(({
                id,
                name,
                empMail,
                phone,
              }) => (
                <TableRow
                  key={name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{empMail}</TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>
                    <Box style={{ display: 'flex' }}>
                        <Box className='edit-con' style={{ cursor: 'pointer', width: '20%'}} onClick={() => onEdit(id)}><EditIcon /></Box>
                        <Box className='edit-con' style={{ cursor: 'pointer', width: '10%'}} onClick={() => onDelete(id)}><DeleteIcon /></Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Dashboard;
