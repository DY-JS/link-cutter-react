import React from 'react';
import {Formik, Form, Field, } from 'formik';
import styles from './form.module.css';

const ReqForm = (props) => {
const initialValues = { input: "" };  //values.input

let newValue='';
let p=document.createElement('p');

 function onSubmit(values, formikBag) {  //values-это обект formikBag-это функции
  //const url='http://getpost.itgid.info/index2.php';
  const url='https://link-cutter-01.herokuapp.com/jsonLinks';
  const baseLink='https://link-cutter-01.herokuapp.com/';
  let linkInput=document.querySelector('input');
  
    if (!values.input) {linkInput.value='Input Link!!!'; return }  
    //sendReq( url, body)  // .then((data)=>{console.log(data)}); // .cath(err=>console.log(err)) }
    
    let body={
      url: values.input,
      //uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",  не нужно для бєка
      comment: "string"
    };

   const headers={
    //'accept': '*/*',
    'Content-Type': 'application/json',     // 'application/x-www-form-urlencoded',
     }
    let res={};
    
   fetch(url, {
    method: "POST",
    //mode: 'no-cors', cache: 'no-cache',
    body:JSON.stringify(body),
    headers:headers,
    })
    .then((response)=>{//console.log(response);
       return response.json()}) 
    .then((data) => {
        res ={...data}  //  console.log(res);
        newValue=`${baseLink}${res.uuid}`;// console.log(res.uuid);

       if(!newValue){linkInput.value='Oops..Something went wrong((('}
       linkInput.value=newValue;
       p.innerHTML=`COPY:  <a href="${newValue}" target="_blank">${newValue}</a> `; 
       linkInput.before(p);     //console.log(newValue);
       if(document.querySelectorAll('p').length>1){document.querySelectorAll('p').shift()};
         });
           
     }
    
  function onReset(values, formikBag) {
    values=initialValues;
    values.input='';
    p.innerHTML='';
  if(document.querySelectorAll('p').length>1){document.querySelectorAll('p').shift()}
  };
   
   return (
       <Formik initialValues={initialValues} onSubmit={onSubmit} >
       {formProps=>(
         <Form  className={styles.main}>
         <Field type="text" method='POST' name="input" placeholder="Input your link" onChange={formProps.handleChange} className={styles.input} />
         <Field type="submit" name="submit" value="SHORT IT" className={styles.btn}/>
          <button type="reset" name="reset" onReset={onReset} className={styles.btn}>RESET</button>
         </Form>   
           )}
         </Formik>
      )
     };
 
 export default ReqForm;
 