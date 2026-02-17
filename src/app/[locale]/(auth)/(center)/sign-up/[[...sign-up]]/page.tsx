import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: SignUpPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage(props: SignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-600 mt-2">
          Create a new account to get started
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <p className="text-gray-700">
          Sign-up functionality has been removed (Clerk auth is no longer used).
          This is a placeholder page.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
