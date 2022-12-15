import React, { Component } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import axios from 'axios'

class CustomerListView extends Component{

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
      await axios.get(process.env.REACT_APP_BASE_URL+'model')
      .then(response => {
          if (response.data.length > 0){
              response.data.map(async model=>{
                  this.setState({userdetails:[...this.state.userdetails,{id:l,modelname:model['modelname'],
                  modeltype:model['modeltype'],fieldcount:model['fieldcount'],completed:model['finished']}]})
                  console.log(this.state.userdetails)
                  l++
              })
          }
        })
  }

  deleteModel=(id)=>{
    const t = this.state.userdetails.filter(
      p=>p.id === id
    )
    console.log('ModelList-deleteModel',t)
    t.map(async p=>{
      await axios.delete(process.env.REACT_APP_BASE_URL+'field/'+p['modelname'])
      .then(async (res)=>{
        console.log('res.body')
        await axios.delete(process.env.REACT_APP_BASE_URL+'model/'+p['modelname'])
        .then(res=>{
          console.log(res.body)
          const f = !this.state.deleted
          console.log(!this.state.deleted)
          this.setState({deleted:f})
          console.log(this.state.deleted)
        }
        )
        })
        window.location.reload(false)
      }
    
    )
    
    console.log(this.state.deleted)
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
          deleteModel={this.deleteModel} 
          useModel={console.log('useModel')}/>
        </Box>
      </Container>
    </Page>
  );
}
};

export default CustomerListView;
