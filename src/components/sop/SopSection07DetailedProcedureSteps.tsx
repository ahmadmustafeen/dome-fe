"use client";

import { Textarea } from "@/components/ui/Textarea";
import { ProcedureDynamicTableRowControls } from "@/components/procedure/ProcedureDynamicTableRowControls";
import { newSopDetailedProcedureStepRow } from "@/constants/sop-section07-procedure-steps";
import { insertProcedureRowAfterId, removeProcedureRowById } from "@/utils/procedure-dynamic-table-mutations";
import { MopSection07IndicatorSelect } from "@/components/mop/MopSection07IndicatorSelect";
import type { SOPDetailedProcedureStepRow, SOPDetails } from "@/types/sop";

type SopSection07DetailedProcedureStepsProps = {
  rows: SOPDetailedProcedureStepRow[];
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

const renumberRows = (rows: SOPDetailedProcedureStepRow[]) =>
  rows?.map((row, index) => ({ ...row, step: index + 1 }));

export const SopSection07DetailedProcedureSteps = ({
  rows,
  patchDetails,
}: SopSection07DetailedProcedureStepsProps) => {
  const normalizedRows = renumberRows(rows ?? []);

  const patchRows = (updatedRows: SOPDetailedProcedureStepRow[]) => {
    patchDetails({ detailedProcedureStepRows: renumberRows(updatedRows) });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225 border-collapse text-sm">
        <thead>
          <tr className="bg-[#0E4D2E] text-white">
            <th className="px-3 py-2 text-left font-semibold">Step</th>
            <th className="px-3 py-2 text-left font-semibold">Description</th>
            <th className="px-3 py-2 text-left font-semibold">Expected Range</th>
            <th className="px-3 py-2 text-left font-semibold">Source</th>
            <th className="px-0 py-2 text-left font-semibold">Indicator</th>
            
            <th className="px-3 py-2 text-left font-semibold">Action if Out of Range</th>
            <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
              +-
            </th>
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map((row, index) => (
            <tr key={row.id} className="bg-white">
              <td>
                {index + 1}
              </td>

              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.description}
                  onChange={(e) =>
                    patchRows(
                      normalizedRows.map((currentRow) =>
                        currentRow.id === row.id
                          ? { ...currentRow, description: e.target.value }
                          : currentRow,
                      ),
                    )}
                  className="min-h-24 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.expectedRange}
                  onChange={(e) =>
                    patchRows(
                      normalizedRows.map((currentRow) =>
                        currentRow.id === row.id
                          ? { ...currentRow, expectedRange: e.target.value }
                          : currentRow,
                      ),
                    )}
                  className="min-h-24 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.source}
                  onChange={(e) =>
                    patchRows(
                      normalizedRows.map((currentRow) =>
                        currentRow.id === row.id
                          ? { ...currentRow, source: e.target.value }
                          : currentRow,
                      ),
                    )}
                  className="min-h-24 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <MopSection07IndicatorSelect
                  id={`sop-detail-step-indicator-${row.id}`}
                  value={row.indicator}
                  onChange={(indicator) =>
                    patchRows(
                      normalizedRows.map((currentRow) =>
                        currentRow.id === row.id
                          ? { ...currentRow, indicator }
                          : currentRow,
                      ),
                    )}
                  // className="max-w-40"
                  aria-label={`SOP step ${row.step} indicator`}
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.actionIfOutOfRange}
                  onChange={(e) =>
                    patchRows(
                      normalizedRows.map((currentRow) =>
                        currentRow.id === row.id
                          ? { ...currentRow, actionIfOutOfRange: e.target.value }
                          : currentRow,
                      ),
                    )}
                  className="min-h-24 w-full"
                />
              </td>
              <td className="border border-gray-200 px-1 align-middle">
                <ProcedureDynamicTableRowControls
                  ariaLabelGroup="SOP detailed procedure steps row controls"
                  rowCount={normalizedRows.length}
                  onAddBelow={() =>
                    patchRows(
                      renumberRows(
                        insertProcedureRowAfterId(
                          normalizedRows,
                          row.id,
                          newSopDetailedProcedureStepRow(),
                        ),
                      ),
                    )}
                  onRemove={() => {
                    const next = removeProcedureRowById(
                      normalizedRows,
                      row.id,
                      1,
                    );
                    if (next !== undefined) {
                      patchRows(next);
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {normalizedRows.length === 0 ? (
        <button
          type="button"
          className="mt-2 text-sm font-medium text-primary underline"
          onClick={() => patchRows([newSopDetailedProcedureStepRow()])}
        >
          Add step
        </button>
      ) : null}
    </div>
  );
};
