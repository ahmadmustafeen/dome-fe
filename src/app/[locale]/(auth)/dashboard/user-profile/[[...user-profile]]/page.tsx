import { setRequestLocale } from 'next-intl/server';

export default async function UserProfilePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p className="text-gray-600">
        User profile functionality has been removed (Clerk auth is no longer used).
        This is a placeholder page.
      </p>
    </div>
  );
}
