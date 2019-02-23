myApp = {}

// API THINGS
myApp.apiKey = 'AIzaSyBvRfnsn-GcuAyu3qJVv3zFg8DgPSgmsO8';
myApp.apiUrl = 'https://translation.googleapis.com/language/translate/v2/';
myApp.translateTarget = 'hu'; //hungarian
myApp.translateSource = 'en'; //english
// q is string
myApp.counter = 1;



//COUNTDOWN TICKER
$('.imgContainer').click(function () {
    $(this).data('clicked', true)
})

myApp.countDown;
myApp.ticker = () => {

    let time = 10;
    const counting = () => {
        myApp.stopTimer();
        time = time - 1;

        if (time <= 0) {
            clearInterval(myApp.countDown);
            $('#timer').replaceWith('<h1> Time Up!</h1>')
        }
        document.getElementById('timer').innerHTML = time;
    }
    myApp.countDown = setInterval(counting, 1000);
}

myApp.stopTimer = () => {
    $('.imgContainer').on('click', function () {
        clearInterval(myApp.countDown)
    })
}

// myApp.resetTimer = () => {
//     $('.nextRound').on('click', function () {
//         myApp.ticker();
//     })
// }
//END COUNTDOWN TICKER


//RANDOM NUMBER GENERATOR FUNCTION HOPEFULLY USED TO TRY AND GET THE RANDOMIZATION TO WORK - NOT CALLED CURRENTLY WILL ONLY DO THIS

// ADD TO COUNTER FUNCTION - NOT CALLED. ADDS TO COUNTER TO CONTROL ROUND. NEEDS TO BE CONNECTED TO SOME KIND OF NEXT ROUND BUTTON OR EVENT
// myApp.addToCounter = () => {
//     myApp.updateCounter = myApp.counter++;
// }

// SENDING SEARCH QUERY FOR THE FIRST TIME - CALLED IN FUNCTION INIT
myApp.sendQueryData = () => {
    $.ajax({
        url: myApp.apiUrl,
        method: 'GET',
        data: {
            key: myApp.apiKey,
            source: myApp.translateSource,
            target: myApp.translateTarget,
            dataType: 'JSON',
            //NEED TO UPDATE QUOTE NUMBER WITH COUNTER FUNCTION
            q: myApp.info.questions[`quote${[myApp.counter]}`].quoteText,
        }
    }).then(function (data) {
        const translatedText = data.data.translations[0].translatedText;
        myApp.returnQueryData(translatedText);
    })
}

// RETURN BACK THE TRANSLATED QUERY - CALLED IN SEND QUERY FUNCTION. PASSES IN THE ORIGINALLY TRANSLATED DATA AND RETURNS IT BACK IN ENGLISH.
myApp.returnQueryData = (translateQuery) => {
    $.ajax({
        url: myApp.apiUrl,
        method: 'GET',
        data: {
            key: myApp.apiKey,
            source: myApp.translateTarget,
            target: myApp.translateSource,
            dataType: 'JSON',
            q: translateQuery,
        }

    }).then(function (data) {
        const finalTranslation = data.data.translations[0].translatedText;
        myApp.appendQuestion(finalTranslation);
        myApp.appendAnswers();
        myApp.ticker();



    })
}



// function to append dummy images to DOM

//function to append the question to the DOM

//function to update score and trigger next round


// APPENDS QUESTION TO SCREEN DYNAMICALLY - PASSED IN TRANSLATED TEXT. CALLED IN THEN FUNCTION OF RETURNQUERYDATA. AKA ONCE WE HAVE THE DATA THROW THE QUESTION UP
myApp.appendQuestion = (newText) => {
    $('.question').empty().append(`${newText}`);
}

// APPENDS POSSIBLE ANSWERS TO SCREEN DYNAMICALLY - CALLED IN THEN FUNCTION OF RETURNQUERYDATA. AKA ONCE WE HAVE THE DATA THROW THE QUESTION UP
myApp.appendAnswers = () => {
    //USE TEMPLATE LITERALS IN ORDER TO GET A RANDOM URL()
    $('#container1').append(`<div class='answer1' id='answer' tabindex="0" role="button" aria-pressed="false" aria-disabled='true'> <img src="${myApp.info.questions[`quote${[myApp.counter]}`].dummyAnswers[0]}" alt=""></div>`)

    $('#container2').append(`<div class='answer2' id='answer' tabindex="0" role="button" aria-pressed="false"><img src="${myApp.info.questions[`quote${[myApp.counter]}`].dummyAnswers[1]}" alt=""></div>`)

    $('#container3').append(`<div class='answer3'  id='answer' tabindex="0" role="button" aria-pressed="false"> <img src="${myApp.info.questions[`quote${[myApp.counter]}`].dummyAnswers[2]}" alt=""></div>`)

    $('#container4').append(`<div class='answer4'  id='answer' tabindex="0" role="button" aria-pressed="false"><img src="${myApp.info.questions[`quote${[myApp.counter]}`].dummyAnswers[3]}" alt=""></div>`)
}






