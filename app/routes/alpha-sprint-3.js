// Add your routes here - above the module.exports line

const { fssProjects } = require('../data/data-alpha-sprint-3');

module.exports = function (router) {

    var version = "alpha-sprint-3";

    router.post('/' + version + '/choose-create-method', function (req, res) {
        // Make a variable to give it the value from the radio buttons on the index page  
        var Task = req.session.data['create-new-fss-methods']

        // Check whether the variable matches a condition
        if (Task == "individual") { 
            res.redirect('create-new-fss-school-name')
        }   
        else if (Task == "bulk") {
            res.redirect('create-new-fss-confirmation')
        }

    })

    router.get('/' + version + '/p-o', function (req, res) {
        var project = req.session.data['project-list'].find(x => x.projectID == req.query.id)
        req.session.data.currentProject = project;
        res.redirect('project-overview');
    })

    router.post('/' + version + '/add-project', function (req, res) {
        var newProject = 
        {
            "projectTitle": req.session.data['create-new-fss-school-name'],
            "projectID": req.session.data['create-new-fss-project-id'],
            "applicant": "",
            "geographicalRegion": req.session.data['create-new-fss-region'],
            "localAuthority": req.session.data['create-new-fss-local-authority'],
            "openingDate": req.session.data['create-new-fss-provisional-opening-date'],
            "constituency": req.session.data['create-new-fss-region'],
            "constituencyMP": "",
            "numberOfFormsOfEntry": req.session.data['create-new-fss-number-of-forms-of-entry'],
            "schoolType": req.session.data['create-new-fss-school-type'],
            "deliveryOfficer": "",
            "status": "Not started"
        }
          console.log(newProject)
        req.session.data['project-list'].unshift(newProject)
        res.redirect('create-new-fss-confirmation');
    })

    router.get('/' + version + '/create-new-fss', function (req, res) {
        req.session.data['create-new-fss-project-id'] = '1' + Math.floor(10000 + Math.random() * 90000).toString();
        req.session.data['create-new-fss-number-of-forms-of-entry'] = '1' + Math.floor(Math.random() * 5).toString();
        req.session.data['create-new-fss-school-type'] = Math.random() > 0.5 ? "Mainstream" : "AP";
        res.redirect('create-new-fss-landing');
    })
}