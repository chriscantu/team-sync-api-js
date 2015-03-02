var Table = require('./database').Table,
    table = new Table('statuses');

exports.getByUserDate = function (username, statusDate) {
    return table.find({username: username, statusDate: statusDate});
};

exports.save = function (status) {
    return table.save(status);
};

exports.update = function (status) {
    return table.update(status);
};

exports.delete = function (id) {
    return table.delete(id);
};
