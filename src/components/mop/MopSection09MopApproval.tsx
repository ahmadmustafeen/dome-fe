'use client';

import type { MopApprovalReviewRow, MOPSection09MopApproval } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_09_APPROVAL_REQUIREMENT_BULLETS,
  MOP_SECTION_09_APPROVAL_REQUIREMENTS_HEADING,
  MOP_SECTION_09_MOP_EFFECTIVE_DATE_LABEL,
  MOP_SECTION_09_MOP_EXPIRATION_DATE_LABEL,
  MOP_SECTION_09_PLACEHOLDERS,
  MOP_SECTION_09_SUBHEADING,
  MOP_SECTION_09_TABLE_HEADERS,
  newApprovalReviewRow,
} from '@/constants/mop-section09-approval';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection09MopApprovalProps = {
  mopApproval: MOPSection09MopApproval;
  patchMopApproval: (p: Partial<MOPSection09MopApproval>) => void;
};

const patchReviewRow = (
  current: MOPSection09MopApproval,
  id: string,
  partial: Partial<
    Pick<MopApprovalReviewRow, 'reviewStage' | 'reviewersName' | 'reviewersTitle' | 'date'>
  >,
  patch: MopSection09MopApprovalProps['patchMopApproval'],
) => {
  patch({
    reviewRows: current.reviewRows.map(r => (r.id === id ? { ...r, ...partial } : r)),
  });
};

export const MopSection09MopApproval = ({
  mopApproval,
  patchMopApproval,
}: MopSection09MopApprovalProps) => {
  const { reviewRows, mopEffectiveDate, mopExpirationDate } = mopApproval;

  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography variant="h5" className="mb-4 text-base font-semibold text-gray-900">
        {MOP_SECTION_09_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="min-w-40 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_09_TABLE_HEADERS.reviewStage}
              </th>
              <th className="min-w-32 px-3 py-2 text-left font-semibold">
                {MOP_SECTION_09_TABLE_HEADERS.reviewersName}
              </th>
              <th className="min-w-32 px-3 py-2 text-left font-semibold">
                {MOP_SECTION_09_TABLE_HEADERS.reviewersTitle}
              </th>
              <th className="w-32 px-3 py-2 text-left font-semibold">{MOP_SECTION_09_TABLE_HEADERS.date}</th>
              <th scope="col" className="w-[4.25rem] px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {reviewRows.map(row => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.reviewStage}
                    onChange={e =>
                      patchReviewRow(mopApproval, row.id, { reviewStage: e.target.value }, patchMopApproval)}
                    className="w-full font-semibold text-gray-900"
                    placeholder="Review stage"
                    aria-label={`${MOP_SECTION_09_TABLE_HEADERS.reviewStage} for row`}
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.reviewersName}
                    onChange={e =>
                      patchReviewRow(
                        mopApproval,
                        row.id,
                        { reviewersName: e.target.value },
                        patchMopApproval,
                      )}
                    className="w-full"
                    placeholder={MOP_SECTION_09_PLACEHOLDERS.name}
                    aria-label={`${row.reviewStage} ${MOP_SECTION_09_PLACEHOLDERS.name}`}
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.reviewersTitle}
                    onChange={e =>
                      patchReviewRow(
                        mopApproval,
                        row.id,
                        { reviewersTitle: e.target.value },
                        patchMopApproval,
                      )}
                    className="w-full"
                    placeholder={MOP_SECTION_09_PLACEHOLDERS.title}
                    aria-label={`${row.reviewStage} ${MOP_SECTION_09_PLACEHOLDERS.title}`}
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.date}
                    onChange={e => patchReviewRow(mopApproval, row.id, { date: e.target.value }, patchMopApproval)}
                    className="w-full min-w-0"
                    placeholder={MOP_SECTION_09_PLACEHOLDERS.date}
                    aria-label={`${row.reviewStage.length > 0 ? row.reviewStage : 'Review stage'} ${MOP_SECTION_09_TABLE_HEADERS.date}`}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="MOP approval review row controls"
                    rowCount={reviewRows.length}
                    onAddBelow={() =>
                      patchMopApproval({
                        reviewRows: insertRowAfterId(reviewRows, row.id, newApprovalReviewRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(reviewRows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (!next) {
                        return;
                      }
                      patchMopApproval({ reviewRows: next });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-800" htmlFor="mop-effective-date">
            {MOP_SECTION_09_MOP_EFFECTIVE_DATE_LABEL}
          </label>
          <Input
            id="mop-effective-date"
            type="date"
            value={mopEffectiveDate}
            onChange={e => patchMopApproval({ mopEffectiveDate: e.target.value })}
            className="w-full max-w-xs"
            aria-label="MOP effective date"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-800" htmlFor="mop-expiration-date">
            {MOP_SECTION_09_MOP_EXPIRATION_DATE_LABEL}
          </label>
          <Input
            id="mop-expiration-date"
            type="date"
            value={mopExpirationDate}
            onChange={e => patchMopApproval({ mopExpirationDate: e.target.value })}
            className="w-full max-w-xs"
            aria-label="MOP expiration date"
          />
        </div>
      </div>
    </div>
  );
};
