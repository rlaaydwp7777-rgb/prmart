
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";

const downloadableProducts = [
  { id: "1", name: "Next.js 14 Boilerplate", purchaseDate: "2024-05-20", version: "1.2.0" },
  { id: "2", name: "Minimalist UI Kit", purchaseDate: "2024-05-18", version: "2.0.1" },
  { id: "3", name: "Email Marketing Sequences", purchaseDate: "2024-05-15", version: "1.0.0" },
];

export default function DownloadsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ACCOUNT_STRINGS.DOWNLOADS_TITLE}</CardTitle>
        <CardDescription>{ACCOUNT_STRINGS.DOWNLOADS_DESC}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_PRODUCT_NAME}</TableHead>
              <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_PURCHASE_DATE}</TableHead>
              <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_VERSION}</TableHead>
              <TableHead className="text-right">{ACCOUNT_STRINGS.DOWNLOADS_ACTION}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {downloadableProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.purchaseDate}</TableCell>
                <TableCell>{product.version}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {ACCOUNT_STRINGS.DOWNLOADS_BUTTON}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
