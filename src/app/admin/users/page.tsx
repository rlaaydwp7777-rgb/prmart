// src/app/admin/users/page.tsx
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { listAllUsers, setUserRoleAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import type { User } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function RoleBadge({ role }: { role: string }) {
    const variant = role === 'admin' ? 'destructive' : role === 'seller' ? 'default' : 'secondary';
    return <Badge variant={variant}>{role}</Badge>;
}

function RoleActions({ user, onRoleChange }: { user: Partial<User>, onRoleChange: (uid: string, role: 'admin' | 'seller' | 'user') => void }) {
    const [isPending, startTransition] = useTransition();

    const handleRoleChange = (role: 'admin' | 'seller' | 'user') => {
        if (user.uid) {
            startTransition(() => {
                onRoleChange(user.uid!, role);
            });
        }
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "역할 변경"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>역할 지정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleChange('admin')}>관리자로 지정</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('seller')}>판매자로 지정</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('user')}>일반 사용자로 지정</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Partial<User>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { users: fetchedUsers, error: fetchError } = await listAllUsers();
      if (fetchError) {
        setError(fetchError);
      } else {
        setUsers(fetchedUsers);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSetRole = async (uid: string, role: 'admin' | 'seller' | 'user') => {
      const result = await setUserRoleAction(uid, role);
      if (result.success) {
          toast({ title: "성공", description: result.message });
          // Re-fetch users to show the updated role
          fetchUsers();
      } else {
          toast({ title: "오류", description: result.message, variant: 'destructive' });
      }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
      return <p className="text-destructive">오류: {error}</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>사용자 관리</CardTitle>
        <CardDescription>플랫폼에 가입한 모든 사용자를 관리합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UID</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell className="font-mono text-xs">{user.uid}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>
                  <RoleBadge role={user.role || 'user'} />
                </TableCell>
                <TableCell>{new Date(user.createdAt!).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <RoleActions user={user} onRoleChange={handleSetRole} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
