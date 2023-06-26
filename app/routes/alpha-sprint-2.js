// Add your routes here - above the module.exports line
var versionMiddleware = require("./versionMiddleware")

module.exports = function (router) {

    var version = "alpha-sprint-2";

    versionMiddleware(router, version);

    router.post('/' + version + '/choose-create-method', function (req, res) {
        // Make a variable to give it the value from the radio buttons on the index page  
        var Task = req.session.data['create-new-fss-methods']

        // Check whether the variable matches a condition
        if (Task == "individual") { 
            res.redirect('create-new-fss-confirmation')
        }   
        else if (Task == "bulk") {
            res.redirect('create-new-fss-confirmation')
        }

    })

}