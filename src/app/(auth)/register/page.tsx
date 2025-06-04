'use client';


import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            if (password !== rePassword) {
                setError("As senhas não coincidem.");
                return;
            }
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            setRePassword('');
            alert("Usuário registrado com sucesso!");
            router.push('/login');
        }
        catch(error: any) {
            console.error("Erro ao registrar usuário:", error);
            setError(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-10 gap-12 bg-slate-50 border border-slate-700/40 rounded-md shadow-2xl shadow-slate-900">
            <h1 className="text-2xl font-semibold">Crie sua conta!</h1>
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
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
                <input 
                    type="password" 
                    placeholder="Confirme a senha" 
                    value={rePassword} 
                    onChange={(e) => setRePassword(e.target.value)} 
                    className="bg-slate-200 p-2 border border-slate-400 rounded" 
                    required 
                />
                <p className="text-[12px] text-slate-600 font-bold">A senha deve conter no mínimo 6 caracteres</p>
                <button 
                    type="submit" 
                    onClick={handleRegister} 
                    className="p-2 bg-slate-800 text-white rounded hover:bg-slate-100 border border-black
                    hover:text-slate-900 hover:transition-colors duration-400">
                    Registrar
                </button>
            </form>

            <p>Já tem uma conta? <a href="/login" className="text-blue-900 font-semibold hover:underline">Faça login aqui!</a></p>
        </div>
    )
}