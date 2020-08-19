import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import Stepper from './Stepper'

class Tutorial extends Component {

  render() {
    return (
      <div>
        <Dialog open={this.props.open} 
        onClose={this.props.handleClose} 
        aria-labelledby="form-dialog-title" 
        maxWidth='md'>
          <DialogTitle style={{textAlign:"center"}}>How To Use Timelog</DialogTitle>
          <DialogContent>
            <Stepper></Stepper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Tutorial
  
  

