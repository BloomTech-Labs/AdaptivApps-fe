import React from "react";

import {
  makeStyles,
  Container,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  main: {
    width: "90%",
    margin: "0 auto",
    "& h3": {
      fontSize: "1.8rem",
      width: "16rem",
      margin: "0 auto",
      textAlign: "center",
    },
    "& h4": {
      fontSize: "1.6rem",
    },
    "& p": {
      fontSize: "1.4rem",
    },
    "& ol, ul, li": {
      fontSize: "1.4rem",
    },
  },
}));

export default function TermsOfService() {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <h3>Terms of Service Angel City Sports Effective Date June 30, 2020</h3>{" "}
      <h4>1. ACKNOWLEDGEMENT AND ACCEPTANCE OF TERMS</h4>{" "}
      <p>
        The following terms and conditions govern all use of the Angel City
        Sports Web app (“Web App”). In addition, when using particular services
        on the Web App, you shall be subject to any posted guidelines or rules
        applicable to such services that may contain terms and conditions in
        addition to those in this Terms of Service. By using the Web App, you
        agree to the Terms of Service. If you do not agree, do not use the Web
        App.
      </p>{" "}
      <p>
        We reserve the right to change the Terms of Service from time to time
        without notice to you. You acknowledge and agree that it is your
        responsibility to review the Web App and the Terms of Use periodically
        to learn of any of the modifications. Your continued use of the Web App
        after the posting of any modification shall constitute your agreement to
        be bound by such modified Terms of Service.
      </p>{" "}
      <h4>2. AGE REQUIREMENT</h4>{" "}
      <p>
        All users under the age of 18 require parental consent to sign up for
        the Web App. If you are under the age of 18, you should review the Terms
        of Service with your parent or guardian to make sure that you and your
        parent or guardian understand the Terms of Use.
      </p>{" "}
      <h4>3. CONTENT</h4>{" "}
      <p>
        All text, graphics, user and visual interfaces, photographs, trademarks,
        logos, sounds, music, artwork, applications, computer code and
        associated documentation (collectively, the “Content”) including but not
        limited to the design, structure, arrangement and “look and feel” of
        such Content, is owned by or licensed to us and is protected by
        copyright, trademark and other intellectual property rights and laws.
      </p>{" "}
      <p>
        Except as expressly provided in the Terms of Service, no part of the Web
        App and no Content may be copied, reproduced, sold, republished,
        transmitted, displayed, reposted or otherwise distributed for public or
        commercial purposes.
      </p>{" "}
      <h4>4. USER RESTRICTIONS</h4>{" "}
      <p>
        You agree, and agree on behalf of your child or to whom you are a
        guardian, to use our Web App only for the purposes that are permitted by
        this TERMS OF SERVICE. By using and accessing our Web App, you
        acknowledge and agree, and agree on behalf of your child or to whom you
        are a guardian, that you and they/ them must NOT:
      </p>{" "}
      <ul>
        <li>
          Use our Web App for any illegal or unauthorized purpose, including
          using our Web App in a manner that intentionally or unintentionally
          violates any applicable local, state, national or international law,
          or for any purpose that infringes any patent, trademark, trade secret,
          copyright, right of publicity or other proprietary right of any party;
        </li>{" "}
        <li>
          Use our Web App for any purpose that may be deemed by us to be
          threatening, abusive, harassing, defamatory, libelous, deceptive,
          fraudulent, invasive of another’s privacy (including stalking),
          tortious, explicit or graphic descriptions or accounts of sexual acts
          (including sexual language of a violent or threatening nature directed
          at another individual or group of individuals) or otherwise in
          violation of this Terms of Service;
        </li>{" "}
        <li>
          Use our Web App for any purpose that victimizes, harasses, degrades or
          intimidates an individual or group of individuals on the basis of
          religion, gender, sexual orientation, race, ethnicity, age or
          disability, or use our Web App to harm or exploit minors in any way;
        </li>{" "}
        <li>
          Engage in any activity or use any device, software, or routine that
          interferes with or disrupts our Web App (or the servers and networks
          which are connected to our Web App), or a user’s access to our Web
          App, or our Web App’s operations, including transmitting any worms,
          viruses, spyware, malware, or any other code of a destructive or
          disruptive nature, or by injecting content or code or otherwise alter
          or interfere with the way any part of our Web App is rendered or
          displayed in a user’s browser or device;
        </li>{" "}
        <li>
          Use any automatic or manual device or process to harvest or compile
          information for any reason;
        </li>{" "}
        <li>
          Attempt to decipher, decompile, disassemble, or reverse engineer any
          of the software comprising or in any way making up part of our Web
          App; Utilize any portion of the Web App to gain unauthorized access to
          any other systems or programs;
        </li>{" "}
        <li>
          Impersonate any person or entity, including any employee or
          representative of us or otherwise misrepresent your affiliation with a
          person or entity;
        </li>{" "}
        <li>
          Take any action to circumvent, compromise or defeat any security
          measures implemented on our Web App, including to gain unauthorized
          access to any portion of our Web App, other users’ accounts, names,
          passwords, personally identifiable information or other computers,
          websites or pages, connected or linked to our Web App.
        </li>{" "}
        <li>
          Modify, copy, sell, resell, rent, lease, loan, sublicense,
          redistribute, or create any derivative work of, any portion of our Web
          App, including any services included on our Web App;
        </li>{" "}
        <li>
          Collect or store personal data about other users without permission;
          and
        </li>{" "}
        <li>
          Use our Web App for any purpose that constitutes unauthorized or
          unsolicited advertising, junk or bulk e-mail, chain letters, any other
          form of unauthorized solicitation or any form of lottery or gambling.
        </li>{" "}
      </ul>
      <p>
        Your, your child’s or the person to whom you are guardian’s access to
        our Web App may be revoked by us at any time with or without cause. We
        may also terminate or suspend your, your child’s or the person to whom
        you are a guardian’s access to all are part of our Web App, without
        notice, for any conduct that we, in our sole discretion, believe is
        disruptive to our Web App (or other users) or is in violation of any
        applicable law or this Terms of Service.
      </p>{" "}
      <h4>5. REPORTING ABUSE</h4>{" "}
      <p>
        If you or any other user suspects or knows of any abuse, harassment, or
        inappropriate conduct by or towards you or any of. The other users of
        the Web App, you should immediately notify us at the below address and
        reasonably cooperate with us to address such conduct. As stated above,
        we may terminate or suspend your or any other user’s access to our Web
        App, without notice, for any conduct that we, in our sole discretion,
        believe is disruptive to our Web App or other users in violation of any
        applicable law or this Terms of Service. Please report any abuse to us
        via email at abuse@angelcitysports.org.
      </p>{" "}
      <h4>6. PRIVACY AND CHILD’S PRIVACY</h4>{" "}
      <p>
        Your and your child’s or person to whom you are a guardian’s privacy is
        important to us. We designed our general Privacy Policy, located at
        __________________ to make important disclosure about how we collect and
        use you, your child’s and person to whom you have guardianship’s
        Personal Information. We encourage you to read our Privacy Policy and to
        use these policies to help you make informed decisions.
      </p>{" "}
      <h4>7. THIRD PARTY WEBSITES</h4>
      <p>
        Our Web App may contain links to, or be accessed through links on,
        websites managed and operated by or on behalf of independent third-party
        entities, who are not part of Angel City Sports nor agents of us. We do
        not have control over such third-party websites or the content of such
        websites. As a result, we do not have responsibility for the
        information, misinformation, errors, availability, operation or
        performance of any such third-party websites. Reference to any product,
        recording event, process, publication, service, or offering of any third
        party by name, trade name, trademark, service mark, company name or
        otherwise does not constitute or imply the endorsement or recommendation
        of such by us. Any views expressed by third parties on the Web App are
        solely the views of such third party and we assume not responsibility
        for the accuracy or veracity of any statement made by such third party.
        It is up to you to take precautions to ensure that whatever you or your
        child or the person to whom you are a guardian selects for you use or
        download is free of such items as viruses, worms, Trojan horses, and
        other items of a destructive nature. If you or your child or person to
        whom you are a guardian decide to access any of the third-party websites
        linked to the Web App, you or they do so entirely at your/ their own
        risk. You agree, and agree on behalf of your child or person to whom you
        are a guardian, that we will not be responsible or liable, directly or
        indirectly, for any damage or loss caused or alleged to be caused in
        connection with your/ their use of or you/ their reliance on any of
        these third party’s presentations, content, goods, or services made
        available through the third-party site or resource.
      </p>{" "}
      <h4>8. DISCLAIMERS</h4>
      <p>
        Our Web App may be unavailable from time to time due to mechanical,
        telecommunication, software, and third-party vendor failures. Angel City
        Sports cannot predict or control when such downtime may occur and cannot
        control the duration of such downtime. Reasonable efforts are taken to
        ensure the accuracy and integrity of information and related materials
        provided by Angel City Sports on our Web App, but Angel City Sports is
        not responsible for misprints, out of date information, technical or
        pricing inaccuracies, typographical or other errors. Information and
        released materials are subject to change without notice. As a result,
        Angel City Sports cannot and does not have any liability for such
        failures or errors. We make no representation that Content included
        within our Web App, including any User Content, are appropriate or are
        available for use outside the United States, and access to them from
        territories where their contents are illegal is prohibited.
      </p>{" "}
      <p>
        OUR WEB APP, THE CONTENT, AND ALL INFORMATION, SERVICES AND RELATED
        MATERIALS CONTAINED ON THE MOBILE APP ARE ALL PROVIDED “AS IS”, “AS
        AVAILABLE” AND “WITH ALL FAULTS.” ADAPTIV APPS AND ITS AFFILIATES MAKE
        NO REPRESENTATION OR WARRANTY WHATSOEVER REGARDING THE COMPLETENESS,
        ACCURACY, CURRENCY, OR ADEQUACY OF, OR THE SUITABILITY, FUNCTIONALITY,
        AVAILABILITY, OR OPERATION OF OUR WEB APP OR THE INFORMATION OR
        MATERIALS IT CONTAINS. THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE
        LAW, ADAPTIVAPPS AND ITS RESPECTIVE AFFILIATES SPECIFICALLY DISCLAIM ALL
        WARRANTIES, EXPRESS OR IMPLIED WITH RESPECT TO OUR MOBILE APP, THE
        CONTENT AND THE INFORMATION AND MATERIALS CONTAINED ON OUR WEB APP,
        INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, TITLE, OR NON-INFRINGEMENT, THAT OUR SITE WILL BE UNINTERRUPTED
        OR ERROR-FREE, THAT DEFECTS IN OUR WEB APP WILL BE CORRECTED, THAT THIS
        WEB APP OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR
        OTHER HARMFUL COMPONENTS, AND NAYH WARRANTIES ARISING FROM A COURSE OF
        DEALING OR USAGE IN TRADE. ADAPTIVAPPS AND ITS AFFILIATES TO NOT MAKE
        ANY WARRANT OR REPRESENTATION REGARDING (1) THE RESULTS THAT MAY BE
        OBTAINED FROM USE OF OUR WEB APP OR THE CONTENT, INFORMATION, SERVICES
        AND RELATED MATERIALS CONTAINED ON THE WEB APP, (2) ANY CONTENT OBTAINED
        FROM OUR WEB APP OR THE CONTENT, INFORMATION, SERVICES AND RELATED
        MATERIALS CONTAINED ON THE MOBILE APP, OR (III) THE ACCURACY OR
        RELIABILITY OF ANY CONTENT OBTAINED FROM OUR WEB APP OR THE CONTENT,
        INFORMATION, SERVICES AND RELATED MATERIALS CONTAINED ON THE WEB APP. IN
        ADDITION, USE OF THE INTERNET IS INHERENTLY UNRELIABLE AND UNSECURE. THE
        INTERNET IS SUBJECT TO OUTAGES, COMMUNICATION AND DATA FLOW FAILURES,
        INTERRUPTIONS AND DELAYS INHERING IN THE INTERNET COMMUNICATIONS. YOU
        RECOGNIZE THAT PROBLEMS WITH THE INTERNET, INCLUDING EQUIPMENT, SOFTWARE
        AND NETWORK FAILURES, IMPAIRMENT OR CONGESTION OR THE CONFIGURATION OF
        YOUR COMPUTER SYSTEMS MAY PREVENT, INTERRUPT OR DELAY YOUR ACCESS TO OUR
        WEB APP. ADAPTIV APPS IS NOT LIABLE FOR ANY DELAYS, INTERRUPTIONS,
        SUSPENSIONS OR UNABILIABILITY OF OUR WEB APP, OR ANY PORTION OR OUR WEB
        APP, ATTRIBUTABLE TO PROBLEMS WITH THE INTERNET OR CONFIGURATION OF
        YOUR, YOUR CHILD’S OR THE PERSON’S TO WHOM YOU ARE A GUARDIAN COMPUTER
        SYSTEMS. THERE IS NO WARRANTY AS TO OUR WEB APP OR ANY PRODUCT, SERVICE
        OR MATERIAL AVAILABLE THROUGH THE WEB APP. IF FOR ANY REASON YOU ARE NOT
        SATISFIED WITH THE WEB APP OR ITS CONTENT, YOUR SOLE REMEDY IS TO CEASE
        USING THE WEB APP OR SUCH CONTENT, EVEN IF SUCH REMEDY SHOULD FAIL OF
        ITS ESSENTIAL PURPOSE. APPLICABLE LAW MAY NOT ALLOW THE EXCLUSION OF
        IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
      </p>
      <h4>9. LIMITATION OF LIABILITY</h4>
      <p>
        TO THE EXTENT ALLOWED BY LAW, IN NO EVENT WILL ANGEL CITY SPORTS OR ANY
        OF OUR OR THEIR RESPECTIVE VENDORS, AFFILIATES, OFFICERS, MEMBERS,
        REPRESENTATIVES, SUPPLIERS, DIRECTORS, EMPLOYEES, CONSULTANTS, OWNERS,
        OR AGENTS BE LIABILITY FOR DAMAGES OF ANY KIN, INCLUDING WITHOUT
        LIMITATION ANY DAMAGES FOR LOSS OF US, DATA, INFORMATION, PROFITS,
        BUSINESS, REVENUE, EXPECTED SAVINGS OR BUSINESS INTERRUPTION, OR ANY
        DIRECT, SPECIAL, INDIRECT, INCIDENTAL, EXEMPLARY, PUNITIVE OR
        CONSEQUENTIAL DAMAGES ARISING FROM OR OTHERWISE RELATED TO (1) OUR
        MOBILE APP, (2) THE USE OR PERFORMANCE OF OUR WEB APP OR ANY LINED
        WEBSITE OR ANY CONTENT OR OTHER MATERIAL OR INFORMATION OBTAINED THROUGH
        OR WEB APP, OR (3) OTHERWISE ARISING OUT OF THE USE OR INABILITY TO USE
        OUR WEB APP OR THE CONTENT, INFORMATION, SERVICES AND RELATED MATERIALS
        CONTAINED ON THE WEB APP, WHETHER SUCH DAMAGES ARE BASED IN TORT,
        CONTRACT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF ADAPTIV
        APPS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR SUCH DAMAGES
        WERE OTHERWISE FORESEEABLE. YOUR SOLE AND EXCLUSIVE REMEDY IN THE EVENT
        OF SUCH DAMAGES WERE OTHERWISE FORESEEABLE. YOUR SOLE AND EXCLUSIVE
        REMEDY IN THE EVENT OF SUCH DAMAGE IS TO DISCONTINUE YOUR ACCESS TO AND
        USE OF OUR WEB APP. NOTWITHSTANDING THE FOREGOING, IN ANY EVENT, THE
        AGGREGATE LIABILITY OF ADAPTIVAPPS AND OUR AFFILIATES AND VENDORS FOR
        ANY REASON SHALL NOT EXCEED $100.00 US DOLLARS, EVEN IF SUCH REMEDY
        SHOULD FAIL IT’S ESSENTIAL PURPOSE.
      </p>
      <h4>10. DISPUTE RESOLUTION</h4>{" "}
      <p>
        This TERMS OF SERVICE (including without limitation the validity,
        construction and performance of duties related to the TERMS OF SERVICE)
        are governed by and construed in accordance with the laws of the United
        States of America and the laws of the State of Texas without giving
        effect to any principles of conflicts of laws. You shall first contact
        us at dispute@adaptivapps.org regarding any claim or controversy arising
        out of or relating to TERMS OF SERVICE, or any breach thereof, or the
        use of our Web App, except such claims or controversies for which
        injunctive relief is available. Any claim or controversy that cannot be
        resolved by the parties after the exercise of good faith discussions
        within thirty (30) days shall be finally settled by arbitration
        administered by the American Arbitration Association in accordance with
        its Commercial Arbitration Rules including the Supplementary Procedures
        for Consumer-related Disputes (collectively, “AAA Rules”), and judgment
        on the award rendered by the arbitrator(s) may be entered in any court
        having jurisdiction thereof. The AAA Rules are available online at
        adr.org. You agree that, by accepting this TERMS OF SERVICE, you, your
        child and/ or the person for whom you are guardian are waiving the right
        to a trial by jury or to participate in a class action. This TERMS OF
        SERVICE evidences a transaction in interstate commerce, and thus the
        Federal Arbitration Act governs the interpretation and enforcement of
        this provision. Unless you and Angel City Sports agree otherwise, any
        arbitration hearing will take place in the state of Texas. In the event
        that binding arbitration is not enforceable, you consent to the
        exclusive jurisdiction of any federal or state court located in Dallas
        County, Texas for the resolution of any disputes.
      </p>{" "}
      <p>
        Any cause of action you may have with respect to your use of our Web App
        must be commenced within six (6) months after the claim or cause of
        action arises.
      </p>{" "}
      <h4>11. COPYRIGHT AND COPYRIGHT NOTICES</h4>{" "}
      <p>
        We respect the intellectual property of others, and we ask our users to
        do the same. We will promptly review and remove Content, including User
        Content, from our Web App if properly notified that the materials
        infringe a third party’s copyright.
      </p>{" "}
      <h4>12. WEB APP LOCATED IN THE UNITED STATES</h4>{" "}
      <p>
        This TERMS OF SERVICE are governed by the laws of the United States of
        America. If you are using our Web App from outside the United States,
        please be aware that your information may be transferred to, stored and
        processed in the United States. By using the Web App in any way, you
        hereby consent, on behalf of yourself, your child or the person to whom
        you are guardian, to the transfer of data and information to, and the
        storage and processing of such data and information in the United States
        of America.
      </p>{" "}
      <h4>13. MODIFICATION TO THIS TERMS OF SERVICE</h4>{" "}
      <p>
        We reserve the right to modify this TERMS OF SERVICE at any time,
        effective upon posting, You can tell when changes have been made to this
        TERMS OF SERVICE by referring to the “Effective Date” Legend on top of
        this page. We reserve to make changes to this TERMS OF SERVICE at any
        time and without advanced notice. We encourage you to check this TERMS
        OF SERVICE regularly. Your continued use of the Web App indicates your
        agreement and acceptance of the updated version of this TERMS OF
        SERVICE.
      </p>{" "}
      <h4>14. MISCELLANEOUS</h4>{" "}
      <ol>
        <li>
          Entire Agreement. This TERMS OF SERVICE constitute the entire
          agreement between you, your child, or the person to whom you are a
          guardian with us with respect to the subject matter hereof, and,
          supersedes all prior and contemporaneous agreements and understandings
          whether written or oral, concerning the subject matter hereof.
        </li>
        <li>
          Severability. If any portion of this TERMS OF SERVICE is held invalid
          or unenforceable under applicable law, that portion shall be construed
          in a manner consistent with applicable law to accomplish, as nearly as
          possible, the objective thereof, or severed from the document if and
          solely to the limited extent such construction is not possible, and
          the remaining portion of this TERMS OF SERVICE and Privacy Policy
          shall remain in full force and effect.
        </li>{" "}
        <li>
          Relationship of the Parties. No joint venture, partnership, employment
          or agency relationship exists between you, your child or the person to
          whom you are a guardian, and us as a result of this TERMS OF SERVICE
          or your or their use of our Web App or the content.
        </li>{" "}
        <li>
          No Waiver. Our failure to enforce any provision of this TERMS OF
          SERVICE will not be deemed a waiver of that or any other provision of
          this TERMS OF SERVICE.
        </li>{" "}
        <li>
          Construction. The section titles in this TERMS OF SERVICE are solely
          used for the convenience of the parties and have no legal or
          contractual significant. The words “include”, “including” and all
          other forms “include” are deemed to followed by “without limitation.”
        </li>
      </ol>{" "}
      <h4>15. CONTACT US</h4>{" "}
      <p>
        If you or your child or the person to whom you are a guardian have any
        questions about this TERMS OF SERVICE, you should please contact us
        below:
      </p>{" "}
      <p>e-mail camille@angelcitysports.org</p>
    </main>
  );
}
