'use strict';

const all__row = document.querySelector('.all .row');

const fetchAll = async function(){
    try{

        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const json = await response.json();
        return json;
    }catch(err){
        console.error(`Something went wrong : ${err.message}`);
    }
}

fetchAll().then((countries) => {
    countries.map(country => {
        if(country.name.official === "State of Israel") return; // free palestine
        createCard(country)
    });
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
        </span> ${obj.capital}</p>
        <p class="population"><span class="material-symbols-outlined">
        groups
        </span> ${new Intl.NumberFormat().format(obj.population)}</p>
        <p class="region"><span class="material-symbols-outlined">
        language
        </span> ${obj.region}, ${obj.subregion}</p>
    </div>
        </div>
    </div>
    `;

    all__row.insertAdjacentHTML('beforeend', html);

}