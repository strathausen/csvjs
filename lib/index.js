(function() {
  module.exports = {
    DEFAULT_OPTIONS: {
      col_sep: ",",
      row_sep: "\n",
      keys: null
    },
    parse: function(data, options, cb, ready) {
      var c, keys, result, results, row, rows, values, _len;
      if (options == null) {
        options = {};
      }
      if (typeof options === 'function') {
        ready = cb;
        cb = options;
        options = {};
      }
      if (data == null) {
        return cb('error no data');
      }
      options = this._extend(this.DEFAULT_OPTIONS, options);
      rows = this._split(data, options.row_sep);
      if (rows[rows.length - 1].length < 5) {
        rows.pop();
      }
      if (options.keys == null) {
        keys = this._split(rows.shift(), options.col_sep);
      }
      results = [];
      for (c = 0, _len = rows.length; c < _len; c++) {
        row = rows[c];
        row = row.replace(/\r$/, '');
        values = this._split(row, options.col_sep);
        result = this._merge(keys, values);
        results.push(result);
        cb(null, result);
      }
      return typeof ready === "function" ? ready(results) : void 0;
    },
    _extend: function(obj, mixin) {
      var method, name;
      for (name in mixin) {
        method = mixin[name];
        obj[name] = method;
      }
      return obj;
    },
    _split: function(data, sep) {
      return data.split(sep);
    },
    _tidy: function(field) {
      return field != null ? field.trim().replace(/^\"/, '').replace(/\"$/, '').trim() : void 0;
    },
    _merge: function(keys, values) {
      var i, key, output, _len;
      output = {};
      for (i = 0, _len = keys.length; i < _len; i++) {
        key = keys[i];
        output[this._tidy(key)] = this._tidy(values[i]);
      }
      return output;
    }
  };
}).call(this);
