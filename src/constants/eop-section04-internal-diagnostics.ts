import type { EopSection04InternalDiagnosticRow } from "@/types/eop";

export const EOP_SECTION_04_INTERNAL_DIAGNOSTICS_HEADING =
  "Internal Equipment Diagnostics for LENNOX HS29-060-13G";

export const EOP_SECTION_04_INTERNAL_DIAGNOSTICS_INTRO =
  "Perform systematic internal component checks to identify the source of Power Failure";

export const EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING =
  "WARNING: If internal diagnostics do not identify the cause of Power Failure, proceed to Section 05 for external equipment diagnostics. The fault may be upstream from the unit.";

export const EOP_SECTION_04_DEFAULT_INTERNAL_DIAGNOSTIC_ROWS: EopSection04InternalDiagnosticRow[] =
  [
    {
      id: "internal-step-1",
      stepNumber: 1,
      componentToCheck: "Main disconnect voltage (line side) - all phases",
      expectedCondition: "480VAC ±10% (or as per nameplate)",
      actualReading: "",
      actualReadingPlaceholder: "L1-L2, L2-L3, L1-L3",
      passFail: "",
    },
    {
      id: "internal-step-2",
      stepNumber: 2,
      componentToCheck:
        "Main disconnect voltage (load side) - with disconnect closed",
      expectedCondition: "480VAC ±10% (or as per nameplate)",
      actualReading: "",
      actualReadingPlaceholder: "L1-L2, L2-L3, L1-L3",
      passFail: "",
    },
    {
      id: "internal-step-3",
      stepNumber: 3,
      componentToCheck: "Control transformer secondary voltage",
      expectedCondition: "24VAC or 120VAC per schematics",
      actualReading: "",
      actualReadingPlaceholder: "VAC",
      passFail: "",
    },
    {
      id: "internal-step-4",
      stepNumber: 4,
      componentToCheck: "Control fuse continuity check",
      expectedCondition: "All fuses show continuity (0 ohms)",
      actualReading: "",
      actualReadingPlaceholder: "Status (Good/Blown)",
      passFail: "",
    },
    {
      id: "internal-step-5",
      stepNumber: 5,
      componentToCheck: "Main breaker / internal breakers status",
      expectedCondition: "Closed, no trip flags or indicators",
      actualReading: "",
      actualReadingPlaceholder: "Status (On/Off/Tripped)",
      passFail: "",
    },
    {
      id: "internal-step-6",
      stepNumber: 6,
      componentToCheck:
        "⚠️ CRITICAL: APPLY LOCKOUT/TAGOUT PROCEDURE NOW\nDe-energize equipment per OSHA 1910.147 and Element Critical LOTO Policy. Notify affected employees, shut down, isolate, lock/tag, and verify zero energy state.",
      expectedCondition: "LOTO Applied:",
      actualReading: "",
      actualReadingPlaceholder: "Verified:",
      passFail: "",
    },
    {
      id: "internal-step-7",
      stepNumber: 7,
      componentToCheck: "Insulation resistance test - fan motor windings",
      expectedCondition: ">10 megohms at 500VDC",
      actualReading: "",
      actualReadingPlaceholder: "Megohms",
      passFail: "",
    },
    {
      id: "internal-step-8",
      stepNumber: 8,
      componentToCheck: "Motor contactor inspection for pitting/burning",
      expectedCondition: "Contacts are clean with no signs of arcing",
      actualReading: "",
      actualReadingPlaceholder: "Condition",
      passFail: "",
    },
  ];
