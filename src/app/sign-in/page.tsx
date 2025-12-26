import CardCompact from "@/components/card-compact";
import SignInForm from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/path";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        desc="Sign In to your account"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex-1 flex justify-between">
            <Link href={signUpPath()} className="text-sm text-muted-foreground">
              No account yet?
            </Link>
            <Link
              href={passwordForgotPath()}
              className="text-sm text-muted-foreground"
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
