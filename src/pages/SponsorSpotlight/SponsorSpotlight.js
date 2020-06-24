import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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







const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: '1px solid red',
    width: '100%'
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  img: {
    border: '1px solid red',
    maxWidth: '60%'
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SponsorSpotlight() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems='center'>
        <Grid item  xs>
          <img className={classes.img} alt='' src={ACS_Logo} />
        </Grid>
      </Grid>
      <Grid container justify="center"  alignItems='center'>
        <Grid item  xs>
          <img className={classes.img} alt='' src={Hartford_Logo} />
        </Grid>
        <Grid item  xs>
          <img className={classes.img} alt='' src={Hartford_Logo} />
        </Grid>
      </Grid>
    </div>
  )
}