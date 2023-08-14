const govukPrototypeKit = require('govuk-prototype-kit')
const { DateTime } = require('luxon');
const addFilter = govukPrototypeKit.views.addFilter

addFilter("displayDate", (dateString) =>
{
    if (!dateString || dateString === "")
    {
        return "<span class='empty'>Empty</span>";
    }

    const date = DateTime.fromFormat(dateString,"yyyyMMdd");

    return date.toLocaleString(DateTime.DATE_FULL);
});

addFilter("displayText", value =>
{
    if (!value || value === "")
    {
        return "<span class='empty'>Empty</span>";
    }

    return value;
})



// Task list status filters

addFilter("taskDatesStatusClass", (data, completedFields) =>
{
    if (data[completedFields] == "Complete"){
        return "govuk-tag";
    }
    else {
    
    }
})

addFilter("taskDatesStatusText", (data, completedFields) =>
{
    if (data[completedFields] == "Complete"){
        return "Completed";
    }
    else {
        return "Not Started";
    }
})

/*

 // Legal requirements
  
  filters.legalStatusClass = function (data, completedFields, legalGoverningBody, legalConsultation, legalDiocesanConsent, legalFoundationConsent) {
    let checkGoverningBody = data["legal-governing-body-checked"]  == "Yes" || data["legal-governing-body-checked"]  == "No" || data["legal-governing-body-checked"]  == "Not applicable" ? true : false;
    let checkConsultation = data["legal-consultation-checked"]  == "Yes" || data["legal-consultation-checked"]  == "No" || data["legal-consultation-checked"]  == "Not applicable" ? true : false;
    let checkDiocesanConsent = data["legal-diocesan-consent-checked"]  == "Yes" || data["legal-diocesan-consent-checked"]  == "No" || data["legal-diocesan-consent-checked"]  == "Not applicable" ? true : false;
    let checkFoundationConsent = data["legal-foundation-consent-checked"]  == "Yes" || data["legal-foundation-consent-checked"]  == "No" || data["legal-foundation-consent-checked"]  == "Not applicable" ? true : false;


    if (data[completedFields] == "Complete"){
      return "govuk-tag";
    }
    else if (checkGoverningBody || checkConsultation || checkDiocesanConsent || checkFoundationConsent){
      return "govuk-tag govuk-tag--blue"
    }
    else {
      return "govuk-tag govuk-tag--grey";
    }
  }

  filters.legalStatusText = function (data, completedFields, legalGoverningBody, legalConsultation, legalDiocesanConsent, legalFoundationConsent) {
    let checkGoverningBody = data["legal-governing-body-checked"]  == "Yes" || data["legal-governing-body-checked"]  == "No" || data["legal-governing-body-checked"]  == "Not applicable" ? true : false;
    let checkConsultation = data["legal-consultation-checked"]  == "Yes" || data["legal-consultation-checked"]  == "No" || data["legal-consultation-checked"]  == "Not applicable" ? true : false;
    let checkDiocesanConsent = data["legal-diocesan-consent-checked"]  == "Yes" || data["legal-diocesan-consent-checked"]  == "No" || data["legal-diocesan-consent-checked"]  == "Not applicable" ? true : false;
    let checkFoundationConsent = data["legal-foundation-consent-checked"]  == "Yes" || data["legal-foundation-consent-checked"]  == "No" || data["legal-foundation-consent-checked"]  == "Not applicable" ? true : false;

    
    if (data[completedFields] == "Complete"){
      return "Completed";
    }
    else if (checkGoverningBody || checkConsultation || checkDiocesanConsent || checkFoundationConsent){
      return "In Progress"
    }
    else {
      return "Not Started";
    }
  }

  */