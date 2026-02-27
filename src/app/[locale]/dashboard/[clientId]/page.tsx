import { SitePage } from "@/components/site/Site";

const Site = async ({ params }: { params: { clientId: string, locale: string } }) => {
  const data = await params;
  return <div>
    <SitePage params={data} />
  </div>
}

export default Site