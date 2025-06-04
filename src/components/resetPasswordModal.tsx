"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTrigger, DialogTitle } from "./ui/dialog";


export default function ResetPasswordModal() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);



    return (
        <Dialog>
            <DialogTrigger>Esqueceu sua senha?</DialogTrigger>
            <DialogContent className="flex flex-col items-center justify-center border border-slate-700/40 bg-slate-50 rounded-md shadow-2xl shadow-slate-900 p-10 gap-6">
                <DialogTitle>Recuperar senha</DialogTitle>
                <DialogDescription>Insira o seu e-mail para receber o link de redefinição de senha</DialogDescription>

                <form className="flex flex-col gap-6">
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

                </form>
            </DialogContent>
        </Dialog>
    )
}