const API_HOST = 'http://localhost:3000';
let syncOperations = document.getElementById("sync-operations");

syncOperations.addEventListener("click", async () => {
  const operations = [];

  $('.Filled.order-item').each((index, el) => {
    const date = $('.date-info .date', el)[0].textContent;
    const time = $('.date-info .hour', el)[0].textContent;
    const code = $('.symbol-info .name .symbol', el)[0].textContent;
    const count = $('.quantity-info', el)[0].textContent;
    const price = $('.price-info', el)[0].textContent;
    const nature = $('.type-info', el)[0].className.includes('buy') ? 'buy' : 'sell';
    operations.push({ date, time, code, count, price, nature });
  });

  console.log("operations", operations);
  $.post(`${API_HOST}/integrations/clear/operations`, { operations });

  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: setPageBackgroundColor,
  // });

  // console.log("to que");
});
