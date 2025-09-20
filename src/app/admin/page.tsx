// src/app/admin/page.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-6">대시보드</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>총 매출</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₩ 12,345,678</div>
                        <p className="text-xs text-muted-foreground">+20.1% 지난 달 대비</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>총 회원 수</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,350</div>
                        <p className="text-xs text-muted-foreground">+180.1% 지난 달 대비</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>총 판매량</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% 지난 달 대비</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>승인 대기 상품</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">30개 신규</p>
                    </CardContent>
                </Card>
            </div>
            {/* More dashboard components can be added here */}
        </div>
    );
}
