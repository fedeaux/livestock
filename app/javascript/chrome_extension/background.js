// const API_HOST = 'http://localhost:3000';
const API_HOST = 'https://livestock.fedeaux.com';

const clearIntegration = `
  fetch('${API_HOST}/integrations/clear/injector.js')
    .then(response => response.json())
    .then((data) => {
      (function(d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.textContent = data.js;
        d.getElementsByTagName('head')[0].appendChild(script);
      }(document));
    });
`;

const statusInvestIntegration = `
  fetch('${API_HOST}/integrations/status_invest/injector.js')
    .then(response => response.json())
    .then((data) => {
      (function(d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.textContent = data.js;
        d.getElementsByTagName('head')[0].appendChild(script);
      }(document));
    });
`;

const injectables = [
  {
    host: 'https://pro.clear.com.br/#',
    js: clearIntegration
  },
  {
    host: 'https://statusinvest.com.br/',
    js: statusInvestIntegration
  }
]

chrome.webNavigation.onCompleted.addListener((details) => {
  injectables.forEach((injectable) => {
    if(details.url.toString().startsWith(injectable.host)) {
      chrome.tabs.executeScript({ code: injectable.js });
    }
  })
});
