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

import ReCAPTCHA from "react-google-recaptcha";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import emailjs from 'emailjs-com';


function App() {
  const [formData, setFormData] = useState([
    { etunimi: { text: '', error: true } },
    { sukunimi: { text: '', error: true } },
    { email: { text: '', error: true } },
    { kaupunki: { text: '', error: true } },
    { sAika: { text: '', error: true } },
    { joukkueet: { text: '', error: true } },
    { status: { text: '', error: true } },
    { liikkuminen: { text: '', error: true } },
    { hakemusteksti: { text: '', error: true } }]
  )

  const [errorCheck, setErrorCheck] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [reCaptchaCleared, setReCaptchaCleared] = useState(false)
  const [sendingState, setSendingState] = useState(false)
  const [circularType, setCircularType] = useState("indeterminate")
  const btnRef = useRef()
  const circuRef = useRef()




  const statusOptions = [
    { title: 'Student ' },
    { title: 'Unemployed ' },
    { title: 'Entrepreneur ' },
    { title: 'Employed, part-time ' },
    { title: 'Employed, full-time ' },
    { title: 'In military service, until: ' },
    { title: 'Other, please specify: ' }

  ]

  const transportOptions = [
    { title: "Car" },
    { title: 'Public transportation (bus/train)' },
    { title: 'Walking, cycling' }

  ]

  const [open, setOpen] = useState(false);

  const updateForm = (e) => {
    setHasStarted(true)
    let deepCopy = JSON.parse(JSON.stringify(formData))

    if (e.target.value === "") {
      deepCopy[e.target.id].[e.target.name].error = true
      setFormData(deepCopy)
    }
    else {

      deepCopy[e.target.id].[e.target.name].text = e.target.value
      deepCopy[e.target.id].[e.target.name].error = false

      setFormData(deepCopy)
      //setFormData(formData[e.target.name]: e.target.value)
      // setFormData([e.target.name].error = false)

    }
  }



  const dialogOpen = () => {
    if (!errorCheck && hasStarted)
      setOpen(true)
  }

  const dialogClose = () => {
    setOpen(false)
  }

  const continueButtonClick = () => {

    checkForErrors()
    dialogOpen()
  }

  const checkForErrors = () => {

    let pötkö = JSON.stringify(formData)
    if (pötkö.includes(true))
      setErrorCheck(true)
    else
      setErrorCheck(false)
  }

  const reCaptcha = () => {
    setReCaptchaCleared(true)
  }

  const handleSubmit = e => {
    setSendingState(true)
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled")
    }



    var template_params = {
      'etunimi': formData[0]["etunimi"].text,
      'sukunimi': formData[1]["sukunimi"].text,
      'sahkoposti': formData[2]["email"].text,
      'kaupunki': formData[3]["kaupunki"].text,
      'sAika': formData[4]["sAika"].text,
      'joukkueet': formData[5]["joukkueet"].text,
      'status': formData[6]["status"].text,
      'liikkuminen': formData[7]["liikkuminen"].text,
      'hakemusteksti': formData[8]["hakemusteksti"].text
    }

    emailjs.send("default_service", process.env.REACT_APP_API_TEMPLATE, template_params, process.env.REACT_APP_API_USER)
      .then(function (response) {
        setCircularType("determinate")
        alert("Application sent successfully. You can now close this window.")
      }, function (error) {
        
        setCircularType("determinate")
        alert("Error, please try again later. If the problem persists, please copy and paste the application form and send it manually to jvlive [at] gmx.com ")
      })



  }
  return (
    <div className="App">
      <header >

      </header>

      <form className="form" preventDefault>
        <Paper style={{ width: '80%' }}
          variant="outlined" elevation={3} >
          <div><img src={logo} className="App-logo" alt="logo" /></div>
          <div className="form-item">
            <TextField
              name="etunimi"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required
              id="0"
              variant="outlined"
              label="First name"

              error={formData[0].["etunimi"].error && errorCheck}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="sukunimi"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required
              id="1"
              variant="outlined"
              label="Last name"
              error={formData[1].["sukunimi"].error && errorCheck}>
            </TextField></div>

          <div className="form-item">
            <TextField
              name="email"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required={true}
              id="2"
              variant="outlined"
              label="Email address"
              type="email"
              error={formData[2].["email"].error && errorCheck}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="kaupunki"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required
              id="3"
              variant="outlined"
              label="City of residence"
              error={formData[3].["kaupunki"].error && errorCheck}
            >
            </TextField></div>

          <div className="form-item">
            <TextField
              name="sAika"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required
              id="4"
              variant="outlined"
              label="Date of birth"
              //defaultValue="01-01-2000"
              helperText="Please use format (DD-MM-YYYY)"
              error={formData[4].["sAika"].error && errorCheck}
            >
            </TextField></div>




          <div className="form-item">
            <TextField
              name="joukkueet"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required
              id="5"
              variant="outlined"
              label="Nearby teams"
              helperText="You can type as many as you like"
              error={formData[5].["joukkueet"].error && errorCheck}>
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
                  onBlur={(e) => updateForm(e)}
                  style={{ width: '75%' }}
                  {...params}
                  label="Current occupation"
                  variant="outlined"
                  helperText="Type or select the most relevant option from the drop-down menu. You can also specify additional information such as your weekly working hours"
                  required
                  error={formData[6].["status"].error && errorCheck}
                ></TextField>}
            /></div>

          <div className="form-item">
            <Autocomplete
              onBlur={(e) => updateForm(e)}
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
                  error={formData[7]["liikkuminen"].error && errorCheck}
                ></TextField>}
            /></div>
          <div className="form-item">
            <TextField
              color='primary'
              name="hakemusteksti"
              onBlur={(e) => updateForm(e)}
              style={{ width: '75%' }}
              required={true}
              id="8"
              variant="outlined"
              label="Application letter"
              multiline
              rows={10}
              helperText="Please write a few lines about yourself and your expectations for the job, what motivated you to apply and how this job would fit into your current short
              to medium term plans."
              error={formData[8].["hakemusteksti"].error && errorCheck}
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
              <DialogTitle id="form-dialog-title">Is this correct?</DialogTitle>
              <DialogContent >
                <DialogContentText>
                  <div>First name: {formData[0]["etunimi"].text} </div>
                  <div>Last name: {formData[1]["sukunimi"].text}</div>
                  <div>Email address: {formData[2]["email"].text}</div>
                  <div>City: {formData[3]["kaupunki"].text}</div>
                  <div>Date of birth: {formData[4]["sAika"].text}</div>
                  <div>Nearby teams: {formData[5]["joukkueet"].text}</div>
                  <div>Occupation: {formData[6]["status"].text}</div>
                  <div>Transportation: {formData[7]["liikkuminen"].text}</div>
                  <div>Application letter: {formData[8]["hakemusteksti"].text}</div>

                </DialogContentText>
                <div className="ReCAPTCHA">
                  {<ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={reCaptcha}></ReCAPTCHA>}</div>
                <div className="sending">
                  <Fade
                    in={sendingState}
                    style={{
                      transitionDelay: sendingState ? '100ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress
                      variant={circularType}
                      value={100}
                    />
                  </Fade>

                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={dialogClose} color="secondary">
                  Go back
          </Button>
                <Button
                  ref={btnRef}
                  onClick={handleSubmit}
                  color="inherit"
                  disabled={!reCaptchaCleared}>
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
