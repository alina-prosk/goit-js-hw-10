import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener("input", debounce(searchingCountry, DEBOUNCE_DELAY));

function searchingCountry() {
    const searchRequest = refs.input.value.trim();

    if (searchRequest === "") { return; }

    fetchCountries(searchRequest)
    .then(countries => {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        if (countries.length === 1) {
            refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
            refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
            countries.map(item => { 
                if (item.name.official === "Ukraine") {
                    setTimeout(() => alert("Glory to Ukraine!"), 400)
                } 
            });
        } else if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
        }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
};


function renderCountryList(countries) {
    return countries.map(
        ({ name, flags }) => {
            refs.countryList.style.backgroundColor = "#ffffffa0";
            return `
                    <li class="country-item" style="display:flex; align-items: center;">
                        <img class="country-flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
                        <span class="country-name" style="margin-left: 10px;"><b>${name.official}</b></span>
                    </li>
                    `;
        }).join('');
};


function renderCountryInfo(countries) {
    refs.countryInfo.style.backgroundColor = "#ffffffa0";
    return countries.map(({ capital, population, languages }) => {
        return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    }).join('');
}