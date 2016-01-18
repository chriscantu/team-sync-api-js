var Table = require('./database').Table,
    table = new Table('statuses');

exports.getByUser = function(username) {
  return table.find({username: username});
};

exports.getByUserDate = function (username, statusDate) {
    return table.find({username: username, statusDate: statusDate});
};

exports.getByTeamAndDate = function (teamName, statusDate) {
    return table.find({teamName: teamName, statusDate:statusDate});
}

exports.save = function (status) {
    return table.save(status);
};

exports.update = function (status) {
    return table.update(status);
};

exports.delete = function (id) {
    return table.delete(id);
};
