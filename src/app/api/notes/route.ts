import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { Note } from "@/lib/types";
import * as admin from "firebase-admin";

export async function authenticateRequest(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.warn("Requisição sem cabeçalho de autenticação ou formato inválido.");
        return null
    }

    const idToken = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        console.log("Token decodificado com sucesso:", decodedToken);
        return decodedToken.uid;
    }
    catch (error) {
        console.error("Erro ao verificar o token:", error);
        return null;
    }
}


export async function GET(req: Request) {
    const userId = await authenticateRequest(req);

    if (!userId) {
        return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    try {
        const notesRef = adminDb.collection("notes");
        const q = notesRef
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc");

        const snapshot = await q.get();
        const notes: Note[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data() as Note;

            const createdAtTimestamp = data.createdAt;
            const updatedAtTimestamp = data.updatedAt;

            // Converte admin.firestore.Timestamp para Date e depois para string ISO
            const createdAtISO =
                createdAtTimestamp && typeof (createdAtTimestamp as any).toDate === "function"
                    ? (createdAtTimestamp as admin.firestore.Timestamp).toDate().toISOString()
                    : typeof createdAtTimestamp === "string"
                        ? createdAtTimestamp
                        : new Date().toISOString();

            const updatedAtISO =
                updatedAtTimestamp && typeof (updatedAtTimestamp as any).toDate === "function"
                    ? (updatedAtTimestamp as admin.firestore.Timestamp).toDate().toISOString()
                    : typeof updatedAtTimestamp === "string"
                        ? updatedAtTimestamp
                        : new Date().toISOString();

            notes.push({
                id: doc.id,
                userId: data.userId,
                content: data.content,
                title: data.title,
                tags: data.tags,
                isPinned: data.isPinned,
                createdAt: createdAtISO,
                updatedAt: updatedAtISO
            });
        });

        console.log(`Notas encontradas: ${notes.length}`);
        return NextResponse.json(notes, { status: 200 });
    }
    catch (error) {
        console.error("Erro ao buscar notas:", error);
        return NextResponse.json({ error: "Erro ao buscar notas" }, { status: 500 });
    }
}