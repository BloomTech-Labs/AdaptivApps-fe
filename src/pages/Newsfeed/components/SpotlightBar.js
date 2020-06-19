import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

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
    margin: '3%',
    display: "flex",
    flexDirection: "column",
    border: '6px double lightgrey',
    position: 'fixed',
    width: '20%'
  },
  postBody: {
    padding: '0 3% 3% 3%'
  },
  postTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '5%'
  },
  body: {
    fontSize: '2.5rem',
  },
  img: {
    maxWidth: '60%',
    margin: 'auto'
  },
  title: {
    margin: '2%',
    textAlign: 'center',
    fontSize: '2.5rem'
  },

}))

const spotlight = {
  img: 'https://s0.hfdstatic.com/sites/the_hartford/pubimgs/1444645466363.png',
  body: "I'm baby offal palo santo tumeric, cold-pressed you probably haven't heard of them tote bag ennui. Craft beer truffaut hammock put a bird on it artisan jean shorts messenger bag bicycle rights godard gentrify. Migas bicycle rights kale chips brooklyn. Air plant semiotics pug yr fashion axe photo booth polaroid vape. Gastropub cred flannel tofu, la croix single-origin coffee blue bottle gentrify artisan green juice edison bulb. Thundercats viral brunch jean shorts cronut fam. Tilde umami bespoke art party franzen migas, prism poke brooklyn kitsch roof party.",
  title: 'The Hartford'
};


export default function SpotlightBar() {
  const classes = useStyles();
  const [toggleEdit, setToggleEdit] = useState(false);

  return (
    <Card className={classes.root}>
      {!toggleEdit ? (
        <>
          <CardActionArea className={classes.title}>
            Sponsor Spotlight
      </CardActionArea>
          <CardActionArea className={classes.postBody}>
            <CardMedia
              component='img'
              className={classes.img}
              alt='Sponsor Picture'
              image={spotlight.img} />
            <CardContent className={classes.postTitle}>
              {spotlight.title}
              <EditIcon onClick={() => setToggleEdit(true)} />
            </CardContent>
            <CardContent className={classes.body}>
              <p>{spotlight.body}</p>
            </CardContent>
          </CardActionArea>
        </>
      ) : (
          <>
            <CardActionArea className={classes.title}>
              Sponsor Spotlight
            </CardActionArea>
            <CardActionArea className={classes.postBody}>
              <CardMedia
                component='img'
                className={classes.img}
                alt='Sponsor Picture'
                image={spotlight.img} />
              <TextField
                variant='outlined'
                type='text'
                className={classes.postTitle}
                value={spotlight.title} />
              <TextField
                variant='outlined'
                type='text'
                className={classes.body}
                value={spotlight.body} />
              <div onClick={() => setToggleEdit(false)}>
                <CloseIcon />
          Cancel
          </div>

            </CardActionArea>
          </>
        )}
    </Card>

  )
}


//   return (
    // <Card className={classes.root}>
    //   {!toggleEdit ? (
    //     <>
    //   <CardActionArea className={classes.title}>
    //     Sponsor Spotlight
    //     <EditIcon onClick={() => setToggleEdit(true)}/>
    //   </CardActionArea>
    //   <CardActionArea className={classes.postBody}>
    //   <CardMedia
    //     component='img'
    //     className={classes.img}
    //     alt='Sponsor Picture'
    //     image={spotlight.img} />
    //     <CardContent className={classes.postTitle}>
    //       {spotlight.title}
    //     </CardContent>
    //   <CardContent className={classes.body}>
    //     <p>{spotlight.body}</p>
    //   </CardContent>
    //   </CardActionArea>
//         </>
//       ) : (
//         <>
//       <CardActionArea className={classes.postBody}>
//         <CardMedia
//           component='img'
//           className={classes.img}
//           alt='Sponsor Picture'
//           image={spotlight.img} />


//           <CloseIcon onClick={() => setToggleEdit(false)}/>
//       </CardActionArea>
//     </>
//       )}
//   </Card>
//   )
// }