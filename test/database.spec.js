var Table = require('../app/daos/database').Table,
    _ = require('lodash'),
    chai = require('chai');

chai.should();

describe('Table object', function (){
    var table;

    before(function () {
        table = new Table('statuses');
    });

    describe('instance has CRUD methods', function () {
        it(':save', function (){
            _.has(table, 'save').should.be.true;
        });

        it(':find', function (){
            _.has(table, 'find').should.be.true;
        });

        it(':update', function (){
            _.has(table, 'update').should.be.true;
        });

        it(':delete', function (){
            _.has(table, 'delete').should.be.true;
        });
    });
});
