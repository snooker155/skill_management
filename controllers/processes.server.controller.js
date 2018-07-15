const Process = require('mongoose').model('Process');

exports.create = (req, res, next) => {
    let process = new Process(req.body);
    process.save(function (err) {
        if(err){
            return next(err);
        }else{
            res.json(process);
        }
    });
};

exports.list = (req, res, next) => {
    Process.find({}, (err, processes) => {
        if(err){
            return next(err);
        }else{
            res.json(processes);
        }
    })
};

exports.read = (req, res) => {
    res.json(req.process);
};

exports.processByID = (req, res, next, id) => {
    Process.findOne({
            _id: id
        },
        (err, process) => {
            if(err){
                next(err);
            }else{
                req.process = process;
                next();
            }
        }
    )
};

exports.update = (req, res, next) => {
    Process.findByIdAndUpdate(req.process.id, req.body, (err, process) => {
        if(err){
            return next(err);
        }else{
            res.json(process);
        }
    })
};

exports.delete = (req, res, next) => {
    req.process.remove((err) => {
        if(err){
            return next(err);
        }else{
            res.json(req.process);
        }
    })
};
