import client, { convertWixImageToUrl } from "@/lib/wix";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const { data: book } = await client.items.getDataItem(params.bookId, {
    dataCollectionId: "Books",
  });

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Image
              width={200}
              height={300}
              src={convertWixImageToUrl(book?.image)}
              alt={book?.title}
              className="w-[200px] h-[300px] mb-4 rounded-lg"
            />
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
    </div>
  );
}
