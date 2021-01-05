const mongoose = require('../../util/mongoose');
const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { renderSync } = require('node-sass');
const { response } = require('express');
class CourseController {
    //Cách viết với promise

    show(req, res, next) {
        //   res.send('Course Detail - ' + req.params.slug);
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[GET]
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST]courses/store
    store(req, res, next) {
        // res.render('courses/create')
        // res.json(req.body);
        const formData = req.body;
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.findOne({})
            .sort({ _id: 'desc' })
            .then((lastestCourse) => {
                // return res.json(lastestCourse);

                // req.body._id = lastestCourse._id + 1;
                const course = new Course(formData);
                course
                    .save()
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
            });
    }
    //[GET] courses/::id/edit
    edit(req, res, next) {
        // res.render('courses/edit')
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[PUT] courses/update
    update(req, res, next) {
        // res.json(req.body);
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //[DELETE] courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then((course) => res.redirect('back'))
            .catch(next);
    }

    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then((course) => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST]/courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then((course) => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!!!' });
        }
    }

    //GET/ POST / PUT/ PATCH / DELETE  / OPTION / HEAD
}
module.exports = new CourseController();
