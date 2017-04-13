# DAW-Firebase-Project

This repository contains an example using [Firebase Realtime Database](https://firebase.google.com/docs/database/?hl=en) and [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/?hl=en) that I will use in my theorical project of DAW (Diseño de Aplicaciones Web).

In order to make it work, you have to:
1. Clone the repository
2. Set your own variable and keys in the next files:
    * [js/fcm.js](https://github.com/Davidcorral94/DAW-Firebase-Project/blob/master/daw-firebase-project/js/fcm.js) (lines 2-6, 80)
    * [firebase-messaging-sw.js](https://github.com/Davidcorral94/DAW-Firebase-Project/blob/master/firebase-messaging-sw.js) (lines 5-9)
3. Set the Firebase Security Rules of the Database to 'true': 
```json
{   
"rules": {
    ".read": "true",
    ".write": "true"
  }
}
```
4. At this point, you will be able to receive Push notifications and to use the HTML form to send JSON Objets to the Realtime database.

You can use the [Firebase Console](https://console.firebase.google.com) to send Push notifications, but also you can use the cURL command that are in [/res/notifications.txt](https://github.com/Davidcorral94/DAW-Firebase-Project/blob/master/daw-firebase-project/res/notifications.txt) to send a Push notification to a specific user or to a specific topic (remember to set your server key).

![Interface](https://i.gyazo.com/eaa0352d3aa7621c19ba1eac11d36d21.png)
*Figure 1 - Interface*

![Push Notification](https://i.gyazo.com/90c54d214ea74574781799ae55d71bf4.png)
*Figure 2 - Push Notification received*

