import React, { Component } from "react";
import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
import Results from './Results';
import Page from 'src/components/Page';
import axios from 'axios'

class ReportsView extends Component{
    state ={classes :  makeStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.background.dark,
          minHeight: '100%',
          paddingBottom: theme.spacing(3),
          paddingTop: theme.spacing(3)
        }
      })),
      userdetails:[],
      deleted:true}
    
      async componentDidMount() {
          var l =0
          await axios.get(process.env.REACT_APP_BASE_URL+'report')
          .then(response => {
              if (response.data.length > 0){
                  response.data.map(async model=>{
                      this.setState({userdetails:[...this.state.userdetails,{id:l,modelname:model['modelname'],
                      reportname:model['reportname'],documentcount:model['documentcount'],date:model['date'],completed:model['extractionstatus']}]})
                      console.log(this.state.userdetails)
                      l++
                  })
              }
            })
      }
      
      async downloadReport(date,reportName){
        console.log(date,reportName)
        await axios.get(process.env.REACT_APP_BASE_URL+'download/'+date+'/'+reportName)
        .then(response => {
          if (response.data.length > 0){
            console.log(response.data)
            window.open(response.data);
          }})
      }
      
      
    render(){
      return (
        <Page
          className={this.state.classes.root}
          title="Model"
        >
          <Container maxWidth={false}>
            {/* <Toolbar /> */}
            <Box mt={3}>
              <Results 
              userdetails={this.state.userdetails} 
              downloadReport={this.downloadReport} 
              useModel={console.log('useModel')}/> 
            </Box>
          </Container>
        </Page>
      );
    }
}

export default ReportsView;