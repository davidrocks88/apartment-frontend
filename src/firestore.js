import firebase from 'firebase/app'
require("firebase/firestore");

let db;
try {
  const firebaseApp = firebase.initializeApp({
    "apiKey": process.env.REACT_APP_apiKey,
    "authDomain": process.env.REACT_APP_authDomain,
    "databaseURL": process.env.REACT_APP_databaseURL,
    "projectId": process.env.REACT_APP_projectId,
    "storageBucket": process.env.REACT_APP_storageBucket,
    "messagingSenderId": process.env.REACT_APP_messagingSenderId,
    "appId": process.env.REACT_APP_appId,
    "measurementId": process.env.REACT_APP_measurementId,
  });
  db = firebaseApp.firestore();
} catch(e) {
  console.log(e);
}

async function getCommunities() {
  return new Promise((resolve, reject) => {
    db.collection("communities").get()
      .then((querySnapshot) => {
        const communities = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const {latitude, longitude} = doc.data().location;
          data.location = {latitude, longitude};
          data.averagePrices = [2000, 2100];
          communities.push(data);
        });
        resolve(communities);
    })
    .catch(e => {console.log(e); reject(e)})  
  })
}

async function getApartments() {
  return new Promise((resolve, reject) => {
    db.collection("apartments").get()
      .then((querySnapshot) => {
        const apartments = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const fixedPrices = data.prices.map(p=>{return {price: p.price, date: p.date.toDate().toString()}})
          fixedPrices.sort((p1, p2)=>(new Date(p2.date)) - (new Date(p1.date)));
          data.currentPrice = fixedPrices[0].price;
          data.prices = fixedPrices;

          apartments.push(data);
        });
        resolve(apartments);
    })
    .catch(e => {console.log(e); reject(e)})  
  })
}

export { getCommunities, getApartments };