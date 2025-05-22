import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <header className="p-6 text-center">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">
          🎮 Gamepad Visualizer
        </h1>
        <p className="text-gray-300 text-lg">
          ゲーム配信者向けコントローラー入力可視化ツール
        </p>
      </header>
      
      <main className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white bg-opacity-10 rounded-xl p-8 text-center backdrop-blur-lg border border-white border-opacity-20">
          <h2 className="text-3xl mb-6 text-green-400">
            ✅ Tailwind CSS セットアップ完了！
          </h2>
          <p className="text-gray-300 mb-6">
            グラデーション背景とスタイリングが適用されていれば成功です
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
              <h3 className="text-green-400 font-bold mb-2">React</h3>
              <p className="text-sm text-gray-300">TypeScript対応</p>
            </div>
            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
              <h3 className="text-blue-400 font-bold mb-2">Tailwind</h3>
              <p className="text-sm text-gray-300">スタイリング</p>
            </div>
            <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg">
              <h3 className="text-purple-400 font-bold mb-2">Vercel</h3>
              <p className="text-sm text-gray-300">デプロイ準備完了</p>
            </div>
          </div>
          
          <button className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transform transition hover:scale-105 shadow-xl">
            次のステップ: Railway設定 →
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;