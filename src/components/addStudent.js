import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import {BACK_URL} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';

class AddStudent extends Component {
	constructor(props) {
      super(props);
      this.state = {open: false, name: "", email: "", newStudent: []};
    };

    handleClickOpen = () => {
      this.setState( {open:true} );
    };

    handleClose = () => {
      this.setState( {open:false} );
    };

    handleChangeName = (event) => {
		this.setState({name: event.target.value});
		console.log(this.state);
    }
	
	handleChangeEmail = (event) => {
		this.setState({email: event.target.value});
		console.log(this.state);
    }

  // Save course and close modal form
   handleAdd = () => {
	   
	   this.state.newStudent.push(this.state.name);
	   this.state.newStudent.push(this.state.email);
	   
	   console.log(this.state);
	 
     this.addstudent(this.state.newStudent);
     this.handleClose();
    }
	
	addstudent = (student) => {
		console.log("adding a student...");
		const token = Cookies.get('XSRF-TOKEN');
		
		student = {"name":student[0], "email":student[1]};
		
		
		fetch(`${BACK_URL}/student`,
			{
				method:'POST',
				headers: {'Content-Type': 'application/json', 'X-XSRF-TOKEN': token},
				body: JSON.stringify(student)
			})
			.then(res => {
				if(res.ok){
					toast.success("New student added", {
						position: toast.POSITION.BOTTOM_LEFT
				});
			}else{
				toast.error("Error on trying to add the new student",{
					position: toast.POSITION.BOTTOM_LEFT
				});
				console.error('Post http status =' + res.status);
			}})
			.catch(err => {
				toast.error("Error when adding", {
					position: toast.POSITION.BOTTOM_LEFT
				});
				console.error(err);
			});
				
	}

    render()  { 
      return (
	  <div>
            
			<TextField autoFocus fullWidth label="Student Name" name="name" 
				onChange={this.handleChangeName}  />
			<TextField autoFocus fullWidth label="Student Email" name="email" 
				onChange={this.handleChangeEmail}  />
			<Button onClick={this.handleAdd} style={{paddingTop: 20}}
				> Add a student </Button>				
      </div>
      ); 
    }
}

AddStudent.propTypes = {
	addstudent : PropTypes.func.isRequired
}


export default AddStudent;