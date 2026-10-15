const {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
} = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getStorage } = require("firebase-admin/storage");
const firebaseConfig = require("../config/firebase-config.json");

function getCredential() {
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  };
  const hasServiceAccount = Object.values(serviceAccount).some(Boolean);

  if (hasServiceAccount) {
    const requiredFields = ["project_id", "private_key", "client_email"];
    const missingFields = requiredFields.filter(
      (field) => !serviceAccount[field],
    );
    if (missingFields.length) {
      throw new Error(
        `Missing Firebase environment variables: ${missingFields
          .map((field) => `FIREBASE_${field.toUpperCase()}`)
          .join(", ")}`,
      );
    }

    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n",
    );
    return cert(serviceAccount);
  }

  // Supports Google Application Default Credentials in deployed environments.
  return applicationDefault();
}

const app =
  getApps()[0] ||
  initializeApp({
    credential: getCredential(),
    projectId: firebaseConfig.projectId,
    ...(firebaseConfig.storageBucket
      ? { storageBucket: firebaseConfig.storageBucket }
      : {}),
  });

module.exports = {
  admin: require("firebase-admin"),
  app,
  auth: getAuth(app),
  storage: getStorage(app),
};
