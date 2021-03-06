const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('products').insertOne({ name, quantity });
  return {
    _id,
    name,
    quantity,
  };
};

const getProductByName = async (productName) => {
  const db = await getConnection();
  const data = await db.collection('products').findOne({ name: productName });
  return data;
};

const getAllProducts = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find().toArray();
  return {
    products,
  };
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  if (!product) return false;

  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const { value } = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });
  return value;
};

const updateSoldProduct = async (id, quantity) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const { value } = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $inc: { quantity } },
    { returnDocument: 'after' },
  );
  return value;
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateSoldProduct,
};
