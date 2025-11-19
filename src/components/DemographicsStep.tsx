import React from 'react';
import { Users, User, Calendar, MapPin, Stethoscope, ClipboardList } from 'lucide-react';

interface DemographicsStepProps {
  selectedGender: string | null;
  onSelectGender: (gender: string) => void;
  age: string;
  onAgeChange: (age: string) => void;
  region: string;
  onRegionChange: (region: string) => void;
  onChoiceSelect: (choice: 'consult' | 'screening') => void;
}

export function DemographicsStep({
  selectedGender,
  onSelectGender,
  age,
  onAgeChange,
  region,
  onRegionChange,
  onChoiceSelect,
}: DemographicsStepProps) {
  const allFieldsFilled = selectedGender !== null && age !== '' && region !== '';

  return (
    <div>
      <h2 className="text-green-700 mb-2">Langkah 1: Data Diri</h2>
      <p className="text-gray-600 mb-6">
        Silakan lengkapi data diri Anda untuk personalisasi layanan.
      </p>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-3">Jenis Kelamin</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelectGender('male')}
            className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedGender === 'male'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedGender === 'male'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <User className="w-6 h-6" />
              </div>
              <span className={selectedGender === 'male' ? 'text-green-700' : 'text-gray-700'}>
                Pria
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectGender('female')}
            className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedGender === 'female'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedGender === 'female'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Users className="w-6 h-6" />
              </div>
              <span className={selectedGender === 'female' ? 'text-green-700' : 'text-gray-700'}>
                Wanita
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Age Input */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-3">Usia</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
            placeholder="Masukkan usia Anda"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none transition-all"
            min="10"
            max="100"
          />
        </div>
      </div>

      {/* Region Input */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-3">Asal Daerah</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            placeholder="Contoh: Jakarta, Surabaya, Bandung"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Choice Buttons (shown when all fields are filled) */}
      {allFieldsFilled && (
        <div className="space-y-4 mt-8 pt-6 border-t-2 border-gray-200">
          <p className="text-gray-700 text-center mb-4">Pilih langkah selanjutnya:</p>
          
          <button
            onClick={() => onChoiceSelect('consult')}
            className="w-full p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-3">
              <Stethoscope className="w-6 h-6" />
              <div className="text-left">
                <div className="text-lg">Langsung Hubungkan ke Psikolog/Dokter</div>
                <div className="text-sm text-blue-100 mt-1">Konsultasi langsung dengan profesional</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onChoiceSelect('screening')}
            className="w-full p-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-3">
              <ClipboardList className="w-6 h-6" />
              <div className="text-left">
                <div className="text-lg">Skrining Dulu Aja</div>
                <div className="text-sm text-green-100 mt-1">Lakukan penilaian mandiri dengan bantuan AIRA</div>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}