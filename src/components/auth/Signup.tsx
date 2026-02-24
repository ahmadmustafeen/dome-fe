'use client';
import { Button, InputWithLabel, Typography } from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authService } from '@/services/auth-service';
import Image from 'next/image';
import {toast} from 'react-toastify';

type Props = {
  params: {
    locale: string;
  };
};



const SignUp = ({ params }: Props) => {
  const { locale } = params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      console.log("Registration response:", response);
      toast.success("Registration successful!");
      router.push(`/${locale}/dashboard`);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration");
      console.error("Error during registration:", error.message || error);
      
    }
    finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center flex-col md:flex-row">
      <div className="w-11/12 mx-auto md:w-1/2 flex justify-center items-center">
        <Image
          src="/assets/gifs/Signup.gif"
          alt="Loading..."
          width={400}
          height={400}
          unoptimized
        />
      </div>
      <div className='w-11/12 mx-auto md:w-1/2'>
        <div className='p-4 md:p-12 w-full md:max-w-xl border-0.5 rounded-lg shadow-lg'>
          <Typography text="Create an account" variant="text-xl md:text-4xl font-semibold mb-1" />
          <Typography text="Please fill in the form below to create an account." variant="text-base md:text-lg mb-6 md:mb-12" />
          <div className='flex gap-x-2'>
            <div className='w-1/2'>
              <InputWithLabel label="First Name" type="text" placeholder="Enter your first name" onChange={(e) => handleChange("firstName", e.target.value)} value={data.firstName || ""} />
            </div>
            <div className='w-1/2'>
              <InputWithLabel label="Last Name" type="text" placeholder="Enter your last name" onChange={(e) => handleChange("lastName", e.target.value)} value={data.lastName || ""} />
            </div>
          </div>
          <InputWithLabel label="Email" type="email" placeholder="Enter your email" onChange={(e) => handleChange("email", e.target.value)} value={data.email} />
          <InputWithLabel label="Password" type="password" showEye placeholder="Enter your password" onChange={(e) => handleChange("password", e.target.value)} value={data.password} />
          <Button isLoading={loading} text="Sign Up" onClick={handleSignUp} variant="my-2 md:my-4" />
          <div className='flex flex-row gap-x-1 justify-end'>
            <Typography text="Already have an account?" variant="text-sm ml-auto w-fit" />
            <div className='flex justify-end items-center'>
              <Button text="Sign In" onClick={() => router.push(`/${locale}/sign-in`)} variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-2 !text-secondary text-xs" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export { SignUp };