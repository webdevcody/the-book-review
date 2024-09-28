import { Button } from "@/components/ui/button";
import { getMember, getServerClient } from "@/lib/wix";
import { StarIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ReviewsPage() {
  const member = await getMember();

  if (!member) {
    return redirect("/");
  }

  const reviews = await getServerClient()
    .items.queryDataItems({
      dataCollectionId: "Reviews",
    })
    .eq("_owner", member.id)
    .find()
    .then((res) => res.items.map((item) => item.data));

  console.log("reviews", reviews);

  return (
    <div className="container mx-auto py-12 space-y-8">
      <h1 className="text-2xl font-bold">Your Reviews</h1>

      {reviews.length === 0 && (
        <div className="border p-12 flex flex-col gap-4 items-center justify-center">
          <Image
            width={200}
            height={200}
            src={"/not-found.svg"}
            alt={"book not found icon"}
          />
          <p>You have not reviewed any books yet</p>
        </div>
      )}

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
            <form
              action={async () => {
                "use server";
                await getServerClient().items.removeDataItem(review?._id, {
                  dataCollectionId: "Reviews",
                });
                revalidatePath("/reviews");
              }}
            >
              <Button>Delete</Button>
            </form>
          </div>
          <p className="mt-2">{review?.review}</p>
        </div>
      ))}
    </div>
  );
}
