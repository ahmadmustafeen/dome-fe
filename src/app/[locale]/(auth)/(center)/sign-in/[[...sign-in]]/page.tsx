import { SignIn } from '@/components';


export default async function SignInPage({ params }: { params: { locale: string } }) {
  const _params = await params;

  

  console.log({params: _params});
  

  return (
    <SignIn params={_params} />
  );
}
