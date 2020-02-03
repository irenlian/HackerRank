const selectedUtilities = [];

const fillCatalog = async () => {
  let list = '';
  const filter = {
    selectedUtilities,
    fromStar: $("#fromStar").val(),
    toStar: $("#toStar").val(),
  };
  const hotelList = await $.post('/api/catalog/data', filter).promise();
  hotelList.forEach((hotel) => {
    list += '<div style="display: flex; flex-direction: column; border: 1px solid lightgrey; margin: 15px; padding: 15px">';
    list += `<div>${hotel.name}</div>`;
    list += `<div>Stars: ${hotel.stars}</div>`;
    list += `<div>${hotel.utilities}</div>`;
    list += `<div>Rate: ${hotel.rate} ${hotel.reviews}</div>`;
    list += '</div>';
  });
  $("#catalog").html(list);
};

const checkBoxListener = (event) => {
  if (event.target.type === 'checkbox') {
    if (event.target.checked) {
      selectedUtilities.push(event.target.value);
    } else {
      selectedUtilities.splice(selectedUtilities.indexOf(event.target.value), 1);
    }
    fillCatalog();
  }
};

const checkInputStar = (event) => {
  return ((event.target.value.length === 0 && event.key >= '0' && event.key <= '5') || event.key === 'Backspace');
};

const fillFilter = async () => {
  const listAttributes = await $.get('/api/attribute').promise();
  let filterHtml = '';
  if (listAttributes) {
    filterHtml = listAttributes.reduce((filterHtml, attribute) => {
      filterHtml += `<div><input type=\"checkbox\" value=\"${attribute.id}\"><span>${attribute.name}</span></div>`;
      return filterHtml;
    }, '');
    filterHtml += '<span style="padding-top: 10px">Min star rate</span>';
    filterHtml += '<input type=\"text\" value=\"\" name=\"fromStar\" id=\"fromStar\" onkeydown="return checkInputStar(event)">';
    filterHtml += '<span style="padding-top: 10px">Max star rate</span>';
    filterHtml += '<input type=\"text\" value=\"\" name=\"toStar\" id=\"toStar\" onkeydown="return checkInputStar(event)">';
    $("#filter").html(filterHtml);
    $("#filter").click(checkBoxListener);
    $("#fromStar").change(fillCatalog);
    $("#toStar").change(fillCatalog);
  }
};

$(async () => {
  fillCatalog();
  fillFilter();
});