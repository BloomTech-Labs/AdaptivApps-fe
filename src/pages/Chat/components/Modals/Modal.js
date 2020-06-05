import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { CREATE_CHAT_ROOM } from '../../queries/ChatRooms';

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
    borderRadius: '5px',
    border: '2px solid #000',
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
  search: {
    textAlign: 'center',
    fontSize: '2rem',
    lineHeight: '10px',
    fontWeight: 'bold',
    color: '#2962FF'
  },
  noSearch: {
    display: 'none'
  },
  errorState: {
    display: 'block',
    width: '95%',
    fontSize: '2.2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: '15px',
    '& p:first-child': {
      color: 'red'  ,
      marginTop: '5%'    
    },
  },
  errorClose: {
    fontSize: "1.25rem",
    color: 'black',
    fontWeight: 'bolder',
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    },
  },
  noError: {
    display: 'none'
  }
}));

function RecipientModal({ user, setOpen, participants, setNewRoom, validParticipants }) {
    const classes = useStyles();

    const [searchRecipient, setSearchRecipient] = useState("");
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState(true);
    const [errorState, setErrorState] = useState(false);
    const [disableClick, setDisableClick] = useState(false);

    const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);
  
    // Search for a recipient logic
    const searchContacts = e => {
      e.preventDefault();
      let filter = uniqueEmails.map(user => {
        setErrorState(false);
        return [`${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`, user]
      });

      filter.filter(user => {
        if (user[0].includes(searchRecipient.toLowerCase())) {
          results.push(user[1]);
        };
        setTimeout(() => {
          if (results[0] == undefined || results.length === 0) {
            console.log(results)
              setErrorState(true);
              setSearchText(false);
          };
        }, 500)
        
      });
      setSearchRecipient('')
    
    };

    // Creating a new chat room
    const newChatRoom = async (item) => {
        await (createChatRoom({
        variables:{
          useremail: user.email,
          recipientemail: item.email
        }
      }))
        setDisableClick(true);
        setTimeout(() => setDisableClick(false), 5000);

      setOpen(false);
      setNewRoom(true);
    };

    const handleChange = e => {
      setResults([]);
      setSearchRecipient(e.target.value);
    };

    const closeModal = e => {
      e.preventDefault();
      setOpen(false);
    };
    
    // List of participants not currently chatting with for modal list - prevents duplicate chat rooms
    const uniqueEmails = [];

    validParticipants.map(person => {
      let unique = participants.find(item => item.email === person.email) 
      if (unique === undefined && person.email !== user.email) {
        uniqueEmails.push(person);
      };
    });
    
    // Return search results in list
    const searchResults = results.length > 0 &&
    (results.map(item => {
      const filtered = uniqueEmails.filter(user => {
        if (user.email === item.email && 
            user.firstName !== '' && user.lastName !== '') {
          return user
        }
      })
      if (filtered[0] !== item.email) {
        return (
          <ListItem 
            className={classes.listItem} 
            value={`${item.firstName} ${item.lastName}`} 
            diabled={disableClick}
            onClick={() => newChatRoom(item)}>
            <ListItemText primary={`${item.firstName} ${item.lastName}`} />
          </ListItem>
        )
      }
    }));

    // List of recipients available to chat with
    const chatResults = !results.length && uniqueEmails.map(item => {          
      return (
        <ListItem className={classes.listItem} value={`${item.firstName} ${item.lastName}`} onClick={() => newChatRoom(item)}>
          <ListItemText primary={`${item.firstName} ${item.lastName}`} />
        </ListItem>
    )});
      
    return (
     <div>          
      <div className={classes.paper}>
        <CloseIcon className={classes.closeModal} onClick={closeModal} />
        <h2 id="transition-modal-title" className={classes.span} aria-label="Select a Chat Recipient">Select a Chat Recipient</h2>
        <div>       
          <Box component="div">
            <TextField
              onKeyPress={() => setSearchText(false)}
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
                  <div className={errorState ? classes.errorState : classes.noError}>
                    <p>We couldn't find that user</p>
                    <p>Check your current chat rooms</p>
                    </div>
                {searchResults}
                {!results.length && 
                <div className={searchText ? classes.search : classes.noSearch}>
                  <p>Search for a user above or</p> 
                  <p>choose from the list below!</p>
                  </div>}
                {chatResults}
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