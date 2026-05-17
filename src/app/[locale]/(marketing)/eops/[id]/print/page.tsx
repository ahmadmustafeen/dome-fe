
import EopPrintComponent from "@/components/print/eop";
import { getLatestEOP } from "@/services/eop-service";

export default async function PrintPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getLatestEOP(id);

 

  return (
    <EopPrintComponent eop={data} id={id}/>
  );
}