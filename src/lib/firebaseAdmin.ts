import * as admin from 'firebase-admin';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY

if (!projectId || !clientEmail || !privateKey) {
    console.error("ERRO: Variáveis de ambiente do Firebase Admin SDK não configuradas!");
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey,
      }),
    });
    console.log("Firebase Admin SDK inicializado com sucesso!");
  } catch (error: any) {
    console.error("Erro ao inicializar Firebase Admin SDK:", error.message, error.stack);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();