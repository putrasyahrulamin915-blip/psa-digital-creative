import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import ServicesSection from './components/ServicesSection';
import PrintProducts from './components/PrintProducts';
import HowItWorks from './components/HowItWorks';
import OrderTracking from './components/OrderTracking';
import OrderForm from './components/OrderForm';
import Portfolio from './components/Portfolio';
import AIChat from './components/AIChat';
import FutureRoadmap from './components/FutureRoadmap';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CustomerServiceWidget from './components/CustomerServiceWidget';
import { OrderItem } from './lib/appConfig';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('logo');
  const [activeTrackingId, setActiveTrackingId] = useState<string>('PSA-20261004-A8K2');
  const [sessionOrders, setSessionOrders] = useState<OrderItem[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<{
    serviceName?: string;
    style?: string;
    colors?: string;
    notes?: string;
  } | null>(null);

  // Smooth scroll helper
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollTo('#brief-order');
  };

  const handleAskAiForService = () => {
    scrollTo('#ai-assistant');
  };

  const handleNewOrderCreated = (newOrder: OrderItem) => {
    setSessionOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingId(newOrder.id);
  };

  const handleTrackOrderDirectly = (orderId: string) => {
    setActiveTrackingId(orderId);
    scrollTo('#tracking');
  };

  const handleOrderUpdated = (updatedOrder: OrderItem) => {
    setSessionOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === updatedOrder.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedOrder;
        return next;
      }
      return [updatedOrder, ...prev];
    });
  };

  const handleApplyAiToBrief = (data: {
    serviceName?: string;
    style?: string;
    colors?: string;
    notes?: string;
  }) => {
    setAiSuggestions(data);
    scrollTo('#brief-order');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Fixed Header Navigation */}
      <Navbar
        onOpenOrderModal={() => scrollTo('#brief-order')}
        onOpenTrackingModal={(id) => {
          if (id) setActiveTrackingId(id);
          scrollTo('#tracking');
        }}
        onOpenAiAssistant={() => scrollTo('#ai-assistant')}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOrderClick={() => scrollTo('#brief-order')}
          onExploreServices={() => scrollTo('#layanan')}
          onTryTracking={() => {
            setActiveTrackingId('PSA-20261004-A8K2');
            scrollTo('#tracking');
          }}
          onOpenAi={() => scrollTo('#ai-assistant')}
        />

        {/* 3. Value Proposition (6 Key Pillars) */}
        <ValueProp />

        {/* 4. Services Catalog with Rich Images */}
        <ServicesSection
          onSelectService={handleSelectService}
          onAskAiForService={handleAskAiForService}
          onOpenOrderModal={() => scrollTo('#brief-order')}
        />

        {/* 5. Print & Physical Products Catalog (Design -> Approval -> Print) */}
        <PrintProducts
          onOrderPrint={(productId) => {
            if (productId) {
              if (productId.includes('banner')) setSelectedServiceId('banner');
              else if (productId.includes('card')) setSelectedServiceId('business-card');
              else if (productId.includes('sticker')) setSelectedServiceId('sticker');
              else if (productId.includes('invitation')) setSelectedServiceId('invitation');
              else if (productId.includes('brochure')) setSelectedServiceId('brochure');
            }
            scrollTo('#brief-order');
          }}
        />

        {/* 6. Step-by-Step Workflow (01 to 08) */}
        <HowItWorks onStartOrder={() => scrollTo('#brief-order')} />

        {/* 7. Live Order Tracking UI */}
        <OrderTracking
          initialOrderId={activeTrackingId}
          customOrders={sessionOrders}
          onOpenOrderModal={() => scrollTo('#brief-order')}
          onUpdateOrder={handleOrderUpdated}
        />

        {/* 8. Structured Design Brief Ordering Form */}
        <OrderForm
          selectedServiceId={selectedServiceId}
          onOrderCreated={handleNewOrderCreated}
          onTrackOrderDirectly={handleTrackOrderDirectly}
          aiSuggestedData={aiSuggestions}
        />

        {/* 9. Creative Showcase Portfolio with Rich Visual Images */}
        <Portfolio
          onOrderSpecificService={(cat) => {
            if (cat.toLowerCase().includes('logo')) setSelectedServiceId('logo');
            else if (cat.toLowerCase().includes('poster')) setSelectedServiceId('poster');
            else if (cat.toLowerCase().includes('banner')) setSelectedServiceId('banner');
            else if (cat.toLowerCase().includes('social')) setSelectedServiceId('social-media');
            else if (cat.toLowerCase().includes('pack') || cat.toLowerCase().includes('stik')) setSelectedServiceId('sticker');
            scrollTo('#brief-order');
          }}
        />

        {/* 10. PSA AI Creative Assistant */}
        <AIChat onApplyRecommendationToBrief={handleApplyAiToBrief} />

        {/* 11. Scalable Platform Roadmap & Future Dashboards */}
        <FutureRoadmap />

        {/* 12. FAQ Section */}
        <FAQ />
      </main>

      {/* 13. Footer */}
      <Footer onOpenOrderModal={() => scrollTo('#brief-order')} />

      {/* 14. Floating Customer Service WhatsApp Hub */}
      <CustomerServiceWidget />
    </div>
  );
}
