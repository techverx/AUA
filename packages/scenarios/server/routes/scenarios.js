'use strict';

var scenarios = require('../controllers/scenarios');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.scenario.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Scenarios, app, auth) {

    app.route('/scenarios')
        .get(scenarios.all)
        .post(auth.requiresLogin, scenarios.create);
    app.route('/scenarios/:scenarioId')
        .get(scenarios.show)
        .put(auth.requiresLogin, hasAuthorization, scenarios.update)
        .delete(auth.requiresLogin, hasAuthorization, scenarios.destroy);

    // Finish with setting up the articleId param
    app.param('scenarioId', scenarios.scenario);
};
