// Add your routes here - above the module.exports line
var versionMiddleware = require("./versionMiddleware")

module.exports = function (router) {

    var version = "alpha-sprint-5";

    versionMiddleware(router, version);

    router.use('/' + version + '/*', (req, res, next) => {
        if(req.baseUrl.match("dashboard") == null) {
            req.session.data['dashboardSearch'] = ''
        }
        else {
            if(req.session.data['dashboardSearch'] == null)
            {
                console.log("clearing search")
                req.session.data['dashboardSearch'] = ''
            }
        }

        next()
    })

    router.post('/' + version + '/choose-create-method', function (req, res) {
        // Make a variable to give it the value from the radio buttons on the index page  
        var Task = req.session.data['create-new-fss-methods']

        // Check whether the variable matches a condition
        if (Task == "individual") { 
            res.redirect('create-new-fss-school-name')
        }   
        else if (Task == "bulk") {
            res.redirect('create-new-fss-school-bulk-upload')
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
            "leadApplicant": "",
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
        console.log(newProject);
        req.session.data['project-list'].unshift(newProject);
        res.redirect('create-new-fss-confirmation');
    })

    router.get('/' + version + '/create-new-fss', function (req, res) {
        req.session.data['create-new-fss-project-id'] = '1' + Math.floor(10000 + Math.random() * 90000).toString();
        req.session.data['create-new-fss-number-of-forms-of-entry'] = Math.floor(1 + Math.random() * 3).toString();
        req.session.data['create-new-fss-school-type'] = Math.random() > 0.5 ? "Mainstream" : "AP";
        res.redirect('create-new-fss-landing');
    })

    router.post('/' + version + '/create-new-fss-bulk-upload', function (req, res) {
        var newProject1 = {
            "projectTitle": "Birmingham Junior School",
            "projectID": '1' + Math.floor(10000 + Math.random() * 90000).toString(),
            "leadApplicant": "Dynamics Trust",
            "geographicalRegion": "West Midlands",
            "localAuthority": "Birmingham",
            "openingDate": "7 July 2023",
            "constituency": "",
            "constituencyMP": "",
            "numberOfFormsOfEntry": "3",
            "schoolType": "AP",
            "deliveryOfficer": "",
            "status": "Not started"
        }
        console.log(newProject1);
        req.session.data['project-list'].unshift(newProject1);

        var newProject2 = {
            "projectTitle": "Kensington Public School",
            "projectID": '1' + Math.floor(10000 + Math.random() * 90000).toString(),
            "leadApplicant": "Kingfisher learning trust",
            "geographicalRegion": "London",
            "localAuthority": "Kensington and Chelsea",
            "openingDate": "9 August 2023",
            "constituency": "",
            "constituencyMP": "",
            "numberOfFormsOfEntry": "2",
            "schoolType": "Mainstream",
            "deliveryOfficer": "",
            "status": "Not started"
        }
        console.log(newProject2);
        req.session.data['project-list'].unshift(newProject2);

        var newProject3 = {
            "projectTitle": "Doncaster High School",
            "projectID": '1' + Math.floor(10000 + Math.random() * 90000).toString(),
            "leadApplicant": "United Learning Trust",
            "geographicalRegion": "Yorkshire and Humber",
            "localAuthority": "Doncaster",
            "openingDate": "14 August 2023",
            "constituency": "Don Valley",
            "constituencyMP": "Nick Fletcher",
            "numberOfFormsOfEntry": "3",
            "schoolType": "Mainstream",
            "deliveryOfficer": "",
            "status": "Not started"
        }
        console.log(newProject3);
        req.session.data['project-list'].unshift(newProject3);

        res.redirect('create-new-fss-confirmation');
    })
}