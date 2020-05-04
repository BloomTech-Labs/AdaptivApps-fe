import React, {useEffect, useState} from "react";
import { useQuery } from "react-apollo";
import { GET_RECIPIENTS } from '../../queries/Chats';


//Style imports
import {
    makeStyles,
    Button,
    Icon,
    Box,
    TextField,
    MenuItem

  } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';


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
}));

function RecipientModal(props) {
    const { user } = props;
    const classes = useStyles();
    const [searchRecipient, setSearchRecipient] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { error, data, refetch, loading } = useQuery(GET_RECIPIENTS);
    
    const handleChange = e => {
      setSearchRecipient(e.target.value);
    };


    useEffect(() => {
      const results = searchResults.filter(person =>
        person.toLowerCase().includes(searchRecipient)
      );
      
      setSearchResults(searchResults);
    },[searchRecipient]);

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
                            {data && data?.profiles.map(item => (
                                <MenuItem 
                                value={`${item.firstName} ${item.lastName}`}
                            >{`${item.firstName} ${item.lastName}`}</MenuItem>
                                ))}
        
                      {/* <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Search for a Recipient"
                      name="message"
                      value={searchRecipient}
                      onChange={handleChange}
                      selectBoxOptions="List"
                      />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>add_circle</Icon>}
                    >
                    Select
                </Button> */}
                </Box>
                    
                  </div>
              </div>
        </div>
    )
}

export default RecipientModal;