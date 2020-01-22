const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express')
const cors = require('cors');

const app = express();
app.use(cors());

app.post('/add3d', (req, res) => {
    const { digit, dayago } = req.body;
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

    admin.database().ref('/3ds').push({digit, date: date.toString()})
        .then(snapshot => {
            res.json({ message: 'Successfully added.', key: snapshot.key });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})

app.post('/delete3d', (req, res) => {
    const { id } = req.body;
    if(id && id.trim().length <= 0){
        return res.status(400).json({error: "id must not be empty"})
    }

    admin.database().ref(`/3ds/${id}`).remove()
        .then(() => {
            res.json({message: 'Successfully deleted.'})
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        })
})

app.get('/get3ds', (req, res) => {
    // Get a database reference
    var db = admin.database();
    var ref = db.ref("3ds").limitToLast(10);

    // Attach an asynchronous callback to read the data
    ref.once("value", function(snapshot) {
        const ret_val = []
        const values = snapshot.val()
        for (let [key, value] of Object.entries(values)){
            ret_val.push({
                key,
                ...value
            })
        }
        res.json(ret_val.reverse())
    }, function (errorObject) {
        res.status(500).json({error: errorObject.code});
    });
})

exports.api = functions.region('asia-east2').https.onRequest(app);