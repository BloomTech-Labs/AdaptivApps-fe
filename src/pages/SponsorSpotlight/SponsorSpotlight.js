import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ACS_Logo = require('../../assets/images/01-ACS_Logo.png');
const Hartford_Logo = require('../../assets/images/02-Hartford.png');
const Adaptiv_Logo = require('../../assets/images/03-AdaptivApps.png');
const Citi_Logo = require('../../assets/images/04-Citi.png');
const Gold_Logo = require('../..//assets/images/05-GoldMeetsGolden.png');
const GSD_SWF_Logo = require('../../assets/images/06-GSD SWF.png');
const MarVista_Logo = require('../../assets/images/07-MarVista.png');
const BOC_Logo = require('../../assets/images/08-BankofCalifornia.png');
const CapitalGroup_Logo = require('../../assets/images/09-CapitalGroup.png');
const Hanger_Foundation_Logo = require('../../assets/images/10-HangerFoundation.png');
const Microsoft_Logo = require('../../assets/images/11-Microsoft.png');
const Move_Logo = require('../../assets/images/12-MoveUnited.png');
const Shannon_Logo = require('../../assets/images/13-Shannon Fabrics.png');
const Wayfinder_Logo = require('../../assets/images/14-Wayfinder.png');
const ARC_Logo = require('../../assets/images/15-ARC.png');
const Doyle_Logo = require('../../assets/images/16-DoyleLaw.png');
const Fillauer_Logo = require('../../assets/images/17-Fillauer.png');
const IMAX_Logo = require('../../assets/images/18-IMAX.png');
const MR_Logo = require('../../assets/images/19-Michaelman&Robinson.png');
const Per_Logo = require('../../assets/images/20-Per4Max.png');
const Shamrock_Logo = require('../../assets/images/21-Shamrock Capital Advisors.png');
const Abilities_Logo = require('../../assets/images/22-AbilitiesExpo.png');
const Broadvoice_Logo = require('../../assets/images/23-Broadvoice.png');
const Dod_Logo = require('../../assets/images/24-DoD.png');
const Metz_Harrison_Logo = require('../../assets/images/25-Metz&Harrison.png');
const MyGym_Logo = require('../../assets/images/26-MyGymFoundation.png');
const Ampla_Logo = require('../../assets/images/27-Ampla.png');
const Dk3_Logo = require('../../assets/images/28-DK3.png');
const Hanger_Logo = require('../../assets/images/29-HangerCilnic.png');
const LA_Parks_Logo = require('../../assets/images/30-LA Dept of Rec&Parks.png');
const LA84_Logo = require('../../assets/images/31-LA84.png');
const Momo_Logo = require('../../assets/images/32-MoMo.png');

// [theme.breakpoints.up("lg")]: {
//   fontSize: "7.2rem",
// },
// [theme.breakpoints.down("md")]: {
//   fontSize: "5.2rem",
// },
// [theme.breakpoints.down("sm")]: {
//   fontSize: "3.2rem",
// },
// [theme.breakpoints.down("xs")]: {
//   fontSize: "3.2rem",
// },


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '95%',
    margin: 'auto',
    textAlign: 'center',
    display: 'flex-column',
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

export default function SponsorSpotlight() {
  const classes = useStyles();
  return (
    <>
      <Link href="/" className={classes.back} >
        <ArrowBackIosIcon color="primary" aria-label='Back to Account Settings' fontSize="large" />
        <Typography>Back to Settings</Typography>
      </Link>    
    <div className={classes.root}>
      <Grid container className={classes.logo}>
        <Grid item xs>
          <img className={classes.img} tabIndex='0' alt='2020 Angel City Virtual Games Logo' src={ACS_Logo} />
        </Grid>
      </Grid>

      <Grid container alignItems='center' className={classes.presented}>
        <Grid item  xs>
          <Typography className={classes.header}>Proudly presented by</Typography>
          <img className={classes.img} tabIndex='0' alt='The Hartford Logo' src={Hartford_Logo} />
        </Grid>
        <Grid item  xs>
        <Typography className={classes.header}>Hosted by</Typography>
          <img className={classes.img} tabIndex='0' alt='Adaptiv Apps Logo' src={Adaptiv_Logo} />
        </Grid>
      </Grid>
      <Typography className={classes.header}>With heartfelt thanks to our sponsors, friends and partners</Typography>

      <Typography className={classes.sponsorText}>Gold sponsors</Typography>
      <Grid container alignItems='center' justify='space-evenly' className={classes.gold}>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Citibank Logo' src={Citi_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Gold Meets Golden Logo' src={Gold_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Sidewinder Films, Global Sports Development Logo' src={GSD_SWF_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='MarVista Entertainment Logo' src={MarVista_Logo} />
        </Grid>
      </Grid>

      <Typography className={classes.sponsorText}>Silver sponsors</Typography>
      <Grid container alignItems='center' justify='space-evenly' className={classes.silver}>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Banc of California Logo' src={BOC_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Capital Group Logo' src={CapitalGroup_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Hanger Foundation Logo' src={Hanger_Foundation_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Microsoft Logo' src={Microsoft_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Move United Logo' src={Move_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Shannon Fabrics Logo' src={Shannon_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Wayfinder Family Services Logo' src={Wayfinder_Logo} />
        </Grid>
      </Grid>

      <Typography className={classes.sponsorText}>Bronze sponsors</Typography>
      <Grid container alignItems='center' justify='space-evenly' className={classes.bronze}>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Abilities Recovery Center Logo' src={ARC_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Doyle Law Logo' src={Doyle_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Fillauer Logo' src={Fillauer_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='IMAX Logo' src={IMAX_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Michelman & Robinson, LLP Logo' src={MR_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Per 4 Max Logo' src={Per_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Shamrock Logo' src={Shamrock_Logo} />
        </Grid>
      </Grid>

      <Typography className={classes.sponsorText}>Friends of Angel City Sports</Typography>
      <Grid container alignItems='center' justify='space-evenly' className={classes.friends}>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Abilities Expo Logo' src={Abilities_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Broadvoice Logo' src={Broadvoice_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='City of Los Angeles Department of Disability Logo' src={Dod_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Metz and Harrison, LLP Logo' src={Metz_Harrison_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='My Gym Foundation Logo' src={MyGym_Logo} />
        </Grid>
      </Grid>

      <Typography className={classes.sponsorText}>Angel City Sports partners</Typography>
      <Grid container alignItems='center' justify='space-evenly' className={classes.partners}>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Ampla Partners Logo' src={Ampla_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='DK3 Logo' src={Dk3_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Hanger Clinic Logo' src={Hanger_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='City of Los Angeles Department of Recreation and Parks Logo' src={LA_Parks_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='LA84 Foundation Logo' src={LA84_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} tabIndex='0' alt='Momo Production & Event Rentals Logo' src={Momo_Logo} />
        </Grid>
      </Grid>
    </div>
    </>
  )
}