/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EcosystemPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technicalSpecs: string[];
  impactMetric: string;
  impactLabel: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deploymentUrl: string;
  techStack: string[];
  features: string[];
  metrics: { label: string; value: string };
}

export interface ParseResult {
  merchantName: string;
  transactionDate: string;
  amount: number;
  currency: string;
  itemsParsed: string[];
  category: string;
  taxEstimate: number;
  offlineSafetyIndex: string;
  complianceFlags: string[];
  accountingAuditTrial: string;
}

export interface InquiryForm {
  name: string;
  email: string;
  company: string;
  stakeholderType: "Partnership" | "General Enquiry" | "Complaint" | "Other";
  message: string;
}

export interface InquiryResponse {
  received: boolean;
  executiveSummary: string;
  strategicRoadmap: string[];
  estimatedROI: string;
  partnershipMessage: string;
}
