'use client'
import { Typography } from "../common";

import { DownloadIcon, } from 'lucide-react'
import { EOP } from "@/types/eop";
import { EOP_SECTION_04_DO_NOT_PROCEED_BANNER } from "@/constants/eop-section04-immediate-actions";
import { EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING } from "@/constants/eop-section04-internal-diagnostics";
import { EOP_SECTION_06_RESEARCHED_NOTE } from "@/constants/eop-section06-communication";
import {
  EOP_EFFECTIVE_DATE_LABEL,
  EOP_EXPIRATION_DATE_LABEL,
  EOP_SECTION_09_HEADING,
  EOP_SECTION_09_TABLE_HEADERS,
  resolveEopApprovalReview,
} from "@/constants/eop-section09-approval-review";
import { ReactNode } from "react";
import EopSection08Notices from "../eop/EopSection08Notices";

const FirstSectionKeys1 = (mop: EOP) => ([
  { key: "EOP Title", value: mop.document?.title },
  { key: "EOP Identifier", value: mop.document.identifier },
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

const SectionHeading = ({ heading, className }: { heading: string, className?: string }) => {
  return <div className={`pb-2 border-b-2 border-black my-4 ${className}`}>
    <h2 className="text-xl font-bold">{heading}</h2>
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


const SecondSectionKeys1 = (mop: EOP) => ([
  { key: "Customer", value: mop?.site?.customer },
  { key: "Site Name", value: mop?.site?.siteName },
  { key: "Data Center Location:", value: mop?.site?.dataCenterLocation },
  { key: "Site Address:", value: mop?.site?.siteAddress },
  { key: "Site Contact:", value: mop?.site?.siteContact },
])

const ThirdSectionKeys1 = (mop: EOP) => ([
  { key: "EOP Title:", value: mop.document.title },
  { key: "Work Area:", value: mop.overview.workArea },
  { key: "Building/Floor/Room:", value: mop.overview.buildingFloorRoom },
  { key: "Access Requirements:", value: mop.overview.accessRequirements },
  { key: "Self Delivered / Vendor:", value: mop.overview.workDeliveryType },
  { key: "Qualifications Required:", value: mop.overview.qualificationsRequired },
  { key: "Immediate notifications required:", value: mop.overview.immediateNotifications },
  { key: "Post notifications required:", value: mop.overview.postNotifications },
])

const FirstSection = (props: EOP) => {
  const { document } = props
  return <div>
    <div
      className="bg-cover rounded-sm bg-center bg-no-repeat px-5 py-10 text-center sm:px-8 sm:py-9 bg-[#5B2827]"
    >
      <Typography
        variant="h3"
        className="font-bold tracking-wide text-balance text-white drop-shadow-sm print:text-white"
      >
        {document.title}
      </Typography>

    </div>


    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 01 - EOP Schedule Information" />
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

const SecondSection = (props: EOP) => {
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

const ThirdSection = (props: EOP) => {
  return <div>
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 03: EOP Overview" />

      <div className="section-container-3">
        {ThirdSectionKeys1(props).map((item, index) => <EachRow item={item} key={index}
          className="subsection-row-3"
        />)}
      </div>
    </div>
  </div>
}

const FourthSection = (props: EOP) => {
  const assetName = props?.asset?.assetName || "";
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 04: Immediate Emergency Actions - Power Failure Diagnostics" />

      <p className="font-semibold text-lg py-4">Pre-Action Safety & Equipment Requirements:</p>

      <p className="font-semibold text-lg py-4">Equipment-Specific PPE Requirements for {assetName}</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              PPE Item
            </th>
            <th className="border border-black p-3 text-left">
              Specification for {assetName}
            </th>
            <th className="border border-black p-3 text-left">
              Verified
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.immediateActions.preActionSafety.ppeRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.ppeItem}
              </td>

              <td className="border border-black p-3 align-top">
                {row.specification}
              </td>

              <td className="border min-w-20 border-black p-3 align-top">
                {row.verified}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">Required Tools & Test Equipment for {assetName}</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Tool/Equipment
            </th>
            <th className="border border-black p-3 text-left">
              Specific Model/Type for  {assetName}
            </th>
            <th className="border border-black p-3 text-left">
              Available
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.immediateActions.preActionSafety.toolRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.tool}
              </td>

              <td className="border border-black p-3 align-top">
                {row.modelType}
              </td>

              <td className="border min-w-20 border-black p-3 align-top">
                {row.available}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <p className="font-semibold text-lg py-4">CRITICAL SAFETY CHECKPOINT - STOP Before Proceeding</p>
      <div className="">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#5A1A1A]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                Step Number
              </th>
              <th className="border border-black p-3 text-left">
                Safety Checklist Items
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.immediateActions.preActionSafety.safetyChecklistItems.map((row, index) => (
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
      <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-3 text-sm font-semibold text-red-800">
        ⛔ {EOP_SECTION_04_DO_NOT_PROCEED_BANNER}{assetName}
      </div>

      <p className="font-semibold text-xl py-4">
        Internal Equipment Diagnostics for {assetName}
      </p>

      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Perform systematic internal component checks to identify the source of Power Failure
      </Typography>

      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Step Number
            </th>
            <th className="border border-black p-3 text-left">
              Internal Component to Check
            </th>
            <th className="border border-black p-3 text-left">
              Expected Reading/Condition
            </th>
            <th className="border border-black p-3 text-left">
              Actual Reading
            </th>
            <th className="border border-black p-3 text-left">
              Pass/Fail
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.immediateActions.internalDiagnostics.diagnosticRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.stepNumber}
              </td>

              <td className="border border-black p-3 align-top">
                {row.componentToCheck}
              </td>

              <td className="border  border-black p-3 align-top">
                {row.expectedCondition}
              </td>
              <td className="border  border-black p-3 align-top">
                {row.actualReading}
              </td>
              <td className="border  border-black p-3 align-top">
                {row.passFail}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-950">
        ⚠️ {EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING}
      </div>


    </div>
  </div>
}


const FifthSection = (props: EOP) => {
  const assetName = props?.asset?.assetName || "";
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 05: Power Failure Detection External Response Actions" />

      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Verify all external equipment and systems that connect to or support the {assetName}
      </Typography>

      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Step Number
            </th>
            <th className="border border-black p-3 text-left">
              External Equipment/System to Check
            </th>
            <th className="border border-black p-3 text-left">
              Connection to {assetName}
            </th>
            <th className="border border-black p-3 text-left">
              Potential Failure Mode Causing Power Failure
            </th>
            <th className="border border-black p-3 text-left">
              Verification Method
            </th>
            <th className="border border-black p-3 text-left">
              Actual Status
            </th>
            <th className="border border-black p-3 text-left">
              Pass/Fail
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.externalActions.actionRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.stepNumber}
              </td>
              <td className="border border-black p-3 align-top">
                {row.externalEquipment}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.connectionToUnit}
              </td>
              <td className="border border-black p-3 align-top">
                {row.potentialFailureMode}
              </td>
              <td className="border border-black p-3 align-top">
                {row.verificationMethod}
              </td>

              <td className="border min-w-20 border-black p-3 align-top">
                {row.actualStatus}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.passFail}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

    </div>
  </div>
}

const SixthSection = (props: EOP) => {
  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 06: Communication & Escalation Protocol" />

      <p className="font-semibold text-lg my-4">Escalation Matrix</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Level
            </th>
            <th className="border border-black p-3 text-left">
              Title
            </th>
            <th className="border border-black p-3 text-left">
              Contact Name
            </th>
            <th className="border border-black p-3 text-left">
              Phone Number
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.communication.escalationMatrixRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.level}
              </td>
              <td className="border border-black p-3 align-top">
                {row.title}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.contactName}
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.phoneNumber}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>


      <p className="font-semibold text-lg my-4">Emergency Contacts</p>
      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Service Type
            </th>
            <th className="border border-black p-3 text-left">
              Contact Name/Organization
            </th>
            <th className="border border-black p-3 text-left">
              Phone Number
            </th>
            <th className="border border-black p-3 text-left">
              Notes/Address
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.communication.emergencyContactRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.serviceType}
              </td>
              <td className="border border-black p-3 align-top">
                {row.contactNameOrganization}
              </td>
              <td className="border min-w-40 border-black p-3 align-top">
                {row.phoneNumber}
              </td>
              <td className="border border-black min-w-20 p-3 align-top">
                {row.notesAddress}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <div className="my-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
        <span className="mr-1 font-semibold">✓</span>
        {EOP_SECTION_06_RESEARCHED_NOTE(props?.site?.siteAddress)}
      </div>

      <EachRow item={{ "key": "Contact Name", value: props.communication.verificationContactName }} className="w-full" />
      <EachRow item={{ "key": "Phone Number", value: props.communication.verificationPhoneNumber }} className="w-full" />

    </div>
  </div>
}

