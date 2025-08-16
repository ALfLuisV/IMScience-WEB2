import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import serviceAccount from '../../config/service-account-key-template.json' assert { type: "json" }

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: "imscience-1c1f2"
    });
}

const auth = getAuth();

export default auth;