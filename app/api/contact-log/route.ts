import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path untuk menyimpan data pengirim
const LOG_FILE = path.join(process.cwd(), 'data', 'contact-logs.json');

// Interface untuk data pengirim
interface ContactLog {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip?: string;
}

// Fungsi untuk memastikan folder dan file ada
function ensureLogFile() {
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
  }
}

// POST: Simpan data pengirim baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validasi input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Pastikan file log ada
    ensureLogFile();

    // Baca data lama
    const existingData = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));

    // Buat log baru
    const newLog: ContactLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    // Tambahkan ke array
    existingData.push(newLog);

    // Simpan kembali
    fs.writeFileSync(LOG_FILE, JSON.stringify(existingData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Data pengirim berhasil disimpan',
      data: newLog
    });

  } catch (error) {
    console.error('Error saving contact log:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pengirim' },
      { status: 500 }
    );
  }
}

// GET: Ambil semua data pengirim (dengan password protection)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    // Simple password protection
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'arusombak007123';
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized - Password salah' },
        { status: 401 }
      );
    }

    // Pastikan file log ada
    ensureLogFile();

    // Baca data
    const data = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));

    // Sort by timestamp descending (terbaru dulu)
    data.sort((a: ContactLog, b: ContactLog) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      success: true,
      total: data.length,
      data
    });

  } catch (error) {
    console.error('Error reading contact log:', error);
    return NextResponse.json(
      { error: 'Gagal membaca data pengirim' },
      { status: 500 }
    );
  }
}
