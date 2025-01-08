export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex justify-center items-center highlight-link">
      {children}
    </main>
  );
}
