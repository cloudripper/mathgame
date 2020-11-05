$('document').ready(function () {
    highScoreAJAX();
    setupGame();
    $('#difEasy').addClass('selectSetting');
    $('#plus').addClass('selectSetting');
   
    $('body').on('click', '#startGameButton', function (event) {
        
        $('#instructions').hide(400);        
        
        $('#boxtest').animate({width: "0"});
        $('#boxtest').animate({height: "0"}, 800, 'swing', function () {
            $('#boxtest').hide();
            $('#boxtest').html('');
            $('.probContainer').animate({width: "50%"}); 
        });
        sec = 10;
        var timeout = setTimeout(function () {
            startGame();
        }, 1000);
    });

    $('body').on('click', '#restartGameButton', function (event) {
        setupGame();
        $('div .startBtn').html('<div class="input-group-prepend" id="startGameButton"><button class="btn border border-light rounded py-0 " type="button">Play Again?</button></div>');
    });
    
    $('body').on('click', '#addItem', function (event) {
        input();
    });
   
    $('body').on('click', '#difEasy', function (event) {
        maxSum = '10';
        $('.rangeBtns').children().removeClass('selectSetting');
        $('#difEasy').addClass('selectSetting');
    })

    $('body').on('click', '#difMed', function (event) {
        maxSum = '50';
        $('.rangeBtns').children().removeClass('selectSetting');
        $('#difMed').addClass('selectSetting');
    })

    $('body').on('click', '#difHard', function (event) {
        maxSum = '100';
        $('.rangeBtns').children().removeClass('selectSetting');
        $('#difHard').addClass('selectSetting');
    })

    $('body').on('click', '#plus', function (event) {
        op = '+';
        randomizedOp = 0;
        $('.mathProblem').html('X' + ' ' + op + ' ' + 'Y');
        $('.opBtns').children().removeClass('selectSetting');
        $('#plus').addClass('selectSetting');
    })
    $('body').on('click', '#minus', function (event) {
        op = '-';
        randomizedOp = 0;
        $('.mathProblem').html('X' + ' ' + op + ' ' + 'Y');
        $('.opBtns').children().removeClass('selectSetting');
        $('#minus').addClass('selectSetting');
    })
    $('body').on('click', '#multiply', function (event) {
        op = 'x';
        randomizedOp = 0;
        $('.mathProblem').html('X' + ' ' + op + ' ' + 'Y');
        $('.opBtns').children().removeClass('selectSetting');
        $('#multiply').addClass('selectSetting');
    })
    $('body').on('click', '#divide', function (event) {
        op = '/';
        randomizedOp = 0;
        $('.mathProblem').html('X' + ' ' + op + ' ' + 'Y');
        $('.opBtns').children().removeClass('selectSetting');
        $('#divide').addClass('selectSetting');
    })
    $('body').on('click', '#randomOp', function (event) {
        randomizedOp = 1;
        
        $('.mathProblem').html('X' + ' [z] ' + 'Y');
        $('.opBtns').children().removeClass('selectSetting');
        $('#randomOp').addClass('selectSetting');
    })

});

var numRange = _.range(1,100);
var randomizedOp = 0;
var op = '+';
var opArr = ['+', '-', 'x', '/']
var probProcess = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    'x': function (x, y) { return x * y },
    '/': function (x, y) { return x / y }
}
var maxSum = '10';
var problemSum = 0;
var userScore = 0;
var highScore;
var sec = 0;
var timer = null;

var rndOp = function () {
    var randomOpArr = _.shuffle(opArr);
    op = _.sample(randomOpArr, 1)
        return;
};

var setupGame = function () {
   $('#boxtest').html('<p class="d-none" id="instructions">&#62; The game: <br/><br/>&#62; You have 10 seconds to answer as many questions as you can. A correct answer will add 1 second to your timer.<br/><br/>&#62; The set-up:<br/><br/>&#62; Range difficulty is the range of possible answers:<br/>&#62;  Easy: max sum of 10<br/>&#62;  Medium: max sum of 50<br/>&#62;  Hard: max sum of 100<br/><br/>&#62; You can also select the operator you wish to challenge yourself with.<br/><br/>&#62; High Score is only kept for Easy Difficulty with Addition operator.<br/><br/>&#62; Good luck!</p>').show(400); 
   $('.probContainer').animate({width: "75%"}); 
   $('#boxtest').animate({width: "90%"});
   $('#boxtest').animate({height: "275px"}, 400, 'swing', function () {
        $('#instructions').hide();
        $('#instructions').removeClass('d-none');
        $('#instructions').show(800); 
    });
    $('#settingsBox').html('<div class="list-group col-6 gameChoiceList text-center"><li class="rangeBtns"><p class="gameChoice mb-0">Choose Range Difficulty</p><button class="btn btn-sm border border-light rounded btnStyle" id="difEasy">Easy</button>   <button class="btn btn-sm border border-light rounded btnStyle" id="difMed">Medium</button><button class="btn btn-sm border border-light rounded btnStyle" id="difHard">Hard</button></li></div><div class="list-group col-6 gameChoiceList text-center pr-3"><li class="opBtns"><p class="gameChoice mb-0">Choose Operator Difficulty</p><button class="btn btn-sm border border-light rounded btnStyle" id="plus">Add</button><button class="btn btn-sm border border-light rounded btnStyle" id="minus">Subtract</button><button class="btn btn-sm border border-light rounded btnStyle" id="multiply">Multiply</button><button class="btn btn-sm border border-light rounded btnStyle" id="divide">Divide</button><button class="btn btn-sm border border-light rounded btnStyle" id="randomOp">Random</button></li></div>').hide().fadeToggle(400);
};


