import type {
  MopPostMaintenanceBullet,
  MOPSection10MopComments,
} from "@/types/mop";

export const MOP_SECTION_10_SUBHEADING = "Section 10: MOP Comments";

export const MOP_SECTION_10_MOP_COMMENTS_LABEL = "MOP Comments";

export const MOP_SECTION_10_POST_MAINTENANCE_HEADING =
  "Post-Maintenance Requirements:";

export const MOP_SECTION_10_ADDITIONAL_NOTES_LABEL = "Additional Notes:";

/** Default main comment text (one block; portal `section-11-comments` + static list alignment). */
const MOP_SECTION_10_DEFAULT_MOP_COMMENT_LINES: readonly string[] = [
  "Preventive maintenance should be performed annually or every 200 hours of operation, whichever comes first (VERIFY WITH MANUFACTURER MANUAL).",
  "Ensure availability of correct oil, coolant, and filter part numbers per Cummins Operation and Maintenance Manual (REFER TO MANUFACTURER PARTS LIST).",
  "Inspect for coolant leaks at hoses, radiator, and water pump. Check for fuel leaks at connections, fuel pump, and injectors (CONSULT MANUFACTURER SERVICE BULLETINS).",
  "Maintain a detailed maintenance log, including date, time, services performed, parts replaced, and technician signature, in accordance with NFPA 110 requirements.",
  "Consider oil sampling and analysis at each service interval to proactively identify potential engine wear or contamination issues (SITE-SPECIFIC REQUIREMENT).",
  "This MOP is valid for one year from the approval date and must be reviewed/updated if equipment modifications occur.",
  "All test data and readings must be recorded in the equipment log book and uploaded to the CMMS within 48 hours.",
  "Any deviations from this procedure must be documented and approved by the Chief Engineer before proceeding.",
  "Lessons learned from this maintenance should be documented and incorporated into the next revision.",
] as const;

export const MOP_SECTION_10_DEFAULT_MOP_COMMENTS_TEXT =
  MOP_SECTION_10_DEFAULT_MOP_COMMENT_LINES.join("\n\n");

/** Static list seed — aligns with standalone template / portal. */
export const MOP_SECTION_10_POST_MAINTENANCE_BULLETS: readonly string[] = [
  "Complete and submit maintenance report within 24 hours",
  "Update equipment history in CMMS",
  "Schedule follow-up inspection if any issues were identified",
  "Review and update PM schedule based on equipment condition",
] as const;

export const seedDefaultPostMaintenanceBullets =
  (): MopPostMaintenanceBullet[] =>
    MOP_SECTION_10_POST_MAINTENANCE_BULLETS.map((title, i) => ({
      id: `pm-seed-${String(i)}`,
      title,
    }));

const normalizePostMaintenanceBullets = (
  raw: unknown,
): MopPostMaintenanceBullet[] => {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map((item) => {
    if (typeof item === "string") {
      return { id: crypto.randomUUID(), title: item };
    }
    if (item !== null && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const title = typeof o.title === "string" ? o.title : "";
      const idFromId = typeof o.id === "string" ? o.id.trim() : "";
      const idFromIndex = typeof o.index === "string" ? o.index.trim() : "";
      const id =
        idFromId !== ""
          ? idFromId
          : idFromIndex !== ""
            ? idFromIndex
            : crypto.randomUUID();
      return { id, title };
    }
    return { id: crypto.randomUUID(), title: "" };
  });
};

export const buildDefaultMopComments = (): MOPSection10MopComments => ({
  mopCommentsText: MOP_SECTION_10_DEFAULT_MOP_COMMENTS_TEXT,
  additionalNotes: "",
  postMaintenanceBullets: seedDefaultPostMaintenanceBullets(),
});

const isMopSection10MopComments = (v: unknown): v is MOPSection10MopComments => {
  if (v === null || typeof v !== "object") {
    return false;
  }
  const o = v as Record<string, unknown>;
  return (
    typeof o.mopCommentsText === "string" && typeof o.additionalNotes === "string"
  );
};

/** Migrates legacy `{ mopCommentBullets }` if present (no bullets array). */
const normalizeMopCommentsPayload = (
  c: unknown,
): Omit<MOPSection10MopComments, "postMaintenanceBullets"> | undefined => {
  if (c === null || c === undefined || typeof c !== "object") {
    return undefined;
  }
  const o = c as Record<string, unknown>;
  if (isMopSection10MopComments(c)) {
    return {
      mopCommentsText: o.mopCommentsText as string,
      additionalNotes: o.additionalNotes as string,
    };
  }
  const bullets = o.mopCommentBullets;
  if (Array.isArray(bullets) && bullets.every((x) => typeof x === "string")) {
    return {
      mopCommentsText: bullets.join("\n\n"),
      additionalNotes:
        typeof o.additionalNotes === "string" ? o.additionalNotes : "",
    };
  }
  return undefined;
};

export const resolveMopComments = (c: unknown): MOPSection10MopComments => {
  const defaults = buildDefaultMopComments();

  let mopCommentsText = defaults.mopCommentsText;
  let additionalNotes = defaults.additionalNotes;
  let postMaintenanceBullets: MopPostMaintenanceBullet[] =
    seedDefaultPostMaintenanceBullets();

  const normalized = normalizeMopCommentsPayload(c);

  const rawRecord =
    c !== null && typeof c === "object" ? (c as Record<string, unknown>) : undefined;

  if (normalized !== undefined) {
    mopCommentsText =
      normalized.mopCommentsText.trim().length > 0
        ? normalized.mopCommentsText
        : defaults.mopCommentsText;
    additionalNotes =
      normalized.additionalNotes !== undefined && normalized.additionalNotes !== null
        ? normalized.additionalNotes
        : "";
  }

  if (rawRecord !== undefined) {
    if (
      typeof rawRecord.mopCommentsText === "string" &&
      normalized === undefined
    ) {
      mopCommentsText =
        rawRecord.mopCommentsText.trim().length > 0
          ? rawRecord.mopCommentsText
          : defaults.mopCommentsText;
    }
    if (normalized === undefined && typeof rawRecord.additionalNotes === "string") {
      additionalNotes = rawRecord.additionalNotes;
    }
    const rawBullets = rawRecord.postMaintenanceBullets;
    if (rawBullets !== undefined) {
      const parsed = normalizePostMaintenanceBullets(rawBullets);
      postMaintenanceBullets =
        parsed.length > 0 ? parsed : seedDefaultPostMaintenanceBullets();
    }
  }

  return { mopCommentsText, additionalNotes, postMaintenanceBullets };
};
