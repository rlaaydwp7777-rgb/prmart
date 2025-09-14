
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Order } from "@/lib/types"

interface RecentSalesProps {
    sales: Order[];
}

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${sale.buyerEmail}.png`} alt={sale.buyerName} />
            <AvatarFallback>{sale.buyerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.buyerName}</p>
            <p className="text-sm text-muted-foreground">
              {sale.buyerEmail}
            </p>
          </div>
          <div className="ml-auto font-medium">+₩{sale.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