const SeventhSection = (props: EOP) => {
  const assetName = props?.asset?.assetName || "";

  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 07: Recovery & Return to Service" />

      <p className="font-semibold text-lg my-4">Power Failure Resolution and Equipment Recovery Procedures</p>

      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Follow these steps in sequence to safely restore the {assetName} to normal operation after Power Failure has been resolved:
      </Typography>

      <p className="font-semibold text-lg my-4">Power Failure Resolution Verification</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Confirm stable operating conditions are available at all system levels:
      </Typography>
      <div className="my-2">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#5A1A1A]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                No.
              </th>
              <th className="border border-black p-3 text-left">
                Item
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.recovery.resolutionVerificationItems.map((row, index) => (
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
      <EachRow item={{ "key": "Confirm voltage readings at equipment disconnect:", value: `${props?.recovery?.disconnectVoltage ?? "-"} VAC` }} className="" />


      <p className="font-semibold text-lg my-4">Pre-Start Safety Checks</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Complete all safety verifications before energizing equipment:
      </Typography>
      <div className="my-4">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#5A1A1A]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                No.
              </th>
              <th className="border border-black p-3 text-left">
                Item
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.recovery.preStartSafetyItems.map((row, index) => (
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

      <p className="font-semibold text-lg my-4">Equipment-Specific Restart Sequence</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Follow the manufacturer-specific startup procedure for {assetName}
      </Typography>
      <div className="my-4">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#5A1A1A]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                No.
              </th>
              <th className="border border-black p-3 text-left">
                Item
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.recovery.restartSequenceItems.map((row, index) => (
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

      <EachRow item={{ "key": "Record startup time:", value: props?.recovery?.startupTime }} className="" />


      <p className="font-semibold text-lg my-4">System Functionality Verification</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Monitor critical parameters during the startup phase:
      </Typography>


      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Parameter
            </th>
            <th className="border border-black p-3 text-left">
              Expected Range
            </th>
            <th className="border border-black p-3 text-left">
              Actual Reading
            </th>
            <th className="border border-black p-3 text-left">
              Pass/Fail
            </th>
          </tr>
        </thead>

        <tbody className="">
          {props.recovery.functionalityRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.parameter}
              </td>
              <td className="border border-black p-3 align-top">
                {row.expectedRange}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.actualReading}
              </td>
              <td className="border w-32 border-black min-w-20 p-3 align-top">
                {row.passFail}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>


      <p className="font-semibold text-lg my-4">Load Transfer (if applicable)</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        {props.recovery.loadTransferNote}
      </Typography>


      <p className="font-semibold text-lg my-4">Performance Validation</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Confirm equipment is operating within normal parameters:
      </Typography>
      <div className="my-4">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#5A1A1A]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                No.
              </th>
              <th className="border border-black p-3 text-left">
                Item
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.recovery.performanceValidationItems.map((row, index) => (
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

      <p className="font-semibold text-lg my-4">Return to Normal Operation</p>
      <Typography variant="p" className="my-4 text-sm text-gray-700">
        Complete recovery documentation and notifications
      </Typography>
      <div className="my-4">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-[#5A1A1A]">
            <tr className=" text-white">
              <th className="border border-black p-3 text-left">
                No.
              </th>
              <th className="border border-black p-3 text-left">
                Item
              </th>
            </tr>
          </thead>

          <tbody className="">
            {props.recovery.returnToNormalItems.map((row, index) => (
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
      <div className="flex w-full">
        <EachRow item={{ key: "Restoration completed by:", value: props.recovery.restorationCompletedBy }} className="w-full" />
        <EachRow item={{ key: "Restoration completed at:", value: props.recovery.restorationCompletedAt }} className="w-full" />
      </div>

    </div>
  </div>
}

const EighthSection = (props: EOP) => {

  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading="Section 08: References and Documentation" />



      <Typography variant="p" className="font-semibold text-lg my-4">
        Equipment-Specific Documentation
      </Typography>


      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
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
          {props.supportingInformation.equipmentDocumentRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.documentType}
              </td>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.accessLocation}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>


      <Typography variant="p" className="font-semibold text-lg my-4">
        Safety Standards and Guidelines
      </Typography>


      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
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
          {props.supportingInformation.safetyStandardRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.standard}
              </td>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.accessLocation}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>


      <Typography variant="p" className="font-semibold text-lg my-4">
        Additional Resources
      </Typography>


      <table className="w-full border-collapse text-sm ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              Resource Type
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
          {props.supportingInformation.additionalResourceRows.map((row, index) => (
            <CustomTableRowWrapper index={index}>
              <td className="border border-black p-3 align-top">
                {row.resourceType}
              </td>
              <td className="border border-black p-3 align-top">
                {row.description}
              </td>
              <td className="border min-w-20 border-black p-3 align-top">
                {row.accessLocation}
              </td>
            </CustomTableRowWrapper>
          ))}
        </tbody>
      </table>

      <EopSection08Notices />

    </div>
  </div >
}

const NinthSection = (props: EOP) => {
  const approvalReview = resolveEopApprovalReview(props.approvalReview);

  return <div className="">
    <div className="my-4 rounded-lg p-2 break-inside-auto">
      <SectionHeading className="heading-1" heading={EOP_SECTION_09_HEADING} />

      <table className="w-full border-collapse text-sm mt-4 ">
        <thead className="bg-[#5A1A1A]">
          <tr className=" text-white">
            <th className="border border-black p-3 text-left">
              {EOP_SECTION_09_TABLE_HEADERS.reviewStage}
            </th>
            <th className="border border-black p-3 text-left">
              {EOP_SECTION_09_TABLE_HEADERS.reviewersName}
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              {EOP_SECTION_09_TABLE_HEADERS.reviewersTitle}
            </th>
            <th className="border min-w-20 border-black p-3 text-left">
              {EOP_SECTION_09_TABLE_HEADERS.date}
            </th>
          </tr>
        </thead>

        <tbody className="">
          {approvalReview.reviewRows.map((row, index) => (
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
            {EOP_EFFECTIVE_DATE_LABEL}
          </Typography>

          <Typography
            variant="p"
            className="tracking-wide text-balance drop-shadow-sm"
          >
            {
              approvalReview.effectiveDate
                ? new Date(approvalReview.effectiveDate).toLocaleDateString()
                : 'Not Selected'
            }
          </Typography>
        </div>
        <div className="flex gap-x-2" >
          <Typography
            variant="h5"
            className="font-bold tracking-wide text-balance drop-shadow-sm"
          >
            {EOP_EXPIRATION_DATE_LABEL}
          </Typography>

          <Typography
            variant="p"
            className="tracking-wide text-balance drop-shadow-sm"
          >
            {
              approvalReview.expirationDate
                ? new Date(approvalReview.expirationDate).toLocaleDateString()
                : 'Not Selected'
            }
          </Typography>
        </div>
      </div>
    </div>
  </div >
}


const EopPrintComponent = ({ eop, id }: { eop: EOP | null, id: string }) => {
  if (!eop) return;

  const handleDownload = async (id: string) => {
    const res = await fetch(`/api/eops/${id}/pdf`);

    if (!res.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${eop.document.title}-${new Date().toISOString()}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return <main className="bg-white p-8 text-black">
    <div className="max-w-7xl mx-auto">

      <div className="text-3xl pb-4 border-b-4 border-black border-solid mb-8 font-bold text-center">
        Emergency Operations Plan (EOP)
      </div>


      <FirstSection
        {...eop}
      />

      <SecondSection
        {...eop}
      />

      <ThirdSection
        {...eop}
      />

      <FourthSection
        {...eop}
      />

      <FifthSection
        {...eop}
      />

      <SixthSection
        {...eop}
      />

      <SeventhSection
        {...eop}
      />

      <EighthSection
        {...eop}
      />

      <NinthSection
        {...eop}
      />
      <div onClick={() => handleDownload(id)} className="bg-red-300 cursor-pointer print:hidden rounded-full px-4 py-4 fixed right-10 bottom-10"><DownloadIcon /></div>
    </div>
  </main>
}

export default EopPrintComponent;
