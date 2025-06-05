'use client';

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter();

  // Redireciona para a página de login se o usuário não estiver autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <form className="max-w-3xl w-full mt-10">
        <input
          type="text"
          placeholder='Busque suas notas...'
          className='w-full bg-transparent text-2xl text-slate-800 rounded-2xl p-4 font-semibold tracking-tight outline-none placeholder:text-slate-500'
        />
        <div className="h-px bg-slate-600"></div>
      </form>
    </div>
  );
}
