import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { retrieve_shopping_products } from '../../utils/http_methods';

interface ShoppingProducts{
  id:string;
  title:string;
  description:string;
  price:number; 
  image_src:string;
  image_alt:string;
}

const Products = () => {

  const [productList, setProducts] = useState<ShoppingProducts[]|[]>([]);

  useEffect(()=>{

    async function fetch_products() {
       try{
          const response = await retrieve_shopping_products();
          console.log(response);
          setProducts(response);
       }
       catch(e){
          setProducts([]);
       }
    }
    fetch_products();
  },[])

  return (
    <section className="products">
      <h2>Buy your favorite products</h2>
      <ul>
        {productList.map((Item) => {
          return (
            <ProductItem title={Item.title}
              key={Item.id}
              id={Item.id}
              price={Number(Item.price)}
              description={Item.description}
              image_alt = {Item.image_alt}
              image_src = {Item.image_src}
            />
          )
        })}
      </ul>
    </section>
  );
};

export default Products;
