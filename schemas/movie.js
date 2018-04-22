var mongoose = require('mongoose');
// 模式
var MovieSchema = new mongoose.Schema({
  title: String,
  doctor: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});
// 模式方法 -  每次存数据前都要调用判断是否是新增
MovieSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next(); // 方法执行完后 继续其他执行
});

MovieSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb);
  }
};

module.exports = MovieSchema;
