"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getClient } from "@/lib/wix-client";

import { useRouter } from "next/navigation";

export function AddBookDialog() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>
            If you didn&apos;t find a book you&apos;re looking for, add one
            here.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const title = formData.get("title");
            const author = formData.get("author");
            const isbn = formData.get("isbn");
            const description = formData.get("description");

            const response = await getClient().items.insertDataItem({
              dataCollectionId: "Books",
              dataItem: {
                data: {
                  title,
                  author,
                  isbn,
                  description,
                },
              },
            });

            router.push(`/books/${response.dataItem?._id}`);
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input name="title" id="title" required type="text" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="author">Author</Label>
            <Input name="author" id="author" required type="text" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="isbn">ISBN (optional)</Label>
            <Input name="isbn" id="isbn" type="text" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea name="description" id="description" />
          </div>

          <Button type="submit">Add Book</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
