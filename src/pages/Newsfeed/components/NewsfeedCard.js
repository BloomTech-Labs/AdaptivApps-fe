import React from 'react';

// Style Imports
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { 
    makeStyles, 
    Box, 
    TextField,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Input,
    Divider,
    Typography
} from "@material-ui/core";

//import { useAuth0 } from "../../config/react-auth0-spa";

const useStyles = makeStyles(theme => ({
    root: {
      width: '50%',
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    postBody: {
      display: 'flex',
      padding: '0 3% 3% 3%'
    },
    post: {
      width: '50%',
      fontSize: '2rem'
    },
    postHeader: {
      margin: '3%',
      fontSize: '1rem'
    },
    icon: {
      marginRight: '5%'
    },
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    comment: {
      width: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '3% auto',
    },
    input: {
      width: '85%',
      color: 'red',
      marginBottom: '3%',
      backgroundColor: 'rgba(211, 211, 211, 0.296)',
      borderRadius: '5px',
      
    },
    button: {
      fontSize: '2rem'
    }
}))

export default function Newsfeed() {
  const classes = useStyles();
    //const { user } = useAuth0();

  return ( 
    <Card className={classes.root}>
      <CardActionArea className={classes.postHeader}>
        <Typography gutterBottom >
        <AccountCircleIcon fontSize={'large'} />
        Username</Typography>
      </CardActionArea>
      <CardActionArea className={classes.postBody}>
        <CardMedia
          component='img'
          className={classes.post}
          alt='description of post image'
          image='https://picsum.photos/100' />
          <CardContent className={classes.post}>
            <p>Flannel palo santo fashion axe vape migas, fixie narwhal. Irony seitan street art art party keytar. Photo booth fashion axe bitters, gochujang pork belly shabby chic tote bag portland sartorial chicharrones tumblr salvia. Pinterest shaman schlitz coloring book flexitarian selvage leggings normcore scenester kale chips four dollar toast offal. Ennui four dollar toast thundercats taiyaki listicle selvage air plant +1 forage pork belly meh chicharrones paleo seitan fixie. Hot chicken distillery kombucha, viral unicorn locavore hashtag. Stumptown cornhole XOXO, tacos schlitz quinoa church-key la croix helvetica fanny pack mumblecore godard.</p>
          </CardContent>
      </CardActionArea>
      
      <Divider variant='middle'/>
        <CardActions className={classes.cardActions}>
          <Button color="primary" className={classes.button}>
            <ThumbUpAltIcon fontSize={'large'} className={classes.icon} />
            Like
          </Button>
          <Button color="primary" className={classes.button}>
            <ModeCommentIcon fontSize={'large'} className={classes.icon} />
            Comment
          </Button>
        </CardActions>
        <Divider variant='middle'/>
        <CardActionArea className={classes.comment}>
          <AccountCircleIcon fontSize={'large'} className={classes.icon} />
          <TextField
            variant="outlined"
            className={classes.input}
            defaultValue='    Write a comment...' />
          </CardActionArea>
    </Card>
    )
}