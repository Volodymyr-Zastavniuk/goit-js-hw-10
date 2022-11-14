export function createMarkupList(data) {
  return data
    .map(
      ({ flags, name }) =>
        `<li><img width="30" height="auto" src="${flags.svg}" alt="${name.common} country flag" /><span> ${name.official}</span></li>`
    )
    .join('');
}

export function createMarkupSingleName({ flags, name }) {
  return `<li><img width="60" height="auto" src="${flags.svg}" alt="${name.common} country flag" /><span> ${name.official}</span></li>`;
}

export function createMarkupSingleInfo({ capital, population, languages }) {
  return `<ul><li>Capital:<span>${capital}</span></li>
        <li>Population:<span>${population}</span></li>
        <li>Languages:<span>${Object.values(languages)}</span></li></ul>`;
}
