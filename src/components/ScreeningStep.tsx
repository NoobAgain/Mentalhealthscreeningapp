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
      question: 'Apakah Anda sering merasa cemas atau khawatir berlebihan dalam 2 minggu terakhir?',
      explanation: `Halo ${genderText}, pertanyaan ini membantu kami memahami tingkat kecemasan yang mungkin ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} alami. Di ${region}, banyak orang usia ${ageNum} tahun mengalami kecemasan karena berbagai tekanan. Kecemasan berlebihan bisa mempengaruhi kualitas hidup sehari-hari.`,
    },
    {
      id: 'q2',
      question: 'Apakah Anda kehilangan minat atau kesenangan dalam melakukan aktivitas yang biasanya Anda nikmati?',
      explanation: `${genderText}, kehilangan minat pada aktivitas favorit adalah salah satu tanda penting yang perlu kita perhatikan. Untuk seseorang di usia ${ageNum} tahun seperti ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}, hal ini bisa sangat mempengaruhi kesejahteraan mental.`,
    },
    {
      id: 'q3',
      question: 'Apakah Anda mengalami kesulitan tidur, seperti sulit tertidur, sering terbangun, atau tidur terlalu banyak?',
      explanation: `Masalah tidur sangat umum terjadi, ${genderText}. Di usia ${ageNum} tahun, pola tidur yang sehat sangat penting untuk kesehatan mental dan fisik. Gangguan tidur bisa menjadi indikator atau pemicu masalah kesehatan mental.`,
    },
    {
      id: 'q4',
      question: 'Apakah Anda merasa lelah atau kekurangan energi hampir setiap hari?',
      explanation: `${genderText} dari ${region}, kelelahan kronis bisa disebabkan oleh berbagai faktor termasuk stres dan kondisi mental. Penting bagi kami untuk mengetahui kondisi energi ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} sehari-hari.`,
    },
    {
      id: 'q5',
      question: 'Apakah Anda mengalami perubahan nafsu makan yang signifikan (makan terlalu banyak atau terlalu sedikit)?',
      explanation: `Perubahan pola makan bisa mencerminkan kondisi emosional ${userData.gender === 'male' ? 'Bapak' : 'Ibu'}. Di usia ${ageNum} tahun, penting untuk menjaga pola makan yang sehat untuk kesehatan mental dan fisik.`,
    },
    {
      id: 'q6',
      question: 'Apakah Anda merasa sulit berkonsentrasi, berpikir, atau membuat keputusan?',
      explanation: `${genderText}, kesulitan konsentrasi bisa sangat mempengaruhi produktivitas dan kualitas hidup. Untuk seseorang di ${region}, hal ini bisa berdampak pada aktivitas sehari-hari dan pekerjaan.`,
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
      yes: `Terima kasih atas kejujuran ${name}. Kecemasan adalah respons alami, tapi jika berlebihan, kita perlu perhatikan bersama ya. Mari lanjut ke pertanyaan berikutnya.`,
      no: `Senang mendengarnya, ${name}! Kondisi mental yang stabil sangat penting. Mari kita lanjutkan untuk gambaran yang lebih lengkap.`,
    },
    q2: {
      yes: `Saya memahami ${name}. Kehilangan minat pada hal yang biasanya menyenangkan memang bisa membuat hari terasa berat. Informasi ini sangat membantu untuk penilaian kita.`,
      no: `Bagus sekali, ${name}! Tetap menikmati aktivitas favorit adalah tanda kesehatan mental yang baik. Yuk lanjut.`,
    },
    q3: {
      yes: `${name}, masalah tidur bisa sangat melelahkan. Tidur yang berkualitas sangat penting untuk kesehatan. Saya catat ini ya untuk rekomendasi nanti.`,
      no: `Wah, pola tidur ${name} terdengar cukup baik! Tidur berkualitas sangat mendukung kesehatan mental. Mari lanjutkan.`,
    },
    q4: {
      yes: `Saya paham ${name}. Kelelahan terus-menerus memang bisa membuat semua terasa berat. Terima kasih sudah berbagi, ini penting untuk penilaian kita.`,
      no: `Energi yang baik adalah modal penting, ${name}! Pertahankan ya. Mari kita teruskan penilaiannya.`,
    },
    q5: {
      yes: `${name}, perubahan pola makan memang bisa mencerminkan kondisi emosional. Terima kasih atas informasinya, ini akan membantu kita memberi rekomendasi yang tepat.`,
      no: `Pola makan yang stabil itu bagus, ${name}! Ini menunjukkan keseimbangan yang baik. Lanjut ke pertanyaan selanjutnya ya.`,
    },
    q6: {
      yes: `Saya memahami ${name}. Kesulitan konsentrasi memang bisa sangat mengganggu aktivitas sehari-hari. Mari kita selesaikan penilaian ini untuk solusi yang tepat.`,
      no: `Kemampuan fokus yang baik itu penting, ${name}! Anda sudah hampir selesai, tinggal beberapa pertanyaan lagi.`,
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