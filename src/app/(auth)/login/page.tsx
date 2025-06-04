'use client';

import ResetPasswordModal from "@/components/resetPasswordModal";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
            setEmail('');
            setPassword('');
        }
        catch (error: any) {
            console.error("Login failed:", error);
            alert(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-10 gap-12 bg-slate-50 border border-slate-700/40 rounded-md shadow-2xl shadow-slate-900">
            <h1 className="text-2xl font-semibold">Entre com a sua conta!</h1>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-200 p-2 border border-slate-400 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-200 p-2 border border-slate-400 rounded"
                    required
                />

                <ResetPasswordModal />

                <button
                    type="submit"
                    className="p-2 bg-slate-800 text-white rounded hover:bg-slate-100 border border-black
                    hover:text-slate-900 hover:transition-colors duration-400">
                    Login
                </button>
            </form>

            <p>Não tem uma conta? <a href="/register" className="text-blue-900 font-semibold hover:underline">cadastre-se aqui!</a></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )

}