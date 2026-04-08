// lib/nav.config.ts

export const NAV_CONFIG = {
  products: {
    platforms: [
      { name: "CreatorOS", href: "/platforms/creator" },
      { name: "CommerceOS", href: "/platforms/commerce" },
      { name: "BeautyOS", href: "/platforms/beauty" },
      { name: "FoodOS", href: "/platforms/food" },
      { name: "MarketOS", href: "/platforms/market" },
      { name: "ServiceOS", href: "/platforms/service" },
      { name: "EventOS", href: "/platforms/event" },
    ],
    z3ymoProducts: [
      { name: "Z3ymo Pulse", href: "/ai-agents/pulse", tag: "Live" },
      { name: "EBox", href: "/products/ebox", tag: "Coming Soon" },
      { name: "Salon Marketplace", href: "/products/salons", tag: "Coming Soon" },
      { name: "Novel Platform", href: "/products/novel", tag: "Coming Soon" },
    ],
  },

  solutions: [
    { name: "Creators & Coaches", href: "/solutions/creators" },
    { name: "Fashion & Clothing", href: "/solutions/fashion" },
    { name: "Beauty & Cosmetics", href: "/solutions/beauty" },
    { name: "Restaurants & Catering", href: "/solutions/food" },
    { name: "Home Decor", href: "/solutions/home-decor" },
    { name: "Electronics", href: "/solutions/electronics" },
    { name: "Kitchen Appliances", href: "/solutions/kitchen" },
    { name: "Online Stores", href: "/solutions/ecommerce" },
    { name: "Service Businesses", href: "/solutions/services" },
    { name: "Digital Entrepreneurs", href: "/solutions/digital" },
  ],

  services: {
    software: [
      { name: "Web & Mobile Applications" },
      { name: "Custom Software Development" },
    ],
    ai: [
      { name: "AI Agent Development" },
      { name: "AI Business Automation" },
    ],
    consulting: [
      { name: "Tech Consultation" },
      { name: "Product Strategy" },
    ],
  },

  aiAgents: [
    {
      name: "Custom AI Agents",
      desc: "Tailored AI systems for your workflows",
      href: "/ai-agents/custom",
    },
    {
      name: "Z3ymo Pulse",
      desc: "AI competitor intelligence agent",
      href: "/ai-agents/pulse",
    },
  ],
}