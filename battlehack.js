var express = require('express'),
    http    = require('http'),
    https   = require('https'),
    braintree = require('braintree');

var app = express();
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "wz2kkvg4zrxjb7rd",
    publicKey: "v895y9mrb4v5hcvz",
    privateKey: "9ccba53d3b7a459dd985bbab50447067"
});

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());  
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
   	console.log('in the development configuration');
   	app.set('port', 8000);
   	app.use('/battlehack',express.static(__dirname + '/public'));
   	app.use(express.errorHandler());
});

app.get"/", function (req, res) {
    res.render('home', {});
});

app.get("/battlehack/order", function (req, res) {

    gateway.clientToken.generate({}, function (err, response) {

        res.render('order', {
            clientToken : response.clientToken
        });
    });

});

app.get("/battlehack/confirm", function (req, res) {
    res.render('confirm', {});
});
app.post("/checkout", function (req, res) {

    var nonce = req.body.payment_method_nonce;
    // var nonce = req.param('nonce');
    gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonce,
    }, function (err, result) {
        
        console.log("result: ", result);

        if ( result.success ) {
            res.redirect("/battlehack/confirm");
        }

    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
