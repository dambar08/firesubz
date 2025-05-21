"server-only"
import { initFirestore } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import  serviceAccount from  "@/server/firebase/service-account.json";

export const firestore = initFirestore({
  credential: cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
})