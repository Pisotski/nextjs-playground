import Sidebar from "@/ui/layout/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center h-screen border border-red-400">
      <header className="flex-2 border w-full border-red-400">HEADER</header>
      <main className="flex-10 flex border w-full border-red-400">
        <aside className="flex-2 border border-red-400">
          <Sidebar />
        </aside>
        <div className="flex-8 border border-red-400">{children}</div>
      </main>
      <footer className="flex-1 border w-full border-red-400">FOOTER</footer>
    </div>
  );
}
