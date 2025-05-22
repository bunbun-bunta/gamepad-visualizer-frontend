import { useEffect, useState } from 'react';

// Socket.io-clientをrequire形式でimport
const io = require('socket.io-client');

export const useWebSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // WebSocketサーバーに接続
    const socketIO = io(process.env.REACT_APP_WS_URL || 'ws://localhost:3001', {
      transports: ['websocket', 'polling']
    });

    // 接続イベント
    socketIO.on('connect', () => {
      console.log('✅ WebSocket Connected!');
      setIsConnected(true);
    });

    // 切断イベント
    socketIO.on('disconnect', () => {
      console.log('❌ WebSocket Disconnected');
      setIsConnected(false);
    });

    // コントローラー入力更新を受信
    socketIO.on('gamepad-update', (data: any) => {
      console.log('🎮 Gamepad Update:', data);
    });

    setSocket(socketIO);

    // クリーンアップ
    return () => {
      socketIO.close();
    };
  }, []);

  // コントローラー入力データを送信
  const sendGamepadData = (gamepadData: any) => {
    if (socket && isConnected) {
      socket.emit('gamepad-input', gamepadData);
    }
  };

  return { socket, isConnected, sendGamepadData };
};