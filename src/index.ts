import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { DeviceObject } from './entities/devices';

const auth = async () => {
  const AuthInstance = Auth.getInstance();
  await AuthInstance.authenticate('BBFF-QUcQ2EnNxNt9WIKyDWjiZ8HH7EhxDF');
};


const getDeviceVariable = async () => {
  await auth();
  const device: DeviceObject = await Ubidots.devices.where('label').startsWith('cats').first();
  return await device.variables.where('name').contains('cats').get();
};

const getWithRawFilter = async () => {
  await auth();
  return await Ubidots.devices.all().rawFilter({ 'contains': 'cats' }).get();
};

const getDeviceWithNoAuth = async () => {
  return await Ubidots.devices.all().withHeaders({ 'X-Auth-Token': 'BBFF-QUcQ2EnNxNt9WIKyDWjiZ8HH7EhxDF' }).get();
};

const debugVariableRequest = async () => {
  await auth();
  const device = await Ubidots.devices.where('label').startsWith('cats').first();
  return device.variables.where('name').contains('cats').withHeaders({ 'test': 'yes' }).debug();
};

const sendDotsToVariable = async (dot: number) => {
  await auth();
  const device = Ubidots.Device({ id: '63405bf6fe13941e5652aec1', label: 'catsaa' });
  const variable = await device.variables.where('name').contains('cats').first();
  return await variable.sendDots(dot);
};

(async () => {

  try {
    // console.log(await sendDotsToVariable(4));
    await auth();
    console.log(await getDeviceVariable());
  } catch (e) {
    console.log(e);
  }
})();


// Pagination -> JTW
// Easy get first/last
// Internal request management


