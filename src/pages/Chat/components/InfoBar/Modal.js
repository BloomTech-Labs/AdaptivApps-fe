import React, {useState, useEffect} from "react";
import { useQuery, useMutation } from "react-apollo";
import { GET_RECIPIENTS } from '../../queries/Chats';
import { CREATE_CHAT_ROOM} from '../../queries/ChatRooms'

//Style imports
import {
    makeStyles,
    Box,
    TextField,
    MenuItem
  } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { separateOperations } from "graphql";



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
    },
    menuItem: {
      '& hover': {
        cursor: 'pointer'
      }
    }
}));

function RecipientModal({ user, refetch, setOpen }) {
    const classes = useStyles();
    const [searchRecipient, setSearchRecipient] = useState("");

    const { data } = useQuery(GET_RECIPIENTS);
    const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);

    useEffect(() => {
      refetch();
    }, [refetch])
    
    const handleChange = e => {
      setSearchRecipient(e.target.value);
    };

    console.log(searchRecipient)
    console.log(user)

    const newChatRoom = async (item) => {
      await createChatRoom({
        variables:{
          useremail: user.email,
          recipientemail: item.email
        }
      })
      refetch();
      setOpen(false)
    }


    // useEffect(() => {
    //   const results = searchResults.filter(person =>
    //     person.toLowerCase().includes(searchRecipient)
    //   );
      
    //   setSearchResults(searchResults);
    // },[searchRecipient]);


    return (
      <div>          
              <div className={classes.paper}>
                <h2 id="transition-modal-title" className={classes.span}>Select a Recipient</h2>
                  {/* Search for Recipients functionality */}
                  <div>       
  
                   <Box component="div">
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Search for a Recipient"
                      name="message"
                      value={searchRecipient}
                      onChange={handleChange}
                      />
                            {/* {data && data?.profiles.map(item => (
                                <MenuItem 
                                value={`${item.firstName} ${item.lastName}`}
                            >{`${item.firstName} ${item.lastName}`}</MenuItem>
                                ))} */}
                        <div className={classes.root}>
                          <div height={400} width={300} itemSize={46} itemCount={200}>
                          {data && data?.profiles.map(item => (
                                <MenuItem
                                className={classes.menuItem} 
                                value={`${item.firstName} ${item.lastName}`}
                                onClick={() => newChatRoom(item)}
                            >{`${item.firstName} ${item.lastName}`}</MenuItem>
                                ))}
                          </div>
                        </div>
                </Box>
                    
                  </div>
              </div>
        </div>
    )
}

export default RecipientModal;