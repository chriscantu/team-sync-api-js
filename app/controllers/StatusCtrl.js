var ctrl = {};
var dao = require('./../daos/StatusDAO');
ctrl.dao = dao;

ctrl.getByUserDate = function (req, res) {
    var username = req.params['username'],
        statusDate = req.params['statusDate'],
        errorMsg = `username ${username} & status date '${statusDate}'`;

    return ctrl.dao.getByUserDate(username, statusDate).done(function (statuses) {
        return res.json(200, statuses);
    });
};

ctrl.getByUser = function (req, res) {
    var username = req.params['username'];
    console.log('Username', username);
    return ctrl.dao.getByUser(username).done((statuses) => {
        console.log(statuses);
        return res.json(200, statuses);
    });
};

ctrl.getByTeamAndDate = function (req, res) {
    var teamName = req.params['teamName'],
        statusDate = req.params['statusDate'],
        errorMsg = `team name '${teamName}' & status date '${statusDate}'`;

    return ctrl.dao.getByTeamAndDate(teamName, statusDate).done(function (statuses) {
        return res.json(200, statuses);
    });
};

ctrl.update = function (req, res) {
    var status = req.params,
        id = req.params.id;

    return ctrl.dao.update(status).done(function (result) {
        res.json(200, result);
    }).catch(function (error) {
        res.json(404, { msg: `No record with '${id}' found`});
    });
};

ctrl.save = function (req, res) {
    var status = req.params;

    return ctrl.dao.save(status).done(function(result) {
        return res.json(200, result);
    });
};

ctrl.delete = function ( req, res) {
    var id = req.params.id;

    return ctrl.dao.delete(id).then(function (result) {
        return res.json(200, { msg: `Status id: '${id}' deleted successfully`});
    }).catch(function (error) {
        res.json(404, { msg: `No record with '${id}' found`});
    });
};

exports.controller = ctrl;
