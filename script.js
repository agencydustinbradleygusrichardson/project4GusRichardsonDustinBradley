myApp = {}

// API THINGS
myApp.apiKey = 'AIzaSyBvRfnsn-GcuAyu3qJVv3zFg8DgPSgmsO8';
myApp.apiUrl = 'https://translation.googleapis.com/language/translate/v2/';
myApp.translateTarget = 'hu'; //hungarian
myApp.translateSource = 'en'; //english
// q is string
myApp.counter = 2;



//COUNTDOWN TICKER
myApp.ticker = () => {
    let time = 10;
    const counting = () => {
        time = time - 1;
        if (time <= 0) {
            clearInterval(countDown);
            $('#timer').replaceWith('<h1>Time up!<h1>');
        }
        document.getElementById('timer').innerHTML = time;
    }
    const countDown = setInterval(counting, 1000);
}
//END COUNTDOWN TICKER


//RANDOM NUMBER GENERATOR FUNCTION HOPEFULLY USED TO TRY AND GET THE RANDOMIZATION TO WORK - NOT CALLED CURRENTLY WILL ONLY DO THIS
myApp.getRanAnswer = () => {
    return Math.floor(Math.random() * 3) + 1
}

// ADD TO COUNTER FUNCTION - NOT CALLED. ADDS TO COUNTER TO CONTROL ROUND. NEEDS TO BE CONNECTED TO SOME KIND OF NEXT ROUND BUTTON OR EVENT
myApp.addToCounter = () => {
    myApp.updateCounter = myApp.counter++;
}

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
    })
}

// write function that randomizes dummy images

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
<<<<<<< HEAD
    $('#container1').append(`<div class='answer1' role='button' tabindex='0'> <img src="./assets/martinLutherKingJr.jpg" alt=""><h4>${myApp.info.dummyAnswers.answer1.author}</h4></div>`)
    $('#container2').append(`<div class='answer2' role='button'  tabindex='0'><img src="./assets/celineDion.jpg" alt=""><h4>${myApp.info.dummyAnswers.answer1.author}</h4></div>`)
    $('#container3').append(`<div class='answer3' role='button'  tabindex='0'> <img src="./assets/marshallMcluhan.jpg" alt=""><h4>${myApp.info.dummyAnswers.answer1.author}</div>`)
    $('#container4').append(`<div class='answer4' role='button'  tabindex='0'><img src="./assets/rosaParks.jpg" alt=""><h4>${myApp.info.dummyAnswers.answer1.author}</h4></div>`)
}

myApp.checkUserResponse = () => {
    $('.imgContainer').on('click', function () {

        if (($(this).find("p")[0].innerHTML) === myApp.info.questions[`quote${[myApp.counter]}`].author) {
            console.log('Yaaas')
        }

    })
}

myApp.answerSelect = () => {
    $('.imgContainer').on('click', function () {
        console.log(($(this).find('img[src="./assets/marshallMcluhan.jpg"')));

    })
=======
    $('#container1').append(`<div class='answer1' role='button' tabindex='0'> <img src="./assets/martinLutherKingJr.jpg" alt=""></div>`)
    $('#container2').append(`<div class='answer2' role='button'  tabindex='0'><img src="./assets/celineDion.jpg" alt=""></div>`)
    $('#container3').append(`<div class='answer3' role='button'  tabindex='0'> <img src="./assets/marshallMcluhan.jpg" alt=""></div>`)
    $('#container4').append(`<div class='answer4' role='button'  tabindex='0'><img src="./assets/rosaParks.jpg" alt=""></div>`)
>>>>>>> 0e77caed270a8a6483b15ca6c592bd5f57f5f434
}



// APP INFO
myApp.info = {
    questions: {
        quote1: {
            author: 'Marshall Mcluhan',
            quoteText: 'Anyone who tries to make a distinction between education and entertainment does not know the first thing about either',
            imgUrl: './assets/marshallMcluhan.jpg',
        },
        quote2: {
            author: 'Martin Luther King, Jr.',
            quoteText: 'The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.',
            imgUrl: './assets/martinLutherKingJr.jpg',

        },
        quote3: {
            author: 'Rosa Parks',
            quoteText: 'I have learned over the years that when one\'s mind is made up, this diminishes fear; knowing what must be done does away with fear.',
            imgUrl: './assets/rosaParks.jpg',

        },
        quote4: {
            author: 'Maya Angelou',
            quoteText: 'We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.',
            imgUrl: './assets/mayaAngelou.jpg',
            dummyAnswers: [

            ]
        }

    },
    dummyAnswers: [
        './assets/celineDion.jpg',
        './assets/georgeWBush.jpeg',
        './assets/abeLincoln.jpg',
        './assets/albertEinstein.jpg',
        './assets/davidSuzuki.jpg',
        './assets/franzKafka.jpg',
        './assets/bruceLee.jpg',
        './assets/anneFrank.jpg',
        './assets/hunterSThompson.jpg',
        './assets/salvadorDali.jpg',
        './assets/steveJobs.png',
        './assets/ghandi.jpg',
        './assets/johnLennon.jpg',
        './assets/winstonChurchill.jpg',
        './assets/peterMnasbridge.jpg'       
    ]
}


myApp.init = () => {
    myApp.sendQueryData();
<<<<<<< HEAD
    myApp.ticker();



=======
    myApp.getPossibleAnswer();
  
    
>>>>>>> 0e77caed270a8a6483b15ca6c592bd5f57f5f434
}

$(function () {
    myApp.init();
<<<<<<< HEAD
    myApp.answerSelect();
    // myApp.ticker();
=======
    
>>>>>>> 0e77caed270a8a6483b15ca6c592bd5f57f5f434


})


        // STUART POSSIBLE ANSWER NOTES> PUT ANSWERS IN NEW ARRAY AND APPEND. ADD A RANDOM NUMBER FUNCTION TO THE FOR EACH SO THAT IT IS CALLED EVERY TIME. THIS WILL GIVE US A RANDOM NUMBER TO PUSH IN FOR EACH ANSWER.


        //FOR EACH ITEM GET A RANDOM NUMBER




// }


        // myApp.info.dummyAnswers.map((item) => item.forEach((item2) => {
        // myApp.ranNum();
        //     myApp.currentAnswers.push(item2);
        //     console.log(myApp.currentAnswers);
        // })
        // );