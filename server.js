const express         = require('express'),
      app             = express(),
      mongodb         = require('mongodb'),
      mongoClient     = mongodb.MongoClient,
      bodyParser      = require('body-parser'),
      parseJson       = bodyParser.json(),
      dbUri           = 'mongodb://root:1@ds046377.mlab.com:46377/task-manager';
      
/* date */

let date = {
    now: () => {
        let date = new Date();
        let now = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return now;
    } 
}

/* router */

let router = (app, db) => {
    
    const collection = db.collection('tasks');
 
    /* rest api */

    app.get('/api/', parseJson, (req, res) => {        
        collection.find().toArray(function(err, result) {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });

    app.post('/api/', parseJson, (req, res) => {
        const taskData = {
            "title": req.body.title,
            "description": req.body.description,
            "term": req.body.term,
            "position": req.body.position
        }
        collection.insert(taskData, function(err, result) {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });

    app.put('/api/', parseJson, (req, res) => {
        collection.findOneAndUpdate(
            { "title": req.body.oldTitle },
            { $set:
              {
                "title": req.body.title,
                "description": req.body.description,
                "term": req.body.term,
                "position": req.body.position
              }
            }
          ,(err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
          });
    });
    
    app.delete('/api/:id', (req, res) => {
        collection.remove({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });

    app.get('/api/:id', (req, res) => {
        collection.findOne({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });
}

/* db connect */

mongoClient.connect(dbUri, (err, db) => {
    router(app, db);
});

/* start server */

app.listen(8888, function () {
    console.log('listen 8888'+ ' at ' + date.now());

});