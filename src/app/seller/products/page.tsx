
"use client";

import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
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
import { useAuth } from "@/components/auth/auth-provider";
import { getProductsBySeller } from "@/lib/firebase/services";
import type { Prompt } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function ProductsSkeleton() {
    return (
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
            {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}


export default function SellerProductsPage() {
    const { user, loading: authLoading } = useAuth();
    const [products, setProducts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        if(user) {
            setLoading(true);
            const sellerProducts = await getProductsBySeller(user.uid);
            setProducts(sellerProducts);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if(user) {
            fetchProducts();
        } else if(!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading, fetchProducts]);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight font-headline">{SELLER_STRINGS.PRODUCTS_TITLE}</h1>
            <p className="text-muted-foreground">{SELLER_STRINGS.PRODUCTS_DESC}</p>
        </div>
        <Card className="shadow-sm rounded-xl">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-xl md:text-2xl font-bold tracking-tight font-headline">상품 목록</CardTitle>
                    <CardDescription>{products.length}개의 상품이 있습니다.</CardDescription>
                </div>
                <Button asChild>
                    <Link href="/seller/dashboard">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {SELLER_STRINGS.ADD_NEW_PRODUCT}
                    </Link>
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            {loading || authLoading ? (
                <ProductsSkeleton />
            ) : products.length > 0 ? (
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
                    {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell className="hidden sm:table-cell">
                        <Image
                            alt={product.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={product.image}
                            width="64"
                            data-ai-hint={product.aiHint}
                        />
                        </TableCell>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>
                        <Badge variant={ "default" }>
                            {SELLER_STRINGS.PRODUCT_STATUS_ACTIVE}
                        </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">₩{product.price.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{product.stats?.sales.toLocaleString() ?? 0}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(product.createdAt!).toLocaleDateString()}</TableCell>
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
                            <DropdownMenuItem asChild>
                            <Link href={`/seller/products`}>{SELLER_STRINGS.EDIT}</Link>
                            </DropdownMenuItem>
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
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">{SELLER_STRINGS.EMPTY_PRODUCTS_DATA}</p>
                    <Button asChild>
                        <Link href="/seller/dashboard">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {SELLER_STRINGS.ADD_FIRST_PRODUCT}
                        </Link>
                    </Button>
                </div>
            )}
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
            {SELLER_STRINGS.PRODUCT_COUNT_FOOTER.replace("{count}", products.length.toString())}
            </div>
        </CardFooter>
        </Card>
    </div>
  )
}
