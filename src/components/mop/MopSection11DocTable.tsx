'use client';

import type { MopReferenceLinkRow, MOPSection11References } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING,
  MOP_SECTION_11_ADDITIONAL_TABLE_HEADERS,
  MOP_SECTION_11_EQUIPMENT_DOCS_HEADING,
  MOP_SECTION_11_LINK_TABLE_HEADERS,
  newMopReferenceLinkRow,
} from '@/constants/mop-section11-references';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';
import { MopSection11AccessColumn } from './MopSection11AccessColumn';

type MopSection11DocTableProps = {
  variant: 'equipment' | 'additional';
  rows: MopReferenceLinkRow[];
  references: MOPSection11References;
  patchMopReferences: (p: Partial<MOPSection11References>) => void;
};

const patchRow = (
  current: MOPSection11References,
  variant: 'equipment' | 'additional',
  id: string,
  partial: Partial<Pick<MopReferenceLinkRow, 'title' | 'type' | 'linkUrl' | 'internalAccess'>>,
  patch: MopSection11DocTableProps['patchMopReferences'],
) => {
  if (variant === 'equipment') {
    patch({
      equipmentDocumentRows: current.equipmentDocumentRows?.map(r =>
        r.id === id ? { ...r, ...partial, internalAccess: '' } : r,
      ),
    });
  } else {
    patch({
      additionalResourceRows: current.additionalResourceRows?.map(r =>
        r.id === id ? { ...r, ...partial, internalAccess: '' } : r,
      ),
    });
  }
};

const setLinkRows = (
  variant: 'equipment' | 'additional',
  next: MopReferenceLinkRow[],
  patch: MopSection11DocTableProps['patchMopReferences'],
) => {
  if (variant === 'equipment') {
    patch({ equipmentDocumentRows: next });
  } else {
    patch({ additionalResourceRows: next });
  }
};

const sectionTitle = (v: 'equipment' | 'additional') =>
  v === 'equipment' ? MOP_SECTION_11_EQUIPMENT_DOCS_HEADING : MOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING;

const firstColHeader = (v: 'equipment' | 'additional') =>
  v === 'equipment' ? MOP_SECTION_11_LINK_TABLE_HEADERS.documentTitle : MOP_SECTION_11_ADDITIONAL_TABLE_HEADERS.resource;

export const MopSection11DocTable = ({ variant, rows, references, patchMopReferences }: MopSection11DocTableProps) => {
  const colTitle = firstColHeader(variant);
  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-2 text-sm font-semibold text-gray-900 capitalize">
        {sectionTitle(variant)}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="min-w-40 px-2 py-2 text-left font-semibold">{colTitle}</th>
              <th className="w-32 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_LINK_TABLE_HEADERS.type}
              </th>
              <th className="min-w-48 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_LINK_TABLE_HEADERS.access}
              </th>
              <th scope="col" className="w-[4.25rem] px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.title}
                    onChange={e => patchRow(references, variant, row.id, { title: e.target.value }, patchMopReferences)}
                    className="w-full text-sm"
                    aria-label={`${colTitle} title`}
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.type}
                    onChange={e => patchRow(references, variant, row.id, { type: e.target.value }, patchMopReferences)}
                    className="w-full text-sm"
                    aria-label="Type"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <MopSection11AccessColumn
                    rowId={row.id}
                    groupLabel={colTitle}
                    linkUrl={row.linkUrl}
                    internalAccess=""
                    onLinkUrlChange={v =>
                      patchRow(references, variant, row.id, { linkUrl: v, internalAccess: '' }, patchMopReferences)}
                    onInternalAccessChange={v => patchRow(references, variant, row.id, { internalAccess: v }, patchMopReferences)}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup={
                      variant === 'equipment'
                        ? 'Equipment documentation row controls'
                        : 'Additional resources row controls'
                    }
                    rowCount={rows.length}
                    onAddBelow={() =>
                      setLinkRows(
                        variant,
                        insertRowAfterId(rows, row.id, newMopReferenceLinkRow()),
                        patchMopReferences,
                      )}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (!next) {
                        return;
                      }
                      setLinkRows(variant, next, patchMopReferences);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
