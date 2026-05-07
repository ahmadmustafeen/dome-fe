import type { EopSection05ExternalActionRow } from "@/types/eop";

export const EOP_SECTION_05_HEADING =
  "Section 05: Power Failure Detection External Response Actions";

export const EOP_SECTION_05_INTRO =
  "Verify all external equipment and systems that connect to or support the LENNOX HS29-060-13G";

export const EOP_SECTION_05_DEFAULT_ACTION_ROWS: EopSection05ExternalActionRow[] = [
  {
    id: "external-step-1",
    stepNumber: 1,
    externalEquipment: "Upstream Distribution Panel Breaker",
    connectionToUnit: "Provides line-side power to the AHU's main disconnect.",
    potentialFailureMode: "A tripped breaker will cut all power to the unit.",
    verificationMethod:
      "Visually inspect the breaker handle. It should be in the 'ON' position. Cycle if necessary.",
    actualStatus: "",
    actualStatusPlaceholder: "On/Off/Tripped",
    passFail: "",
  },
  {
    id: "external-step-2",
    stepNumber: 2,
    externalEquipment: "Automatic Transfer Switch (ATS)",
    connectionToUnit:
      "Switches the AHU's power source between utility and generator.",
    potentialFailureMode:
      "A failed ATS could be stuck between sources, providing no power.",
    verificationMethod:
      "Verify ATS is on 'Normal' power and output voltage is stable. Check for alarms on the ATS controller.",
    actualStatus: "",
    actualStatusPlaceholder: "Status/Voltage",
    passFail: "",
  },
  {
    id: "external-step-3",
    stepNumber: 3,
    externalEquipment: "Building Management System (BMS)",
    connectionToUnit: "Sends start/stop commands and setpoints to the AHU.",
    potentialFailureMode:
      "An erroneous 'OFF' command from the BMS can shut down the unit.",
    verificationMethod:
      "Check the BMS interface for the AHU. Verify the command status is 'ON' or 'Auto' and there are no active overrides.",
    actualStatus: "",
    actualStatusPlaceholder: "BMS Status",
    passFail: "",
  },
];
