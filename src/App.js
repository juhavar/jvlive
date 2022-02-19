import logo from './logo.svg';
import React, { useState, useRef } from 'react'
import './App.css';
//import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//import{ EmailJSResponseStatus, init } from 'emailjs-com';

//import ReCAPTCHA from "react-google-recaptcha";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import useForm from './Hooks/useForm';

function App() {


  const [errorCheck, setErrorCheck] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  //const [reCaptchaCleared, setReCaptchaCleared] = useState(false)
  const [sendingState, setSendingState] = useState(false)
  const [circularType, setCircularType] = useState("indeterminate")
  const [success, setSuccess] = useState(false)
  const [formDone, setFormDone] = useState()
  const btnRef = useRef()
  const circuRef = useRef()
  //Custom hook call
  const {handleChange, values, errors, handleSubmit } = useForm();



  const statusOptions = [
    { title: 'Student ' },
    { title: 'Unemployed ' },
    { title: 'Entrepreneur ' },
    { title: 'Employed, part-time ' },
    { title: 'Employed, full-time ' },
    { title: 'In military service, until: ' },
    { title: 'Other, please specify: ' }]

  const transportOptions = [
    { title: "Car" },
    { title: 'Public transportation (bus/train)' },
    { title: 'Walking, cycling' } ]

  const [open, setOpen] = useState(false);

  const dialogOpen = () => {
    setOpen(true);
  }

  const dialogClose = () => {
    setOpen(false)
  }

  const continueButtonClick = () => {
    if(Object.keys(errors).length === 0 && Object.keys(values).length === 9) {
      dialogOpen()
    
    }
    
  }

  

  // const reCaptcha = () => {
  //   setReCaptchaCleared(true)
  // }

  // const handleSubmit = e => {
  //   setSendingState(true)
  //   if (btnRef.current) {
  //     btnRef.current.setAttribute("disabled", "disabled")
  //   }

  // }
  return (
    <div className="App">
      <header >

      </header>

      <form className="form" autoComplete="off">
        <Paper style={{ width: '80%' }}
          variant="outlined" elevation={3} >
          <div><img src={logo} className="App-logo" alt="logo" /></div>
          <div className="form-item">
            <TextField
              name="etunimi"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required
              id="0"
              variant="outlined"
              label="First name"
              // onChange={handleChange}
              error={errors.etunimi}
              helperText={errors.etunimi}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="sukunimi"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required
              id="1"
              variant="outlined"
              label="Last name"
              // onChange={handleChange}
              error={errors.sukunimi}
              helperText={errors.sukunimi}>
            </TextField></div>

          <div className="form-item">
            <TextField
              name="posti"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required={true}
              id="2"
              variant="outlined"
              label="Email address"
              type="posti"
              // onChange={handleChange}
              error={errors.posti}
              helperText={errors.posti}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="kaupunki"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required
              id="3"
              variant="outlined"
              label="City of residence"
              // onChange={handleChange}
              error={errors.kaupunki}
              helperText={errors.kaupunki}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="sAika"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required
              id="4"
              variant="outlined"
              label="Date of birth"
              //defaultValue="01-01-2000"
              helperText="Please use format (DD-MM-YYYY)"
              // onChange={handleChange}
              error={errors.sAika}
              helperText={errors.sAika}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="joukkueet"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required
              id="5"
              variant="outlined"
              label="Nearby teams"
              placeholder="You can type as many as you like"
              // onChange={handleChange}
              error={errors.joukkueet}
              helperText={errors.joukkueet}
              >
            </TextField></div>

          <div className="form-item">
            <Autocomplete
              freeSolo
              id="6"
              options={statusOptions.map((option) => option.title)}
              renderInput={(params) =>
                <TextField
                  name="status"
                  id="6"
                  onBlur={(e) => handleChange(e)}
                  style={{ width: '75%' }}
                  {...params}
                  label="Current occupation"
                  variant="outlined"
                  placeholder="Type or select the most relevant option from the drop-down menu. You can also specify additional information such as your weekly working hours"
                  required
                  // onChange={handleChange}
                  error={errors.status}
                  helperText={errors.status}
                ></TextField>}
            /></div>

          <div className="form-item">
            <Autocomplete
              onBlur={(e) => handleChange(e)}
              id="7"
              options={transportOptions}
              getOptionLabel={(option => option.title)}
              renderInput={(params) =>
                <TextField
                  style={{ width: '75%' }}
                  {...params}
                  name="liikkuminen"
                  id="7"
                  label="Primary means of transportation"
                  variant="outlined"
                  required
                  // onChange={handleChange}
                  error={errors.liikkuminen}
                  helperText={errors.liikkuminen}
                ></TextField>}
            /></div>
          <div className="form-item">
            <TextField
              color='primary'
              name="hakemusteksti"
              onBlur={(e) => handleChange(e)}
              style={{ width: '75%' }}
              required={true}
              id="8"
              variant="outlined"
              label="Application letter"
              multiline
              rows={10}
              helperText="Please write a few lines about yourself and your expectations for the job, what motivated you to apply and how this job would fit into your current short
              to medium term plans."
              // onChange={handleChange}
              error={errors.hakemusteksti}
            >
            </TextField></div>
          <div className="form-item">
            <Button
              id="continue"
              color="inherit"
              variant="outlined"
              onClick={continueButtonClick}
            >
              Continue
        </Button>
            <Dialog open={open} onClose={dialogClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{{success} ? 'Is this correct?' : {formDone}} </DialogTitle>
              <DialogContent >
                <DialogContentText>
                  <div>First name: {values.etunimi} </div>
                  <div>Last name: {values.sukunimi}</div>
                  <div>Email address: {values.posti}</div>
                  <div>City: {values.kaupunki}</div>
                  <div>Date of birth: {values.sAika}</div>
                  <div>Nearby teams: {values.joukkueet}</div>
                  <div>Occupation: {values.status}</div>
                  <div>Transportation: {values.liikkuminen}</div>
                  <div>Application letter: {values.hakemusteksti}</div>

                </DialogContentText>
                
                <div className="sending">
                  <Fade
                    in={sendingState}
                    style={{
                      transitionDelay: sendingState ? '100ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    {sendingState &&
                    <CircularProgress
                      variant={circularType}
                      value={100}
                    />}
                  </Fade>

                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={dialogClose} color="secondary">
                  Go back
                </Button>
                <Button
                  ref={btnRef}
                  onClick={() => {
                    setSendingState(true);
                    var result = handleSubmit();
                    
                    if (result){
                      setSuccess(true)
                      setCircularType("determinate")
                      setFormDone("Following data was sent succesfully:")
                    }
                    else{
                      setCircularType("determinate")
                      
                    }
                    

                  }}
                  color="inherit"
                  disabled={sendingState || success} 
                  >
                  {sendingState ? 'Sending' : 'Send'}

                </Button>

              </DialogActions>
            </Dialog>
          </div>
        </Paper>
      </form>
    </div >
  );
}

export default App;
