
// Global variables
const submitBtn = document.getElementById('submit');
let filteredData = [];
const xhr = new XMLHttpRequest();
const form = document.getElementById('form')

// Method to read CSV data
const getData = () => {
  xhr.open("GET", "appreciate.csv", true)

  xhr.onload = function() { 
    if (xhr.status === 200) { 
      const rows = xhr.responseText.trim().split("\n");
      const data = rows.map(row => row.trim().split(","));
      filteredData = data.filter(row => row.length > 0);
    } else { 
      console.error("Failed to load CSV file"); 
    }
  };

  xhr.send();
}

// call method to get CSV data, result is set to filteredData
getData();

// When someone clicks button to get appreciation, find their name
// and show them why they are appreciated
getAppreciation = (event) => {
  event.preventDefault();

  let name = document.getElementById('fname').value.toLowerCase().replaceAll(' ', '');
  let adjectives = []
  let dataDiv = document.getElementById('data-return');
  let list = document.createElement('ul')
  let p = document.createElement('p')

  dataDiv.innerHTML = "";

  filteredData.map(row => {
    if(row[1].toLowerCase().replaceAll(' ', '') == name) {
      adjectives = row.slice(2);
      return;
    }
  })

  if(adjectives.length > 0) {
    p.innerText = 'Your teammates appreciate you because you are:';
    dataDiv.appendChild(p);

    adjectives.map(a => {
      if(a) {
        listItem = document.createElement('li');
        listItem.innerText = a;
        list.appendChild(listItem);
      }
    })

    dataDiv.appendChild(list);
  } else {
    p.innerText = 'No adjectives found, make sure to type your full first and last name and double check your spelling.';
    dataDiv.appendChild(p);
  }

}

hitEnter = (event) => {
  if(event.key === 'Enter') {
    event.preventDefault();
    getAppreciation(event);
  }
}

submitBtn.addEventListener('click', getAppreciation);
form.addEventListener('keypress', hitEnter);