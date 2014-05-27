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
       NIPF: {
        type: String,
        default: '',
        trim: true
    },
    classification: {
        type: String,
        default: '',
        trim: true
    },
     taskNumber: {
        type: String,
        default: '',
        trim: true
    },
     pir: {
        type: String,
        default: '',
        trim: true
    },
      actor: {
        type: String,
        default: '',
        trim: true
    },
    scenarioStatus: {
        type: String,
        default: '',
        trim: true
    },
    analysisStatus: {
        type: String,
        default: '',
        trim: true
    },
    due: {
       type: Date,
        default: Date.now
    },
     user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    discoverable:{
        type: String,
        default: true,
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
    }).populate('user', 'name username roles').exec(cb);
};

mongoose.model('Scenario', ScenarioSchema);
