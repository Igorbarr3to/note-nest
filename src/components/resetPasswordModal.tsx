"use client";

import { Dialog, DialogContent, DialogDescription, DialogTrigger, DialogTitle } from "./ui/dialog";

interface ResetPasswordModalProps {
    email: string;
    setEmail: (email: string) => void;
    loading: boolean;
    message: string | null;
    error: string | null;
    handleResetPassword: (e: React.FormEvent) => Promise<void>;
}

export default function ResetPasswordModal({
    email,
    setEmail,
    loading,
    message,
    error,
    handleResetPassword
}: ResetPasswordModalProps) {

    return (
        <Dialog>
            <DialogTrigger>Esqueceu sua senha?</DialogTrigger>
            <DialogContent className="flex flex-col items-center justify-center border border-slate-700/40 bg-slate-50 rounded-md shadow-2xl shadow-slate-900 p-10 gap-6">
                <DialogTitle>Recuperar senha</DialogTitle>
                <DialogDescription>Insira o seu e-mail para receber o link de redefinição de senha</DialogDescription>

                <form className="flex flex-col gap-6" onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-slate-200 p-2 border border-slate-400 rounded"
                    />

                    <button
                        type="submit"
                        className="p-2 bg-slate-800 text-white rounded hover:bg-slate-100 border border-black hover:text-slate-900 hover:transition-colors duration-400"
                    >
                        Enviar
                    </button>
                    {loading && <p>Enviando...</p>}
                    {message && <p className="text-green-600">{message}</p>}
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            </DialogContent>
        </Dialog>
    )
}