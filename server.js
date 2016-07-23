var express = require("express");
var app = express();
var moment = require("moment");

// Set the view directory to /views
app.set("views", __dirname + "/views");

// Let's use the Pug templating language
app.set("view engine", "pug");

app.get("/", function(request, response) {
  response.render('index');
});

app.get('/:date', function(req, res) {
    var date = req.params.date;
    var day = new Date(date);
    if (day.toDateString() === 'Invalid Date' || day.toDateString() === 'NaN') {
        if (!moment.unix(date).isValid()) {
            console.log('invalid date');
            res.send({
                unix: null,
                natural: null
            });
        }
        else {
            res.send({
                unix: moment.unix(date, 'X').format('x'),
                natural: moment.unix(date, 'X').format('LL')
            });
        }
    }
    else {
        res.send({
            unix: day.getTime(),
            natural: day.toDateString() 
        });
    }
});
app.listen(process.evn.port || 8080);
