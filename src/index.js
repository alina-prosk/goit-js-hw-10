import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
};
const DEBOUNCE_DELAY = 300;

refs.info.addEventListener('input', debounce(selectionCountry, DEBOUNCE_DELAY));

function selectionCountry() {
    const trim = refs.input.value.trim();
    
    if (trim === '') { return; }
    
    fetchCountries(trim).then(countries => { 
    list.innerHTML = '';
    info.innerHTML = '';
                if (countries.length === 1) {
                    refs.list.insertAdjacentHTML('beforeend', renderList(countries));
                    refs.info.insertAdjacentHTML('beforeend', renderInfo(countries));
        countries.map(item => { 
                if (item.name.official === "Ukraine") {
                    setTimeout(() => alert("Glory to Ukraine!"), 400)
                } 
            });
        } else if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            refs.list.insertAdjacentHTML('beforeend', renderCountryList(countries));
        }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
};


function renderList(countries) {
    return countries.map(
        ({ name, flags }) => {
            refs.list.style.backgroundColor = "#ffffffa0";
            return `
                    <li class="country-item" style="display:flex; align-items: center;">
                        <img class="country-flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
                        <span class="country-name" style="margin-left: 10px;"><b>${name.official}</b></span>
                    </li>
                    `;
        }).join('');
};


function renderInfo(countries) {
    refs.info.style.backgroundColor = "#ffffffa0";
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