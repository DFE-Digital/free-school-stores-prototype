// Add your routes here - above the module.exports line
var versionMiddleware = require("./versionMiddleware")

module.exports = function (router) {

    var version = "beta-sprint-24";

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

    router.post('/' + version + '/validate-trust-result', function (req, res) { 
        var Task = req.session.data['confirm-trust-result']

        // Check whether the variable matches a condition
        if (Task == "Yes") { 
            var masterProject = getProject(req);
            masterProject.trustID = req.session.data['trustID'];
            req.session.data.currentProject = masterProject;    
            res.redirect('task-trust-landing-page')
        }   
        else if (Task == "No") {
            res.redirect('task-trust-edit')
        }

    })
    
    router.post('/' + version + '/validate-constituency-result', function (req, res) { 
        var Task = req.session.data['confirm-constitency-result']

        // Check whether the variable matches a condition
        
        var masterProject = getProject(req);
        
        switch(req.session.data['confirm-constituency-result']) {
            case "South Northamptonshire":
                masterProject.constituency = req.session.data['confirm-constituency-result'];
                masterProject.constituencyMP = "Rt Hon Andrea Leadsom MP";
                masterProject.constituencyParty = "Conservative";
                req.session.data.currentProject = masterProject;    
                res.redirect('task-constituency-landing-page')
                break;
            case "South Leicestershire":
                masterProject.constituency = req.session.data['confirm-constituency-result'];
                masterProject.constituencyMP = "Alberto Costa";
                masterProject.constituencyParty = "Conservative";
                req.session.data.currentProject = masterProject;    
                res.redirect('task-constituency-landing-page')
                break;
            case "South Derbyshire":
                masterProject.constituency = req.session.data['confirm-constituency-result'];
                masterProject.constituencyMP = "Heather Wheeler MP";
                masterProject.constituencyParty = "Conservative";
                req.session.data.currentProject = masterProject;    
                res.redirect('task-constituency-landing-page')
                break;
            case "None of the above":
                res.redirect('task-constituency-edit')
                break;
        }

    })

    router.post('/' + version + '/task-constituency-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskConstituencyStatus = req.session.data['task-constituency-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/edit-risk-rating-start', function (req, res) { 

        var masterProject = getProject(req);
        req.session.data.currentProject = masterProject;
        req.session.data['newRiskRatingOverall'] = masterProject.currentRiskRatingOverall;
        req.session.data['newRiskRatingOverallSummary'] = masterProject.currentRiskRatingOverallSummary;
        req.session.data['newRiskRatingGovernance'] = masterProject.currentRiskRatingGovernance;
        req.session.data['newRiskRatingGovernanceSummary'] = masterProject.currentRiskRatingGovernanceSummary;
        req.session.data['newRiskRatingEducation'] = masterProject.currentRiskRatingEducation;
        req.session.data['newRiskRatingEducationSummary'] = masterProject.currentRiskRatingEducationSummary;
        req.session.data['newRiskRatingFinance'] = masterProject.currentRiskRatingFinance;
        req.session.data['newRiskRatingFinanceSummary'] = masterProject.currentRiskRatingFinanceSummary;
        req.session.data['newRiskRatingSharePointLink'] = masterProject.currentRiskRatingSharePointLink;
        res.redirect('other-info-new-rag-rating-check-your-answers');
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
            "lastUpdatedDay" : "",
            "lastUpdatedMonth" : "",
            "lastUpdatedYear" : "",
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
            "riskAppraisalMeetingCompleted": "",
            "riskAppraisalMeetingForecastDateDay": "",
            "riskAppraisalMeetingForecastDateMonth": "",
            "riskAppraisalMeetingForecastDateYear": "",
            "riskAppraisalMeetingActualDateDay": "",
            "riskAppraisalMeetingActualDateMonth": "",
            "riskAppraisalMeetingActualDateYear": "",
            "riskAppraisalMeetingCommentsOnDecisionToApprove": "",
            "taskRiskAppraisalMeetingStatus": "",
            "taskDatesStatus": "",
            "taskPDGStatus": "",
            "taskTrustStatus": "",
            "taskRegionAndLocalAuthority": "",
            "taskConstituencyStatus": "",
            "initialGrantAllocation": "",
            "gender": "",
            "preFundingAgreementCheckpointMeetingCompleted": "",
            "preFundingAgreementForecastDateDay": "",
            "preFundingAgreementForecastDateMonth": "",
            "preFundingAgreementForecastDateYear": "",
            "preFundingAgreementActualDateDay": "",
            "preFundingAgreementActualDateMonth": "",
            "preFundingAgreementActualDateYear": "",
            "preFundingAgreementCommentsOnDecisionToApprove": "",
            "preFundingAgreementSharepointLink": "",
            "taskPreFundingAgreementStatus": "",
            "RAFCurrentSharepointLink" : "",
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
            "lastUpdatedDay" : "",
            "lastUpdatedMonth" : "",
            "lastUpdatedYear" : "",
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
            "riskAppraisalMeetingCompleted": "",
            "riskAppraisalMeetingForecastDateDay": "",
            "riskAppraisalMeetingForecastDateMonth": "",
            "riskAppraisalMeetingForecastDateYear": "",
            "riskAppraisalMeetingActualDateDay": "",
            "riskAppraisalMeetingActualDateMonth": "",
            "riskAppraisalMeetingActualDateYear": "",
            "riskAppraisalMeetingCommentsOnDecisionToApprove": "",
            "taskRiskAppraisalMeetingStatus": "",
            "taskDatesStatus": "",
            "taskPDGStatus": "",
            "taskTrustStatus": "",
            "taskRegionAndLocalAuthority": "",
            "taskConstituencyStatus": "",
            "initialGrantAllocation": "",
            "gender": "",
            "preFundingAgreementCheckpointMeetingCompleted": "",
            "preFundingAgreementForecastDateDay": "",
            "preFundingAgreementForecastDateMonth": "",
            "preFundingAgreementForecastDateYear": "",
            "preFundingAgreementActualDateDay": "",
            "preFundingAgreementActualDateMonth": "",
            "preFundingAgreementActualDateYear": "",
            "preFundingAgreementCommentsOnDecisionToApprove": "",
            "preFundingAgreementSharepointLink": "",
            "taskPreFundingAgreementStatus": "",
            "RAFCurrentSharepointLink" : "",
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
            "lastUpdatedDay" : "",
            "lastUpdatedMonth" : "",
            "lastUpdatedYear" : "",
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
            "riskAppraisalMeetingCompleted": "",
            "riskAppraisalMeetingForecastDateDay": "",
            "riskAppraisalMeetingForecastDateMonth": "",
            "riskAppraisalMeetingForecastDateYear": "",
            "riskAppraisalMeetingActualDateDay": "",
            "riskAppraisalMeetingActualDateMonth": "",
            "riskAppraisalMeetingActualDateYear": "",
            "riskAppraisalMeetingCommentsOnDecisionToApprove": "",
            "taskRiskAppraisalMeetingStatus": "",
            "taskDatesStatus": "",
            "taskPDGStatus": "",
            "taskTrustStatus": "",
            "taskRegionAndLocalAuthority": "",
            "taskConstituencyStatus": "",
            "initialGrantAllocation": "",
            "gender": "",
            "preFundingAgreementCheckpointMeetingCompleted": "",
            "preFundingAgreementForecastDateDay": "",
            "preFundingAgreementForecastDateMonth": "",
            "preFundingAgreementForecastDateYear": "",
            "preFundingAgreementActualDateDay": "",
            "preFundingAgreementActualDateMonth": "",
            "preFundingAgreementActualDateYear": "",
            "preFundingAgreementCommentsOnDecisionToApprove": "",
            "preFundingAgreementSharepointLink": "",
            "taskPreFundingAgreementStatus": "",
            "RAFCurrentSharepointLink" : "",
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
        masterProject.realisticYearOfOpening = req.session.data['realisticYearOfOpening'];
        applyDateFields(masterProject, req, 'provisionalOpeningDate');
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

    router.post('/' + version + '/task-trust-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskTrustStatus = req.session.data['task-trust-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-risk-appraisal-meeting-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.riskAppraisalMeetingCompleted = req.session.data['riskAppraisalMeetingCompleted'];
        applyDateFields(masterProject, req, 'riskAppraisalMeetingForecastDate');
        applyDateFields(masterProject, req, 'riskAppraisalMeetingActualDate');
        masterProject.riskAppraisalMeetingCommentsOnDecisionToApprove = req.session.data['riskAppraisalMeetingCommentsOnDecisionToApprove'];
        masterProject.riskAppraisalMeetingReasonNotApplicable = req.session.data['riskAppraisalMeetingReasonNotApplicable'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-risk-appraisal-meeting-landing-page");
    });

    router.post('/' + version + '/task-risk-appraisal-meeting-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskRiskAppraisalMeetingStatus = req.session.data['task-risk-appraisal-meeting-status'];

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

    router.post('/' + version + '/task-kick-off-meeting-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.kickOffMeetingFundingArrangementDetailsAgreed = req.session.data['kickOffMeetingFundingArrangementDetailsAgreed'];
        masterProject.realisticYearOfOpening = req.session.data['realisticYearOfOpening'];
        applyDateFields(masterProject, req, 'provisionalOpeningDate');
        masterProject.kickOffMeetingSharepointLink = req.session.data['kickOffMeetingSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-kick-off-meeting-landing-page");
    });

    router.post('/' + version + '/task-kick-off-meeting-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskKickOffMeetingStatus = req.session.data['task-kick-off-meeting-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-financial-plan-update', function(req, res) {
        var masterProject = getProject(req);

        masterProject.financePlanAgreed = req.session.data['financePlanAgreed'];
        applyDateFields(masterProject, req, 'financePlanActualDate');
        masterProject.financePlanSaved = req.session.data['financePlanSaved'];
        masterProject.financePlanCommentsOnDecisionToApprove = req.session.data['financePlanCommentsOnDecisionToApprove'];
        masterProject.financePlanPupilNumbersAgreed = req.session.data['financePlanPupilNumbersAgreed'];
        masterProject.financePlanRPAOptIn = req.session.data['financePlanRPAOptIn'];
        applyDateFields(masterProject, req, 'financePlanRPAStartDate');
        masterProject.financePlanRPAType = req.session.data['financePlanRPAType'];
        
        req.session.data.currentProject = masterProject;
        res.redirect("task-financial-plan-landing-page");
    });

    router.post('/' + version + '/task-financial-plan-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskFinancePlanStatus = req.session.data['task-financial-plan-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-financial-plan-alternative-update', function(req, res) {
        var masterProject = getProject(req);

        masterProject.financePlanAgreed = req.session.data['financePlanAgreed'];
        applyDateFields(masterProject, req, 'financePlanActualDate');
        masterProject.financePlanSaved = req.session.data['financePlanSaved'];
        masterProject.financePlanCommentsOnDecisionToApprove = req.session.data['financePlanCommentsOnDecisionToApprove'];
        masterProject.financePlanPupilNumbersAgreed = req.session.data['financePlanPupilNumbersAgreed'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-financial-plan-alternative-landing-page");
    });

    router.post('/' + version + '/task-model-funding-agreement-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.modelFundingAgreementTrustAgrees = req.session.data['modelFundingAgreementTrustAgrees'];
        applyDateFields(masterProject, req, 'modelFundingAgreementForecastDate');
        applyDateFields(masterProject, req, 'modelFundingAgreementActualDate');
        masterProject.modelFundingAgreementCommentsOnDecisionToApprove = req.session.data['modelFundingAgreementCommentsOnDecisionToApprove'];
        masterProject.modelFundingAgreementSharepointLink = req.session.data['modelFundingAgreementSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-model-funding-agreement-landing-page");
    });

    router.post('/' + version + '/task-model-funding-agreement-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskModelFundingAgreementStatus = req.session.data['task-model-funding-agreement-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-principal-designate-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.principalDesignateAppointed = req.session.data['principalDesignateAppointed'];
        masterProject.principalDesignateEducationExpertIsCommissioned = req.session.data['principalDesignateEducationExpertIsCommissioned'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-principal-designate-landing-page");
    });

    router.post('/' + version + '/task-principal-designate-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskPrincipalDesignateStatus = req.session.data['task-principal-designate-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-statutory-consultation-landing-page', function(req, res) {
        var masterProject = getProject(req);

        applyDateFields(masterProject, req, 'statutoryConsultationForecastDate');
        applyDateFields(masterProject, req, 'statutoryConsultationActualDate');
        masterProject.statutoryConsultationCommentsOnDecisionToApprove = req.session.data['statutoryConsultationCommentsOnDecisionToApprove'];
        masterProject.statutoryConsultationSharepointLink = req.session.data['statutoryConsultationSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-statutory-consultation-landing-page");
    });

    router.post('/' + version + '/task-statutory-consultation-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskStatutoryConsultationStatus = req.session.data['task-statutory-consultation-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-statutory-consultation-report-landing-page', function(req, res) {
        var masterProject = getProject(req);

        applyDateFields(masterProject, req, 'statutoryConsultationReportForecastDate');
        applyDateFields(masterProject, req, 'statutoryConsultationReportActualDate');
        masterProject.statutoryConsultationReportCommentsOnDecisionToApprove = req.session.data['statutoryConsultationReportCommentsOnDecisionToApprove'];
        masterProject.statutoryConsultationReportSharepointLink = req.session.data['statutoryConsultationReportSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-statutory-consultation-report-landing-page");
    });

    router.post('/' + version + '/task-statutory-consultation-report-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskStatutoryConsultationReportStatus = req.session.data['task-statutory-consultation-report-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-articles-of-association-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.articlesOfAssociationSubmittedMatchTheModel = req.session.data['articlesOfAssociationSubmittedMatchTheModel'];
        masterProject.articlesOfAssociationSubmittedConfirmation = req.session.data['articlesOfAssociationSubmittedConfirmation'];
        masterProject.articlesOfAssociationGovernanceArrangementMatch = req.session.data['articlesOfAssociationGovernanceArrangementMatch'];
        applyDateFields(masterProject, req, 'articlesOfAssociationForecastDate');
        applyDateFields(masterProject, req, 'articlesOfAssociationActualDate');
        masterProject.articlesOfAssociationCommentsOnDecisionToApprove = req.session.data['articlesOfAssociationCommentsOnDecisionToApprove'];
        masterProject.articlesOfAssociationSharepointLink = req.session.data['articlesOfAssociationSharepointLink'];

        req.session.data['taskArticlesOfAssociationError'] = "No";
        
        req.session.data.currentProject = masterProject;


        res.redirect("task-articles-of-association-landing-page");
    });

    router.post('/' + version + '/task-articles-of-association-confirmation', function(req, res) {
        var masterProject = getProject(req);

        // Validate the task completeness. Reject marking as completed if the three checkboxes are not completed too
        var taskStatus = req.session.data['taskArticlesOfAssociationStatus'];
        if (taskStatus == "Complete") {
            if ((masterProject.articlesOfAssociationSubmittedMatchTheModel != "Done") || (masterProject.articlesOfAssociationSubmittedConfirmation != "Done") || (masterProject.articlesOfAssociationGovernanceArrangementMatch != "Done") ) {
                req.session.data['taskArticlesOfAssociationStatus'] = "";
                res.redirect('task-articles-of-association-landing-page?taskArticlesOfAssociationError=Yes');
                return;
            }
        }

        masterProject.taskArticlesOfAssociationStatus = req.session.data['taskArticlesOfAssociationStatus'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-section-nine-letter-landing-page', function(req, res) {
        var masterProject = getProject(req);

        applyDateFields(masterProject, req, 'sectionNineLetterForecastDate');
        applyDateFields(masterProject, req, 'sectionNineLetterActualDate');
        masterProject.sectionNineLetterCommentsOnDecisionToApprove = req.session.data['sectionNineLetterCommentsOnDecisionToApprove'];
        masterProject.sectionNineLetterSharepointLink = req.session.data['sectionNineLetterSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-section-nine-letter-landing-page");
    });

    router.post('/' + version + '/task-section-nine-letter-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskSectionNineLetterStatus = req.session.data['task-section-nine-letter-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-draft-governance-plans-landing-page', function(req, res) {
        var masterProject = getProject(req);

        applyDateFields(masterProject, req, 'draftGovernancePlansForecastDate');
        applyDateFields(masterProject, req, 'draftGovernancePlansActualDate');
        masterProject.draftGovernancePlansCommentsOnDecisionToApprove = req.session.data['draftGovernancePlansCommentsOnDecisionToApprove'];
        masterProject.draftGovernancePlansSharepointLink = req.session.data['draftGovernancePlansSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-draft-governance-plans-landing-page");
    });

    router.post('/' + version + '/task-draft-governance-plans-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskDraftGovernancePlansStatus = req.session.data['task-draft-governance-plans-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-school-admissions-policy-landing-page', function(req, res) {
        var masterProject = getProject(req);

        applyDateFields(masterProject, req, 'schoolAdmissionsPolicyForecastDate');
        applyDateFields(masterProject, req, 'schoolAdmissionsPolicyActualDate');
        masterProject.schoolAdmissionsPolicyCommentsOnDecisionToApprove = req.session.data['schoolAdmissionsPolicyCommentsOnDecisionToApprove'];
        masterProject.schoolAdmissionsPolicySharepointLink = req.session.data['schoolAdmissionsPolicySharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-school-admissions-policy-landing-page");
    });

    router.post('/' + version + '/task-school-admissions-policy-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskSchoolAdmissionsPolicyStatus = req.session.data['task-school-admissions-policy-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-dbs-checks-landing-page', function(req, res) {
        var masterProject = getProject(req);

        applyDateFields(masterProject, req, 'dbsChecksForecastDate');
        applyDateFields(masterProject, req, 'dbsChecksActualDate');
        masterProject.dbsChecksCommentsOnDecisionToApprove = req.session.data['dbsChecksCommentsOnDecisionToApprove'];
        masterProject.dbsChecksSharepointLink = req.session.data['dbsChecksSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-dbs-checks-landing-page");
    });

    router.post('/' + version + '/task-dbs-checks-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskDbsChecksStatus = req.session.data['task-dbs-checks-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-pre-funding-agreement-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.preFundingAgreementCheckpointMeetingCompleted = req.session.data['preFundingAgreementCheckpointMeetingCompleted'];
        applyDateFields(masterProject, req, 'preFundingAgreementForecastDate');
        applyDateFields(masterProject, req, 'preFundingAgreementActualDate');
        masterProject.preFundingAgreementCommentsOnDecisionToApprove = req.session.data['preFundingAgreementCommentsOnDecisionToApprove'];
        masterProject.preFundingAgreementReasonNotApplicable = req.session.data['preFundingAgreementReasonNotApplicable'];
        masterProject.preFundingAgreementSharepointLink = req.session.data['preFundingAgreementSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-pre-funding-agreement-landing-page");
    });

    router.post('/' + version + '/task-pre-funding-agreement-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskPreFundingAgreementStatus = req.session.data['task-pre-funding-agreement-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-curriculum-plans-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.curriculumPlansSubmitted = req.session.data['curriculumPlansSubmitted'];
        applyDateFields(masterProject, req, 'curriculumPlansForecastDate');
        applyDateFields(masterProject, req, 'curriculumPlansActualDate');
        masterProject.curriculumPlansCommentsOnDecisionToApprove = req.session.data['curriculumPlansCommentsOnDecisionToApprove'];
        masterProject.curriculumPlansSharepointLink = req.session.data['curriculumPlansSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-curriculum-plans-landing-page");
    });

    router.post('/' + version + '/task-curriculum-plans-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskCurriculumPlansStatus = req.session.data['task-curriculum-plans-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-final-governance-plan-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.finalGovernancePlanAgreed = req.session.data['finalGovernancePlanAgreed'];
        applyDateFields(masterProject, req, 'finalGovernancePlanForecastDate');
        applyDateFields(masterProject, req, 'finalGovernancePlanActualDate');
        masterProject.finalGovernancePlanCommentsOnDecisionToApprove = req.session.data['finalGovernancePlanCommentsOnDecisionToApprove'];
        masterProject.finalGovernancePlanSharepointLink = req.session.data['finalGovernancePlanSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-final-governance-plan-landing-page");
    });

    router.post('/' + version + '/task-final-governance-plan-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskFinalGovernancePlanStatus = req.session.data['task-final-governance-plan-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-education-brief-and-policies-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.educationAdviserAgreement = req.session.data['educationAdviserAgreement'];
        applyDateFields(masterProject, req, 'educationBriefForecastDate');
        applyDateFields(masterProject, req, 'educationBriefActualDate');
        masterProject.educationBriefCommentsOnDecisionToApprove = req.session.data['educationBriefCommentsOnDecisionToApprove'];
        masterProject.educationBriefSharepointLink = req.session.data['educationBriefSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-education-brief-and-policies-landing-page");
    });

    router.post('/' + version + '/task-education-brief-and-policies-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskeducationBriefStatus = req.session.data['task-education-brief-and-policies-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });
    
    router.post('/' + version + '/task-getting-ready-to-open-dates-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.realisticYearOfOpening = req.session.data['realisticYearOfOpening'];
        applyDateFields(masterProject, req, 'startOfTermDate');

        req.session.data.currentProject = masterProject;

        res.redirect("task-getting-ready-to-open-dates-landing-page");
    });

    router.post('/' + version + '/task-getting-ready-to-open-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskGettingReadyToOpenDatesStatus = req.session.data['task-getting-ready-to-open-dates-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-funding-agreement-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.fundingAgreementSigned = req.session.data['fundingAgreementSigned'];
        applyDateFields(masterProject, req, 'fundingAgreementForecastDate');
        applyDateFields(masterProject, req, 'fundingAgreementActualDate');
        masterProject.fundingAgreementCommentsOnDecisionToApprove = req.session.data['fundingAgreementCommentsOnDecisionToApprove'];
        masterProject.fundingAgreementSharepointLink = req.session.data['fundingAgreementSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-funding-agreement-landing-page");
    });

    router.post('/' + version + '/task-funding-agreement-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskFundingAgreementStatus = req.session.data['task-funding-agreement-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/update-school-chair-of-governors', function(req, res) {
        var masterProject = getProject(req);

        masterProject.contactsSchoolChairOfGovernorsName = req.session.data['contactsSchoolChairOfGovernorsName'];
        masterProject.contactsSchoolChairOfGovernorsEmail = req.session.data['contactsSchoolChairOfGovernorsEmail'];

        req.session.data.currentProject = masterProject;

        res.redirect("other-info-contacts-landing-page");
    });

    router.post('/' + version + '/update-multi-academy-trust-chair-of-governors', function(req, res) {
        var masterProject = getProject(req);

        masterProject.contactsMultiAcademyTrustChairOfGovernorsName = req.session.data['contactsMultiAcademyTrustChairOfGovernorsName'];
        masterProject.contactsMultiAcademyTrustChairOfGovernorsEmail = req.session.data['contactsMultiAcademyTrustChairOfGovernorsEmail'];

        req.session.data.currentProject = masterProject;

        res.redirect("other-info-contacts-landing-page");
    });

    router.post('/' + version + '/task-applications-evidence-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.applicationsExceedBreakEvenPupilNumbers = req.session.data['applicationsExceedBreakEvenPupilNumbers'];
        masterProject.applicationsWrittenReferralFromComissioners = req.session.data['applicationsWrittenReferralFromComissioners'];
        applyDateFields(masterProject, req, 'applicationsEvidenceForecastDate');
        applyDateFields(masterProject, req, 'applicationsEvidenceActualDate');
        masterProject.applicationsEvidenceCommentsOnDecisionToApprove = req.session.data['applicationsEvidenceCommentsOnDecisionToApprove'];
        masterProject.applicationsEvidenceReasonNotApplicable = req.session.data['applicationsEvidenceReasonNotApplicable'];
        masterProject.applicationsEvidenceSharepointLink = req.session.data['applicationsEvidenceSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-applications-evidence-landing-page");
    });

    router.post('/' + version + '/task-applications-evidence-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskApplicationsEvidenceStatus = req.session.data['task-applications-evidence-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-accepted-place-offers-evidence-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.acceptedPlaceOffersExceedBreakEvenPupilNumbers = req.session.data['acceptedPlaceOffersExceedBreakEvenPupilNumbers'];
        applyDateFields(masterProject, req, 'acceptedPlaceOffersForecastDate');
        applyDateFields(masterProject, req, 'acceptedPlaceOffersActualDate');
        masterProject.acceptedPlaceOffersCommentsOnDecisionToApprove = req.session.data['acceptedPlaceOffersCommentsOnDecisionToApprove'];
        masterProject.acceptedPlaceOffersReasonNotApplicable = req.session.data['acceptedPlaceOffersReasonNotApplicable'];
        masterProject.acceptedPlaceOffersSharepointLink = req.session.data['acceptedPlaceOffersSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-accepted-place-offers-evidence-landing-page");
    });

    router.post('/' + version + '/task-accepted-place-offers-evidence-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskAcceptedPlaceOffersStatus = req.session.data['task-accepted-place-offers-evidence-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/task-impact-assessment-and-equalities-analysis-landing-page', function(req, res) {
        var masterProject = getProject(req);

        masterProject.impactAssessmentCompleted = req.session.data['impactAssessmentCompleted'];
        applyDateFields(masterProject, req, 'impactAssessmentForecastDate');
        applyDateFields(masterProject, req, 'impactAssessmentActualDate');
        masterProject.impactAssessmentCommentsOnDecisionToApprove = req.session.data['impactAssessmentCommentsOnDecisionToApprove'];
        masterProject.impactAssessmentSharepointLink = req.session.data['impactAssessmentSharepointLink'];

        req.session.data.currentProject = masterProject;

        res.redirect("task-impact-assessment-and-equalities-analysis-landing-page");
    });

    router.post('/' + version + '/task-impact-assessment-and-equalities-analysis-confirmation', function(req, res) {
        var masterProject = getProject(req);

        masterProject.taskImpactAssessmentStatus = req.session.data['task-impact-assessment-and-equalities-analysis-status'];

        req.session.data.currentProject = masterProject;

        res.redirect("project-task-list");
    });

    router.post('/' + version + '/other-info-pupil-numbers-capacity-save', function(req, res) {
        var masterProject = getProject(req);

        masterProject.pupilNumbersFullCapacityNursery = req.session.data['pupil-numbers-full-capacity-nursery'];
        masterProject.pupilNumbersFullCapacityReceptionToYear6 = req.session.data['pupil-numbers-full-capacity-reception-to-year-6'];
        masterProject.pupilNumbersFullCapacityYear7ToYear11 = req.session.data['pupil-numbers-full-capacity-year-7-to-year-11'];
        masterProject.pupilNumbersFullCapacityYear12ToYear14 = req.session.data['pupil-numbers-full-capacity-year-12-to-year-14'];
        masterProject.pupilNumbersFullCapacitySpecialEducationalNeeds = req.session.data['pupil-numbers-full-capacity-special-educational-needs'];
        masterProject.pupilNumbersFullCapacityAlternativeProvision = req.session.data['pupil-numbers-full-capacity-alternative-provision'];

        req.session.data.currentProject = masterProject;

        res.redirect("other-info-pupil-numbers?pupilNumbersJustUpdated=yes");
    });

    router.post('/' + version + '/other-info-pupil-numbers-pre-16-build-up-capacity-save', function(req, res) {
        var masterProject = getProject(req);

        masterProject.pupilNumbersPre16BuildUpNurseryCurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-nursery-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpNurseryFirstYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-first-year'];
        masterProject.pupilNumbersPre16BuildUpNurserySecondYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-second-year'];
        masterProject.pupilNumbersPre16BuildUpNurseryThirdYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-third-year'];
        masterProject.pupilNumbersPre16BuildUpNurseryFourthYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpNurseryFifthYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpNurserySixthYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpNurserySeventhYear = req.session.data['pupil-numbers-pre-16-build-up-nursery-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpReceptionCurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-reception-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpReceptionFirstYear = req.session.data['pupil-numbers-pre-16-build-up-reception-first-year'];
        masterProject.pupilNumbersPre16BuildUpReceptionSecondYear = req.session.data['pupil-numbers-pre-16-build-up-reception-second-year'];
        masterProject.pupilNumbersPre16BuildUpReceptionThirdYear = req.session.data['pupil-numbers-pre-16-build-up-reception-third-year'];
        masterProject.pupilNumbersPre16BuildUpReceptionFourthYear = req.session.data['pupil-numbers-pre-16-build-up-reception-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpReceptionFifthYear = req.session.data['pupil-numbers-pre-16-build-up-reception-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpReceptionSixthYear = req.session.data['pupil-numbers-pre-16-build-up-reception-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpReceptionSeventhYear = req.session.data['pupil-numbers-pre-16-build-up-reception-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear1CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-1-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear1FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear1SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear1ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear1FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear1FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear1SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear1SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-1-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear2CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-2-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear2FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear2SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear2ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear2FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear2FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear2SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear2SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-2-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear3CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-3-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear3FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear3SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear3ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear3FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear3FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear3SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear3SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-3-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear4CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-4-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear4FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear4SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear4ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear4FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear4FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear4SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear4SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-4-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear5CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-5-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear5FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear5SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear5ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear5FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear5FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear5SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear5SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-5-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear6CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-6-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear6FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear6SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear6ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear6FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear6FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear6SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear6SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-6-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear7CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-7-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear7FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear7SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear7ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear7FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear7FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear7SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear7SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-7-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear8CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-8-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear8FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear8SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear8ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear8FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear8FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear8SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear8SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-8-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear9CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-9-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear9FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear9SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear9ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear9FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear9FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear9SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear9SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-9-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear10CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-10-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear10FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear10SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear10ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear10FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear10FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear10SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear10SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-10-seventh-year'];

        masterProject.pupilNumbersPre16BuildUpYear11CurrentCapacity = req.session.data['pupil-numbers-pre-16-build-up-year-11-current-capacity'];
        masterProject.pupilNumbersPre16BuildUpYear11FirstYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-first-year'];
        masterProject.pupilNumbersPre16BuildUpYear11SecondYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-second-year'];
        masterProject.pupilNumbersPre16BuildUpYear11ThirdYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-third-year'];
        masterProject.pupilNumbersPre16BuildUpYear11FourthYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-fourth-year'];
        masterProject.pupilNumbersPre16BuildUpYear11FifthYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-fifth-year'];
        masterProject.pupilNumbersPre16BuildUpYear11SixthYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-sixth-year'];
        masterProject.pupilNumbersPre16BuildUpYear11SeventhYear = req.session.data['pupil-numbers-pre-16-build-up-year-11-seventh-year'];

        req.session.data.currentProject = masterProject;

        res.redirect("other-info-pupil-numbers?pupilNumbersJustUpdated=yes");
    });

    function getProject(req) {
        return req.session.data['project-list'].find(p => p.projectID == req.session.data.currentProject.projectID);
    }

    function applyDateFields(project, req, fieldPrefix)
    {
        project[fieldPrefix + "Day"] = req.session.data[fieldPrefix + "-day"];
        project[fieldPrefix + "Month"] = req.session.data[fieldPrefix + "-month"];
        project[fieldPrefix + "Year"] = req.session.data[fieldPrefix + "-year"];
    }
}