import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path untuk menyimpan chat logs
const LOG_FILE = path.join(process.cwd(), 'data', 'chat-logs.json');

// Interface untuk chat log
interface ChatLog {
  id: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
  sessionId?: string;
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

// POST: Simpan chat log baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userMessage, botResponse, sessionId } = body;

    // Validasi input
    if (!userMessage || !botResponse) {
      return NextResponse.json(
        { error: 'userMessage dan botResponse harus diisi' },
        { status: 400 }
      );
    }

    // Pastikan file log ada
    ensureLogFile();

    // Baca data lama
    const existingData = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));

    // Buat log baru
    const newLog: ChatLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      userMessage,
      botResponse,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      sessionId: sessionId || 'unknown'
    };

    // Tambahkan ke array
    existingData.push(newLog);

    // Keep only last 1000 logs (agar file gak terlalu besar)
    if (existingData.length > 1000) {
      existingData.shift();
    }

    // Simpan kembali
    fs.writeFileSync(LOG_FILE, JSON.stringify(existingData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Chat log berhasil disimpan'
    });

  } catch (error) {
    console.error('Error saving chat log:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan chat log' },
      { status: 500 }
    );
  }
}

// GET: Ambil semua chat logs (dengan password protection)
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
    data.sort((a: ChatLog, b: ChatLog) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Group by session
    const sessions: { [key: string]: ChatLog[] } = {};
    data.forEach((log: ChatLog) => {
      if (!sessions[log.sessionId || 'unknown']) {
        sessions[log.sessionId || 'unknown'] = [];
      }
      sessions[log.sessionId || 'unknown'].push(log);
    });

    return NextResponse.json({
      success: true,
      total: data.length,
      totalSessions: Object.keys(sessions).length,
      data,
      sessions
    });

  } catch (error) {
    console.error('Error reading chat logs:', error);
    return NextResponse.json(
      { error: 'Gagal membaca chat logs' },
      { status: 500 }
    );
  }
}
