import React, { useState } from 'react';
import { AlertTriangle, Bot, Stethoscope, Calendar, Phone, FileText, Brain, Sparkles, Activity, Heart, TrendingUp, Download } from 'lucide-react';
import { ChatbotAI } from './ChatbotAI';
import { AiraAvatar } from './AiraAvatar';
import { generatePDFReport } from '../utils/pdfGenerator';

interface ResultsPageProps {
  score: number;
  maxScore: number;
  userData: {
    gender: string | null;
    age: string;
    region: string;
  };
  answers: { [key: string]: boolean };
}

export function ResultsPage({ score, maxScore, userData, answers }: ResultsPageProps) {
  const [showChatbot, setShowChatbot] = useState(false);
  const yesCount = Object.values(answers).filter(a => a === true).length;
  const noCount = Object.values(answers).filter(a => a === false).length;
  const percentage = (yesCount / maxScore) * 100;
  
  const getRiskLevel = () => {
    if (percentage <= 30) return { level: 'Rendah', color: 'green', bgColor: 'bg-green-500' };
    if (percentage <= 60) return { level: 'Sedang', color: 'yellow', bgColor: 'bg-yellow-500' };
    return { level: 'Tinggi', color: 'orange', bgColor: 'bg-orange-500' };
  };

  const getAiraConclusion = () => {
    const name = userData.gender === 'male' ? 'Bapak' : 'Ibu';
    const age = parseInt(userData.age) || 25;
    const region = userData.region || 'daerah Anda';
    
    if (percentage <= 30) {
      return {
        title: `Kabar Baik, ${name}! 🌟`,
        message: `Berdasarkan skrining yang ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} lakukan, kondisi kesehatan mental ${name} saat ini berada dalam kategori yang cukup baik. Dari ${maxScore} pertanyaan, ${name} menjawab "Ya" pada ${yesCount} gejala, yang menunjukkan tingkat gejala yang minimal. Meski demikian, tetap penting untuk menjaga kesehatan mental dengan istirahat cukup, aktivitas fisik teratur, dan menjaga hubungan sosial yang positif. Di usia ${age} tahun dan tinggal di ${region}, menjaga keseimbangan hidup sangat penting untuk kesejahteraan jangka panjang.`,
        recommendation: `Saya, AIRA, merekomendasikan ${name} untuk terus melakukan self-care dan monitoring rutin. Jika di masa depan ada perubahan kondisi, jangan ragu untuk melakukan skrining ulang atau berkonsultasi.`
      };
    } else if (percentage <= 60) {
      return {
        title: `${name}, Mari Kita Perhatikan Bersama 🤝`,
        message: `Hasil skrining menunjukkan bahwa ${name} mengalami beberapa gejala yang perlu diperhatikan. Dari ${maxScore} pertanyaan, ${yesCount} gejala teridentifikasi. Ini bisa jadi pertanda bahwa ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} sedang mengalami stres atau tekanan yang cukup signifikan. Di usia ${age} tahun, banyak tantangan hidup yang bisa mempengaruhi kesehatan mental, mulai dari pekerjaan, keluarga, hingga kondisi sosial di ${region}. Gejala yang ${name} alami layak mendapat perhatian lebih.`,
        recommendation: `Saya sangat merekomendasikan ${name} untuk berbicara dengan profesional kesehatan mental. Konseling atau terapi bisa sangat membantu mengatasi gejala sebelum menjadi lebih serius. ${name} juga bisa mencoba strategi coping seperti mindfulness, olahraga ringan, atau berbagi dengan orang terdekat.`
      };
    } else {
      return {
        title: `${name}, Kesehatan Anda Adalah Prioritas ❤️`,
        message: `Terima kasih sudah percaya pada proses skrining ini, ${name}. Hasil menunjukkan bahwa ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} mengalami cukup banyak gejala yang memerlukan perhatian serius - ${yesCount} dari ${maxScore} gejala teridentifikasi. Ini BUKAN berarti ${name} "lemah" atau "gagal", tapi justru menunjukkan keberanian untuk mengakui dan mencari bantuan. Di usia ${age} tahun dan dengan berbagai tantangan hidup di ${region}, sangat wajar jika kesehatan mental memerlukan dukungan profesional. Yang terpenting adalah ${name} sudah mengambil langkah pertama hari ini.`,
        recommendation: `AIRA sangat menganjurkan ${name} untuk segera berbicara dengan psikolog atau psikiater melalui layanan JKN. Jangan menunda, karena semakin cepat mendapat bantuan, semakin baik prognosisnya. ${name} juga bisa menggunakan chatbot AI kami untuk dukungan awal, tapi konsultasi profesional adalah prioritas utama.`
      };
    }
  };

  const risk = getRiskLevel();
  const conclusion = getAiraConclusion();

  return (
    <div className="space-y-6">
      {/* AIRA Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl backdrop-blur-sm border-2 border-white/30">
            AI
          </div>
          <div>
            <h2 className="text-2xl">Kesimpulan dari AIRA</h2>
            <p className="text-blue-100 text-sm">AI-Powered Mental Health Assistant</p>
          </div>
        </div>
      </div>

      {/* Kotak Skor Besar */}
      <div className={`${risk.bgColor} rounded-2xl p-8 text-white shadow-xl`}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Heart className="w-12 h-12" />
          <div className="text-center">
            <div className="text-6xl mb-2">
              {yesCount} / {maxScore}
            </div>
            <p className="text-xl opacity-90">Gejala Teridentifikasi</p>
          </div>
        </div>
        <div className="text-center pt-4 border-t border-white/30">
          <p className="text-2xl">
            Tingkat Risiko: <span className="uppercase">{risk.level}</span>
          </p>
          <p className="mt-2 text-white/90">
            {percentage.toFixed(0)}% gejala terdeteksi dari total skrining
          </p>
        </div>
      </div>

      {/* AIRA Conclusion */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-8 border-2 border-blue-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shrink-0 text-lg">
            AI
          </div>
          <div className="flex-1">
            <h3 className="text-2xl text-gray-800 mb-4">{conclusion.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {conclusion.message}
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                <div>
                  <p className="text-purple-900 mb-2">💜 Rekomendasi AIRA:</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {conclusion.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-green-700">Gejala Ya</h4>
          </div>
          <p className="text-3xl text-gray-800">{yesCount}</p>
          <p className="text-sm text-gray-600 mt-1">Memerlukan perhatian</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-blue-700">Gejala Tidak</h4>
          </div>
          <p className="text-3xl text-gray-800">{noCount}</p>
          <p className="text-sm text-gray-600 mt-1">Kondisi baik</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-purple-700">Persentase</h4>
          </div>
          <p className="text-3xl text-gray-800">{percentage.toFixed(0)}%</p>
          <p className="text-sm text-gray-600 mt-1">Tingkat gejala</p>
        </div>
      </div>

      {/* Rekomendasi Tindak Lanjut */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-600 p-3 rounded-lg shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-green-700">Pilihan Tindak Lanjut untuk Anda</h3>
        </div>
        
        <p className="text-gray-700 mb-6">
          Berdasarkan hasil skrining, berikut adalah rekomendasi layanan yang bisa {userData.gender === 'male' ? 'Bapak' : 'Ibu'} akses:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Tombol Chatbot AI */}
          <button 
            onClick={() => setShowChatbot(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Bot className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="text-sm opacity-90 mb-1">Opsi 1</div>
                <h4 className="text-lg">Chat dengan AIRA</h4>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-3">
              Dapatkan dukungan emosional dan tips self-care dari AIRA, chatbot AI yang ramah dan siap membantu 24/7.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Tersedia 24/7</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Gratis</span>
            </div>
          </button>

          {/* Tombol Konsultasi Dokter */}
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="text-sm opacity-90 mb-1">Opsi 2</div>
                <h4 className="text-lg">Konsultasi Profesional</h4>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-3">
              Jadwalkan konsultasi dengan psikolog atau psikiater melalui layanan JKN untuk penanganan yang lebih komprehensif.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Profesional</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Ditanggung JKN</span>
            </div>
          </button>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Langkah Selanjutnya */}
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
            <h4 className="text-green-700">Langkah Selanjutnya</h4>
          </div>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Pilih jalur layanan yang sesuai (Chatbot AI atau Konsultasi Dokter)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Siapkan kartu JKN dan dokumen identitas Anda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Catat gejala dan keluhan yang Anda alami</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>Ikuti rekomendasi yang diberikan oleh tenaga kesehatan</span>
            </li>
          </ul>
        </div>

        {/* Hotline Darurat */}
        <div className="bg-red-50 rounded-xl shadow-md p-6 border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-red-600" />
            <h4 className="text-red-900">Hotline Darurat</h4>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Jika Anda mengalami krisis atau pikiran untuk menyakiti diri sendiri, segera hubungi:
          </p>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <p className="text-red-900 text-sm mb-1">JKN Mental Health Hotline</p>
              <p className="text-2xl text-red-600">119 ext. 8</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-red-900 text-sm mb-1">Hotline Nasional (Into The Light)</p>
              <p className="text-2xl text-red-600">1500-454</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4">
            * Layanan tersedia 24 jam sehari, 7 hari seminggu
          </p>
        </div>
      </div>

      {/* Download Hasil */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-center shadow-lg">
        <h4 className="mb-2">Simpan Hasil Skrining Anda</h4>
        <p className="text-green-100 text-sm mb-4">
          Download laporan lengkap untuk dibawa saat konsultasi dengan dokter
        </p>
        <button 
          className="bg-white text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition-all inline-flex items-center gap-2 shadow-md"
          onClick={() => generatePDFReport({
            userData,
            score: yesCount,
            maxScore,
            answers,
            date: new Date()
          })}
        >
          <Download className="w-5 h-5" />
          Download Laporan HTML
        </button>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <ChatbotAI
          onClose={() => setShowChatbot(false)}
          userData={userData}
          score={yesCount}
        />
      )}
    </div>
  );
}