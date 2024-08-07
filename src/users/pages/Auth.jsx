import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIComponents/Card';
import Input from '../../shared/components/FormElements/Input';

import ErrorModal from '../../shared/components/UIComponents/ErrorModal';
import LoadingSpinner from '../../shared/components/UIComponents/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

import Avatar from "@material-ui/core/Avatar";
import Button from "../../shared/components/FormElements/Button"
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { unstable_debounce } from '@mui/utils';



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    
  },
  paper: {
    margin: theme.spacing(5, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position:"relative",
    left:"500px"
   
  },
  image: {
    
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 0px 15px 0px #2672cf",
    position: "relative",
    left:"155px",
    bottom:"40px"
  },
  h2: {
         position: 'relative',
         left: '100px' ,
         color: "White" 
  },
  h3: {
    position: 'relative',
    left: '100px',
    fontSize:"20px",
    fontWeight:"bold",
    bottom:"40px",
    color:"white"
},
  form: {
    width: "100%",
    marginTop: theme.spacing(5),
   
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: "0px 0px 15px 0px #2672cf",
  },
  
}));

export default function  Auth () {

  const classes = useStyles();

  // => used in the header to greet the user <=
  var date = new Date();
  var hrs = date.getHours();
  var greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 16) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    console.log(formState.inputs)

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId);
      } catch (err) {}
    } else {
      try {

        const formData = new FormData();
        formData.append('email', formState.inputs.email.value );
        formData.append('name', formState.inputs.name.value );
        formData.append('password', formState.inputs.password.value );
        //formData.append('image', formState.inputs.image.value );
     
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
         formData,
          
        );

        auth.login(responseData.userId);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <div className = "authentication">
      <Grid container component="main" className={classes.root}>
      
       
        <div  class="login-wrap">
        <div class="login-html">
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography className={classes.h3} com>
            {greet}
          </Typography>
      <ErrorModal error={error} onClear={clearError} />
     
      
        <form onSubmit={authSubmitHandler} className="login-form" >
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className={classes.h2}>Login Required</h2>
        <hr />
          {!isLoginMode && (
            
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          
        
          
          <Input 
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}


            />
            
          <Input
           element="input"
           id="password"
           type="password"
           label="Password"
           validators={[VALIDATOR_MINLENGTH(5)]}
           errorText="Please enter a valid password, at least 5 characters."
           onInput={inputHandler}
         
          />
          <br />
          
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'SIGN IN' : 'SIGN UP'}
          </Button>
         <br />
        
        <Button inverse onClick={switchModeHandler}>
           {isLoginMode ? 'SIGN UP' : 'SIGN IN'}
        </Button>
        </form>
        </div>
			</div>
      
     
      </Grid>
      </div>
    </React.Fragment>
  );
};


