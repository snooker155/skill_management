const System = require('mongoose').model('System');

exports.create = (req, res, next) => {
    let system = new System(req.body);
    system.save(function (err) {
        if(err){
            return next(err);
        }else{
            res.json(system);
        }
    });
};

exports.list = (req, res, next) => {
    System.find({}, (err, systems) => {
        if(err){
            return next(err);
        }else{
            res.json(systems);
        }
    })
};

exports.read = (req, res) => {
    res.json(req.system);
};

exports.systemByID = (req, res, next, id) => {
    System.findOne({
            _id: id
        },
        (err, system) => {
            if(err){
                next(err);
            }else{
                req.system = system;
                next();
            }
        }
    )
};

exports.update = (req, res, next) => {
    System.findByIdAndUpdate(req.system.id, req.body, (err, system) => {
        if(err){
            return next(err);
        }else{
            res.json(system);
        }
    })
};

exports.delete = (req, res, next) => {
    req.system.remove((err) => {
        if(err){
            return next(err);
        }else{
            res.json(req.system);
        }
    })
};
