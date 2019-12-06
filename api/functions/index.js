const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors');
const express = require('express')

const app = express();
app.use(cors());

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();

        return snapshot.ref.parent.child('uppercase').set(uppercase);
    })

app.get('/add3d', async (req, res) => {
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
        date.setDate(date.getDate() - dayago);
    }

    const snapshot = await admin.database().ref('/3ds').push({digit, date: date.toString()});
    res.status(200).json({ message: 'Successfully added.', key: snapshot.key });
})

app.get('/get3ds', async (req, res) => {
    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("3ds").orderByChild("date").limitToLast(10);

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        const ret_val = []
        const values = snapshot.val()
        for (let [key, value] of Object.entries(values)){
            ret_val.push({
                key,
                ...value
            })
        }
        res.status(200).json(ret_val.reverse())
    }, function (errorObject) {
        res.status(500).json({error: errorObject.code});
    });
})

exports.api = functions.region('asia-east2').https.onRequest(app);