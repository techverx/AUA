'use strict';

var comments = require('../controllers/comments');

// Comment authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.comment.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Comments, app, auth) {

    app.route('/comments')
        .get(comments.all)
        .post(auth.requiresLogin, comments.create);
    app.route('/comments/:articleId')
        .get(comments.show)
        .put(auth.requiresLogin, hasAuthorization, comments.update)
        .delete(auth.requiresLogin, hasAuthorization, comments.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', comments.comment);
};
