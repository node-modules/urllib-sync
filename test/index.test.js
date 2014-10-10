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

describe('urllib-sync', function () {
  describe('request()', function () {
    it('should request gbk ok', function () {
      var res = urllib.request('http://www.tmall.com');
      var data = iconv.decode(res.data, 'gbk');
      data.should.containEql('天猫');
      res.status.should.equal(200);
    });

    it('should request text ok', function () {
      var res = urllib.request('http://npm.taobao.org', {
        dataType: 'text'
      });
      res.data.should.containEql('淘宝 NPM 镜像');
      res.status.should.equal(200);
    });

    it('should request json ok', function () {
      var res = urllib.request('http://registry.npm.taobao.org/koa', {
        dataType: 'json'
      });
      res.data.name.should.equal('koa');
      res.status.should.equal(200);
    });

    it('should timeout', function () {
      try {
        urllib.request('http://www.baidu.com', {
          dataType: 'text',
          timeout: 10
        });
        throw new Error('should not exec');
      } catch (err) {
        err.message.should.containEql('timeout');
      }
    });
  });
});
