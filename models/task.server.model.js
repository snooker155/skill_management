const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TaskSchema = new Schema({
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
    process: {
        type: Schema.ObjectId,
        ref: 'Process'
    },
    status: {
        type: String,
        default: 'active'
    },
    completed: {
        type: Boolean,
        default: false
    },
    // progress: {
    //     type: Number,
    //     default: 0
    // },
    assign_to: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    from: {
        type: Date,
        default: Date.now
    },
    due_to: {
        type: Date,
        default: Date.now
    },
    todos: {},
    tags: {},
    activities: {},
});

mongoose.model('Task', TaskSchema);