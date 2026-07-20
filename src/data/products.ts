import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 's1',
    name: 'AeroStride Pro Neon',
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 142,
    description: 'High-performance ultra-lightweight running sneakers engineered with responsive carbon fiber plates and breathable mesh upper.',
    longDescription: 'The AeroStride Pro Neon is built for runners who refuse to compromise on speed or comfort. Featuring our patented AeroCell cushion midsole and a dynamic carbon fiber propulsion plate, this running sneaker returns up to 85% of your kinetic energy. The engineered PrimeMesh upper offers target support and optimal ventilation, keeping your feet dry even during intense long-distance marathons. Designed with reflective neon details for enhanced visibility during night runs.',
    category: 'Sneakers',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Neon Red', 'Volt Green', 'Matte Black'],
    sizes: [39, 40, 41, 42, 43, 44],
    badge: 'Best Seller',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    features: [
      'Carbon fiber propulsion plate',
      'Ultra-breathable seamless PrimeMesh',
      'AeroCell shock absorption technology',
      'Durable multi-surface rubber outsole',
      'Anti-microbial moisture-wicking sockliner'
    ]
  },
  {
    id: 's2',
    name: 'Vanguard Classic Oxford',
    price: 24500,
    rating: 4.9,
    reviewsCount: 88,
    description: 'Masterfully hand-crafted Italian full-grain calfskin leather Oxford shoes with refined Goodyear welted soles.',
    longDescription: 'A testament to timeless European sophistication, the Vanguard Classic Oxford is meticulously hand-crafted from the finest premium full-grain Italian calfskin leather. Featuring a polished cap-toe silhouette, hand-waxed finish, and fully lined soft glove leather interior, these shoes mold perfectly to your feet over time. The Goodyear welted leather sole ensures decades of durability and allows for easy resoling. Perfect for formal boardrooms, weddings, and premium black-tie events.',
    category: 'Leather Shoes',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486308512493-ae6a1e530099?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Cognac Tan', 'Deep Espresso', 'Classic Obsidian Black'],
    sizes: [40, 41, 42, 43, 44, 45],
    badge: 'Premium',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    features: [
      '100% full-grain Italian calfskin leather',
      'Goodyear welted sole for ultimate longevity',
      'Breathable leather-lined memory foam insoles',
      'Hand-burnished and hand-waxed details',
      'Stack leather heel with non-slip rubber grip'
    ]
  },
  {
    id: 's3',
    name: 'Nova Retro Cloud Runner',
    price: 15999,
    originalPrice: 18500,
    rating: 4.7,
    reviewsCount: 210,
    description: 'Chic 90s-inspired lifestyle sneakers with pastel color-blocking panels and double-density cloud foam insoles.',
    longDescription: 'Revive vintage style with contemporary cushion. The Nova Retro Cloud Runner brings back the iconic bold overlays of 90s streetwear, blended with state-of-the-art orthotic support. Featuring premium suede leather overlays paired with mesh panels and soft pastel color accents, these sneakers are as cute as they are therapeutic. Perfect for city commuting, university wear, or casual outings where style and comfort are mandatory.',
    category: 'Sneakers',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Pastel Lilac & Cream', 'Rose Gold Glow', 'Minimalist Slate Gray'],
    sizes: [36, 37, 38, 39, 40, 41],
    badge: 'Popular',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    features: [
      'Genuine cow suede and ripstop nylon upper',
      'Double-density CloudFoam dual cushioning',
      'Padded collar and sculpted supportive tongue',
      'Traction-optimized vintage gum waffle outsoles',
      'Anti-bacterial plush inner mesh lining'
    ]
  },
  {
    id: 's4',
    name: 'Serena Minimalist Leather Slide',
    price: 8999,
    rating: 4.6,
    reviewsCount: 64,
    description: 'Buttery-soft full-grain leather slide sandals with contoured ergonomic cork footbeds for effortless summer styling.',
    longDescription: 'Embody refined ease with the Serena Slide. Handcrafted with ultra-soft, vegetable-tanned genuine leather straps that prevent chafing, this sandal conforms to your foot like a second skin. The anatomically sculpted cork and latex footbed is covered with premium suede, offering unmatched arch support and natural shock absorption. Designed to effortlessly elevate casual linen pants, denim, or summer flowy dresses.',
    category: 'Sandals',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Tan Leather', 'Alabaster White', 'Midnight Onyx'],
    sizes: [35, 36, 37, 38, 39, 40],
    badge: 'New Arrival',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    features: [
      'Vegetable-tanned full-grain leather strap',
      'Anatomically shaped genuine cork-latex footbed',
      'Luxurious brushed suede footbed cover',
      'Flexible, lightweight, shock-absorbing EVA sole',
      'Handmade stitching for lasting durability'
    ]
  },
  {
    id: 's5',
    name: 'AeroSlick Street Low-Top',
    price: 12500,
    originalPrice: 15000,
    rating: 4.5,
    reviewsCount: 195,
    description: 'Clean, versatile, minimalist premium white sneakers crafted from full-grain leather with breathable micro-perforations.',
    longDescription: 'The ultimate staple of any modern wardrobe, the AeroSlick Street Low-Top is the epitome of smart-casual footwear. Featuring clean, sleek styling with double-stitched leather panels and dynamic side perforations for cross-ventilation. Designed to dress up or dress down, these shoes pair seamlessly with bespoke tailor suits, raw-edge selvedge denim, or casual shorts. Equipped with ortholite memory-foam cushioning for active 18-hour comfort.',
    category: 'Sneakers',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Classic Triple White', 'Retro White & Green', 'Sleek Blackout'],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    badge: 'Sale',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    features: [
      'Premium full-grain leather outer',
      'Ortholite® eco-friendly memory foam cup-insole',
      'Re-enforced rubber side vulcanization stitching',
      'Padded low-profile heel counter',
      'Moisture-wicking inner mesh fabric'
    ]
  },
  {
    id: 's6',
    name: 'Empress Chunky Derby Loafer',
    price: 19999,
    rating: 4.8,
    reviewsCount: 47,
    description: 'Edgy yet sophisticated women’s high-gloss patent leather chunky loafers with detailed chain detailing.',
    longDescription: 'Make an unmistakable fashion statement. The Empress Chunky Derby Loafer combines premium Italian high-gloss patent leather with a bold, lightweight 1.8-inch lug platform sole. Featuring hand-sewn apron details and finished with polished gunmetal chain hardware across the vamp. Excellent for adding an artistic, contemporary edge to blazers, skirts, and smart-casual tailored garments.',
    category: 'Leather Shoes',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596702994230-a8a47d799b6c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['High-Gloss Jet Black', 'Deep Cabernet Burgundy', 'Forest Gloss Olive'],
    sizes: [36, 37, 38, 39, 40],
    badge: 'Hot Seller',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    features: [
      'Premium Italian patent calfskin leather',
      'Sleek rust-resistant gunmetal chain hardware',
      'Ultra-lightweight shock-absorbing EVA lug sole',
      'Anti-slip heel grip pocket lining',
      'Ergonomic multi-layered cushioning'
    ]
  },
  {
    id: 's7',
    name: 'Atlas Leather Gladiator Sandal',
    price: 11999,
    rating: 4.5,
    reviewsCount: 39,
    description: 'Rugged premium oiled leather multi-strap gladiator sandals with heavy-duty metal buckles and trek traction sole.',
    longDescription: 'Crafted for summer exploration and outdoor comfort, the Atlas Gladiator Sandal is built with robust oiled-nubuck leather straps that resist water and sun. Each of the three custom zinc-alloy utility buckles is highly adjustable, providing a tailor-made secure fit. Supported by a dual-density molded cork bed and fitted with a high-grip rugged rubber outsole to handle cobblestones, nature trails, or sand.',
    category: 'Sandals',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Oiled Dark Amber', 'Rustic Charcoal Black', 'Sahara Desert Sand'],
    sizes: [40, 41, 42, 43, 44, 45],
    badge: 'New Arrival',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    features: [
      'Oiled, water-resistant nubuck leather straps',
      'Three individually adjustable anti-rust metal buckles',
      'Ergonomically shaped natural latex-cork cradle',
      'Heavy-duty deep-groove rubber traction outsole',
      'Microfiber footbed lining for supreme barefoot feel'
    ]
  },
  {
    id: 's8',
    name: 'Phoenix Leather Brogue Boots',
    price: 26500,
    rating: 4.9,
    reviewsCount: 112,
    description: 'Artisanal hand-burnished premium full-grain leather lace-up brogue boots with stacked leather heels.',
    longDescription: 'Exude rugged refinement. The Phoenix Brogue Boot is built for the modern gentleman who values heritage craft. Meticulously constructed using full-grain English leather, featuring traditional wingtip decorative perforations (broguing). A speed-lace hook system ensures convenient on-and-off, while the double-layered storm welt construction provides moisture barrier. This boot ages beautifully, developing a spectacular vintage patina unique to your stride.',
    category: 'Leather Shoes',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486308512493-ae6a1e530099?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Hand-Waxed Mahogany', 'Vintage Chestnut', 'Matte Coal Black'],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    badge: 'Exclusive',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    features: [
      'Full-grain burnished English calfskin leather',
      'Authentic decorative wingtip perforations',
      'Heavy-duty reinforced brass speed-hooks',
      'Waterproof 360-degree Goodyear storm-welt stitch',
      'Vibram® rubber sole insert for non-slip grip'
    ]
  },
  {
    id: 's9',
    name: 'Soleil Elegant Heel Sandal',
    price: 13999,
    rating: 4.7,
    reviewsCount: 51,
    description: 'Graceful, strappy high heel sandals with block-heel support and metallic vegan-leather micro-straps.',
    longDescription: 'Conquer any wedding, summer gala, or dinner date with perfect balance. The Soleil Elegant Sandal presents a highly structured aesthetic with fine, delicate geometric straps that cross beautifully at the ankle. A 2.5-inch block heel gives you elegant height without causing strain on your arches. Complete with anti-slip micro-suede pads and dual-density memory foam embedded directly inside the insole for all-night dance comfort.',
    category: 'Sandals',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Brushed Platinum Gold', 'Sophisticated Nude Pink', 'Sleek Midnight Satin'],
    sizes: [35, 36, 37, 38, 39, 40],
    badge: 'Trending',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    features: [
      'Hypoallergenic metallic vegan-leather straps',
      'Comfortable, balanced 2.5-inch block heel',
      'Adjustable buckle closure with elastic tension relief',
      'Ergonomic high-density latex cushion insole',
      'Synthetic high-grip slip-resistant forefoot'
    ]
  },
  {
    id: 's10',
    name: 'Horizon Active Sport Sandal',
    price: 7500,
    originalPrice: 9999,
    rating: 4.4,
    reviewsCount: 78,
    description: 'Ultra-durable, quick-dry active sandals with triple adjustable velcro straps and shock-absorbing EVA arches.',
    longDescription: 'From river crossing to casual city trail walking, the Horizon Active Sport Sandal provides absolute lock-down support. Made with 100% recycled quick-drying webbing straps that hold their structure wet or dry. The contoured shock-absorbing ShoxShield EVA midsole cushions every heel strike, while the non-marking SpiderRubber outsole bites into slippery rock, mud, or asphalt with ultimate security.',
    category: 'Sandals',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Adventure Olive Green', 'Stealth Tech Gray', 'Retro Tribal Red'],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    badge: 'Sale',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    features: [
      '100% recycled, quick-dry polyester web straps',
      'Three adjustable velcro loop points for custom fit',
      'Contoured supportive arch with ShoxShield cushion',
      'Non-marking SpiderRubber outdoor traction grip',
      'Treat-fresh antimicrobial shield limits odors'
    ]
  },
  {
    id: 's11',
    name: 'Prism Glide Aura Sneaker',
    price: 14500,
    rating: 4.7,
    reviewsCount: 56,
    description: 'Women’s ultra-cushioned running/lifestyle shoe with holographic iridescent heels and sleek slip-on mesh knit.',
    longDescription: 'Step into the light. The Prism Glide Aura combines a futuristic fly-knit sock collar with a dazzling iridescent chrome heel counter that reflects ambient colors. Featuring a plush responsive ReactFoam cushioning, it provides soft pillows of comfort for every step of your day. The convenient pull-tabs and stretch slip-on closure make it perfect for active lifestyles and quick transitions.',
    category: 'Sneakers',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Iridescent Aura White', 'Twilight Violet Mesh', 'Stealth Metallic Dark'],
    sizes: [36, 37, 38, 39, 40, 41],
    badge: 'Hot',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    features: [
      'Second-skin high-stretch engineered fly-knit',
      'Futuristic iridescent anti-rollover heel clip',
      'Reactive high-rebound cushioning formula',
      'Reflective details for twilight safety',
      'Washable shoe technology (air dry recommended)'
    ]
  },
  {
    id: 's12',
    name: 'Regal Tassel Leather Loafer',
    price: 21999,
    originalPrice: 24500,
    rating: 4.8,
    reviewsCount: 92,
    description: 'Luxurious men’s hand-burnished leather slip-on loafers featuring hand-braided tassels and elegant dress-toe box.',
    longDescription: 'The Regal Tassel Loafer is the quintessential expression of preppy elegance. Handcrafted from top-tier, selected full-grain calfskin leather and burnished to a high-contrast vintage patina. Fitted with soft-lined interiors, a leather padded footbed, and featuring twin hand-rolled braided tassels with leather side-laces. Ideal for adding a continental flair to linen tailoring, chinos, or smart blazers.',
    category: 'Leather Shoes',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486308512493-ae6a1e530099?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['Vintage Chestnut Brown', 'Rich Burgundy Suede', 'Deep Obsidian Black'],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    badge: 'Sale',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    features: [
      'Premium hand-burnished calfskin leather upper',
      'Traditional hand-stitched beefroll and tassel',
      'Soft genuine glove leather lining',
      'Breathable leather outsole with rubber traction forefoot',
      'Hand-crafted heel stack details'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Haris Khan',
    rating: 5,
    date: 'July 14, 2026',
    comment: 'The Vanguard Oxfords are absolute masterpieces. Extremely comfortable right out of the box. The burnishing on the leather is gorgeous. Easily worth twice the price!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'r2',
    author: 'Ayesha Malik',
    rating: 5,
    date: 'June 28, 2026',
    comment: 'I ordered the Nova Retro Cloud Runners and they are so stylish! I get compliments on campus all the time. Walking on them really feels like clouds.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'r3',
    author: 'Bilal Ahmed',
    rating: 4,
    date: 'July 09, 2026',
    comment: 'AeroStride Pro Neon is a great running shoe. Highly responsive cushioning. I trimmed 30 seconds off my 5K time. Delivery was super fast within 2 days in Lahore.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'r4',
    author: 'Zainab Jamil',
    rating: 5,
    date: 'July 18, 2026',
    comment: 'Serena Slide Sandals are super minimal and beautiful! The leather is incredibly soft and does not bite. Fits true to size. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop'
  }
];

export const FAQS = [
  {
    q: 'Do you offer free delivery across Pakistan?',
    a: 'Yes, we offer complimentary premium shipping on all orders nationwide, including Karachi, Lahore, Islamabad, Faisalabad, and other cities. There are no hidden charges.'
  },
  {
    q: 'What is your size exchange and return policy?',
    a: 'We offer a hassle-free 15-day size exchange and return policy. If your shoes do not fit perfectly, simply contact our support team and we will arrange a reverse pickup from your doorstep at zero cost.'
  },
  {
    q: 'Are your leather products made of 100% genuine leather?',
    a: 'Absolutely. All products in our Leather Shoes category and leather sandals are handcrafted with 100% full-grain genuine calfskin, nubuck, or English leather sourced from premium tanneries.'
  },
  {
    q: 'How should I clean and maintain my sneakers or leather shoes?',
    a: 'For sneakers, we recommend light spot-cleaning with a soft brush and warm soapy water. For leather shoes, we recommend applying a high-quality wax polish and leather conditioner every few weeks to keep the skin hydrated and glowing. Do not wash leather shoes in a washing machine.'
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes! We support cash on delivery across Pakistan as well as secure credit/debit card checkout visuals. You only pay when the parcel is delivered to your hand.'
  }
];
