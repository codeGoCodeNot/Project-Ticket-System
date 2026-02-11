import { LucideShield } from "lucide-react";

const AdminBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary border border-border rounded-md">
      <LucideShield className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-foreground">Admin Area</span>
    </div>
  );
};

export default AdminBadge;
