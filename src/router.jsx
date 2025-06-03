import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LandingPage       = lazy(() => import('./pages/LandingPage'));
const HomePage          = lazy(() => import('./pages/Home'));
const FashionCollection = lazy(() => import('./pages/FashionCollection'));
const ProductPage       = lazy(() => import('./pages/ProductPage'));
const ShortFilms        = lazy(() => import('./pages/ShortFilms'));
const Projects          = lazy(() => import('./pages/Projects'));
const ShortVid          = lazy(() => import('./pages/ViewShorts'))

export default function Router({ go }) {
  return (
    <Routes>
      <Route path="/"           element={<LandingPage go={go} />} />
      <Route path="/HomePage"   element={<HomePage go={go} />} />
      <Route path="/fashion"    element={<FashionCollection go={go} />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/shorts/:id" element={<ShortVid />} />
      <Route path="/short-films" element={<ShortFilms go={go} />} />
      <Route path="/projects"    element={<Projects go={go} />} />
    </Routes>
  );
}
