import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  
    // id: uuid(),
    // name: 'Dropbox',
    // imageUrl: '/static/images/products/product_1.png',
    // updatedAt: moment().subtract(2, 'hours')
  
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));



const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [Models,setModel] = useState([]);
  // useEffect(()=>{
  //   var t = (getResponse())
  //   console.log(t)
  //   return t
  // }
  // )

  // let getResponse= async ()=> {
  //   var userdetails=[]
  //   var l =0
  //   await axios.get('http://localhost:5000/document/')
  //   .then(response => {
  //       if (response.data.length > 0){
  //           response.data.map(async model=>{
  //               var count = 0
  //               console.log('http://localhost:5000/field/ModelName/'+model['ModelName'].trim())
  //               await axios.get('http://localhost:5000/field/ModelName/'+model['ModelName'])
  //               .then(response1=>{
  //                   if (response1.data.length > 0){
  //                       count=response1.data.length;
  //               }})
  //               userdetails.push({id:l,modelname:model['ModelName'],modeltype:model['Document'],fieldcount:count})
  //               l++
  //           })
  //       }
  //       // if (userdetails.length > 0){
  //       // setModel(userdetails)
  //       userdetails.map(i=>console.log(i))
  //       console.log(userdetails.length)
  //     // }
  //       return (userdetails)
  //     })
  // }

  
  return (
     <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${Models.length} in total`}
        title="Model types"
      />
      <Divider />
      <List>
        {Models.map((Model, i) => (
          <ListItem
            divider={i < Models.length - 1}
            key={Model.id}
          >
            <ListItemText
              primary={Model.modelname}
              secondary={`Updated ${moment().subtract(2, 'hours').fromNow()}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
