var express = require('express');
var mongoose = require('mongoose');
var userModel = require('./models/user');
var bodyParser = require('body-parser');
var QRCode = require('qrcode');

//connect to db
mongoose.connect('mongodb://localhost/assignQR', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))

//init app
var app = express();

//set the template engine
app.set('view engine', 'ejs');

//fetch data from the reuqest
app.use(bodyParser.urlencoded({ extended: false }));

//default page load
app.get('/', (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data != '') {
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    var customerName = {
                        data: data[i].customerName
                    }
                    temp.push(customerName);
                    var mobileNo = {
                        data: data[i].mobileNo
                    }
                    temp.push(mobileNo);
                    var email = {
                        data: data[i].email
                    }
                    temp.push(email);
                }
                QRCode.toDataURL(temp, { errorCorrectionLevel: 'H' }, function (err, url) {
                    console.log(url)
                    res.render('home', { data: url })
                });
            } else {
                res.render('home', { data: '' });
            }
        }
    });
});

app.post('/', (req, res) => {
    var userr = new userModel({
        customerName: req.body.customerName,
        mobileNo: req.body.mobileNo,
        email: req.body.email
    });
    userr.save((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//assign port
var port = process.env.PORT || 8000;
app.listen(port, () => console.log('server run at ' + port));