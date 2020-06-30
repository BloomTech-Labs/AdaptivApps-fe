import React from "react";
import {
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    width: "90%",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    "& .MuiTab-wrapper": {
      fontSize: "1.6rem",
    },
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  body: {
    marginLeft: "3rem",
    marginBottom: "5rem",
  },
  h4: {
    fontSize: "2.5rem",
    color: "gray",
    fontWeight: "normal",
  },
  p: {
    fontSize: "1.5rem"
  }
}));

const FAQ = () => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Frequently Asked Questions
        </Typography>
      </Box>
      <div className={classes.body}>
        <div className={classes.group}>
          <h3 className={classes.h4}>Here's a question that people often ask</h3>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>Here's another question that people often ask</h3>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>Here's yet another question that people often ask</h3>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>Aaaaaaand another question that people often ask</h3>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
          <p className={classes.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae magna felis.
            Integer eget auctor nisl. Nulla porttitor mauris vel cursus sodales. Nam ut velit non erat porta consequat.
            Phasellus bibendum vitae nunc ac sodales. Aliquam erat volutpat. Proin sit amet elit egestas,
            gravida nunc vitae, lobortis tellus. Mauris at augue ullamcorper leo tristique volutpat et in velit.
          </p>
        </div>
      </div>
    </Box>
  )
}

export default FAQ;