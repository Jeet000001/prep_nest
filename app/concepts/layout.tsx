import Sidebar from "@/Components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex h-dvh w-full max-w-7xl gap-3 overflow-hidden px-5 pb-4 pt-24 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="min-h-0 min-w-0 flex-1">{children}</section>
    </main>
  );
}
