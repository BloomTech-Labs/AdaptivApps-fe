// React/Reach Router imports
import React from 'react'
// Material-UI imports
import { makeStyles, Typography, Container, Box } from '@material-ui/core'

const useStyles = makeStyles({
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
})

export default function AccountInfo() {
  const classes = useStyles();

  return (
    <Container>
      <Box  className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1">Update Account Information</Typography>
      </Box>
    </Container>
  )
}
