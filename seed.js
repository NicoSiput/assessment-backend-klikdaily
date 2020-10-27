/* eslint-disable no-await-in-loop */
const Product = require('./models/Product');
const Log = require('./models/Log');
const connection = require('./connection/conn');

// Seed data product
const products = [
  {
    name: 'Indomie Goreng',
    qty: 100,
    location_id: 1,
  },
  {
    name: 'Indomie Rebus',
    qty: 68,
    location_id: 2,
  },
  {
    name: 'Gula Pasir',
    qty: 25,
    location_id: 3,
  },
  {
    name: 'Aqua',
    qty: 67,
    location_id: 4,
  },
  {
    name: 'Adees',
    qty: 45,
    location_id: 5,
  },
  {
    name: 'Le Mineral',
    qty: 15,
    location_id: 6,
  },
];

const locationIds = [
  {
    location: 'A-1-1',
  },
  {
    location: 'A-1-2',
  },
  {
    location: 'A-1-3',
  },
  {
    location: 'A-1-4',
  },
  {
    location: 'A-1-5',
  },
  {
    location: 'A-1-6',
  },
];

const insertProducts = async (dataProducts) => {
  console.log('Inserting product');
  for (let index = 0; index < dataProducts.length; index += 1) {
    const product = products[index];
    await Product.insertProduct(product);
    console.log(`${product.name} inserted..`);
  }
  console.log('Inserting product done');
};

const insertLocations = async (dataLocations) => {
  console.log('\nInserting locations');
  for (let index = 0; index < dataLocations.length; index += 1) {
    const location = dataLocations[index];
    await Product.insertLocation(location);
    console.log(`${location.location} inserted..`);
  }
  console.log('Inserting locations done');
};

const startSeeding = async () => {
  await insertProducts(products);
  await insertLocations(locationIds);

  connection.end();
};

startSeeding();
