import type {
  EopEmergencyContactRow,
  EopEscalationMatrixRow,
} from "@/types/eop";

export const EOP_SECTION_06_HEADING = "Section 06: Communication & Escalation Protocol";
export const EOP_SECTION_06_ESCALATION_SUBHEADING = "Escalation Matrix";
export const EOP_SECTION_06_EMERGENCY_SUBHEADING = "Emergency Contacts";
export const EOP_SECTION_06_RESEARCHED_NOTE =
  "RESEARCHED: Contact information has been researched for the specific location at 8025 North Interstate Hwy 35, Austin, TX 78753. Please verify current phone numbers before use as they may change over time.";

export const EOP_SECTION_06_DEFAULT_ESCALATION_ROWS: EopEscalationMatrixRow[] = [
  {
    id: "lvl-0",
    level: "Level 0",
    title: "Initial Response Team / On-Call CET",
    contactName: "",
    phoneNumber: "",
  },
  {
    id: "lvl-1",
    level: "Level 1",
    title: "Facility Manager / Shift Supervisor",
    contactName: "",
    phoneNumber: "",
  },
  {
    id: "lvl-2",
    level: "Level 2",
    title: "Operations Manager",
    contactName: "",
    phoneNumber: "",
  },
  {
    id: "lvl-3",
    level: "Level 3",
    title: "Site Director / Executive Level",
    contactName: "",
    phoneNumber: "",
  },
];

export const EOP_SECTION_06_DEFAULT_EMERGENCY_ROWS: EopEmergencyContactRow[] = [
  {
    id: "em-police-fire-ems",
    serviceType: "Police/Fire/EMS Emergency",
    contactNameOrganization: "All Services",
    phoneNumber: "911",
    notesAddress: "For life-threatening emergencies ONLY.",
  },
  {
    id: "em-local-police",
    serviceType: "Local Police (Non-Emergency)",
    contactNameOrganization: "Austin Police Department",
    phoneNumber: "512-974-2000",
    notesAddress: "For non-emergency security situations.",
  },
  {
    id: "em-local-fire",
    serviceType: "Local Fire (Non-Emergency)",
    contactNameOrganization: "Austin Fire Department",
    phoneNumber: "512-974-0130",
    notesAddress: "For non-emergency fire safety questions.",
  },
  {
    id: "em-hospital",
    serviceType: "Nearest Hospital/Medical Center",
    contactNameOrganization:
      "Dell Seton Medical Center at The University of Texas",
    phoneNumber: "512-324-7000",
    notesAddress:
      "1500 Red River St, Austin, TX 78701 (Level I Trauma Center).",
  },
  {
    id: "em-electric",
    serviceType: "Electric Utility Emergency",
    contactNameOrganization: "Austin Energy",
    phoneNumber: "512-322-9100",
    notesAddress: "24/7 Power Outage Reporting Line.",
  },
  {
    id: "em-oem",
    serviceType: "Equipment Manufacturer Support",
    contactNameOrganization: "LENNOX Commercial Support",
    phoneNumber: "1-800-453-6669",
    notesAddress: "Provide Model HS29-060-13G & Serial 5807C49911.",
  },
  {
    id: "em-local-electrical",
    serviceType: "Local Electrical Contractor",
    contactNameOrganization: "",
    phoneNumber: "",
    notesAddress: "On-call for emergency electrical support.",
  },
  {
    id: "em-local-mechanical",
    serviceType: "Local Mechanical Contractor",
    contactNameOrganization: "",
    phoneNumber: "",
    notesAddress: "On-call for emergency cooling support.",
  },
  {
    id: "em-facilities-manager",
    serviceType: "Facilities Manager",
    contactNameOrganization: "",
    phoneNumber: "",
    notesAddress: "Primary site contact for facility issues.",
  },
];
