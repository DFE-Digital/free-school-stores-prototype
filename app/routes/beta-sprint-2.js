// Add your routes here - above the module.exports line
var versionMiddleware = require("./versionMiddleware")

module.exports = function (router) {

    var version = "beta-sprint-2";

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

        next();
    })

    router.post('/' + version + '/checking-roles', function (req, res) {
        // Make a variable to give it the value from the radio buttons on the index page  
        var Role = req.session.data['userRole']

        // Check whether the variable matches a condition
        if (Role == "School places analysis team") { 
            res.redirect('projects-listing-all-projects')
        }   
        else {
            res.redirect('projects-listing-your-projects')
        }

    })
    
    router.post('/' + version + '/choose-create-method', function (req, res) {
        // Make a variable to give it the value from the radio buttons on the index page  
        var Task = req.session.data['create-new-project-methods']

        // Check whether the variable matches a condition
        if (Task == "individual") { 
            res.redirect('create-new-project-school-name')
        }   
        else if (Task == "bulk") {
            res.redirect('create-new-project-school-bulk-upload')
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
            "projectTitle": req.session.data['create-new-project-school-name'],
            "projectID": req.session.data['create-new-project-project-id'],
            "freeSchoolsApplicationNumber" : "",
            "freeSchoolApplicationWave": "",
            "trust" : "",
            "trustID" : "",
            "geographicalRegion": req.session.data['create-new-project-region'],
            "localAuthority": req.session.data['create-new-project-local-authority'],
            "openingDate": req.session.data['create-new-project-provisional-opening-date'],
            "constituency": req.session.data['create-new-project-region'],
            "constituencyMP": "",
            "numberOfFormsOfEntry": req.session.data['create-new-project-number-of-forms-of-entry'],
            "schoolType": req.session.data['create-new-project-school-type'],
            "schoolPhase": "Primary",
            "faithStatus" : "None",
            "faithType" : "None",
            "deliveryOfficer": "",
            "status": "Not started",
            "dateOfEntryIntoPreOpeningDay" : "",
            "dateOfEntryIntoPreOpeningMonth" : "",
            "dateOfEntryIntoPreOpeningYear" : "",
            "realisticYearOfOpeningStart" : "",
            "realisticYearOfOpeningEnd" : "",
            "provisionalOpeningDateDay" : "",
            "provisionalOpeningDateMonth" : "",
            "provisionalOpeningDateYear" : "",
            "actualOpeningDateDay" : "",
            "actualOpeningDateMonth" : "",
            "actualOpeningDateYear" : "",
            "openingAcademicStart" : "",
            "openingAcademicEnd" : "",
            "startOfTermDateDay" : "",
            "startOfTermDateMonth" : "",
            "startOfTermDateYear" : "",
            "provisionalKickOffMeetingDateDay" : "",
            "provisionalKickOffMeetingDateMonth" : "",
            "provisionalKickOffMeetingDateYear" : "",
            "actualKickOffMeetingDateDay" : "",
            "actualKickOffMeetingDateMonth" : "",
            "actualKickOffMeetingDateYear" : "",
            "capacityYRY6" : "",
            "capacityY7Y11" : "",
            "capacityY12Y14" : "",
            "ageRange" : "",
            "sixthForm" : "",
            "taskSchoolDetailsStatus" : "",
            "taskRiskAppraisalStatus" : "",
            "riskAppraisalSharepointLink" : "",
            "riskRatingEducation" : "",
            "riskRatingGovernance" : "",
            "riskRatingFinance" : "",
            "taskDatesStatus": "",
            "taskPDGStatus": ""
        }
        console.log(newProject);
        req.session.data['project-list'].unshift(newProject);
        res.redirect('create-new-project-confirmation');
    })

    router.get('/' + version + '/create-new-project', function (req, res) {
        req.session.data['create-new-project-project-id'] = '1' + Math.floor(10000 + Math.random() * 90000).toString();
        req.session.data['create-new-project-number-of-forms-of-entry'] = Math.floor(1 + Math.random() * 3).toString();
        req.session.data['create-new-project-school-type'] = Math.random() > 0.5 ? "Mainstream" : "AP";
        res.redirect('create-new-project-landing');
    })

    router.post('/' + version + '/create-new-project-bulk-upload', function (req, res) {
        var newProject1 = {
            "projectTitle": "Birmingham Junior School",
            "projectID": '1' + Math.floor(10000 + Math.random() * 90000).toString(),
            "freeSchoolsApplicationNumber" : "",
            "freeSchoolApplicationWave": "",
            "trust": "Dynamics Trust",
            "trustID" : "",
            "geographicalRegion": "West Midlands",
            "localAuthority": "Birmingham",
            "openingDate": "7 July 2023",
            "constituency": "",
            "constituencyMP": "",
            "numberOfFormsOfEntry": "3",
            "schoolType": "AP",
            "schoolPhase": "Primary",
            "faithStatus" : "None",
            "faithType" : "None",
            "deliveryOfficer": "",
            "status": "Not started",
            "dateOfEntryIntoPreOpeningDay" : "",
            "dateOfEntryIntoPreOpeningMonth" : "",
            "dateOfEntryIntoPreOpeningYear" : "",
            "realisticYearOfOpeningStart" : "",
            "realisticYearOfOpeningEnd" : "",
            "provisionalOpeningDateDay" : "",
            "provisionalOpeningDateMonth" : "",
            "provisionalOpeningDateYear" : "",
            "actualOpeningDateDay" : "",
            "actualOpeningDateMonth" : "",
            "actualOpeningDateYear" : "",
            "openingAcademicStart" : "",
            "openingAcademicEnd" : "",
            "startOfTermDateDay" : "",
            "startOfTermDateMonth" : "",
            "startOfTermDateYear" : "",
            "provisionalKickOffMeetingDateDay" : "",
            "provisionalKickOffMeetingDateMonth" : "",
            "provisionalKickOffMeetingDateYear" : "",
            "actualKickOffMeetingDateDay" : "",
            "actualKickOffMeetingDateMonth" : "",
            "actualKickOffMeetingDateYear" : "",
            "capacityYRY6" : "",
            "capacityY7Y11" : "",
            "capacityY12Y14" : "",
            "ageRange" : "",
            "sixthForm" : "",
            "taskSchoolDetailsStatus" : "",
            "taskRiskAppraisalStatus" : "",
            "riskAppraisalSharepointLink" : "",
            "riskRatingEducation" : "",
            "riskRatingGovernance" : "",
            "riskRatingFinance" : "",
            "taskDatesStatus": "",
            "taskPDGStatus": ""
        }
        console.log(newProject1);
        req.session.data['project-list'].unshift(newProject1);

        var newProject2 = {
            "projectTitle": "Kensington Public School",
            "projectID": '1' + Math.floor(10000 + Math.random() * 90000).toString(),
            "freeSchoolsApplicationNumber" : "",
            "freeSchoolApplicationWave": "",
            "trust": "Kingfisher learning trust",
            "trustID" : "",
            "geographicalRegion": "London",
            "localAuthority": "Kensington and Chelsea",
            "openingDate": "9 August 2023",
            "constituency": "",
            "constituencyMP": "",
            "numberOfFormsOfEntry": "2",
            "schoolType": "Mainstream",
            "schoolPhase": "Primary",
            "faithStatus" : "None",
            "faithType" : "None",
            "deliveryOfficer": "",
            "status": "Not started",
            "dateOfEntryIntoPreOpeningDay" : "",
            "dateOfEntryIntoPreOpeningMonth" : "",
            "dateOfEntryIntoPreOpeningYear" : "",
            "realisticYearOfOpeningStart" : "",
            "realisticYearOfOpeningEnd" : "",
            "provisionalOpeningDateDay" : "",
            "provisionalOpeningDateMonth" : "",
            "provisionalOpeningDateYear" : "",
            "actualOpeningDateDay" : "",
            "actualOpeningDateMonth" : "",
            "actualOpeningDateYear" : "",
            "openingAcademicStart" : "",
            "openingAcademicEnd" : "",
            "startOfTermDateDay" : "",
            "startOfTermDateMonth" : "",
            "startOfTermDateYear" : "",
            "provisionalKickOffMeetingDateDay" : "",
            "provisionalKickOffMeetingDateMonth" : "",
            "provisionalKickOffMeetingDateYear" : "",
            "actualKickOffMeetingDateDay" : "",
            "actualKickOffMeetingDateMonth" : "",
            "actualKickOffMeetingDateYear" : "",
            "capacityYRY6" : "",
            "capacityY7Y11" : "",
            "capacityY12Y14" : "",
            "ageRange" : "",
            "sixthForm" : "",
            "taskSchoolDetailsStatus" : "",
            "taskRiskAppraisalStatus" : "",
            "riskAppraisalSharepointLink" : "",
            "riskRatingEducation" : "",
            "riskRatingGovernance" : "",
            "riskRatingFinance" : "",
            "taskDatesStatus": "",
            "taskPDGStatus": ""
        }
        console.log(newProject2);
        req.session.data['project-list'].unshift(newProject2);

        var newProject3 = {
            "projectTitle": "Doncaster High School",
            "projectID": '1' + Math.floor(10000 + Math.random() * 90000).toString(),
            "freeSchoolsApplicationNumber" : "",
            "freeSchoolApplicationWave": "",
            "trust": "United Learning Trust",
            "trustID" : "",
            "geographicalRegion": "Yorkshire and Humber",
            "localAuthority": "Doncaster",
            "openingDate": "14 August 2023",
            "constituency": "Don Valley",
            "constituencyMP": "Nick Fletcher",
            "numberOfFormsOfEntry": "3",
            "schoolType": "Mainstream",
            "schoolPhase": "Primary",
            "faithStatus" : "None",
            "faithType" : "None",
            "deliveryOfficer": "",
            "status": "Not started",
            "dateOfEntryIntoPreOpeningDay" : "",
            "dateOfEntryIntoPreOpeningMonth" : "",
            "dateOfEntryIntoPreOpeningYear" : "",
            "realisticYearOfOpeningStart" : "",
            "realisticYearOfOpeningEnd" : "",
            "provisionalOpeningDateDay" : "",
            "provisionalOpeningDateMonth" : "",
            "provisionalOpeningDateYear" : "",
            "actualOpeningDateDay" : "",
            "actualOpeningDateMonth" : "",
            "actualOpeningDateYear" : "",
            "openingAcademicStart" : "",
            "openingAcademicEnd" : "",
            "startOfTermDateDay" : "",
            "startOfTermDateMonth" : "",
            "startOfTermDateYear" : "",
            "provisionalKickOffMeetingDateDay" : "",
            "provisionalKickOffMeetingDateMonth" : "",
            "provisionalKickOffMeetingDateYear" : "",
            "actualKickOffMeetingDateDay" : "",
            "actualKickOffMeetingDateMonth" : "",
            "actualKickOffMeetingDateYear" : "",
            "capacityYRY6" : "",
            "capacityY7Y11" : "",
            "capacityY12Y14" : "",
            "ageRange" : "",
            "sixthForm" : "",
            "taskSchoolDetailsStatus" : "",
            "taskRiskAppraisalStatus" : "",
            "riskAppraisalSharepointLink" : "",
            "riskRatingEducation" : "",
            "riskRatingGovernance" : "",
            "riskRatingFinance" : "",
            "taskDatesStatus": "",
            "taskPDGStatus": ""
        }
        console.log(newProject3);
        req.session.data['project-list'].unshift(newProject3);

        res.redirect('create-new-project-confirmation');
    })

    router.post('/' + version + '/task-dates-landing-page', function (req, res) {
        var masterProject = getProject(req);

        // Update the master list
        masterProject.dateOfEntryIntoPreOpeningDay = req.session.data['dateOfEntryIntoPreOpening-day'];
        masterProject.dateOfEntryIntoPreOpeningMonth = req.session.data['dateOfEntryIntoPreOpening-month'];
        masterProject.dateOfEntryIntoPreOpeningYear = req.session.data['dateOfEntryIntoPreOpening-year'];
        masterProject.provisionalOpeningDateDay = req.session.data['provisionalOpeningDate-day'];
        masterProject.provisionalOpeningDateMonth = req.session.data['provisionalOpeningDate-month'];
        masterProject.provisionalOpeningDateYear = req.session.data['provisionalOpeningDate-year'];
        masterProject.openingAcademicStart = req.session.data['openingAcademic-start year'];
        masterProject.openingAcademicEnd = req.session.data['openingAcademic-end year'];

        // Update our current project with the latest changes
        req.session.data.currentProject = masterProject;

        res.redirect("task-dates-landing-page");
    });

    router.post('/' + version + '/task-dates-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskDatesStatus = req.session.data['task-dates-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-risk-appraisal-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.riskAppraisalSharepointLink = req.session.data['riskAppraisalSharepointLink'];
        masterProject.riskRatingEducation = req.session.data['riskRatingEducation'];
        masterProject.riskRatingGovernance = req.session.data['riskRatingGovernance'];
        masterProject.riskRatingFinance = req.session.data['riskRatingFinance'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-risk-appraisal-landing-page");
    });

    router.post('/' + version + '/task-risk-appraisal-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskRiskAppraisalStatus = req.session.data['task-risk-appraisal-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-school-details-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.projectTitle = req.session.data['projectTitle'];
        masterProject.schoolType = req.session.data['schoolType'];
        masterProject.schoolPhase = req.session.data['schoolPhase'];
        masterProject.ageRange = req.session.data['ageRange'];
        masterProject.gender = req.session.data['gender'];
        masterProject.nursery = req.session.data['nursery'];
        masterProject.sixthForm = req.session.data['sixthForm'];
        masterProject.faithStatus = req.session.data['faithStatus'];
        masterProject.faithType = req.session.data['faithType'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-school-details-landing-page");
    });

    router.post('/' + version + '/task-school-details-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskSchoolDetailsStatus = req.session.data['task-school-details-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    function getProject(req) {
        return req.session.data['project-list'].find(p => p.projectID == req.session.data.currentProject.projectID);
    }
}