 (function() {
  var questions = [{
    question: "1.  Virus Corona (COVID-19) yang menyerang manusia muncul di negara ... pada awal tahun 2020.",
    choices: [" Italia", " Amerika", " Rusia", " China"],
    correctAnswer: 3
  }, {
    question: "Virus corona (COVID-19) dibawa oleh hewan... dan menular kepada manusia.",
    choices: [" Ayam", " Bebek", " Burung", " Kalelawar"],
    correctAnswer: 3
  }, {
    question: "B COVID-19 bisa masuk melalui anggota-anggota tubuh di bawah ini, kecuali...",
    choices: ["Telinga", "Mata", "Hidung", "Mulut"],
    correctAnswer: 0
  }, {
    question: "Suhu tubuh yang bisa diindikasikan sedang terjangkit penyakit termasuk COVID-19 yaitu...",
    choices: ["35.0C" , "36.0C", "37.0C", "38.0C"],
    correctAnswer: 3
  }, {
    question: "Masa inkubasi COVID-19 selama...",
    choices: ["10 Hari", "14 Hari", "20 Hari", "24 Hari"],
    correctAnswer: 1
  }];
 
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
 
  // Display initial question
  displayNext();
 
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
   
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {       
      return false;
    }
    choose();
   
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
 
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
   
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
 
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
   
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
 
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
 
  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
   
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
   
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
   
    return qElement;
  }
 
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
 
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
 
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
     
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
       
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
         
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
 
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
   
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
   
    score.append('Kamu Menjawab ' + numCorrect + ' pertanyaan dari ' +
                 questions.length + ' right!!!');
    return score;
  }
})();