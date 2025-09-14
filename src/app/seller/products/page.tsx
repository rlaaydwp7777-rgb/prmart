
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
import { SELLER_STRINGS } from "@/lib/string-constants"

const mockProducts = [
  { 
    id: "prod_1", 
    name: "Next.js 14 Boilerplate", 
    status: SELLER_STRINGS.PRODUCT_STATUS_ACTIVE, 
    price: 25000, 
    sales: 1234, 
    createdAt: "2023-07-12",
    image: "https://picsum.photos/400/300?random=1"
  },
  { 
    id: "prod_2", 
    name: "Minimalist UI Kit", 
    status: SELLER_STRINGS.PRODUCT_STATUS_ACTIVE, 
    price: 35000, 
    sales: 982, 
    createdAt: "2023-10-21",
    image: "https://picsum.photos/400/300?random=2"
  },
  { 
    id: "prod_3", 
    name: "AI Stock Analyzer", 
    status: SELLER_STRINGS.PRODUCT_STATUS_PENDING, 
    price: 50000, 
    sales: 0, 
    createdAt: "2024-05-28",
    image: "https://picsum.photos/400/300?random=4"
  },
   { 
    id: "prod_4", 
    name: "Email Marketing Sequences", 
    status: SELLER_STRINGS.PRODUCT_STATUS_ACTIVE, 
    price: 18000, 
    sales: 721, 
    createdAt: "2023-04-01",
    image: "https://picsum.photos/400/300?random=3"
  },
   { 
    id: "prod_5", 
    name: "Travel Itinerary Template", 
    status: SELLER_STRINGS.PRODUCT_STATUS_ARCHIVED, 
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
                <CardTitle>{SELLER_STRINGS.PRODUCTS_TITLE}</CardTitle>
                <CardDescription>{SELLER_STRINGS.PRODUCTS_DESC}</CardDescription>
            </div>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                {SELLER_STRINGS.ADD_NEW_PRODUCT}
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">{SELLER_STRINGS.PRODUCT_TABLE_HEADER_IMAGE}</span>
              </TableHead>
              <TableHead>{SELLER_STRINGS.PRODUCT_TABLE_HEADER_NAME}</TableHead>
              <TableHead>{SELLER_STRINGS.PRODUCT_TABLE_HEADER_STATUS}</TableHead>
              <TableHead className="hidden md:table-cell">{SELLER_STRINGS.PRODUCT_TABLE_HEADER_PRICE}</TableHead>
              <TableHead className="hidden md:table-cell">{SELLER_STRINGS.PRODUCT_TABLE_HEADER_TOTAL_SALES}</TableHead>
              <TableHead className="hidden md:table-cell">{SELLER_STRINGS.PRODUCT_TABLE_HEADER_CREATED_AT}</TableHead>
              <TableHead>
                <span className="sr-only">{SELLER_STRINGS.PRODUCT_TABLE_HEADER_ACTIONS}</span>
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
                    product.status === SELLER_STRINGS.PRODUCT_STATUS_ACTIVE ? "default" :
                    product.status === SELLER_STRINGS.PRODUCT_STATUS_PENDING ? "secondary" : "destructive"
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
                      <DropdownMenuLabel>{SELLER_STRINGS.PRODUCT_TABLE_HEADER_ACTIONS}</DropdownMenuLabel>
                      <DropdownMenuItem>{SELLER_STRINGS.EDIT}</DropdownMenuItem>
                      <DropdownMenuItem>{SELLER_STRINGS.DUPLICATE}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        {SELLER_STRINGS.DELETE}
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
          {SELLER_STRINGS.PRODUCT_COUNT_FOOTER.replace("{count}", mockProducts.length.toString())}
        </div>
      </CardFooter>
    </Card>
  )
}
