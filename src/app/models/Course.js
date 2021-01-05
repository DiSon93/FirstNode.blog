const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        // author: ObjectId,
        // _id:  { type:Number},
        name: { type: String, maxlength: 255 },
        description: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 255 },
        videoId: { type: String, maxlength: 255 },
        level: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        // _id: false,
        timestamps: true,
    },
);

//Add plugin
mongoose.plugin(slug);
// Course.plugin(AutoIncrement);

// CourseSchema.plugin(AutoIncrement);

CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', CourseSchema);
