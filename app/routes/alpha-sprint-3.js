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
        // Make a variable to give it the value from the radio buttons on the index page  
        // Check whether the variable matches a condition
        var project = req.session.data['project-list'].find(x => x.projectID == req.query.id)
        console.log(project)
        req.session.data.currentProject = project;
        res.redirect('project-overview');
    })

}