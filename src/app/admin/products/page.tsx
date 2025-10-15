// src/app/admin/products/page.tsx
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getProducts } from "@/lib/firebase/services"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, MoreHorizontal, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import React, { useState, useEffect, useTransition } from "react"
import type { Prompt, ProductStatus } from "@/lib/types"
import { updateProductStatusAction } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"


function ProductActions({ product, onStatusChange }: { product: Prompt, onStatusChange: (productId: string, status: ProductStatus) => void }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleAction = (status: 'approved' | 'rejected') => {
        startTransition(async () => {
            const result = await updateProductStatusAction(product.id, status);
            if (result.success) {
                toast({ title: '성공', description: result.message });
                onStatusChange(product.id, status);
            } else {
                toast({ title: '오류', description: result.message, variant: 'destructive' });
            }
        });
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                <span className="sr-only">메뉴 열기</span>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>작업</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {product.status === 'pending' && (
                <>
                    <DropdownMenuItem onClick={() => handleAction('approved')}>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        승인
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('rejected')} className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        거부
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </>
            )}
                <DropdownMenuItem asChild>
                    <Link href={`/p/${product.id}`} target="_blank" rel="noopener noreferrer">상품 보기</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>판매자 정보 보기</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default function AdminProductsPage() {
  const [products, setProducts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
        const allProducts = await getProducts();
        setProducts(allProducts.sort((a,b) => {
            // sort by pending status first
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }));
    } catch(error) {
        console.error("Failed to fetch products for admin", error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleStatusChange = (productId: string, newStatus: ProductStatus) => {
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === productId ? { ...p, status: newStatus } : p)
      );
  }


  if (loading) {
      return (
          <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 관리</CardTitle>
        <CardDescription>
          플랫폼에 등록된 모든 상품을 관리합니다. '승인 대기' 상품을 검토하고 상태를 변경할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>상품명</TableHead>
              <TableHead>판매자</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                    <Link href={`/p/${product.id}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        {product.title}
                    </Link>
                </TableCell>
                <TableCell>{product.author}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₩{product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    product.status === 'approved' ? 'default' :
                    product.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {product.status === 'approved' ? '승인됨' : product.status === 'pending' ? '승인 대기' : '거부됨'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                   <ProductActions product={product} onStatusChange={handleStatusChange} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
