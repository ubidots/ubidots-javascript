import UbidotsApi from './utils/UbidotsApi';


UbidotsApi.get('/devices', {}).then(console.log, console.log);
