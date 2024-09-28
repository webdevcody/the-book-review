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
import { BookIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { AddBookDialog } from "./add-book-dialog";

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const books = await client.items
    .queryDataItems({
      dataCollectionId: "Books",
    })
    .startsWith("title", searchParams.search ?? "")
    .find()
    .then((res) => res.items.map((item) => item.data));

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <form
          action={async (formData) => {
            "use server";
            const search = formData.get("search");
            redirect(`/books?search=${search}`);
          }}
          className="flex gap-2"
        >
          <Input name="search" type="text" placeholder="Search books" />
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </form>

        <AddBookDialog />
      </div>

      {books.length === 0 && (
        <div className="border p-12 flex flex-col gap-4 items-center justify-center">
          <Image
            width={200}
            height={200}
            src={"/not-found.svg"}
            alt={"book not found icon"}
          />
          <p>No books found</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book?._id}>
            <CardHeader>
              <CardTitle>{book?.title}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              {book?.image ? (
                <Image
                  width={150}
                  height={200}
                  src={convertWixImageToUrl(book.image)}
                  alt={book?.title}
                  className="w-[150px] h-[200px] mb-4 rounded-lg"
                />
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center w-[150px] h-[200px] mb-4 rounded-lg bg-gray-200">
                  <BookIcon className="w-10 h-10" />
                  <p>No Image</p>
                </div>
              )}
              <p>{book?.author}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary">
                <Link href={`/books/${book?._id}`}>Read Reviews</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
