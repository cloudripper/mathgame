$('document').ready(function () {
    $('body').on('click', '#startGameButton', function (event) {
        sec = 10;
        startGame();
    });
    
    $('body').on('click', '#addItem', function (event) {
            input();
    });
});

var numRange = _.range(2,100);
var op = '+';
var probProcess = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    'x': function (x, y) { return x * y },
    '/': function (x, y) { return x / y }
}
var maxSum = '10';
var problemSum = 0;
var userScore = 0;
var highScore = 0;
var sec = 0;
var timer = null;


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
   
    $('#startGameButton').remove();
    $('div .startBtn').append('<div class="input-group-prepend inputButton"><button class="btn border border-light rounded-left py-0 " type="button" id="addItem">=</button></div><input type="number" name="task" placeholder="Answer" class="pl-2 border border-light border-left-0 rounded-right inputStyle inputButton" id="inputAnswer"/>');
    startTimer();
    problem();
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
    
    var rndArray = _.shuffle(numRange);
    var a = parseInt(_.sample(rndArray, 1));
    var b = parseInt(_.sample(rndArray, 1)); 
    var sum = probProcess[op](a, b); 
    
    while (sum > maxSum || sum < 0) {
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
        //$('.inputStyle').addClass('correctAnswer');
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

var endGame = function () {
    window.clearInterval(timer);
    timer = null;
    
    $('.inputButton').remove();
    $('div .startBtn').append('<div class="input-group-prepend" id="startGameButton"><button class="btn border border-light rounded py-0 " type="button">Play Again?</button></div>');
    $('body').off('keydown');
    
    if (userScore = highScore) {
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="tieHigh">You scored ' + userScore + '! You tied the all-time High Score! Nice work.</span>');
        var timeout = setTimeout(function () {
            $('#tieHigh').remove();
        }, 8000);
    }
    if (userScore < highScore) {
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="noHigh">You scored ' + userScore + '! The all-time High Score is' + highScore + '.</span>');
        var timeout = setTimeout(function () {
            $('#noHigh').remove();
        }, 8000);
    }
    if (userScore > highScore) {
        
        $('#announceBox').html('<span class="border border-light rounded px-2 py-1" id="newHigh">You set a new High Score of ' + userScore + '!</span>');
        var timeout = setTimeout(function () {
            $('#newHigh').remove();
        }, 8000);
        highScore = userScore; 
    }
    
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
