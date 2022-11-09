# Ubidots ORM

Ubidots ORM is a library focused on create, retrieve and send data to ubidots API.

This library provides an easy and intuitive way to do the following:

- Create entities
- Send data to entities
- Retrieve data from entities
- Filter data and entities

## Installation

Right now, there is not a way to install this library, we are still in development stage.
So, to use this library, just use development commands!

```
yarn run dev 
npm run dev
```

## Authentication

To authenticate, we provide different way to do it.

````typescript
const auth = async () => {
  const AuthInstance = Auth.getInstance();
  await AuthInstance.authenticate('UBI_TOKEN');
};
````

## Implementations

For example, you want to retrieve, the first device where label starts with cats!

````typescript
  const device: DeviceObject = await Ubidots.devices.where('label').startsWith('cats').first();
  console.log()
````

That is all!

## License
