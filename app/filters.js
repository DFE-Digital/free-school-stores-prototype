const govukPrototypeKit = require('govuk-prototype-kit')
const { DateTime } = require('luxon');
const addFilter = govukPrototypeKit.views.addFilter
const { displayDate, displayText } = require('./filters/display-filters');
const { getFinancialPlanRowsSprint11 } = require("./filters/row-filters");
const { withDatePrefixed } = require('./filters/data-filters');

/** Data filters **/
addFilter("withDatePrefixed", withDatePrefixed);

/** Display filters **/
addFilter("displayDate", displayDate);
addFilter("displayText", displayText);

/** Row filters **/
addFilter("getFinancialPlanRowsSprint11", getFinancialPlanRowsSprint11);

addFilter("displayCheckboxValues", (checkboxValues) =>
{
    if (!checkboxValues || checkboxValues === "")
    {
        return "<span class='empty'>Empty</span>";
    }

    return checkboxValues.join(", ");

    /*
    for item in checkboxValues 
    {
        return "<div>" + item + "</div>"
    }
    endfor
    */

});

addFilter('taskStatus', (taskStatus, fields) =>
{
    if (taskStatus != null && taskStatus.includes('Complete'))
    {
        return '<strong class="govuk-tag app-task-list__tag" id="task-dates-status">Completed </strong>'
    }

    const inProgress = fields.some(field => field && field.length > 0);

    if (inProgress)
    {
        return '<strong class="govuk-tag govuk-tag--blue app-task-list__tag" id="eligibility-status">In progress</strong>';
    }

    return "<strong class='govuk-tag govuk-tag--grey app-task-list__tag' id='eligibility-status'>Not started</strong>";
});

addFilter('projectStatus', (projectStatus) =>
{
    if (projectStatus)
    {
        if (projectStatus.includes('Complete'))
        {
            return '<strong class="govuk-tag govuk-tag--green" id="task-dates-status">Completed </strong>'
        }
    
        if (projectStatus.includes("In progress"))
        {
            return '<strong class="govuk-tag govuk-tag--blue" id="eligibility-status">In progress</strong>';
        }
    }

    return '<strong class="govuk-tag govuk-tag--grey" id="eligibility-status">Not started</strong>';
});

addFilter("displayRAGRating", (ragValue) =>
{
    if (!ragValue || ragValue === "")
    {
        return "<span class='empty'>Empty</span>";
    }

    switch(ragValue) {
        case "Green":
            return '<strong class="govuk-tag govuk-tag--green">Green</strong>';
            break;
        case "Amber Green":
            return '<strong class="govuk-tag dfe-tag--amber">Amber</strong>&nbsp;<strong class="govuk-tag govuk-tag--green">Green</strong>';
            break;
        case "Amber Red":
            return '<strong class="govuk-tag dfe-tag--amber">Amber</strong>&nbsp;<strong class="govuk-tag govuk-tag--red">Red</strong>';
            break;
        case "Red":
            return '<strong class="govuk-tag govuk-tag--red">Red</strong>';
            break;
        default:
          // code block
      };

    return ragValue;
});


addFilter("displaySharepointLink", (sharepointLink, linkText) =>
{
    if (!sharepointLink || sharepointLink === "")
    {
        return "<span class='empty'>Empty</span>";
    }

    if (sharepointLink == "#") {
        return '<a class="govuk-link" href="#">' + linkText + '</a>';
    } else {
        return '<a class="govuk-link" target="_blank" href="' + sharepointLink + '">' + linkText + '</a>';
    }
});