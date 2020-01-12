function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const header = () => {
  return '<tr>' +
    '<td>Room type</td>' +
    '<td>Sleeps</td>' +
    '<td>Price</td>' +
    '<td>Breakfast</td>' +
    '<td>Select rooms</td>' +
    '</tr>';
};

const room = (item, breakfast = false) => {
  const nights = getParameterByName('nights') || 1;
  const breakfastPrice = item.breakfast * item.sleeps * nights;
  const finalPrice = item.price * nights + ((breakfast) ? breakfastPrice : 0);
  let row = '';
  row += '<tr>';
  row += `<td>${item.type}</td>`;
  row += `<td>${item.sleeps}</td>`;
  row += `<td>${finalPrice} UAH</td>`;
  row += (breakfast) ? `<td>Breakfast is included</td>` : `<td>Breakfast UAH ${item.breakfast}</td>`;
  row += '<td><select><option value="0">0</option>';
  for (let i = 1; i <= 10; i++) {
    row += `<option value="${i}">${i}\t(UAH ${i * finalPrice})</option>`;
  }
  row += '</select></td></tr>';
  return row;
};

const parsing = async () => {
  const result = await $.get('/hotel-accommodation').promise();
  let tableContent = header;
  result.forEach((item) => {
    tableContent += room(item, true);
    tableContent += room(item, false);
  });
  $("table").html(tableContent);
};

$(() => {
  $('p').load('/hotel-name');
  parsing();
});
