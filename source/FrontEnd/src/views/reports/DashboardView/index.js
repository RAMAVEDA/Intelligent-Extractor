import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const [Username, setvalue] = React.useState(sessionStorage.getItem('Username'))
  console.log(sessionStorage.getItem('Username'), Username)
  if (Username !== sessionStorage.getItem('Username')) {
    setvalue(sessionStorage.getItem('Username'))
  }
  const classes = useStyles();
  console.log(sessionStorage.getItem('Username') === null)
  if (sessionStorage.getItem('Username') === null) {
    window.location = '/login'
  }

  const [budgetScore, setBudgetScore] = useState(0); // template processed this
  const [templateCountScore, setTemplateCountScore] = useState(0); // TOTAL MODEL | template count 
  const [totalFieldExtractScore, setTotalFieldExtractScore] = useState(0); // ACCURACY PERCENTAGE | fieldExtractedCount
  const [totalDocProcessScore, setTotalDocProcessScore] = useState(0); // TOTAL DOCUMENT PROCESSED


  const getDashboardScore = async () => {
    await axios.get(`https://imigrate-be-gs4whk5bua-uc.a.run.app/dashboard?format=json`).then((_response) => {
      setBudgetScore(_response.data.report);
      setTemplateCountScore(_response.data.document);
      setTotalFieldExtractScore(_response.data.fieldExtractedCount);
      setTotalDocProcessScore(_response.data.totalReport);
      console.log(_response.data, "**************");
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getDashboardScore();

  }, []);


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget budgetScore={budgetScore} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers templateCountScore={templateCountScore} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress totalFieldExtractScore={totalFieldExtractScore} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit totalDocProcessScore={totalDocProcessScore} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
