var db = require('rethinkdb');
var connect;

db.connect({host: 'rethinkdb.service.consul', timeout: 1},
  (err, connection) => {
    connect = connection;
  });
db.dbCreate('teamSync');
db.connect({db: 'teamSync'}, (err, connection) => {
  connect = connection;
});

exports.Table = function Table(tableName) {
    db.tableCreate(tableName);
    var table = db.table(tableName);

    this.save = function (record) {
        return table.insert(record).run(connect).then(function (result) {
            var key = result['generated_keys'][0];
            return table.get(key).run();
        });
    };

    this.find = function (queryObj) {
        return table.filter(queryObj).run(connect).then(function (result) {
            console.log('Query');
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
