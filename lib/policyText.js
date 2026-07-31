// Single source of truth for the InHype Sanctuary Membership Policy & Informed
// Consent. Imported by both the checkout form (pages/index.js) — which shows
// the customer a short agreement line plus a link to read this full document —
// and the checkout API route (pages/api/nmi-checkout.js), which stores the full
// text as the durable proof-of-agreement record. Because both sides import from
// this one file, what the customer saw and what's recorded as agreed-to can
// never drift apart.
//
// IMPORTANT: bump POLICY_VERSION (use today's date) any time the wording below
// changes. The version is stored with every purchase, so we always know exactly
// which policy text a given member agreed to, even if it's edited later.
//
// NOTE: This document is a working template, not a substitute for review by a
// California-licensed healthcare/business attorney. Because it governs medical
// treatment (GLP-1/GIP therapy, investigational peptides) and a recurring
// billing membership, it should be reviewed before being treated as final.

export const POLICY_VERSION = '2026-07-31-v2';

// Short line shown directly on the checkout page next to the checkbox.
export const AGREEMENT_LABEL =
  'I have read and agree to the Membership Policy & Informed Consent, including the 6-month membership term and monthly recurring billing until cancelled per policy.';

// Text of the link on the checkout page that opens the full document.
export const AGREEMENT_LINK_TEXT = 'Read the full Membership Policy & Informed Consent';

export const POLICY_TITLE = 'InHype Sanctuary — Membership Policy & Informed Consent';

