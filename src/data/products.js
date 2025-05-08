export default async function products() {
  const productList = [];

  try {
      for (let i = 1; i <= 10; i++){
        const products = await fetch(`https://fakestoreapi.com/products/${i}`);
        const response = await products.json();
        const { id, title, description, image, price, category } = response;
        productList.push({
          id,
          title,
          description,
          image,
          price,
          category,
        });
      }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return productList;
}
