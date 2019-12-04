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

    let ts = Date.now();
    const date = new Date(ts);

    if(req.query.dayago) {
        date.setDate(date.getDate() - req.query.dayago)
    }

    const snapshot = await admin.database().ref('/3ds').push({digit, date: date.toString()});
    res.status(200).json({ message: 'Successfully added.', key: snapshot.key, value: snapshot.val() });
})

exports.get3ds = functions.region('asia-east2').https.onRequest(async (req, res) => {
    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("3ds");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        res.status(200).json(snapshot.val())
    }, function (errorObject) {
        res.status(500).json({error: errorObject.code});
    });
})