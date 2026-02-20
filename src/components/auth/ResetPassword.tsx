'use client';
import Image from 'next/image';
import { Button, InputWithLabel, Typography } from '@/components';


const ResetPassword = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/assets/gifs/Resetpassword.gif"
          alt="Loading..."
          width={400}
          height={400}
        />
      </div>
      <div className='w-full md:w-1/2'>
        <div className='p-4 md:p-12 w-full md:max-w-xl border-0.5 rounded-lg shadow-lg'>
          <Typography text="Reset Password" variant="text-xl md:text-4xl font-semibold mb-1" />
          <Typography text="Please fill in the form below to reset your password." variant="text-base md:text-lg mb-6 md:mb-12" />
          <InputWithLabel label="Password" type="password" placeholder="Enter your new password" />
          <InputWithLabel label="Confirm Password" type="password" placeholder="Confirm your new password" />
          <Button text="Reset Password" onClick={() => { }} variant="my-2 md:my-4" />
        </div>

      </div>
    </div>
  );
}

export { ResetPassword };