import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { GET_RECIPIENTS } from '../../queries/Chats';
import { CREATE_CHAT_ROOM } from '../../queries/ChatRooms'

//Style imports
import {
    makeStyles,
    Box,
    TextField,
    ListItem,
    Paper,
    List,
    ListItemText,
  } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  span: {
    fontSize: '2rem',
    color: '#2962FF',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: '0%'
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
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '2% 1%',
    '&:hover': {
      color: '#2962FF',
      cursor: 'pointer',
      borderRadius: '5px'
    }
  },
  closeModal: {
    fontSize: "2rem",
    marginLeft: '100%',
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    }, 
    '&:focus': {
      outline: "none"
    }
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
  },
}));

function RecipientModal({ user, setOpen }) {
    const classes = useStyles();
    const [searchRecipient, setSearchRecipient] = useState("");
    const [results, setResults] = useState([]);

    const { data } = useQuery(GET_RECIPIENTS);
    const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);
  
    const searchContacts = e => {
      e.preventDefault();
      let filter = data?.profiles.map(user => {
        return [`${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`, user];
      });

      filter.filter(user => {
        if (user[0].includes(searchRecipient.toLowerCase())) {
          results.push(user[1])
          return results;
        }
      });

      setSearchRecipient('');
    };

    const newChatRoom = async (item) => {
      await createChatRoom({
        variables:{
          useremail: user.email,
          recipientemail: item.email
        }
      })
      setOpen(false);
    };

    const handleChange = e => {
      setResults([]);
      setSearchRecipient(e.target.value);
    };

    const closeModal = e => {
      e.preventDefault();
      setOpen(false);
    };

    return (
     <div>          
      <div className={classes.paper}>
        <CloseIcon className={classes.closeModal} onClick={closeModal} />
        <h2 id="transition-modal-title" className={classes.span}>Select a Chat Recipient</h2>
        <div>       
          <Box component="div">
            <TextField
              variant="outlined"
              type="text"
              placeholder="Search for a Recipient"
              name="message"
              value={searchRecipient}
              onChange={handleChange}
              InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                  <IconButton onClick={searchContacts}>
                    <SearchIcon fontSize="large" />
                  </IconButton>
                </InputAdornment>
              }} />
            <div className={classes.root}>
              <div>
              <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                {results.length > 0 ? 
                  (results.map(item => (
                    <ListItem className={classes.listItem} value={`${item.firstName} ${item.lastName}`} onClick={() => newChatRoom(item)}>
                      <ListItemText primary={`${item.firstName} ${item.lastName}`} />
                    </ListItem>
                  ))) 
                  : 
                  (data && data?.profiles.map(item => (
                    <ListItem className={classes.listItem} value={`${item.firstName} ${item.lastName}`} onClick={() => newChatRoom(item)}>
                      <ListItemText primary={`${item.firstName} ${item.lastName}`} />
                    </ListItem>
                )))}
                  </List>
                </Paper>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default RecipientModal;