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

}