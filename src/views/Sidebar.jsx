import React, { Component } from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon,  Button } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import CssBaseline from '@material-ui/core/CssBaseline';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addLogDialogOpen: false
    }

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
  }

  handleDialogOpen() {
    this.setState({addLogDialogOpen: true})
  }

  handleDialogClose() {
    this.setState({addLogDialogOpen: false})
  }

  render() {
    return (
      <div>
        <CssBaseline/>
        <Drawer
          variant="permanent"
          anchor="left"
        >
          <List>
            {/* <Button variant="outlined" color="primary" size="medium">Add a log</Button> */}
            <ListItem button key="Add a log" onClick={this.handleDialogOpen}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Add a log" />
            </ListItem>
          </List>
        </Drawer>
        <Sidebar open={this.state.addLogDialogOpen} handleClose={this.handleDialogClose}/>
      </div>
    )
  }

}

export default Sidebar