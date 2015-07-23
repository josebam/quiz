var models = require('../models/models.js')

//Auto load

exports.load = function(req, res){
  models.Quiz.find(quizId).success(function(quiz){
    if (quiz){
      req.quiz = quiz;
      next();
    }else{
      next(new Error('No existe quizId='+quizId));
    }

  }).catch(function(error){next(error);});
};


//GET /quizes
exports.index = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/index.ejs', {quizes: quizes});
  });
};

//GET /quizes/question
exports.show = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/show', {quiz: req.quiz});
  });
};

//GET /quizes/answer
exports.answer = function(req, res){

  models.Quiz.findAll().success(function(quiz){
    var resultado = 'Incorrecto';
    if( req.query.respuesta === req.quiz.respuesta){
      resultado = 'Correcto';
    }

    res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado})

  });



};
