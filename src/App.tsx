import React, { useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const { isConnected, sendGamepadData } = useWebSocket();

  // コントローラー入力検出（テスト用）
  useEffect(() => {
    const handleGamepadInput = () => {
      const gamepads = navigator.getGamepads();
      if (gamepads[0]) {
        const gamepad = gamepads[0];
        
        // テスト用のデータ送信
        sendGamepadData({
          id: gamepad.id,
          buttons: gamepad.buttons.map(button => ({
            pressed: button.pressed,
            value: button.value
          })),
          axes: gamepad.axes,
          timestamp: Date.now()
        });
      }
    };

    // 60FPSでコントローラー入力をチェック
    const interval = setInterval(handleGamepadInput, 16);

    return () => clearInterval(interval);
  }, [sendGamepadData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <header className="p-6 text-center">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">
          🎮 Gamepad Visualizer
        </h1>
        <p className="text-gray-300 text-lg">
          ゲーム配信者向けコントローラー入力可視化ツール
        </p>
        
        {/* WebSocket接続状態表示 */}
        <div className={`mt-4 inline-block px-4 py-2 rounded-full ${
          isConnected ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
        }`}>
          {isConnected ? '🟢 WebSocket Connected' : '🔴 WebSocket Disconnected'}
        </div>
      </header>
      
      <main className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center border border-white/20 shadow-2xl">
          <h2 className="text-3xl mb-6 text-green-400">
            ✅ フルスタック セットアップ完了！
          </h2>
          <p className="text-gray-300 mb-6">
            フロントエンド・バックエンド・WebSocket接続が全て動作しています
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
          
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h4 className="text-yellow-400 font-bold mb-2">🎮 コントローラーテスト</h4>
            <p className="text-sm text-gray-300">
              コントローラーを接続して、ブラウザの開発者ツール（F12）のConsoleでリアルタイム入力を確認できます
            </p>
          </div>
          
          <button className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transform transition hover:scale-105 shadow-xl">
            次のステップ: UI可視化機能 →
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;