const withDatePrefixed = (project, prefix) =>
{
    return (project[prefix + "Year"] + project[prefix + "Month"] + project[prefix + "Day"]);
};

module.exports = {withDatePrefixed};