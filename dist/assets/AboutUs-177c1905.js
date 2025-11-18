import{u as o,j as a,a as i}from"./index-0dca03f5.js";import{m as e}from"./motion-4432cab6.js";import{l as n}from"./kasahara-logo-7e8c1604.js";const r="/assets/kasahara-principles-549bc5d8.jpg";function m(){const t=o();return a("div",{className:"about-page",children:[i("style",{children:`
  .about-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: black;
    color: white;
    font-family: 'TT Commons', sans-serif;
    position: relative;
  }

  .back-btn {
    position: absolute;
    top: 2rem;
    left: 2rem;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: white;
  }

  .brand-logo {
    width: 60vw;
    max-width: 640px;
    height: auto;
    margin-top: 2rem;
  }

  .brand-description {
    font-size: 1.1rem;
    color: #ccc;
    margin-top: 1rem;
    max-width: 600px;
    text-align: center;
    line-height: 1.6;
    padding: 0 1rem;
  }

  .principles-image {
    margin-top: 2rem;
    width: 80%;
    max-width: 600px;
    height: auto;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    .brand-logo {
      width: 80vw;
    }

    .brand-description {
      font-size: 1rem;
    }

    .principles-image {
      width: 90%;
    }
  }
`}),i("button",{className:"back-btn",onClick:()=>t(-1),children:"← Back"}),a(e.section,{className:"hero-section",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,ease:"easeOut"},children:[i("img",{src:n,alt:"Brand Logo",className:"brand-logo"}),a(e.p,{className:"brand-description",initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.4,duration:.6},children:["Philosophy : To Connect, Collaborate, and Celebrate Creatives. ",i("br",{}),i("br",{}),"Creativity is what keeps the mind young, drives innovation & inspires action. ",i("br",{}),i("br",{}),"Therefore, that's what we're pushing for."]}),i(e.img,{src:r,alt:"Kasahara Principles",className:"principles-image",initial:{opacity:0},animate:{opacity:1},transition:{delay:.8,duration:.8}})]})]})}export{m as default};
