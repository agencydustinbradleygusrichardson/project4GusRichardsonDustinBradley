myApp = {}

// API THINGS
myApp.apiKey = 'AIzaSyBvRfnsn-GcuAyu3qJVv3zFg8DgPSgmsO8';
myApp.apiUrl = 'https://translation.googleapis.com/language/translate/v2/';
myApp.translateTarget = 'hu'; //hungarian
myApp.translateSource = 'en'; //english
// q is string
myApp.counter = 1;

//RANDOM NUMBER GENERATOR FUNCTION HOPEFULLY USED TO TRY AND GET THE RANDOMIZATION TO WORK - NOT CALLED CURRENTLY WILL ONLY DO THIS
myApp.getRanAnswer = () => {
    return Math.floor(Math.random() * 2) + 1
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
    $('#container1').css({ "background-image": "url('assets/celineDion.jpg')" })
    $('#container2').css({
        "background-image": "url('assets/rosaParks.jpg')"
    })
    $('#container3').css({
        "background-image": "url('assets/mayaAngelou.jpg')"
    })
    $('#container4').css({
        "background-image": "url('assets/martinLutherKingJr.jpg')"
    })
}

// APP INFO
myApp.info = {
    questions: {
        quote1: {
            author: 'Marshall Mcluhan',
            quoteText: 'The medium is the message',
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
        }

    },
    dummyAnswers: {
        answer1: {
            author: 'Celine Dion',
            imgUrl: './assets/celineDion.jpg',
        },
        answer2: {
            author: ''
        }
    }
}

myApp.init = () => {
    myApp.sendQueryData();

}

$(function () {
    myApp.init();
})


        // STUART POSSIBLE ANSWER NOTES> PUT ANSWERS IN NEW ARRAY AND APPEND. ADD A RANDOM NUMBER FUNCTION TO THE FOR EACH SO THAT IT IS CALLED EVERY TIME. THIS WILL GIVE US A RANDOM NUMBER TO PUSH IN FOR EACH ANSWER.


        // myApp.info.dummyAnswers.map((item) => item.forEach((item2) => {
        //     myApp.currentAnswers.push(item2);
        //     console.log(myApp.currentAnswers);
        // })
        // );