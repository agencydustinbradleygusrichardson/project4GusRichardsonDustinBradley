myApp = {}

myApp.apiKey = 'AIzaSyBvRfnsn-GcuAyu3qJVv3zFg8DgPSgmsO8';
myApp.apiUrl = 'https://translation.googleapis.com/language/translate/v2/';
myApp.translateTarget = 'hu'; //hungarian
myApp.translateSource = 'en'; //english
// q is string
myApp.counter = 2;

myApp.thing = 'quote3'

// myApp.updateCounter = counter++;

myApp.sendQueryData = () => {
    console.log(myApp.info.questions.`quote${[myApp.counter]}`.quoteText)
    $.ajax({
        url: myApp.apiUrl,
        method: 'GET',
        data: {
            key: myApp.apiKey,
            source: myApp.translateSource,
            target: myApp.translateTarget,
            dataType: 'JSON',
            //NEED TO UPDATE QUOTE NUMBER WITH COUNTER FUNCTION
            q: myApp.info.questions.quote.quoteText,
        }
    }).then(function (data) {
        const translatedText = data.data.translations[0].translatedText;
        myApp.returnQueryData(translatedText);
    })
    
}

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
        $('.appendHere').append(`${data.data.translations[0].translatedText}`);
    })
}


myApp.info = {
    questions : {
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
        quote: {
            author: 'Rosa Parks',
            quoteText: 'I have learned over the years that when one\'s mind is made up, this diminishes fear; knowing what must be done does away with fear.',
            imgUrl: './assets/rosaParks.jpg',
               
        },
        quote: {
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