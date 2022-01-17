/*!
 * urllib-sync - test/index.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var urllib = require('..');
var iconv = require('iconv-lite');
var fs = require('fs');

describe('urllib-sync', function () {
  describe('request()', function () {

    it('should request text ok', function () {
      this.timeout(30000);
      var res = urllib.request('http://npm.taobao.org', {
        dataType: 'text',
        timeout: 30000
      });
      res.data.should.containEql('淘宝 NPM 镜像');
      res.status.should.equal(200);
    });

    it('should request json ok', function () {
      this.timeout(30000);
      var res = urllib.request('http://registry.npm.taobao.org/koa', {
        dataType: 'json',
        timeout: 30000
      });
      res.data.name.should.equal('koa');
      res.status.should.equal(200);
    });

    it('should timeout', function () {
      try {
        urllib.request('http://npm.taobao.org', {
          dataType: 'text',
          timeout: 10
        });
        throw new Error('should not exec');
      } catch (err) {
        err.message.should.match(/timeout/i);
      }
    });

    it('should writeFile ok', function () {
      this.timeout(4000);
      var res = urllib.request('https://npm.taobao.org/', {
        writeFile: './tmp'
      });
      res.status.should.equal(200);
      var data = iconv.decode(fs.readFileSync('./tmp'), 'utf-8');
      data.should.containEql('淘宝 NPM 镜像');
      fs.unlinkSync('./tmp');
    });

    it('should not write file when status 302', function () {
      this.timeout(4000);
      var res = urllib.request('http://www.taobao.com/not/exist/file/path', {
        writeFile: './404file'
      });
      res.status.should.equal(301);
      res.data.toString().should.match(/301/);
      fs.existsSync('./404file').should.equal(false);
    });
  });
});