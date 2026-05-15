'use client'
import { MOP } from "@/types/mop";
import { Typography } from "../common";
import { MOP_SECTION_04_SYSTEM_ROWS } from "@/constants/mop-section04-facility";

import { DownloadIcon } from 'lucide-react'

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

const EachSingleRow = ({
  item,
  className,
}: {
  item: { text: string };
  className: string;
}) => {
  return (
    <li className={`my-4 pb-3 ${className}`}>
      <div className="text-base">
        {item?.text || "-"}
      </div>
    </li>
  );
};

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
      <div className="pb-3 border-gray-300">
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

const FourthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 04: Effect of MOP on Critical Facility</h2>
      </div>
      <div className="pdf-page">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                ID
              </th>
              <th className="border border-black p-3 text-left">
                Asset Name
              </th>
              <th className="border border-black p-3 text-left">
                Location
              </th>
              <th className="border border-black p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.facilityEffects.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {index}
                </td>

                <td className="border border-black p-3 align-top">
                  {MOP_SECTION_04_SYSTEM_ROWS.find(item => item.key === row.systemKey)?.label}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.choice}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}

const FifthSection = (props: MOP) => {
  const assetName = '';
  const mopTitle = '';
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 05: Safety Requirements</h2>
      </div>
      <div className="pdf-page">
        <p className="font-semibold text-lg py-4">PPE requirements specific to maintenance:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                PPE Category
              </th>
              <th className="border border-black p-3 text-left">
                Specification
              </th>
              <th className="border border-black p-3 text-left">
                When Required
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.ppeRequirementRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.category}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specification}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.whenRequired}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* tools */}
        <p className="font-semibold text-lg py-4">TOOLS REQUIRED:</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          Specific tools required for {assetName} {mopTitle} based on equipment type and task:
        </Typography>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Tool Category
              </th>
              <th className="border border-black p-3 text-left">
                Specific Tools (in the form of list)
              </th>
              <th className="border border-black p-3 text-left">
                Purpose
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.toolRequirementRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.toolCategory}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specificToolsList}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* safety procedures */}
        <p className="font-semibold text-lg py-4">SAFETY PROCEDURES:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Procedure
              </th>
              <th className="border border-black p-3 text-left">
                Requirements
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Initials
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Time
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.safetyProcedureRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.procedure}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.requirements}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.initials}
                </td>
                <td className="border border-black min-w-20 p-3 align-top">
                  {row.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* emergency Contacts */}
        <p className="font-semibold text-lg py-4">EMERGENCY CONTACTS:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Emergency Type
              </th>
              <th className="border border-black p-3 text-left">
                Contact
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Phone Number
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.emergencyContactRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.emergencyType}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.contact}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-6 flex">
          <Typography variant="h4" className="mb-4 pr-2 text-sm text-gray-700">
            LOCAL EMERGENCY SERVICES:
          </Typography>
          <Typography className="">{props.safety.localEmergencyServicesAddress}</Typography>
        </div>

        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Service
              </th>
              <th className="border border-black p-3 text-left">
                Contact Name
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Phone Number
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Address
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.localEmergencyServiceRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.service}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.contactName}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.phoneNumber}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
}

const SixthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 06: MOP Assumptions</h2>
      </div>
      <p className="font-semibold text-lg py-4">Key Project Assumptions:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Category
            </th>
            <th className="border border-black p-3 text-left">
              Assumption
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.assumptions.assumptionRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.category}
              </td>
              <td className="border border-black p-3 align-top">
                {row.assumption}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-container-6">
        <p className="font-semibold text-lg py-4 subsection-row-6">Critical Decision Points for</p>
        <ul className="list-disc pl-6">
          {
            props.assumptions.criticalDecisionPointItems.map((item, index) => {
              return <EachSingleRow item={item} key={index} className="subsection-row-6" />
            })
          }
        </ul>
      </div>


    </div>
  </div>
}


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

      <FourthSection
        {...mop}
      />

      <FifthSection
        {...mop}
      />

      <SixthSection
        {...mop}
      />
      <div onClick={() => handleDownload(id)} className="bg-red-300 cursor-pointer print:hidden rounded-full px-4 py-4 fixed right-10 bottom-10"><DownloadIcon /></div>
    </div>
  </main>
}

export default MopPrintComponent;