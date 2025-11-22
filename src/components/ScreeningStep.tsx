import React, { useState, useEffect } from 'react';
import { QuestionCard } from './QuestionCard';

interface ScreeningStepProps {
  answers: { [key: string]: boolean };
  onAnswer: (questionId: string, value: boolean) => void;
  userData: {
    gender: string | null;
    age: string;
    region: string;
  };
}

const getQuestions = (userData: { gender: string | null; age: string; region: string }) => {
  const ageNum = parseInt(userData.age) || 25;
  const genderText = userData.gender === 'male' ? 'Bapak' : 'Ibu';
  const region = userData.region || 'daerah Anda';

  return [
    {
      id: 'q1',
      question: 'Apakah Anda sering merasa sakit kepala?',
      explanation: `${genderText}, sakit kepala bisa menjadi manifestasi dari stres atau kecemasan. Di usia ${ageNum} tahun, penting untuk mengenali apakah sakit kepala yang ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} alami berhubungan dengan kondisi mental atau fisik.`,
    },
    {
      id: 'q2',
      question: 'Apakah Anda kehilangan nafsu makan?',
      explanation: `Perubahan nafsu makan, ${genderText}, sering kali merupakan indikator awal dari masalah kesehatan mental. Untuk seseorang di ${region}, menjaga pola makan yang sehat sangat penting untuk kesejahteraan.`,
    },
    {
      id: 'q3',
      question: 'Apakah tidur Anda tidak nyenyak?',
      explanation: `${genderText}, kualitas tidur sangat mempengaruhi kesehatan mental dan fisik. Di usia ${ageNum} tahun, tidur yang berkualitas adalah kunci untuk produktivitas dan kesejahteraan sehari-hari.`,
    },
    {
      id: 'q4',
      question: 'Apakah Anda mudah merasa takut?',
      explanation: `Rasa takut yang berlebihan, ${genderText}, bisa menjadi tanda dari gangguan kecemasan. Penting bagi kami untuk memahami apakah ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} mengalami ketakutan yang mengganggu aktivitas sehari-hari.`,
    },
    {
      id: 'q5',
      question: 'Apakah Anda merasa cemas, tegang, atau khawatir?',
      explanation: `${genderText} dari ${region}, kecemasan dan ketegangan adalah respons alami terhadap stres. Namun jika berlebihan, hal ini perlu mendapat perhatian khusus untuk kesehatan mental ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}.`,
    },
    {
      id: 'q6',
      question: 'Apakah tangan Anda gemetar?',
      explanation: `Gemetar bisa menjadi gejala fisik dari kecemasan atau stres, ${genderText}. Di usia ${ageNum} tahun, penting untuk mengetahui apakah ini terkait dengan kondisi mental atau faktor lain.`,
    },
    {
      id: 'q7',
      question: 'Apakah Anda mengalami gangguan pencernaan?',
      explanation: `${genderText}, sistem pencernaan sangat terpengaruh oleh kondisi mental. Gangguan pencernaan yang berulang bisa menjadi sinyal dari stres atau kecemasan yang ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} alami.`,
    },
    {
      id: 'q8',
      question: 'Apakah Anda merasa sulit berpikir jernih?',
      explanation: `Kesulitan berpikir jernih, ${genderText}, bisa sangat mempengaruhi pekerjaan dan kehidupan sehari-hari. Untuk seseorang di ${region}, kemampuan kognitif yang baik sangat penting.`,
    },
    {
      id: 'q9',
      question: 'Apakah Anda merasa tidak bahagia?',
      explanation: `${genderText}, perasaan tidak bahagia yang berkepanjangan bisa menjadi tanda depresi. Di usia ${ageNum} tahun, kebahagiaan dan kepuasan hidup sangat penting untuk kesejahteraan mental.`,
    },
    {
      id: 'q10',
      question: 'Apakah Anda lebih sering menangis?',
      explanation: `Menangis lebih sering dari biasanya, ${genderText}, bisa menunjukkan ketidakstabilan emosi yang perlu diperhatikan. Ini adalah informasi penting untuk penilaian kesehatan mental ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}.`,
    },
    {
      id: 'q11',
      question: 'Apakah Anda merasa sulit untuk menikmati aktivitas sehari-hari?',
      explanation: `${genderText} dari ${region}, anhedonia atau hilangnya kemampuan menikmati aktivitas adalah gejala penting dari depresi. Hal ini bisa sangat mempengaruhi kualitas hidup ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}.`,
    },
    {
      id: 'q12',
      question: 'Apakah Anda mengalami kesulitan untuk mengambil keputusan?',
      explanation: `Kesulitan mengambil keputusan, ${genderText}, bisa menjadi dampak dari kecemasan atau depresi. Di usia ${ageNum} tahun, kemampuan membuat keputusan yang baik sangat penting.`,
    },
    {
      id: 'q13',
      question: 'Apakah aktivitas/tugas sehari-hari Anda terbengkalai?',
      explanation: `${genderText}, ketika tugas sehari-hari terbengkalai, ini bisa menjadi indikator bahwa kesehatan mental ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} memerlukan perhatian lebih.`,
    },
    {
      id: 'q14',
      question: 'Apakah Anda merasa tidak mampu berperan dalam kehidupan ini?',
      explanation: `Perasaan tidak mampu menjalankan peran, ${genderText}, adalah gejala serius yang perlu diperhatikan. Untuk seseorang di ${region}, merasa berdaya adalah hal yang sangat penting.`,
    },
    {
      id: 'q15',
      question: 'Apakah Anda kehilangan minat terhadap banyak hal?',
      explanation: `${genderText} di usia ${ageNum} tahun, kehilangan minat yang luas bisa menjadi tanda depresi mayor. Informasi ini sangat penting untuk penilaian kondisi ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}.`,
    },
    {
      id: 'q16',
      question: 'Apakah Anda merasa tidak berharga?',
      explanation: `Perasaan tidak berharga, ${genderText}, adalah gejala depresi yang serius. Penting bagi ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} untuk mengetahui bahwa setiap orang memiliki nilai dan pentingnya mencari bantuan.`,
    },
    {
      id: 'q17',
      question: 'Apakah Anda mempunyai pikiran untuk mengakhiri hidup Anda?',
      explanation: `${genderText}, pertanyaan ini sangat penting dan sensitif. Pikiran untuk mengakhiri hidup adalah tanda darurat yang memerlukan bantuan segera. Kami di sini untuk membantu ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}.`,
    },
    {
      id: 'q18',
      question: 'Apakah Anda merasa lelah sepanjang waktu?',
      explanation: `Kelelahan kronis, ${genderText}, bisa disebabkan oleh depresi atau kecemasan. Di ${region}, penting untuk membedakan antara kelelahan fisik dan mental.`,
    },
    {
      id: 'q19',
      question: 'Apakah Anda merasa tidak enak di perut?',
      explanation: `${genderText}, keluhan perut yang tidak enak bisa berhubungan dengan kondisi mental seperti kecemasan. Sistem pencernaan dan mental sangat terkait erat.`,
    },
    {
      id: 'q20',
      question: 'Apakah Anda mudah lelah?',
      explanation: `Mudah lelah, ${genderText} di usia ${ageNum} tahun, bisa menjadi tanda dari depresi atau kelelahan mental. Ini penting untuk evaluasi kesehatan mental ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} secara menyeluruh.`,
    },
  ];
};

