var express = require('express');
var path = require('path');
var _ = require('underscore');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var serveStatic = require('serve-static');
var port = process.env.PORT || 3100;
var app = express();
// 传入本地数据库
mongoose.connect('mongodb://localhost/moo');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(serveStatic('public'));
app.use(serveStatic('public'));
// app.use(express.static(path.join(__dirname, 'bower_components')));

app.listen(port);

console.log('moo started on port ' + port);

// index page
//  路由匹配规则， 回调方法
app.get('/', function(req, res) {

  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    // console.log(movies);
    res.render('index', {
      title: 'moo 首页',
      movies: movies
    })
  })
})
app.get('/movie/:id', function(req, res) {
  var id = req.params.id;
  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'moo - ' + movie.title,
      movie: movie
    })
  })
})
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
      if (err) {
        console.log(err);
      }
      res.render('list', {
        title: 'moo  列表页',
        movies: movies
      })
    })
  })
  // list 页面点击更新
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function(err, movie) {
      console.log(movie)
      res.render('admin', {
        title: 'moo 后台更新页面',
        movie: movie
      })
    })
  }
})

// amdin post movie
app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      })
    })
  } else {
    _movie = new Movie({
      title: movieObj.title,
      doctor: movieObj.doctor,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
    _movie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id);
    })
  }
})

app.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: 'moo 后台录入',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

app.delete('/admin/list', function(req, res) {
  var id = req.query.id;
  if (id) {
    Movie.remove({
      _id: id
    }, function(err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        });
      }
    })
  }
})
