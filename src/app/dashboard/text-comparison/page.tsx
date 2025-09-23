"use client";

import { FormEvent, useState } from "react";
import Form from "next/form";
import Button from "@/ui/common/Button";

type method = {
  methodName: string;
  explanation: string;
  api: string;
};
const menu: method[] = [
  {
    methodName: "Jaccard Similarity",
    explanation: "lorem ipsum",
    api: "/api/jaccard-similarity",
  },
  {
    methodName: "Calculate Cosine",
    explanation: "lorem ipsum",
    api: "/api/calculate-cosine",
  },
];

export default function ({ children }: { children: React.ReactNode }) {
  const [currMethod, setCurrMethod] = useState(menu[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const compareTexts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(currMethod.api, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error || "Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong, try again laster");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 space-y-6">
      {/* Menu */}
      <div className="flex flex-wrap justify-center gap-2">
        {menu.map((method: method) => (
          <div
            key={method.methodName}
            className={`p-2 -skew-x-24 ${
              currMethod.methodName === method.methodName
                ? "bg-amber-700"
                : "bg-gray-700"
            }`}
          >
            <div
              className="skew-x-24 cursor-pointer"
              onMouseUp={() => setCurrMethod(method)}
            >
              {method.methodName}
            </div>
          </div>
        ))}
      </div>

      {/* Form: textareas and button */}
      <form
        className="flex flex-col items-center gap-4 w-full max-w-6xl text-black"
        onSubmit={compareTexts}
      >
        {/* Textareas side by side */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Left textarea */}
          <div className="flex-1 flex flex-col">
            <label htmlFor="textLeft" className="mb-1 text-gray-200">
              Gold Citation
            </label>
            <textarea
              autoFocus
              className="bg-gray-300 w-full resize-none outline-amber-700"
              rows={10}
              name="textLeft"
              id="textLeft"
            />
          </div>

          {/* Right textarea */}
          <div className="flex-1 flex flex-col">
            <label htmlFor="textRight" className="mb-1 text-gray-200">
              AI citation
            </label>
            <textarea
              className="bg-gray-300 w-full resize-none outline-amber-700"
              rows={10}
              name="textRight"
              id="textRight"
            />
          </div>
        </div>

        {/* Compare button and similarity result in flex row */}
        <div className="mt-4 flex flex-row justify-between items-center w-full text-gray-200">
          <div className="min-w-[210px]">
            {result !== null ? (
              <div>
                Similarity result:
                <span
                  style={{
                    color:
                      result < 0.3
                        ? "#dc2626"
                        : result < 0.6
                        ? "#f59e42"
                        : "#22c55e",
                    fontWeight: "bold",
                  }}
                >
                  {result < 0.3 ? " Low" : result < 0.6 ? " Medium" : " High"}
                  {` (${result.toFixed(3)})`}
                </span>
                <div className="ml-auto">{`${result}`}</div>
              </div>
            ) : (
              <div style={{ visibility: "hidden" }}>
                Similarity result:
                <span>(0.000)</span>
              </div>
            )}
          </div>
          <Button
            className="ml-auto"
            disabled={isLoading}
            buttonName={isLoading ? "Loading..." : "Compare"}
          />
        </div>
      </form>
    </div>
  );
}
