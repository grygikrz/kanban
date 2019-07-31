var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '4173',
  'X-Auth-Token': '8e85bde55d7d7f14d26b3b3b60165b4a'
};

fetch(prefix + baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });



//get random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');

  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);

  	return element;
}



function edit_Click(id, name){
    var datas = new FormData();
    datas = {'name': name};

    fetch(prefix + baseUrl + '/column/' + parseInt(id), {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(datas)
    })
    .then(function(resp) {
        return console.log(resp.json());
    });
    //.then(function(resp) {

    //})
    //.catch(err => console.log(err));
}
