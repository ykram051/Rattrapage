const firebase = require("firebase/app");
require("firebase/firestore");

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjNghy6ruAoStwvKi9PPA7GBe6jLI-y1c",
  authDomain: "forum-409f1.firebaseapp.com",
  projectId: "forum-409f1",
  storageBucket: "forum-409f1.appspot.com",
  messagingSenderId: "795161880345",
  appId: "1:795161880345:web:21ac114342253123188788"
};



// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Obtenir une référence à la base de données Firestore
const db = firebase.firestore();
module.exports = { db };

const events = {
  "event1": {
    "title": "Concert de fin d'année",
    "description": "Un concert pour célébrer la fin de l'année universitaire.",
    "date": "2024-07-01T18:00:00Z",
    "yesVotes": 100,
    "noVotes": 20,
    "createdAt": "2024-06-20T12:00:00Z",
    "updatedAt": "2024-06-25T15:30:00Z"
  },
  "event2": {
    "title": "Conférence sur l'IA",
    "description": "Une conférence sur les dernières avancées en intelligence artificielle.",
    "date": "2024-08-15T10:00:00Z",
    "yesVotes": 250,
    "noVotes": 45,
    "createdAt": "2024-07-10T09:00:00Z",
    "updatedAt": "2024-07-25T11:15:00Z"
  },
  "event3": {
    "title": "Journée portes ouvertes",
    "description": "Venez découvrir notre campus et rencontrer nos enseignants.",
    "date": "2024-09-05T09:00:00Z",
    "yesVotes": 180,
    "noVotes": 30,
    "createdAt": "2024-08-01T14:00:00Z",
    "updatedAt": "2024-08-20T16:45:00Z"
  },
  "event4": {
    "title": "Gala de charité",
    "description": "Un gala pour lever des fonds pour une cause noble.",
    "date": "2024-11-20T19:00:00Z",
    "yesVotes": 320,
    "noVotes": 60,
    "createdAt": "2024-10-15T18:00:00Z",
    "updatedAt": "2024-10-30T20:30:00Z"
  },
  "event5": {
    "title": "Hackathon étudiant",
    "description": "Un hackathon de 48 heures pour les étudiants en informatique.",
    "date": "2024-10-10T08:00:00Z",
    "yesVotes": 400,
    "noVotes": 80,
    "createdAt": "2024-09-01T10:00:00Z",
    "updatedAt": "2024-09-20T13:30:00Z"
  }
}


const votes = {
  "vote1": {
    "eventId": "event123",
    "userId": "user456",
    "vote": "yes",
    "createdAt": "2024-06-25T15:30:00Z"
  },
  "vote2": {
    "eventId": "event124",
    "userId": "user457",
    "vote": "no",
    "createdAt": "2024-07-01T10:15:00Z"
  },
  "vote3": {
    "eventId": "event125",
    "userId": "user458",
    "vote": "yes",
    "createdAt": "2024-07-02T12:45:00Z"
  },
  "vote4": {
    "eventId": "event126",
    "userId": "user459",
    "vote": "no",
    "createdAt": "2024-07-03T14:00:00Z"
  },
  "vote5": {
    "eventId": "event127",
    "userId": "user460",
    "vote": "yes",
    "createdAt": "2024-07-04T16:30:00Z"
  },
  "vote6": {
    "eventId": "event128",
    "userId": "user461",
    "vote": "no",
    "createdAt": "2024-07-05T18:00:00Z"
  },
  "vote7": {
    "eventId": "event129",
    "userId": "user462",
    "vote": "yes",
    "createdAt": "2024-07-06T09:15:00Z"
  },
  "vote8": {
    "eventId": "event130",
    "userId": "user463",
    "vote": "no",
    "createdAt": "2024-07-07T11:45:00Z"
  },
  "vote9": {
    "eventId": "event131",
    "userId": "user464",
    "vote": "yes",
    "createdAt": "2024-07-08T13:30:00Z"
  },
  "vote10": {
    "eventId": "event132",
    "userId": "user465",
    "vote": "no",
    "createdAt": "2024-07-09T15:00:00Z"
  },
  "vote11": {
    "eventId": "event133",
    "userId": "user466",
    "vote": "yes",
    "createdAt": "2024-07-10T16:30:00Z"
  },
  "vote12": {
    "eventId": "event134",
    "userId": "user467",
    "vote": "no",
    "createdAt": "2024-07-11T18:00:00Z"
  },
  "vote13": {
    "eventId": "event135",
    "userId": "user468",
    "vote": "yes",
    "createdAt": "2024-07-12T10:15:00Z"
  },
  "vote14": {
    "eventId": "event136",
    "userId": "user469",
    "vote": "no",
    "createdAt": "2024-07-13T12:45:00Z"
  },
  "vote15": {
    "eventId": "event137",
    "userId": "user470",
    "vote": "yes",
    "createdAt": "2024-07-14T14:00:00Z"
  }
};

// Fonction pour enregistrer les données dans Firestore
const saveDataToFirestore = async (data, collectionName) => {
  try {
    for (const key in data) {
      const item = data[key];
      await db.collection(collectionName).doc(key).set(item);
    }
    console.log(`${collectionName} saved successfully to Firestore.`);
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
};

// Fonction à appeler pour enregistrer les données d'exemple
function saveSampleDataToFirestore() {
  saveDataToFirestore(events, 'events');
  saveDataToFirestore(votes, 'votes');
}

// Appel de la fonction pour enregistrer les données
saveSampleDataToFirestore();

module.exports = { db };
