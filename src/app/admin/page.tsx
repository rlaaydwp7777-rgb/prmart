import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              총 매출
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩5,231,890</div>
            <p className="text-xs text-muted-foreground">
              지난 달 대비 +20.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              총 판매량
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              지난 달 대비 +180.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 상품 수</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              지난 달 대비 +19%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              리뷰 평점
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 / 5.0</div>
            <p className="text-xs text-muted-foreground">
              총 231개 리뷰
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>승인 대기 상품</CardTitle>
              <CardDescription>
                AI 품질 검토에서 보류된 상품 목록입니다.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                전체 보기
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>상품명</TableHead>
                  <TableHead className="hidden xl:table-column">
                    판매자
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    상태
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    등록일
                  </TableHead>
                  <TableHead className="text-right">가격</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Next.js 보일러플레이트</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      AI & 생산성
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    김프로
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      검수 대기
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:table-column">
                    2023-06-23
                  </TableCell>
                  <TableCell className="text-right">₩25,000</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">승인</Button>
                  </TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                    <div className="font-medium">미드저니 캐릭터 프롬프트</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      창작 & 디자인
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    디자인고수
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      검수 대기
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:table-column">
                    2023-06-24
                  </TableCell>
                  <TableCell className="text-right">₩5,900</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">승인</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>최근 가입 사용자</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+₩1,999.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+₩39.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
