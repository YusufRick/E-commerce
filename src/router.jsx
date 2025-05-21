import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LandingPage       = lazy(() => import('./pages/LandingPage'));
const HomePage          = lazy(() => import('./pages/HomePage'));
const FashionCollection = lazy(() => import('./pages/FashionCollection'));
const ProductPage       = lazy(() => import('./pages/ProductPage'));
const ShortFilms        = lazy(() => import('./pages/ShortFilms'));
const Projects          = lazy(() => import('./pages/Projects'));

export default function Router({ go }) {
  return (
    <Routes>
      <Route path="/"           element={<LandingPage go={go} />} />
      <Route path="/home"       element={<HomePage go={go} />} />
      <Route path="/fashion"    element={<FashionCollection go={go} />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/short-films" element={<ShortFilms go={go} />} />
      <Route path="/projects"    element={<Projects go={go} />} />
    </Routes>
  );
}
