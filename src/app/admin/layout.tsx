// This is a placeholder for the admin layout.
// It will be expanded with a sidebar and header for admin-specific navigation.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/40 min-h-screen">
      {/* Admin-specific header or navigation could go here */}
      <main>{children}</main>
    </div>
  );
}
