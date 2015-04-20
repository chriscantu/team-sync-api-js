var ctrl = require('../app/controllers/StatusCtrl').controller,
    sinon = require('sinon'),
    chai = require('chai'),
    chaiPromise = require('chai-as-promised');
    dao = {};

require('sinon-as-promised');
chai.use(chaiPromise);
var expect = chai.expect;

describe('StatusCtrl', function () {
    var req = {},
        res = {};

    before(function () {
        req = { params: {
            username: 'chriscantu',
            statusDate: '2015-04-01',
            id: '1' }
        };

        ctrl.dao = dao;
    });

    describe('Status Controller methods', function () {
        it(':getByUserDate', function () {
            dao.getByUserDate = sinon.stub();
            dao.getByUserDate.resolves({total:1, statuses: [{id:1}]});

            ctrl.getByUserDate(req, res);
            expect(dao.getByUserDate.calledOnce).to.be.true;
        });

        it(':getByTeamAndDate', function () {
            dao.getByTeamAndDate = sinon.stub();
            dao.getByTeamAndDate.resolves({total: 1, statuses: [{id:1}]});

            ctrl.getByTeamAndDate(req, res);
            expect(dao.getByTeamAndDate.calledOnce).to.be.true;
        });

        it(':save', function () {
            dao.save = sinon.stub();
            dao.save.resolves({id: '1'});

            ctrl.save(req, res);
            expect(dao.save.calledOnce).to.be.true;
        });

        it(':update', function () {
            dao.update = sinon.stub();
            dao.update.resolves({id:1});

            ctrl.update(req, res);
            expect(dao.update.calledOnce).to.be.true;
        });
    });

});
