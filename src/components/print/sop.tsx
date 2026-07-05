'use client'
import { Typography } from "../common";

import { DownloadIcon, HelpCircle, } from 'lucide-react'
import { SOP } from "@/types/sop";
import { ReactNode } from "react";
import { SOP_SECTION_04_SYSTEM_ROWS } from "@/constants/sop-section04-facility";
import { MOP_SECTION_07_IMPORTANT_INDICATORS } from "@/constants/mop-section07-important-indicators";
import { SopSection07IndicatorIcon } from "../sop/SopSection07IndicatorIcons";
import SopSection11Notices from "../sop/SopSection11Notices";

const FirstSectionKeys1 = (sop: SOP) => ([
  { key: "SOP Title", value: sop.document?.title },
  { key: "SOP Identifier", value: sop.document.identifier },
  { key: "Version:", value: sop.document?.version },
  { key: "Creation Date", value: sop.document?.createdDate },
  { key: "Work Description:", value: sop.procedure.workDescription },
  { key: "Component Type:", value: sop.equipment.componentType },
  { key: "Manufacturer:", value: sop.equipment.manufacturer },
  { key: "Model Number:", value: sop.equipment.modelNumber },
  { key: "Serial Number:", value: sop.equipment.serialNumber },
  { key: "Equipment Number:", value: sop.equipment.equipmentNumber },
  { key: "Location", value: sop.equipment.location },
  { key: "Duration", value: sop.procedure.duration },
  { key: "Level of Risk (LOR):", value: sop.procedure.levelOfRisk },
  { key: "CET Level Required:", value: sop.procedure.cetLevelRequired },
  { key: "Author:", value: sop.document.author },
  { key: "Author CET Level:", value: sop.document.authorCetLevel },
  { key: "Approver", value: sop.signOff.approvedBy },
])

const CustomTableRowWrapper = ({ children, index }: { children: ReactNode, index: number }) => {
  const isAlternativeRow = index % 2 === 1;
  return <tr key={index}
    className={isAlternativeRow ? "bg-gray-200" : ""}
  >
    {children}
  </tr>
}
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


const SecondSectionKeys1 = (sop: SOP) => ([
  { key: "Customer", value: sop.site.customer },
  { key: "Site Name", value: sop.site.siteName },
  { key: "Data Center Location:", value: sop.site.dataCenterLocation },
  { key: "Site Address:", value: sop.site.siteAddress },
  { key: "Site Contact:", value: sop.site.siteContact },
])

const ThirdSectionKeys1 = (sop: SOP) => ([
  { key: "SOP Title:", value: sop.document.title },
  { key: "Work Area:", value: sop.overview.workArea },
  { key: "Building/Floor/Room:", value: sop.overview.buildingFloorRoom },
  { key: "Access Requirements:", value: sop.overview.accessRequirements },
  { key: "Self Delivered / Vendor:", value: sop.overview.workDeliveryType },
  { key: "Qualifications Required:", value: sop.overview.qualificationsRequired },
  { key: "Advance notifications required:", value: sop.overview.advanceNotifications },
  { key: "Post notifications required:", value: sop.overview.postNotifications },
])

const SectionHeading = ({ heading, className }: { heading: string, className?: string }) => {
  return <div className={`pb-2 border-b-2 border-black my-4 ${className}`}>
    <h2 className="text-xl font-bold">{heading}</h2>
  </div>
}

