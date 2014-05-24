'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Scenario Schema
 */
var ScenarioSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    classification: {
        type: String,
        default: 'Unclassified',
        trim: true
    },
    scenarioStatus: {
        type: String,
        default: 'Draft',
        trim: true
    },
    analysisStatus: {
        type: String,
        default: '--',
        trim: true
    },
    due: {
        type: String,
        default: '--',
        trim: true
    },
     user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
/**
 * Validations
 */
ScenarioSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
ScenarioSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Scenario', ScenarioSchema);
