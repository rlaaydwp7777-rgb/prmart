
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_STRINGS } from "@/lib/string-constants";
import { getProductsBySeller } from "@/lib/firebase/services";
import { auth } from "@/lib/firebase/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from 'date-fns';

export default async function SellerProductsPage() {
    const user = auth.currentUser;
    if (!user) {
        redirect('/login');
    }

    const products = await getProductsBySeller(user.uid);
  
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-4">
        <div className="md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight mb-4">{SELLER_STRINGS.PRODUCTS_TITLE}</h2>
             {products.length === 0 ? (
                <div className="text-center py-10 border rounded-lg bg-card">
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
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                    <Image
                                        alt={product.title}
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={product.image}
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{product.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{/* Status Logic Here */ SELLER_STRINGS.PRODUCT_STATUS_ACTIVE}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">₩{product.price.toLocaleString()}</TableCell>
                                <TableCell className="hidden md:table-cell">{product.stats.sales}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {format(new Date(product.createdAt), "yyyy-MM-dd")}
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
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
                   {SELLER_STRINGS.PRODUCT_COUNT_FOOTER.replace('{count}', String(products.length))}
                </div>
                </CardFooter>
            </Card>
            )}
        </div>
        <div className="md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight mb-4">{SELLER_STRINGS.ADD_NEW_PRODUCT}</h2>
            <ProductRegistrationForm />
        </div>
    </div>
  )
}
