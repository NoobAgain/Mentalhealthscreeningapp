import React, { useState } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { DemographicsStep } from './components/DemographicsStep';
import { ScreeningStep } from './components/ScreeningStep';
import { AssessmentStep } from './components/AssessmentStep';
import { ResultsStep } from './components/ResultsStep';
import { ResultsPage } from './components/ResultsPage';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [userChoice, setUserChoice] = useState<'consult' | 'screening' | null>(null);
  const [screeningAnswers, setScreeningAnswers] = useState<{ [key: string]: boolean }>({});
  const [assessmentResponses, setAssessmentResponses] = useState<{ [key: string]: string }>({});
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  const totalSteps = userChoice === 'screening' ? 3 : 1;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedGender(null);
    setAge('');
    setRegion('');
    setUserChoice(null);
    setScreeningAnswers({});
    setAssessmentResponses({});
    setShowDetailedResults(false);
  };

  const handleChoiceSelect = (choice: 'consult' | 'screening') => {
    setUserChoice(choice);
    if (choice === 'consult') {
      // Show consult page or redirect
      alert('Redirecting to consultation booking... (Feature coming soon)');
    } else {
      // Continue to screening
      setCurrentStep(2);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedGender !== null && age !== '' && region !== '';
    if (currentStep === 2 && userChoice === 'screening') {
      return Object.keys(screeningAnswers).length === 6; // 6 questions in new screening
    }
    return true;
  };

  const calculateScore = () => {
    return Object.values(screeningAnswers).filter(a => a === true).length;
  };

  const userData = {
    gender: selectedGender,
    age,
    region,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            {userChoice === 'screening' && currentStep > 1 && (
              <StepIndicator currentStep={currentStep - 1} totalSteps={totalSteps - 1} />
            )}

            {/* Step Content */}
            {currentStep === 1 && (
              <DemographicsStep
                selectedGender={selectedGender}
                onSelectGender={setSelectedGender}
                age={age}
                onAgeChange={setAge}
                region={region}
                onRegionChange={setRegion}
                onChoiceSelect={handleChoiceSelect}
              />
            )}

            {currentStep === 2 && userChoice === 'screening' && (
              <ScreeningStep
                answers={screeningAnswers}
                onAnswer={(questionId, value) =>
                  setScreeningAnswers({ ...screeningAnswers, [questionId]: value })
                }
                userData={userData}
              />
            )}

            {currentStep === 3 && userChoice === 'screening' && !showDetailedResults && (
              <ResultsStep score={calculateScore()} />
            )}
            
            {currentStep === 3 && userChoice === 'screening' && showDetailedResults && (
              <ResultsPage 
                score={calculateScore()} 
                maxScore={6}
                userData={userData}
                answers={screeningAnswers}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            {currentStep === 3 && userChoice === 'screening' && !showDetailedResults ? (
              <>
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Mulai Lagi
                </button>
                <button
                  onClick={() => setShowDetailedResults(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 shadow-md"
                >
                  Lihat Hasil Lengkap
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            ) : currentStep === 3 && userChoice === 'screening' && showDetailedResults ? (
              <>
                <button
                  onClick={() => setShowDetailedResults(false)}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Kembali ke Ringkasan
                </button>
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 shadow-md"
                >
                  <RotateCcw className="w-5 h-5" />
                  Mulai Lagi
                </button>
              </>
            ) : currentStep > 1 ? (
              <>
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Kembali
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  Lanjut
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            ) : null}
          </div>

          {/* Info Footer */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="text-green-700">© 2025 BPJS Kesehatan - Layanan Skrining Kesehatan Mental</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}