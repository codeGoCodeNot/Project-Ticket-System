import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/sign-up-form";
import { signInPath } from "@/path";
import Link from "next/link";

const SignUpPage = async () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign Up"
        desc="Create a new account to get started"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<SignUpForm />}
        footer={
          <Link href={signInPath()} className="text-sm text-muted-foreground">
            Have an account? Sign In now.
          </Link>
        }
      />
    </div>
  );
};

export default SignUpPage;