// Full, detailed policy. Rendered as the expandable document on the checkout
// page, and flattened to plain text (see policyPlainText below) for the
// durable proof-of-agreement record.
export const POLICY_SECTIONS = [
  {
    heading: '1. Introduction & Acceptance',
    blocks: [
      { type: 'p', text: 'This Membership Policy & Informed Consent ("Agreement") governs your enrollment in an InHype Sanctuary membership plan (Sanctuary Core, Sanctuary Plus, or Sanctuary Elite), including any GLP-1/GIP/GLP-2 receptor agonist therapy, body contouring services, NAD+ therapy, and related services provided under physician supervision. By checking the agreement box and completing your purchase, you acknowledge that you have read, understood, and agreed to every section of this Agreement, and you consent electronically to be bound by it to the same extent as if you had signed a paper copy.' },
      { type: 'p', text: 'This Agreement is entered into between you ("Member," "you," or "your") and InHype Sanctuary, a medical spa located in Glendale, California ("InHype Sanctuary," "we," "us," or "our"). If any term of this Agreement conflicts with a separate consent form you sign in person at your consultation or appointment, the more recently signed or more protective term controls, and both remain part of your complete medical and membership record.' },
    ],
  },
  {
    heading: '2. Description of Membership & Services',
    blocks: [
      { type: 'p', text: 'InHype Sanctuary memberships combine physician-supervised GLP-1/GIP/GLP-2 receptor agonist therapy with complementary services that vary by plan tier, which may include LPG Endermologie body contouring, NAD+ cellular renewal injections, bloodwork, and priority booking. The specific inclusions, dosing approach, and service frequency for your selected plan are described on the plan page you reviewed before checkout, and are incorporated into this Agreement by reference.' },
      { type: 'list', items: [
        'Sanctuary Core: weekly Tirzepatide (GLP-1/GIP) injections, titrated by a supervising physician.',
        'Sanctuary Plus: weekly Tirzepatide or Retatrutide injections at any therapeutic dose, plus monthly LPG Endermologie body contouring.',
        'Sanctuary Elite: weekly Tirzepatide or Retatrutide injections at any therapeutic dose, weekly LPG Endermologie sessions, monthly NAD+ injections, and biannual comprehensive bloodwork.',
      ]},
      { type: 'p', text: 'All medications are prescribed and dosed at the sole discretion of the supervising physician based on your individual health profile, bloodwork, and clinical response. Plan descriptions reflect the standard protocol for that tier; your actual dose, frequency, or medication may be adjusted, paused, or changed by the physician at any time for medical reasons, and doing so does not entitle you to a refund or reduced billing.' },
    ],
  },
  {
    heading: '3. Eligibility, Medical Assessment & Physician Oversight',
    blocks: [
      { type: 'p', text: 'Membership is available to individuals 18 years of age or older who complete an initial medical consultation and any bloodwork or health screening the supervising physician requires before treatment begins. You represent that all health information you provide, verbally, in writing, or through any intake form, is accurate and complete to the best of your knowledge, and you agree to promptly disclose any change in your health status, medications, or pregnancy status throughout your membership.' },
      { type: 'p', text: 'A licensed physician reviews your health history and bloodwork, determines whether GLP therapy and any other membership service is medically appropriate for you, and retains sole clinical authority over your treatment plan. The physician may decline to initiate or may discontinue treatment at any time if, in their professional judgment, treatment is not medically appropriate, is unsafe, or if you have not provided information the physician needs to treat you safely. Membership fees already billed are not refunded solely because the physician declines or discontinues treatment on medical grounds; see Section 10 (Refund Policy).' },
    ],
  },
  {
    heading: '4. Investigational & Compounded Medication Disclosure',
    blocks: [
      { type: 'p', text: 'Some medications offered under this membership, including Retatrutide, are not approved by the U.S. Food and Drug Administration (FDA) for any indication as of the date of this Agreement. Where offered, these medications are provided pursuant to a valid, patient-specific prescription issued by your supervising physician exercising independent professional medical judgment, and are obtained through a licensed pharmacy in accordance with applicable compounding and pharmacy regulations.' },
      { type: 'p', text: 'You acknowledge and accept that: (a) the safety, efficacy, and long-term effects of investigational or compounded medications have not been established by the FDA to the same standard as an FDA-approved drug; (b) formulation, purity, and potency of compounded medications can vary by batch and by pharmacy, and are not subject to the same pre-market review as FDA-approved products; (c) your physician\'s recommendation to use such a medication reflects their individualized clinical judgment for your case, not a representation that the medication is FDA-approved or risk-free; and (d) you are choosing to proceed with such treatment voluntarily, after having the opportunity to ask questions and, if you wish, decline this option in favor of an FDA-approved alternative such as Tirzepatide.' },
    ],
  },
  {
    heading: '5. Informed Consent to Treatment & Material Risks',
    blocks: [
      { type: 'p', text: 'GLP-1, GIP, and GLP-2 receptor agonist therapies (including Tirzepatide and Retatrutide) are medical treatments with known and potential risks. Before your first injection, your physician will discuss these risks with you and answer your questions; this section summarizes, but does not replace, that in-person consultation.' },
      { type: 'list', items: [
        'Common side effects include nausea, vomiting, diarrhea, constipation, decreased appetite, fatigue, and injection-site reactions.',
        'Less common but serious risks include acute pancreatitis, gallbladder disease (including gallstones), severe gastrointestinal reactions, hypoglycemia (particularly if combined with other blood-sugar-lowering medications), acute kidney injury related to dehydration from GI side effects, and hypersensitivity or allergic reactions.',
        'GLP-1 receptor agonists carry a boxed warning regarding thyroid C-cell tumors observed in rodent studies; the relevance to humans has not been determined, but these medications are contraindicated for individuals with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).',
        'These medications are contraindicated during pregnancy and breastfeeding; you must notify InHype Sanctuary immediately if you become pregnant or are planning to become pregnant, and treatment will be paused.',
        'Rapid or significant weight loss achieved through this therapy can result in loose or lax skin, and in some individuals, temporary hair thinning or shedding (telogen effluvium) unrelated to a defect in the medication itself.',
        'Individual response, side-effect profile, and rate of weight loss vary significantly and cannot be predicted in advance.',
      ]},
      { type: 'p', text: 'You confirm that you have disclosed, or will disclose before treatment begins, any personal or family history of thyroid cancer or MEN 2, any current or planned pregnancy, any history of pancreatitis or gallbladder disease, and all medications and supplements you currently take, so that your physician can assess whether this therapy is appropriate for you.' },
    ],
  },
  {
    heading: '6. No Guarantee of Results',
    blocks: [
      { type: 'p', text: 'Weight loss, body contouring, and cellular-renewal outcomes vary significantly by individual based on factors including starting weight, metabolism, adherence to physician guidance, diet, activity level, and underlying health conditions. InHype Sanctuary does not guarantee any specific amount of weight loss, rate of progress, aesthetic outcome, or resolution of any condition (including loose skin or hair thinning), whether from GLP therapy, LPG Endermologie, NAD+, or any combination of membership services. Marketing materials, testimonials, and average results referenced on our website or in consultations are illustrative only and are not a promise of your individual results.' },
    ],
  },
  {
    heading: '7. Membership Term, Automatic Renewal & Recurring Billing',
    blocks: [
      { type: 'p', text: 'This is a subscription. Your membership begins on the date of your first payment and continues for an initial minimum term of six (6) months (the "Initial Term"), during which your card on file is billed automatically once per month at the plan price you selected, until the Initial Term is complete.' },
      { type: 'p', text: 'At the end of the Initial Term, your membership automatically and continuously renews on a month-to-month basis at the same plan price, and your card on file will continue to be billed automatically each month, until you cancel in accordance with Section 9 (Cancellation Policy) below. This is an automatically renewing subscription as described under California\'s Automatic Renewal Law (California Business & Professions Code §§ 17600 et seq.): it will not stop or reduce in price on its own, it renews indefinitely on a month-to-month basis after the Initial Term, and it is your responsibility to cancel it if you no longer wish to be billed.' },
      { type: 'p', text: 'You may cancel your automatically renewing membership at any time after the Initial Term using the cancellation method described in Section 9, without needing to speak to a retention representative first. We will send you notice of any material change to this automatic-renewal offer as required by applicable law before that change takes effect.' },
    ],
  },
  {
    heading: '8. Billing, Payment Method & Price Changes',
    blocks: [
      { type: 'p', text: 'You authorize InHype Sanctuary and its payment processor to charge the payment method you provide at checkout on a recurring monthly basis, on the same calendar day each month as your original purchase date (adjusted to the last day of the month for months that are shorter), for as long as your membership remains active. You are responsible for keeping your payment method current; if a payment fails, we may retry the charge, and your access to membership services may be paused until payment is successfully collected.' },
      { type: 'p', text: 'InHype Sanctuary may change plan pricing for future billing cycles with at least thirty (30) days\' advance notice to the email address on file. Continuing your membership after a price change takes effect constitutes acceptance of the new price; if you do not agree to a price change, you may cancel in accordance with Section 9 before the change takes effect.' },
    ],
  },
  {
    heading: '9. Cancellation Policy',
    blocks: [
      { type: 'list', items: [
        'During the Initial 6-Month Term: memberships are locked for the initial six-month commitment and cannot be cancelled for convenience during this period. This reflects the medical nature of the program, in which physicians design multi-month treatment protocols, and the discounted plan pricing offered in exchange for the term commitment.',
        'Medical Exception: if your supervising physician determines that you can no longer safely continue treatment for medical reasons, InHype Sanctuary will cancel your membership effective the date of that determination and will not bill you further; this is the sole exception to the Initial Term lock-in.',
        'After the Initial Term: once your membership converts to month-to-month under Section 7, you may cancel at any time by providing at least thirty (30) days\' written notice to inhype.sanctuary@icloud.com or by calling (209) 330-0033 and confirming your cancellation in writing. Your membership and billing will end at the close of the notice period.',
        'Cancellation requests take effect only once acknowledged by InHype Sanctuary in writing; if you do not receive a confirmation within five (5) business days of your request, please follow up to make sure it was received.',
      ]},
    ],
  },
  {
    heading: '10. Refund Policy',
    blocks: [
      { type: 'p', text: 'Membership fees are billed in advance of the service month and are earned upon billing. InHype Sanctuary does not issue refunds for the current billing period once that period has begun or once any service (including a consultation, injection, or bloodwork order) for that period has been rendered, regardless of whether you use every service included in your plan that month.' },
      { type: 'p', text: 'Where required by California law, we will issue a refund or credit for services that were paid for but not rendered due to InHype Sanctuary\'s inability to provide them (for example, facility closure). Outside of that circumstance, and outside of the medical-exception cancellation described in Section 9, all fees are non-refundable.' },
    ],
  },
  {
    heading: '11. Missed Appointments',
    blocks: [
      { type: 'p', text: 'Weekly or monthly appointments included in your plan (injections, LPG Endermologie sessions, NAD+ injections) do not roll over or accumulate if missed; each is available during its designated period only. Repeated missed appointments may affect your physician\'s ability to safely titrate your dose and may result in a pause in treatment until you are able to be seen. Missing an appointment does not reduce or pause your monthly billing.' },
    ],
  },
  {
    heading: '12. Upgrading or Downgrading Your Plan',
    blocks: [
      { type: 'p', text: 'You may upgrade from Sanctuary Core to Sanctuary Plus or Sanctuary Elite, or from Sanctuary Plus to Sanctuary Elite, at any time, with the new plan price prorated for your remaining billing period and applied starting your next billing cycle. Downgrades are not available during the Initial 6-Month Term; after the Initial Term, you may request a downgrade effective at your next billing cycle by contacting us in writing.' },
    ],
  },
  {
    heading: '13. Health Information & Privacy',
    blocks: [
      { type: 'p', text: 'InHype Sanctuary collects and maintains your health information, including intake forms, bloodwork, and treatment records, in connection with providing your care. We use and disclose this information consistent with applicable law and our Notice of Privacy Practices, which is available upon request. We do not sell your health information. Information you provide at checkout (name, contact details, billing address, and IP address) is used to process your payment, deliver membership services, and, as described in Section 15 below, to maintain a record of your consent to this Agreement.' },
    ],
  },
  {
    heading: '14. Electronic Signature & Record of Consent',
    blocks: [
      { type: 'p', text: 'By checking the agreement box at checkout, you are providing your electronic signature to this Agreement under the California Uniform Electronic Transactions Act and the federal ESIGN Act, and you agree that your electronic signature is as legally binding as a handwritten signature. You have the right to request a paper copy of this Agreement at any time by contacting inhype.sanctuary@icloud.com.' },
      { type: 'p', text: 'When you check the agreement box and complete your purchase, InHype Sanctuary records: the exact version and full text of this Agreement in effect at that moment, the date and time of your agreement, and the IP address from which you agreed. This record is retained as InHype Sanctuary\'s proof that you reviewed and accepted these terms, and is kept for as long as reasonably necessary for legal, billing, and medical record-keeping purposes.' },
    ],
  },
  {
    heading: '15. Limitation of Liability & Assumption of Risk',
    blocks: [
      { type: 'p', text: 'You understand and voluntarily accept the risks described in Section 5 and elsewhere in this Agreement as a condition of receiving treatment. To the fullest extent permitted by California law, InHype Sanctuary\'s total liability arising out of your membership is limited to the fees you paid in the six (6) months preceding the event giving rise to the claim. Nothing in this Agreement limits liability for gross negligence, willful misconduct, or any claim that cannot lawfully be limited or waived under California law, including claims arising from professional negligence in the provision of medical care.' },
    ],
  },
  {
    heading: '16. Governing Law & Resolving Disputes',
    blocks: [
      { type: 'p', text: 'This Agreement is governed by the laws of the State of California, without regard to conflict-of-law principles. Before filing any formal claim, you agree to first contact InHype Sanctuary at inhype.sanctuary@icloud.com so that we can attempt to resolve the issue directly. Any claim not resolved informally may be brought in a court of competent jurisdiction located in Los Angeles County, California.' },
    ],
  },
  {
    heading: '17. Changes to This Policy',
    blocks: [
      { type: 'p', text: 'InHype Sanctuary may update this Agreement from time to time. Changes apply prospectively to future billing periods and, where required by law, will be communicated to you in advance. The version of this Agreement you agreed to at checkout, and its full text, is preserved as your proof-of-agreement record described in Section 14, regardless of later edits.' },
    ],
  },
  {
    heading: '18. Contact Information',
    blocks: [
      { type: 'p', text: 'Questions about this Agreement, your membership, or your treatment can be directed to InHype Sanctuary at inhype.sanctuary@icloud.com or (209) 330-0033.' },
    ],
  },
];

// Flattens POLICY_SECTIONS into plain text for the durable proof-of-agreement
// record (used server-side in the staff notification email). Kept in sync with
// POLICY_SECTIONS automatically since it's generated from the same data the
// customer sees on the checkout page.
export function policyPlainText() {
  const lines = [`${POLICY_TITLE} (v${POLICY_VERSION})`, ''];
  POLICY_SECTIONS.forEach(section => {
    lines.push(section.heading);
    section.blocks.forEach(block => {
      if (block.type === 'p') {
        lines.push(block.text);
      } else if (block.type === 'list') {
        block.items.forEach(item => lines.push(`  - ${item}`));
      }
    });
    lines.push('');
  });
  return lines.join('\n');
}
