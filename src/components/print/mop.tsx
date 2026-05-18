'use client'
import { MOP } from "@/types/mop";
import { Typography } from "../common";
import { MOP_SECTION_04_SYSTEM_ROWS } from "@/constants/mop-section04-facility";

import { DownloadIcon, } from 'lucide-react'
import { buildDefaultGeneratorOperationalRows } from "@/constants/mop-section07-details";
import { MOP_SECTION_07_IMPORTANT_INDICATORS } from "@/constants/mop-section07-important-indicators";
import { MopSection07IndicatorIcon } from "../mop/MopSection07IndicatorIcons";
import { MOP_SECTION_09_APPROVAL_REQUIREMENT_BULLETS, MOP_SECTION_09_APPROVAL_REQUIREMENTS_HEADING } from "@/constants/mop-section09-approval";
import { MOP_SECTION_11_POLICY_BANNER_TEXT, MOP_SECTION_11_POLICY_NOTE_LABEL } from "@/constants/mop-section11-references";
import { MopSection11Notices } from "../mop/MopSection11Notices";

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
  const assetName = props.asset.assetName;


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
          Specific tools required for {assetName} {props.document.title} based on equipment type and task:
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
        {
          props.assumptions.criticalDecisionPointItems.map((item, index) => {
            return <div className="subsection-row-6" key={index} >
              {index === 0 ?
                <p className="font-semibold text-lg py-4">Critical Decision Points for</p>
                : null
              }
              <EachSingleRow item={item} />
            </div>
          })
        }
      </div>


    </div>
  </div>
}

const SeventhSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 07: MOP Details</h2>
      </div>
      <p className="font-semibold text-lg py-2">Procedure steps (outline):</p>
      <div className="section-container-7">
        {
          props.steps.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.description }} />
            </div>
          })
        }
        <div className="subsection-row-7 flex flex-row justify-evenly">
          <div className="flex gap-x-2" >
            <Typography
              variant="h5"
              className="font-bold tracking-wide text-balance drop-shadow-sm"
            >
              Date Performed
            </Typography>

            <Typography
              variant="p"
              className="tracking-wide text-balance drop-shadow-sm"
            >
              {props.mopDetails.datePerformed || "Not selected"}
            </Typography>
          </div>
          <div className="flex gap-x-2" >
            <Typography
              variant="h5"
              className="font-bold tracking-wide text-balance drop-shadow-sm"
            >
              Time Begun
            </Typography>

            <Typography
              variant="p"
              className="tracking-wide text-balance drop-shadow-sm"
            >
              {props.mopDetails.timeBegun || "Not selected"}
            </Typography>
          </div>

          <div className=" flex gap-x-2" >
            <Typography
              variant="h5"
              className="font-bold tracking-wide text-balance drop-shadow-sm"
            >
              Time Completed
            </Typography>

            <Typography
              variant="p"
              className="tracking-wide text-balance drop-shadow-sm"
            >
              {props.mopDetails.timeCompleted || "Not selected"}
            </Typography>
          </div>
        </div>
        <EachRow className="subsection-row-7" item={{ key: "Facilities personnel performing work:", value: props.mopDetails.facilitiesPersonnel || "Not selected" }} />
        <EachRow className="subsection-row-7" item={{ key: "Contractor/Vendor personnel performing work:", value: props.mopDetails.contractorPersonnel || "Not selected" }} />
      </div>


      <p className="font-semibold text-lg py-4">Generator Operational Data Log (Unit: GENERATOR 1)</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Parameters and acceptance bands are defined for this unit template; record As Found / As Left for each.
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Parameter
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              As Found
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              As Left
            </th>
            <th className="border border-black p-3 text-left">
              Units
            </th>
            <th className="border border-black p-3 text-left">
              Acceptable Range
            </th>
          </tr>
        </thead>

        <tbody className="">
          {buildDefaultGeneratorOperationalRows().map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.parameter}
              </td>
              <td className="border border-black p-3 align-top">
                {row.asFound}
              </td>
              <td className="border border-black p-3 align-top">
                {row.asLeft}
              </td>
              <td className="border border-black p-3 align-top">
                {row.units}
              </td>
              <td className="border border-black p-3 align-top">
                {row.acceptableRange}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Engine Performance Data</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Parameter
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Reading
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Units
            </th>
            <th className="border border-black p-3 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.mopDetails.enginePerformanceRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.parameter}
              </td>
              <td className="border border-black p-3 align-top">
                {row.reading}
              </td>
              <td className="border border-black p-3 align-top">
                {row.units}
              </td>
              <td className="border border-black p-3 align-top">
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <p className="font-semibold text-lg py-4 break-before-page">System Fault/Alarm History</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Record active or cleared faults/alarms observed during this event (rows expand with API or manual entry; default blank rows for site use).
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Date/Time
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Fault/Alarm Code
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Description
            </th>
            <th className="border border-black p-3 text-left">
              Action Taken
            </th>
            <th className="border border-black p-3 text-left">
              Initials
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.mopDetails.faultAlarmHistoryRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.dateTime}
              </td>
              <td className="border border-black p-3 align-top">
                {row.faultCode}
              </td>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black p-3 align-top">
                {row.actionTaken}
              </td>
              <td className="border border-black p-3 align-top">
                {row.initials}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="">
        <p className="font-semibold text-lg py-4">Important Indicators</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0E3456]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Icon
              </th>
              <th className="border border-black min-w-20 p-3 text-left">
                Meaning
              </th>
            </tr>
          </thead>

          <tbody className="">
            {MOP_SECTION_07_IMPORTANT_INDICATORS.map((row, index) => (
              <tr key={index}>
                <td className="border border-black min-w-20 p-3 align-top">
                  <div className="flex justify-center items-center h-full">
                    <MopSection07IndicatorIcon
                      indicatorId={row.id}
                      className="h-6 w-6"
                      aria-hidden
                    />
                  </div>
                </td>
                <td className="border border-black p-3 align-top">
                  <span className="font-semibold">{row.title}</span> <span>{row.body}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-semibold text-lg py-4">Detailed Procedure Steps</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Pick the icon that matches Important Indicators above; use “no indicator” when not applicable. The stored value is the indicator key (id); the meaning comes from the legend and tooltips.
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Detailed Procedure
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Indicator
            </th>
            <th className="border border-black p-3 text-left">
              Initials
            </th>
            <th className="border border-black min-w-20 p-3 text-left">
              Time
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.mopDetails.detailedProcedures.stepRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.detailedProcedure}
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                <div className="flex justify-center items-center h-full">
                  <MopSection07IndicatorIcon
                    indicatorId={row.indicator}
                    className="h-6 w-6"
                    aria-hidden
                  />
                </div>
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.initials}
              </td>
              <td className="border border-black  min-w-20 p-3 align-top">
                {row.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <p className="font-semibold text-lg mt-6">Critical Step Notes (Steps requiring torque verification or electrical testing)</p>
      <EachSingleRow item={{ text: props.mopDetails.detailedProcedures.criticalStepNotes }} noIcon />
    </div>
  </div>
}

const EigthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 08: Back-out Procedures</h2>
      </div>
      <p className="font-semibold text-lg py-4">CRITICAL BACK-OUT PROCEDURES</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        If at any point during the maintenance procedure a critical issue is discovered that could affect data center operations, follow these detailed back-out procedures:
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Step
            </th>
            <th className="border border-black p-3 text-left">
              Back-out Procedures
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Initials
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Time
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.backOut.stepRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.stepNumber}
              </td>
              <td className="border border-black p-3 align-top">
                {row.backOutProcedure}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.initials}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}


const NinthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 09: MOP Approval</h2>
      </div>
      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#0E3456]">
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
          {props.mopApproval.reviewRows.map((row, index) => (
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

      <div className="mt-6 border border-gray-300 bg-gray-100 p-4">
        <Typography variant="h6" className="mt-0 mb-2 text-sm font-semibold text-gray-900">
          {MOP_SECTION_09_APPROVAL_REQUIREMENTS_HEADING}
        </Typography>
        <ul className="mb-0 list-inside list-disc space-y-1 pl-0 text-sm text-gray-800">
          {MOP_SECTION_09_APPROVAL_REQUIREMENT_BULLETS.map(line => (
            <li key={line} className="pl-0">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="subsection-row-7 flex flex-row justify-evenly py-4">
        <div className="flex gap-x-2" >
          <Typography
            variant="h5"
            className="font-bold tracking-wide text-balance drop-shadow-sm"
          >
            MOP Effective Date:
          </Typography>

          <Typography
            variant="p"
            className="tracking-wide text-balance drop-shadow-sm"
          >
            {new Date(props.mopApproval.mopEffectiveDate || "").toDateString() || "Not selected"}
          </Typography>
        </div>
        <div className="flex gap-x-2" >
          <Typography
            variant="h5"
            className="font-bold tracking-wide text-balance drop-shadow-sm"
          >
            MOP Expiration Date:
          </Typography>

          <Typography
            variant="p"
            className="tracking-wide text-balance drop-shadow-sm"
          >
            {new Date(props.mopApproval.mopExpirationDate || "").toDateString() || "Not selected"}
          </Typography>
        </div>

      </div>
    </div>
  </div>
}


const TenthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 10: MOP Comments</h2>
      </div>
      <p className="font-semibold text-lg py-2">MOP Comments</p>

      <EachSingleRow item={{ text: props.mopComments.mopCommentsText }} noIcon />

      <p className="font-semibold text-lg py-2">Post-Maintenance Requirements:</p>
      <div className="section-container-7">
        {
          props.mopComments.postMaintenanceBullets.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.title }} />
            </div>
          })
        }
      </div>

      <p className="font-semibold text-lg py-2">Additional Notes:</p>
      <EachSingleRow item={{ text: props.mopComments.additionalNotes }} noIcon />


    </div>
  </div>
}

const EleventhSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <div className="border-b border-solid  pb-3 border-gray-300">
        <h2 className="font-semibold text-lg">Section 11: References and Documentation</h2>
      </div>
      <p className="font-semibold text-lg py-2">Comprehensive Reference Library</p>
      <p className="font-semibold text-lg py-2">Company Policy Documents Consulted</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        The following company policy documents were referenced during the creation of this MOP to ensure alignment with company-specific procedures and requirements:
      </Typography>

      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Policy Document
            </th>
            <th className="border border-black p-3 text-left">
              Upload Date
            </th>
            <th className="border border-black p-3 text-left">
              Type
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.policyDocumentRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.policyDocument}
              </td>

              <td className="border border-black p-3 align-top">
                {row.uploadDate}
              </td>

              <td className="border border-black p-3 align-top">
                {row.type}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-100 p-3 mt-4">
        <p className="m-0 text-sm text-sky-950">
          <strong>{MOP_SECTION_11_POLICY_NOTE_LABEL}</strong>
          {' '}
          {MOP_SECTION_11_POLICY_BANNER_TEXT}
        </p>
      </div>

      <p className="font-semibold text-lg py-2 mt-8">Equipment-Specific Documentation</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Document Title
            </th>
            <th className="border border-black p-3 text-left">
              Type
            </th>
            <th className="border border-black p-3 text-left">
              Access
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.equipmentDocumentRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.title}
              </td>

              <td className="border border-black p-3 align-top">
                {row.type}
              </td>

              <td className="border border-black p-3 align-top">
                <div>
                  {row.linkUrl}
                </div>
                <div>
                  {row.internalAccess}
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <p className="font-semibold text-lg py-2 mt-4">Safety Standards and Guidelines</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Safety Standard
            </th>
            <th className="border border-black p-3 text-left">
              Authority
            </th>
            <th className="border border-black p-3 text-left">
              Access
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.safetyStandardRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.safetyStandard}
              </td>

              <td className="border border-black p-3 align-top">
                {row.authority}
              </td>

              <td className="border border-black p-3 align-top">
                <div>
                  {row.linkUrl}
                </div>
                <div>
                  {row.internalAccess}
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>


      <p className="font-semibold text-lg py-2 mt-4">Additional Resources</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0E3456]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Resources
            </th>
            <th className="border border-black p-3 text-left">
              Type
            </th>
            <th className="border border-black p-3 text-left">
              Access
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.references.additionalResourceRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black p-3 align-top">
                {row.title}
              </td>

              <td className="border border-black p-3 align-top">
                {row.type}
              </td>

              <td className="border border-black p-3 align-top">
                <div>
                  {row.linkUrl}
                </div>
                <div>
                  {row.internalAccess}
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <MopSection11Notices />

      {/* <EachSingleRow item={{ text: props.mopComments.mopCommentsText }} noIcon />

      <p className="font-semibold text-lg py-2">Post-Maintenance Requirements:</p>
      <div className="section-container-7">
        {
          props.mopComments.postMaintenanceBullets.map((item, index) => {
            return <div className="subsection-row-7" key={index} >
              <EachSingleRow item={{ text: item.title }} />
            </div>
          })
        }
      </div>

      <p className="font-semibold text-lg py-2">Additional Notes:</p>
      <EachSingleRow item={{ text: props.mopComments.additionalNotes }} noIcon /> */}


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

      <SeventhSection
        {...mop}
      />

      <EigthSection
        {...mop}
      />

      <NinthSection
        {...mop}
      />

      <TenthSection
        {...mop}
      />

      <EleventhSection
        {...mop}
      />

      <div onClick={() => handleDownload(id)} className="bg-red-300 cursor-pointer print:hidden rounded-full px-4 py-4 fixed right-10 bottom-10"><DownloadIcon /></div>
    </div>
  </main>
}

export default MopPrintComponent;