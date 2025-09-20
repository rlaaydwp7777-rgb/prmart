// src/app/admin/users/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  customClaims?: { [key: string]: any };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = () => {
    setLoading(true);
    fetch("/api/admin/list-users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast({ title: "오류", description: "사용자 목록을 불러오지 못했습니다.", variant: "destructive" });
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (email: string) => {
    setUpdating(email);
    try {
      const res = await fetch("/api/admin/set-admin", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "권한 부여에 실패했습니다.");
      }
      toast({ title: "성공", description: `${email} 사용자에게 관리자 권한이 부여되었습니다.` });
      fetchUsers(); // Refresh the list
    } catch(err: any) {
        toast({ title: "오류", description: err.message, variant: "destructive" });
    } finally {
        setUpdating(null);
    }
  };

  if (loading) return <div className="flex justify-center items-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">사용자 관리</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사용자</TableHead>
              <TableHead>권한</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.uid}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={u.photoURL} alt={u.displayName || u.email} />
                      <AvatarFallback>{(u.displayName || u.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{u.displayName || 'N/A'}</div>
                      <div className="text-sm text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {u.customClaims?.role === "admin" ? (
                    <Badge>Admin</Badge>
                  ) : (
                    <Badge variant="secondary">User</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {u.customClaims?.role === "admin" ? (
                    <span className="text-sm text-muted-foreground">관리자</span>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => makeAdmin(u.email)}
                      disabled={updating === u.email}
                    >
                      {updating === u.email && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      관리자로 지정
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
