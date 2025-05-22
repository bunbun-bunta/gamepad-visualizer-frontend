import React from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { GamepadInput } from './components/GamepadInput';

function App() {
  const { isConnected } = useWebSocket();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <header className="p-6 text-center">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">
          🎮 Gamepad Visualizer
        </h1>
        <p className="text-gray-300 text-lg">
          コントローラー入力可視化ツール
        </p>
        
        {/* WebSocket接続状態表示 */}
        <div className={`mt-4 inline-block px-4 py-2 rounded-full ${
          isConnected ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
        }`}>
          {isConnected ? '🟢 WebSocket Connected' : '🔴 WebSocket Disconnected'}
        </div>
      </header>
      
      <main className="container mx-auto p-6 max-w-6xl">
        {/* メイン機能 */}
        <GamepadInput />
        
        {/* ステータス情報 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
            <h3 className="text-green-400 font-bold">フロントエンド</h3>
            <p className="text-sm text-gray-300">React + TypeScript</p>
            <p className="text-xs text-green-300">✅ Vercel</p>
          </div>
          <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-bold">バックエンド</h3>
            <p className="text-sm text-gray-300">Node.js + Socket.io</p>
            <p className="text-xs text-blue-300">✅ Railway</p>
          </div>
          <div className={`p-4 rounded-lg border ${
            isConnected 
              ? 'bg-purple-500/20 border-purple-500/30' 
              : 'bg-red-500/20 border-red-500/30'
          }`}>
            <h3 className={`font-bold ${isConnected ? 'text-purple-400' : 'text-red-400'}`}>
              WebSocket
            </h3>
            <p className="text-sm text-gray-300">リアルタイム通信</p>
            <p className={`text-xs ${isConnected ? 'text-purple-300' : 'text-red-300'}`}>
              {isConnected ? '✅ 接続中' : '❌ 切断中'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;