// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_6 } from "../queries";
// Component imports
import FinishButton from "../../../theme/SmallFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  TextField,
  Typography,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  spacing: {
    marginTop: "1.6rem",
  },
  checkBox: {
    display: "flex",
  },
  waiverContainer: {
    border: "0.5px solid #C4C4C4",
    borderRadius: ".5rem",
    height: "20rem",
    overflowY: "auto"
  },
  waiverText: {
    margin: "1.6rem 3.2rem 1.6rem 1.6rem",

  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "2.9rem",
  },
});

export default function Step6({ updateDemo4 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_6, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      becomeAthleteMentor:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.becomeAthleteMentor,
      athleteMentorHelp:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.athleteMentorHelp,
      athleteMentorSport:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.athleteMentorSport,
      acsDiscovery:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.acsDiscovery,
      acsOrgSpecificDiscovery:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.acsOrgSpecificDiscovery,
      amplaEmail:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.amplaEmail,
      hangerClinic:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.hangerClinic,
      challengeMagazine:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.challengeMagazine,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            becomeAthleteMentor:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.becomeAthleteMentor,
          },
          {
            athleteMentorHelp:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.athleteMentorHelp,
          },
          {
            athleteMentorSport:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.athleteMentorSport,
          },
          {
            acsDiscovery:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.acsDiscovery,
          },
          {
            acsOrgSpecificDiscovery:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile
                .acsOrgSpecificDiscovery,
          },
          {
            amplaEmail:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.amplaEmail,
          },
          {
            hangerClinic:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.hangerClinic,
          },
          {
            challengeMagazine:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.challengeMagazine,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  const onSubmit = async data => {
    await updateDemo4({
      variables: {
        email: userEmail,
        becomeAthleteMentor: data.becomeAthleteMentor,
        athleteMentorHelp: data.athleteMentorHelp,
        athleteMentorSport: data.athleteMentorSport,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        amplaEmail: data.amplaEmail,
        hangerClinic: data.hangerClinic,
        challengeMagazine: data.challengeMagazine,
      },
    });
    alert("Successfully updated all required account information!");
    await navigate(`/`);
  };
  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={6} stepNumber={6} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="additionalInfo">
          Is there anything you would like the Angel City team to know in
          preparation for the 2020 Angel City Virtual Games?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="additionalInfo"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Typography>
          Please read and acknowledge this Virtual Games Waiver of Liability
        </Typography>
        <Box className={classes.waiverContainer}>
          <Typography className={classes.waiverText}>
            1. Waiver of Liability, Assumption of Risk, and Indemnity Agreement
            Waiver: In consideration of being permitted to participate in any
            way in the Angel City Sports Virtual Games presented by The Hartford
            on June 22, 2020 through August 29, 2020 hereinafter called the
            “Angel City Sports Virtual Games”, for myself, my heirs, personal
            representatives, or assigns, do hereby release, waive, discharge,
            and covenant not to sue Angel City Sports, their respective
            officers, board members, employees, agents, assigns, and successors
            in interest, including The Hartford Financial Services Group, Inc.
            and its affiliates, subsidiaries and parent companies, and all
            respective officers, directors, agents or employees, from liability
            from any and all claims including the negligence of or omissions by
            Angel City Sports, its officers, employees and agents, and/or The
            Hartford Financial Services Group, Inc., resulting in any injury,
            accidents or illnesses (including death), and property loss arising
            from, but not limited to, participation in the Angel City Sports
            Virtual Games Assumption of Risks: Participation in the Angel City
            Sports Virtual Games carries with it certain inherent risks that
            cannot be eliminated regardless of the care taken to avoid injuries.
            The specific risks vary from one activity to another, but the risks
            include, but are not limited to: (1) minor injuries such as
            scratches, bruises, and sprains; (2) major injuries such as eye
            injury or loss of sight, joint or back injuries, bone fractures,
            heart attacks, and concussions; and (3) catastrophic injuries
            including paralysis and death. I have read the previous paragraphs
            and I know, understand, and appreciate these and other risks that
            are inherent in the Angel City Sports Virtual Games. I hereby
            declare that my participation is voluntary and that I knowingly
            assume all such risks. Indemnification and Hold Harmless: I also
            agree to INDEMNIFY AND HOLD HARMLESS Angel City Sports and/or The
            Hartford Financial Services Group, Inc. from any and all claims,
            actions, suits, procedures, costs, expenses, damages and
            liabilities, including attorney’s fees, brought as a result of my
            involvement in the Angel City Sports Virtual Games and to reimburse
            them for any such expenses incurred. 2. Permission for Use of Name,
            Image and Statements I understand that in connection with Angel City
            Sports Virtual Games, there may be photography, audio, and video
            recording. By signing below, I grant absolute and irrevocable right
            and unrestricted permission to Angel City Sports and/or The Hartford
            Financial Services Group, Inc. to use my name, likeness, identity,
            voice, photographic image, videographic image and oral or recorded
            statements in any publication of the Angel City Sports Virtual Games
            to be used for research, educational, promotional, advertising,
            fundraising or other related use, including but not limited to, film
            broadcast, printed publications, webpages and web-based
            publications, news, web casts, telecasts, and social media
            associated or affiliated with Angel City Sports and/or The Hartford
            Financial Services Group, Inc.. By signing this form, I hereby waive
            and release Angel City Sports, and its officers, employees and
            agents, and/or The Hartford Financial Services Group, Inc., and each
            and all persons involved from any claim or liability relating to the
            use of my name, likeness, identity, voice, photographic image,
            videographic image and oral or recorded statements. I further waive
            all rights I may have to any claims for payments of money,
            compensation, or remuneration in any form and of any kind from Angel
            City Sports and/or The Hartford Financial Services Group, Inc.,
            relating to the use of my name, likeness, identity, voice,
            photographic image, videographic image and oral or recorded
            statements, regardless of the purpose or sponsoring of such use by
            Angel City Sports and/or The Hartford Financial Services Group,
            Inc.. I also waive any right to inspect or approve any photo, video,
            or audio recording taken or used by Angel City Sports and/or The
            Hartford Financial Services Group, Inc.. I acknowledge that Angel
            City Sports and/or The Hartford Financial Services Group, Inc., will
            rely on this permission and release in producing, broadcasting, and
            distributing materials containing my name, likeness, identity,
            voice, photographic image, videographic image or oral or recorded
            statements. Governing Law and Jurisdiction: This agreement shall be
            governed by the laws of the State of California, and any disputes
            arising out of or in connection with this Agreement shall be under
            the exclusive jurisdiction of the Courts of the State of California.
            Severability: The undersigned further expressly agrees that the
            foregoing waiver and assumption of risks agreement is intended to be
            as broad and inclusive as is permitted by the laws of the State of
            California and that if any portion thereof is held invalid, it is
            agreed that the balance shall, notwithstanding, continue in full
            legal force and effect. Acknowledgment of Understanding: I have read
            both (1) the Waiver of Liability, Assumption of Risk, and Indemnity
            Agreement; and (2) Permission for Use of my Name, Image, and
            Statements, and fully understand the terms. I understand that I am
            giving up substantial rights, including my right to sue. I
            acknowledge that I am signing the agreement freely and voluntarily,
            and intend by my signature to be a complete and unconditional
            release of all liability to the greatest extent allowed by law. I am
            an adult, 18 years or older, and I have read and understand this
            Agreement and freely and knowingly give my consent to Angel City
            Sports as described herein.
          </Typography>
        </Box>
        <Typography color="primary">
          By signing you are agreeing to all of the above statements.
        </Typography>
        <InputLabel htmlFor="waiverSignature" className={classes.spacing}>
          Please sign by typing your name below
        </InputLabel>
        <Controller
          as={<TextField />}
          name="waiverSignature"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Box className={classes.checkBox}>
          <Controller
            as={<Checkbox />}
            name="isMinor"
            type="checkbox"
            control={control}
            color="primary"
            defaultValue={false}
            value={true}
          />
          <InputLabel className={classes.spacing} htmlFor="isMinor">
            Participant is a minor (if so, please sign below)
          </InputLabel>
        </Box>
        <Typography color="primary">
          If the Participant is a Minor, the Minor Participant's Parent/Guardian
          must read this Waiver of Liability, Assumption of Risk, and Indemnity
          Agreement & PERMISSION FOR USE OF NAME, IMAGE AND STATEMENTS
        </Typography>
        <InputLabel htmlFor="guardianSignature" className={classes.spacing}>
          Parent/Guardian Signature
        </InputLabel>
        <Controller
          as={<TextField />}
          name="guardianSignature"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel className={classes.spacing} htmlFor="minorName">
          Minor participant's name
        </InputLabel>
        <Controller
          as={<TextField />}
          name="minorName"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />

        <Box className={classes.btnBox}>
          <FinishButton
            type="submit"
            label="Finish"
            onClick={handleSubmit}
            ariaLabel="Click here to complete step 6 of account update and go back to account settings."
          />
        </Box>
      </form>
    </Box>
  );
}
