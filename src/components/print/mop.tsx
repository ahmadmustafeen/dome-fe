'use client'
import { MOP } from "@/types/mop";
import { Typography } from "../common";


const FirstSectionKeys1 = (mop: MOP) => ([
  { key: "MOP Title", value: mop.document?.title },
  { key: "MOP Identifier", value: mop.document.identifier },
  { key: "Version:", value: mop.document?.version },
  { key: "Creation Date", value: mop.document?.createdDate },
  { key: "Work Description:", value: mop.procedure.workDescription },
  { key: "Component Type:", value: mop.equipment.equipmentType },
  { key: "Manufacturer:", value: mop.equipment.manufacturer },
  { key: "Model Number:", value: mop.equipment.modelNumber },
  { key: "Serial Number:", value: mop.equipment.serialNumber },
  { key: "Equipment Number:", value: mop.equipment.equipmentNumber },
  { key: "Location", value: mop.equipment.location },
  { key: "Duration", value: mop.procedure.duration },
  { key: "Level of Risk (LOR):", value: mop.procedure.levelOfRisk },
  { key: "CET Level Required:", value: mop.procedure.cetLevelRequired },
  { key: "Author:", value: mop.document.author },
  { key: "Author CET Level:", value: mop.document.authorCetLevel },
  { key: "Approver", value: mop.signOff.approvedBy },
])

const EachRow = ({ item, className }: { item: { key: string, value?: string | number }, className: string }) => {
  return <div className={`flex my-4 pb-3 ${className}`}>
    <div className="font-semibold text-base w-1/4">
      {item.key}
    </div>
    <div className="text-base w-3/4">
      {item?.value || "-"}
    </div>
  </div>
}

const SecondSectionKeys1 = (mop: MOP) => ([
  { key: "Customer", value: mop.site.customer },
  { key: "Site Name", value: mop.site.siteName },
  { key: "Data Center Location:", value: mop.site.dataCenterLocation },
  { key: "Site Address:", value: mop.site.siteAddress },
  { key: "Site Contact:", value: mop.site.siteContact },
])


const ThirdSectionKeys1 = (mop: MOP) => ([
  { key: "MOP Title:", value: mop.document.title },
  { key: "Work Area:", value: mop.overview.workArea },
  { key: "Building/Floor/Room:", value: mop.overview.buildingFloorRoom },
  { key: "Access Requirements:", value: mop.overview.accessRequirements },
  { key: "Self Delivered / Vendor:", value: mop.overview.workDeliveryType },
  { key: "Qualifications Required:", value: mop.overview.qualificationsRequired },
  { key: "Advance notifications required:", value: mop.overview.advanceNotifications },
  { key: "Post notifications required:", value: mop.overview.postNotifications },
])


const FirstSection = (props: MOP) => {
  const { document } = props
  return <div>
    <div
      className="bg-cover rounded-lg bg-center bg-no-repeat px-5 py-7 text-center sm:px-8 sm:py-9"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(10, 22, 40, 0.92) 0%, rgba(16, 35, 64, 0.92) 100%)",
      }}
    >
      <Typography
        variant="h3"
        className="font-bold tracking-wide text-balance text-white drop-shadow-sm print:text-white"
      >
        {document.title}
      </Typography>

    </div>


    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className=" pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 01 - MOP Schedule Information</h2>
      </div>
      <div className="section-container">
        {
          FirstSectionKeys1(props).map((item, index) => {
            return <EachRow item={item} key={index} className="subsection-row" />
          })
        }
      </div>


    </div>

  </div>
}

const SecondSection = (props: MOP) => {
  return <div>
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 02: Site Information</h2>
      </div>
      <div className="section-container-2">
        {SecondSectionKeys1(props).map((item, index) => <EachRow item={item} key={index}
          className="subsection-row-2"
        />)}
      </div>
    </div>
  </div>
}


const ThirdSection = (props: MOP) => {
  return <div>
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 03: MOP Overview</h2>
      </div>
      <div className="section-container-3">
        {ThirdSectionKeys1(props).map((item, index) => <EachRow item={item} key={index}
          className="subsection-row-3"
        />)}
      </div>
    </div>
  </div>
}






const rows = Array.from({ length: 120 }).map((_, index) => ({
  id: index + 1,
  asset: `Cooling System Asset ${index + 1}`,
  location: `Building ${Math.ceil((index + 1) / 10)}`,
  status:
    index % 3 === 0
      ? "Operational"
      : index % 3 === 1
        ? "Maintenance Required"
        : "Inspection Pending",
}));

const handleDownload = async (id: string) => {
  const res = await fetch(`/api/mops/${id}/pdf`);

  if (!res.ok) {
    throw new Error("Failed to download PDF");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `mop-12312312.pdf`;
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
};

const MopPrintComponent = ({ mop, id }: { mop: MOP | null, id: string }) => {
  if (!mop) return;

  return <main className="bg-white p-8 text-black">
    <div className="max-w-7xl mx-auto">
      <FirstSection
        {...mop}
      />

      <SecondSection
        {...mop}
      />

      <ThirdSection
        {...mop}
      />


      <div onClick={() => handleDownload(id)}>Download</div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-black p-3 text-left bg-gray-100">
              ID
            </th>
            <th className="border border-black p-3 text-left bg-gray-100">
              Asset Name
            </th>
            <th className="border border-black p-3 text-left bg-gray-100">
              Location
            </th>
            <th className="border border-black p-3 text-left bg-gray-100">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border border-black p-3 align-top">
                {row.id}
              </td>

              <td className="border border-black p-3 align-top">
                {row.asset}
              </td>

              <td className="border border-black p-3 align-top">
                {row.location}
              </td>

              <td className="border border-black p-3 align-top">
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </main>
}

export default MopPrintComponent;