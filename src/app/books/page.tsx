import client from "@/lib/wix";

export default async function Home() {
  const books = await client.items
    .queryDataItems({
      dataCollectionId: "Books",
    })
    .find()
    .then((res) => res.items.map((item) => item.data));

  console.log(books);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Books</h1>

      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book?._id}>
            <h2>{book?.title}</h2>
            <p>{book?.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
