import { Button } from "@/components/ui/button";
import client, { convertWixImageToUrl } from "@/lib/wix";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const books = await client.items
    .queryDataItems({
      dataCollectionId: "Books",
    })
    .find()
    .then((res) => res.items.map((item) => item.data));

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Books</h1>

      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book?._id}>
            <CardHeader>
              <CardTitle>{book?.title}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              {book?.image && (
                <Image
                  width={150}
                  height={200}
                  src={convertWixImageToUrl(book.image)}
                  alt={book?.title}
                  className="w-[150px] h-[200px] mb-4 rounded-lg"
                />
              )}
              <p>{book?.author}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/books/${book?._id}`}>Read Reviews</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Button>Add Book</Button>
    </div>
  );
}
