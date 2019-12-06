const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();

        return snapshot.ref.parent.child('uppercase').set(uppercase);
    })

exports.add3d = functions.region('asia-east2').https.onRequest(async (req, res) => {
    const digit = req.query.digit;
    const dayago = req.query.dayago;
    if(!digit || isNaN(digit.trim())){
        return res.status(400).json({error: "digit must be number."});
    }

    let ts = Date.now();
    const date = new Date(ts);

    if(dayago && isNaN(dayago.trim())){
        return res.status(400).json({error: "dayago must be number."});
    }

    if(dayago){
        date.setDate(date.getDate() - req.query.dayago);
    }

    const snapshot = await admin.database().ref('/3ds').push({digit, date: date.toString()});
    res.status(200).json({ message: 'Successfully added.', key: snapshot.key });
})

exports.get3ds = functions.region('asia-east2').https.onRequest(async (req, res) => {
    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("3ds");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        res.status(200).json(Object.values(snapshot.val()))
    }, function (errorObject) {
        res.status(500).json({error: errorObject.code});
    });
})