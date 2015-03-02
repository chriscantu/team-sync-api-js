var db = require('rethinkdbdash')({host: 'localhost', db: 'teamsync'});

exports.Table = function Table(tableName) {
    var table = db.table(tableName);

    this.save = function (record) {
        return table.insert(record).run().then(function (result) {
            var key = result['generated_keys'][0];
            return table.get(key).run();
        });
    };

    this.find = function (queryObj) {
        return table.filter(queryObj).run().then(function (result) {
            var obj = {};

            obj[tableName] = result;
            obj.total = result.length;
                        
            return obj;
        });
    };

    this.update = function (record) {
        return table.get(record.id).update(record).run();
    };

    this.delete = function (id) {
        return table.get(id).delete().run();
    };
};
