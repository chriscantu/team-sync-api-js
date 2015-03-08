var dao = require('./../daos/StatusDAO');

exports.getByUserDate = function (req, res) {
    var username = req.params['username'],
        statusDate = req.params['statusDate'];

    return dao.getByUserDate(username, statusDate).done(function (statuses) {
        return res.json(200, statuses);
    });
};

exports.getByTeamAndDate = function (req, res) {
    var teamName = req.params['teamName'],
        statusDate = req.params['statusDate'];

    return dao.getByTeamAndDate(teamName, statusDate).done(function (statuses) {
        return res.json(200, statuses);
    });
};

exports.save = function (req, res) {
    var status = req.params;

    return dao.save(status).done(function (result) {
        return res.json(201, result);
    });
};

exports.update = function (req, res) {
    var status = req.params;

    return dao.update(status).done(function (result) {
        return res.json(200, result)
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    return dao.delete(id).done(function (result) {
        //This should be done in the db file but bluebird in rethinkdbdash can't deal with exceptions
        if (result.deleted === 0) {
            res.json(404, { msg: `Status record '${id}' not found.`});
        } else {
            res.json(200, { msg: `Status record '${id}' deleted.`});
        }
    });
};