const getAiraComment = (
  questionId: string,
  answer: boolean,
  userData: { gender: string | null; age: string; region: string }
) => {
  const name = userData.gender === 'male' ? 'Bapak' : 'Ibu';
  
  const comments: { [key: string]: { yes: string; no: string } } = {
    q1: {
      yes: `Terima kasih sudah jujur, ${name}. Sakit kepala yang sering bisa melelahkan. Mari kita lanjutkan untuk gambaran yang lebih lengkap.`,
      no: `Bagus, ${name}! Tidak ada sakit kepala berulang adalah kabar baik. Yuk lanjut ke pertanyaan berikutnya.`,
    },
    q2: {
      yes: `Saya catat ya ${name}. Perubahan nafsu makan memang bisa menjadi indikator penting. Terima kasih atas kejujurannya.`,
      no: `Senang dengar nafsu makan ${name} baik-baik saja! Mari kita teruskan.`,
    },
    q3: {
      yes: `${name}, tidur yang tidak nyenyak pasti sangat mengganggu. Saya memahami dan ini akan membantu penilaian kita.`,
      no: `Tidur nyenyak adalah modal penting, ${name}! Pertahankan ya. Lanjut ke pertanyaan selanjutnya.`,
    },
    q4: {
      yes: `Saya memahami ${name}. Rasa takut yang berlebihan bisa sangat membatasi. Terima kasih sudah berbagi.`,
      no: `${name} terdengar cukup tenang menghadapi situasi. Itu bagus! Mari lanjutkan.`,
    },
    q5: {
      yes: `${name}, kecemasan dan ketegangan memang bisa sangat membebani. Informasi ini penting untuk rekomendasi nanti.`,
      no: `Wah, ${name} terlihat cukup tenang! Kondisi mental yang stabil itu penting. Yuk lanjut.`,
    },
    q6: {
      yes: `Terima kasih ${name}. Gemetar bisa menjadi respon fisik dari kecemasan. Mari kita lanjut untuk penilaian lebih lengkap.`,
      no: `Baik ${name}, tidak ada gemetar adalah tanda yang baik. Lanjut ke pertanyaan berikutnya ya.`,
    },
    q7: {
      yes: `${name}, gangguan pencernaan memang bisa terkait dengan kondisi mental. Saya catat informasi ini.`,
      no: `Pencernaan yang sehat itu penting, ${name}! Senang mendengarnya. Mari lanjut.`,
    },
    q8: {
      yes: `Saya paham ${name}. Kesulitan berpikir jernih pasti membuat frustasi. Terima kasih sudah jujur.`,
      no: `Kemampuan berpikir jernih yang baik, ${name}! Itu modal penting. Yuk lanjutkan.`,
    },
    q9: {
      yes: `${name}, merasa tidak bahagia adalah hal yang penting untuk diperhatikan. Saya di sini untuk membantu.`,
      no: `Senang ${name} merasa bahagia! Kebahagiaan adalah kunci kesehatan mental. Mari lanjut.`,
    },
    q10: {
      yes: `Terima kasih atas keterbukaan ${name}. Emosi yang labil perlu diperhatikan. Mari kita lanjutkan.`,
      no: `${name} terlihat stabil secara emosional. Itu bagus! Lanjut ke pertanyaan selanjutnya.`,
    },
    q11: {
      yes: `${name}, kehilangan kemampuan menikmati aktivitas adalah hal serius. Saya memahami kondisi ini.`,
      no: `Masih bisa menikmati aktivitas itu penting, ${name}! Pertahankan ya. Yuk lanjut.`,
    },
    q12: {
      yes: `Kesulitan mengambil keputusan bisa sangat menghambat, ${name}. Terima kasih sudah berbagi.`,
      no: `${name} masih bisa membuat keputusan dengan baik. Kemampuan yang penting! Mari lanjutkan.`,
    },
    q13: {
      yes: `${name}, tugas yang terbengkalai bisa menjadi beban tambahan. Saya catat ini untuk rekomendasi nanti.`,
      no: `${name} masih bisa menjalankan tugas dengan baik! Itu pertanda positif. Yuk lanjut.`,
    },
    q14: {
      yes: `${name}, perasaan tidak mampu itu sangat berat. Tapi ingat, mencari bantuan adalah langkah berani. Lanjut ya.`,
      no: `${name} masih merasa mampu berperan. Itu kekuatan yang luar biasa! Mari lanjutkan.`,
    },
    q15: {
      yes: `Kehilangan minat yang luas itu serius, ${name}. Terima kasih atas kepercayaan ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} untuk berbagi.`,
      no: `${name} masih memiliki minat pada banyak hal! Itu sangat baik. Yuk lanjut.`,
    },
    q16: {
      yes: `${name}, ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} sangat berharga. Perasaan ini perlu kita tangani bersama. Mari lanjutkan penilaian.`,
      no: `${name} menghargai diri sendiri dengan baik! Self-worth yang baik sangat penting. Lanjut ya.`,
    },
    q17: {
      yes: `${name}, terima kasih atas keberanian ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} berbagi hal ini. Ini sangat serius dan akan menjadi prioritas dalam rekomendasi. Mari selesaikan penilaian ini.`,
      no: `${name}, senang mendengarnya. Mari kita lanjutkan untuk penilaian yang lengkap.`,
    },
    q18: {
      yes: `Lelah sepanjang waktu pasti sangat melelahkan ya ${name}. Saya catat untuk rekomendasi terbaik.`,
      no: `Energi yang cukup itu penting, ${name}! Bagus sekali. Yuk lanjut.`,
    },
    q19: {
      yes: `${name}, ketidaknyamanan perut bisa terkait dengan kondisi mental. Terima kasih atas informasinya.`,
      no: `Perut yang nyaman itu baik, ${name}! Lanjut ke pertanyaan terakhir ya.`,
    },
    q20: {
      yes: `${name}, mudah lelah memang bisa mengganggu aktivitas. Terima kasih sudah menyelesaikan semua pertanyaan!`,
      no: `Stamina yang baik, ${name}! Terima kasih sudah menyelesaikan skrining ini dengan jujur.`,
    },
  };

  return comments[questionId]?.[answer ? 'yes' : 'no'] || 'Terima kasih atas jawabannya!';
};

