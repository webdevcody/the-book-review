import client, { convertWixImageToUrl } from "@/lib/wix";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BookIcon, ChevronLeft, StarIcon } from "lucide-react";
import { PostReviewForm } from "./post-review-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const { data: book } = await client.items.getDataItem(params.bookId, {
    dataCollectionId: "Books",
  });

  const reviews = await client.items
    .queryDataItems({
      dataCollectionId: "Reviews",
    })
    .eq("bookId", params.bookId)
    .find()
    .then((res) => res.items.map((item) => item.data));

  return (
    <div className="container mx-auto py-12 flex flex-col gap-12">
      <div>
        <Button variant="link" asChild>
          <Link href="/books">
            <ChevronLeft /> Back to books
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {book?.image ? (
              <Image
                width={200}
                height={300}
                src={convertWixImageToUrl(book?.image)}
                alt={book?.title}
                className="w-[200px] h-[300px] mb-4 rounded-lg"
              />
            ) : (
              <div className="flex-shrink-0 flex flex-col gap-2 items-center justify-center w-[200px] h-[300px] mb-4 rounded-lg bg-gray-200">
                <BookIcon className="w-10 h-10" />
                <p>No Image</p>
              </div>
            )}
            <div>
              <p className="text-lg font-semibold">By {book?.author}</p>
              <p className="text-sm text-muted-foreground">
                Published in {book?.publishYear}
              </p>
              <p className="mt-4">{book?.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review?._id} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{review?.name}</p>
                  <div className="flex">
                    {[...Array(review?.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2">{review?.review}</p>
              </div>
            ))}
          </div>

          <PostReviewForm bookId={book?._id} />
        </CardContent>
      </Card>
    </div>
  );
}
