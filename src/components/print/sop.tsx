'use client'
import { Typography } from "../common";
import { MOP_SECTION_04_SYSTEM_ROWS } from "@/constants/mop-section04-facility";

import { DownloadIcon, } from 'lucide-react'
import { SOP } from "@/types/sop";

const FirstSectionKeys1 = (mop: SOP) => ([
  { key: "SOP Title", value: mop.document?.title },
  { key: "SOP Identifier", value: mop.document.identifier },
  { key: "Version:", value: mop.document?.version },
  { key: "Creation Date", value: mop.document?.createdDate },
  { key: "Work Description:", value: mop.procedure.workDescription },
  { key: "Component Type:", value: mop.equipment.componentType },
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
  noIcon
}: {
  item: { text: string };
  noIcon?: boolean
}) => {
  return (
    <div className={`my-4 pb-3 flex items-start`}>
      {noIcon ? null : <div className="w-10 flex justify-center items-center">
        <div className="bg-gray-500 h-2 w-2 rounded-full mt-2" />
      </div>}
      <div className="text-base flex-1">
        {item?.text || "-"}
      </div>
    </div>
  );
};

const SecondSectionKeys1 = (mop: SOP) => ([
  { key: "Customer", value: mop.site.customer },
  { key: "Site Name", value: mop.site.siteName },
  { key: "Data Center Location:", value: mop.site.dataCenterLocation },
  { key: "Site Address:", value: mop.site.siteAddress },
  { key: "Site Contact:", value: mop.site.siteContact },
])

const ThirdSectionKeys1 = (mop: SOP) => ([
  { key: "SOP Title:", value: mop.document.title },
  { key: "Work Area:", value: mop.overview.workArea },
  { key: "Building/Floor/Room:", value: mop.overview.buildingFloorRoom },
  { key: "Access Requirements:", value: mop.overview.accessRequirements },
  { key: "Self Delivered / Vendor:", value: mop.overview.workDeliveryType },
  { key: "Qualifications Required:", value: mop.overview.qualificationsRequired },
  { key: "Advance notifications required:", value: mop.overview.advanceNotifications },
  { key: "Post notifications required:", value: mop.overview.postNotifications },
])

const FirstSection = (props: SOP) => {
  const { document } = props
  return <div>
    <div
      className="bg-cover rounded-lg bg-center bg-no-repeat px-5 py-7 text-center sm:px-8 sm:py-9"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(10, 40, 22, 0.92) 0%, rgba(16, 64, 35, 0.92) 100%)",
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
        <h2 className="font-semibold text-lg">Section 01 - SOP Schedule Information</h2>
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

const SecondSection = (props: SOP) => {
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

const ThirdSection = (props: SOP) => {
  return <div>
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 03: SOP Overview</h2>
      </div>
      <div className="section-container-3">
        {ThirdSectionKeys1(props).map((item, index) => <EachRow item={item} key={index}
          className="subsection-row-3"
        />)}
      </div>
    </div>
  </div>
}

const FourthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 04: Effect of SOP on Critical Facility</h2>
      </div>
      <div className="pdf-page">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
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

const FifthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 05: Safety Requirements</h2>
      </div>
      <div className="pdf-page">
        <p className="font-semibold text-lg py-4">PPE requirements specific to maintenance:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
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
                  {row.requirement}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specification}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.requirement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* tools */}
        <p className="font-semibold text-lg py-4">TOOLS REQUIRED:</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          Specific tools required for {props.asset.assetName} {props.document.title} based on equipment type and task:
        </Typography>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Tool/Equipment
              </th>
              <th className="border border-black p-3 text-left">
                Specification/Range
              </th>
              <th className="border border-black p-3 text-left">
                Specific Use in This Task
              </th>
              <th className="border border-black p-3 text-left">
                Procedure Step Requiring This Tool
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.toolRequirementRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.tool}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specification}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.use}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.procedureStep}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* emergency Contacts */}
        <p className="font-semibold text-lg py-4">EMERGENCY CONTACTS:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
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
          <Typography variant="h4" className="pr-2 text-sm text-gray-700">
            Site-Specific Hazards
          </Typography>
        </div>

        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Hazard Type
              </th>
              <th className="border border-black p-3 text-left">
                Description
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Control Measures
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.siteHazardRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-3 align-top">
                  {row.hazardType}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.description}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.controlMeasures}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
}

const SixthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 06: SOP Assumptions</h2>
      </div>
      <p className="font-semibold text-lg py-4">Risk Analysis Matrix:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Risk Category
            </th>
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black p-3 text-left">
              Likelihood
            </th>
            <th className="border border-black p-3 text-left">
              Impact
            </th>
            <th className="border border-black p-3 text-left">
              Mitigation Strategy
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.risksAssumptions.riskAnalysisRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.category}
              </td>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black p-3 align-top">
                {row.likelihood}
              </td>
              <td className="border border-black p-3 align-top">
                {row.impact}
              </td>
              <td className="border border-black p-3 align-top">
                {row.mitigationStrategy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Key Project Assumptions:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
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
          {props.risksAssumptions.keyAssumptionRows.map((row, index) => (
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

      <p className="font-semibold text-lg py-4">Critical Decision Points</p>
      <div className="section-container-6">
        {
          props.risksAssumptions.criticalDecisionPointItems.map((item, index) => {
            return <div className="subsection-row-6" key={index} >
              <EachSingleRow item={item} />
            </div>
          })
        }
      </div>


    </div>
  </div>
}

const SeventhSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 07: SOP Details</h2>
      </div>
      <p className="font-semibold text-lg py-2">7.1 Pre-Procedure Checks:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Expected Result
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Actual Result
            </th>
            <th className="border border-black p-3 text-left">
              Action if Not Met
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.details.preProcedureCheckRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black p-3 align-top">
                {row.expectedResult}
              </td>
              <td className="border border-black p-3 align-top">
                {row.actualResult}
              </td>
              <td className="border border-black p-3 align-top">
                {row.actionIfNotMet}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">7.2 Detailed Procedure Steps</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Expected Range
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Source
            </th>
            <th className="border border-black p-3 text-left">
              Recorded Value
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Action if Out of Range
            </th>

          </tr>
        </thead>

        <tbody className="">
          {props.details.detailedProcedureStepRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black p-3 align-top">
                {row.expectedRange}
              </td>
              <td className="border border-black p-3 align-top">
                {row.source}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.recordedValue}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.actionIfOutOfRange}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}

const EigthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 08: Back-out Procedures</h2>
      </div>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black p-3 text-left">
              Verification
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Action Required
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.backOutProcedures.rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black p-3 align-top">
                {row.verification}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.actionRequired}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}

const NinthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 09: SOP Approval</h2>
      </div>
      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Review Stage
            </th>
            <th className="border border-black p-3 text-left">
              Reviewer's Name
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Reviewer's Title
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.approval.reviewRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.reviewStage}
              </td>
              <td className="border border-black p-3 align-top">
                {row.reviewersName}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.reviewersTitle}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="subsection-row-7 flex flex-row justify-evenly py-4">
        <div className="flex gap-x-2" >
          <Typography
            variant="h5"
            className="font-bold tracking-wide text-balance drop-shadow-sm"
          >
            SOP Effective Date:
          </Typography>

          <Typography
            variant="p"
            className="tracking-wide text-balance drop-shadow-sm"
          >
            {
              props?.approval?.effectiveDate
                ? new Date(props.approval.effectiveDate).toLocaleDateString()
                : 'Not Selected'
            }
          </Typography>
        </div>
        <div className="flex gap-x-2" >
          <Typography
            variant="h5"
            className="font-bold tracking-wide text-balance drop-shadow-sm"
          >
            SOP Expiration Date:
          </Typography>

          <Typography
            variant="p"
            className="tracking-wide text-balance drop-shadow-sm"
          >
            {
              props?.approval?.expirationDate
                ? new Date(props.approval.expirationDate).toLocaleDateString()
                : 'Not Selected'
            }
          </Typography>
        </div>

      </div>
    </div>
  </div>
}

const TenthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 10: SOP Comments</h2>
      </div>
      <p className="font-semibold text-lg py-2">Relevant comments</p>
      <div className="section-container-7">
        {
          props.comments.relevantCommentItems.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.text }} />
            </div>
          })
        }
      </div>

      <p className="font-semibold text-lg py-2">Post-operation requirements</p>
      <div className="section-container-7">
        {
          props.comments.postOperationRequirementItems.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.text }} />
            </div>
          })
        }
      </div>

      <p className="font-semibold text-lg py-2">Additional notes</p>
      <div className="section-container-7">
        {
          props.comments.additionalNoteItems.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.text }} />
            </div>
          })
        }
      </div>


    </div>
  </div>
}

const EleventhSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 11: References and Documentation</h2>
      </div>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        List documentation and resources relevant to performing this procedure safely and consistently.
      </Typography>
      <p className="font-semibold text-lg py-2">Equipment-Specific Documentation</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Document Type
            </th>
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black p-3 text-left">
              Access/Location
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.equipmentDocumentRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.documentType}
              </td>

              <td className="border border-black p-3 align-top">
                {row.description}
              </td>

              <td className="border border-black p-3 align-top">
                {row.accessLocation}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <p className="font-semibold text-lg py-2">Safety Standards and Guidelines</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Standard
            </th>
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black p-3 text-left">
              Access/Location
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.safetyStandardRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.standard}
              </td>

              <td className="border border-black p-3 align-top">
                {row.description}
              </td>

              <td className="border border-black p-3 align-top">
                {row.accessLocation}
              </td>
            </tr>
          ))}
        </tbody>

      </table>


      <p className="font-semibold text-lg py-2 mt-4">Additional Resources</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Resources
            </th>
            <th className="border border-black p-3 text-left">
              Description
            </th>
            <th className="border border-black p-3 text-left">
              Access/Location
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.additionalResourceRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.resourceType}
              </td>

              <td className="border border-black p-3 align-top">
                {row.description}
              </td>

              <td className="border border-black p-3 align-top">
                <div>
                  {row.accessLocation}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-2">Reference Usage Guidelines</p>
      <div className="section-container-7">
        {
          props.references.usageGuidelineItems.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.text }} />
            </div>
          })
        }
      </div>

      <p className="font-semibold text-lg py-2">Verification Notice</p>
      <div className="section-container-7">
        <EachSingleRow item={{ text: props.references.verificationNotice }} noIcon />
      </div>

    </div>
  </div>
}



const SopPrintComponent = ({ sop, id }: { sop: SOP | null, id: string }) => {
  if (!sop) return;

  const handleDownload = async (id: string) => {
    const res = await fetch(`/api/sops/${id}/pdf`);

    if (!res.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${sop.document.title}-${new Date().toISOString()}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return <main className="bg-white p-8 text-black">
    <div className="max-w-7xl mx-auto">
      <FirstSection
        {...sop}
      />

      <SecondSection
        {...sop}
      />

      <ThirdSection
        {...sop}
      />

      <FourthSection
        {...sop}
      />


      <FifthSection
        {...sop}
      />


      <SixthSection
        {...sop}
      />

      <SeventhSection
        {...sop}
      />

      <EigthSection
        {...sop}
      />

      <NinthSection
        {...sop}
      />

      <TenthSection
        {...sop}
      />

      <EleventhSection
        {...sop}
      />

      {/* 

      


      <TenthSection
        {...sop}
      />

      <EleventhSection
        {...sop}
      /> */}

      <div onClick={() => handleDownload(id)} className="bg-red-300 cursor-pointer print:hidden rounded-full px-4 py-4 fixed right-10 bottom-10"><DownloadIcon /></div>
    </div>
  </main>
}

export default SopPrintComponent;