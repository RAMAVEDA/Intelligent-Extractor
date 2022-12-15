import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Snackbar,
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
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  LinearProgress,
  withStyles,
  Link
} from '@material-ui/core';
import Toolbarx from './Toolbar';
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
  padd: {
    marginLeft: 5,
    marginRight: 5,
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
  closeButton: {
    float: 'right'
  }
}));

const Results = ({ className, userdetails, deleteModel, ...rest }) => {
  const classes = useStyles();
  const [selectedModelIds, setSelectedModelIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10)
  const [open, setOpen] = useState(false);
  const [uploaded, setUploaded] = useState(true);
  const [extracted, setExtracted] = useState(false);
  const [model, setModel] = useState('');
  const [percentage, setPercentage] = useState([]);
  const [selected, setSelected] = useState([]);
  const [download, setDownload] = useState({});
  const [uploadfilelist, setUploadFileList] = useState([]);

  const showDia = (model) => {
    sessionStorage.setItem('filelist', '')
    setOpen(true)
    setModel(model)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExtraction = () => {
    setExtracted(false)
  }

  const clearExtract = () => {
    setPercentage([])
    var x = JSON.parse(sessionStorage.getItem('filelist'))
    delete x[model]
    setPercentage([])
    setUploadFileList([])
    setSelected([])
    sessionStorage.setItem('filelist', JSON.stringify(x))
    setUploaded(true)
  }
  const extractText = () => {
    var filelist = sessionStorage.getItem('filelist')
    console.log('extractText', filelist)

    if (filelist !== null && filelist.length > 0 && sessionStorage.getItem('filelist')) {
      var data = {
        modelname: model,
        filelist: JSON.parse(sessionStorage.getItem('filelist'))[model],
        user: sessionStorage.getItem('Username')
      }
      console.log(data, sessionStorage.getItem('Username'))
      axios.post(process.env.REACT_APP_BASE_URL + "extractValesAll", data)
        .then(res => {
          console.log(res.data)
          var download_xl = download
          setDownload('')
          download_xl[model] = res.data
          console.log(download_xl)
          setDownload(download_xl)
        })
      var x = JSON.parse(sessionStorage.getItem('filelist'))
      delete x[model]
      setPercentage([])
      setUploadFileList([])
      setSelected([])
      sessionStorage.setItem('filelist', JSON.stringify(x))
      console.log('uploadFIle', uploadfilelist, selected)
      setExtracted(true)
      setUploaded(true)
      handleClose()
    }
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
    console.log('Start', newPage, start, end, userdetails.length, userdetails.slice(start, end))
    setPage(newPage);
    setStart((newPage * limit) + 1)
    var end_ = (newPage * limit) + 1 + limit
    if (end_ > userdetails.length)
      end_ = userdetails.length
    setEnd(end_);
    console.log('End', newPage, start, end, userdetails.length, userdetails.slice(start, end))
  };

  const uploadFile = async ({ target: { files } }) => {
    console.log(files)
    let selected = files
    let info = []
    let filenames = []
    Object.keys(selected).map(x => {
      info.push({
        percentage: 0,
        fileName: selected[x].name
      })
      filenames.push(selected[x].name)
    })
    setSelected(selected)
    setPercentage(info)
    setUploadFileList(filenames)
  }

  useEffect(() => {
    Object.keys(selected).map(x => upload(x, selected[x]))

  }, [uploadfilelist])


  const upload = (n, file) => {
    console.log('upload1', file)

    let percentage_info = [...percentage]
    let data = new FormData();
    data.append(`file`, file)
    data.append('modelname', model)
    data.append('filename', file.name)

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        percentage_info[n].percentage = Math.floor(loaded * 100 / total)
        console.log(`${loaded}kb of ${total}kb | ${Math.floor(loaded * 100 / total)}%`)
        setPercentage(percentage_info)
      }
    }
    axios.post(process.env.REACT_APP_BASE_URL + "uploadfiles", data, options)
      .then(async res => {
        if (res.data.length > 0) {
          var filelist = {}
          var list = []
          var str = sessionStorage.getItem('filelist')
          try {
            console.log(str, JSON.parse(str), filelist, Object.keys(filelist).filter(x => x === model))
            if (str) {
              filelist = JSON.parse(str)
              if (Object.keys(filelist).filter(x => x === model).length > 0) {
                list = filelist[model]
              }

            }
          }
          catch (e) { }
          list.push(res.data)
          console.log('data', filelist, res.data, model, list)
          filelist[model] = list
          sessionStorage.setItem('filelist', JSON.stringify(filelist))
          console.log("List", filelist[model].length, Object.keys(selected).length)
          if ((filelist[model].length === Object.keys(selected).length) && filelist[model].length > 0) {
            setUploaded(false)
          }
          console.log('assign', filelist)
        }

      })

  }
  return (

    <MuiThemeProvider theme={colortheme}>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Toolbarx />
        {/* {download
      } */}
        {/* {Object.keys(download).map(x=>console.log(x))}
      {Object.keys(download).map(x=>(
          
          <a className={clsx(classes.padd)} id={"id_"+x} download={x+".csv"} href={download[x]} >{x}</a>
      ))} */}
        {/* <a className={clsx(classes.padd)} id="downloadlink" download="model.csv" href="http://localhost:8000/media/f7bf33f8-524e-4288-85df-d7ec2bfa10a7.csv" >x</a> */}
        {/* <Link target={"http://localhost:8000/media/f7bf33f8-524e-4288-85df-d7ec2bfa10a7.csv"} to="your-link">Your Link</Link> */}

        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedModelIds.length === userdetails.length}
                    color="primary"
                    indeterminate={
                      selectedModelIds.length > 0
                      && selectedModelIds.length < userdetails.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>
                    Model Name
                  </TableCell>
                  <TableCell>
                    Model Type
                  </TableCell>
                  <TableCell>
                    Field Count
                  </TableCell>
                  <TableCell>
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userdetails.filter((userdetail) => userdetail.completed).slice(start, end).map((userdetail) => (
                  <TableRow
                    hover
                    key={userdetail.id}
                    selected={selectedModelIds.indexOf(userdetail.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedModelIds.indexOf(userdetail.id) !== -1}
                      onChange={(event) => handleSelectOne(event, userdetail.id)}
                      value="true"
                  />{console.log(userdetail)}
                  </TableCell> */}
                    <TableCell>
                      {userdetail.modelname}
                    </TableCell>
                    <TableCell>
                      {userdetail.modeltype}
                    </TableCell>
                    <TableCell>
                      {userdetail.fieldcount}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => showDia(userdetail.modelname)}
                        disabled={!userdetail.completed}
                      >
                        Use Model
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => deleteModel(userdetail.id)}
                      >
                        Delete Model
                      </Button>
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
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Extract Text"}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select document to extract the text
          </DialogContentText>
          <br />
          {uploadfilelist.length === 0 ? <Button
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

          </Button> : <div></div>}
          {/* <BorderLinearProgress variant="determinate" value={100} label={`100%`} /> */}
          {/* {(uploaded === true) ? (<h4 className='text.success'>Uploading in Progress</h4>) : ("")} */}
          {percentage.map((x, i) => (
            <div>
              {(uploaded === true && i === 0) ? (<h5 className='text-success text-center'>Uploading in Progress...</h5>) : ("")}
              <Typography>{x.fileName}</Typography>
              <BorderLinearProgress variant="determinate" value={x.percentage} label={`${x.percentage}%`} />

            </div>
          ))}
          <br />
          <br />
        </DialogContent>

        <DialogActions>
          <Button onClick={clearExtract}
            color="primary"
            variant="contained"
            autoFocus>
            Clear
          </Button>

          <Button onClick={extractText}
            color="primary"
            variant="contained"
            autoFocus
            disabled={uploaded}>
            Start Extracting
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={extracted}
        autoHideDuration={6000}
        onClose={handleExtraction}
        message="Extraction in progress.. Check reports section for result"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleExtraction}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </MuiThemeProvider>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  userdetails: PropTypes.array.isRequired
};

export default Results;
