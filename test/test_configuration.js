//
// Tests configuration files.
//
var fs = require('fs')
var path = require('path')
var should = require('should')
var expect = require('chai').expect

//
// Configuration files.
//
var Dev = require('../config/dev')
var Prod = require('../config/prod')
var Database = require('../config/db')

describe('Configuration files.', function () {
  it('Configuration files should be JSON objects.', function (done) {
    expect(typeof (Dev)).to.equal('object')
    expect(typeof (Prod)).to.equal('object')
    expect(typeof (Database)).to.equal('object')
    done()
  })

  it('Configuration files should contain a version number.', function (done) {
    expect(Dev).to.have.a.property('version')
    expect(Prod).to.have.a.property('version')
    done()
  })

  it('Configuration files have complete objects.', function (done) {
    expect(Dev).to.have.a.property('version')
    expect(Dev).to.have.a.property('description')
    expect(Dev).to.have.a.property('repository')
    expect(Dev).to.have.a.property('maintainer')

    expect(Prod).to.have.a.property('version')
    expect(Prod).to.have.a.property('description')
    expect(Prod).to.have.a.property('repository')
    expect(Prod).to.have.a.property('maintainer')
    done()
  })

  it('The database configuration file should contain a database URL.', function (done) {
    expect(Database).to.have.a.property('url')
    done()
  })

})

describe('Folder structure.', function () {
  it('Log folder should exist.', function (done) {
    var base_directories = fs.readdirSync(path.dirname(__dirname))
    base_directories.should.containEql('log')
    done()
  })

})
