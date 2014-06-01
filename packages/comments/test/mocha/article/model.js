'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/comment');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment');

//Globals
var user;
var comment;

//The tests
describe('<Unit Test>', function() {
    describe('Model Comment:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                comment = new Comment({
                    title: 'Comment Title',
                    content: 'Comment Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return comment.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                comment.title = '';

                return comment.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            comment.remove();
            user.remove();
            done();
        });
    });
});
