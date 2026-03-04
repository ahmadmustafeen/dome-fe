"use client";

import { iTableHeader } from "@/constants/data";
import { useState, useRef, useEffect } from "react";

interface iDynamicTable {
  data: { [key: string]: string; id: string }[];
  columns: iTableHeader[];
  setSelectedIds: (ids: Set<string>) => void;
  selectedIds: Set<string>;
}

export default function DynamicTable({ data, columns, selectedIds, setSelectedIds }: iDynamicTable) {
  const [rows] = useState<Record<string, string>[]>(data);
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;
  const toggleAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(rows.map((r) => r.id).filter((id): id is string => id !== undefined)));
  };
  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="min-h-screen text-slate-100">
      <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-xl shadow-black/40">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800">
              <th className="w-10 px-4 py-3 text-left">
                <Checkbox checked={allSelected} indeterminate={selectedIds.size > 0 && !allSelected} onChange={toggleAll} />
              </th>

              {columns.map((col) => (
                <th
                  key={col.id}
                  className="px-4 py-3 text-left text-base font-semibold text-white tracking-wider group"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="transition-colors"
                      title="Double-click to rename"
                    >
                      {col.label}
                    </span>
                  </div>
                </th>
              ))}
              <th className="w-24 px-4 py-3 text-right text-base font-semibold text-white tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-12 text-center text-slate-600">
                  <div className="flex flex-col items-center gap-2">
                    <GridIcon className="w-8 h-8 opacity-30" />
                    <span>No rows yet — click <strong className="text-slate-500">Add Row</strong> to start</span>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-slate-800/60 transition-colors
                    ${row.id && selectedIds.has(row.id) ? "bg-cyan-500/5" : idx % 2 === 0 ? "bg-secondary/20" : "bg-transparent"}
                    hover:bg-slate-800/50
                  `}
                >
                  <td className="px-4 py-2.5">
                    <Checkbox checked={row.id ? selectedIds.has(row.id) : false} onChange={() => toggleRow(row.id!)} />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2.5">
                      <span
                        className="cursor-pointer text-black hover:text-black transition-colors block truncate max-w-50 text-base"
                        title={row[col.key] || "Double-click to edit"}
                      >
                        {row[col.key] || (
                          <span className="text-slate-600 italic">empty</span>
                        )}
                      </span>
                    </td>
                  ))}

                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => { }}
                        className="p-1.5 cursor-pointer rounded text-black hover:text-white hover:bg-cyan-500 transition-colors"
                        title="Edit row"
                      >
                        <EditIcon className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => { }}
                        className="p-1.5 cursor-pointer rounded text-black hover:text-white hover:bg-red-500 transition-colors"
                        title="Delete row"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function TrashIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
function EditIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}
function GridIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M10 3v18M14 3v18" />
    </svg>
  );
}
// Custom Checkbox with indeterminate support
function Checkbox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) (ref.current as HTMLInputElement).indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-6 h-6 rounded border-slate-600 bg-slate-800 text-blue-400 cursor-pointer accent-blue-text-blue-400"
    />
  );
}