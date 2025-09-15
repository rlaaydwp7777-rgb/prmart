
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ProductRegistrationForm } from "@/components/seller/product-registration-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SELLER_STRINGS } from "@/lib/string-constants"
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function SellerProductsPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    // This is placeholder data. In a real app, you would fetch this from a server.
    const products = [
        // Example product, will be replaced by actual data fetch
    ];

    const handleProductRegistered = () => {
        setRefreshKey(prevKey => prevKey + 1);
    }
  
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="active">{SELLER_STRINGS.PRODUCT_STATUS_ACTIVE}</TabsTrigger>
          <TabsTrigger value="pending">{SELLER_STRINGS.PRODUCT_STATUS_PENDING}</TabsTrigger>
          <TabsTrigger value="archived">{SELLER_STRINGS.PRODUCT_STATUS_ARCHIVED}</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
            {/* Future buttons like "Filter" or "Export" can go here */}
        </div>
      </div>
      <TabsContent value="all">
        <div className="grid md:grid-cols-3 gap-8 mt-4">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold tracking-tight mb-4">{SELLER_STRINGS.PRODUCTS_TITLE}</h2>
                 {products.length === 0 ? (
                    <div className="text-center py-10 border rounded-lg">
                        <p className="text-muted-foreground">{SELLER_STRINGS.EMPTY_PRODUCTS_DATA}</p>
                    </div>
                ) : (
                <Card>
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
                        {/* Map over products here */}
                        </TableBody>
                    </Table>
                    </CardContent>
                    <CardFooter>
                    <div className="text-xs text-muted-foreground">
                       {SELLER_STRINGS.PRODUCT_COUNT_FOOTER.replace('{count}', String(products.length))}
                    </div>
                    </CardFooter>
                </Card>
                )}
            </div>
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold tracking-tight mb-4">{SELLER_STRINGS.ADD_NEW_PRODUCT}</h2>
                <ProductRegistrationForm onProductRegistered={handleProductRegistered} />
            </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function Card({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`border bg-card text-card-foreground shadow-sm rounded-lg ${className}`} {...props} />
}
function CardHeader({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}
function CardTitle({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}
function CardDescription({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <p className={`text-sm text-muted-foreground ${className}`} {...props} />
}
function CardContent({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`p-6 pt-0 ${className}`} {...props} />
}
function CardFooter({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}
