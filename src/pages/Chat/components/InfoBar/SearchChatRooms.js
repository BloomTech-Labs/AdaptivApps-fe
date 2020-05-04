import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { SEARCH_CHAT_ROOMS } from '../../queries/ChatRooms';

// Style Imports
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  makeStyles,
  Box,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  box: {
    position: 'absolute',
    bottom: '3%'
  },
  searchBox: {
    width: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

function SearchChatRooms({ user }) {
    const classes = useStyles();
    const [searchRecipient, setSearchRecipient] = useState("");
    const [searchQuery] = useQuery(SEARCH_CHAT_ROOMS);

    const handleChange = e => {
      setSearchRecipient(e.target.value);
    }

    const searchRooms = async () => {
      console.log('Search for ', searchRecipient)
      await searchQuery({
        variables: searchRecipient
      })
    };

    return (
      <div> 
        <Box component="div" className={classes.box}>
          <TextField
            className={classes.searchBox}
            variant="outlined"
            type="text"
            name="message"
            placeholder="Search Messages..."
            value={searchRecipient}
            onChange={handleChange}
            InputProps={{
              endAdornment: 
              <InputAdornment position="end">
                <IconButton onClick={searchRooms}>
                  <SearchIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            }} />
        </Box>
      </div>
    )
}
export default SearchChatRooms;