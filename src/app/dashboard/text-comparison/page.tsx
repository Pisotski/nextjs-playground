"use client";

import { handleTextComparison } from "@/app/actions";
import { useState } from "react";
import Button from "@/ui/common/Button";
import clsx from "clsx";

export default function Page() {
  const [method, setMethod] = useState<"jaccard" | "cosine" | "llm">("jaccard");
  const [result, setResult] = useState<number | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setReasoning(null);

    try {
      const res = await handleTextComparison(formData, method);

      if (res.success) {
        setResult(res.data);
        if (res.reasoning) setReasoning(res.reasoning);
      } else {
        setError(res.error || "Unknown server error");
      }
    } catch (err: any) {
      setError(err?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const getResultLabel = (value: number) => {
    if (value > 0.7) return { label: "High", color: "text-green-600" };
    if (value >= 0.4) return { label: "Medium", color: "text-yellow-600" };
    return { label: "Low", color: "text-red-600" };
  };

  return (
    <div className="p-4">
      {/* Method selection buttons */}
      <div className="-skew-x-12">
        <div className="flex gap-2 justify-center">
          {["jaccard", "cosine", "llm"].map((m) => (
            <Button
              key={m}
              buttonName={m.toUpperCase()}
              onClick={() => setMethod(m as any)}
              type="button"
              skew="skew-x-12"
              className={clsx("min-w-[200px] h-[50px]")}
              active={method === m}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleCompare(formData);
        }}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="flex gap-4">
          <textarea
            name="textLeft"
            placeholder="Gold Citation"
            className="w-1/2 h-50 p-2 border rounded resize-none bg-gray-200 text-gray-900"
          />
          <textarea
            name="textRight"
            placeholder="AI Citation"
            className="w-1/2 h-50 p-2 border rounded resize-none bg-gray-200 text-gray-900"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            buttonName={isLoading ? "Loading..." : "Compare"}
            className="h-[50px] w-1/2 rounded-md"
            disabled={isLoading}
          />
        </div>
      </form>

      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result !== null &&
        (() => {
          const { label, color } = getResultLabel(result);
          return (
            <div>
              <span>Result: </span>
              <span className={color}>
                {label} ({result.toFixed(2)})
              </span>
            </div>
          );
        })()}
      {reasoning && <div>{reasoning}</div>}
    </div>
  );
}
