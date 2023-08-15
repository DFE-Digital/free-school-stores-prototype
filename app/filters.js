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