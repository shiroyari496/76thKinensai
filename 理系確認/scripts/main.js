"use strict";

let checkbox = document.getElementById("checkbox");
let checkboxBox = document.getElementById("checkboxBox");
let test = document.getElementById("test");
let sentakushi = [];
let result = document.getElementById("result");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let goButton = document.getElementById("Go");
let info = document.getElementById("info");

let sentaku = [7, 133, 143, 9973, 11111, 1021, 1001, 28, 57];
let answer = [1, 0, 0, 1, 0, 1, 0, 0, -1];
let isSelected = [];
let sentakushiTextSize = [];

for(let i = 1; i <= 9; i ++) {
  sentakushi.push(document.getElementById(`sentaku${i}`));
  isSelected.push(false);
  sentakushiTextSize.push(1);
}


function isNotPrime(num) {
  for(let i = 2; i <= Math.sqrt(num); i ++) {
    if(num % i == 0) {
      return i;
    }
  }
  return 0;
}

function hideTest() {
  test.style.display = "none";
}

function showTest() {
  test.style.display = "";
}

function makeSentaku() {
  let primeCount = Math.floor(Math.random()*4)+2;
  let difficultly = [
    0,  //2,5で割れる6桁未満
    0,  //2,5で割れる6桁以上, 3で割れる6桁未満, 11で割れる2桁
    0,  //3で割れる6桁以上, 7で割れる6桁未満, 11,13で割れる4桁未満
    0,  //それ以外の合成数
    0,  //19までの素数
    0   //23以降の素数
  ];

  for(let i = 0; i < 9;) {
    let number = nums[Math.floor(Math.random()*nums.length)];
    if(! sentaku.includes(number)) {
      let minDivisor = isNotPrime(number);
      let digits = String(number).length;
      let flag = -1;
      if(minDivisor) {
        if((minDivisor == 2 || minDivisor == 5) && (digits < 6))
          if(difficultly[0] <= (9-primeCount)*0.25+0.25)
            flag = 0;
          else;
        else if(
          ((minDivisor == 2 || minDivisor == 5) && (digits >= 6)) ||
          ((minDivisor == 3) && (digits < 6)) ||
          ((minDivisor == 11) && (digits == 2))
        ) if(difficultly[1] <= (9-primeCount)*0.25+0.75)
            flag = 1;
          else;
        else if(
          ((minDivisor == 3) && (digits >= 6)) ||
          ((minDivisor == 7) && (digits < 6)) ||
          ((minDivisor == 11 || minDivisor == 13) && (digits < 4))
        ) if(difficultly[2] <= (9-primeCount)*0.25+0.5)
            flag = 2;
          else;
        else
          if(difficultly[3] <= (9-primeCount)*0.25)
            flag = 3;
          else;
      } else {
        if(number <= 19)
          if(difficultly[4] <= primeCount*0.5)
            flag = 4;
          else;
        else
          if(difficultly[5] <= primeCount*0.5+0.5)
            flag = 5;
          else;
      }

      if(flag != -1) {
        sentaku[i] = number;
        difficultly[flag] ++;
        i ++;
      }
    }
  }

  sentaku.sort(() => Math.random() - Math.random());
  for(let i = 0; i < 9; i ++) {
    answer[i] = (! isNotPrime(sentaku[i]));
    sentakushiTextSize[i] = Math.min(1, 5 / String(sentaku[i]).length);
  }
}

function changeSentaku() {
  for(let i = 0; i < 9; i ++) {
    sentakushi[i].textContent = sentaku[i];
    sentakushi[i].style.fontSize = `${25*sentakushiTextSize[i]}px`;
  }
}

function resetTest() {
  hideTest();
  for(let i = 0; i < 9; i ++) {
    isSelected[i] = false;
    sentakushiTextSize[i] = 1;
    sentakushi[i].style.lineHeight = "";
    sentakushi[i].style.width = "";
    sentakushi[i].style.height = "";
    sentakushi[i].style.margin = "";
  }
  makeSentaku();
  changeSentaku();
  result.textContent = "";
  info.textContent = "";
  showTest();
}


function clickedCheckbox() {
  checkboxBox.checked = ! checkboxBox.checked;
  if(checkboxBox.checked) {
    showTest();
  }
  else {
    hideTest();
  }
}
checkbox.addEventListener("click", clickedCheckbox);
checkboxBox.addEventListener("change", clickedCheckbox);

for(let i = 0; i < 9; i ++) {
  sentakushi[i].addEventListener("click", () => {
    if(isSelected[i]) {
      isSelected[i] = false;
      sentakushi[i].style.fontSize = `${25*sentakushiTextSize[i]}px`;
      sentakushi[i].style.lineHeight = "";
      sentakushi[i].style.width = "";
      sentakushi[i].style.height = "";
      sentakushi[i].style.margin = "";
    }
    else {
      isSelected[i] = true;
      sentakushi[i].style.fontSize = `${17*sentakushiTextSize[i]}px`;
      sentakushi[i].style.lineHeight = "66px";
      sentakushi[i].style.width = "66px";
      sentakushi[i].style.height = "66px";
      sentakushi[i].style.margin = "17px";
    }
  });
}

button1.addEventListener("click", () => {
  resetTest();
});

button2.addEventListener("click", () => {
  if(info.textContent == "準備中")
    info.textContent = "";
  else
    info.textContent = "準備中";
});

button3.addEventListener("click", () => {
  if(info.textContent)
    info.textContent = "";
  else
    info.textContent = "素数を選択し、Goをクリックします。新しい素数に変更するには、再読み込みをクリックします。";
});

goButton.addEventListener("click", () => {
  if(isSelected.includes(true)) {
    let score = 0;
    for(let i = 0; i < 9; i ++) {
      if(answer[i] == -1) {
        score ++;
      }
      else {
        if(isSelected[i] == answer[i]) {
          score ++;
        }
        else {
        }
      }
    }
    
    if(score == 9) {
      result.style.color = "black";
      result.textContent = "あなたは理系です";
    }
    else {
      result.style.color = "red";
      result.textContent = "あなたは文系です";
    }
  }
  else {
    result.style.color = "black";
    result.textContent = "素数を選択してください";
  }
});


resetTest();
