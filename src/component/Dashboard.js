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
import { text } from '../constant/textConstants';
import { addEmployee, updateEmployee } from "../redux/empSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [empMail, setEmpMail] = useState('');
  const [phone, setPhone] = useState('');
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(true);
  const [rowIdx, setRowIdx] = useState(null);
  const [isEditable, setEditable] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const store = useSelector((state) => state);
  const { email } = store?.user?.data;
  const { addEmployeeTitle } = text;
  const { data: empData } = store?.empList;

  const handleClose = () => {
    setOpen(false);
  };

  const onEdit = (id, idx) => {
    empData?.forEach(elem => {
        if (elem.id === id) {
            const { name, empMail, phone } = elem;
            setName(name)
            setEmpMail(empMail)
            setPhone(phone)
            setEditable(true);
            setRowIdx(idx);
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

    const newRow = {
        id: Math.floor(Math.random() * 100),
        name,
        empMail,
        phone,
    }
    isEditable ? setRows(rows?.map((row, idx) => {
        if (idx !== rowIdx) {
          return row;
        } else {
          return newRow;
        }
  })) : setRows(prevItems => [...prevItems, newRow]);

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
          {addEmployeeTitle}
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
              {rows?.map((item, idx) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.empMail}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    <Box style={{ display: 'flex' }}>
                        <Box className='edit-con' style={{ cursor: 'pointer', width: '20%'}} onClick={() => onEdit(item.id, idx)}><EditIcon /></Box>
                        <Box className='edit-con' style={{ cursor: 'pointer', width: '10%'}} onClick={() => onDelete(item.id)}><DeleteIcon /></Box>
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
