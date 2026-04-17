"use client";

import { NDAFormData } from "@/lib/nda-template";

interface Props {
  data: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && <span className="ml-1 text-xs text-gray-400 font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

const textareaClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none";

export default function NDAForm({ data, onChange }: Props) {
  function set<K extends keyof NDAFormData>(key: K, value: NDAFormData[K]) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className="space-y-6">
      {/* Agreement details */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">
          Agreement Details
        </h2>
        <div className="space-y-4">
          <Field label="Purpose" hint="how Confidential Information may be used">
            <textarea
              className={textareaClass}
              rows={3}
              value={data.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              placeholder="Evaluating whether to enter into a business relationship with the other party."
            />
          </Field>

          <Field label="Effective Date">
            <input
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => set("effectiveDate", e.target.value)}
            />
          </Field>

          <Field label="MNDA Term">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="mndaTermType"
                  value="expires"
                  checked={data.mndaTermType === "expires"}
                  onChange={() => set("mndaTermType", "expires")}
                  className="accent-blue-600"
                />
                Expires after
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                  value={data.mndaTermYears}
                  onChange={(e) => set("mndaTermYears", e.target.value)}
                  disabled={data.mndaTermType !== "expires"}
                />
                year(s) from Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="mndaTermType"
                  value="until_terminated"
                  checked={data.mndaTermType === "until_terminated"}
                  onChange={() => set("mndaTermType", "until_terminated")}
                  className="accent-blue-600"
                />
                Continues until terminated
              </label>
            </div>
          </Field>

          <Field label="Term of Confidentiality" hint="how long Confidential Information is protected">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  value="years"
                  checked={data.confidentialityTermType === "years"}
                  onChange={() => set("confidentialityTermType", "years")}
                  className="accent-blue-600"
                />
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                  value={data.confidentialityTermYears}
                  onChange={(e) => set("confidentialityTermYears", e.target.value)}
                  disabled={data.confidentialityTermType !== "years"}
                />
                year(s) from Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  value="perpetuity"
                  checked={data.confidentialityTermType === "perpetuity"}
                  onChange={() => set("confidentialityTermType", "perpetuity")}
                  className="accent-blue-600"
                />
                In perpetuity
              </label>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Governing Law" hint="state">
              <input
                type="text"
                className={inputClass}
                value={data.governingLaw}
                onChange={(e) => set("governingLaw", e.target.value)}
                placeholder="e.g. Delaware"
              />
            </Field>
            <Field label="Jurisdiction" hint="courts">
              <input
                type="text"
                className={inputClass}
                value={data.jurisdiction}
                onChange={(e) => set("jurisdiction", e.target.value)}
                placeholder="e.g. courts in New Castle, DE"
              />
            </Field>
          </div>

          <Field label="MNDA Modifications" hint="optional">
            <textarea
              className={textareaClass}
              rows={2}
              value={data.modifications}
              onChange={(e) => set("modifications", e.target.value)}
              placeholder="List any modifications to the standard terms, or leave blank."
            />
          </Field>
        </div>
      </section>

      {/* Party 1 */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">
          Party 1
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name">
            <input
              type="text"
              className={inputClass}
              value={data.party1Name}
              onChange={(e) => set("party1Name", e.target.value)}
              placeholder="Jane Smith"
            />
          </Field>
          <Field label="Title">
            <input
              type="text"
              className={inputClass}
              value={data.party1Title}
              onChange={(e) => set("party1Title", e.target.value)}
              placeholder="CEO"
            />
          </Field>
          <Field label="Company">
            <input
              type="text"
              className={inputClass}
              value={data.party1Company}
              onChange={(e) => set("party1Company", e.target.value)}
              placeholder="Acme Inc."
            />
          </Field>
          <Field label="Notice Address" hint="email or postal">
            <input
              type="text"
              className={inputClass}
              value={data.party1Address}
              onChange={(e) => set("party1Address", e.target.value)}
              placeholder="jane@acme.com"
            />
          </Field>
        </div>
      </section>

      {/* Party 2 */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">
          Party 2
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name">
            <input
              type="text"
              className={inputClass}
              value={data.party2Name}
              onChange={(e) => set("party2Name", e.target.value)}
              placeholder="John Doe"
            />
          </Field>
          <Field label="Title">
            <input
              type="text"
              className={inputClass}
              value={data.party2Title}
              onChange={(e) => set("party2Title", e.target.value)}
              placeholder="CTO"
            />
          </Field>
          <Field label="Company">
            <input
              type="text"
              className={inputClass}
              value={data.party2Company}
              onChange={(e) => set("party2Company", e.target.value)}
              placeholder="Widget Corp."
            />
          </Field>
          <Field label="Notice Address" hint="email or postal">
            <input
              type="text"
              className={inputClass}
              value={data.party2Address}
              onChange={(e) => set("party2Address", e.target.value)}
              placeholder="john@widgetcorp.com"
            />
          </Field>
        </div>
      </section>
    </div>
  );
}
