"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { MopFormTableRow } from "./MopFormTableRow";

import type { MOPSection07Details } from "@/types/mop";

type MopSection07HeaderFieldsProps = {
  details: MOPSection07Details;
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
};

export const MopSection07HeaderFields = ({
  details,
  patchMopDetails,
}: MopSection07HeaderFieldsProps) => {
  return (
    <div className="mb-6">
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:items-end">
        <div className="min-w-0 sm:min-w-44">
          <label
            className="mb-1.5 block text-sm font-medium text-gray-800"
            htmlFor="mop-s07-date-performed"
          >
            Date Performed
          </label>
          <Input
            id="mop-s07-date-performed"
            value={details.datePerformed}
            onChange={(e) => patchMopDetails({ datePerformed: e.target.value })}
            type="date"
            className="w-full min-w-0"
          />
        </div>
        <div className="min-w-0 sm:min-w-44">
          <label
            className="mb-1.5 block text-sm font-medium text-gray-800"
            htmlFor="mop-s07-time-begun"
          >
            Time Begun
          </label>
          <Input
            id="mop-s07-time-begun"
            value={details.timeBegun}
            onChange={(e) => patchMopDetails({ timeBegun: e.target.value })}
            type="time"
            className="w-full min-w-0"
          />
        </div>
        <div className="min-w-0 sm:min-w-44">
          <label
            className="mb-1.5 block text-sm font-medium text-gray-800"
            htmlFor="mop-s07-time-completed"
          >
            Time Completed
          </label>
          <Input
            id="mop-s07-time-completed"
            value={details.timeCompleted}
            onChange={(e) => patchMopDetails({ timeCompleted: e.target.value })}
            type="time"
            className="w-full min-w-0"
          />
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500 sm:hidden">
        On narrow screens, date and time fields stack. Widen the window for three columns.
      </p>
      <div className="pt-3">
        <MopFormTableRow label="Facilities personnel performing work:">
          <Input
            value={details.facilitiesPersonnel}
            onChange={(e) => patchMopDetails({ facilitiesPersonnel: e.target.value })}
            className="w-full"
          />
        </MopFormTableRow>
      </div>
      <div className="pt-1">
        <MopFormTableRow label="Contractor/Vendor personnel performing work:">
          <div className="w-full">
            <Input
              value={details.contractorPersonnel}
              onChange={(e) => patchMopDetails({ contractorPersonnel: e.target.value })}
              className="w-full"
              placeholder="If subcontractor is selected in Section 3, reference that company"
            />
            <Typography variant="p" className="mt-1 text-xs text-gray-500">
              If subcontractor was selected in Section 3, align with that company or personnel
              list.
            </Typography>
          </div>
        </MopFormTableRow>
      </div>
    </div>
  );
};
