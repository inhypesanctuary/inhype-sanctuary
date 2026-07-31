// Single source of truth for the Commitment & Cancellation Policy and Medical
// Disclaimer shown at checkout. Imported by both the checkout form (pages/index.js)
// and the checkout API route (pages/api/nmi-checkout.js), so the version shown to
// the customer and the version recorded as proof of agreement can never drift apart.
//
// IMPORTANT: bump POLICY_VERSION (use today's date) any time the wording below changes.
// The version is stored with every purchase, so we always know exactly which policy
// text a given member agreed to, even if it's edited later.

export const POLICY_VERSION = '2026-07-31';

export const COMMITMENT_ITEMS = [
  'All memberships are locked for the initial 6-month term, no cancellations during this period',
  'After month 6, membership automatically converts to month-to-month',
  'Month-to-month memberships can be cancelled anytime with 30 days written notice',
  'No refunds issued for the current billing month once treatment has begun',
  'Upgrading to a higher plan can be done at any time with no penalty',
];

export const MEDICAL_DISCLAIMER = 'All GLP therapies are medical treatments administered under licensed MD physician supervision. Individual results vary. Protocols are personalized, doses, therapy type, and frequency are adjusted based on your health profile and response. InHype Sanctuary does not guarantee specific outcomes. All members undergo a medical assessment prior to beginning treatment.';

export function policyPlainText() {
  return [
    `Commitment & Cancellation Policy (v${POLICY_VERSION}):`,
    ...COMMITMENT_ITEMS.map((item, i) => `${i + 1}. ${item}`),
    '',
    'Medical Disclaimer:',
    MEDICAL_DISCLAIMER,
  ].join('\n');
}
