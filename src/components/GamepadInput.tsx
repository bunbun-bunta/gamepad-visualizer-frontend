import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface GamepadState {
  connected: boolean;
  id: string;
  buttons: boolean[];
  axes: number[];
  timestamp: number;
}

export const GamepadInput: React.FC = () => {
  const [gamepadState, setGamepadState] = useState<GamepadState | null>(null);
  const { isConnected, sendGamepadData } = useWebSocket();

  useEffect(() => {
    let animationId: number;

    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads();
      
      if (gamepads[0]) {
        const gamepad = gamepads[0];
        
        const newState: GamepadState = {
          connected: true,
          id: gamepad.id,
          buttons: gamepad.buttons.map(button => button.pressed),
          axes: Array.from(gamepad.axes),
          timestamp: Date.now()
        };
        
        setGamepadState(newState);
        
        // WebSocketでデータ送信
        sendGamepadData(newState);
      } else {
        setGamepadState(prev => prev ? { ...prev, connected: false } : null);
      }
      
      animationId = requestAnimationFrame(updateGamepadState);
    };

    updateGamepadState();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [sendGamepadData]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">🎮 コントローラー入力</h3>
        <div className={`px-3 py-1 rounded-full text-sm ${
          gamepadState?.connected 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {gamepadState?.connected ? '🟢 接続中' : '🔴 未接続'}
        </div>
      </div>

      {gamepadState?.connected ? (
        <div className="space-y-6">
          {/* コントローラー情報 */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold">コントローラー:</span> {gamepadState.id}
            </p>
          </div>

          {/* ボタン状態表示 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">ボタン</h4>
            <div className="grid grid-cols-4 gap-2">
              {gamepadState.buttons.map((pressed, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                    pressed
                      ? 'bg-red-500 border-red-400 text-white scale-110'
                      : 'bg-gray-700 border-gray-600 text-gray-400'
                  }`}
                >
                  {index}
                </div>
              ))}
            </div>
          </div>

          {/* スティック・トリガー表示 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">アナログ入力</h4>
            <div className="grid grid-cols-2 gap-4">
              {gamepadState.axes.map((value, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">軸 {index}</span>
                    <span className="text-sm font-mono text-white">
                      {value.toFixed(3)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.abs(value) * 100}%`,
                        marginLeft: value < 0 ? `${(1 + value) * 100}%` : '0'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h4 className="text-xl font-semibold text-gray-300 mb-2">
            コントローラーを接続してください
          </h4>
          <p className="text-gray-400">
            PC にゲームコントローラーを接続し、任意のボタンを押してください
          </p>
        </div>
      )}
    </div>
  );
};