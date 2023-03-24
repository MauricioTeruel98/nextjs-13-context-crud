'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export function Navbar() {

    const router = useRouter();

    return (
        <header>
            <Link href='/'>
                <h1>TaskApp</h1>
            </Link>

            <div>
                <button type="" onClick={() => router.push('/new')}>
                    Add Task
                </button>
            </div>
        </header>
    );
}