export const environment = {
  production: false,
  basePathGeoserver: '/geoserver/ows?',
  //native WebSocket implementation (rxjs/webSocket) rather than a Socket.IO client,
  //while the Nest.js socket server is based on Socket.IO
  //wsEndpoint: 'ws://localhost:3001',
  socketIoEndpoint: 'http://localhost:3001',
  reconnectInterval: 2000
};
