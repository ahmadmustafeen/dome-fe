
import SopPrintComponent from "@/components/print/sop";
import { getLatestSOP } from "@/services/sop-service";

export default async function PrintPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getLatestSOP(id);

 

  return (
    <SopPrintComponent sop={data} id={id}/>
  );
}