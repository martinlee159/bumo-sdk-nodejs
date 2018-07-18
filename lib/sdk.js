'use strict';

const merge = require('merge-descriptors');
const wrap = require('co-wrap-all');
const is = require('is-type-of');
const Util = require('./util');
const Account = require('./account');
const Asset = require('./asset');
const Blob = require('./blockchain/blob');
const Transaction = require('./blockchain/transaction');
const Log = require('./log');
const Operation = require('./operation');
const Contract = require('./contract');

module.exports = BUMOSDK;

function BUMOSDK(options) {
  if (!(this instanceof BUMOSDK)) {
    return new BUMOSDK(options);
  }

  if (options && options.inited) {
    this.options = options;
  } else {
    this.options = BUMOSDK.initOptions(options);
  }

  this.util = new Util(this.options);
	this.account = new Account(this.options);
  this.transaction = new Transaction(this.options);
  this.asset = new Asset(this.options);
  this.blob = new Blob(this.options);
  this.log = new Log(this.options);
  this.operation = new Operation(this.options);
  this.contract = new Contract(this.options);
}

BUMOSDK.initOptions = function initOptions(options) {
  if (!is.object(options)) {
    throw new Error('options is require, it must be an object');
  }

  if (!is.string(options.host)) {
    throw new Error('host must be a non-empty string');
  }

  const opts = {};

  Object.keys(options).forEach(key => {
    if (options[key] !== undefined) {
      opts[key] = options[key];
    }
  });

  opts.secure = opts.secure || false;
  opts.inited = true;
  return opts;
};