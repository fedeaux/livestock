setInterval(() => {
  const stocks = {};

  $('.frame-holder iframe').contents().find(".AssetList[style=\"display: block;\"] .AssetListItem").each((index, el) => {
    let stock = $('input.stock_name.show', el)[0].value;
    let value = $('.cont_list_one .container .value.show', el)[0].textContent;
    stocks[stock] = value;
  })

  $.post('API_HOST/nem_a_pau_ne', { data: { stocks }});
}, 3000)
