'use client';
import Image from 'next/image';
import { Button, InputWithLabel, Typography } from '@/components';
import { useRouter } from 'next/navigation';

type Props = {
  params: {
    locale: string;
  };
};



const SignUp = ({ params }: Props) => {
  const { locale } = params;
  const router = useRouter();
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/assets/gifs/Signup.gif"
          alt="Loading..."
          width={400}
          height={400}
        />
      </div>
      <div className='w-full md:w-1/2'>
        <div className='p-4 md:p-12 w-full md:max-w-xl border-0.5 rounded-lg shadow-lg'>
          <Typography text="Create an account" variant="text-xl md:text-4xl font-semibold mb-1" />
          <Typography text="Please fill in the form below to create an account." variant="text-base md:text-lg mb-6 md:mb-12" />
          <InputWithLabel label="Name" type="text" placeholder="Enter your name" />
          <InputWithLabel label="Email" type="email" placeholder="Enter your email" />
          <InputWithLabel label="Password" type="password" placeholder="Enter your password" />
          <Button text="Sign Up" onClick={() => { }} variant="my-2 md:my-4" />
          <div className='flex flex-row gap-x-1 justify-end'>
            <Typography text="Already have an account?" variant="text-sm ml-auto w-fit" />
            <div className='flex justify-end items-center'>
              <Button text="Sign In" onClick={() => router.push(`/${locale}/sign-in`)} variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-2 !text-secondary text-xs" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export { SignUp };