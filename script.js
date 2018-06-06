const toggleNewMovieForm = document.getElementById('toggleNewMovieForm');
const newMovieForm = document.querySelector('.newMovieForm');
const newMovieTitle = document.getElementById('title');
const newMovieYear = document.getElementById('year');
const newMovieComment = document.getElementById('comment');
const submitButton = document.querySelector('.submit');
const topTenList = document.querySelector('.topTenList');
const listUl = topTenList.querySelector('ul');
const lis = listUl.children;
let firstListItem = listUl.firstElementChild;
let lastListItem = listUl.lastElementChild;

//This function removes up and down buttons at the top and bottom of the list
//respectively.
function removeInoperableButtons() {
    firstListItem = listUl.firstElementChild;
    if (firstListItem) {
      let removeUp = firstListItem.querySelector("button.up");
      if (removeUp) {
        firstListItem.removeChild(removeUp);
      }
      lastListItem = listUl.lastElementChild;
      let removeDown = lastListItem.querySelector("button.down");
      if (removeDown) {
      lastListItem.removeChild(removeDown);
    }
}
}
//updates new numbers 1 through 10
function attachTopTenNumber(li, liLoc) {
  let number = document.createElement('h4');
  let theFirstChild = li.firstChild;
  liLoc = liLoc + 1;
  number.innerHTML = liLoc;
  number.className = "numbers";
  li.insertBefore(number, theFirstChild);
}

function addPodiumClass(li, i) {
  let number = li.querySelector('h4.numbers')
  let first = li.querySelector('h4.first');
  let second = li.querySelector('h4.second');
  let third = li.querySelector('h4.third');
  if (i == 0 && !first) {
    number.className += " first";
  }
  if (i == 1 && !second) {
    number.className += " second";
  }
  if (i == 2 && !third) {
    number.className += " third";
  }
}

//clears old numbers 1 through 10
function removeTopTenNumber(li) {
  removeNumber = li.querySelector("h4.numbers");
  li.removeChild(removeNumber);
}
//clears old up and down arrows so new ones can be added each time they are clicked.
function removeListItemButton(li) {
  let removeUp = li.querySelector("button.up");
  if (removeUp) {
    li.removeChild(removeUp);
  }
  let removeDown = li.querySelector("button.down");
  if (removeDown) {
    li.removeChild(removeDown);
  }
}

//this function adds button to remove films from the list and move films up
//and down the list.
function attachListItemButton(li) {
  let up = document.createElement('button');
  let theFirstChild = li.firstChild;
  up.className = 'up';
  up.innerHTML = '&#x02191';
  li.insertBefore(up, theFirstChild);

  let down = document.createElement('button');
  down.className = 'down';
  down.innerHTML = '&#x02193';
  li.insertBefore(down, theFirstChild);

  let remove = document.createElement('button');
  if (!li.querySelector(".remove")) {
    remove.className = 'remove';
    remove.innerHTML = '&#x02298';
    li.appendChild(remove, li.lastElementChild);
  }
}

//this for loop cycles through the film list and adds all the necessary
//buttons and podium medals from the beginning of the program.

for (let i = 0; i < lis.length; i += 1 ) {
  attachListItemButton(lis[i]);
  attachTopTenNumber(lis[i], i);
  if (i < 3) {
    addPodiumClass(lis[i], i);
  }
}
removeInoperableButtons();

//This code will open up the ability to add a new movie to the top 10 list
//when the 'Add New Movie' button is clicked.
toggleNewMovieForm.addEventListener('click', () => {
  if (newMovieForm.style.display === "none") {
    toggleNewMovieForm.textContent = "Hide New Movie Details";
    newMovieForm.style.display = "block";
    } else {
    toggleNewMovieForm.textContent = "Add New Movie";
    newMovieForm.style.display = "none";
    }
  })

//This code will publish the new movie to the page when the submit
//button is clicked
submitButton.addEventListener('click', () => {
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li');
  newMovieTitle.value.tagName = "title"
  li.innerHTML += "<h3>" + newMovieTitle.value + "</h3>";
  li.innerHTML += "<span>" + newMovieYear.value + "</span>";
  li.innerHTML += "<p>" + newMovieComment.value + "</p>";
  attachListItemButton(li);
  attachTopTenNumber(li, ul.length);
  ul.appendChild(li);
  newMovieTitle.value = "";
  newMovieYear.value = "";
  newMovieComment.value = "";
});

//this code adds functionality to the 'remove' 'up' and 'down' buttons
listUl.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'remove') {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    }
    if (event.target.className == 'up') {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if(prevLi) {
      ul.insertBefore(li, prevLi);
      }
    }
    if (event.target.className == 'down') {
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      if(nextLi) {
      ul.insertBefore(li, nextLi.nextElementSibling);
      }
    }
  }
  });
//This section of code ensures the buttons and podium medals are updated
//whenever a new list item is added.
document.addEventListener('click', () => {
    for (let i = 0; i < lis.length; i += 1 ) {
      removeListItemButton(lis[i]);
      attachListItemButton(lis[i]);
      removeTopTenNumber(lis[i]);
      attachTopTenNumber(lis[i], i);
      if (i < 3) {
        addPodiumClass(lis[i], i);
      }
    }
    removeInoperableButtons();

  });
