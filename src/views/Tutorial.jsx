import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { withKeycloak } from '@react-keycloak/web'
import Stepper from './Stepper'

class Tutorial extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;
    this.wrapper = React.createRef();
  }

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

export default withKeycloak(Tutorial)
  
  

