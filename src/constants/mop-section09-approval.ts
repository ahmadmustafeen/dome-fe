import type { MopApprovalReviewRow, MOPSection09MopApproval } from '@/types/mop';
import { newMopRowId } from '@/utils/mopRowId';

export const MOP_SECTION_09_SUBHEADING = 'Section 09: MOP Approval';

export const MOP_SECTION_09_TABLE_HEADERS = {
  date: 'Date',
  reviewStage: 'Review Stage',
  reviewersName: 'Reviewer\'s Name',
  reviewersTitle: 'Reviewer\'s Title',
} as const;

export const MOP_SECTION_09_REVIEW_STAGES: readonly string[] = [
  'Tested for clarity:',
  'Technical review:',
  'Chief Engineer approval:',
  'Customer approval:',
];

export const MOP_SECTION_09_PLACEHOLDERS = {
  date: 'MM/DD/YYYY',
  name: 'Print Name',
  title: 'Title',
} as const;

export const MOP_SECTION_09_APPROVAL_REQUIREMENTS_HEADING = 'Approval Requirements:';

export const MOP_SECTION_09_APPROVAL_REQUIREMENT_BULLETS: readonly string[] = [
  'All stages must be completed in sequence',
  'Technical review must verify all equipment specifications and procedures',
  'Chief Engineer must approve risk assessment and mitigation strategies',
  'Customer approval required before work commencement',
];

export const MOP_SECTION_09_MOP_EFFECTIVE_DATE_LABEL = 'MOP Effective Date:';

export const MOP_SECTION_09_MOP_EXPIRATION_DATE_LABEL = 'MOP Expiration Date:';

/** Blank approval row for user-added stages (full row from JSON / manual entry). */
export const newApprovalReviewRow = (): MopApprovalReviewRow => ({
  id: newMopRowId('ma'),
  reviewStage: '',
  reviewersName: '',
  reviewersTitle: '',
  date: '',
});

const ensureReviewRow = (r: MopApprovalReviewRow, index: number): MopApprovalReviewRow => {
  const stage = MOP_SECTION_09_REVIEW_STAGES[index];
  let reviewStage = r.reviewStage;
  if (!reviewStage || reviewStage.length === 0) {
    reviewStage = stage !== undefined && stage.length > 0 ? stage : `Review ${index + 1}`;
  }
  return {
    ...r,
    id: r.id && r.id.length > 0 ? r.id : newMopRowId('ma'),
    reviewStage,
  };
};

export const buildDefaultMopApproval = (): MOPSection09MopApproval => ({
  reviewRows: MOP_SECTION_09_REVIEW_STAGES.map(reviewStage => ({
    id: newMopRowId('ma'),
    reviewStage,
    reviewersName: '',
    reviewersTitle: '',
    date: '',
  })),
  mopEffectiveDate: '',
  mopExpirationDate: '',
});

export const resolveMopApproval = (section: MOPSection09MopApproval | undefined): MOPSection09MopApproval => {
  const defaults = buildDefaultMopApproval();
  if (!section) {
    return defaults;
  }
  const rows = section.reviewRows;
  if (!rows || rows.length === 0) {
    return {
      ...defaults,
      mopEffectiveDate: section.mopEffectiveDate ?? '',
      mopExpirationDate: section.mopExpirationDate ?? '',
    };
  }
  return {
    reviewRows: rows?.map((r, i) => ensureReviewRow(r, i)),
    mopEffectiveDate: section.mopEffectiveDate ?? '',
    mopExpirationDate: section.mopExpirationDate ?? '',
  };
};
