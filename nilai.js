// =============================================================
// nilai.js (STARTER) - LOGIKA hitung nilai, berjalan di BROWSER
//
// LANGKAH 2:
//   Ganti setiap function di bawah dengan versi Anda dari LAB 1 (soal.js).
//   Function di bawah sengaja hanya "stub" agar halaman tetap bisa berjalan.
//
// File ini hanya berisi LOGIKA (hitung nilai). Urusan DOM ada di app.js.
// Uji di Console browser, mis.: tentukanGrade(84.9)  -> 'B'
// =============================================================

function hitungNilaiAkhir(tugas, uts, uas) {
  const nilaiAkhir = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
  return Math.round(nilaiAkhir * 10) / 10;
}

function tentukanGrade(nilai) {
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 55) return 'C';
  if (nilai >= 40) return 'D';
  return "E";
}

function buatRekap(daftar) {
  return daftar.map(m => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);
    const grade = tentukanGrade(nilaiAkhir);
    const lulus = nilaiAkhir >= 55;
    return {
      ...m,
      nilaiAkhir,
      grade,
      lulus
    };
  });
}

function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;
  const total = rekap.reduce((sum, m) => sum + m.nilaiAkhir, 0);
  return Math.round((total / rekap.length) * 10) / 10;
}

function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;
  return rekap.reduce((tertinggi, m) => (m.nilaiAkhir > tertinggi.nilaiAkhir ? m : tertinggi));
}

function hitungDistribusiGrade(rekap) {
  const hasil = { A: 0, B: 0, C:0, D: 0, E: 0 };
  for (const m of rekap) {
    if (hasil[m.grade] !== undefined) {
      hasil[m.grade]++;
    }
  }
  return hasil;
}

function cariMahasiswa(rekap, kataKunci) {
  const keyword = kataKunci.toLowerCase().trim();
  return rekap.filter(m => m.nama.toLowerCase().includes(keyword));
}

// ---- Sudah jadi: validasi input mahasiswa baru (dipakai sebelum memanggil api.js) ----
// Mengembalikan array pesan error; array kosong = valid.
function validasiMahasiswa(input) {
  const errors = [];
  if (typeof input.nim !== 'string' || !/^\d{7}$/.test(input.nim)) {
    errors.push('NIM harus 7 digit angka');
  }
  if (typeof input.nama !== 'string' || input.nama.trim().length < 3) {
    errors.push('Nama minimal 3 karakter');
  }
  for (const kolom of ['tugas', 'uts', 'uas']) {
    const n = input[kolom];
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
      errors.push(`Nilai ${kolom} harus angka 0-100`);
    }
  }
  return errors;
}
