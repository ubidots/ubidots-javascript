import Auth from './Auth/Auth';
import Ubidots from './Ubidots/index';
import { BaseFilter } from './Builder/BaseFilter';

(async () => {
  // const AuthInstance = Auth.getInstance();
  // await AuthInstance.authenticate('BBFF-QUcQ2EnNxNt9WIKyDWjiZ8HH7EhxDF');
  try {
    const device = await Ubidots.devices.where('label').contains('cats').orderBy('id').withHeaders({
      'X-Auth-Token': 'BBFF-QUcQ2EnNxNt9WIKyDWjiZ8HH7EhxDF',
    }).get();

    console.log(device);

  } catch (e) {
    console.log(e);
  }

  // const deviceRawFilter = Ubidots.devices.where('label').rawFilter({ 'contains': 'cats', 'order_by': 'id' }).withHeaders({});
})();
