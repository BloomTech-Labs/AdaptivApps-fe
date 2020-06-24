import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '95%',
    margin: 'auto',
    textAlign: 'center',
    display: 'flex-column',
  },
  banner: {
    backgroundColor: 'red'
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  img: {
    maxWidth: '90%',
    [theme.breakpoints.down("sm")]: {
      margin: '10% auto'
    },
    [theme.breakpoints.down("xs")]: {
      margin: '10% auto'
    },
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: '70%',
      margin: 'auto'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '70%',
      margin: 'auto'
    },
  },
  presented: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
      maxWidth: '70%',
      margin: 'auto'
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
      maxWidth: '70%',
      margin: 'auto'
    },
  },
  gold: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
      maxWidth: '60%',
      margin: 'auto'
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
      maxWidth: '60%',
      margin: 'auto'
    },
  },
  silver: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  bronze: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  friends: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  partners: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  header: {
    fontSize: '2rem',
    color: '#2962FF',
    fontWeight: 'bold',
    margin: '5% auto 3%',
    '&:nth-child(3)': {
      margin: '3% auto'
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: '1.75rem',
      margin: '3% auto'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '1.75rem',
      margin: '2% auto',
    },
  },
  sponsorText: {
    textAlign: 'left',
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#2962FF',
    marginTop: '3%',
    '&:nth-child(4)': {
      marginBottom: '1%',
    },
    '&:nth-child(6)': {
      marginBottom: '1%',
    },
    '&:nth-child(8)': {
      marginBottom: '2%',
    },
    '&:nth-child(10)': {
      marginBottom: '0',
    },
    '&:nth-child(12)': {
      marginTop: '2%',
      marginBottom: '1%',
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: '1.5rem',
      textAlign: 'center',
      marginTop: '15%'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '1.5rem',
      textAlign: 'center',
      marginTop: '15%'
    },
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    color: '#2962FF',
    margin: '2% 0 0 2%',
    fontSize: '.25rem',
    [theme.breakpoints.down("sm")]: {
      fontSize: '.25rem',
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '.25rem',
    },
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();

  return (
    <Container className={classes.banner}>
      HEY
    </Container>
  )
}