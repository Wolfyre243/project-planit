import { RegisterForm } from "@/features/auth/components/register-form";
import { Notebook } from "lucide-react";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
      <div className='flex flex-col w-xl gap-4 p-8 md:px-16'>
        {/* Header */}
        <Link to={'/'} className='mb-4 flex flex-row items-center gap-2'>
          {/* TODO: Replace w logo here */}
          <Notebook />
          <h1 className='text-xl font-semibold'>PlanIt</h1>
        </Link>
        <h1 className='mb-4 text-2xl font-semibold'>Welcome back!</h1>

        {/* Main Form */}
        <RegisterForm />
        <div className='text-muted-foreground flex flex-row text-sm'>
          <p>Don&apos;t have an account?&nbsp;</p>
          <Link to={'/auth/register'} className='underline'>
            Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
}
