export interface ReportData {
  userData: {
    gender: string | null;
    age: string;
    region: string;
  };
  score: number;
  maxScore: number;
  answers: { [key: string]: boolean };
  date: Date;
}

export function generatePDFReport(data: ReportData): void {
  const { userData, score, maxScore, answers, date } = data;
  const name = userData.gender === 'male' ? 'Bapak' : 'Ibu';
  const yesCount = Object.values(answers).filter(a => a === true).length;
  const percentage = (yesCount / maxScore) * 100;

  let riskLevel = 'Rendah';
  let riskColor = '#10b981';
  if (percentage > 60) {
    riskLevel = 'Tinggi';
    riskColor = '#f97316';
  } else if (percentage > 30) {
    riskLevel = 'Sedang';
    riskColor = '#eab308';
  }

  // Create HTML content for PDF
  const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Skrining Kesehatan Mental - BPJS Kesehatan</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, sans-serif; 
      padding: 40px; 
      color: #1f2937;
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(135deg, #047857 0%, #10b981 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .logo-area {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 15px;
    }
    .logo {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: #047857;
    }
    h1 { font-size: 28px; margin-bottom: 5px; }
    .subtitle { font-size: 14px; opacity: 0.9; }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .info-card {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #047857;
    }
    .info-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 16px;
      color: #1f2937;
      font-weight: 500;
    }
    .score-box {
      background: ${riskColor};
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    .score-number {
      font-size: 72px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .score-label {
      font-size: 24px;
      margin-bottom: 15px;
    }
    .score-description {
      font-size: 14px;
      opacity: 0.9;
    }
    .section {
      margin: 30px 0;
      padding: 25px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
    }
    .section-title {
      color: #047857;
      font-size: 20px;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #10b981;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    .stat-card {
      text-align: center;
      padding: 20px;
      background: #f0fdf4;
      border-radius: 8px;
      border: 2px solid #bbf7d0;
    }
    .stat-number {
      font-size: 36px;
      font-weight: bold;
      color: #047857;
      margin-bottom: 5px;
    }
    .stat-label {
      font-size: 14px;
      color: #059669;
    }
    .recommendation {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .recommendation-title {
      color: #1e40af;
      font-weight: 600;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .hotline-box {
      background: #fef2f2;
      border: 2px solid #fecaca;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .hotline-title {
      color: #dc2626;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .hotline-number {
      font-size: 24px;
      color: #dc2626;
      font-weight: bold;
      margin: 10px 0;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    .disclaimer {
      background: #fffbeb;
      border: 2px solid #fde68a;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      font-size: 13px;
    }
    ul {
      margin-left: 20px;
      margin-top: 10px;
    }
    li {
      margin-bottom: 8px;
    }
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-area">
      <div class="logo">BPJS</div>
      <div>
        <h1>Laporan Skrining Kesehatan Mental</h1>
        <p class="subtitle">BPJS Kesehatan - Layanan Kesehatan Mental</p>
      </div>
    </div>
    <p style="font-size: 14px; margin-top: 15px;">
      Tanggal Skrining: ${date.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </p>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <div class="info-label">Jenis Kelamin</div>
      <div class="info-value">${userData.gender === 'male' ? 'Pria' : 'Wanita'}</div>
    </div>
    <div class="info-card">
      <div class="info-label">Usia</div>
      <div class="info-value">${userData.age} Tahun</div>
    </div>
    <div class="info-card">
      <div class="info-label">Asal Daerah</div>
      <div class="info-value">${userData.region}</div>
    </div>
    <div class="info-card">
      <div class="info-label">Metode Skrining</div>
      <div class="info-value">SRQ-20 (Self-Reporting Questionnaire)</div>
    </div>
  </div>

  <div class="score-box">
    <div class="score-number">${yesCount}/${maxScore}</div>
    <div class="score-label">Tingkat Risiko: ${riskLevel}</div>
    <div class="score-description">
      ${percentage.toFixed(0)}% gejala teridentifikasi dari total skrining
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">📊 Ringkasan Hasil</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${yesCount}</div>
        <div class="stat-label">Gejala Ya</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${maxScore - yesCount}</div>
        <div class="stat-label">Gejala Tidak</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${percentage.toFixed(0)}%</div>
        <div class="stat-label">Persentase</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">🤖 Kesimpulan AIRA (AI Assistant)</h2>
    <p style="margin-bottom: 15px;">Halo ${name},</p>
    ${percentage <= 30 ? `
      <p>Berdasarkan hasil skrining, kondisi kesehatan mental Anda saat ini berada dalam kategori yang cukup baik. 
      Dari ${maxScore} pertanyaan, Anda menjawab "Ya" pada ${yesCount} gejala, yang menunjukkan tingkat gejala yang minimal.</p>
      <div class="recommendation">
        <div class="recommendation-title">💡 Rekomendasi</div>
        <ul>
          <li>Terus jaga pola hidup sehat dengan istirahat cukup dan aktivitas fisik teratur</li>
          <li>Pertahankan hubungan sosial yang positif</li>
          <li>Lakukan self-monitoring rutin</li>
          <li>Jika ada perubahan kondisi, segera lakukan skrining ulang</li>
        </ul>
      </div>
    ` : percentage <= 60 ? `
      <p>Hasil skrining menunjukkan bahwa Anda mengalami beberapa gejala yang perlu diperhatikan. 
      Dari ${maxScore} pertanyaan, ${yesCount} gejala teridentifikasi. Ini bisa jadi pertanda bahwa Anda sedang 
      mengalami stres atau tekanan yang cukup signifikan.</p>
      <div class="recommendation">
        <div class="recommendation-title">💡 Rekomendasi</div>
        <ul>
          <li><strong>Sangat disarankan</strong> untuk berbicara dengan profesional kesehatan mental</li>
          <li>Konseling atau terapi dapat membantu mengatasi gejala sebelum menjadi lebih serius</li>
          <li>Praktikkan teknik coping seperti mindfulness dan olahraga ringan</li>
          <li>Perkuat dukungan sosial dari keluarga dan teman</li>
        </ul>
      </div>
    ` : `
      <p>Hasil menunjukkan bahwa Anda mengalami cukup banyak gejala yang memerlukan perhatian serius - 
      ${yesCount} dari ${maxScore} gejala teridentifikasi. Ini BUKAN berarti Anda "lemah" atau "gagal", 
      tapi justru menunjukkan keberanian untuk mengakui dan mencari bantuan.</p>
      <div class="recommendation">
        <div class="recommendation-title">⚠️ Rekomendasi Prioritas</div>
        <ul>
          <li><strong>SEGERA</strong> berbicara dengan psikolog atau psikiater melalui layanan JKN</li>
          <li>Jangan menunda - semakin cepat mendapat bantuan, semakin baik prognosisnya</li>
          <li>Hubungi fasilitas kesehatan terdekat untuk rujukan</li>
          <li>Libatkan keluarga atau orang terdekat dalam proses pemulihan</li>
        </ul>
      </div>
    `}
  </div>

  <div class="section">
    <h2 class="section-title">🏥 Langkah Selanjutnya dengan JKN</h2>
    <ol style="margin-left: 20px;">
      <li style="margin-bottom: 12px;">
        <strong>Kunjungi Fasilitas Kesehatan Tingkat Pertama (FKTP)</strong><br>
        Datang ke Puskesmas atau klinik yang bekerja sama dengan BPJS dengan membawa kartu JKN dan KTP
      </li>
      <li style="margin-bottom: 12px;">
        <strong>Konsultasi dengan Dokter Umum</strong><br>
        Dokter akan melakukan pemeriksaan awal dan memberikan rujukan jika diperlukan
      </li>
      <li style="margin-bottom: 12px;">
        <strong>Rujukan ke Spesialis</strong><br>
        Jika diperlukan, Anda akan dirujuk ke psikolog atau psikiater di rumah sakit
      </li>
      <li style="margin-bottom: 12px;">
        <strong>Layanan Ditanggung JKN</strong><br>
        Konsultasi dan terapi kesehatan mental ditanggung penuh oleh BPJS Kesehatan
      </li>
    </ol>
  </div>

  <div class="hotline-box">
    <div class="hotline-title">🚨 HOTLINE DARURAT KESEHATAN MENTAL</div>
    <p style="margin-bottom: 10px;">Jika Anda mengalami krisis atau pikiran untuk menyakiti diri sendiri, 
    segera hubungi layanan darurat 24/7:</p>
    <div class="hotline-number">☎️ 119 ext. 8</div>
    <p style="font-size: 14px;">JKN Mental Health Hotline</p>
    <div class="hotline-number">☎️ 1500-454</div>
    <p style="font-size: 14px;">Into The Light Indonesia</p>
  </div>

  <div class="disclaimer">
    <strong>⚠️ Disclaimer:</strong> Hasil skrining ini bersifat indikatif dan BUKAN merupakan diagnosis medis. 
    Konsultasi dengan profesional kesehatan mental tetap diperlukan untuk penilaian dan diagnosis yang akurat. 
    Laporan ini dapat digunakan sebagai referensi saat berkonsultasi dengan dokter.
  </div>

  <div class="footer">
    <p><strong>© 2025 BPJS Kesehatan</strong></p>
    <p>Layanan Skrining Kesehatan Mental</p>
    <p style="margin-top: 10px;">Laporan ini digenerate secara otomatis pada ${new Date().toLocaleString('id-ID')}</p>
    <p style="margin-top: 5px; font-style: italic;">Powered by AIRA (AI-Powered Mental Health Assistant)</p>
  </div>
</body>
</html>
  `;

  // Create blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Laporan_Skrining_Kesehatan_Mental_${date.toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Show success message
  alert('✅ Laporan berhasil diunduh!\n\nFile HTML dapat dibuka di browser dan di-print/save as PDF menggunakan fungsi Print browser (Ctrl+P atau Cmd+P).');
}
