import React from "react";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
    width: "90%",
    margin: "30px 0 0 30px",
    fontSize: "5rem"
  },
  linkBack: {
    color: "#202020",
    fontSize: "1.8rem",
    fontWeight: 530,
    display: "flex",
    alignItems: "center",
    marginBottom: "1.6rem",
    marginLeft: "0.3rem",
    textDecoration: "none",
  },
  title: {
    marginLeft: "40%",
    marginRight: "-40%",
    fontSize: "4rem",
  },
  list: {
    fontSize: "3rem"
  },
  divider: {
    marginTop: "3%",
    marginBottom: "3%",
  },
});
export default function PrivacyPolicy() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to={`/`} className={classes.linkBack}>
        <ArrowBackIosIcon color="primary" fontSize="large" />
        Go Back
      </Link>

      <Divider variant="inset" className={classes.divider} />

      <div>
        <h1 className={classes.title}>Privacy Notice</h1>
        <h4>
          This privacy notice discloses the privacy practices for
          AngelCitySports.org.
        </h4>
        <h6>
          This privacy notice applies solely to information collected by this
          website. It will notify you of the following:
        </h6>
        <p>
          What personally identifiable information is collected from you through
          the website, how it is used and with whom it may be shared. What choices
          are available to you regarding the use of your data. The security
          procedures in place to protect the misuse of your information.
        </p>
        <h6>
          How you can correct any inaccuracies in the information. Information
          Collection, Use, and Sharing
        </h6>
        <p>
          We are the sole owners of the information collected on this site. We
          only have access to/collect information that you voluntarily give us via
          user account creation and event registration fields. We will not sell or
          rent this information to anyone.
        </p>
        <p>
          We will use your information to respond to you, regarding the reason you
          contacted us or your reservation for an event. We will not share your
          information with any third party outside of our organization, other than
          as necessary to fulfill your request or as the event necessitates, e.g.
          supplying the correct adaptive equipment.
        </p>
        <p>
          Unless you ask us not to, we may contact you via email in the future to
          tell you about upcoming events, your event subscriptions, or changes to
          this privacy policy.
        </p>
        <h6>Your Access to and Control Over Information</h6>
        <p>
          You may opt out of any future contacts from us at any time. You can do
          the following at any time by contacting us via the email address, phone
          number, or adjusting the information on your user account as seen within
          the user portal on our website:
        </p>
        <ul className={classes.list}>
          <li>See what data we have about you, if any.</li>
          <li>Change/correct any data we have about you.</li>
          <li>Have us delete any data we have about you.</li>
          <li>Express any concern you have about our use of your data.</li>
        </ul>
        <h6>Security</h6>
        <p>
          We take precautions to protect your information. When you submit
          sensitive information via the website, your information is protected
          both online and offline.
        </p>
        <p>
          Registration In order to use this website, a user must first complete
          the registration form. During registration a user is required to give
          certain information (such as name, email address, and medical
          information regarding physical disability). This information is used to
          contact you about the events on our site in which you have registered.
          At your option, you may also provide demographic information (such as
          gender or age) about yourself, but it is not required.
        </p>
        <p>
          Sharing We share aggregated demographic information with our partners,
          sponsors, and advertisers. This is not linked to any personal
          information that can identify any individual person.
        </p>
        <p>
          From time-to-time our site requests information via surveys or contests.
          Participation in these surveys or contests is completely voluntary and
          you may choose whether or not to participate and therefore disclose this
          information. Information requested may include contact information (such
          as name and shipping address), and demographic information (such as zip
          code, age level). Contact information will be used to notify the winners
          and award prizes. Survey information will be used for purposes of
          monitoring or improving the participant satisfaction for events and
          programming.
        </p>
        <h1>Facebook Privacy Policy</h1>
        <h6>I. What kinds of information is collected?</h6>
        <p>
          Your Organisation will collect the following kinds of information when
          you, your colleagues or other users access the Service:
        </p>
        <ul className={classes.list}>
          <li>your contact information, such as full name and email address;</li>{" "}
          <li>your username and password;</li>
          <li>
            your work title, department information and other information related
            to your work or Organisation;
          </li>
          <li>
            the content, communications and other information you provide when you
            use the Service, including when you sign up for an account, create or
            share content, and message or communicate with others. This can
            include information in or about the content you provide (such as
            metadata), such as the location of a photo or the date a file was
            created;{" "}
          </li>
          <li>
            content, communications and information that other people provide when
            they use the Service. This can include information about you, such as
            when they share or comment on a photo of you, send a message to you,
            or upload, sync or import your contact information;
          </li>{" "}
          <li>all communications with other users of the Service;</li>
          <li>
            user communications, feedback, suggestions and ideas sent to your
            Organisation;
          </li>{" "}
          <li>billing information; and
          </li>{" "}
          <li>
            information that you provide when you or your Organisation contact or
            engage platform support regarding the Service.
          </li>
        </ul>{" "}
        <h6>II. How does your Organisation use this information?</h6>{" "}
        <p>
          Your Organisation will share the information that it collects with
          Facebook, as provider of the platform, in order to allow Facebook to
          provide and support the Service for your Organisation and other users
          and in accordance with any other instructions from your Organisation.
          Examples of such use include:
        </p>
        <ul className={classes.list}>
          <li>
            communicating with users and administrators regarding their use of the
            Service;
          </li>
          <li>
            enhancing the security and safety of the Service for your Organisation
            and other users, such as by investigating suspicious activity or
            violations of applicable terms or policies;
          </li>
          <li>
            personalising your and your Organisation's experiences as part of our
            provision of the Service;
          </li>
          <li>
            developing new tools, products or services within the Service for your
            Organisation;
          </li>
          <li>
            associating activity on the Service across different devices operated
            by the same individual to improve the overall operation of the
            Service;
          </li>
          <li>to identify and fix bugs that may be present; and</li>
          <li>
            conducting data and system analytics, including research to improve
            the Service.
          </li>
        </ul>{" "}
        <h6>III. Disclosure of information</h6>
        <p>
          Your Organisation discloses the information collected in the following
          ways:
        </p>
        <ul className={classes.list}>
          <li>
            to third-party service providers that assist in providing the Service
            or part of the Service;
          </li>
          <li>
            to third-party apps, websites or other services that you can connect
            to through the Service;
          </li>
          <li>
            in connection with a substantial corporate transaction, such as the
            transfer of the Service, a merger, consolidation, asset sale or in the
            unlikely event of bankruptcy or insolvency;
          </li>
          <li>to protect the safety of any person;</li>{" "}
          <li>
            to address fraud, security or technical issues; and in connection with
            a subpoena, warrant, discovery order or other request or order from a
            law enforcement agency.
          </li>{" "}
          <li>
            to address fraud, security or technical issues; and in connection with a
            subpoena, warrant, discovery order or other request or order from a law
            enforcement agency.
          </li>{" "}
        </ul>
      </div>
    </div>
  );
}
