export type ProcedureFacilityEffectChoice = "yes" | "no" | "na";

export type ProcedureFacilitySystemRow<TKey extends string = string> = {
  key: TKey;
  label: string;
};

export type ProcedureFacilityEffectRow<TKey extends string = string> = {
  systemKey: TKey;
  choice: ProcedureFacilityEffectChoice;
  details: string;
};

export type ProcedureFacilityEffectTableProps<TKey extends string> = {
  systemRows: readonly ProcedureFacilitySystemRow<TKey>[];
  effects: ProcedureFacilityEffectRow<TKey>[];
  namePrefix: string;
  clearDetailsWhenNotYes?: boolean;
  className?: string
  onChange: (rows: ProcedureFacilityEffectRow<TKey>[]) => void;
};
