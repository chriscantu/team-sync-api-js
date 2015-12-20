var db = require('rethinkdbdash')({host: 'rethinkdb', db: 'teamsync'});

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

    this.get = function (id) {
        return table.get(id).run();
    }

    this.update = function (record) {
        return table.get(record.id).update(record).run().then(function (result) {
            if (result.skipped === 1) {
                return Promise.reject('Not Found');
            }

            return table.get(record.id).run();
        });
    };

    this.delete = function (id) {
        return table.get(id).delete({returnChanges:true}).run().then(function (result) {
            if (result.deleted === 0) {
                return Promise.reject('Not Found');
            }

            return Promise.resolve(result);

        });
    };
};
