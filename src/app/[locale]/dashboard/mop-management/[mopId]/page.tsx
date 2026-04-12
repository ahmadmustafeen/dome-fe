import { MopManagementClient } from "@/components/mop/MopManagementClient";

export default async function MopEditPage(props: {
  params: Promise<{ locale: string; mopId: string }>;
}) {
  const { mopId } = await props.params;

  return (
    <div className="h-full min-h-0">
      <MopManagementClient mopId={mopId} />
    </div>
  );
}
