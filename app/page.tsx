'use client'

import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  return (
    <FilterTable products={data}/>
  )
}

function FilterTable({ products }){
  const [search, setSearch] = useState('');
  const [stock, setStock] = useState(false);

  return(
    <div>
      <Search search={search} stock={stock} setSearch={setSearch} setStock={setStock} />
      <ProductTable products={products} search={search} stock={stock} />
    </div>
  )
}

function Search({search, stock, setSearch, setStock}){
  return(
    <div>
      Search <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      Stock <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)}></input>
    </div>
  )
}

function ProductTable({ products, search, stock }){
  const rows = [];
  let category = '';
  products.forEach((product) => {
    if(stock == true && product.stocked == false){
      return;
    }
    if(search != '' && product.name.toLowerCase().includes(search.toLowerCase()) == false){
      return;
    }
    if(product.category != category){
      rows.push(<Header name={product.category} key={product.category} />);
      category = product.category;
    }
    rows.push(
      <Row product={product} key={product.name} />
    );
  });

  return(
    <table>
      <tbody>
      <tr><td>Name</td><td>Price</td></tr>
      {rows}
      </tbody>
    </table>
  )
}

function Row({product}){
  return(
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function Header({name}){
  return(
    <tr>
      <td colSpan="2">{name}</td>
    </tr>
  )
}



const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];