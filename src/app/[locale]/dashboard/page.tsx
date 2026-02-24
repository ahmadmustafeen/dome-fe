import { ClientPage } from "@/components";


export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const _params = await params;

  return (
    <div className="w-full">
      <ClientPage params={_params} />
    </div>
  );
}
