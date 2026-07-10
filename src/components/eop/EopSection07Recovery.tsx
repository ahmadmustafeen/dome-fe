"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { EOP_SECTION_07_HEADING } from "@/constants/eop-section07-recovery";
import type { EOPSection07Recovery } from "@/types/eop";

import { EopSection07Checklist } from "./EopSection07Checklist";
import { EopSection07FunctionalityTable } from "./EopSection07FunctionalityTable";

type EopSection07RecoveryProps = {
  recovery: EOPSection07Recovery;
  patchRecovery: (p: Partial<EOPSection07Recovery>) => void;
};

export const EopSection07Recovery = ({
  recovery,
  patchRecovery,
}: EopSection07RecoveryProps) => (
  <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
    <Typography
      variant="h6"
      className="mb-2 border-b border-gray-200 pb-2 font-bold text-gray-900"
    >
      {EOP_SECTION_07_HEADING}
    </Typography>

    <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
      Power Failure Resolution and Equipment Recovery Procedures
    </Typography>
    <Typography variant="p" className="text-sm text-gray-600">
      {recovery?.introText}
    </Typography>

    <EopSection07Checklist
      title="Power Failure Resolution Verification"
      description="Confirm stable operating conditions are available at all system levels:"
      items={recovery?.resolutionVerificationItems}
      onItemsChange={(items) =>
        patchRecovery({ resolutionVerificationItems: items })}
      editable
    />

    <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-3">
      <label
        className="flex flex-col gap-2 text-sm font-medium text-gray-800 sm:flex-row sm:items-center"
        htmlFor="eop-disconnect-voltage"
      >
        <span>Confirm voltage readings at equipment disconnect:</span>
        <Input
          id="eop-disconnect-voltage"
          value={recovery?.disconnectVoltage}
          onChange={(event) =>
            patchRecovery({ disconnectVoltage: event.target.value })}
          placeholder="Enter voltage"
          className="w-full sm:w-40"
        />
        <span className="text-gray-600">VAC</span>
      </label>
    </div>

    <EopSection07Checklist
      title="Pre-Start Safety Checks"
      description="Complete all safety verifications before energizing equipment:"
      items={recovery?.preStartSafetyItems}
      onItemsChange={(items) => patchRecovery({ preStartSafetyItems: items })}
      editable
    />

    <EopSection07Checklist
      title="Equipment-Specific Restart Sequence"
      description="Follow the manufacturer-specific startup procedure for LENNOX HS29-060-13G:"
      items={recovery?.restartSequenceItems}
      onItemsChange={(items) => patchRecovery({ restartSequenceItems: items })}
      editable
    />

    <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-3">
      <label
        className="flex flex-col gap-2 text-sm font-medium text-gray-800 sm:flex-row sm:items-center"
        htmlFor="eop-startup-time"
      >
        <span>Record startup time:</span>
        <Input
          id="eop-startup-time"
          type="time"
          value={recovery?.startupTime}
          onChange={(event) => patchRecovery({ startupTime: event.target.value })}
          className="w-full sm:w-40"
        />
      </label>
    </div>

    <div className="mt-5 rounded-md border border-gray-200 bg-gray-50 p-3">
      <Typography variant="h6" className="mb-1 text-sm font-semibold text-gray-900">
        System Functionality Verification
      </Typography>
      <Typography variant="p" className="text-sm text-gray-600">
        Monitor critical parameters during the startup phase:
      </Typography>
      <EopSection07FunctionalityTable
        rows={recovery?.functionalityRows}
        onRowsChange={(rows) => patchRecovery({ functionalityRows: rows })}
      />
    </div>

    <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-3">
      <Typography variant="h6" className="mb-1 text-sm font-semibold text-gray-900">
        Load Transfer (if applicable)
      </Typography>
      <Typography variant="p" className="text-sm text-gray-700">
        {recovery?.loadTransferNote}
      </Typography>
    </div>

    <EopSection07Checklist
      title="Performance Validation"
      description="Confirm equipment is operating within normal parameters:"
      items={recovery?.performanceValidationItems}
      onItemsChange={(items) =>
        patchRecovery({ performanceValidationItems: items })}
      editable
    />

    <EopSection07Checklist
      title="Return to Normal Operation"
      description="Complete recovery documentation and notifications"
      items={recovery?.returnToNormalItems}
      onItemsChange={(items) => patchRecovery({ returnToNormalItems: items })}
      editable
    />

    <div className="mt-3 grid gap-3 rounded-md border border-gray-200 bg-gray-50 p-3 sm:grid-cols-[1fr_180px]">
      <label
        className="text-sm font-medium text-gray-800"
        htmlFor="eop-restoration-completed-by"
      >
        Restoration completed by:
        <Input
          id="eop-restoration-completed-by"
          value={recovery?.restorationCompletedBy}
          onChange={(event) =>
            patchRecovery({ restorationCompletedBy: event.target.value })}
          placeholder="Name"
          className="mt-1 w-full"
        />
      </label>
      <label
        className="text-sm font-medium text-gray-800"
        htmlFor="eop-restoration-completed-at"
      >
        at
        <Input
          id="eop-restoration-completed-at"
          type="time"
          value={recovery?.restorationCompletedAt}
          onChange={(event) =>
            patchRecovery({ restorationCompletedAt: event.target.value })}
          className="mt-1 w-full"
        />
      </label>
    </div>
  </div>
);
