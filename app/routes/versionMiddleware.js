
module.exports = function (router, version) {
    const versionData = require('../data/data-' + version);
    router.use('/' + version + '/*', (req, res, next) => {
        var currentVersion = req.session.data['version']
        if(currentVersion !== version)
        {
            console.log('Loading data for ' + version)
            res.locals.data['project-list'] = versionData['project-list']
            currentVersion = version
        }
        next()
       }
    )
}