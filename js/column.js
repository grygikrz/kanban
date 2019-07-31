function Column(id, name, color) {
  	var self = this;

    this.id = id;
    this.name = name || 'No name given';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

    //append random color to attribute
		if (color){
			this.element.querySelector('.column').setAttribute('style','background-color:' + color);
		}else{
			this.element.querySelector('.column').setAttribute('style','background-color:' + getRandomColor());
		}

  	this.element.querySelector('.column').addEventListener('click', function (event) {
	    if (event.target.classList.contains('btn-delete')) {
	      	self.removeColumn();
	    }
	    if (event.target.classList.contains('btn-edit')) {
	        if (!this.querySelector('input')){
	            
	        var newInput = document.createElement("input");
	        this.querySelector('h2').innerHTML = event.target.parentNode.querySelector('h2').innerHTML;
	      	this.querySelector('h2').appendChild(newInput);
	      	newInput.value = this.querySelector('h2').innerText;
	        var saveBtn = this.querySelector('.btn-edit');
	        saveBtn.innerText = "save";
	        saveBtn.className = "btn-save";
	        saveBtn.addEventListener('click', (event) => {
	            edit_Click(self.id, this.querySelector('input').value);
	            this.querySelector('h2').innerText = this.querySelector('input').value;
	            var editBtn = this.querySelector('.btn-save');
	            editBtn.innerHTML = "edit";
	            editBtn.className = "btn-edit";
	        });
	        }else{
	            this.querySelector('h2').removeChild(this.parentNode.querySelector('input'));
	        }
	    }

      if (event.target.classList.contains('add-card')) {
        var cardName = prompt("Enter the name of the card");
        event.preventDefault();
        
        if (cardName === null)return;
        if (cardName == '')return alert("No text was provided");

        var data = new FormData();
        data.append('name', cardName);
        data.append('bootcamp_kanban_column_id', self.id);



        fetch(prefix + baseUrl + '/card', {
            method: 'POST',
            headers: myHeaders,
            body: data,
          })
          .then(function(res) {
                return res.json();
          })
          .then(function(resp) {
            var card = new Card(resp.id, cardName);
            self.addCard(card);
          });

        //self.addCard(new Card(cardName));
      }
	});
}

Column.prototype = {
	addCard: function(card) {
	  this.element.querySelector('ul').appendChild(card.element);
	},
  removeColumn: function() {
    var self = this;
    fetch(prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
  }
};

function setupColumns(columns) {
  columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  });
}
