'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Scenario = mongoose.model('Scenario'),
    _ = require('lodash');


/**
 * Find scenario by id
 */
exports.scenario = function(req, res, next, id) {
    Scenario.load(id, function(err, scenario) {
        if (err) return next(err);
        if (!scenario) return next(new Error('Failed to load scenario ' + id));
        req.scenario = scenario;
        next();
    });
};

/**
 * Create an scenario
 */
exports.create = function(req, res) {
    var scenario = new Scenario(req.body);
    scenario.user = req.user;

    scenario.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                scenario: scenario
            });
        } else {
            res.jsonp(scenario);
        }
    });
};

/**
 * Update an scenario
 */
exports.update = function(req, res) {
    var scenario = req.scenario;

    scenario = _.extend(scenario, req.body);

    scenario.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                scenario: scenario
            });
        } else {
            res.jsonp(scenario);
        }
    });
};

/**
 * Delete an scenario
 */
exports.destroy = function(req, res) {
    var scenario = req.scenario;

    scenario.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                scenario: scenario
            });
        } else {
            res.jsonp(scenario);
        }
    });
};

/**
 * Show an scenario
 */
exports.show = function(req, res) {
    res.jsonp(req.scenario);
};

/**
 * List of Scenarios
 */
exports.all = function(req, res) {
    Scenario.find().sort('-created').populate('user', 'name username').exec(function(err, scenarios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(scenarios);
        }
    });
    
};
