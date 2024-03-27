//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//********************************************
//* route files for different sprints
//********************************************
require('./routes/alpha-sprint-2.js')(router);
require('./routes/alpha-sprint-3.js')(router);
require('./routes/alpha-sprint-5.js')(router);
require('./routes/alpha-sprint-6.js')(router);
require('./routes/beta-sprint-1.js')(router);
require('./routes/beta-sprint-2.js')(router);
require('./routes/beta-sprint-5.js')(router);
require('./routes/beta-sprint-7.js')(router);
require('./routes/beta-sprint-9.js')(router);
require('./routes/beta-sprint-11.js')(router);
require('./routes/beta-sprint-13.js')(router);
require('./routes/beta-sprint-17.js')(router);