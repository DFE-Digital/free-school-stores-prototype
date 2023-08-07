const govukPrototypeKit = require('govuk-prototype-kit')
const { DateTime } = require('luxon');
const addFilter = govukPrototypeKit.views.addFilter

addFilter("displayDate", (dateString) =>
{
    const date = DateTime.fromISO(dateString);

    return date.toLocaleString(DateTime.DATE_FULL);
});
