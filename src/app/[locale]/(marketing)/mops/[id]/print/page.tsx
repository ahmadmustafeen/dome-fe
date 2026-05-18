
import MopPrintComponent from "@/components/print/mop";
import { getLatestMOP } from "@/services/mop-service";

export default async function PrintPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getLatestMOP(id);

 

  return (
    <MopPrintComponent mop={data} id={id}/>
  );
}