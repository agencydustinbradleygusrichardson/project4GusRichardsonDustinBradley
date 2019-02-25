app = {}

// API THINGS
app.apiKey = "AIzaSyBvRfnsn-GcuAyu3qJVv3zFg8DgPSgmsO8";
app.apiUrl = "https://translation.googleapis.com/language/translate/v2/";
app.translateSource = "en"; //english
// q is string
app.counter = 1;


app.translateTarget = $("#userLang").val();



//COUNTDOWN TICKER
$(".imgContainer").click(function () {
    $("imgContainer").data("clicked", true)
})

app.countDown;
app.ticker = () => {

    let time = 10;
    const counting = () => {
        app.stopTimer();
        time = time - 1;

        if (time <= 0) {
            clearInterval(app.countDown);
            $("#timer").replaceWith("<h1> Time Up!</h1>")
        }
        document.getElementById("timer").innerHTML = time;
    }
    app.countDown = setInterval(counting, 1000);
}

app.stopTimer = () => {
    $(".imgContainer").on("click", function () {
        clearInterval(app.countDown)
    })
}

app.resetTimer = () => {
    $(".nextRound").on("click", function () {
        clearInterval(app.ticker())

    })
}
//END COUNTDOWN TICKER

// SENDING SEARCH QUERY FOR THE FIRST TIME - CALLED IN FUNCTION INIT
app.sendQueryData = () => {
    $.ajax({
        url: app.apiUrl,
        method: "GET",
        data: {
            key: app.apiKey,
            source: app.translateSource,
            target: app.translateTarget,
            dataType: "JSON",
            //NEED TO UPDATE QUOTE NUMBER WITH COUNTER FUNCTION
            q: app.info.questions[`quote${[app.counter]}`].quoteText,
        }
    }).then(function (data) {

        const translatedText = data.data.translations[0].translatedText;

        app.returnQueryData(translatedText);
    })
}

// RETURN BACK THE TRANSLATED QUERY - CALLED IN SEND QUERY FUNCTION. PASSES IN THE ORIGINALLY TRANSLATED DATA AND RETURNS IT BACK IN ENGLISH.
app.returnQueryData = (translateQuery) => {
    $.ajax({
        url: app.apiUrl,
        method: "GET",
        data: {
            key: app.apiKey,
            source: app.translateTarget,
            target: app.translateSource,
            dataType: "JSON",
            q: translateQuery,
        }

    }).then(function (data) {

        const finalTranslation = data.data.translations[0].translatedText;

        app.appendQuestion(finalTranslation);

        app.appendAnswers();

        app.ticker();

    })
}

// APPENDS QUESTION TO SCREEN DYNAMICALLY - PASSED IN TRANSLATED TEXT. CALLED IN THEN FUNCTION OF RETURNQUERYDATA. AKA ONCE WE HAVE THE DATA THROW THE QUESTION UP
app.appendQuestion = (newText) => {

    $(".question").empty()
        .append(`<p>${newText}</P>`);
}

// APPENDS POSSIBLE ANSWERS TO SCREEN DYNAMICALLY - CALLED IN THEN FUNCTION OF RETURNQUERYDATA. AKA ONCE WE HAVE THE DATA THROW THE QUESTION UP
app.appendAnswers = () => {

    $("#container1").append(`<a href='#'><div class="answer1" id="answer" tabindex="0" role="button" aria-pressed="false"> <img src="${app.info.questions[`quote${[app.counter]}`].dummyAnswers[0]}" alt=""></div></a>`)

    $("#container2").append(`<a href="#"><div class="answer2" id="answer" tabindex="0" role="button" aria-pressed="false"><img src="${app.info.questions[`quote${[app.counter]}`].dummyAnswers[1]}" alt=""></div></a>`)

    $("#container3").append(`<a href="#"><div class="answer3"  id="answer" tabindex="0" role="button" aria-pressed="false"> <img src="${app.info.questions[`quote${[app.counter]}`].dummyAnswers[2]}" alt=""></div></a>`)

    $("#container4").append(`<a href="#"><div class="answer4"  id="answer" tabindex="0" role="button" aria-pressed="false"><img src="${app.info.questions[`quote${[app.counter]}`].dummyAnswers[3]}" alt=""></div></a>`)
}

