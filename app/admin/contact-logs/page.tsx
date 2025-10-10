'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, User, MessageSquare, RefreshCw, Lock, Eye, EyeOff, Users } from 'lucide-react';

interface ContactLog {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip?: string;
}

interface ChatLog {
  id: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
  sessionId?: string;
  userName?: string;
  userEmail?: string;
}

interface SessionGroup {
  [sessionId: string]: ChatLog[];
}

export default function ContactLogsPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'chat'>('contact');
  const [logs, setLogs] = useState<ContactLog[]>([]);
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [sessions, setSessions] = useState<SessionGroup>({});
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ContactLog | null>(null);

  const fetchLogs = async (pwd: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch contact logs
      const contactResponse = await fetch(`/api/contact-log?password=${encodeURIComponent(pwd)}`);
      const contactData = await contactResponse.json();

      if (!contactResponse.ok) {
        throw new Error(contactData.error || 'Failed to fetch logs');
      }

      setLogs(contactData.data);

      // Fetch chat logs
      try {
        const chatResponse = await fetch(`/api/chat-logs?password=${encodeURIComponent(pwd)}`);
        const chatData = await chatResponse.json();
        
        if (chatResponse.ok) {
          setChatLogs(chatData.data || []);
          setSessions(chatData.sessions || {});
        }
      } catch (chatErr) {
        console.warn('Failed to fetch chat logs:', chatErr);
      }

      setIsAuthenticated(true);
      sessionStorage.setItem('adminPassword', pwd);
    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs(password);
  };

  const handleRefresh = () => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      fetchLogs(savedPassword);
    }
  };

  // Auto-load jika ada password tersimpan atau dari URL
  useEffect(() => {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get('auth');
    
    if (authParam) {
      // Auto-login dengan password dari URL
      setPassword(authParam);
      fetchLogs(authParam);
      // Clean URL setelah auto-login (hapus parameter auth)
      window.history.replaceState({}, '', '/admin/contact-logs');
      return;
    }
    
    // Fallback ke saved password
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      fetchLogs(savedPassword);
    }
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 text-center mb-6">Login untuk akses Contact Logs & Chat Logs</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none pr-12"
                  placeholder="Masukkan password admin"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Memuat...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor Contact Form & AI Chatbot</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem('adminPassword');
                  setIsAuthenticated(false);
                  setPassword('');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Lock className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'contact'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Logs
              </div>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'chat'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat Logs
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {activeTab === 'contact' ? (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Mail className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-700">Total Pesan</p>
                      <p className="text-2xl font-bold text-blue-900">{logs.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-700">Unique Senders</p>
                      <p className="text-2xl font-bold text-green-900">
                        {new Set(logs.map(log => log.email)).size}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-700">Terbaru</p>
                      <p className="text-sm font-semibold text-purple-900">
                        {logs.length > 0 ? formatDate(logs[0].timestamp).split(',')[0] : 'Belum ada'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-700">Total Chats</p>
                      <p className="text-2xl font-bold text-blue-900">{chatLogs.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-700">Sessions</p>
                      <p className="text-2xl font-bold text-green-900">{Object.keys(sessions).length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-700">Latest</p>
                      <p className="text-sm font-semibold text-purple-900">
                        {chatLogs.length > 0 ? formatDate(chatLogs[0].timestamp).split(',')[0] : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content - Contact or Chat Logs */}
        {activeTab === 'contact' ? (
          // Contact Logs Table
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {logs.length === 0 ? (
              <div className="p-12 text-center">
                <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Belum ada pesan masuk</p>
              </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subjek</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log, index) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(log.timestamp)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{log.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={`mailto:${log.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {log.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{log.subject}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Detail
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => {
                              setActiveTab('chat');
                              // Filter session by IP
                              const matchingSessions = Object.entries(sessions).find(([_, chatLogs]) => 
                                chatLogs.some(chat => chat.ip === log.ip)
                              );
                              if (matchingSessions) {
                                setSelectedSession(matchingSessions[0]);
                              }
                            }}
                            className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center gap-1"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Chat Logs
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
        ) : (
          // Chat Logs View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Session List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-4 max-h-[600px] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Sessions ({Object.keys(sessions).length})
                </h2>
                <div className="space-y-2">
                  {Object.entries(sessions).map(([sessionId, chatLogsInSession]) => {
                    // Cari nama dari chat logs di session ini (ambil yang ada userName)
                    const userName = chatLogsInSession.find(c => c.userName)?.userName;
                    const userEmail = chatLogsInSession.find(c => c.userEmail)?.userEmail;
                    
                    return (
                      <button
                        key={sessionId}
                        onClick={() => setSelectedSession(sessionId)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedSession === sessionId
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            {userName ? (
                              <>
                                <p className="text-sm font-semibold truncate">{userName}</p>
                                {userEmail && (
                                  <p className="text-xs opacity-75 truncate">{userEmail}</p>
                                )}
                              </>
                            ) : (
                              <p className="text-xs font-mono truncate">
                                {sessionId.replace('session_', '').substr(0, 12)}...
                              </p>
                            )}
                            <p className="text-xs opacity-75 mt-1">
                              {chatLogsInSession.length} pesan
                            </p>
                          </div>
                          <MessageSquare className="w-4 h-4 ml-2 flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content - Chat Display */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {selectedSession && sessions[selectedSession] ? (
                  <>
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <h2 className="text-lg font-bold">Session Details</h2>
                      <p className="text-sm text-gray-600 font-mono mt-1">{selectedSession}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Total: {sessions[selectedSession]?.length || 0} percakapan
                      </p>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {sessions[selectedSession]?.map((log) => (
                        <div key={log.id} className="border-l-4 border-gray-200 pl-4 py-2">
                          {/* User Message */}
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-600">User</span>
                              <span className="text-xs text-gray-500">{formatDate(log.timestamp)}</span>
                            </div>
                            <p className="text-gray-900 bg-blue-50 p-3 rounded-lg">{log.userMessage}</p>
                          </div>

                          {/* Bot Response */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-600">Bot</span>
                            </div>
                            <div 
                              className="text-gray-900 bg-green-50 p-3 rounded-lg"
                              dangerouslySetInnerHTML={{ __html: log.botResponse }}
                            />
                          </div>

                          {log.ip && (
                            <div className="mt-2 text-xs text-gray-500">
                              IP: <span className="font-mono">{log.ip}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Pilih session di sidebar untuk lihat chat</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal untuk melihat detail pesan */}
      {selectedLog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedLog(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Detail Pesan</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Dari:</label>
                <p className="text-lg text-gray-900">{selectedLog.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email:</label>
                <p className="text-lg text-blue-600">
                  <a href={`mailto:${selectedLog.email}`} className="hover:underline">
                    {selectedLog.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Subjek:</label>
                <p className="text-lg text-gray-900">{selectedLog.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Waktu:</label>
                <p className="text-sm text-gray-700">{formatDate(selectedLog.timestamp)}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-2">Pesan:</label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedLog.message}</p>
                </div>
              </div>
              {selectedLog.ip && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">IP Address:</label>
                  <p className="text-sm text-gray-700 font-mono">{selectedLog.ip}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <a
                href={`mailto:${selectedLog.email}?subject=Re: ${selectedLog.subject}`}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                Balas via Email
              </a>
              <button
                onClick={() => setSelectedLog(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
