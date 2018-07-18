'use strict';

const errors = require('../exception');

const proto = exports;

proto.buSendOperation = function(args) {
  try {
    const schema = {
      sourceAddress: {
        required: false,
        string: true,
        address: true,
      },
      destAddress: {
        required: true,
        string: true,
        address: true,
      },
      buAmount: {
        required: true,
        numeric: true,
      },
      metadata: {
        required: false,
        string: true,
        hex: true,
      }
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    // return {
    //   type: 'payCoin',
    //   data: args,
    // }

    return this._responseData({
      operation: {
        type: 'payCoin',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};