// APP INFO
app.info = {
        questions: {
            quote1: {
                author: "Marshall Mcluhan",
                quoteText: "Anyone who tries to make a distinction between education and entertainment does not know the first thing about either",
                imgUrl: "./assets/marshallMcluhan.jpg",
                dummyAnswers: [
                    "./assets/celineDion.jpg",
                    "./assets/georgeWBush.jpeg",
                    "./assets/abeLincoln.jpg",
                    "./assets/marshallMcluhan.jpg"

                ],
                altText: [
                    "Celine Dion",
                    "George W Bush",
                    "Abraham Lincoln",
                    "Marshall Mcluhan",

                ]
            },
            quote2: {
                author: "Martin Luther King, Jr.",
                quoteText: "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.",
                imgUrl: "./assets/martinLutherKingJr.jpg",
                dummyAnswers: [
                    "./assets/albertEinstein.jpg",
                    "./assets/davidSuzuki.jpg",
                    "./assets/franzKafka.jpg",
                    "./assets/martinLutherKingJr.jpg"
                ],
                altText: [
                    "Albert Einstein",
                    "David Suzuki",
                    "Franz Kafka",
                    "Martin Luther King, Jr."
                ]
            },
            quote3: {
                author: "Rosa Parks",
                quoteText: "I have learned over the years that when one\"s mind is made up, this diminishes fear; knowing what must be done does away with fear.",
                imgUrl: "./assets/rosaParks.jpg",
                dummyAnswers: [
                    "./assets/bruceLee.jpg",
                    "./assets/anneFrank.jpg",
                    "./assets/hunterSThompson.jpg",
                    "./assets/rosaParks.jpg"
                ],
                altText: [
                    "Bruce Lee",
                    "Anne Frank",
                    "Hunter S Thompson",
                    "Rosa Parks"
                ]

            },
            quote4: {
                author: "Maya Angelou",
                quoteText: "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.",
                imgUrl: "./assets/mayaAngelou.jpg",
                dummyAnswers: [
                    "./assets/salvadorDali.jpg",
                    "./assets/steveJobs.png",
                    "./assets/ghandi.jpg",
                    "./assets/mayaAngelou.jpg"
                ],
                altText: [
                    "Salvador Dali",
                    "Steve Jobs",
                    "Ghandi",
                    "Maya Angelou",
                ]
            },
            quote5: {
                author: "Abraham Lincoln",
                quoteText: "Folks are usually about as happy as they make their minds up to be",
                imgUrl: "./assets/abeLincoln.jpg",
                dummyAnswers: [
                    "./assets/johnLennon.jpg",
                    "./assets/abeLincoln.jpg",
                    "./assets/winstonChurchill.jpg",
                    "./assets/peterMansbridge.jpg"
                ],
                altText: [
                    "John Lennon",
                    "Abraham Lincoln",
                    "Winston Churchill",
                    "Peter Mansbridge"
                ]
            }
        }
    },

    app.endGame = () => {
        if (app.counter === 5) {

            app.endScreen = () => {

            }

            $(".endScreen").delay(1000).animate({
                width: "100%"
            })

            $(".endScreen p").delay(1500).animate({
                opacity: "1",
            })
            $(".endScreen h1").delay(1500).animate({
                opacity: "1"
            })

            $("body").css({
                "overflow": "hidden"
            })

            $(window).scrollTop(0);

            appendScore = () => {
                $(".appendFinalUserScore").fadeIn().append(`<h2>Your score is ${app.startScore}</h2>`);

            }

            setTimeout(appendScore, 1700);
        }
    }

// SCORE FUNCTIONALITY


app.startScore = 0;

// ADD ONE TO SCORE
app.updateScore = function () {
    app.startScore++;
    $("#score").empty();
    $("#score").append(`${app.startScore}`);
}

// MINUS ONE TO SCORE
app.reduceScore = function () {
    app.startScore--;
    $("#score").empty();
    $("#score").append(`${app.startScore}`);
}

// WHAT HAPPENS WHEN WE CLICK ON AN ANSWER
app.answerSelect = () => {

    $(".imgContainer").on("click", function () {
        // CHECKS IF ANSWER IS CORRECT
        if ($(this).find("img").attr("src") === app.info.questions[`quote${[app.counter]}`].imgUrl) {

            $(".nextRound").removeAttr("disabled");
            $(".question").empty().append(`<h2>Correct!</h2>
            <p>${app.info.questions[`quote${[app.counter]}`].quoteText}</p>
            <P id = 'authorName'> -${ app.info.questions[`quote${[app.counter]}`].author}`)

            $(".imgContainer").not(this).css({
                display: "none",
            })

            if ($(window).width() > 750) {

                $(this).css({
                    transform: "scale(1.5)",
                })
            }

            app.updateScore();
            app.endGame();

        } else {

            $(".nextRound").removeAttr("disabled");
            $(".question").empty().append(`
            <h2>Wrong!</h2>
            <p>${app.info.questions[`quote${[app.counter]}`].quoteText}</p>
            <P id = 'authorName'> -${ app.info.questions[`quote${[app.counter]}`].author} `);

            $(".imgContainer").css({
                "opacity": "0"
            })
            $(".answerPopUp").css({
                "z-index": "5"
            });
            $(".imageAnswers").append(`<div class="answerPopUp"><img src=${app.info.questions[`quote${[app.counter]}`].imgUrl}></div>`);
            app.endGame();
            app.reduceScore();

        }
    })
};

app.reset = () => {
    $(".question").empty();
    $(".imgContainer").empty();
    $("#timer").empty();
    $("answerPopUp").empty();

    $(".imgContainer").css({
        display: "inline-flex",
        transform: "scale(1)"
    })
}

app.nextRound = () => {
    $(".nextRound").on("click", function () {

        $(".nextRound").attr("disabled", "disabled");

        app.counter++;

        app.reset();

        app.sendQueryData();

        $(".imgContainer").css({
            "opacity": 1
        });

        $(".answerPopUp").css({
            "opacity": "0",
            "z-index": "-1"
        });
    })
}

app.init = () => {

    app.sendQueryData();
    app.answerSelect();
    app.nextRound();

}
$(function () {

    // START OF GAME
    $(".letsPlay").on("click", function () {

        $(".startGame").animate({
                height: "0"
            }, "slow")
            .empty()

        $("body").css({
            "overflow": "visible"
        })

        $(".nextRound").attr("disabled", "disabled");

        app.init();
    })
})