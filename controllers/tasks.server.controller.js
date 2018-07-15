const Task = require('mongoose').model('Task');

exports.create = (req, res, next) => {
    let task = new Task(req.body);
    task.save(function (err) {
        if(err){
            return next(err);
        }else{
            res.json(task);
        }
    });
};

exports.list = (req, res, next) => {
    Task.find({}, (err, tasks) => {
        if(err){
            return next(err);
        }else{
            res.json(tasks);
        }
    })
};

exports.read = (req, res) => {
    res.json(req.task);
};

exports.taskByID = (req, res, next, id) => {
    Task.findOne({
            _id: id
        },
        (err, task) => {
            if(err){
                next(err);
            }else{
                req.task = task;
                next();
            }
        }
    )
};

exports.update = (req, res, next) => {
    Task.findByIdAndUpdate(req.task.id, req.body, (err, task) => {
        if(err){
            return next(err);
        }else{
            res.json(task);
        }
    })
};

exports.delete = (req, res, next) => {
    req.task.remove((err) => {
        if(err){
            return next(err);
        }else{
            res.json(req.task);
        }
    })
};
