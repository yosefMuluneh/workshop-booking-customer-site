'use client';
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  // Redirect to the workshops page
  router.push("/workshops");

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Redirecting to Workshops...</h1>
    </div>
  );
}
export default Page;