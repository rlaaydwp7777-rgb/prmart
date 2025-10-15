import type { OrderStatus } from "@/lib/types";

export function getStatusBadgeVariant(status: OrderStatus): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case 'paid':
        case 'released':
            return 'default';
        case 'clearing_hold':
            return 'outline';
        case 'refunded':
        case 'chargeback':
            return 'destructive';
        default:
            return 'secondary';
    }
}

export function getStatusText(status: OrderStatus): string {
    switch (status) {
        case 'created': return '주문 생성됨';
        case 'paid': return '결제 완료';
        case 'clearing_hold': return '정산 보류';
        case 'released': return '정산 완료';
        case 'refunded': return '환불됨';
        case 'disputed': return '분쟁 중';
        case 'chargeback': return '차지백';
        default: return status;
    }
}
