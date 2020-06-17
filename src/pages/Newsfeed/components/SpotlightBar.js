import React from 'react';
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


const useStyles = makeStyles(theme => ({
  root: {
    width: '45%',
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  postBody: {
    padding: '0 3% 3% 3%'
  },
  post: {
    fontSize: '2rem',
  },
  title: {
    margin: '5%',
    textAlign: 'center',
    fontSize: '3rem'
  },

}))


export default function SpotlightBar() {
  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.title}>
      Sponsor Spotlight
      </CardActionArea>
      <CardActionArea className={classes.postBody}>
      <CardMedia
        component='img'
        className={classes.post}
        alt='Sponsor Picture'
        image='https://s0.hfdstatic.com/sites/the_hartford/pubimgs/1444645466363.png' />
      <CardContent className={classes.post}>
        <p>I'm baby offal palo santo tumeric, cold-pressed you probably haven't heard of them tote bag ennui. Craft beer truffaut hammock put a bird on it artisan jean shorts messenger bag bicycle rights godard gentrify. Migas bicycle rights kale chips brooklyn. Air plant semiotics pug yr fashion axe photo booth polaroid vape. Gastropub cred flannel tofu, la croix single-origin coffee blue bottle gentrify artisan green juice edison bulb. Thundercats viral brunch jean shorts cronut fam. Tilde umami bespoke art party franzen migas, prism poke brooklyn kitsch roof party.</p>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}