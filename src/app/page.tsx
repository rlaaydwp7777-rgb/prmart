import { redirect } from 'next/navigation';

export default function RootPage() {
  // The main page is now at / or served by the (main) route group.
  // This page is no longer necessary, but we can keep it as a redirect.
  redirect('/');
}
