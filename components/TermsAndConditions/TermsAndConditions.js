import React, { Component } from "react";
import { Text, View, ScrollView, Linking } from "react-native";
import styles from "./TermsAndConditionsStyle";

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const br = `\n`;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.textScrollView}>
          <Text style={styles.title}>Terms &amp; Conditions</Text>
          <Text style={styles.textBody}>
            Thank you for choosing to be part of the SpoIQ™ community at Robot
            Inspect AS (
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              “Company”
            </Text>
            ,{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>“we”</Text>
            ,{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>“us”</Text>
            , or{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              “our”
            </Text>
            ). These Terms and Conditions ("Terms", "Terms and Conditions")
            govern your relationship with SpoIQ mobile application (the
            "Service") operated by Robot Inspect AS. Please read these Terms and
            Conditions carefully before using our SpoIQ mobile application (the
            "Service").
          </Text>
          <Text style={styles.textBody}>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </Text>
          <Text style={styles.textBody}>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </Text>

          <Text style={styles.heading}>Intellectual Property</Text>
          <Text style={styles.textBody}>
            The Service and its original content, features and functionality are
            and will remain the exclusive property of Robot Inspect AS and its
            licensors. The Service is protected by copyright, trademark, and
            other laws of both the Norway and foreign countries. Our trademarks
            and trade dress may not be used in connection with any product or
            service without the prior written consent of Robot Inspect AS.
          </Text>

          <Text style={styles.heading}>Links To Other Web Sites</Text>
          <Text style={styles.textBody}>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by Robot Inspect AS.
          </Text>
          <Text style={styles.textBody}>
            Robot Inspect AS has no control over, and assumes no responsibility
            for, the content, privacy policies, or practices of any third party
            web sites or services. You further acknowledge and agree that Robot
            Inspect AS shall not be responsible or liable, directly or
            indirectly, for any damage or loss caused or alleged to be caused by
            or in connection with use of or reliance on any such content, goods
            or services available on or through any such web sites or services.
          </Text>
          <Text style={styles.textBody}>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </Text>

          <Text style={styles.heading}>Limitation Of Liability</Text>
          <Text style={styles.textBody}>
            In no event shall Robot Inspect AS, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from (i) your access to or use
            of or inability to access or use the Service; (ii) any conduct or
            content of any third party on the Service; (iii) any content
            obtained from the Service; and (iv) unauthorized access, use or
            alteration of your transmissions or content, whether based on
            warranty, contract, tort (including negligence) or any other legal
            theory, whether or not we have been informed of the possibility of
            such damage, and even if a remedy set forth herein is found to have
            failed of its essential purpose.
          </Text>

          <Text style={styles.heading}>Disclaimer</Text>
          <Text style={styles.textBody}>
            Your use of the Service is at your sole risk. The Service is
            provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
            provided without warranties of any kind, whether express or implied,
            including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement
            or course of performance.
          </Text>
          <Text style={styles.textBody}>
            Robot Inspect AS its subsidiaries, affiliates, and its licensors do
            not warrant that a) the Service will function uninterrupted, secure
            or available at any particular time or location; b) any errors or
            defects will be corrected; c) the Service is free of viruses or
            other harmful components; or d) the results of using the Service
            will meet your requirements.
          </Text>

          <Text style={styles.heading}>Governing Law</Text>
          <Text style={styles.textBody}>
            These Terms shall be governed and construed in accordance with the
            laws of Norway, without regard to its conflict of law provisions.
          </Text>
          <Text style={styles.textBody}>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </Text>

          <Text style={styles.heading}>Changes</Text>
          <Text style={styles.textBody}>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </Text>
          <Text style={styles.textBody}>
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </Text>
          <Text style={styles.title}>Privacy Notice</Text>
          <Text style={styles.textBody}>
            We are committed to protecting your personal information and your
            right to privacy. If you have any questions or concerns about our
            notice, or our practices with regards to your personal information,
            please contact us at
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
          </Text>
          <Text style={styles.textBody}>
            When you visit the SpoIQ mobile application, and use our services,
            you trust us with your personal information. We take your privacy
            very seriously. In this privacy notice, we seek to explain to you in
            the clearest way possible what information we collect, how we use it
            and what rights you have in relation to it. We hope you take some
            time to read through it carefully, as it is important. If there are
            any terms in this privacy notice that you do not agree with, please
            discontinue use of our Apps and our services. This privacy notice
            applies to all information collected through our mobile application,
            (
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              "Apps"
            </Text>
            ), and/or any related services, sales, marketing or events (we refer
            to them collectively in this privacy notice as the{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              "Services"
            </Text>
            ).
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textBold }}>
            Please read this privacy notice carefully as it will help you make
            informed decisions about sharing your personal information with us.{" "}
          </Text>

          <Text style={styles.heading}>TABLE OF CONTENTS </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            1. WHAT INFORMATION DO WE COLLECT?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            2. HOW DO WE USE YOUR INFORMATION?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            6. HOW LONG DO WE KEEP YOUR INFORMATION?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            7. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            8. DO WE COLLECT INFORMATION FROM MINORS?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            9. WHAT ARE YOUR PRIVACY RIGHTS?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            10. CONTROLS FOR DO-NOT-TRACK FEATURES
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            12. DO WE MAKE UPDATES TO THIS POLICY?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
            13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
          </Text>

          <Text style={styles.heading}>1. WHAT INFORMATION DO WE COLLECT?</Text>
          <Text style={{ ...styles.textBody, ...styles.textBold }}>
            Information collected through our Apps
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We may collect information regarding your geo-location, push
            notifications, when you use our apps.
          </Text>
          <Text style={styles.textBody}>
            If you use our Apps, we may also collect the following information:
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textItalic }}>
              Geo-Location Information
            </Text>
            . We may request access or permission to and track location-based
            information from your mobile device, either continuously or while
            you are using our mobile application, to provide location-based
            services. If you wish to change our access or permissions, you may
            do so in your device’s settings.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textItalic }}>
              Push Notifications
            </Text>
            . We may request to send you push notifications regarding your
            account or the mobile application. If you wish to opt-out from
            receiving these types of communications, you may turn them off in
            your device’s settings.
          </Text>

          <Text style={styles.heading}>
            2. HOW DO WE USE YOUR INFORMATION?{" "}
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We process your information for purposes based on legitimate
            business interests, the fulfillment of our contract with you,
            compliance with our legal obligations, and/or your consent
          </Text>
          <Text style={styles.textBody}>
            We use personal information collected via our Apps for a variety of
            business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations. We indicate the specific processing grounds we rely on
            next to each purpose listed below.{" "}
          </Text>
          <Text style={styles.textBody}>
            Below are some definitions that will help you understand the roles
            and responsibilities of Robot Inspect AS:{" "}
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textItalic }}>
              “data controller"{" "}
            </Text>
            means a person who (either alone or jointly or in common with other
            persons) determines the purposes for which and the manner in which
            any personal information are, or, are to be used.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textItalic }}>
              “data processor”{" "}
            </Text>
            in relation to personal information, means any person (other than an
            employee of the data controller) who processes the data on behalf of
            the data controller.
          </Text>
          <Text style={styles.textBody}>
            If you provide the data and the instructions, then you are the data
            controller and Robot Inspect AS is the data processor.{" "}
          </Text>
          <Text style={styles.textBody}>
            If we determine the purposes for which we collect and use your
            personal information, then we are the Controller.{" "}
          </Text>
          <Text style={styles.textBody}>
            We use the information we collect or receive:{" "}
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To facilitate account creation and logon process.
            </Text>{" "}
            If you choose to link your account with us to a third-party account
            (such as your Google or Facebook account), we use the information
            you allowed us to collect from those third parties to facilitate
            account creation and logon process for the performance of the
            contract. See the section below headed{" "}
            <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
              "HOW DO WE HANDLE YOUR SOCIAL LOGINS"
            </Text>
            for further information.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To send you marketing and promotional communications.
            </Text>{" "}
            We and/or our third-party marketing partners may use the personal
            information you send to us for our marketing purposes, if this is in
            accordance with your marketing preferences. You can opt-out of our
            marketing emails at any time (see the{" "}
            <Text style={{ ...styles.textBody, ...styles.textUnderlined }}>
              "WHAT ARE YOUR PRIVACY RIGHTS"
            </Text>
            below).
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To send administrative information to you.
            </Text>{" "}
            We may use your personal information to send you product, service
            and new feature information and/or information about changes to our
            terms, conditions, and policies.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Deliver targeted advertising to you.
            </Text>{" "}
            We may use your information to develop and display content and
            advertising (and work with third parties who do so) tailored to your
            interests and/or location and to measure its effectiveness.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Request Feedback.
            </Text>{" "}
            We may use your information to request feedback and to contact you
            about your use of our Apps.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To enforce our terms, conditions and policies for Business
              Purposes, Legal Reasons and Contractual.
            </Text>{" "}
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To respond to legal requests and prevent harm.
            </Text>{" "}
            If we receive a subpoena or other legal request, we may need to
            inspect the data we hold to determine how to respond.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To manage user accounts.
            </Text>{" "}
            We may use your information for the purposes of managing our account
            and keeping it in working order.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To deliver services to the user.
            </Text>{" "}
            We may use your information to provide you with the requested
            service.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              To respond to user inquiries/offer support to users.
            </Text>{" "}
            We may use your information to respond to your inquiries and solve
            any potential issues you might have with the use of our Services.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              For other Business Purposes.
            </Text>{" "}
            We may use your information for other Business Purposes, such as
            data analysis, identifying usage trends, determining the
            effectiveness of our promotional campaigns and to evaluate and
            improve our Apps, products, marketing and your experience. We may
            use and store this information in aggregated and anonymized form so
            that it is not associated with individual end users and does not
            include personal information. We will not use identifiable personal
            information without your consent.
          </Text>

          <Text style={styles.heading}>
            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations.
          </Text>
          <Text style={styles.textBody}>
            We may process or share data based on the following legal basis:
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Consent:
            </Text>{" "}
            We may process your data if you have given us specific consent to
            use your personal information in a specific purpose.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Legitimate Interests:
            </Text>{" "}
            We may process your data when it is reasonably necessary to achieve
            our legitimate business interests.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Performance of a Contract:
            </Text>{" "}
            Where we have entered into a contract with you, we may process your
            personal information to fulfill the terms of our contract.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Legal Obligations:
            </Text>{" "}
            We may disclose your information where we are legally required to do
            so in order to comply with applicable law, governmental requests, a
            judicial proceeding, court order, or legal process, such as in
            response to a court order or a subpoena (including in response to
            public authorities to meet national security or law enforcement
            requirements).
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Vital Interests:
            </Text>{" "}
            We may disclose your information where we believe it is necessary to
            investigate, prevent, or take action regarding potential violations
            of our policies, suspected fraud, situations involving potential
            threats to the safety of any person and illegal activities, or as
            evidence in litigation in which we are involved.
          </Text>
          <Text style={styles.textBody}>
            More specifically, we may need to process your data or share your
            personal information in the following situations:{" "}
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Vendors, Consultants and Other Third-Party Service Providers.
            </Text>{" "}
            We may share your data with third party vendors, service providers,
            contractors or agents who perform services for us or on our behalf
            and require access to such information to do that work. Examples
            include: payment processing, data analysis, email delivery, hosting
            services, customer service and marketing efforts. We may allow
            selected third parties to use tracking technology on the Apps, which
            will enable them to collect data about how you interact with the
            Apps over time. This information may be used to, among other things,
            analyze and track data, determine the popularity of certain content
            and better understand online activity. Unless described in this
            Policy, we do not share, sell, rent or trade any of your information
            with third parties for their promotional purposes.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Business Transfers
            </Text>{" "}
            We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets,
            financing, or acquisition of all or a portion of our business to
            another company.
          </Text>
          <Text style={styles.textBody}>
            -{" "}
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Third-Party Advertisers.
            </Text>{" "}
            We may use third-party advertising companies to serve ads when you
            visit the Apps. These companies may use information about your
            visits to our Website(s) and other websites that are contained in
            web cookies and other tracking technologies in order to provide
            advertisements about goods and services of interest to you.
          </Text>

          <Text style={styles.heading}>
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We may use cookies and other tracking technologies to collect and
            store your information.
          </Text>
          <Text style={styles.textBody}>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Policy.{" "}
          </Text>

          <Text style={styles.heading}>
            5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            If you choose to register or log in to our services using a social
            media account, we may have access to certain information about you.
          </Text>
          <Text style={styles.textBody}>
            Our Apps offer you the ability to register and login using your
            third-party social media account details (like your Facebook or
            Twitter logins). Where you choose to do this, we will receive
            certain profile information about you from your social media
            provider. The profile Information we receive may vary depending on
            the social media provider concerned, but will often include your
            name, e-mail address, friends list, profile picture as well as other
            information you choose to make public.
          </Text>
          <Text style={styles.textBody}>
            We will use the information we receive only for the purposes that
            are described in this privacy notice or that are otherwise made
            clear to you on the Apps. Please note that we do not control, and
            are not responsible for, other uses of your personal information by
            your third-party social media provider. We recommend that you review
            their privacy policy to understand how they collect, use and share
            your personal information, and how you can set your privacy
            preferences on their sites and apps.
          </Text>

          <Text style={styles.heading}>
            6. HOW LONG DO WE KEEP YOUR INFORMATION?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We keep your information for as long as necessary to fulfill the
            purposes outlined in this privacy notice unless otherwise required
            by law.
          </Text>
          <Text style={styles.textBody}>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting or other legal requirements). No purpose in this
            policy will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </Text>
          <Text style={styles.textBody}>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize it, or, if
            this is not possible (for example, because your personal information
            has been stored in backup archives), then we will securely store
            your personal information and isolate it from any further processing
            until deletion is possible.
          </Text>

          <Text style={styles.heading}>
            7. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We aim to protect your personal information through a system of
            organizational and technical security measures.
          </Text>
          <Text style={styles.textBody}>
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure. Although we will
            do our best to protect your personal information, transmission of
            personal information to and from our Apps is at your own risk. You
            should only access the services within a secure environment.
          </Text>

          <Text style={styles.heading}>
            8. DO WE COLLECT INFORMATION FROM MINORS?{" "}
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            We do not knowingly collect data from or market to children under 18
            years of age.
          </Text>
          <Text style={styles.textBody}>
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Apps, you represent that you are at least
            18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Apps. If we learn that
            personal information from users less than 18 years of age has been
            collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we have collected from children under age
            18, please contact us at{" "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
          </Text>

          <Text style={styles.heading}>9. WHAT ARE YOUR PRIVACY RIGHTS? </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            In some regions, such as the European Economic Area, you have rights
            that allow you greater access to and control over your personal
            information. You may review, change, or terminate your account at
            any time.
          </Text>
          <Text style={styles.textBody}>
            In some regions (like the European Economic Area), you have certain
            rights under applicable data protection laws. These may include the
            right (i) to request access and obtain a copy of your personal
            information, (ii) to request rectification or erasure; (iii) to
            restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information. To make such a request, please use the contact details
            provided below. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </Text>
          <Text style={styles.textBody}>
            If we are relying on your consent to process your personal
            information, you have the right to withdraw your consent at any
            time. Please note however that this will not affect the lawfulness
            of the processing before its withdrawal.
          </Text>
          <Text style={styles.textBody}>
            If you are resident in the European Economic Area and you believe we
            are unlawfully processing your personal information, you also have
            the right to complain to your local data protection supervisory
            authority. You can find their contact details here:
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL(
                  "https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                ).then(supported => {
                  if (supported) {
                    Linking.openURL(
                      "https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                    );
                  } else {
                    console.log(
                      "Don't know how to open URI: " +
                        "     https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                    );
                  }
                });
              }}
            >
              {" "}
              https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            </Text>
          </Text>
          <Text style={styles.textBody}>
            If you have questions or comments about your privacy rights, you may
            email us at{" "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
          </Text>

          <Text style={{ ...styles.textBody, ...styles.textBold }}>
            Account Information
          </Text>
          <Text style={styles.textBody}>
            If you would at any time like to review or change the information in
            your account or terminate your account, you can:{" "}
          </Text>
          <Text style={styles.textBody}>
            - Log into your account settings and update your user account.{" "}
          </Text>
          <Text style={styles.textBody}>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, some information may be retained in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our Terms of Use and/or comply with legal requirements.{" "}
          </Text>
          <Text style={styles.textBody}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Cookies and similar technologies:
            </Text>{" "}
            Most Web browsers are set to accept cookies by default. If you
            prefer, you can usually choose to set your browser to remove cookies
            and to reject cookies. If you choose to remove cookies or reject
            cookies, this could affect certain features or services of our Apps.
          </Text>
          <Text style={styles.textBody}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              Opting out of email marketing:
            </Text>{" "}
            You can unsubscribe from our marketing email list at any time by
            clicking on the unsubscribe link in the emails that we send or by
            contacting us using the details provided below. You will then be
            removed from the marketing email list – however, we will still need
            to send you service-related emails that are necessary for the
            administration and use of your account. To otherwise opt-out, you
            may send us an email to{" "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
          </Text>

          <Text style={styles.heading}>
            10. CONTROLS FOR DO-NOT-TRACK FEATURES{" "}
          </Text>
          <Text style={styles.textBody}>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (“DNT”) feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. No
            uniform technology standard for recognizing and implementing DNT
            signals has been finalized. As such, we do not currently respond to
            DNT browser signals or any other mechanism that automatically
            communicates your choice not to be tracked online. If a standard for
            online tracking is adopted that we must follow in the future, we
            will inform you about that practice in a revised version of this
            privacy notice.
          </Text>

          <Text style={styles.heading}>
            11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?{" "}
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            Yes, if you are a resident of California, you are granted specific
            rights regarding access to your personal information.
          </Text>
          <Text style={styles.textBody}>
            California Civil Code Section 1798.83, also known as the “Shine The
            Light” law, permits our users who are California residents to
            request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below.
          </Text>
          <Text style={styles.textBody}>
            If you are under 18 years of age, reside in California, and have a
            registered account with the Apps, you have the right to request
            removal of unwanted data that you publicly post on the Apps. To
            request removal of such data, please contact us using the contact
            information provided below, and include the email address associated
            with your account and a statement that you reside in California. We
            will make sure the data is not publicly displayed on the Apps, but
            please be aware that the data may not be completely or
            comprehensively removed from our systems.
          </Text>

          <Text style={styles.heading}>
            12. DO WE MAKE UPDATES TO THIS POLICY?
          </Text>
          <Text style={{ ...styles.textBody, ...styles.textItalic }}>
            <Text style={{ ...styles.textBody, ...styles.textBold }}>
              In Short:
            </Text>{" "}
            Yes, we will update this policy as necessary to stay compliant with
            relevant laws.
          </Text>
          <Text style={styles.textBody}>
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated “Revised” date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy notice, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </Text>

          <Text style={styles.heading}>
            13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?{" "}
          </Text>
          <Text style={styles.textBody}>
            If you have questions or comments about this policy, you may contact
            our Data Protection Officer (DPO), by email at{" "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
            , or by post to:
          </Text>
          <Text style={styles.textBody}>
            Robot Inspect AS. Data Processing Officer, Ekkilsøyv. 277, Averøy
            6530, Norway
          </Text>
          <Text style={styles.textBody}>
            If you are a resident in the European Economic Area, the "data
            controller" of your personal information is Robot Inspect AS. Robot
            Inspect AS has an appointed representative in the EEA. You can
            contact them directly regarding the processing of your information
            by Robot Inspect AS, by email at{" "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
            , or by post as set forth above.
          </Text>

          <Text style={{ ...styles.textBody, ...styles.textBold }}>
            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </Text>
          <Text style={styles.textBody}>
            Based on the laws of some countries, you may have the right to
            request access to the personal information we collect from you,
            change that information, or delete it in some circumstances. To
            request to review, update, or delete your personal information,
            please submit a request form by sending an email to{" "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                Linking.canOpenURL("mailto:dpo@spoiq.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:dpo@spoiq.com");
                  } else {
                    console.log(
                      "Don't know how to open URI: " + "mailto:dpo@spoiq.com"
                    );
                  }
                });
              }}
            >
              {" "}
              dpo@spoiq.com
            </Text>
            . We will respond to your request within 30 days.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default TermsAndConditions;
