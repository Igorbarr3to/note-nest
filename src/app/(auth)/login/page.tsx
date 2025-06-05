'use client';

import ResetPasswordModal from "@/components/resetPasswordModal";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
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
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        if (!email) {
            setError("Por favor, insira um e-mail válido.");
            setLoading(false);
            setEmail('');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("E-mail de redefinição de senha enviado com sucesso!");
            setLoading(false);
            setEmail('');
        }
        catch (error: any) {
            let errorMessage = "Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente mais tarde.";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "O endereço de e-mail é inválido.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "Não há registro de usuário correspondente a este e-mail. Por favor, verifique o e-mail digitado.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Muitas solicitações. Por favor, tente novamente mais tarde.";
                    break;
                default:
                    errorMessage = `Erro: ${error.message}`;
                    break;
            }
            setError(errorMessage);
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

                <button
                    type="submit"
                    className="p-2 bg-slate-800 text-white rounded hover:bg-slate-100 border border-black
                    hover:text-slate-900 hover:transition-colors duration-400">
                    Login
                </button>
                <p>Não tem uma conta? <a href="/register" className="text-blue-900 font-semibold hover:underline">cadastre-se aqui!</a></p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <ResetPasswordModal
                email={email}
                setEmail={setEmail}
                message={message}
                error={error}
                loading={loading}
                handleResetPassword={handleResetPassword}
            />
        </div>
    )

}