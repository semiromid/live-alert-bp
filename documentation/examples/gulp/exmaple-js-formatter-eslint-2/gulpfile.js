
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterESlint = require("live-alert-bp-formatter-eslint"),
  plumber = require('gulp-plumber'),
  compiler = require('webpack'),  
  webpack = require('webpack-stream'),
  eslint = require('gulp-eslint');

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'}),
  liveAlertMessages = {
    ESLint: []
  };

const 
  jsWatch = 'src/js/**/*.js',
  jsSrc = ['src/js/index.js'],
  jsDest = 'build';


function esLint() {
  return gulp.src(jsSrc)
  .pipe(plumber({errorHandler: onError}))       
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.format(formatterESLint))
  .pipe(eslint.failAfterError());
}


function js() {
  return gulp.src(jsSrc)  
    .pipe(plumber({errorHandler: onError}))   
    .pipe(webpack({
        mode: 'development',
      }, compiler, function(err, stats) {

        if (stats.hasErrors()) {
          formatterWebpack(stats, 'Error');
        }
      }
    ))    
    .pipe(gulp.dest(jsDest));
}


function alert(cb){

  if(liveAlertMessages.ESLint.length > 0){
    const 
      userStyle = {}, 
      filter = []; // ['warning']
    
    liveAlert.open(
      //liveAlertFormatterESlint(liveAlertMessages.ESLint, userStyle, filter)
      liveAlertFormatterESlint(liveAlertMessages.ESLint)
    );
  }

  liveAlert.close();
  liveAlert.reloadNotification();
  liveAlert.resetError();

  liveAlertMessages.ESLint = [];

  cb();
}


function onError(err){

  if(liveAlert.hasError() === false){
    if(err.plugin === ''){
      
    }
  }

  this.emit('end');
}


function formatterWebpack(stats, labelname){
  const info = stats.toJson();

  let 
    backgroundColor,
    color;

  if(labelname === 'Error'){
    backgroundColor = '#ff0000';
    color = '#ffffff';
  }else 
  if(labelname === 'Warning'){
    backgroundColor = '#ffff00';
    color = '#000000';
  }

  info.errors.forEach(function(msg){

    liveAlert.open([
      {
        label: {
          style: { 
              backgroundColor: backgroundColor, 
              color: color 
          }, 
          name: labelname               
        }, 
        message: '<br>'
          + '<span style="opacity: 0.5;">File:</span> ' + msg.moduleName + '<br>'
          + '<span style="opacity: 0.5;">Loc:</span> ' + msg.loc + '<br>'
          + '<span style="opacity: 0.5;">Reason:</span> ' + msg.message
      }
    ]);

  });
}


function formatterESLint(messages){
  liveAlertMessages.ESLint = liveAlertMessages.ESLint.concat(messages);
}


function watch(){
  liveAlert.run();

  gulp.watch(jsWatch, gulp.series(esLint, js, alert));
}


exports.esLint = esLint;
exports.js = js;
exports.watch = watch;
exports.alert = alert;
