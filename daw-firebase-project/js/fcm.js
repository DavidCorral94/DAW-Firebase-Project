var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_DATABASE_NAME.firebaseio.com",
    storageBucket: "YOUR_BUCKET.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID"
};

firebase.initializeApp(config);


const messaging = firebase.messaging();

var database = firebase.database();

function isEmptyOrNull(value) {
    if (value.value == '' || value.length == 0) {
        console.log("NULL");
        return true;
    }
    return false;
}

function writeUserData() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    if (!isEmptyOrNull(name) && !isEmptyOrNull(email) && !isEmptyOrNull(phone)) {
        firebase.database().ref('users/' + name).set({
            name: name,
            email: email,
            phone: phone
        });
    }
    else {
        console.log("Some input was null or default :-/");
    }
}

var starCountRef = firebase.database().ref('users/');
starCountRef.on('child_added', function(snapshot) {
    console.log("New user named " + snapshot.val().name + "!");
    insertRowDB(snapshot.val().name, snapshot.val().email, snapshot.val().phone);
});

function insertRowDB(name, email, phone) {
    var table = document.getElementById("mytable");
    var newUser = table.tBodies[0].insertRow(1);
    newUser.innerHTML = "<td>" + name + "</td><td>" + email + "</td><td>" + phone + "</td>";
}

messaging.requestPermission()
    .then(function() {
        console.log('Notification permission granted.');
        return messaging.getToken();
    })
    .then(function(token) {
        console.log('Token: ', token);
        document.getElementById("token").textContent = token;
        subscribeTokenToTopic(token, 'dawproject')
    })
    .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });

messaging.onMessage(function(payload) {
    console.log('onMessage: ', payload);
    var table = document.getElementById("messages");
    var newUser = table.tBodies[0].insertRow(1);
    newUser.innerHTML = "<td>" + payload.notification.title + "</td><td>" + payload.notification.body + "</td><td>" + payload.notification.icon + "</td>";
});


function subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'key=YOUR_SERVER_FCM_KEY'
        })
    }).then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "' + topic + '"');
        document.getElementById("topic").textContent = topic;
    }).catch(error => {
        console.error(error);
    })
}
