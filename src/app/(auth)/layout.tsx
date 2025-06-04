export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-300 text-slate-900">
      {children}
    </div>
  );
}