function Shop() {
  const products = [
    {
      id: 1,
      name: "KASAHARA T-SHIRT",
      price: "$45",
      image: "/placeholder.svg?height=400&width=300",
      category: "Apparel"
    },
    {
      id: 2,
      name: "UNDEFINED HOODIE",
      price: "$85",
      image: "/placeholder.svg?height=400&width=300",
      category: "Apparel"
    },
    {
      id: 3,
      name: "LIMITED PRINT #1",
      price: "$120",
      image: "/placeholder.svg?height=400&width=300",
      category: "Art"
    },
    {
      id: 4,
      name: "KASAHARA TOTE",
      price: "$35",
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories"
    },
    {
      id: 5,
      name: "PHOTO BOOK VOL.1",
      price: "$65",
      image: "/placeholder.svg?height=400&width=300",
      category: "Books"
    },
    {
      id: 6,
      name: "VINYL RECORD",
      price: "$30",
      image: "/placeholder.svg?height=400&width=300",
      category: "Music"
    }
  ];

  return (
    <div className="page-content">
      <h1 className="page-title">Shop</h1>
      <p className="page-description">
        Browse our curated collection of products, limited edition releases, and exclusive collaborations.
        All items are designed with our signature aesthetic and attention to detail.
      </p>
      
      <div className="shop-filters">
        <button className="filter-button active">All</button>
        <button className="filter-button">Apparel</button>
        <button className="filter-button">Art</button>
        <button className="filter-button">Accessories</button>
        <button className="filter-button">Books</button>
        <button className="filter-button">Music</button>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image || "/placeholder.svg"} alt={product.name} />
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <span className="product-price">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .shop-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 50px;
        }
        
        .filter-button {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .filter-button:hover, .filter-button.active {
          background: white;
          color: black;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 40px;
        }
        
        .product-card {
          cursor: pointer;
        }
        
        .product-image {
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #111;
          margin-bottom: 15px;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        
        .product-category {
          font-size: 12px;
          opacity: 0.6;
          display: block;
          margin-bottom: 5px;
        }
        
        .product-name {
          font-size: 18px;
          margin-bottom: 5px;
          letter-spacing: -0.5px;
        }
        
        .product-price {
          font-size: 16px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default Shop;