import{f as C,u as z,C as N,g as w,h as v,i as S,j as r,a as e,e as y}from"./index-0dca03f5.js";import{r as s}from"./motion-4432cab6.js";import{C as k,a as I}from"./Cart-17719f0e.js";const p="/assets/starboitee-7b9c360b.png",P="/assets/sizechart-45495eab.png";const j={"fashion-1.jpg":p};function L(){const{id:n}=C(),h=z(),{addToCart:g}=s.useContext(N),[u,d]=s.useState(!1),[a,f]=s.useState(null),[l,m]=s.useState(""),[o,x]=s.useState("");if(s.useEffect(()=>{const t=w(y);v(S(t,"Collection",n)).then(c=>{if(!c.exists()){m(`No product found with id="${n}"`);return}const i=c.data();f({id:c.id,name:i.name,description:i.description,price:i.price,priceId:i.priceId,sizes:Array.isArray(i.sizes)?i.sizes:["S","M","L"],image:j[i.image]||p})}).catch(c=>{console.error(c),m("Failed to load product.")})},[n]),l)return r("div",{style:{padding:"2rem",color:"tomato"},children:["🚨 ",l]});if(!a)return e("div",{className:"loader",children:"Loading…"});const b=()=>{if(!o){alert("Please select a size before adding to cart.");return}g({...a,size:o})};return r("div",{className:"collection-page",children:[e("button",{className:"back-btn",onClick:()=>h(-1),children:"← Back"}),e(k,{isOpen:u,onClose:()=>d(!1)}),e("header",{className:"header",children:e("button",{className:"cart-btn",onClick:()=>d(!0),"aria-label":"Open cart",children:e("img",{src:I,alt:"Cart",className:"cart-icon"})})}),e("h2",{className:"Tittle",children:a.name}),r("div",{className:"product-details",children:[e("img",{src:a.image,alt:a.name,loading:"lazy",className:"product-image"}),r("div",{className:"info-and-chart",children:[r("div",{className:"info",children:[e("p",{className:"description",children:a.description}),r("p",{className:"price",children:["Price: $",a.price]}),e("div",{className:"size-dropdown-wrapper",children:r("select",{className:"size-dropdown",value:o,onChange:t=>x(t.target.value),children:[e("option",{value:"",disabled:!0,children:"Size"}),a.sizes.map(t=>e("option",{value:t,children:t},t))]})}),e("button",{className:"add-cart-btn",onClick:b,children:"Add to Cart"})]}),e("img",{src:P,alt:"Size Chart",className:"size-chart-img",loading:"lazy"})]})]}),e("style",{children:`
        .product-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
          align-items: center;
        }

        .product-image {
          width: 100%;
          max-width: 400px;
          object-fit: contain;
        }

        .info-and-chart {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          width: 100%;
        }

        .info {
          max-width: 600px;
          width: 100%;
        }

        .size-chart-img {
          width: 100%;
          max-width: 400px;
          height: auto;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .size-dropdown-wrapper {
          margin: 1rem 0;
        }

        .size-dropdown {
          padding: 0.5rem;
          font-size: 1rem;
        }

        .add-cart-btn {
          padding: 0.75rem 1.5rem;
          background-color: black;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }

        @media screen and (min-width: 768px) {
          .product-details {
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
          }

          .info-and-chart {
            flex-direction: column;
            align-items: flex-start;
            margin-left: 2rem;
          }

          .size-chart-img {
            margin-top: 1rem;
          }
        }
      `})]})}export{L as default};
