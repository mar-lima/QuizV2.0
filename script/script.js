//function clock
function currentTime() {
  let date = new Date();

  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let ms = date.getMilliseconds();
  let session = "AM";

  if (hh == 0) {
    hh = 24;
  }
  if (hh > 24) {
    hh = hh - 24;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " ";

  document.getElementById("clock").innerHTML = time;
  let t = setTimeout(() => {
    currentTime();
  }, 1000);
}

//==========================================================
let currentquestion = 0;
let time = 5;

const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn-2");
// let next = document.querySelector("[data-btn]");

// btn.addEventListener("click", init);
btn2.addEventListener("click", addTime);

//init time
function init() {
  const t = setInterval(() => {
    time--;
    if (time == 0) {
      currentquestion++;
      time = 5;
      reset(t);
      showQuestion();
    }

    document.getElementById("time-ss").innerHTML = `${time}`;
  }, 1000);
}

let reset = (t) => {
  if (currentquestion >= quiz.length) {
    time = 5;
    currentquestion = quiz.length;
    console.log("nesse reset");
    clearInterval(t);
  }
};

// aditional time
function addTime() {
  if (btn.disabled == false) {
    time += 10;
    document.getElementById("time-ss").innerHTML = `${time}`;
  }
}

//show Options window ===============================================

function showQuestion() {
  let q = quiz[currentquestion];
  let optionsHtml = "";

  document.querySelector(".question").innerHTML = q.question;

  for (let i in q.options) {
    optionsHtml += `<div class="option" data-op="${i}">${q.options[i]}</div>`;
  }
  document.querySelector(".options").innerHTML = optionsHtml;

  document.querySelectorAll(".options .option").forEach((item) => {
    item.addEventListener("click", optionClickEvent);
  });
}
//escolher opçao de resposta
function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));
  let option =
    document.querySelectorAll(".option")[quiz[currentquestion].answer];

  if (quiz[currentquestion].answer === clickedOption) {
    option.style.background = "#09c413";
    currentquestion = currentquestion;
  } else {
    option.style.background = "#d62c5a";
  }
  if (time == 0) {
    // init()
  }
}

showQuestion();

//button next questions

// next.addEventListener("click", () => {
//   currentquestion++;

//   if (currentquestion >= quiz.length) {
//     currentquestion = 0;
//   }
//   showQuestion();
//   console.log('certo')
// });

init();
