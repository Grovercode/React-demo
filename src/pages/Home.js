import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector} from 'react-redux'; 
import { deleteUser, loadUsers } from '../redux/actions';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import triangle from '../assests/icons/triangle.svg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import cross from '../assests/icons/cross.svg'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#7C47E1',
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: '600',
    padding: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const Home = () => {
  const [open, setOpen] = useState(false);
  const [deleteElement, setDeleteElement] = useState()
  const [filter, setFilter] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([]);

  const{users} = useSelector(state=> state.data)

  let dispatch = useDispatch()


  useEffect(()=> {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {

    if(!filter)
    {
      setFilteredUsers(users.data)
    }
    else
    {
      const list = users?.data?.filter((i) => i.requestStatus===filter)
      setFilteredUsers(list)
    }

  }, [filter, users])

  const handleClickOpen = (id) => {
    setDeleteElement(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (e)=>{
    setFilter(e.target.value)
  }

  const handleDelete = (id) =>{
    dispatch(deleteUser(id))
    handleClose()
  }

  const handleRemoveFilterButton = (id) => {
    setFilter("")
  }

  console.log("users log is ", users.data)
  
  return (
    <div className='content'>
      <div className='head'>
      
      <div className='introText'> 
      Hello Ackers,<br/> Welcome to Acko IT Support Portal!
      </div>
      <div className='reqbutton'>
      <Link className='link' to='request'> + New Request</Link>
      </div>
      </div>

      <div className='messageRow'>
        <div className='openReqMessage'>
           <img className='triangle' src={triangle}/>
           <div className='openReqText'>My Open Requests</div>
         </div>

      <div className='filter'>
      <img 
        style={{ visibility: filter ? "visible" : "hidden" }}
        className='removeFilterButton' src={cross} onClick={handleRemoveFilterButton}/>

      <div>
      <FormControl className="filterSelect" >
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
             <Select
                labelId="demo-simple-select-label"
                    id="demo-simple-select"
                      value={filter}   
                          label="filter"
                            onChange={handleFilterChange}>
                <MenuItem value={"open"}>Open</MenuItem>
                <MenuItem value={"in-progress"}>In-Progress</MenuItem>
                <MenuItem value={"closed"}>Closed</MenuItem>
             </Select>
        </FormControl>
        </div>
      </div>
      </div>

      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers && filteredUsers.map((user) => (
            <StyledTableRow key={user.requestId}>
              <StyledTableCell align="center" component="th" scope="row">
                {user.requestId}
              </StyledTableCell>
              <StyledTableCell align="center">{user.customerName}</StyledTableCell>
              <StyledTableCell align="center">{user.requestStatus}</StyledTableCell>
              <StyledTableCell align="center">{user.customerEmail}</StyledTableCell>
              <StyledTableCell align="center">
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons">
                    <Link style={{ fontSize:'12px',  color: '#7C47E1'}} className='link' to={`request/${user.requestId}`}>Edit</Link>
                    <p style={{color: 'red'}} color='secondary'
                    onClick={()=>handleClickOpen(user.requestId)}
                    //()=> handleDelete(user.id)
                    >Delete</p>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
    
     </Table>
     </TableContainer>
     

     <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> {"Delete"} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="success" onClick={handleClose}>No</Button>
          <Button variant="outlined" color="error" onClick={()=>handleDelete(deleteElement)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      
      
  </div>
  )
}
