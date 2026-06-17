'use client'
import { MOP } from "@/types/mop";
import { Typography } from "../common";

import { DownloadIcon, } from 'lucide-react'
import { MOP_SECTION_07_IMPORTANT_INDICATORS } from "@/constants/mop-section07-important-indicators";
import { MopSection07IndicatorIcon } from "../mop/MopSection07IndicatorIcons";
import { MOP_SECTION_09_APPROVAL_REQUIREMENT_BULLETS, MOP_SECTION_09_APPROVAL_REQUIREMENTS_HEADING } from "@/constants/mop-section09-approval";
import { MOP_SECTION_11_POLICY_BANNER_TEXT, MOP_SECTION_11_POLICY_NOTE_LABEL } from "@/constants/mop-section11-references";
import { MopSection11Notices } from "../mop/MopSection11Notices";
import { ReactNode } from "react";
import { SOP_SECTION_04_SYSTEM_ROWS } from "@/constants/sop-section04-facility";

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
  return <div className={`flex ${className} border border-gray-300`}>
    <div className="font-semibold text-base w-60 py-4 px-4 bg-gray-200 border-r border-gray-300">
      <h4>
        {item.key}
      </h4>
    </div>
    <div className="text-base flex-1 py-4 px-4">
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

const SectionHeading = ({ heading, className }: { heading: string, className?: string }) => {
  return <div className={`pb-2 border-b-2 border-black my-4 ${className}`}>
    <h2 className="text-xl font-bold">{heading}</h2>
  </div>
}

const FirstSection = (props: MOP) => {
  const { document } = props
  return <div>
    <div
      className="bg-cover rounded-sm bg-center bg-no-repeat px-5 py-10 text-center sm:px-8 sm:py-9 bg-[#091628]"
    >
      <Typography
        variant="h3"
        className="font-bold tracking-wide text-balance text-white drop-shadow-sm print:text-white"
      >
        {document.title}
      </Typography>

    </div>


    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 01 - MOP Schedule Information" />
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
      <SectionHeading className="heading-1" heading="Section 02: Site Information" />
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
      <SectionHeading className="heading-1" heading="Section 03: MOP Overview" />
      <div className="section-container-3">
        {ThirdSectionKeys1(props).map((item, index) => <EachRow item={item} key={index}
          className="subsection-row-3"
        />)}
      </div>
    </div>
  </div>
}

const CustomTableRowWrapper = ({ children, index }: { children: ReactNode, index: number }) => {
  const isAlternativeRow = index % 2 === 1;
  return <tr key={index}
    className={isAlternativeRow ? "bg-gray-200" : ""}
  >
    {children}
  </tr>
}

const FourthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 04: Effect of MOP on Critical Facility" />
      <div className="pdf-page">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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

            {SOP_SECTION_04_SYSTEM_ROWS.map((row, index) => (
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {index + 1}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.label}
                </td>

                <td className="border border-black p-3 align-top">
                  {props.facilityEffects.find(Facitem => Facitem.systemKey === row.key)?.choice ?? "na"}
                </td>

                <td className="border border-black p-3 align-top">
                  {props.facilityEffects.find(Facitem => Facitem.systemKey === row.key)?.details}
                </td>
              </CustomTableRowWrapper>
            )
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}

const FifthSection = (props: MOP) => {
  const assetName = props.asset.assetName;


  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto ">
      <SectionHeading className="heading-1" heading="Section 05: Safety Requirements" />
      <div className="pdf-page">
        <p className="font-semibold text-lg py-4">PPE requirements specific to maintenance:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.category}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specification}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.whenRequired}
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>

        {/* tools */}
        <p className="font-semibold text-lg py-4">Tools required:</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          Specific tools required for {assetName} {props.document.title} based on equipment type and task:
        </Typography>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.toolCategory}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specificToolsList}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.purpose}
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>

        {/* site-specific hazards */}
        <p className="font-semibold text-lg py-4">Site-Specific Hazards</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Hazard Type
              </th>
              <th className="border border-black p-3 text-left">
                Description
              </th>
              <th className="border border-black p-3 text-left">
                Control Measures
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.siteHazardRows?.map((row, index) => (
              <CustomTableRowWrapper index={index} key={row.id}>
                <td className="border border-black p-3 align-top">
                  {row.hazardType}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.description}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.controlMeasures}
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>

        {/* safety procedures */}
        <p className="font-semibold text-lg py-4 heading-1">SAFETY PROCEDURES:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
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
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>


        {/* emergency Contacts */}
        <p className="font-semibold text-lg py-4">Emergency Contacts:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.emergencyType}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.contact}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.phoneNumber}
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
}

