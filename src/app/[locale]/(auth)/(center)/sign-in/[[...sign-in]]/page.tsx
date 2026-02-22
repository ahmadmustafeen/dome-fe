import { SignIn } from '@/components';


export default async function SignInPage({ params }: { params: { locale: string } }) {
  const _params = await params;

  return (
    <SignIn params={_params} />
  );
}