// APP INFO
myApp.info = {
    questions: {
        quote1: {
            author: 'Marshall Mcluhan',
            quoteText: 'Anyone who tries to make a distinction between education and entertainment does not know the first thing about either',
            imgUrl: './assets/marshallMcluhan.jpg',
            dummyAnswers: [
                './assets/celineDion.jpg',
                './assets/georgeWBush.jpeg',
                './assets/abeLincoln.jpg',
                './assets/marshallMcluhan.jpg'

            ]
        },
        quote2: {
            author: 'Martin Luther King, Jr.',
            quoteText: 'The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.',
            imgUrl: './assets/martinLutherKingJr.jpg',
            dummyAnswers: [
                './assets/albertEinstein.jpg',
                './assets/davidSuzuki.jpg',
                './assets/franzKafka.jpg',
                './assets/martinLutherKingJr.jpg'
            ]

        },
        quote3: {
            author: 'Rosa Parks',
            quoteText: 'I have learned over the years that when one\'s mind is made up, this diminishes fear; knowing what must be done does away with fear.',
            imgUrl: './assets/rosaParks.jpg',
            dummyAnswers: [
                './assets/bruceLee.jpg',
                './assets/anneFrank.jpg',
                './assets/hunterSThompson.jpg',
                './assets/rosaParks.jpg'

            ]

        },
        quote4: {
            author: 'Maya Angelou',
            quoteText: 'We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.',
            imgUrl: './assets/mayaAngelou.jpg',
            dummyAnswers: [
                './assets/salvadorDali.jpg',
                './assets/steveJobs.png',
                './assets/ghandi.jpg',
                './assets/mayaAngelou.jpg'
            ]
        }

    },
    // dummyAnswers: [

    //     './assets/johnLennon.jpg',
    //     './assets/winstonChurchill.jpg',
    //     './assets/peterMnasbridge.jpg'
    // ]
}


// SCORE FUNCTIONALITY
myApp.startScore = 0;


// ADD ONE TO SCORE
myApp.updateScore = function () {
    myApp.startScore++;
    $('#score').empty();
    $('#score').append(`${myApp.startScore}`);
}

// MINUS ONE TO SCORE
myApp.reduceScore = function () {
    myApp.startScore--;
    $('#score').empty();
    $('#score').append(`${myApp.startScore}`);
}



// WHAT HAPPENS WHEN WE CLICK ON AN ANSWER
myApp.answerSelect = () => {
    $('.imgContainer').on('click', function () {

        // CHECKS IF ANSWER IS CORRECT
        if ($(this).find('img').attr('src') === myApp.info.questions[`quote${[myApp.counter]}`].imgUrl) {

            $('.question').empty().append(`<h2>Correct!</h2>`)

            $('.imgContainer').not(this).css({
                display: 'none',
            })

            $(this).css({
                transform: 'scale(1.5)',
            })

            myApp.updateScore();
            $('.nextRound').removeAttr('disabled')
            console.log(myApp.startScore)

        } else if ($(this).find('img').attr('src') !== myApp.info.questions[`quote${[myApp.counter]}`].imgUrl) {
            $('.nextRound').removeAttr("disabled");
            $('.question').empty().append(`<h2>Wrong!</h2>`)
            $('.imgContainer').if(this).css({
                display: 'none',
            })


            //    $('.imgContainer').find('img').attr("src").css({
            //        transform: 'scale(1.5)',

            //    })

            myApp.reduceScore();

            console.log(myApp.startScore)


        } else {

            // $('#timer').replaceWith('<h1> Time Up!</h1>')
            $('.nextRound').removeAttr('disabled')
        }
    });
};

console.log($('#timer')[0])

        myApp.reset = () => {
            $('.question').empty();
            $('.imgContainer').empty();
            $('#timer').empty();

            $('.imgContainer').css({
                display: 'inline-flex',
                transform: 'scale(1)'
            })


        }

        myApp.nextRound = () => {
            $('.nextRound').on('click', function () {
                $('.nextRound').attr('disabled', 'disabled');
                myApp.counter++
                myApp.reset();
                myApp.sendQueryData();


            })
        }




        myApp.init = () => {
            myApp.sendQueryData();
            myApp.answerSelect();
            // myApp.stopTimer();
            // myApp.resetTimer();
            myApp.nextRound();


        }

        $(function () {

            // START OF GAME
            // $('.letsPlay').on('click', function () {
            //     $('.startGame').animate({
            //         height: '0'
            //     }, 'slow').empty()

            //     $('.nextRound').attr('disabled', 'disabled');
                myApp.init();

            })



        // })


        // STUART POSSIBLE ANSWER NOTES> PUT ANSWERS IN NEW ARRAY AND APPEND. ADD A RANDOM NUMBER FUNCTION TO THE FOR EACH SO THAT IT IS CALLED EVERY TIME. THIS WILL GIVE US A RANDOM NUMBER TO PUSH IN FOR EACH ANSWER.


        //FOR EACH ITEM GET A RANDOM NUMBER




        // }


        // myApp.info.dummyAnswers.map((item) => item.forEach((item2) => {
        // myApp.ranNum();
        //     myApp.currentAnswers.push(item2);
        //     console.log(myApp.currentAnswers);
        // })
        // );