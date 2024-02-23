const { withDatePrefixed } = require('./data-filters');
const { displayDate, displayText } = require('./display-filters');

const getRow = (key, value, href) => {
    return {
        key: {
          text: key
        },
        value: {
          html: value
        },
        actions: {
          items: [
            {
              href: href,
              text: "Change",
              visuallyHiddenText: key
            }
          ]
        }
      }
};

const getTextRow = (key, value, href) => {
    return getRow(key, displayText(value), href);
};

const getDateRow = (key, currentProject, datePrefix, href) => {
    return getRow(key, displayDate(withDatePrefixed(currentProject, datePrefix)), href);
};

const getFinancialPlanRowsSprint11 = (currentProject) =>
{
    const rows = [
        getTextRow("Break-even financial plan agreed that shows minimum pupil numbers needed to sustainably deliver broad and balanced curriculum",
            currentProject.financialPlanBEFPAgreed,
            "task-financial-plan-edit"),
        getDateRow("Forecast date",
            currentProject,
            'financialPlanForecastDate',
            "task-financial-plan-edit"),
        getDateRow("Actual date",
            currentProject,
            'financialPlanActualDate',
            "task-financial-plan-edit"),
        getTextRow("SharePoint link",
            currentProject.financialPlanSharepointLink,
            "task-financial-plan-edit"),
        getTextRow("Comments on decision to approve (if applicable)",
            currentProject.financialPlanCommentsOnDecisionToApprove,
            "task-financial-plan-edit"),
        getTextRow("Reason not applicable",
            currentProject.financialPlanReasonNotApplicable,
                "task-financial-plan-edit"),
        getTextRow("Opt-in to risk protection arrangement (RPA)",
            currentProject.financialPlanRPAOptIn,
            "task-financial-plan-edit")
    ];
    
    if(currentProject.financialPlanRPAOptIn == 'Yes'){
        rows.push(
            getDateRow("RPA start date",
                currentProject,
                'financialPlanRPAStartDate',
                "task-financial-plan-edit"),
            getTextRow("Type of RPA cover",
                currentProject.financialPlanRPAType,
                "task-financial-plan-edit")
        )
    }

    return rows;
};

module.exports = {getFinancialPlanRowsSprint11};