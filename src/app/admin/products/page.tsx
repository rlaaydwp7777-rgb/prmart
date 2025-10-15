// src/app/admin/products/page.tsx
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
import { CheckCircle2, XCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import Link from "next/link"


export default async function AdminProductsPage() {
  const products = await getProducts(); // Fetches all products including pending ones

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
                    <Link href={`/p/${product.id}`} className="hover:underline" target="_blank">
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
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">메뉴 열기</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>작업</DropdownMenuLabel>
                        {product.status === 'pending' && (
                            <>
                                <DropdownMenuItem>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    승인
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    거부
                                </DropdownMenuItem>
                            </>
                        )}
                         <DropdownMenuItem>상품 보기</DropdownMenuItem>
                         <DropdownMenuItem>판매자 정보 보기</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
