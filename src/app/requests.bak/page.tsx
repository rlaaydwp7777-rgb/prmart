// src/app/requests/page.tsx
import { getIdeaRequests, getCategories } from "@/lib/firebase/services";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { RequestList } from "@/components/requests/request-list";
import { Separator } from "@/components/ui/separator";

export default async function RequestsPage() {
  const [requests, categories] = await Promise.all([
      getIdeaRequests(),
      getCategories()
  ]);

  return (
    <div className="space-y-8">
       <div className="flex justify-end">
            <Button asChild>
                <Link href="/requests/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    새로운 아이디어 요청하기
                </Link>
            </Button>
       </div>
       <Separator />
      <RequestList initialRequests={requests} allCategories={categories} />
    </div>
  );
}
