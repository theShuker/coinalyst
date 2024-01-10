import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <>
      <main className="h-svh flex flex-col gap-4 justify-center items-center p-4">
        <span className="text-5xl">📈🧙‍♂️</span>
        <h1 className="text-7xl font-bold">Coinalyst</h1>
        <p className="text-3xl max-w-[600px] text-center">
          a telegram bot which helps you analyze your expenses and be wise!{' '}
        </p>
        <Link href={'/dashboard/'}>
          <Button>Go to dashboard</Button>
        </Link>
      </main>
    </>
  );
}
