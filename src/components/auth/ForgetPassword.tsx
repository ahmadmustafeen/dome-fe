'use client';
import Image from 'next/image';
import { Button, InputWithLabel, Typography } from '@/components';
import { useRouter } from 'next/navigation';


const ForgetPassword = () => {
  const router = useRouter();
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src="/assets/gifs/Forgotpassword.gif"
          alt="Loading..."
          width={400}
          height={400}
        />
      </div>
      <div className='w-1/2'>
        <div className='p-12 max-w-xl border-0.5 rounded-lg shadow-lg'>
          <Typography text="Forgot Password?" variant="text-4xl font-semibold mb-1" />
          <Typography text="Please fill in the form below to reset your password." variant="text-lg mb-12" />
          <InputWithLabel label="Email" type="email" placeholder="Enter your email address" />
          <Button text="Send Reset Link" onClick={() => router.push('/en/reset-password')} variant="my-4" />
        </div>

      </div>
    </div>
  );
}

export { ForgetPassword };