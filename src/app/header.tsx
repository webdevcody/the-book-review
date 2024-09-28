"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="bg-gray-100 border-b py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Button variant="link" asChild>
          <Link
            href="/"
            className="text-3xl flex items-center gap-2 font-[family-name:var(--font-dancing-script)]"
          >
            <Image src="/book.png" width={60} height={60} alt="TheBookClub" />
            TheBookClub
          </Link>
        </Button>

        <Button asChild variant="link">
          <Link href="/books">Browse Books</Link>
        </Button>

        <div>
          <Button variant="outline">Login</Button>
        </div>
      </div>
    </div>
  );
}
