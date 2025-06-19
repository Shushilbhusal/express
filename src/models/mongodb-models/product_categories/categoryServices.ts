import  Category from "./categories.mongodb-model"; //Category from "categories.mongodb-model";

async function createCategoryService(data: { name: string }) {
  const category = new Category(data);
  return await category.save();
}

async function getAllCategoriesService() {
  return await Category.find();
}

async function getCategoryByIdService(id: string) {
  const category = await Category.findById(id);
  return category;
}

async function updateCategoryByIdService(data: { id: string; name: string }) {
  if (!data.id || !data.name) {
  
  const category = await Category.updateOne(
    { _id: data.id },
    { $set: { name: data.name }}
  );
  return category;
}
}

async function deleteCategoryByIdService(id: string) {
  return await Category.deleteOne({ _id: id });
}

export {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
};