const SixthSection = (props: MOP) => {
  const assetName = props.asset.assetName
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 06: MOP Assumptions" />
      <p className="font-semibold text-lg py-4">Risk Analysis Matrix:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
          {props?.assumptions?.riskAnalysisRows?.map((row, index) => (
            <CustomTableRowWrapper index={index} key={row.id}>
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
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4 heading-1">Key Project Assumptions:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.category}
              </td>
              <td className="border border-black p-3 align-top">
                {row.assumption}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Critical Decision Points for {assetName}</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              No.
            </th>
            <th className="border border-black p-3 text-left">
              Critical Decision Point
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.assumptions.criticalDecisionPointItems.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {index + 1}
              </td>
              <td className="border border-black p-3 align-top">
                {row.text}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>


    </div>
  </div>
}

const SeventhSection = (props: MOP) => {
  const assetName = props.asset.assetName
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 07: MOP Details" />
      <p className="font-semibold text-lg py-2">7.1 Pre-Procedure Checks:</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
          {props.steps.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black max-w-100 p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.expectedResult}
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.actualResult}
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.actionIfNotMet}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Generator Operational Data Log (Unit: {assetName})</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Parameters and acceptance bands are defined for this unit template; record As Found / As Left for each.
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
          {props.mopDetails.generatorOperationalRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
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
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Engine Performance Data</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
            <CustomTableRowWrapper index={index}>
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
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>


      {props.mopDetails.faultAlarmHistoryRows?.length ? <>

        <p className="font-semibold text-lg py-4">System Fault/Alarm History</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          Record active or cleared faults/alarms observed during this event (rows expand with API or manual entry; default blank rows for site use).
        </Typography>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
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
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>

      </> : null}


      <div className="">
        <p className="font-semibold text-lg py-4">Important Indicators</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
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
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-semibold text-lg py-4">Detailed Procedure Steps</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Pick the icon that matches Important Indicators above; use “no indicator” when not applicable. The stored value is the indicator key (id); the meaning comes from the legend and tooltips.
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
            <CustomTableRowWrapper index={index}>
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
            </CustomTableRowWrapper>
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
      <SectionHeading className="heading-1" heading="Section 08: Back-out Procedures" />

      <p className="font-semibold text-lg py-4">Critical back-out procedure</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        If at any point during the maintenance procedure a critical issue is discovered that could affect data center operations, follow these detailed back-out procedures:
      </Typography>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#091628]">
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
            <CustomTableRowWrapper index={index}>
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
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}


const NinthSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 09: MOP Approval" />
      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#091628]">
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
            <CustomTableRowWrapper index={index}>
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
            </CustomTableRowWrapper>
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
      <SectionHeading className="heading-1" heading="Section 10: MOP Comments" />

      <p className="font-semibold text-lg py-2">MOP Comments</p>

      <EachSingleRow item={{ text: props.mopComments.mopCommentsText }} noIcon />

      <p className="font-semibold text-lg py-2">Post-Maintenance Requirements:</p>

      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#091628]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              No.
            </th>
            <th className="border border-black p-3 text-left">
              Comments
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.mopComments.postMaintenanceBullets.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {index + 1}
              </td>
              <td className="border border-black p-3 align-top">
                {row.title}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-2">Additional Notes:</p>
      <EachSingleRow item={{ text: props.mopComments.additionalNotes }} noIcon />


    </div>
  </div>
}

const EleventhSection = (props: MOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 11: References and Documentation" />

      <p className="font-semibold text-lg py-2">Comprehensive Reference Library</p>

      {props.references.policyDocumentRows?.length ? <>
        <p className="font-semibold text-lg py-2">Company Policy Documents Consulted</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          The following company policy documents were referenced during the creation of this MOP to ensure alignment with company-specific procedures and requirements:
        </Typography>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.policyDocument}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.uploadDate}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.type}
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>

        </table>
      </> : null}

      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-100 p-3 mt-4">
        <p className="m-0 text-sm text-sky-950">
          <strong>{MOP_SECTION_11_POLICY_NOTE_LABEL}</strong>
          {' '}
          {MOP_SECTION_11_POLICY_BANNER_TEXT}
        </p>
      </div>

      {props.references.equipmentDocumentRows?.length ? <>
        <p className="font-semibold text-lg py-2 mt-8">Equipment-Specific Documentation</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
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
              </CustomTableRowWrapper>
            ))}
          </tbody>

        </table></> : null}


      {props.references.safetyStandardRows?.length ? <>
        <p className="font-semibold text-lg py-2 mt-4">Safety Standards and Guidelines</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.safetyStandard}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.authority}
                </td>

                <td className="border border-black max-w-48 break-all p-3 align-top">
                  <div>
                    {row.linkUrl}
                  </div>
                  <div>
                    {row.internalAccess}
                  </div>
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>

        </table></> : null}


      {props.references.additionalResourceRows?.length ? <>
        <p className="font-semibold text-lg py-2 mt-4">Additional Resources</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#091628]">
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.title}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.type}
                </td>

                <td className="border border-black max-w-48 break-all p-3 align-top">
                  <div>
                    {row.linkUrl}
                  </div>
                  <div>
                    {row.internalAccess}
                  </div>
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>

        </table>
      </> : null}

      <MopSection11Notices />
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
      <div className="text-3xl pb-4 border-b-4 border-black border-solid mb-8 font-bold text-center">
        Method of Procedure (MOP)
      </div>
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
