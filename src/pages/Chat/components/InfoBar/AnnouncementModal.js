import React, { useState } from "react";
import { useQuery } from "react-apollo";

//Style imports
import {
  makeStyles,
  Button,
  Box,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  span: {
    fontSize: '2rem',
    color: 'grey',
    cursor: 'pointer'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "-webkit-xxx-large",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));
  
function AnnouncementModal(props) {
  const classes = useStyles();
  const [NewAnnouncement, setNewAnnouncement] = useState([]);
  const [NewAnnouncementText, setNewAnnouncementText] = useState([]);
  
  const handleChange = e => {
    setNewAnnouncement(e.target.value);
  };

  const onSubmit = e => {
    console.log(NewAnnouncement, "New Announcement");
  };

  const handleChangeText = e => {
    setNewAnnouncementText(e.target.value);
  };

  const onSubmitText = e => {
    console.log(NewAnnouncementText, "New Announcement Text");
  };

  return (
    <div>          
      <div className={classes.paper}>
        <h2 id="transition-modal-title" className={classes.span}>Create New Announcement</h2>
        <h3>Announcement Title </h3>
          <div>       
            <Box component="div">
              <TextField
                variant="outlined"
                type="text"
                placeholder="Announcement Title..."
                name="announcementTitle"
                value={NewAnnouncement}
                onChange={handleChange} />
            </Box>
            <h3>Announcement Text</h3>
                <Box component="div">
                  <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Announcement Text..."
                    name="announcementText"
                    value={NewAnnouncementText}
                    onChange={handleChangeText} />
                </Box>
            <h3>Send to:</h3>
                <Box component="div">
                
                </Box>        
            <h3>Attach image</h3>
            <Box component="div">
              <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file" />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                      Attach
                  </Button>
                </label>
              </div>
            </Box>
            <Button variant="outlined" color="primary" >
              Send Announcement
            </Button>
        </div>
      </div>
    </div>
  )
};
  
export default AnnouncementModal;