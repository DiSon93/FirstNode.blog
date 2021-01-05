const mongoose = require('../../util/mongoose');
const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    home(req, res, next) {
        // res.json({
        //    name: 'text'
        // })

        // Course.find({}, function (err, courses) {
        //    if (!err) {
        //       res.json(courses);
        //    } else{
        //       next(err);
        //       res.status(500).json({ error: 'ERROR!!!!' });
        //    }

        // });

        //Cách viết với promise
        Course.find({})
            // .then(courses => res.render('home',{
            // courses,
            .then((courses) => {
                // courses = courses.map(course => course.toObject())
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })

            // }))
            .catch(next);

        // res.json({
        //    name: 'text'
        // });
        //   res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
