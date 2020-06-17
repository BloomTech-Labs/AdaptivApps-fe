import React from 'react';
import NewsfeedCard from './NewsfeedCard'
import SpotlightBar from './SpotlightBar'

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

const posts = [
  {
    postedBy: 'Username 1',
    postImg: 'https://picsum.photos/100',
    postBody: "Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan. Authentic helvetica iceland gochujang. Semiotics la croix church-key umami enamel pin truffaut before they sold out yuccie typewriter sriracha banjo seitan. Shoreditch jianbing readymade, raclette food truck migas williamsburg air plant quinoa bicycle rights lumbersexual offal single-origin coffee slow-carb."
  },
  {
    postedBy: 'Username 2',
    postImg: 'https://picsum.photos/100',
    postBody: "XOXO roof party austin pour-over lumbersexual YOLO gentrify narwhal disrupt. Bicycle rights whatever portland disrupt trust fund tousled fanny pack vaporware DIY street art wolf. Poke edison bulb fam, 8-bit locavore helvetica brooklyn single-origin coffee authentic swag meh flannel. Locavore truffaut VHS swag shoreditch man braid."
  },
  {
    postedBy: 'Username 3',
    postImg: 'https://picsum.photos/100',
    postBody: "Unicorn try-hard cloud bread, whatever narwhal chambray migas slow-carb sartorial fingerstache hella succulents fanny pack. Marfa intelligentsia vape, subway tile austin meh slow-carb keytar gluten-free glossier umami locavore schlitz. Locavore organic woke cornhole DIY adaptogen brooklyn cliche. Lumbersexual kale chips blue bottle, hella organic brunch subway tile humblebrag fashion axe neutra sriracha flexitarian mlkshk raw denim cronut. Edison bulb mlkshk messenger bag typewriter fixie quinoa taiyaki polaroid truffaut hella photo booth."
  },
  {
    postedBy: 'Username 4',
    postImg: 'https://picsum.photos/100',
    postBody: "Taiyaki post-ironic disrupt fanny pack messenger bag small batch brunch copper mug stumptown mustache. PBR&B tote bag jean shorts marfa. Banh mi XOXO fam, adaptogen skateboard gentrify deep v literally marfa poke listicle bitters palo santo fashion axe. Four loko hot chicken vice artisan. Shabby chic bitters cronut copper mug pok pok salvia intelligentsia actually next level brooklyn readymade hexagon hot chicken kale chips. Shabby chic swag disrupt pour-over hella, glossier echo park blog. Mixtape celiac four dollar toast trust fund blog enamel pin bespoke hashtag chia lomo tacos."
  },
  {
    postedBy: 'Username 5',
    postImg: 'https://picsum.photos/100',
    postBody: "8-bit PBR&B lomo air plant schlitz vape raw denim flannel jean shorts occupy farm-to-table portland vegan tacos brunch. Scenester heirloom cronut PBR&B pug selfies hexagon raw denim iPhone jianbing cray. Fanny pack franzen bushwick bicycle rights twee. Leggings mlkshk cornhole, kitsch YOLO gluten-free fingerstache godard man bun fanny pack knausgaard distillery. Brooklyn normcore readymade tousled 8-bit next level stumptown health goth lo-fi cloud bread kombucha. Mlkshk raclette normcore taiyaki humblebrag put a bird on it YOLO pour-over squid celiac vice brooklyn. Put a bird on it meditation chillwave pok pok ennui iceland, cred selfies bitters tattooed."
  }
]

const useStyles = makeStyles(theme => ({
    root: {
      width: '75%',
    },
    container: {
      display: 'flex',
      margin: '5% auto',
      justifyContent: 'space-between'
    }
  
}))


export default function NewsfeedPage() {
  const classes = useStyles();
    //const { user } = useAuth0();

  return ( 
    <div className={classes.root}>
      <div className={classes.container}>
        <NewsfeedCard />
        <SpotlightBar />
      </div>
    </div>
    )
}