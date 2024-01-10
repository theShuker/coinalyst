import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 bg-slate-50 border-b border-slate-300">
        <Link href={'/dashboard'} className="text-lg font-bold">
          Coinalyst 🧙‍♂️
        </Link>

        <div className="flex gap-2">
          <Link href="/">Link</Link>
          <Link href="/">Link</Link>
          <Link href="/">Link</Link>
        </div>
      </header>
      <main>{children}</main>
      <footer>f</footer>
    </>
  );
}
