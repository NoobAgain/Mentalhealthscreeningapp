import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User as UserIcon, Sparkles, Minimize2 } from 'lucide-react';
import { AiraAvatar } from './AiraAvatar';

interface Message {
  id: string;
  sender: 'user' | 'aira';
  text: string;
  timestamp: Date;
}

interface ChatbotAIProps {
  onClose: () => void;
  userData: {
    gender: string | null;
    age: string;
    region: string;
  };
  score: number;
}

export function ChatbotAI({ onClose, userData, score }: ChatbotAIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const name = userData.gender === 'male' ? 'Bapak' : 'Ibu';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting from AIRA
    const greeting = {
      id: '1',
      sender: 'aira' as const,
      text: `Halo ${name}! Saya AIRA, asisten AI untuk kesehatan mental. Saya melihat ${name} baru saja menyelesaikan skrining dengan skor ${score}/20. Bagaimana perasaan ${name} sekarang? Ada yang ingin ${name} ceritakan atau tanyakan?`,
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, []);

  const generateAiraResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Responses based on keywords
    if (lowerMessage.includes('cemas') || lowerMessage.includes('khawatir') || lowerMessage.includes('takut')) {
      return `${name}, kecemasan yang ${userData.gender === 'male' ? 'Bapak' : 'Ibu'} rasakan adalah hal yang wajar. Di usia ${userData.age} tahun, banyak tekanan hidup bisa memicu kecemasan. Beberapa teknik yang bisa membantu:\n\n1. **Teknik Pernapasan 4-7-8**: Tarik napas 4 hitungan, tahan 7 hitungan, hembuskan 8 hitungan\n2. **Grounding 5-4-3-2-1**: Sebutkan 5 hal yang dilihat, 4 yang didengar, 3 yang disentuh, 2 yang dicium, 1 yang dikecap\n3. **Journaling**: Tulis perasaan ${name} setiap hari\n\nApakah ada situasi spesifik yang memicu kecemasan ${name}?`;
    }

    if (lowerMessage.includes('sedih') || lowerMessage.includes('depresi') || lowerMessage.includes('murung')) {
      return `Saya memahami ${name}. Perasaan sedih yang berkepanjangan memerlukan perhatian serius. Beberapa hal yang bisa ${name} coba:\n\n1. **Aktivitas Fisik**: Olahraga ringan 20-30 menit/hari bisa meningkatkan endorfin\n2. **Koneksi Sosial**: Hubungi teman atau keluarga, bahkan hanya untuk mengobrol ringan\n3. **Rutinitas Harian**: Buat jadwal sederhana untuk memberikan struktur pada hari ${name}\n4. **Hindari Isolasi**: Jangan mengurung diri, walau terasa berat untuk keluar\n\nNamun ${name}, dengan skor ${score}/20, sangat saya rekomendasikan untuk berbicara dengan profesional. Apakah ${name} terbuka untuk konsultasi dengan psikolog?`;
    }

    if (lowerMessage.includes('tidur') || lowerMessage.includes('insomnia') || lowerMessage.includes('susah tidur')) {
      return `Masalah tidur sangat umum terjadi, ${name}. Kualitas tidur sangat mempengaruhi kesehatan mental. Coba tips berikut:\n\n1. **Sleep Hygiene**: Tidur dan bangun di jam yang sama setiap hari\n2. **Hindari Layar**: Matikan gadget 1 jam sebelum tidur\n3. **Lingkungan Nyaman**: Kamar gelap, sejuk, dan tenang\n4. **Ritual Sebelum Tidur**: Baca buku, mandi air hangat, atau meditasi ringan\n5. **Hindari Kafein**: Setelah jam 2 siang\n\nSudah berapa lama ${name} mengalami masalah tidur ini?`;
    }

    if (lowerMessage.includes('bunuh diri') || lowerMessage.includes('mengakhiri hidup') || lowerMessage.includes('mati saja')) {
      return `${name}, terima kasih sudah berbagi hal yang sangat penting ini dengan saya. Saya sangat peduli dengan keselamatan ${name}. Pikiran seperti ini adalah tanda bahwa ${name} memerlukan bantuan segera.\n\n🚨 **PENTING - HUBUNGI SEGERA:**\n- **JKN Mental Health Hotline**: 119 ext. 8\n- **Into The Light Indonesia**: 1500-454\n- **Kemenkes RI**: 500-454\n\nLayanan ini tersedia 24/7 dan gratis. ${name} TIDAK SENDIRIAN. Banyak orang peduli dan siap membantu.\n\nApakah ada orang terdekat yang bisa ${name} hubungi sekarang? Atau apakah ${name} ingin saya bantu mencarikan layanan konseling darurat di ${userData.region}?`;
    }

    if (lowerMessage.includes('terima kasih') || lowerMessage.includes('makasih')) {
      return `Sama-sama ${name}! Saya senang bisa membantu. Ingat, menjaga kesehatan mental adalah perjalanan, bukan tujuan. ${name} sudah mengambil langkah berani hari ini dengan melakukan skrining dan berbicara dengan saya. 💚\n\nAda lagi yang ingin ${name} tanyakan atau ceritakan?`;
    }

    if (lowerMessage.includes('konsultasi') || lowerMessage.includes('psikolog') || lowerMessage.includes('dokter')) {
      return `Keputusan yang sangat baik, ${name}! Untuk konsultasi dengan profesional melalui JKN:\n\n1. **Fasilitas Pertama**: Kunjungi Puskesmas terdekat dengan kartu JKN\n2. **Rujukan**: Dokter umum akan memberikan rujukan ke psikolog/psikiater jika diperlukan\n3. **RSUD**: Banyak RSUD di ${userData.region} memiliki poli jiwa/kesehatan mental\n4. **Gratis**: Ditanggung JKN, ${name} hanya perlu membawa kartu\n\nApakah ${name} sudah pernah konsultasi sebelumnya, atau ini akan menjadi pengalaman pertama?`;
    }

    if (lowerMessage.includes('stres') || lowerMessage.includes('tertekan') || lowerMessage.includes('beban')) {
      return `${name}, stres adalah respons alami tubuh terhadap tekanan. Tapi stres berlebihan perlu dikelola. Beberapa cara efektif:\n\n1. **Time Management**: Prioritaskan tugas, jangan ambil terlalu banyak beban\n2. **Break Time**: Istirahat 5-10 menit setiap 1-2 jam kerja\n3. **Physical Activity**: Jalan santai, yoga, atau stretching\n4. **Say No**: Berani menolak hal yang di luar kapasitas\n5. **Support System**: Berbagi dengan orang terdekat\n\nApa yang paling membuat ${name} stres akhir-akhir ini?`;
    }

    if (lowerMessage.includes('bagaimana') || lowerMessage.includes('gimana') || lowerMessage.includes('apa yang harus')) {
      return `${name}, berdasarkan skor skrining ${score}/20, berikut langkah yang saya rekomendasikan:\n\n**Jangka Pendek (1-7 hari):**\n- Praktikkan self-care harian: tidur cukup, makan teratur, olahraga ringan\n- Batasi berita/media sosial yang memicu stres\n- Hubungi support system (keluarga/teman)\n\n**Jangka Menengah (1-4 minggu):**\n- Jadwalkan konsultasi dengan psikolog melalui JKN\n- Mulai jurnal harian untuk tracking mood\n- Cari aktivitas yang memberi makna dan kesenangan\n\n**Jangka Panjang:**\n- Rutin follow-up dengan profesional\n- Bangun rutinitas sehat yang berkelanjutan\n- Bergabung dengan support group jika tersedia\n\nMana yang ingin ${name} mulai terlebih dahulu?`;
    }

    // Default response
    const defaultResponses = [
      `Saya mendengarkan, ${name}. Bisa ceritakan lebih detail tentang itu? Saya di sini untuk membantu.`,
      `Terima kasih sudah berbagi, ${name}. Perasaan seperti itu wajar kok. Ada yang spesifik yang membuat ${name} merasa seperti itu?`,
      `${name}, saya memahami. Di usia ${userData.age} tahun, banyak tantangan yang dihadapi. Apakah ada situasi tertentu yang ingin ${name} diskusikan?`,
      `Saya paham ${name}. Setiap orang punya cara berbeda dalam menghadapi situasi. Apa yang biasanya membantu ${name} merasa lebih baik?`,
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AIRA typing and response
    setTimeout(() => {
      const airaResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'aira',
        text: generateAiraResponse(inputText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, airaResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col pointer-events-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AiraAvatar size="sm" />
            <div>
              <h3 className="text-lg">AIRA</h3>
              <p className="text-green-100 text-xs">AI Mental Health Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              {message.sender === 'aira' ? (
                <AiraAvatar size="sm" className="shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'aira'
                    ? 'bg-white shadow-md border border-gray-200'
                    : 'bg-green-600 text-white shadow-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'aira' ? 'text-gray-500' : 'text-green-100'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2">
              <AiraAvatar size="sm" className="shrink-0" />
              <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-200 rounded-b-2xl">
          <div className="flex items-end gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan..."
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none text-sm"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputText.trim() === ''}
              className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Dukungan AI • Konsultasi profesional tetap diperlukan
          </p>
        </div>
      </div>
    </div>
  );
}