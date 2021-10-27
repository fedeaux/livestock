const API_HOST = 'http://localhost:3000';

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

const injectables = [
  {
    host: 'https://pro.clear.com.br/#',
    js: clearIntegration
  }
]

chrome.webNavigation.onCompleted.addListener((details) => {
  injectables.forEach((injectable) => {
    if(details.url.toString().startsWith(injectable.host)) {
      chrome.tabs.executeScript({ code: injectable.js });
    }
  })

  // var l = inject.items.length, i, target_url, target_code;
  // for (i = 0; i < l; i += 1) {
  //   if (inject.items[i].enabled) {
  //     target_url = inject.items[i].url.replace('/', '\\/');
  //     target_code = inject.items[i].code;

  //     if (details.url.match(target_url)) {
  //       chrome.tabs.executeScript({code: target_code }, function () {
  //         console.debug('code injected');
  //       });
  //     }
  //   }
  // }
});
