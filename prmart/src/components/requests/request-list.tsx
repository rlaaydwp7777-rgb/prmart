// src/components/requests/request-list.tsx
"use client";

import * as React from 'react';
import type { IdeaRequest, Category } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface RequestListProps {
  initialRequests: IdeaRequest[];
  allCategories: Category[];
}

export function RequestList({ initialRequests, allCategories }: RequestListProps) {
  const [requests, setRequests] = React.useState(initialRequests);
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredRequests = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return requests;
    }
    return requests.filter(req => req.categorySlug === selectedCategory);
  }, [requests, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-start gap-2">
        <Button
          onClick={() => setSelectedCategory('all')}
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
        >
          전체
        </Button>
        {allCategories.map(cat => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            variant={selectedCategory === cat.slug ? 'default' : 'outline'}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map(request => (
          <Card key={request.id} className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <Link href={`/c/${request.categorySlug}`}>
                        <Badge variant="secondary">{request.category}</Badge>
                    </Link>
                    {request.isExample && <Badge variant="outline">예제</Badge>}
                </div>
              <CardTitle className="line-clamp-2 leading-tight">
                <Link href={`/requests/${request.id}`} className="hover:underline">
                    {request.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                {request.description}
              </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4"/>
                        <span>{request.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4"/>
                        <span>{request.proposals}개 제안</span>
                    </div>
                </div>
                 <div className="mt-4">
                     <p className="text-lg font-bold text-primary">
                        희망 예산: {request.budget > 0 ? `₩${request.budget.toLocaleString()}` : '협의'}
                     </p>
                </div>
                <Button asChild className="w-full mt-4">
                    <Link href={`/requests/${request.id}`}>
                        제안하기
                    </Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
