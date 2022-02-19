import { useState } from 'react'
import {omit} from 'lodash'
import emailjs from 'emailjs-com';
import CircularProgress from '@material-ui/core/CircularProgress';

const useForm = (callback) => {
    //Form values
    const [values, setValues] = useState({});
    //Errors
    const [errors, setErrors] = useState({});
    const [circularType, setCircularType] = useState("indeterminate")
    
    const validate = (event, name, value) => {
        //A function to validate each input values
    
        switch (name) {
            case 'etunimi':
                if (value.length < 2) {
                    // we will set the error state
    
                    setErrors({
                        ...errors,
                        etunimi: 'Name should have at least have 2 letters'
                    })
                } else {
    // set the error state empty or remove the error for username input
    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "etunimi");
                    setErrors(newObj);
                }
                break;
                case 'sukunimi':
                    if (value.length < 2) {
                        // we will set the error state
        
                        setErrors({
                            ...errors,
                            sukunimi: 'Name should have at least have 2 letters'
                        })
                    } else {
                        let newObj = omit(errors, "sukunimi");
                        setErrors(newObj);
                    }
                    break;
            case 'posti':
                if(
                    !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        posti:'Enter a valid email address'
                    })
                }else{

                    let newObj = omit(errors, "posti");
                    setErrors(newObj);
                    
                }
            break;
            case 'kaupunki':
                if (value.length < 2) {
                    // we will set the error state
    
                    setErrors({
                        ...errors,
                        kaupunki: 'City should have at least have 2 letters.'
                    })
                } else {
                    let newObj = omit(errors, "kaupunki");
                    setErrors(newObj);
                }
                break;
            case 'sAika':
                if (value.length < 5) {
                    // we will set the error state
    
                    setErrors({
                        ...errors,
                        sAika: 'Enter a valid birthdate'
                    })
                } else {
                    let newObj = omit(errors, "sAika");
                    setErrors(newObj);
                }
            
            break;
            case 'joukkueet':
                if (value.length < 4) {
                    setErrors({
                        ...errors,
                        joukkueet: 'At least 1 team needed'
                    })
                } else {
                    let newObj = omit(errors, "joukkueet");
                    setErrors(newObj);
                }
                break;
            case 'status':
            if (value.length < 1) {
                setErrors({
                    ...errors,
                    status: 'Field cannot be empty'
                })
            } else {
                let newObj = omit(errors, "status");
                setErrors(newObj);
            }
            break;
            case 'liikkuminen':
                if (value.length < 1) {
                    setErrors({
                        ...errors,
                        liikkuminen: 'Field cannot be empty'
                    })
                } else {
                    let newObj = omit(errors, "liikkuminen");
                    setErrors(newObj);
                }
                break;
            case 'hakemusteksti':
                if (value.length < 50) {
                    setErrors({
                        ...errors,
                        hakemusteksti: 'Put some more effort into it'
                    })
                } else {
                    let newObj = omit(errors, "hakemusteksti");
                    setErrors(newObj);
                }
                break;
            default:
                break;
        }
    }

    const handleChange = (event) => {
        //To stop default events    
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val)

        //Let's set these values in state
        setValues({
            ...values,
            [name]:val,
        })
    }

    const handleSubmit = (event) => {
        //if(event) event.preventDefault();
        console.log(values)
        if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
            
            sendEmail();

        }else{
            alert("There is an Error!");
        }
    }
    const sendEmail = () => {
        var template_params = {
            'etunimi': values.etunimi,
            'sukunimi': values.sukunimi,
            'sahkoposti': values.posti,
            'kaupunki': values.kaupunki,
            'sAika': values.sAika,
            'joukkueet': values.joukkueet,
            'status': values.status,
            'liikkuminen': values.liikkuminen,
            'hakemusteksti': values.hakemusteksti
          }
          setCircularType("determinate")
          
          
        emailjs.send(process.env.REACT_APP_API_SERVICE, process.env.REACT_APP_API_TEMPLATE, template_params, process.env.REACT_APP_API_USER)
      .then(function (response) {
          alert("Your application was sent succesfully. You can now close the page.")
          
            return true;
        
      }, function (error) {
        alert("Error, please try again later. If the problem persists, please copy and paste the application form and send it manually to jvlive [at] gmx.com ")
      })
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}

export default useForm