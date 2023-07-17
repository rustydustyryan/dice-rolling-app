const imgEls = document.querySelectorAll('img');
const rollEl = document.querySelector('#roll');
const clearEl = document.querySelector('#clear');
const contentEl = document.querySelector('.content');
const beginEl = document.querySelector('.begin');
const rollContainer = document.querySelector('.roll-container');

let isRolled = false;

// event listeners
clearEl.addEventListener('click', clearFn);
rollEl.addEventListener('click', rollFn);
for (let i = 0; i < imgEls.length; i++) {
  imgEls[i].addEventListener('click', () => addImage(i));
}

// add images to the page
function addImage(i) {
  if (isRolled) {
    clearFn();
  }
  const imgEl = document.createElement('img');
  contentEl.appendChild(imgEl);
  imgEl.classList.add('img');
  beginEl.classList.add('hide');
  imgEl.src = imgEls[i].src;
  imgEl.alt = imgEls[i].alt;

  // add event listener so that when the image is clicked it is removed
  imgEl.addEventListener('click', () => {
    imgEl.remove();
    const imgs = contentEl.querySelectorAll('.img');
    if (imgs.length === 0) {
      beginEl.classList.remove('hide');
    }
  });
}

// clear the page of all images
function clearFn() {
  isRolled = false;
  const img = document.querySelectorAll('.img');
  for (let i = 0; i < img.length; i++) {
    img[i].remove();
  }
  beginEl.classList.remove('hide');
  rollContainer.innerHTML = '';
}

// select all of the images that have been inserted
function rollFn() {
  isRolled = true;
  const imgs = contentEl.querySelectorAll('.img');
  let total = 0;

  // roll a dice for each image that corresponds to the dice value
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const dice = img.alt;
    const sides = parseInt(dice.slice(1));
    const roll = Math.floor(Math.random() * sides) + 1;
    total = total + roll;

    const rollEl = document.createElement('p');
    rollContainer.appendChild(rollEl);
    rollEl.innerHTML = `${dice}: ${roll}`;
  }

  const totalEl = document.createElement('p');
  rollContainer.appendChild(totalEl);
  totalEl.innerHTML = `Total: ${total}`;
}
