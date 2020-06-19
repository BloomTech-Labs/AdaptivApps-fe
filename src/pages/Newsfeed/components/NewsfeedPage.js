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
    postBody: "Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan."
  },
  {
    postedBy: 'Username 2',
    postBody: "XOXO roof party austin pour-over lumbersexual YOLO gentrify narwhal disrupt. Bicycle rights whatever portland disrupt trust fund tousled fanny pack vaporware DIY street art wolf."
  },
  {
    postedBy: 'Username 3',
    postImg: 'https://picsum.photos/100',
    postBody: "Unicorn try-hard cloud bread, whatever narwhal chambray migas slow-carb sartorial fingerstache hella succulents fanny pack."
  },
  {
    postedBy: 'Username 4',
    postBody: "Taiyaki post-ironic disrupt fanny pack messenger bag small batch brunch copper mug stumptown mustache. PBR&B tote bag jean shorts marfa. Banh mi XOXO fam, adaptogen skateboard gentrify deep v literally marfa poke listicle bitters palo santo fashion axe."
  },
  {
    postedBy: 'Username 5',
    postImg: 'https://picsum.photos/100',
    postBody: "8-bit PBR&B lomo air plant schlitz vape raw denim flannel jean shorts occupy farm-to-table portland vegan tacos brunch. Scenester heirloom cronut PBR&B pug selfies hexagon raw denim iPhone jianbing cray."
  },
  {
    postedBy: 'Username 6',
    postImg: 'https://picsum.photos/100',
    postBody: "Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan."
  },
  {
    postedBy: 'Username 7',
    postBody: "XOXO roof party austin pour-over lumbersexual YOLO gentrify narwhal disrupt. Bicycle rights whatever portland disrupt trust fund tousled fanny pack vaporware DIY street art wolf."
  },
  {
    postedBy: 'Username 8',
    postImg: 'https://picsum.photos/100',
    postBody: "Unicorn try-hard cloud bread, whatever narwhal chambray migas slow-carb sartorial fingerstache hella succulents fanny pack."
  },
  {
    postedBy: 'Username 9',
    postBody: "Taiyaki post-ironic disrupt fanny pack messenger bag small batch brunch copper mug stumptown mustache. PBR&B tote bag jean shorts marfa. Banh mi XOXO fam, adaptogen skateboard gentrify deep v literally marfa poke listicle bitters palo santo fashion axe."
  },
  {
    postedBy: 'Username 10',
    postImg: 'https://picsum.photos/100',
    postBody: "8-bit PBR&B lomo air plant schlitz vape raw denim flannel jean shorts occupy farm-to-table portland vegan tacos brunch. Scenester heirloom cronut PBR&B pug selfies hexagon raw denim iPhone jianbing cray."
  },{
    postedBy: 'Username 11',
    postImg: 'https://picsum.photos/100',
    postBody: "Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan.Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan.Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan.Vegan meggings 90's, lo-fi adaptogen glossier salvia. Franzen mustache helvetica brooklyn meggings synth messenger bag jean shorts. Biodiesel mumblecore ugh, shabby chic pour-over 3 wolf moon aesthetic single-origin coffee kale chips unicorn chia. Jianbing you probably haven't heard of them wayfarers, hexagon cornhole artisan craft beer ethical man braid yuccie hell of retro tbh vegan."
  },
  {
    postedBy: 'Username 12',
    postBody: "XOXO roof party austin pour-over lumbersexual YOLO gentrify narwhal disrupt. Bicycle rights whatever portland disrupt trust fund tousled fanny pack vaporware DIY street art wolf."
  },
  {
    postedBy: 'Username 13',
    postImg: 'https://picsum.photos/100',
    postBody: "Unicorn try-hard cloud bread, whatever narwhal chambray migas slow-carb sartorial fingerstache hella succulents fanny pack."
  },
  {
    postedBy: 'Username 14',
    postBody: "Taiyaki post-ironic disrupt fanny pack messenger bag small batch brunch copper mug stumptown mustache. PBR&B tote bag jean shorts marfa. Banh mi XOXO fam, adaptogen skateboard gentrify deep v literally marfa poke listicle bitters palo santo fashion axe."
  },
  {
    postedBy: 'Username 15',
    postImg: 'https://picsum.photos/100',
    postBody: "8-bit PBR&B lomo air plant schlitz vape raw denim flannel jean shorts occupy farm-to-table portland vegan tacos brunch. Scenester heirloom cronut PBR&B pug selfies hexagon raw denim iPhone jianbing cray."
  }
]

const useStyles = makeStyles(theme => ({
    root: {
      width: '75%',
    },
    container: {
      display: 'flex',
      margin: '5% auto',
      justifyContent: 'space-evenly',
     
    },
    newsfeed: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      overflow: "scroll",     
    },
    spotlight: {
      width: '40%',
      
    }
}))


export default function NewsfeedPage() {
  const classes = useStyles();
    //const { user } = useAuth0();

  return ( 
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.newsfeed}>
          {posts.map(post => (
            <NewsfeedCard post={post} />
          ))}
        </div>
        <div className={classes.spotlight}>
        <SpotlightBar />
        </div>
      </div>
    </div>
    )
}