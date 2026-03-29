import type { CategoryAsset } from "@/types/maintenance-schedule";

/**
 * Mock assets per category ID, used by the category detail page until the
 * real API endpoint is available.
 */
export const MOCK_CATEGORY_ASSETS: Record<string, CategoryAsset[]> = {
  1: [
    {
      id: "a1-01",
      assetId: "AHU-001",
      assetName: "AHU Level 1 North",
      location: "Level 1 – Server Hall A",
      serialNumber: "SN-AHU-0421",
      mops: [
        {
          id: "mop-ahu-01",
          description: "MOP-AHU-01: Monthly filter inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ahu-01.pdf",
        },
        {
          id: "mop-ahu-02",
          description: "MOP-AHU-02: Quarterly belt tension",
          generated: false,
        },
        {
          id: "mop-ahu-03",
          description: "MOP-AHU-03: Annual coil cleaning",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ahu-01",
          description: "EOP-AHU-01: Emergency shutdown",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-ahu-01",
          description: "SOP-AHU-01: Standard startup checklist",
          generated: true,
          documentUrl: "https://example.com/docs/sop-ahu-01.pdf",
        },
        {
          id: "sop-ahu-02",
          description: "SOP-AHU-02: Alarm response procedure",
          generated: false,
        },
      ],
    },
    {
      id: "a1-02",
      assetId: "AHU-002",
      assetName: "AHU Level 1 South",
      location: "Level 1 – Server Hall B",
      serialNumber: "SN-AHU-0422",
      mops: [
        {
          id: "mop-ahu-01",
          description: "MOP-AHU-01: Monthly filter inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ahu-01.pdf",
        },
        {
          id: "mop-ahu-02",
          description: "MOP-AHU-02: Quarterly belt tension",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ahu-02.pdf",
        },
        {
          id: "mop-ahu-03",
          description: "MOP-AHU-03: Annual coil cleaning",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ahu-01",
          description: "EOP-AHU-01: Emergency shutdown",
          generated: true,
          documentUrl: "https://example.com/docs/eop-ahu-01.pdf",
        },
      ],
      sops: [
        {
          id: "sop-ahu-01",
          description: "SOP-AHU-01: Standard startup checklist",
          generated: false,
        },
        {
          id: "sop-ahu-02",
          description: "SOP-AHU-02: Alarm response procedure",
          generated: false,
        },
      ],
    },
    {
      id: "a1-03",
      assetId: "AHU-003",
      assetName: "AHU Level 2 East",
      location: "Level 2 – Comms Room",
      serialNumber: "SN-AHU-0423",
      mops: [
        {
          id: "mop-ahu-01",
          description: "MOP-AHU-01: Monthly filter inspection",
          generated: false,
        },
        {
          id: "mop-ahu-02",
          description: "MOP-AHU-02: Quarterly belt tension",
          generated: false,
        },
        {
          id: "mop-ahu-03",
          description: "MOP-AHU-03: Annual coil cleaning",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ahu-01",
          description: "EOP-AHU-01: Emergency shutdown",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-ahu-01",
          description: "SOP-AHU-01: Standard startup checklist",
          generated: false,
        },
        {
          id: "sop-ahu-02",
          description: "SOP-AHU-02: Alarm response procedure",
          generated: false,
        },
      ],
    },
  ],
  2: [
    {
      id: "a2-01",
      assetId: "ATS-001",
      assetName: "ATS Main LV Board",
      location: "Basement – MV Room",
      serialNumber: "SN-ATS-1101",
      mops: [
        {
          id: "mop-ats-01",
          description: "MOP-ATS-01: Quarterly operation test",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ats-01.pdf",
        },
        {
          id: "mop-ats-02",
          description: "MOP-ATS-02: Annual contact inspection",
          generated: false,
        },
        {
          id: "mop-ats-03",
          description: "MOP-ATS-03: Bi-annual overhaul",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ats-01",
          description: "EOP-ATS-01: Manual transfer procedure",
          generated: false,
        },
        {
          id: "eop-ats-02",
          description: "EOP-ATS-02: ATS failure isolation",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-ats-01",
          description: "SOP-ATS-01: Transfer sequence verification",
          generated: false,
        },
      ],
    },
    {
      id: "a2-02",
      assetId: "ATS-002",
      assetName: "ATS Generator Feed",
      location: "Basement – Generator Room",
      serialNumber: "SN-ATS-1102",
      mops: [
        {
          id: "mop-ats-01",
          description: "MOP-ATS-01: Quarterly operation test",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ats-01.pdf",
        },
        {
          id: "mop-ats-02",
          description: "MOP-ATS-02: Annual contact inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ats-02.pdf",
        },
        {
          id: "mop-ats-03",
          description: "MOP-ATS-03: Bi-annual overhaul",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ats-01",
          description: "EOP-ATS-01: Manual transfer procedure",
          generated: true,
          documentUrl: "https://example.com/docs/eop-ats-01.pdf",
        },
        {
          id: "eop-ats-02",
          description: "EOP-ATS-02: ATS failure isolation",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-ats-01",
          description: "SOP-ATS-01: Transfer sequence verification",
          generated: true,
          documentUrl: "https://example.com/docs/sop-ats-01.pdf",
        },
      ],
    },
  ],
  3: [
    {
      id: "a3-01",
      assetId: "BFP-001",
      assetName: "Backflow Preventer – Main",
      location: "Ground Floor – Plant Room",
      serialNumber: "SN-BFP-2201",
      mops: [
        {
          id: "mop-bfp-01",
          description: "MOP-BFP-01: Annual backflow preventer test",
          generated: true,
          documentUrl: "https://example.com/docs/mop-bfp-01.pdf",
        },
      ],
      eops: [],
      sops: [
        {
          id: "sop-bfp-01",
          description: "SOP-BFP-01: Isolation and bypass procedure",
          generated: false,
        },
      ],
    },
    {
      id: "a3-02",
      assetId: "BFP-002",
      assetName: "Backflow Preventer – Secondary",
      location: "Roof – Plant Room",
      serialNumber: "SN-BFP-2202",
      mops: [
        {
          id: "mop-bfp-01",
          description: "MOP-BFP-01: Annual backflow preventer test",
          generated: false,
        },
      ],
      eops: [],
      sops: [
        {
          id: "sop-bfp-01",
          description: "SOP-BFP-01: Isolation and bypass procedure",
          generated: false,
        },
      ],
    },
  ],
  4: [
    {
      id: "a4-01",
      assetId: "BMS-001",
      assetName: "BMS Controller A",
      location: "Level 1 – Control Room",
      serialNumber: "SN-BMS-3301",
      mops: [
        {
          id: "mop-bms-01",
          description: "MOP-BMS-01: Quarterly BMS calibration",
          generated: false,
        },
        {
          id: "mop-bms-02",
          description: "MOP-BMS-02: Annual control panel inspection",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-bms-01",
          description: "EOP-BMS-01: BMS failure response",
          generated: true,
          documentUrl: "https://example.com/docs/eop-bms-01.pdf",
        },
      ],
      sops: [
        {
          id: "sop-bms-01",
          description: "SOP-BMS-01: Set point adjustment",
          generated: true,
          documentUrl: "https://example.com/docs/sop-bms-01.pdf",
        },
        {
          id: "sop-bms-02",
          description: "SOP-BMS-02: Trend data review",
          generated: false,
        },
      ],
    },
  ],
  5: [
    {
      id: "a5-01",
      assetId: "CDU-001",
      assetName: "Condenser Unit North Bank 1",
      location: "Roof – Zone A",
      serialNumber: "SN-CDU-4401",
      mops: [
        {
          id: "mop-cdu-01",
          description: "MOP-CDU-01: Monthly coil inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-cdu-01.pdf",
        },
        {
          id: "mop-cdu-02",
          description: "MOP-CDU-02: Annual refrigerant charge check",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-cdu-01",
          description: "EOP-CDU-01: Emergency refrigerant leak response",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-cdu-01",
          description: "SOP-CDU-01: Seasonal startup and shutdown",
          generated: true,
          documentUrl: "https://example.com/docs/sop-cdu-01.pdf",
        },
      ],
    },
    {
      id: "a5-02",
      assetId: "CDU-002",
      assetName: "Condenser Unit North Bank 2",
      location: "Roof – Zone A",
      serialNumber: "SN-CDU-4402",
      mops: [
        {
          id: "mop-cdu-01",
          description: "MOP-CDU-01: Monthly coil inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-cdu-01.pdf",
        },
        {
          id: "mop-cdu-02",
          description: "MOP-CDU-02: Annual refrigerant charge check",
          generated: true,
          documentUrl: "https://example.com/docs/mop-cdu-02.pdf",
        },
      ],
      eops: [
        {
          id: "eop-cdu-01",
          description: "EOP-CDU-01: Emergency refrigerant leak response",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-cdu-01",
          description: "SOP-CDU-01: Seasonal startup and shutdown",
          generated: true,
          documentUrl: "https://example.com/docs/sop-cdu-01.pdf",
        },
      ],
    },
  ],
  6: [
    {
      id: "a6-01",
      assetId: "GEN-001",
      assetName: "Generator Unit 1",
      location: "Basement – Generator Bay",
      serialNumber: "SN-GEN-5501",
      mops: [
        {
          id: "mop-gen-01",
          description: "MOP-GEN-01: Monthly no-load test run",
          generated: true,
          documentUrl: "https://example.com/docs/mop-gen-01.pdf",
        },
        {
          id: "mop-gen-02",
          description: "MOP-GEN-02: Quarterly load bank test",
          generated: false,
        },
        {
          id: "mop-gen-03",
          description: "MOP-GEN-03: Semi-annual coolant flush",
          generated: false,
        },
        {
          id: "mop-gen-04",
          description: "MOP-GEN-04: Annual full load test",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-gen-01",
          description: "EOP-GEN-01: Generator failure response",
          generated: true,
          documentUrl: "https://example.com/docs/eop-gen-01.pdf",
        },
        {
          id: "eop-gen-02",
          description: "EOP-GEN-02: Fuel spill containment",
          generated: false,
        },
        {
          id: "eop-gen-03",
          description: "EOP-GEN-03: Paralleling failure isolation",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-gen-01",
          description: "SOP-GEN-01: Generator start-up checklist",
          generated: true,
          documentUrl: "https://example.com/docs/sop-gen-01.pdf",
        },
        {
          id: "sop-gen-02",
          description: "SOP-GEN-02: Fuel level monitoring",
          generated: false,
        },
      ],
    },
    {
      id: "a6-02",
      assetId: "GEN-002",
      assetName: "Generator Unit 2",
      location: "Basement – Generator Bay",
      serialNumber: "SN-GEN-5502",
      mops: [
        {
          id: "mop-gen-01",
          description: "MOP-GEN-01: Monthly no-load test run",
          generated: true,
          documentUrl: "https://example.com/docs/mop-gen-01.pdf",
        },
        {
          id: "mop-gen-02",
          description: "MOP-GEN-02: Quarterly load bank test",
          generated: true,
          documentUrl: "https://example.com/docs/mop-gen-02.pdf",
        },
        {
          id: "mop-gen-03",
          description: "MOP-GEN-03: Semi-annual coolant flush",
          generated: false,
        },
        {
          id: "mop-gen-04",
          description: "MOP-GEN-04: Annual full load test",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-gen-01",
          description: "EOP-GEN-01: Generator failure response",
          generated: true,
          documentUrl: "https://example.com/docs/eop-gen-01.pdf",
        },
        {
          id: "eop-gen-02",
          description: "EOP-GEN-02: Fuel spill containment",
          generated: false,
        },
        {
          id: "eop-gen-03",
          description: "EOP-GEN-03: Paralleling failure isolation",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-gen-01",
          description: "SOP-GEN-01: Generator start-up checklist",
          generated: false,
        },
        {
          id: "sop-gen-02",
          description: "SOP-GEN-02: Fuel level monitoring",
          generated: false,
        },
      ],
    },
  ],
  7: [
    {
      id: "a7-01",
      assetId: "UPS-001",
      assetName: "UPS Module A1",
      location: "Level 1 – UPS Room",
      serialNumber: "SN-UPS-6601",
      mops: [
        {
          id: "mop-ups-01",
          description: "MOP-UPS-01: Monthly runtime test",
          generated: false,
        },
        {
          id: "mop-ups-02",
          description: "MOP-UPS-02: Quarterly bypass test",
          generated: false,
        },
        {
          id: "mop-ups-03",
          description: "MOP-UPS-03: Annual battery replacement",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ups-01",
          description: "EOP-UPS-01: UPS overload procedure",
          generated: false,
        },
        {
          id: "eop-ups-02",
          description: "EOP-UPS-02: Critical load transfer",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-ups-01",
          description: "SOP-UPS-01: Battery discharge test",
          generated: false,
        },
        {
          id: "sop-ups-02",
          description: "SOP-UPS-02: Alarm acknowledgment",
          generated: false,
        },
      ],
    },
  ],
  8: [
    {
      id: "a8-01",
      assetId: "PDU-001",
      assetName: "PDU Cabinet 1A",
      location: "Level 1 – Data Hall",
      serialNumber: "SN-PDU-7701",
      mops: [
        {
          id: "mop-pdu-01",
          description: "MOP-PDU-01: Monthly breaker inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-pdu-01.pdf",
        },
        {
          id: "mop-pdu-02",
          description: "MOP-PDU-02: Annual thermal imaging",
          generated: true,
          documentUrl: "https://example.com/docs/mop-pdu-02.pdf",
        },
        {
          id: "mop-pdu-03",
          description: "MOP-PDU-03: Annual busbar cleaning",
          generated: true,
          documentUrl: "https://example.com/docs/mop-pdu-03.pdf",
        },
      ],
      eops: [
        {
          id: "eop-pdu-01",
          description: "EOP-PDU-01: PDU fault isolation",
          generated: true,
          documentUrl: "https://example.com/docs/eop-pdu-01.pdf",
        },
      ],
      sops: [
        {
          id: "sop-pdu-01",
          description: "SOP-PDU-01: Breaker trip investigation",
          generated: true,
          documentUrl: "https://example.com/docs/sop-pdu-01.pdf",
        },
      ],
    },
    {
      id: "a8-02",
      assetId: "PDU-002",
      assetName: "PDU Cabinet 1B",
      location: "Level 1 – Data Hall",
      serialNumber: "SN-PDU-7702",
      mops: [
        {
          id: "mop-pdu-01",
          description: "MOP-PDU-01: Monthly breaker inspection",
          generated: true,
          documentUrl: "https://example.com/docs/mop-pdu-01.pdf",
        },
        {
          id: "mop-pdu-02",
          description: "MOP-PDU-02: Annual thermal imaging",
          generated: false,
        },
        {
          id: "mop-pdu-03",
          description: "MOP-PDU-03: Annual busbar cleaning",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-pdu-01",
          description: "EOP-PDU-01: PDU fault isolation",
          generated: true,
          documentUrl: "https://example.com/docs/eop-pdu-01.pdf",
        },
      ],
      sops: [
        {
          id: "sop-pdu-01",
          description: "SOP-PDU-01: Breaker trip investigation",
          generated: false,
        },
      ],
    },
  ],
  9: [
    {
      id: "a9-01",
      assetId: "CT-001",
      assetName: "Cooling Tower Cell 1",
      location: "Rooftop – Zone B",
      serialNumber: "SN-CT-8801",
      mops: [
        {
          id: "mop-ct-01",
          description: "MOP-CT-01: Monthly water quality testing",
          generated: true,
          documentUrl: "https://example.com/docs/mop-ct-01.pdf",
        },
        {
          id: "mop-ct-02",
          description: "MOP-CT-02: Quarterly fill inspection",
          generated: false,
        },
        {
          id: "mop-ct-03",
          description: "MOP-CT-03: Annual basin cleaning",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-ct-01",
          description: "EOP-CT-01: Legionella outbreak response",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-ct-01",
          description: "SOP-CT-01: Seasonal startup flushing",
          generated: true,
          documentUrl: "https://example.com/docs/sop-ct-01.pdf",
        },
        {
          id: "sop-ct-02",
          description: "SOP-CT-02: Chemical handling procedure",
          generated: false,
        },
      ],
    },
  ],
  10: [
    {
      id: "a10-01",
      assetId: "FSS-001",
      assetName: "FM200 System – Server Hall A",
      location: "Level 1 – Server Hall A",
      serialNumber: "SN-FSS-9901",
      mops: [
        {
          id: "mop-fss-01",
          description: "MOP-FSS-01: Quarterly agent level inspection",
          generated: false,
        },
        {
          id: "mop-fss-02",
          description: "MOP-FSS-02: Annual full discharge test",
          generated: false,
        },
      ],
      eops: [
        {
          id: "eop-fss-01",
          description: "EOP-FSS-01: System discharge response",
          generated: false,
        },
        {
          id: "eop-fss-02",
          description: "EOP-FSS-02: False discharge isolation",
          generated: false,
        },
      ],
      sops: [
        {
          id: "sop-fss-01",
          description: "SOP-FSS-01: System arming/disarming",
          generated: false,
        },
        {
          id: "sop-fss-02",
          description: "SOP-FSS-02: Hot-work permit procedure",
          generated: false,
        },
        {
          id: "sop-fss-03",
          description: "SOP-FSS-03: Inspection log completion",
          generated: false,
        },
      ],
    },
  ],
};
