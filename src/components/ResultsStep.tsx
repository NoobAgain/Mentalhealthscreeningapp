import React from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface ResultsStepProps {
  score: number;
}

export function ResultsStep({ score }: ResultsStepProps) {
  const getResult = () => {
    if (score <= 5) {
      return {
        level: "Rendah",
        color: "green",
        icon: CheckCircle,
        message:
          "Hasil skrining menunjukkan tingkat risiko rendah.",
        recommendation:
          "Terus jaga kesehatan mental Anda dengan pola hidup sehat, olahraga teratur, dan istirahat cukup.",
      };
    } else if (score <= 10) {
      return {
        level: "Sedang",
        color: "yellow",
        icon: Info,
        message:
          "Hasil skrining menunjukkan tingkat risiko sedang.",
        recommendation:
          "Disarankan untuk berkonsultasi dengan profesional kesehatan mental. Jaga pola hidup sehat dan cari dukungan dari keluarga atau teman.",
      };
    } else {
      return {
        level: "Tinggi",
        color: "red",
        icon: AlertCircle,
        message:
          "Hasil skrining menunjukkan tingkat risiko tinggi.",
        recommendation:
          "Sangat disarankan untuk segera berkonsultasi dengan profesional kesehatan mental. Hubungi layanan kesehatan JKN terdekat.",
      };
    }
  };

  const result = getResult();
  const Icon = result.icon;

  return (
    <div>
      <h2 className="text-indigo-900 mb-2">
        Langkah 4: Hasil Skrining
      </h2>
      <p className="text-gray-600 mb-6">
        Berikut adalah hasil skrining kesehatan mental Anda.
      </p>

      <div
        className={`p-8 rounded-lg mb-6 ${
          result.color === "green"
            ? "bg-green-50 border-2 border-green-200"
            : result.color === "yellow"
              ? "bg-yellow-50 border-2 border-yellow-200"
              : "bg-red-50 border-2 border-red-200"
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <Icon
            className={`w-12 h-12 ${
              result.color === "green"
                ? "text-green-600"
                : result.color === "yellow"
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          />
          <div>
            <h3
              className={
                result.color === "green"
                  ? "text-green-900"
                  : result.color === "yellow"
                    ? "text-yellow-900"
                    : "text-red-900"
              }
            >
              Tingkat Risiko: {result.level}
            </h3>
            <p className="text-gray-700 text-sm">
              Skor: {score}/6
            </p>
          </div>
        </div>
        <p className="text-gray-800 mb-3">{result.message}</p>
        <p className="text-gray-700">{result.recommendation}</p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
        <h4 className="text-blue-900 mb-2">
          Informasi Penting
        </h4>
        <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
          <li>
            Hasil skrining ini bersifat indikatif dan bukan
            diagnosis medis
          </li>
          <li>
            Konsultasi dengan profesional kesehatan tetap
            diperlukan untuk diagnosis akurat
          </li>
          <li>
            Layanan kesehatan mental JKN tersedia di fasilitas
            kesehatan terdekat
          </li>
          <li>Hotline darurat kesehatan mental: 119 ext. 8</li>
        </ul>
      </div>
    </div>
  );
}