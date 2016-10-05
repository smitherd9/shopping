var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  }, 
  
  delete: function(id) {
    var index = -1;
      for(var i = 0; i < this.items.length; i++){
        if(id == this.items[i].id){
		    index = i;
		    break;
	}
}

      if(index > -1){
      return this.items.splice(index, 1);
    } else {
	    return [];
  }
},

  
  edit: function(id, name){
    var item = {id : id,
                name: name
    };
    for(var i = 0; i < this.items.length; i++){
      if(id == this.items[i].id){
        this.items[i] = item;
        break;
      }
      
    }
    return item;
  }
  
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response){
    var item = storage.delete(request.params.id);
    response.status(200).json(item);
  
  
    // return response.status(500).json(item);
  
  
});



app.put('/items/:id', jsonParser, function(request, response){
    var item = storage.edit(request.params.id, request.body.name);
    response.status(200).json(item);
    
  
});



exports.app = app;
exports.storage = storage;
app.listen(process.env.PORT || 8080, process.env.IP);