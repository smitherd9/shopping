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

  
  edit: function(id){
    var item = {id : id};
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
    return response.sendStatus(200);
  
  
  
});

// app.delete('/items/:id', jsonParser, function(request, response) {
//   var id = request.params.id;
//   var deleted = storage.remove(id) 
//   return response.status(200).json(deleted);
// });

app.put('/items/:id', jsonParser, function(request, response){
  
  
})




app.listen(process.env.PORT || 8080, process.env.IP);