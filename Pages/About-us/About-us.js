// console.log(products);

//Defined the HTML Elements in javaScript
const bodyElement = document.body;
const cartNumber = document.querySelector('.js-cart-num');
const signInBtn = document.querySelector('.js-sign-in');
const signUpBtn = document.querySelector('.js-sign-up');
const rightHeader = document.querySelector('.js-right-header');
const errorContainer = document.querySelector('.js-error-container');
const errorMessage = document.querySelector('.js-error-message');
const currencySelectElement = document.getElementById('currency-select');
const mainSection = document.querySelector('.js-main-section');
const marqueeElement = document.querySelector('.js-about-user');
let userDiv = document.querySelector('.about-user-div');
const songImage = document.querySelector('.js-song-image');
const songName = document.querySelector('.js-song-name');
const songDiv = document.querySelector('.js-song-div');
const audioHelp = document.querySelector('.js-audio-help');
const pausePlay = document.querySelector('.js-audio-pp');
//sets the currency value to the last chosen value
currencySelectElement.value = currentCurrencyValue;

//A function that converts the currency of the items on the page to the items
function changeCurrencyUnit(item, index) {
  //If the select element's value in the HTML file is naira it converts every price value to naira and vice versa
  if (currencySelectElement.value == 'naira') {
    productCardPrice[index].innerText = ` N${(item.priceKobo / 100).toFixed(
      2
    )}`;
    currentCurrencyValue = currencySelectElement.value;
    localStorage.setItem('currencyValue', JSON.stringify(currentCurrencyValue));
  } else if (currencySelectElement.value == 'dollar') {
    productCardPrice[index].innerText = ` $${(item.priceCents / 100).toFixed(
      2
    )}`;
    currentCurrencyValue = currencySelectElement.value;
    localStorage.setItem('currencyValue', JSON.stringify(currentCurrencyValue));
  }
}

//Adds an event listener to the select element on the site settings to detect the change of the select element value to update the page prices
currencySelectElement.addEventListener('change', () => {
  skincare.forEach((item, index) => {
    changeCurrencyUnit(item, index);
  });
});

//Function to display the total number of items in the cart
function cartCount() {
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity;
  });
  cartNumber.innerText = count;
}
cartCount();

function createMarqueeElement() {
  let elementMarquee = document.createElement('marquee');
  elementMarquee.behavior = 'scroll';
  elementMarquee.direction = 'up';
  elementMarquee.scrollAmount = '5';
  elementMarquee.addEventListener('ended', () => {
    marqueeElement.scrollTop = 0;
  });
  elementMarquee.className = 'about-user';

  userData.forEach((user) => {
    let elementDiv = document.createElement('div');
    elementDiv.className = 'about-user-div';

    let element = document.createElement('img');
    element.className = 'about-user-profile';
    element.src = user.profile;
    element.style = 'width: 100px; height: 100px; border: 5px solid white;';
    elementDiv.appendChild(element);

    element = document.createElement('p');
    element.className = 'about-users-name';
    element.innerText = `${user.firstName} ${user.lastName}`;
    elementDiv.appendChild(element);

    let innerElement = document.createElement('span');
    innerElement.innerText = user.password;
    element.appendChild(innerElement);

    element = document.createElement('p');
    element.className = 'about-users-username';
    element.innerHTML = `~${user.userName}`;
    elementDiv.appendChild(element);

    elementMarquee.appendChild(elementDiv);
  });
  // console.log(elementMarquee.innerHTML);
  mainSection.appendChild(elementMarquee);
}
createMarqueeElement();

function displayAllUsers() {
  marqueeElement.innerHTML = '';
  console.log(userData);
  userData.forEach((user) => {
    marqueeElement.innerHTML += `<div class="about-user-div">
    <img class="about-user-profile" src="${user.profile}" width="100px" alt="">
    <p class="about-users-name"><span>${user.firstName} ${user.lastName}</span><span>${user.password}</span></p>
    <p class="about-users-username">~${user.userName}</p>
  </div>`;
  });
}
// displayAllUsers();

function updateAccount() {
  if (loginStatus == true) {
    signInBtn.style = 'display: none;';
    signUpBtn.style = 'display: none;';

    let elementA = document.createElement('a');
    elementA.href = '../../Pages/Sign-in/Sign-in.html';

    let element = document.createElement('img');
    element.style =
      'width: 30px; height: 30px; border-radius: 30px; border: 1px solid black';
    elementA.appendChild(element);

    element.src = `${currentUser.profile}`;
    rightHeader.appendChild(elementA);
  }
}
updateAccount();

function playSongs(one) {
  songImage.src = songData[one].image;
  songName.innerHTML = `${songData[one].name}<span style="cursor:pointer; color: lightgreen; margin-left: 5px;" onclick="playNext()">&blacktriangleright;Next&blacktriangleright;</span>`;
  songName.style = 'transform: scaleX(100%);';
  songDiv.style = 'opacity: 1;';
  setTimeout(() => {
    if (!songDiv.matches(':hover')) {
      songName.style = 'transform: scaleX(0%);';
      songDiv.style = 'opacity: 0.5;';
    }
  }, 5000);
  songDiv.addEventListener('mouseover', () => {
    songName.style = 'transform: scaleX(100%)';
    songDiv.style = 'opacity: 1;';
  });
  songDiv.addEventListener('mouseout', () => {
    songName.style = 'transform: scaleX(0%);';
    songDiv.style = 'opacity: 0.5;';
  });
  let audioElement = document.createElement('audio');
  audioElement.style = 'display: none';
  audioElement.className = 'now-playing';
  audioElement.volume = 1;
  audioElement.currentTime = songData[one].startTime;
  audioElement.src = songData[one].source;
  audioElement.autoplay = true;

  bodyElement.appendChild(audioElement);
}

let timeOut;
let randomNum;
function playRandomSong() {
  randomNum = Math.floor(Math.random() * songData.length);
  console.log(randomNum);
  playSongs(randomNum);
  timeOut = setTimeout(() => {
    playNext();
  }, 150000);
}

function playNext() {
  clearTimeout(timeOut);
  if (randomNum == songData.length - 1) {
    randomNum = 0;
  }
  const nowPlaying = document.querySelector('.now-playing');
  nowPlaying.remove();
  randomNum++;
  playSongs(randomNum);
}
playRandomSong();

function audioHelpFunc() {
  audioHelp.style = 'display: block;';
  setTimeout(() => {
    audioHelp.style = 'display: none';
  }, 5000);
}
audioHelpFunc();

songDiv.addEventListener('click', () => {
  const nowPlaying = document.querySelector('.now-playing');
  if (!nowPlaying.paused) {
    console.log('Audio is playing');
    pausePlay.innerHTML = '▶️';
    clearTimeout(prevPaused);
    pausePlay.style = 'display: block;';
    nowPlaying.pause();
  } else {
    console.log('Audio is paused or not playing');
    pausePlay.innerHTML = '⏸️';
    pausePlay.style = 'cursor: pointer;';
    nowPlaying.play();
    pausePlayFunc();
  }
});

pausePlay.addEventListener('click', () => {
  console.log('Audio is paused or not playing');
  pausePlay.innerHTML = '⏸️';
  pausePlay.style = 'cursor: pointer;';
  nowPlaying.play();
  pausePlayFunc();
});

let prevPaused;
function pausePlayFunc() {
  prevPaused = setTimeout(() => {
    pausePlay.style = 'display: none;';
  }, 5000);
}
pausePlayFunc();
