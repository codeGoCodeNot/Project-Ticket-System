import { Button } from "@/components/ui/button";
import { organizationsPath } from "@/path";
import { LucideAlertCircle, LucidePhone } from "lucide-react";
import Link from "next/link";

const ContactAdminPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <LucideAlertCircle className="h-16 w-16 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Access Restricted</h1>
          <p className="text-muted-foreground mt-2">
            This page is only available to administrators.
          </p>
        </div>

        <div className="bg-secondary border border-border rounded-lg p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            If there's a problem, please contact:
          </p>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Johnsen Berdin</p>
            <div className="flex items-center justify-center gap-2">
              <LucidePhone className="h-4 w-4 text-primary" />
              <p className="font-mono">09260826406</p>
            </div>
          </div>
        </div>

        <Button asChild variant="outline">
          <Link href={organizationsPath()}>Go Back to Organizations</Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactAdminPage;