const FirstSection = (props: SOP) => {
  const { document } = props
  return <div>
    <div
      className="bg-cover rounded-sm bg-center bg-no-repeat px-5 py-10 text-center sm:px-8 sm:py-9 bg-[#1E3B28]"
    >
      <Typography
        variant="h3"
        className="font-bold tracking-wide text-balance text-white drop-shadow-sm print:text-white"
      >
        {document.title}
      </Typography>

    </div>


    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 01 - SOP Schedule Information" />
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
      <SectionHeading className="heading-1" heading="Section 02: Site Information" />
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
      <SectionHeading className="heading-1" heading="Section 03: SOP Overview" />

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
      <SectionHeading className="heading-1" heading="Section 04: Effect of SOP on Critical Facility" />

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

const FifthSection = (props: SOP) => {
  const assetName = props?.asset?.assetName || "";
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 05: Safety Requirements" />

      <div className="pdf-page">
        <p className="font-semibold text-lg py-4">PPE requirements specific to operation:</p>
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                REQUIRED PPE Item
              </th>
              <th className="border border-black p-3 text-left">
                Specification/Standard
              </th>
              <th className="border border-black p-3 text-left">
                Regulatory/Safety Requirement
              </th>
              <th className="border border-black p-3 text-left">
                Specific Task Requiring This PPE
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.safety?.ppeRequirementRows.map((row, index) => (
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.item}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.specification}
                </td>

                <td className="border border-black p-3 align-top">
                  {row.requirement}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.task}
                </td>
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>

        {/* tools */}
        <p className="font-semibold text-lg py-4">Required Tools & Test Equipment:</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          Specific tools required for {assetName} {props.document.title} based on equipment type and task:
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
              <CustomTableRowWrapper index={index}>
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
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>

        {/* emergency Contacts */}
        <p className="font-semibold text-lg py-4">Emergency Contacts:</p>
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
              <CustomTableRowWrapper index={index}>
                <td className="border border-black p-3 align-top">
                  {row.hazardType}
                </td>
                <td className="border border-black p-3 align-top">
                  {row.description}
                </td>
                <td className="border border-black min-w-20  p-3 align-top">
                  {row.controlMeasures}
                </td>
              </CustomTableRowWrapper>
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
      <SectionHeading className="heading-1" heading="Section 06: SOP Assumptions" />

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
            <CustomTableRowWrapper index={index}>
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

      <p className="font-semibold text-lg py-4">Critical Decision Points</p>
      <div className="">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#0F4D2E]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                No.
              </th>
              <th className="border border-black p-3 text-left">
                Critical Decision Points
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.risksAssumptions.criticalDecisionPointItems.map((row, index) => (
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
  </div>
}

const SeventhSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 07: SOP Details" />

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
            <CustomTableRowWrapper index={index}>
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
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Important Indicators</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
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
                  <SopSection07IndicatorIcon
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

      <p className="font-semibold text-lg py-4">7.2 Detailed Procedure Steps</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left w-16">
              #
            </th>
            <th className="border text-xs max-w-32 border-black p-3 text-left">
              Description
            </th>
            <th className="border text-xs max-w-32 border-black p-3 text-left">
              Expected Range
            </th>
            <th className="border text-xs border-black px-1 py-3 text-left">
              Source
            </th>
            <th className="border text-xs border-black px-1 py-3 text-left">
              Indicator
            </th>
            <th className="border text-xs border-black p-3 text-left">
              Recorded Value
            </th>
            <th className="border text-xs border-black p-3 text-left">
              Initials
            </th>
            <th className="border text-xs border-black p-3 text-left">
              Time
            </th>
            <th className="border text-xs border-black min-w-12 p-3 text-left">
              Action if Out of Range
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.details.detailedProcedureStepRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border text-xs border-black align-top  p-3 text-center">
                {index + 1}
              </td>
              <td className="border text-xs max-w-32 border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border text-xs max-w-32 border-black p-3 align-top">
                {row.expectedRange}
              </td>
              <td className="border text-xs border-black px-1 py-3 align-top">
                {row.source}
              </td>
              <td className="border text-xs border-black  px-1 py-3 align-top text-center">
                {row.indicator ? (
                  <div className="flex justify-center items-center h-full">
                    <SopSection07IndicatorIcon
                      indicatorId={row.indicator}
                      className="h-5 w-5"
                      aria-hidden
                    />
                  </div>
                ) :
                  <div className="flex justify-center items-center h-full">
                    <HelpCircle />
                  </div>
                }
              </td>
              <td className="border text-xs min-w-20 border-black p-3 align-top">
                {row.recordedValue}
              </td>
              <td className="border text-xs border-black p-3 align-top">
                {row.initials}
              </td>
              <td className="border text-xs border-black p-3 align-top">
                {row.time}
              </td>
              <td className="border text-xs min-w-12 border-black p-3 align-top">
                {row.actionIfOutOfRange}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}

const EigthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 08: Back-out Procedures" />
      <p className="font-semibold text-lg py-4">Critical back-out procedure</p>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        If a critical issue is identified during the execution of this procedure that may adversely affect personnel safety, system integrity, or data center operations, suspend the activity immediately and follow the detailed escalation, containment, and response procedures described below:
      </Typography>
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
            <th className="w-24 px-3 py-2 text-left font-semibold">Initials</th>
            <th className="w-24 px-3 py-2 text-left font-semibold">Time</th>
          </tr>
        </thead>

        <tbody className="">
          {props.backOutProcedures.rows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border border-black p-3 align-top">
                {row.verification}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.actionRequired}
              </td>
              <td className="border border-black p-3 align-top">{row.initials}</td>
              <td className="border border-black p-3 align-top">{row.time}</td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}

const NinthSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 09: SOP Approval" />

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
      <SectionHeading className="heading-1" heading="Section 10: SOP Comments" />

      <p className="font-semibold text-lg py-2">Relevant comments</p>
      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              No.
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Comment
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.comments.relevantCommentItems.map((row, index) => (
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
      <p className="font-semibold text-lg py-2">Post-operation requirements</p>
      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              No.
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Comment
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.comments.postOperationRequirementItems.map((row, index) => (
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
      <p className="font-semibold text-lg py-2">Additional notes</p>
      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#0F4D2E]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              No.
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              Comment
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.comments.additionalNoteItems.map((row, index) => (
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

const EleventhSection = (props: SOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 11: References and Documentation" />

      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        List documentation and resources relevant to performing this procedure safely and consistently.
      </Typography>
      {
        props?.references?.equipmentDocumentRows?.length ? <>
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
                <CustomTableRowWrapper index={index}>
                  <td className="border border-black p-3 align-top">
                    {row.documentType}
                  </td>

                  <td className="border border-black p-3 align-top">
                    {row.description}
                  </td>

                  <td className="border border-black p-3 align-top">
                    {row.accessLocation}
                  </td>
                </CustomTableRowWrapper>
              ))}
            </tbody>

          </table>
        </> : null
      }


      {
        props?.references?.safetyStandardRows?.length ? <>
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
                <CustomTableRowWrapper index={index}>
                  <td className="border border-black p-3 align-top">
                    {row.standard}
                  </td>

                  <td className="border border-black p-3 align-top">
                    {row.description}
                  </td>
                  <td className="border border-black max-w-48 break-all p-3 align-top">
                    {row.accessLocation}
                  </td>
                </CustomTableRowWrapper>
              ))}
            </tbody>

          </table>
        </> : null
      }



      {props.references.additionalResourceRows?.length ? <>
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
              <CustomTableRowWrapper index={index}>
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
              </CustomTableRowWrapper>
            ))}
          </tbody>
        </table>
      </>
        : null
      }

      <SopSection11Notices />

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

      <div className="text-3xl pb-4 border-b-4 border-black border-solid mb-8 font-bold text-center">
        Standard Operating Procedure (SOP)
      </div>


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

      <div onClick={() => handleDownload(id)} className="bg-red-300 cursor-pointer print:hidden rounded-full px-4 py-4 fixed right-10 bottom-10"><DownloadIcon /></div>
    </div>
  </main>
}

export default SopPrintComponent;