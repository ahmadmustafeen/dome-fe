import { SignUp } from '@/components';


export default async function SignUpPage({ params }: { params: { locale: string } }) {
  const _params = await params;
  return (
    <SignUp params={_params} />
  );
}
