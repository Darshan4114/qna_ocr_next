var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("../public/qnaOcrServiceAccountKey.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}
export { firebaseAdmin };
