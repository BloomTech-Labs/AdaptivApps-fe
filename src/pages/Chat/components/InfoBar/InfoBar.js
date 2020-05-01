import React, {useEffect} from "react";
import { styled } from '@material-ui/core/styles';
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOMS } from '../../queries/ChatRooms';
import ChatRoom from './ChatRoom';

//Auth0 imports
import config from "../../../../config/auth_config";

// Style Imports
import CreateIcon from '@material-ui/icons/Create';
import LanguageIcon from '@material-ui/icons/Language';
import {
    Container,
    makeStyles,
    Button,
    Icon,
    Box,
    TextField

  } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: '40%'   
  },
  header: {
    fontSize: '2.5rem',
    color: 'grey',
    fontFamily: 'Arial',
  },
  icons: {
    fontSize: '4rem',
    color: 'grey',
    padding: "0%",
    cursor: "pointer",
  },
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

function InfoBar(props) {
    const { user } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [searchRecipient, setSearchRecipient] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });
    
    const handleChange = e => {
      setSearchRecipient(e.target.value);
    };

    // useEffect(() => {
    //   const results = people.filter(person =>
    //     person.toLowerCase().includes(searchRecipient)
    //   );
    //   setSearchResults(results);
    // }, [searchRecipient]);

    
    // refetches CHAT_ROOMS without refreshing page
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;
    
    const newAnnouncementClick = e => {
      e.preventDefault();
      console.log('New announcement clicked')
    }

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        {/* <div className={classes.icons}></div> */}
          <h1 className={classes.header}>Messages</h1>
          <CreateIcon className={classes.icons} onClick={handleOpen} /><span className={classes.span} onClick={handleOpen}>New Message</span>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>add_circle</Icon>}
                    >
                    Select
                </Button>
                </Box>
                    {/* <ul>
                      {searchResults.map(item => (
                        <li>{item}</li>
                      ))}
                    </ul> */}
                  </div>
              </div>
            </Fade>
           </Modal> 
          {user && user[config.roleUrl].includes("Admin") ? (
              <>
          <div>
              <LanguageIcon className={classes.icons} onClick={newAnnouncementClick}/><span className={classes.span} onClick={newAnnouncementClick}>New Announcement</span> 
            </div>
          </>
          ): null}
          <div>
          {data &&
          data?.profile.chatRooms?.map((chatRoom, id) => (
          <ChatRoom chatRoom={chatRoom} key={id} user={user}/>
          ))
          }
          </div>
          <Box component="div">
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Search Chats"
                      name="message"
                      value={searchRecipient}
                      onChange={handleChange}
                      />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>add_circle</Icon>}
                    >
                    Select
                </Button>
                </Box>
      </div>
    )
}

export default InfoBar;