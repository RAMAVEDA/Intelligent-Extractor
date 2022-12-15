import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  LinearProgress,
  withStyles
} from '@material-ui/core';
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Toolbarx from './Toolbar';
import CloseIcon from '@material-ui/icons/Close';

const colortheme = createMuiTheme({
  palette: {
    primary: { main: "#1e87e9", contrastText: "#fff" },
    secondary: { main: "#e91e65", contrastText: "#fff" }
  }
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  padd:{
    marginLeft:5,
    marginRight:5,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogPaper: {
    minHeight: '80vh',
    minWidth: '80vh'
},
closeButton:{
  float:'right'
}
}));

const Results = ({ className, userdetails,downloadReport, ...rest }) => {
  const classes = useStyles();
  const [selectedModelIds, setSelectedModelIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [start,setStart] = useState(0);
  const [end,setEnd] = useState(10)
  const [open,setOpen] = useState(false);
  const [reportdata,setReportData] = useState([]);
  const [model,setModel] = useState('');

  const showDia =(reportname)=>{
    sessionStorage.setItem('filelist','')
    setOpen(true)
    axios.get(process.env.REACT_APP_BASE_URL+"report/"+reportname)
        .then(res=>{
            console.log(res.data)
            setReportData(res.data)
        })
    setModel(model)
  }

  const handleClose =()=>{
    setOpen(false)
    setReportData([])
  }

  const handleSelectAll = (event) => {
    let newSelectedModelIds;

    if (event.target.checked) {
      newSelectedModelIds = userdetails.map((userdetail) => userdetail.id);
    } else {
      newSelectedModelIds = [];
    }

    setSelectedModelIds(newSelectedModelIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedModelIds.indexOf(id);
    
    let newSelectedModelIds = [];

    if (selectedIndex === -1) {
      newSelectedModelIds = newSelectedModelIds.concat(selectedModelIds, id);
    } else if (selectedIndex === 0) {
      newSelectedModelIds = newSelectedModelIds.concat(selectedModelIds.slice(1));
    } else if (selectedIndex === selectedModelIds.length - 1) {
      newSelectedModelIds = newSelectedModelIds.concat(selectedModelIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedModelIds = newSelectedModelIds.concat(
        selectedModelIds.slice(0, selectedIndex),
        selectedModelIds.slice(selectedIndex + 1)
      );
    }
    setSelectedModelIds(newSelectedModelIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setEnd(event.target.value);
    setStart(0);
  };

  const handlePageChange = (event, newPage) => {
    console.log('Start',newPage,start,end,userdetails.length,userdetails.slice(start,end))
    setPage(newPage);
    setStart((newPage*limit)+1)
    var end_ = (newPage*limit)+1+limit
    if (end_ > userdetails.length)
      end_ = userdetails.length
    setEnd(end_);
    console.log('End',newPage,start,end,userdetails.length,userdetails.slice(start,end))
  };

  return (
    
  <MuiThemeProvider theme={colortheme}>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbarx />
      
      
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedModelIds.length === userdetails.length}
                    color="primary"
                    indeterminate={
                      selectedModelIds.length > 0
                      && selectedModelIds.length < userdetails.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Report Name
                </TableCell>
                <TableCell>
                  Model Name
                </TableCell>
                <TableCell>
                  Document Count
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userdetails.slice(start, end).map((userdetail, index) => (
                <TableRow
                  hover
                  key={userdetail.id}
                  selected={selectedModelIds.indexOf(userdetail.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedModelIds.indexOf(userdetail.id) !== -1}
                      onChange={(event) => handleSelectOne(event, userdetail.id)}
                      value="true"
                  />{console.log(userdetail)}
                  </TableCell>                  
                  <TableCell>
                    {userdetail.reportname}
                  </TableCell>
                  <TableCell>
                    {userdetail.modelname}
                  </TableCell>
                  <TableCell>
                    {userdetail.documentcount}
                  </TableCell>
                  <TableCell>
                    {userdetail.date}
                  </TableCell>
                  <TableCell>
                    {userdetail.completed}
                  </TableCell>
                  <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={()=>showDia(userdetail.reportname)}
                    disabled = {userdetail.completed == "inProgress"}
                  >
                    View Report
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={()=>downloadReport(userdetail.date,userdetail.reportname)}
                  >
                    Download Report                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={userdetails.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <Dialog
        classes={{paper:classes.dialogPaper}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Documents"}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Documents:
          </DialogContentText>
          <br/>
              {/* {uploadfilelist.length===0?<Button
                variant="contained"
                component="label"
                color="primary"
              >
                Upload File
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={uploadFile}
                />
                
              </Button>:<div></div>} */}
              {/* <BorderLinearProgress variant="determinate" value={100} label={`100%`} /> */}
              <div>
              <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedModelIds.length === userdetails.length}
                    color="primary"
                    indeterminate={
                      selectedModelIds.length > 0
                      && selectedModelIds.length < userdetails.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Document Name
                </TableCell>
                <TableCell>
                  Report Name
                </TableCell>
                <TableCell>
                  Extracted value Count
                </TableCell>
                <TableCell>
                  Extracted Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {reportdata.length > 0 ? reportdata.map((x,index)=>(
                <TableRow
                  hover
                  // key={reportdata.id}
                  // selected={selectedModelIds.indexOf(reportdata.id) !== -1}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {x.eachname}
                  </TableCell>
                  <TableCell>
                    {x.reportname}
                  </TableCell>
                  <TableCell>
                    {x.extractedvaluecount}
                  </TableCell>
                  <TableCell>
                    {x.extractedvalue}
                  </TableCell>
                </TableRow>
              )):null}
            </TableBody>
          </Table>
                               
                  </div>
               
              <br/>
              <br/>
        </DialogContent>
        
        <DialogActions>
        {/* <Button onClick={clearExtract} 
                    color="primary"
                    variant="contained"
                    autoFocus>
            Clear
          </Button> */}
        
          {/* <Button onClick={extractText} 
                    color="primary"
                    variant="contained"
                    autoFocus
                    disabled={uploaded}>
            Start Extracting
          </Button> */}
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  userdetails: PropTypes.array.isRequired
};

export default Results;