export function ScreeningStep({ answers, onAnswer, userData }: ScreeningStepProps) {
  const questions = getQuestions(userData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lastAnswer, setLastAnswer] = useState<{ id: string; value: boolean } | null>(null);
  const [airaComment, setAiraComment] = useState<string>('');

  useEffect(() => {
    // Find the first unanswered question
    const unansweredIndex = questions.findIndex(q => answers[q.id] === undefined);
    if (unansweredIndex !== -1) {
      setCurrentQuestionIndex(unansweredIndex);
    }
  }, []);

  const handleAnswer = (questionId: string, value: boolean) => {
    onAnswer(questionId, value);
    setLastAnswer({ id: questionId, value });
    
    // Generate AIRA comment
    const comment = getAiraComment(questionId, value, userData);
    setAiraComment(comment);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setAiraComment('');
      }
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <div>
      <h2 className="text-green-700 mb-2">Skrining Kesehatan Mental dengan AIRA</h2>
      <p className="text-gray-600 mb-6">
        Jawab pertanyaan dengan jujur. Klik ikon info untuk penjelasan lebih detail.
      </p>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      {!allAnswered && currentQuestion && (
        <QuestionCard
          question={currentQuestion.question}
          explanation={currentQuestion.explanation}
          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
          showAiraComment={lastAnswer?.id === currentQuestion.id}
          airaComment={airaComment}
        />
      )}

      {/* All Questions Answered */}
      {allAnswered && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-gray-800 mb-2">Skrining Selesai!</h3>
          <p className="text-gray-600">Klik "Lanjut" untuk melihat hasil dan rekomendasi dari AIRA.</p>
        </div>
      )}
    </div>
  );
}