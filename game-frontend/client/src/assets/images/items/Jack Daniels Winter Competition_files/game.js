/* eslint-disable */

// FIREBASE STUFF
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCexzmZRg2SHN58QqYoxsDxLG7arrLFioA",
  authDomain: "jd-winter-comp-data.firebaseapp.com",
  databaseURL: "https://jd-winter-comp-data.firebaseio.com",
  projectId: "jd-winter-comp-data",
  storageBucket: "jd-winter-comp-data.appspot.com",
  messagingSenderId: "130998411943",
  appId: "1:130998411943:web:32dd61e2dc83cf9654f182",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function getMonthData(month) {
  try {
    return firebase
      .database()
      .ref(month)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  } catch (err) {
    console.log(err);
  }
}

// Run clock
var startDate = new Date("11/1/2020");

function time_remaining(prize_timer) {
  var t = Date.parse(prize_timer) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function run_clock(id, prize_date) {
  var clock = document.getElementById(id);
  // get spans where clock numbers are held
  var days_span = clock.querySelector("#days");
  var hours_span = clock.querySelector("#hours");
  var minutes_span = clock.querySelector("#minutes");
  var seconds_span = clock.querySelector("#seconds");

  function update_clock() {
    var t = time_remaining(prize_date);

    // Update the numbers in each part of the clock
    days_span.innerHTML = t.days;
    hours_span.innerHTML = ("0" + t.hours).slice(-2);
    minutes_span.innerHTML = ("0" + t.minutes).slice(-2);
    seconds_span.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  update_clock();
  var timeinterval = setInterval(update_clock, 1000);
}
run_clock("countdownSection", startDate);

function deleteElements(nodeArr) {
  for (var n = 0; n < nodeArr.length; n++) {
    nodeArr[n].parentNode.removeChild(nodeArr[n]);
  }
}

function dateCheck(from, to, check) {
  var fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);

  if (cDate <= lDate && cDate >= fDate) {
    return true;
  } else {
    return false;
  }
}

function getMonthFromString(month) {
  return new Date(Date.parse(month + "1, 2012")).getMonth();
}

// Probability function
var probability = function (n) {
  return !!n && Math.random() <= n;
};

function calculatePercentage(percent) {
  return (percent / 100) * 1;
}

async function handlePrize(currentDay, card) {
  currentDay = new Date(currentDay);
  currentDay.setMonth(currentDay.getMonth() + 2);
  currentDay.setDate(currentDay.getDay() + 4);

  var currentMonth = currentDay
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  var day = currentDay.getDate();
  // var currentYear = currentDay.getFullYear();
  let correctDates = false;

  try {
    console.log(currentMonth);
    var snapshot = await getMonthData(currentMonth);
    // Once database snapshot has returned
    if (snapshot) {
      console.log(snapshot);
      var flag = false;
      Object.entries(snapshot).map((week) => {
        if (!flag) {
          // check number falls within week
          if (Number(week[0]) <= day && Number(week[0]) + 6 >= day) {
            flag = true;
            console.log(currentDay);
            var weekDate = new Date(`2020/${currentMonth}/${week[0]}`);
            var diffTime = Math.abs(currentDay - weekDate);

            console.log(weekDate);

            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            var tracking = week[1].prize_tracking;
            var prizes = week[1].prizes;

            var currentDayTracking = tracking[diffDays - 1]; // - 1 for array[0]


            Object.entries(prizes).map((prize) => {
              var chance;
              if (prize[1].perDay > currentDayTracking[prize[0]]) {
                chance = probability(calculatePercentage(prize[1].chance));
                if (chance) {
                  console.log("winner", prize[0]);
                } else {
                  console.log("lost", prize[0]);
                }
              } else {
                chance = false;
                console.log("too many items have been won for today");
              }
            });
          } else {
            console.log("date falls outside of month");
            flag = true;
            var priorMonth = await handleMonthSwitch(currentMonth);
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

  function handleCardUpdate(winningItem, didWin, card) {
    var cardPrize = card.children[0].children[1];
    var title = document.querySelector("section.cards h1.motlow.card-title");
    var subtitle = document.querySelector(
      "section.cards h1.motlow.card-subtitle"
    );
    if (didWin) {
      var image = document.createElement("img");
      switch (winningItem) {
        case "hipflasks":
          var hipflask = document.querySelector(
            "div.prize-content#festive_hipflask"
          );
          // sanatize title fields pre entry
          title.innerHTML = "You've won!";
          subtitle.innerHTML = "A Festive Hip flask";
          image.src = "assets/images/hipflask.png";
          image.alt = "Jack Daniels Hipflask";
          image.classList.add("prize-item");
          cardPrize.appendChild(image);

          hipflask.style.display = "block";

          break;
        case "jumpers":
          var jumper = document.querySelector(
            "div.prize-content#festive_jumper"
          );

          title.innerHTML = "You've won!";
          subtitle.innerHTML = "A Festive Jack Jumper";

          image.src = "assets/images/jumper.png";
          image.alt = "Jack Daniels Festive Jumper";
          image.classList.add("prize-item");
          cardPrize.appendChild(image);

          jumper.style.display = "block";

          break;
        case "socks":
          var socks = document.querySelector("div.prize-content#festive_socks");
          title.innerHTML = "You've won!";
          subtitle.innerHTML = "A pair of festive socks";

          image.src = "assets/images/socks.png";
          image.alt = "Jack Daniels Festive Socks";
          image.classList.add("prize-item");
          cardPrize.appendChild(image);

          socks.style.display = "block";
          break;
        default:
          // something went wrong
          break;
      }
    } else {
      var image = document.createElement("IMG");
      var noWin = document.querySelector("div.prize-content#no_winner");

      image.src = "assets/images/x.svg";
      image.alt = "Jack Daniels not a winner";
      image.classList.add("prize-item");
      cardPrize.appendChild(image);
      title.innerHTML = "No luck today!";

      subtitle.remove();

      noWin.style.display = "block";
    }
  }

  var form = new FormData();

  // URL Params sent from prior page
  var params = new URLSearchParams(window.location.search);
  // add search params to form data
  params.forEach(function (value, key) {
    form.append(key, value);
  });
  console.log(...form);
  /*
   *
   * Competition runs for 10 weeks - from 1st Nov until 3rd Jan (beginning week number) - 10th Jan
   *
   * There are 3 Prizes - Hipflask - Socks - Jumpers
   * Winners per day needs to scale from 12 on the first 2 weeks
   *
   * FIRST WEEK:
   * Hipflasks: 39 : 5.571% : 5
   * Socks: 20 : 2.857% : 2
   * Jumpers: 25 : 3.571% : 3
   *
   * Total Winners per day 12 for 84 in the first week
   *
   * Handle week
   * Find out current week against potential preset week nodes (unless JS can handle this determination)
   * set up object for win potentials on items and assign to weeks
   *
   */
}

// function handleCard(card) {
//   var eventParent = card.parentNode;
//   var offsetRight =
//     eventParent.parentNode.offsetWidth -
//     eventParent.offsetLeft -
//     eventParent.offsetWidth;

//   // determine card orentation for animation
//   //!TODO: THIS DOESNT WORK FOR MOBILE
//   if (offsetRight === 0) {
//     // card is right - add 34% right
//     console.log("right card");
//     let start = Date.now();
//     let timer = setInterval(function () {
//       let timePassed = Date.now() - start;
//       if (timePassed >= 500) {
//         clearInterval(timer);
//         card.classList.add("open");
//         card.parentNode.classList.add("center-card");
//         var prize = card.parentNode.children[1].children[0].attributes[1].value;
//         showRewardText(prize);
//         setTimeout(function () {
//           card.parentNode.children[1].classList.add("show");
//         }, 250);
//         return;
//       }
//       card.parentNode.style.right = timePassed / 14.2 + "%";
//     }, 5);
//   } else if (eventParent.offsetLeft === 0) {
//     // card is left - move to 34% left
//     let start = Date.now();
//     let timer = setInterval(function () {
//       let timePassed = Date.now() - start;
//       if (timePassed >= 500) {
//         clearInterval(timer);
//         card.classList.add("open");
//         card.parentNode.classList.add("center-card");
//         var prize = card.parentNode.children[1].children[0].attributes[1].value;
//         showRewardText(prize);
//         return;
//       }
//       card.parentNode.style.left = timePassed / 14.2 + "%";
//     }, 5);
//   } else {
//     card.parentNode.style.left = "34%";
//     card.classList.add("open");
//     card.parentNode.classList.add("center-card");
//     var prize = card.parentNode.children[1].children[0].attributes[1].value;
//     showRewardText(prize);
//   }
// }

function handleCardMobile(card) {
  var eventParent = card.parentNode;

  console.log(eventParent);
  setTimeout(function () {
    card.classList.add("open");
  }, 300);
}

var claimPrize = document.querySelector("button.claim");

claimPrize.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("claimed");
  var prizeContent = document.querySelectorAll("div.prize-content");
  var claimMessage = document.querySelector("div.prize-claimed");
  for (var i = 0; i < prizeContent.length; i++) {
    prizeContent[i].style.display = "none";
  }

  claimMessage.style.display = "block";
});

var clickDisable = false;
var cards = document.querySelectorAll("div.card");
var removeCards = [];
cards.forEach(function (card) {
  card.addEventListener("click", function (event) {
    var parent = card.parentNode;
    // only run if its been clicked once, prevents reclicking for now
    if (!clickDisable) {
      for (var c = 0; c < parent.children.length; c++) {
        var innerCard = parent.children[c].children[0];
        if (innerCard.children[0].id !== event.target.id) {
          parent.children[c].classList.add("fadeout");
          removeCards.push(parent.children[c]);
        } else {
          handleCardMobile(event.target);
        }
      }
      setTimeout(function () {
        deleteElements(removeCards);
        clickDisable = true;
      }, 300);
    } else {
      return false;
    }

    handlePrize(Date.now(), card); // - prize forfillment
  });
});
