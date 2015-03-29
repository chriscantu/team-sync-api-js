var dao = require('./../daos/StatusDAO'),
    handleError = function (res, id, optMsg, optStatus) {
        optStatus = optStatus ? optStatus : 404;
        optMsg = optMsg ? optMsg : `No record(s) with '${id}'' found`
        res.json(optStatus, optMsg);
    };

exports.getByUserDate = function (req, res) {
    var username = req.params['username'],
        statusDate = req.params['statusDate'],
        errorMsg = `username '${username}' & status date '${statusDate}'`;

    return dao.getByUserDate(username, statusDate).done(function (statuses) {
        return res.json(200, statuses);
    });
};

exports.getByTeamAndDate = function (req, res) {
    var teamName = req.params['teamName'],
        statusDate = req.params['statusDate'],
        errorMsg = `team name '${teamName}' & status date '${statusDate}'`;

    return dao.getByTeamAndDate(teamName, statusDate).then(function (statuses) {
        return res.json(200, statuses);
    });
};

exports.save = function (req, res) {
    var status = req.params;

    return dao.save(status).then(function (result) {
        return res.json(201, result);
    });
};

exports.update = function (req, res) {
    var status = req.params,
        id = req.params.id;

    return dao.update(status).then(function (result) {
        res.json(200, result);
    }).catch(function (error) {
        res.json(404, { msg: `No record with '${id}' found`});
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    return dao.delete(id).then(function (result) {
        res.json(200, { msg: `Status record '${id}' deleted.`});
    }).catch(handleError(res, id));
};
