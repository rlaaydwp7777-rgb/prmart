"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import type { Prompt as Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type ProductFilter = "all" | "pending" | "approved" | "rejected";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProductFilter>("pending");
  const { toast } = useToast();

  async function fetchProducts() {
    setLoading(true);
    const db = getDb();
    if (!db) {
        toast({ title: "오류", description: "데이터베이스에 연결할 수 없습니다.", variant: "destructive" });
        setLoading(false);
        return;
    }
    try {
      let q;
      if (filter === "all") {
        q = query(collection(db, "products"));
      } else {
        q = query(collection(db, "products"), where("status", "==", filter));
      }

      const snapshot = await getDocs(q);
      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      
      productsList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setProducts(productsList);
    } catch (error) {
      console.error("상품 로드 실패:", error);
      toast({ title: "오류", description: "상품을 불러오는데 실패했습니다.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  async function updateProductStatus(productId: string, newStatus: "approved" | "rejected") {
    const db = getDb();
    if (!db) {
        toast({ title: "오류", description: "데이터베이스에 연결할 수 없습니다.", variant: "destructive" });
        return;
    }
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });

      toast({
        title: "성공",
        description: `상품이 ${newStatus === "approved" ? "승인" : "거부"}되었습니다.`,
      });
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("상태 업데이트 실패:", error);
      toast({ title: "오류", description: "상태 변경에 실패했습니다.", variant: "destructive" });
    }
  }
  
  const getStatusVariant = (status: string) => {
    switch(status) {
        case 'approved': return 'default';
        case 'pending': return 'secondary';
        case 'rejected': return 'destructive';
        default: return 'outline';
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
        case 'approved': return '승인됨';
        case 'pending': return '승인 대기';
        case 'rejected': return '거부됨';
        default: return status;
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>상품 관리</CardTitle>
          <div className="flex gap-2">
            {(["pending", "approved", "rejected", "all"] as ProductFilter[]).map(f => (
                 <Button key={f} variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)}>
                    {f === "pending" ? "승인 대기" : f === "approved" ? "승인됨" : f === "rejected" ? "거부됨" : "전체"}
                </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            해당 상태의 상품이 없습니다.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상품명</TableHead>
                <TableHead>판매자</TableHead>
                <TableHead>가격</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <Link href={`/p/${product.id}`} target="_blank" className="hover:underline">
                      {product.title}
                    </Link>
                  </TableCell>
                  <TableCell>{product.author}</TableCell>
                  <TableCell>₩{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(product.status)}>{getStatusText(product.status)}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {product.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => updateProductStatus(product.id, "approved")}>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          승인
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => updateProductStatus(product.id, "rejected")}>
                          <XCircle className="mr-2 h-4 w-4" />
                          거부
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
