// import './CreateModelField.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Typography, Box, Button, Divider, TextField, Breadcrumbs, Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    Table,
    TableCell,
    TableRow,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Grid
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import './create-model.css';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        float: "right"
    },
    root: {
        width: '100%',
        maxWidth: 500,
    },
    text: {
        margin: theme.spacing(1)
    }
}));
var CreateModelField = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [newDetails, setNewDetails] = useState(props.details);

    useEffect(() => {
        setNewDetails(props.details);
    }, [newDetails]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // To Delete single row -- it deleting good and UI not updating properly...
    const deleteTableRow = (rowId, index, key) => {
        try {
            let rowVal = document.querySelector(`#${rowId} input[type="text"]`).value;
            let isExecuted = window.confirm(`Are you sure to delete this Field : ${rowVal} ?`);
            if (isExecuted) {
                // document.querySelector("#" + rowId).remove();
                props.deleteRowField(rowId, index, key);
                setNewDetails(props.details);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // const nextStepLoadder = (e) => {
    //     // props.nextStep(e);
    //     props.showModel = true;
    //     setTimeout(props.nextStep(e), 5000);
    // }

    return (<Box marginTop="6px">
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: "5px", padding: "5px" }} className="card ">
            <Typography color="text.primary" className="text-light bg-info p-1 pr-2 arrow-right font-bold">
                <strong>Step 1:</strong> Template Configuration
            </Typography>
            <Typography color="text.primary">
                <strong>Step 2:</strong> Upload Template Documents
            </Typography>
            <Typography color="text.primary">
                <strong>Step 3:</strong> Extract & Save Template
            </Typography>
        </Breadcrumbs>
        <form onSubmit={props.saveState}>
            <Typography align="center" variant="h5" className='text-primary'>Template Configuration</Typography>
            <Divider />
            <Box marginTop="20px" marginLeft="10px" style={{ height: "16px" }} >
                <Typography variant='h5'>Define your document layout :</Typography>
                <Box marginTop="20px" >
                    <TextField
                        style={{ flex: 1, margin: '0 20px 0 0', background: 'white' }}
                        required
                        id="outlined-required"
                        name="modelname"
                        label="Template Name"
                        variant="outlined"
                        size="small"
                        helperText={props.error ? "Name already present" : null}
                        error={props.error}
                        onChange={(e) => props.handleChange('ModelName', e)}
                    />
                    <Button aria-describedby={id} variant="text" title="Define your template name" onClick={handleClick} size="small" className="cust-btn-width1">
                        ?
                    </Button><br />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }} >Define your template name</Typography>
                    </Popover>
                    {(props.alert === 'MODELNAME') ? <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Template Name already present — <strong>Enter new name!</strong>
                    </Alert> : <br />}
                    <div className={classes.button} style={{ marginTop: "-7em" }}> {/**, marginLeft: "-2em" */}
                        <Grid container spacing={4}>
                            <Grid item xs={5}>
                                <TextField
                                    type="number"
                                    required
                                    id="fieldsCount"
                                    name="fieldCount"
                                    label="Count"
                                    title="How Many Fields Required"
                                    variant="outlined"
                                    size="small"
                                    min="1"

                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                                    style={{ flex: 1, margin: '0 20px 0 0', background: 'white', width: "100px", top: "0.45em" }}
                                    helperText={props.error ? "Atleast one field required" : null}
                                    error={props.error}
                                />
                                {/* <input type="number" className='form-control' min="1" style={{ width: "65px" }} /> */}
                                <Button
                                    variant="contained"
                                    color="success"
                                    className={classes.button + " bg-success text-light left-top-minus-2-3em"}
                                    startIcon={<AddIcon size="small" />}
                                    size="small"
                                    onClick={props.addField}>
                                    Add Field
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon size="small" />}
                                    className={classes.button + " left-minus-2-28em"}
                                    id='Delete'
                                    size="small"
                                    onClick={props.deleteField}>
                                    Delete Field
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                {(props.details.length > 0) ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<ArrowForwardIcon size="small" />}
                                        // href='/'
                                        size="small"
                                        onClick={(e) => { props.nextStep(e); }}
                                        type="submit">
                                        Next
                                    </Button>
                                ) : (<Button className='cust-display-none'></Button>)}
                            </Grid>
                        </Grid>

                        {props.modfielderror !== '' ?
                            <Alert severity="error">{props.modfielderror}</Alert> : <div></div>}


                    </div>
                </Box>
            </Box>
            <Box marginTop="5em" marginLeft="10px" overflow="scroll" style={{ width: "790px", height: "400px", overflowX: "hidden" }}>
                {/* <Table align='left' sx={{ minWidth: 650 }} size="small" aria-label="a dense table"> */}
                <Table align='left' sx={{ minWidth: 650 }} size="small" style={{ marginTop: "2em" }}>
                    <colgroup>
                        <col style={{ width: '200px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '100px' }} />
                    </colgroup>
                    {newDetails.map((field, key) => {
                        { console.log(field, field.fieldname, "Fields ---------------------") }
                        let rowid = "trow_" + String(key);
                        return (<TableRow id={rowid}>
                            <TableCell>
                                <TextField
                                    style={{ flex: 1, margin: '0 20px 0 0', background: 'white', width: "15em" }}
                                    required
                                    id="outlined-required"
                                    name="fieldname"
                                    label="Field Name"
                                    defaultValue={props.setValue(field.fieldname)}
                                    size="small"
                                    variant="outlined"
                                    // value={(e)=>handleChange(field.key,e)}
                                    onChange={(e) => props.handleChange(field.key, e)}
                                />
                            </TableCell>
                            <TableCell>
                                <FormControl variant="outlined"
                                    style={{ flex: 1, margin: '0 20px 0 0', background: 'white' }} size="small">
                                    <InputLabel id="demo-simple-select-outlined-label">Datatype</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={props.setValue(field.type)}
                                        onChange={(e) => props.handleChange(field.key, e)}
                                        name="type"
                                        label="Datatype"
                                        required
                                    >
                                        <MenuItem value={1}>Character</MenuItem>
                                        <MenuItem value={2}>Integer</MenuItem>
                                        <MenuItem value={3}>Date</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <FormControl
                                    variant="outlined"
                                    style={{ width: '100px', flex: 2, margin: '0 20px 0 0', background: 'white' }} size="small">
                                    <InputLabel id="demo-simple-select-outlined-label" >Mandatory</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={props.setValue(field.mandatory)}
                                        onChange={(e) => props.handleChange(field.key, e)}
                                        name="mandatory"
                                        label="Mandatory"
                                        required
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                {/* <input type="button" className='btn btn-danger btn-sm' value="X" onClick={e => deleteTableRow(rowid, key, field.key)} /> */}
                                {/* <input type="button" className='btn btn-danger btn-sm' value="X" onClick={e => props.deleteRowField(rowid, key)} /> */}
                            </TableCell>
                        </TableRow>)
                    })
                    }
                </Table>
                {/* <Box align='center' marginTop='50px'>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                id='Delete'
                onClick={props.deleteField}
            >
            Delete Field
            </Button>
        </Box> */}
            </Box>
        </form>
    </Box>)

}

export default CreateModelField;
