import React from 'react';

interface AssessmentStepProps {
  responses: { [key: string]: string };
  onResponse: (questionId: string, value: string) => void;
}

const assessmentQuestions = [
  {
    id: 'a1',
    text: 'Apakah Anda memiliki riwayat masalah kesehatan mental dalam keluarga?',
    options: ['Ya', 'Tidak', 'Tidak Yakin'],
  },
  {
    id: 'a2',
    text: 'Apakah Anda pernah mengalami kejadian traumatis dalam 6 bulan terakhir?',
    options: ['Ya', 'Tidak', 'Tidak Yakin'],
  },
  {
    id: 'a3',
    text: 'Seberapa baik sistem dukungan sosial Anda (keluarga, teman)?',
    options: ['Sangat Baik', 'Baik', 'Cukup', 'Kurang', 'Sangat Kurang'],
  },
];

export function AssessmentStep({ responses, onResponse }: AssessmentStepProps) {
  return (
    <div>
      <h2 className="text-green-700 mb-2">Langkah 3: Penilaian</h2>
      <p className="text-gray-600 mb-6">
        Informasi tambahan untuk penilaian kesehatan mental yang lebih akurat.
      </p>

      <div className="space-y-6">
        {assessmentQuestions.map((question, index) => (
          <div key={question.id} className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-800 mb-4">
              {index + 1}. {question.text}
            </p>
            <div className="flex gap-3 flex-wrap">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => onResponse(question.id, option)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                    responses[question.id] === option
                      ? 'border-green-600 bg-green-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
