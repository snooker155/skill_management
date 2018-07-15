const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ProcessSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: "Title can't be blank"
    },
    comment: {
        type: String,
        default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Active',
        trim: true
    },
    // due_to: {
    //     type: Date,
    //     default: Date.now
    // },
    // progress: {
    //     type: String,
    //     default: 0
    // },
    // tasks: [{ type: Schema.ObjectId, ref: 'Task' }],
    // team: {},
    // tags: {},
    // activities: {}
});

mongoose.model('Process', ProcessSchema);