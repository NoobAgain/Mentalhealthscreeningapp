import React, { useState } from 'react';
import { Check, X, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  explanation: string;
  onAnswer: (answer: boolean) => void;
  showAiraComment?: boolean;
  airaComment?: string;
}

export function QuestionCard({
  question,
  explanation,
  onAnswer,
  showAiraComment = false,
  airaComment = '',
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="mb-6">
      {/* Question Card */}
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Question Content */}
            <div className="flex-1">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full text-left group"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-gray-800 pr-4">{question}</p>
                  <div className="flex items-center gap-2 text-green-600 shrink-0">
                    <Info className="w-5 h-5" />
                    {showExplanation ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Explanation (collapsible) */}
              {showExplanation && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700">{explanation}</p>
                </div>
              )}
            </div>

            {/* Answer Buttons */}
            <div className="flex flex-col gap-3 shrink-0">
              {/* Yes Button */}
              <button
                onClick={() => onAnswer(true)}
                className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                aria-label="Ya"
              >
                <Check className="w-8 h-8" />
              </button>

              {/* No Button */}
              <button
                onClick={() => onAnswer(false)}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                aria-label="Tidak"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AIRA Comment Bar */}
      {showAiraComment && airaComment && (
        <div className="mt-3 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-sm">
              AI
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{airaComment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
