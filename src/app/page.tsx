import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-24 flex justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center max-w-3xl">
        <Image
          src="/book.png"
          alt="TheBookClub Logo"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to TheBookClub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover, share, and review your favorite books with a community of
          book lovers.
        </p>
        <Button asChild size="lg">
          <Link href="/books">Explore Books</Link>
        </Button>
      </div>
    </div>
  );
}
