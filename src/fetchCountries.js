
const searchParams = new URLSearchParams({
fields: 'name,capital,population,flags,languages',
});

export function fetchCountries(searchRequest) {
return fetch(
    `https://restcountries.com/v3.1/name/${searchRequest}?${searchParams}`
).then(response => {
    if (!response.ok) {
    throw new Error(response.status);
    }
    return response.json();
});
}