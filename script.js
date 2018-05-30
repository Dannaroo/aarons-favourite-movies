const toggleNewMovieForm = document.getElementById('toggleNewMovieForm');
const newMovieForm = document.querySelector('.newMovieForm');
const newMovieTitle = document.getElementById('title');
const newMovieYear = document.getElementById('year');
const newMovieComment = document.getElementById('comment');
const submitButton = document.querySelector('.submit');
const topTenList = document.querySelector('.topTenList');
const listUl = topTenList.querySelector('ul');
const lis = listUl.children;

//This function awards first, second and third medals to the top 3 films.
function attachPodium(li) {
  if (li === listUl.firstElementChild && !li.querySelector('.first')) {
    let first = document.createElement('h4');
    first.innerHTML = "1";
    first.className = "first";
    li.insertBefore(first, li.firstElementChild);
  } else if ( li === listUl.firstElementChild.nextElementSibling && !li.querySelector('.second')) {
    let second = document.createElement('h4');
    second.innerHTML = "2";
    second.className = "second";
    li.insertBefore(second, li.firstElementChild);
  } else if ( li === listUl.firstElementChild.nextElementSibling.nextElementSibling && !li.querySelector('.third')) {
    let third = document.createElement('h4');
    third.innerHTML = "3";
    third.className = "third";
    li.insertBefore(third, li.firstElementChild);
  }
}

//this function adds button to remove films from the list and move films up
//and down the list.
function attachListItemButton(li) {
  let up = document.createElement('button');
  if (!li.querySelector(".up")) {
    up.className = 'up';
    up.innerHTML = '&#x02191';
    li.insertBefore(up, li.firstElementChild);
  }

  let down = document.createElement('button');
  if (!li.querySelector(".down")) {
    down.className = 'down';
    down.innerHTML = '&#x02193';
    li.insertBefore(down, li.firstElementChild.nextElementSibling);
  }

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
      attachPodium(lis[i]);
     }

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
  li.innerHTML = "<h3>" + newMovieTitle.value + "</h3>";
  li.innerHTML += "<span>" + newMovieYear.value + "</span>";
  li.innerHTML += "<p>" + newMovieComment.value + "</p>";
  attachListItemButton(li);
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
          attachListItemButton(lis[i]);
          attachPodium(lis[i]);
         }
  });
