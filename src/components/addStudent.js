import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class addStudent extends Component {
	constructor(props) {
      super(props);
      this.state = {open: false, course:{ } };
    };

    handleClickOpen = () => {
      this.setState( {open:true} );
    };

    handleClose = () => {
      this.setState( {open:false} );
    };

    handleChange = (event) => {
      this.setState({course:{course_id: event.target.value}});
    }

  // Save course and close modal form
    handleAdd = () => {
       this.props.addCourse(this.state.course);
       this.handleClose();
    }

    render()  { 
      return (
	  
          <div>
                  <Button component={Link} to={{pathname:'/'}}> Add a student </Button>
          </div>
      ); 
    }
}


export default addStudent;