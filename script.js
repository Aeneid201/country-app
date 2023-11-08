'use strict';

const countryCards = document.querySelector('.countryCards');
const searchCountry = document.querySelector('form');
const countryInput = searchCountry.querySelector('input');
const errorMsg = document.querySelector('.errorMsg');

const fetchAll = async function(){
    try{

        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const json = await response.json();
        return json;
    }catch(err){
        console.error(`Something went wrong : ${err.message}`);
    }
}

const fetchCountry = async function(country){
    try{

        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const json = await response.json();
        return json;
    }catch(err){
        console.error(`Something went wrong : ${err.message}`);
    }
}

const displayAll = function () {
    fetchAll().then((countries) => {
        countries.sort(function (a, b) {
            if (a.name.official < b.name.official) {
              return -1;
            }
            if (a.name.official > b.name.official) {
              return 1;
            }
            return 0;
          });
        countries.map(country => {
            if(country.name.official === "State of Israel") return; // Free Palestine
            createCard(country)
        });
    });
}

displayAll();

const displayCountry = function(userInput) {
    fetchCountry(userInput).then((countries) => {
        if(countries.status === 404) {
            errorMsg.classList.remove('d-none');
            return
        }else{
            errorMsg.classList.add('d-none');
        }

        countries.sort(function (a, b) {
            if (a.name.official < b.name.official) {
              return -1;
            }
            if (a.name.official > b.name.official) {
              return 1;
            }
            return 0;
          });
        countries.map(country => {
            if(country.name.official === "State of Israel") return; // Free Palestine
            createCard(country)
        });
    });
}


searchCountry.addEventListener('submit', (e) => {
    e.preventDefault();
    let userInput = countryInput.value;
    countryCards.innerHTML = "";

    if(userInput){
        displayCountry(userInput);
    }else {
        displayAll();
    }

    
});

const createCard = function(obj) {
    let html = `
    <div class="card"> 
        <div class="inner">
        <div class="img">
        <img src="${obj.flags.png}">
    </div>

    <div class="details">
        <h3 class="name">${obj.name.official}</h3>
        <p class="capital"><span class="material-symbols-outlined">
        flag
        </span> ${obj.capital ? obj.capital : "N/A"}</p>
        <p class="population"><span class="material-symbols-outlined">
        groups
        </span> ${new Intl.NumberFormat().format(obj.population)}</p>
        <p class="region"><span class="material-symbols-outlined">
        language
        </span> ${obj.region}, ${obj.subregion ? obj.subregion : ''}</p>
    </div>
        </div>
    </div>
    `;

    countryCards.insertAdjacentHTML('beforeend', html);

}