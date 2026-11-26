/*
  Site settings for vitalcareofwestchester.com

  Fill in a value and save, and the matching part of the site appears.
  Leave a value as "" and that part stays hidden, so nothing wrong or
  half-finished ever shows on the live site.
*/
window.VC_SITE = {

  // 24/7 on-call line for patients (pharmacist or nurse), e.g. "(513) 555-0100".
  // Shows on the home page contact section and in the patient FAQ.
  afterHoursPhone: "",

  // Account executive card on the Providers page. The card shows once a phone or email is filled in.
  repName: "Elizabeth Burt",
  repTitle: "Account Executive",
  repPhone: "",          // e.g. "(513) 555-0101"
  repEmail: "",          // e.g. "eburt@example.com". Offices should not email patient details.

  // Billing. Leave billingPhone blank to send billing questions to the main number.
  billingPhone: "",
  payOnlineUrl: "",      // a pay-your-bill link, if you have one

  // Your Google Business Profile link (the "Share" link from Google Maps).
  googleProfileUrl: "",

  // Only set this to true if the pharmacy is licensed to serve Kentucky patients.
  serveNorthernKentucky: false,

  // Visit counting with GoatCounter (free, no cookies). Make an account at goatcounter.com,
  // then put your code here, e.g. "vitalcarewc" for vitalcarewc.goatcounter.com.
  goatcounterCode: ""
};
