import type { EvidenceLevel, HerbSourceSection, SourceType } from "@prisma/client";

/**
 * Human-friendly labels for evidence levels.
 */
export function getEvidenceLevelLabel(value: EvidenceLevel | null | undefined) {
  switch (value) {
    case "TRADITIONAL_USE":
      return "Traditional use documented";
    case "LIMITED_EVIDENCE":
      return "Limited evidence";
    case "EMERGING_EVIDENCE":
      return "Emerging evidence";
    case "MODERATE_EVIDENCE":
      return "Moderate evidence";
    case "STRONG_EVIDENCE":
      return "Strong evidence";
    case "SAFETY_DATA_LIMITED":
      return "Safety data limited";
    default:
      return "Not yet classified";
  }
}

/**
 * Human-friendly labels for source types.
 */
export function getSourceTypeLabel(value: SourceType) {
  switch (value) {
    case "GOVERNMENT_FACT_SHEET":
      return "Government fact sheet";
    case "PEER_REVIEWED_REVIEW":
      return "Peer-reviewed review";
    case "SYSTEMATIC_REVIEW":
      return "Systematic review";
    case "META_ANALYSIS":
      return "Meta-analysis";
    case "CLINICAL_TRIAL":
      return "Clinical trial";
    case "JOURNAL_ARTICLE":
      return "Journal article";
    case "UNIVERSITY_ARTICLE":
      return "University article";
    case "ETHNOBOTANICAL_REFERENCE":
      return "Ethnobotanical reference";
    case "BOOK":
      return "Book";
    case "INSTITUTIONAL_PDF":
      return "Institutional PDF";
    case "ORGANIZATION_PAGE":
      return "Organization page";
    case "OTHER":
    default:
      return "Other";
  }
}

/**
 * Human-friendly labels for herb source sections.
 */
export function getHerbSourceSectionLabel(value: HerbSourceSection) {
  switch (value) {
    case "GENERAL":
      return "General";
    case "OVERVIEW":
      return "Overview";
    case "TRADITIONAL_USE":
      return "Traditional Use";
    case "SCIENCE":
      return "What the Science Says";
    case "SAFETY":
      return "Safety";
    case "PREPARATION":
      return "Preparation";
    case "INTERACTIONS":
      return "Interactions";
    default:
      return "General";
  }
}