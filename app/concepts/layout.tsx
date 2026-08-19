import Sidebar from "@/Components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-7xl gap-3 px-5 pt-24 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="min-w-0 flex-1">{children}</section>
    </main>
  );
}
