"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <div className="bg-gray-100 border-b py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Button variant="link" asChild>
          <Link href="/">TheBookClub</Link>
        </Button>

        <Button asChild variant="link">
          <Link href="/books">Browse Books</Link>
        </Button>

        <div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}
