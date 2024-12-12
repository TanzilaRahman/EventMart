import React, { useState, useEffect } from "react";
import "./Marketplace.css";

// creating variables to store the data, along with its function
const Marketplace = () => {
  // product
  const [products, dataProduct] = useState([]); 
  // filter product
  const [filteredProducts, dataFilterProduct] = useState([]); 
  // product category
  const [categories, dataCategory] = useState([]); 
  // types of filter
  const [filter, dataFilter] = useState({
    category: "",
    sort: "asc",
    minPrice: 0,
    maxPrice: 1000,
  });

  // Fetch data from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        //update
        dataProduct(data);
        dataFilterProduct(data);
      });

    // Fetch product categories from API
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        dataCategory(data);
      })
  }, []);


  const filtertoProduct = () => {
    // create copy of products
    let filters = [...products];

    // check if a filter is applied
    if (filter.category) {
      filters = filters.filter(
        (product) => product.category === filter.category
      );
    }

    filters = filters.filter(
      (product) =>
        product.price >= filter.minPrice && product.price <= filter.maxPrice
    );

    // Sort products by price
     if (filter.sort === "desc") {
      filters.sort((first, second) => second.price - first.price);
    }
    else if (filter.sort === "asc") {
      filters.sort((first, second) => first.price - second.price);
    }

    // update the state with new filtered products
    dataFilterProduct(filters);
  };

  // Handle changes in filter inputs
  const filterModify = (event) => {
    const { name, value } = event.target;
    dataFilter((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };


  useEffect(() => {
    filtertoProduct();
  }, [filter, products]); 

  return (
    <div className="container">

      {/* title*/}
      <h2>Marketplace</h2>

      {/* Filter Section */}
      <div className="filterstyle">
        {/*Dropdown menu for categories*/}
        <label>Categories:</label>
        <select
          name="category"
          value={filter.category}
          onChange={filterModify}
        >
          <option value = "">All</option>
          {categories.map((categoricals, position) => (
            <option key={position} value={categoricals}>
              {categoricals}
            </option>
          ))}
        </select>

          {/*Dropdown menu for sorting*/}
        <label>Sort By:</label>
        <select name="sort" value={filter.sort} onChange={filterModify}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        {/*Price range*/}
        <label>Minimum Price:</label>
        <input
          type="number"
          name="minPrice"
          value={filter.minPrice}
          onChange={filterModify}
          placeholder="Minimum Price"
        />

        <label>Maximum Price:</label>
        <input
          type="number"
          name="maxPrice"
          value={filter.maxPrice}
          onChange={filterModify}
          placeholder="Maximum Price"
        />
      </div>

    {/*Display filtered products in a grid layout*/}
    <div className="layout">
      {filteredProducts.map((products) => (
        <div key={products.id} className="productbox">
          <img src={products.image} alt={products.title} />
          <h2>{products.title} - ${products.price}</h2>
        </div>
      ))}
    </div>
  </div>
);

};

export default Marketplace;