'use client';
import Image from 'next/image';
import { Button, InputWithLabel, Typography } from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authService } from '@/services/auth-service';
import { toast } from 'react-toastify';
import { isValidEmail } from '@/utils/Helpers';


const SignIn = () => {
  const locale = 'en'
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSignIn = async () => {
    if (!data.email || !data.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!isValidEmail(data.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      await authService.login({
        email: data.email,
        password: data.password,
      });
      toast.success("Login successful!");
      router.push(`/${locale}/dashboard`);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");

    }
    finally {
      setLoading(false);
    }
    // Handle sign in logic here
  };


  const router = useRouter();
  return (
    <div className="min-w-screen min-h-screen flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/assets/gifs/Login.gif"
          alt="Loading..."
          width={400}
          height={400}
        />
      </div>
      <div className='w-full md:w-1/2'>
        <div className='p-4 md:p-12 w-full md:max-w-xl rounded-lg shadow-xl'>
          <Typography text="Welcome back!" variant="text-xl md:text-4xl font-semibold mb-1" />
          <Typography text="Please sign in to your account." variant="text-base md:text-lg mb-6 md:mb-12" />
          <InputWithLabel label="Email" type="email" placeholder="Enter your email" onChange={(e) => handleChange('email', e.target.value)} value={data.email} />
          <InputWithLabel label="Password" type="password" showEye placeholder="Enter your password" onChange={(e) => handleChange('password', e.target.value)} value={data.password} />
          <Button isLoading={loading} text="Sign In" onClick={onSignIn} variant="my-2 md:my-4" />
          <div className='flex justify-between'>
            <div className='flex flex-col justify-start'>
              <Typography text="Forgot your password?" variant="text-sm" />
              <div className='flex'>
                <Button text="Reset Password" onClick={() => router.push(`/${locale}/forget-password`)} variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-2 !text-secondary text-xs" />
              </div>
            </div>
            <div className='flex flex-col justify-end'>
              <Typography text="Don't have an account?" variant="text-sm" />
              <div className='flex justify-end items-center'>
                <Button text="Sign Up" onClick={() => router.push(`/${locale}/sign-up`)} variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-2 !text-secondary text-xs" />
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
}

export { SignIn };