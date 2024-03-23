import { countriesData } from "./country.js";

function countLanguages(data) {
  const languageCountMap = {};

  data.forEach(country => {
    country.languages.forEach(language => {
      if (languageCountMap[language]) {
        languageCountMap[language]++;
      } else {
        languageCountMap[language] = 1;
      }
    });
  });

  return languageCountMap;
}

function renderLanguageChart(languageData, containerId) {
  const chartContainer = document.getElementById(containerId);
  chartContainer.innerHTML = '';

  const totalSpeakers = Object.values(languageData).reduce((total, count) => total + count, 0);

  const sortedLanguages = Object.keys(languageData).sort((a, b) => languageData[b] - languageData[a]);

  const topLanguages = sortedLanguages.slice(0, 10);

  topLanguages.forEach(language => {
    const bar = document.createElement('div');
    bar.classList.add('bar');

    const barLabel = document.createElement('span');
    barLabel.textContent = language;
    barLabel.classList.add('label');
    bar.appendChild(barLabel);

    const barFill = document.createElement('div');
    barFill.classList.add('fill');
    barFill.style.width = `calc(${(languageData[language] / totalSpeakers) * 100}% + 10rem)`;
    bar.appendChild(barFill);

    const barPercentage = document.createElement('span');
    barPercentage.textContent = `${languageData[language]} (${((languageData[language] / totalSpeakers) * 100).toFixed(2)}%)`;
    barPercentage.classList.add('percentage');
    bar.appendChild(barPercentage);

    chartContainer.appendChild(bar);
  });

  chartContainer.style.display = 'block';
  document.getElementById('languagesHeader').style.display = 'block';
  document.getElementById('populationHeader').style.display = 'none';
}

function renderPopulationChart(data, containerId) {
  const chartContainer = document.getElementById(containerId);
  chartContainer.innerHTML = '';

  data.sort((a, b) => b.population - a.population);
  const totalPopulation = data.reduce((total, country) => total + country.population, 0);
  const topData = data.slice(0, 10);

  topData.forEach(item => {
    const bar = document.createElement('div');
    bar.classList.add('bar');

    const barLabel = document.createElement('span');
    barLabel.textContent = item.name;
    barLabel.classList.add('label');
    bar.appendChild(barLabel);

    const barFill = document.createElement('div');
    barFill.classList.add('fill');
    barFill.style.width = `calc(${(item.population / totalPopulation) * 100}% + 10rem)`;
    bar.appendChild(barFill);

    const barPercentage = document.createElement('span');
    barPercentage.textContent = `${item.population.toLocaleString()} (${((item.population / totalPopulation) * 100).toFixed(2)}%)`;
    barPercentage.classList.add('percentage');
    bar.appendChild(barPercentage);

    chartContainer.appendChild(bar);
  });

  chartContainer.style.display = 'block';
  document.getElementById('populationHeader').style.display = 'block';
  document.getElementById('languagesHeader').style.display = 'none';
}

function showPopulationChart() {
  document.getElementById('languagesChart').style.display = 'none';
  renderPopulationChart(countriesData, 'countriesChart');
}

function showLanguagesChart() {
  document.getElementById('countriesChart').style.display = 'none';
  const languageData = countLanguages(countriesData);
  renderLanguageChart(languageData, 'languagesChart');
}

document.addEventListener('DOMContentLoaded', function() {
  const populationButton = document.getElementById('populationButton');
  const languagesButton = document.getElementById('languagesButton');

  populationButton.addEventListener('click', showPopulationChart);
  languagesButton.addEventListener('click', showLanguagesChart);

  document.getElementById('countriesChart').style.display = 'none';
  document.getElementById('languagesChart').style.display = 'none';
});

function updateCountryCount(count) {
  const titleElement = document.querySelector('.title2');
  titleElement.textContent = `Currently, we have ${count} countries`;
}
updateCountryCount(countriesData.length);