var highScoreAJAX = function () {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/3576?api_key=213',
        dataType: 'json',
        success: function (response, textStatus) {
            console.log(response.task['content']);
            highScore = parseInt(response.task['content']);
            console.log(highScore);
            $('#topScore').html(highScore);
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
};

var highScorePUT = function () {
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/3576?api_key=213',
        contentType: 'application/JSON',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: highScore,
            }
        }),
        success: function (response, textStatus) {
            console.log(response.task['content']);
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
};


var input = function () {

        var input = parseInt($('#inputAnswer').val());
        $('#inputAnswer').attr("placeholder", "Answer");

        console.log("input: " + input);
        if (Number.isInteger(input) == false) {
            $('#inputAnswer').val('');
            $('#inputAnswer').attr("placeholder", "Enter Number");
        } else {
            input = parseInt($('#inputAnswer').val());
            solve(input);
            $('#inputAnswer').val('');
        } 
            
    };

var startGame = function () {
    highScoreAJAX();

    $('#settingsBox').fadeToggle(400).html('');
    
    
    $('#startGameButton').fadeToggle(400).remove();
    
    
    $('div .startBtn').append('<div class="input-group-prepend inputButton"><button class="btn border border-light rounded-left py-0 " type="button" id="addItem">=</button></div><input type="number" name="task" placeholder="Answer" class="pl-2 border border-light border-left-0 rounded-right inputStyle inputButton" id="inputAnswer"/>').hide().fadeToggle(400);
    
    $('#heading').html('Solve this Problem:');

    userScore = 0;
    $('#gameScore').html(userScore);
    
    problem();
    var timeout = setTimeout(function () {
        startTimer();
    }, 1000);
    $('#inputAnswer').focus(function () {
        $('body').keydown('#inputAnswer', function(e) {
            if (gameOn = 1) {
                if (e.keyCode == 13) {
                input();        
                }
            }
        })
    })
    
};

var problem = function () {
    if (randomizedOp == 1) {
        rndOp();
    }
    var rndArray = _.shuffle(numRange);
    var a = parseInt(_.sample(rndArray, 1));
    var b = parseInt(_.sample(rndArray, 1)); 
    var sum = probProcess[op](a, b); 
    
    while (sum > maxSum || sum < 0 || sum != Math.round(sum)) {
        var a = parseInt(_.sample(rndArray, 1));
        var b = parseInt(_.sample(rndArray, 1)); 
        sum = probProcess[op](a, b); 
    }

    $('.mathProblem').html(a + ' ' + op + ' ' + b);
    problemSum = sum;
    console.log(problemSum);
};

var solve = function(answer) {
    if (answer == problemSum) {
        sec++;
        userScore++;
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="correct">Correct!</span>');
        var timeout = setTimeout(function () {
            $('#correct').remove();
        }, 1000);
        $('#gameScore').html(userScore);
        
    }
    if (answer != problemSum) {
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="incorrect">Incorrect!</span>');
        var timeout = setTimeout(function () {
            $('#incorrect').remove();
        }, 1000);
    }
    problem();
};

var scoreEval = function (user, high) {
    if (user == high) {
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="tieHigh">You scored ' + userScore + '! You tied the all-time High Score!</span>').hide().fadeToggle(400);
        var timeout = setTimeout(function () {
            $('#tieHigh').fadeToggle(400, function () {
                $('#tieHigh').remove();
            })
        }, 8000);
    }
    if (user < high) {
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="noHigh">You scored ' + userScore + '! The all-time High Score is ' + highScore + '.</span>').hide().fadeToggle(400);
        var timeout = setTimeout(function () {
            $('#noHigh').fadeToggle(400, function () {
                $('#noHigh').remove();
            })
        }, 8000);
    }
    if (user > high) {
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="newHigh">You set a new High Score of ' + userScore + '!</span>').hide().fadeToggle(400);
        var timeout = setTimeout(function () {
            $('#newHigh').fadeToggle(400, function () {
                $('#newHigh').remove();
            })
        }, 8000);
        highScore = userScore; 
        $('#topScore').html(highScore)
        highScorePUT();

    }
    console.log('high score: ' + high + '. user Score: ' + user);
}

var endGame = function () {
    window.clearInterval(timer);
    timer = null;

    scoreEval(userScore, highScore);

    $('.inputButton').fadeToggle().remove();
    $('div .startBtn').append('<div class="input-group-prepend" id="restartGameButton"><button class="btn border border-light rounded py-0 " type="button">Play Again?</button></div>').hide().fadeToggle(400);
    $('body').off('keydown');
    
    
};


var startTimer = function () {
    if (!timer) {
        $('#solveTime').html(sec);
        timer = setInterval(function () {
            if (sec > 0) {
                sec--; 
                $('#solveTime').html(sec);
            } else if (sec == 0) {
                $('#solveTime').html(sec)
                endGame();
            }
        }, 1000);
    }
};
