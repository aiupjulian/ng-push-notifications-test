const app = require('express')();
const webpush = require('web-push');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const cors = require('cors');

const vapidKeys = {
  "publicKey": "BAWVTs4OAYC45qIgQcpinDQ_F-f8PE34LgZYVPqMagpB97W-IowR0g4EfiGicPBzkeY_iEMfS3nnxsMdbnz0BS8",
  "privateKey": "OvqYEd_svZps1hT_v5OYpP5ZBYfBeqIu6zqnejGnK6g"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.use(bodyParser.json());
app.use(cors());

let subscription = {};

app.route('/api/subscribe').post(subscribe);

function subscribe(req, res) {
    subscription = req.body;
}

app.route('/api/newsletter').post(sendNewsletter);

function sendNewsletter(req, res) {
    console.log('Subscription', subscription);

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
        .then((res1) => { console.log(res1); res.status(200).json({ message: 'Newsletter sent successfully.' }) })
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}

http.listen(9000, () => {
    console.log(`listening on *:${9000}`);
});
