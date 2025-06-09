import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Visual from './pages/Visual';

const LandingPage       = lazy(() => import('./pages/LandingPage'));
const HomePage          = lazy(() => import('./pages/Home'));
const FashionCollection = lazy(() => import('./pages/FashionCollection'));
const ProductPage       = lazy(() => import('./pages/ProductPage'));
const ShortFilms        = lazy(() => import('./pages/ShortFilms'));
const Visuals          = lazy(() => import('./pages/Visual'));
const ShortVid          = lazy(() => import('./pages/ViewShorts'))
const ViewVisual        = lazy(() => import('./pages/viewVisual'))
const Contact           = lazy(() => import('./pages/Contact'));
const AboutUs           = lazy(() => import('./pages/AboutUs'));

export default function Router({ go }) {
  return (
    <Routes>
      <Route path="/"           element={<LandingPage go={go} />} />
      <Route path="/HomePage"   element={<HomePage go={go} />} />
      <Route path="/fashion"    element={<FashionCollection go={go} />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/shorts/:id" element={<ShortVid />} />
      <Route path="/short-films" element={<ShortFilms go={go} />} />
      <Route path="/visual"    element={<Visuals go={go} />} />
      <Route path="/view_visual/:id"    element={<ViewVisual go={go} />} />
      <Route path="/contact" element={<Contact go={go} />} />
      <Route path="/About" element={<AboutUs go={go} />} />


    </Routes>
  );
}
