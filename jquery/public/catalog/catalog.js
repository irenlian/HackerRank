const selectedUtilities = [];

const fillCatalog = async () => {
  let list = '';
  const hotelList = await $.post('/api/catalog/data', { selectedUtilities }).promise();
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

const fillFilter = async () => {
  const listAttributes = await $.get('/api/attribute').promise();
  if (listAttributes) {
    const filterHtml = listAttributes.reduce((filterHtml, attribute) => {
      filterHtml += `<input type=\"checkbox\" value=\"${attribute.id}\">${attribute.name}<br/>`;
      return filterHtml;
    }, '');
    $("#filter").html(filterHtml);
    $("#filter").click(checkBoxListener);
  }
};

$(async () => {
  fillCatalog();
  fillFilter();
});