import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getProducts, getIdeaRequest, getProposalsByRequestId } from "@/lib/firebase/services";
import { Separator } from "@/components/ui/separator";
import { ProposalForm } from "@/components/requests/proposal-form";
import { ProposalList } from "@/components/requests/proposal-list";


export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const request = await getIdeaRequest(params.id);
  
  if (!request) {
    notFound();
  }

  // Fetch real proposals for the request
  const [products, proposals] = await Promise.all([
    getProducts(),
    getProposalsByRequestId(params.id)
  ]);

  return (
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Request Details */}
          <div className="space-y-4">
            <div className="flex gap-2">
               {request.category && (
                  <Link href={`/c/${request.categorySlug}`}>
                    <Badge variant="secondary">{request.category}</Badge>
                  </Link>
               )}
              {request.isExample && <Badge variant="outline">예제</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">{request.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                  <User className="w-4 h-4"/>
                  <span>{request.author}</span>
              </div>
              <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4"/>
                  <span>{proposals.length}개 제안</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-primary">
              희망 예산: {request.budget > 0 ? `₩${request.budget.toLocaleString()}` : "협의 가능"}
            </div>

            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {request.description}
            </p>
          </div>

          <Separator className="my-8 md:my-12" />

          <ProposalForm requestId={params.id} />

          <Separator className="my-8 md:my-12" />
          
          <ProposalList initialProposals={proposals} allProducts={products} />

        </div>
      </div>
  );
}