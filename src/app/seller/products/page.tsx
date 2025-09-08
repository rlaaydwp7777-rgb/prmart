
import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockProducts = [
  { 
    id: "prod_1", 
    name: "Next.js 14 Boilerplate", 
    status: "판매중", 
    price: 25000, 
    sales: 1234, 
    createdAt: "2023-07-12",
    image: "https://picsum.photos/400/300?random=1"
  },
  { 
    id: "prod_2", 
    name: "Minimalist UI Kit", 
    status: "판매중", 
    price: 35000, 
    sales: 982, 
    createdAt: "2023-10-21",
    image: "https://picsum.photos/400/300?random=2"
  },
  { 
    id: "prod_3", 
    name: "AI Stock Analyzer", 
    status: "검수중", 
    price: 50000, 
    sales: 0, 
    createdAt: "2024-05-28",
    image: "https://picsum.photos/400/300?random=4"
  },
   { 
    id: "prod_4", 
    name: "Email Marketing Sequences", 
    status: "판매중", 
    price: 18000, 
    sales: 721, 
    createdAt: "2023-04-01",
    image: "https://picsum.photos/400/300?random=3"
  },
   { 
    id: "prod_5", 
    name: "Travel Itinerary Template", 
    status: "보류", 
    price: 10000, 
    sales: 50, 
    createdAt: "2024-02-15",
    image: "https://picsum.photos/400/300?random=5"
  },
];


export default function SellerProductsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>상품 관리</CardTitle>
                <CardDescription>등록된 상품 목록을 확인하고 관리합니다.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                새 상품 추가
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden md:table-cell">가격</TableHead>
              <TableHead className="hidden md:table-cell">총 판매량</TableHead>
              <TableHead className="hidden md:table-cell">등록일</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={product.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.image}
                    width="64"
                    data-ai-hint="abstract design"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                   <Badge variant={
                    product.status === "판매중" ? "default" :
                    product.status === "검수중" ? "secondary" : "destructive"
                  }>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">₩{product.price.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{product.sales.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{product.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>수정</DropdownMenuItem>
                      <DropdownMenuItem>복제</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          총 <strong>{mockProducts.length}개</strong>의 상품이 있습니다.
        </div>
      </CardFooter>
    </Card>
  )
}
