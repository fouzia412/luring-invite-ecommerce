// src\data\products.ts
export interface Product {
  id: string;
  title: string;
  slug: string;
  category: "ai-video-invites" | "digital-invites";
  collection: string;
  collectionSlug: string;
  priceFrom: number;
  tags: string[];
  deliveryTime: "24h" | "48h" | "72h";
  styles: ("Royal" | "Minimal" | "Modern" | "Traditional" | "Floral" | "Cinematic")[];
  languages: ("Telugu" | "Hindi" | "English")[];
  thumbnail: string;
  previewImages: string[];
  bestSeller: boolean;
  isNew: boolean;
  description: string;
  whatIncluded: string[];
  revisionPolicy: string;
  deliverables: string[];

  // ✅ Add this
  video?: ProductVideo;

  // New fields for enhanced filtering
  religion?: ("Hindu" | "Muslim" | "Christian" | "Sikh" | "Jain" | "Other")[];
  region?: ("South Indian" | "North Indian" | "East Indian" | "West Indian" | "Other")[];
  subOccasion?: string[]; // e.g., ["1st Anniversary", "Silver Jubilee"] or ["1st Birthday", "Sweet 16"]
}


export interface Collection {
  id: string;
  title: string;
  slug: string;
  category: 'ai-video-invites' | 'digital-invites';
  description: string;
  thumbnail: string;
  productCount: number;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  collections: string[];
  thumbnail: string;
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    title: 'AI Video Invites',
    slug: 'ai-video-invites',
    description: 'Stunning AI-powered video invitations that bring your special moments to life with cutting-edge technology.',
    collections: ['3d-ai-video', 'storyboard'],
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    id: 'cat-2',
    title: 'Digital Invites',
    slug: 'digital-invites',
    description: 'Elegant digital invitations crafted with love for every occasion.',
    collections: ['pdf-invites', 'wedding-invites', 'anniversary', 'house-warming', 'birthday', 'baby-showers', 'stationery', 'logo', 'caricature'],
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  },
];

export const collections: Collection[] = [
  // AI Video Invites Collections
  {
    id: 'col-1',
    title: '3D AI Video',
    slug: '3d-ai-video',
    category: 'ai-video-invites',
    description: 'Immersive 3D animated invitations powered by artificial intelligence.',
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    productCount: 5,
  },
  {
    id: 'col-2',
    title: 'Storyboard',
    slug: 'storyboard',
    category: 'ai-video-invites',
    description: 'Narrative-driven video invitations that tell your love story.',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    productCount: 4,
  },
  // Digital Invites Collections
  {
    id: 'col-3',
    title: 'PDF Invites',
    slug: 'pdf-invites',
    category: 'digital-invites',
    description: 'Beautifully designed PDF invitations ready to share.',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
    productCount: 6,
  },
  {
    id: 'col-4',
    title: 'Wedding Invites',
    slug: 'wedding-invites',
    category: 'digital-invites',
    description: 'Timeless wedding invitations for your special day.',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    productCount: 8,
  },
  {
    id: 'col-5',
    title: 'Anniversary',
    slug: 'anniversary',
    category: 'digital-invites',
    description: 'Celebrate years of love with elegant anniversary invites.',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'col-6',
    title: 'House Warming',
    slug: 'house-warming',
    category: 'digital-invites',
    description: 'Welcome guests to your new home in style.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'col-7',
    title: 'Birthday',
    slug: 'birthday',
    category: 'digital-invites',
    description: 'Make birthdays memorable with custom invitations.',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    productCount: 5,
  },
  {
    id: 'col-8',
    title: 'Baby Showers',
    slug: 'baby-showers',
    category: 'digital-invites',
    description: 'Adorable invites to celebrate the little one.',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'col-9',
    title: 'Stationery',
    slug: 'stationery',
    category: 'digital-invites',
    description: 'Complete wedding stationery suites and sets.',
    thumbnail: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'col-10',
    title: 'Logo Design',
    slug: 'logo',
    category: 'digital-invites',
    description: 'Custom couple logos and wedding monograms.',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'col-11',
    title: 'Caricature',
    slug: 'caricature',
    category: 'digital-invites',
    description: 'Fun and personalized caricature invitations.',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'col-12',
    title: 'AI Wedding Invites',
    slug: 'wedding-invites',
    category: 'ai-video-invites',
    description: 'Timeless wedding invitations for your special day.',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    productCount: 8,
  },
  {
    id: 'col-13',
    title: 'Anniversary-AI Invites',
    slug: 'anniversary',
    category: 'ai-video-invites',
    description: 'Celebrate years of love with elegant anniversary invites.',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'col-14',
    title: 'House Warming-AI Invites',
    slug: 'house-warming',
    category: 'ai-video-invites',
    description: 'Welcome guests to your new home in style.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'col-15',
    title: 'Birthday-AI Invites',
    slug: 'birthday',
    category: 'ai-video-invites',
    description: 'Make birthdays memorable with custom invitations.',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    productCount: 5,
  },
  {
    id: 'col-16',
    title: 'Baby Showers-AI Invites',
    slug: 'baby-showers',
    category: 'ai-video-invites',
    description: 'Adorable invites to celebrate the little one.',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    productCount: 4,
  },
];


//video and digital products
export type VideoPlatform = "local" | "youtube" | "instagram" | "pinterest";

export interface ProductVideo {
  platform: VideoPlatform;
  url: string;        // IG/YT/Pinterest link OR local mp4 path like "/videos/demo.mp4"
  thumbnail?: string; // optional poster/preview override (you can skip this)
}

export const products: Product[] = [
  {
    id: "prod-1",
    title: "Royal 3D Palace Invitation",
    slug: "royal-3d-palace-invitation",
    category: "ai-video-invites",
    collection: "3D AI Video",
    collectionSlug: "3d-ai-video",
    priceFrom: 4999,
    tags: ["Premium", "AI Powered", "3D Animation"],
    deliveryTime: "72h",
    styles: ["Royal", "Cinematic"],
    languages: ["Telugu", "Hindi", "English"],
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    ],
    bestSeller: true,
    isNew: false,
    description:
      "Experience the grandeur of royalty with our stunning 3D palace invitation. AI-crafted visuals bring your wedding story to life.",
    whatIncluded: [
      "60-90 second video",
      "Custom 3D palace environment",
      "AI voice narration",
      "Background music",
      "2 revision rounds",
    ],
    revisionPolicy:
      "Up to 2 revision rounds included. Additional revisions at ₹500 each.",
    deliverables: [
      "MP4 video (1080p)",
      "WhatsApp optimized version",
      "Instagram Reel version",
    ],

    // ✅ VIDEO SUPPORT (this enables play button in Best Sellers)
    video: {
      platform: "local", // local | youtube | instagram | pinterest
      url: "/videos/1.mp4",
      // thumbnail: "/videos/royal-3d-palace-poster.jpg" // optional
    },
  },

  {
    id: 'prod-2',
    title: 'Modern Minimal AI Video',
    slug: 'modern-minimal-ai-video',
    category: 'ai-video-invites',
    collection: '3D AI Video',
    collectionSlug: '3d-ai-video',
    priceFrom: 3499,
    tags: ['Minimal', 'AI Powered', 'Trending'],
    deliveryTime: '48h',
    styles: ['Minimal', 'Modern'],
    languages: ['Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    ],
    bestSeller: true,
    isNew: true,
    description: 'Clean, contemporary design meets AI innovation. Perfect for modern couples who appreciate understated elegance.',
    whatIncluded: ['45-60 second video', 'Minimal animation style', 'Typography focus', 'Background music', '1 revision round'],
    revisionPolicy: '1 revision round included. Additional revisions at ₹500 each.',
    deliverables: ['MP4 video (1080p)', 'WhatsApp optimized version'],
  },
  {
    id: 'prod-3',
    title: 'Floral Garden 3D Invite',
    slug: 'floral-garden-3d-invite',
    category: 'ai-video-invites',
    collection: '3D AI Video',
    collectionSlug: '3d-ai-video',
    priceFrom: 3999,
    tags: ['Floral', 'Romantic', '3D'],
    deliveryTime: '72h',
    styles: ['Floral', 'Traditional'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    ],
    bestSeller: false,
    isNew: false,
    description: 'A blooming garden of love with realistic 3D flowers and butterflies. Perfect for nature-loving couples.',
    whatIncluded: ['60 second video', '3D floral environment', 'Butterfly animations', 'Romantic music', '2 revision rounds'],
    revisionPolicy: 'Up to 2 revision rounds included.',
    deliverables: ['MP4 video (1080p)', 'WhatsApp optimized version'],
  },
  // Storyboard Products
  {
    id: 'prod-4',
    title: 'Love Story Timeline',
    slug: 'love-story-timeline',
    category: 'ai-video-invites',
    collection: 'Storyboard',
    collectionSlug: 'storyboard',
    priceFrom: 5499,
    tags: ['Story', 'Personal', 'Cinematic'],
    deliveryTime: '72h',
    styles: ['Cinematic', 'Modern'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    ],
    bestSeller: true,
    isNew: false,
    description: 'Tell your love story from first meeting to wedding day. A cinematic journey through your relationship milestones.',
    whatIncluded: ['2-3 minute video', 'Custom storyboard', 'Photo integration', 'Voice narration option', '3 revision rounds'],
    revisionPolicy: 'Up to 3 revision rounds included.',
    deliverables: ['MP4 video (1080p)', 'YouTube version', 'WhatsApp version'],
  },
  // Wedding Invites
  {
    id: 'prod-5',
    title: 'Traditional Telugu Wedding',
    slug: 'traditional-telugu-wedding',
    category: 'digital-invites',
    collection: 'Wedding Invites',
    collectionSlug: 'wedding-invites',
    priceFrom: 1499,
    tags: ['Traditional', 'Telugu', 'Cultural'],
    deliveryTime: '24h',
    styles: ['Traditional', 'Royal'],
    languages: ['Telugu', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
    ],
    bestSeller: true,
    isNew: false,
    description: 'Embrace Telugu traditions with our beautifully crafted digital invitation featuring traditional motifs and cultural elements.',
    whatIncluded: ['Digital PDF invite', 'Event schedule', 'Venue maps', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['High-res PDF', 'WhatsApp image', 'Instagram story'],
    religion: ['Hindu'],
    region: ['South Indian'],
    subOccasion: ["traditional-wedding", "wedding-invite"]
  },
  {
    id: 'prod-6',
    title: 'Royal Hindu Wedding Suite',
    slug: 'royal-hindu-wedding-suite',
    category: 'digital-invites',
    collection: 'Wedding Invites',
    collectionSlug: 'wedding-invites',
    priceFrom: 2499,
    tags: ['Royal', 'Hindu', 'Complete Suite'],
    deliveryTime: '48h',
    styles: ['Royal', 'Traditional'],
    languages: ['Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    ],
    bestSeller: true,
    isNew: true,
    description: 'A complete royal wedding stationery suite with matching designs for all your pre-wedding and wedding events.',
    whatIncluded: ['5 event cards', 'Save the date', 'RSVP card', 'Thank you card', '2 revisions'],
    revisionPolicy: '2 revisions included.',
    deliverables: ['All cards in PDF', 'Print-ready files', 'Social media sizes'],
    religion: ['Hindu'],
    region: ['North Indian'],
    subOccasion: ["wedding-stationery", "save-the-date", "reception-invite"]
  },
  {
    id: 'prod-7',
    title: 'Modern Minimal Wedding',
    slug: 'modern-minimal-wedding',
    category: 'digital-invites',
    collection: 'Wedding Invites',
    collectionSlug: 'wedding-invites',
    priceFrom: 999,
    tags: ['Minimal', 'Modern', 'Quick'],
    deliveryTime: '24h',
    styles: ['Minimal', 'Modern'],
    languages: ['Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    ],
    bestSeller: false,
    isNew: true,
    description: 'Clean lines, elegant typography, and sophisticated simplicity. Perfect for contemporary couples.',
    whatIncluded: ['Digital invite', 'Event details', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['PDF', 'WhatsApp image'],
    religion: ['Other'],
    region: ['Other'],
    subOccasion: ["modern-wedding", "wardrobe-planner"]
  },
  // Birthday
  {
    id: 'prod-8',
    title: 'Kids Birthday Bash',
    slug: 'kids-birthday-bash',
    category: 'digital-invites',
    collection: 'Birthday',
    collectionSlug: 'birthday',
    priceFrom: 799,
    tags: ['Kids', 'Fun', 'Colorful'],
    deliveryTime: '24h',
    styles: ['Modern', 'Floral'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    ],
    bestSeller: true,
    isNew: false,
    description: 'Vibrant and playful birthday invitations perfect for your little one\'s special day.',
    whatIncluded: ['Digital invite', 'Party details', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['PDF', 'WhatsApp image'],
    subOccasion: ['1st-birthday', 'kids-birthday'],
  },
  // Anniversary
  {
    id: 'prod-9',
    title: 'Silver Jubilee Celebration',
    slug: 'silver-jubilee-celebration',
    category: 'digital-invites',
    collection: 'Anniversary',
    collectionSlug: 'anniversary',
    priceFrom: 1299,
    tags: ['Anniversary', 'Elegant', 'Silver'],
    deliveryTime: '24h',
    styles: ['Royal', 'Traditional'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    ],
    bestSeller: false,
    isNew: false,
    description: 'Celebrate 25 years of love with an elegant silver-themed anniversary invitation.',
    whatIncluded: ['Digital invite', 'Event details', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['PDF', 'WhatsApp image'],
    subOccasion: ['silver-jubilee'],
  },
  // Logo
  {
    id: 'prod-10',
    title: 'Couple Monogram Logo',
    slug: 'couple-monogram-logo',
    category: 'digital-invites',
    collection: 'Logo Design',
    collectionSlug: 'logo',
    priceFrom: 1999,
    tags: ['Logo', 'Custom', 'Monogram'],
    deliveryTime: '48h',
    styles: ['Modern', 'Minimal', 'Royal'],
    languages: ['English'],
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    ],
    bestSeller: true,
    isNew: false,
    description: 'A unique monogram combining your initials into a beautiful wedding logo.',
    whatIncluded: ['3 logo concepts', 'Final logo files', 'Color variations', '2 revisions'],
    revisionPolicy: '2 revision rounds included.',
    deliverables: ['PNG', 'SVG', 'PDF', 'Color + B&W versions'],
    subOccasion: ["wedding-stationery"]
  },
  // Caricature
  {
    id: 'prod-11',
    title: 'Fun Couple Caricature',
    slug: 'fun-couple-caricature',
    category: 'digital-invites',
    collection: 'Caricature',
    collectionSlug: 'caricature',
    priceFrom: 2499,
    tags: ['Caricature', 'Fun', 'Custom'],
    deliveryTime: '72h',
    styles: ['Modern', 'Floral'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    ],
    bestSeller: true,
    isNew: true,
    description: 'Get a custom caricature of you and your partner, perfect for invites and wedding decor.',
    whatIncluded: ['Custom couple caricature', 'Background theme', 'Outfit customization', '2 revisions'],
    revisionPolicy: '2 revision rounds included.',
    deliverables: ['High-res PNG', 'Print-ready PDF'],
    subOccasion: ["wedding-invite", "reception-invite"]
  },
  // House Warming
  {
    id: 'prod-12',
    title: 'New Home Celebration',
    slug: 'new-home-celebration',
    category: 'digital-invites',
    collection: 'House Warming',
    collectionSlug: 'house-warming',
    priceFrom: 899,
    tags: ['House Warming', 'Traditional', 'Auspicious'],
    deliveryTime: '24h',
    styles: ['Traditional', 'Modern'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    bestSeller: false,
    isNew: false,
    description: 'Welcome guests to your new home with a beautifully designed griha pravesh invitation.',
    whatIncluded: ['Digital invite', 'Pooja details', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['PDF', 'WhatsApp image'],
    religion: ['Hindu'],
    region: ['South Indian'],
    subOccasion: ["griha-pravesh", "new-home"]
  },
  // Baby Shower
  {
    id: 'prod-13',
    title: 'Cute Baby Shower',
    slug: 'cute-baby-shower',
    category: 'digital-invites',
    collection: 'Baby Showers',
    collectionSlug: 'baby-showers',
    priceFrom: 899,
    tags: ['Baby Shower', 'Cute', 'Adorable'],
    deliveryTime: '24h',
    styles: ['Modern', 'Floral'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    ],
    bestSeller: true,
    isNew: false,
    description: 'Adorable baby shower invitations with cute illustrations and soft colors.',
    whatIncluded: ['Digital invite', 'Party details', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['PDF', 'WhatsApp image'],
    subOccasion: ["boy", "girl", "gender-neutral"]
  },
  // PDF Invites
  {
    id: 'prod-14',
    title: 'Elegant PDF Wedding Card',
    slug: 'elegant-pdf-wedding-card',
    category: 'digital-invites',
    collection: 'PDF Invites',
    collectionSlug: 'pdf-invites',
    priceFrom: 699,
    tags: ['PDF', 'Quick', 'Budget'],
    deliveryTime: '24h',
    styles: ['Traditional', 'Minimal'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
    ],
    bestSeller: false,
    isNew: false,
    description: 'Simple, elegant, and ready in 24 hours. Perfect for quick wedding announcements.',
    whatIncluded: ['PDF invite card', '1 revision'],
    revisionPolicy: '1 revision included.',
    deliverables: ['PDF'],
    religion: ['Muslim'],
    region: ['North Indian'],
    subOccasion: ["wedding-invite", "save-the-date"]
  },
  // Stationery
  {
    id: 'prod-15',
    title: 'Complete Wedding Stationery',
    slug: 'complete-wedding-stationery',
    category: 'digital-invites',
    collection: 'Stationery',
    collectionSlug: 'stationery',
    priceFrom: 3499,
    tags: ['Complete', 'Premium', 'Suite'],
    deliveryTime: '72h',
    styles: ['Royal', 'Floral', 'Traditional'],
    languages: ['Telugu', 'Hindi', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
    ],
    bestSeller: true,
    isNew: false,
    description: 'Complete wedding stationery suite including invites, programs, menus, and more.',
    whatIncluded: ['Main invite', 'Save the date', 'RSVP', 'Menu', 'Program', 'Thank you', '3 revisions'],
    revisionPolicy: '3 revision rounds included.',
    deliverables: ['All items in PDF', 'Print-ready files'],
    religion: ['Christian'],
    region: ['South Indian'],
    subOccasion: ["wedding-stationery", "wardrobe-planner", "reception-invite"]
  },
];

export const processSteps = [
  {
    id: 1,
    title: 'Logo Design',
    description: 'We create a unique couple monogram or wedding logo that reflects your personality.',
    turnaround: '24-48 hours',
    icon: 'Palette',
  },
  {
    id: 2,
    title: 'Caricature',
    description: 'Our artists craft a fun, personalized caricature of you and your partner.',
    turnaround: '48-72 hours',
    icon: 'PenTool',
  },
  {
    id: 3,
    title: 'Slides Design',
    description: 'We design beautiful invitation slides with all your event details.',
    turnaround: '24-48 hours',
    icon: 'Layers',
  },
  {
    id: 4,
    title: 'Video Preview',
    description: 'Review your video invitation draft with background music and animations.',
    turnaround: '48-72 hours',
    icon: 'Play',
  },
  {
    id: 5,
    title: 'Revisions',
    description: 'We make adjustments based on your feedback to perfect every detail.',
    turnaround: '24-48 hours',
    icon: 'RefreshCw',
  },
  {
    id: 6,
    title: 'Final Delivery',
    description: 'Receive your final invitation in multiple formats ready to share.',
    turnaround: 'Same day',
    icon: 'CheckCircle',
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul",
    location: "Hyderabad",
    text: "The AI video invitation was beyond our expectations! Our guests were amazed by the quality.",
    rating: 5,
    occasion: "Wedding",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "Sneha Reddy",
    location: "Vijayawada",
    text: "Quick delivery and beautiful design. The team was very responsive to our requirements.",
    rating: 5,
    occasion: "Anniversary",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "Karthik & Divya",
    location: "Chennai",
    text: "The caricature invitation was a hit! Everyone loved the personal touch.",
    rating: 5,
    occasion: "Wedding",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    name: "Lakshmi Devi",
    location: "Bangalore",
    text: "Perfect for our house warming ceremony. Traditional yet modern design.",
    rating: 5,
    occasion: "House Warming",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    name: "Suresh & Padma",
    location: "Guntur",
    text: "The storyboard video brought tears to our eyes. Beautifully crafted love story.",
    rating: 5,
    occasion: "Wedding",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1400&q=80",
  },
];


export const faqs = [
  {
    question: 'How long does it take to receive my invitation?',
    answer: 'Delivery times vary based on the package: PDF invites take 24 hours, standard digital invites take 24-48 hours, and AI video invitations take 48-72 hours. Rush delivery is available for an additional fee.',
  },
  {
    question: 'Can I request changes after receiving the preview?',
    answer: 'Yes! Each package includes revision rounds. PDF invites include 1 revision, standard packages include 2 revisions, and premium packages include 3 revisions. Additional revisions are available at ₹500 each.',
  },
  {
    question: 'What information do I need to provide?',
    answer: 'We need event details (names, dates, venues, timings), your photos (for caricatures/videos), preferred style/colors, and any specific text or religious requirements.',
  },
  {
    question: 'Do you offer services in multiple languages?',
    answer: 'Yes! We offer invitations in Telugu, Hindi, and English. Multi-language invitations are also available upon request.',
  },
  {
    question: 'What formats will I receive?',
    answer: 'You will receive high-resolution files suitable for sharing on WhatsApp, Instagram, and other platforms. Video invites come in MP4 format optimized for social media. Print-ready files are included in premium packages.',
  },
  {
    question: 'How do I share my photos and requirements?',
    answer: 'After placing your enquiry, we will share a detailed form and a secure link where you can upload all your photos and provide your requirements.',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return products.filter((p) => p.collectionSlug === collectionSlug);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.bestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.isNew);
};
export interface TrendingVideoItem {
  id: string;
  productSlug: string; // connects this video to a product (for View + WhatsApp)
  platform: 'local' | 'youtube' | 'instagram' | 'pinterest';
  url: string; // video link (IG/YT/Pinterest) or local mp4 path
  thumbnail?: string; // optional (recommended for IG/Pinterest)
}

export const trendingVideos: TrendingVideoItem[] = [
  {
    id: 'tv-1',
    productSlug: 'royal-3d-palace-invitation',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DS7YuTojLv0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    // thumbnail optional
  },
  // Example YouTube (replace with yours)
  {
    id: 'tv-2',
    productSlug: 'love-story-timeline',
    platform: 'youtube',
    url: '/videos/1.mp4',
  },
  // Example Local MP4 (put file in /public/videos/)
  {
    id: 'tv-3',
    productSlug: 'modern-minimal-ai-video',
    platform: 'local',
    url: '/videos/sample.mp4',
    // thumbnail optional for local videos too (poster)
    // thumbnail: '/videos/sample-poster.jpg',
  },
  {
    id: 'tv-4',
    productSlug: 'modern-minimal-ai-video',
    platform: 'local',
    url: '/videos/sample.mp4',
    // thumbnail optional for local videos too (poster)
    // thumbnail: '/videos/sample-poster.jpg',
  },
  {
    id: 'tv-5',
    productSlug: 'modern-minimal-ai-video',
    platform: 'local',
    url: '/videos/sample.mp4',
    // thumbnail optional for local videos too (poster)
    // thumbnail: '/videos/sample-poster.jpg',
  },
  {
    id: 'tv-6',
    productSlug: 'modern-minimal-ai-video',
    platform: 'local',
    url: '/videos/sample.mp4',
    // thumbnail optional for local videos too (poster)
    // thumbnail: '/videos/sample-poster.jpg',
  },
];

export const getTrendingVideosWithProducts = () => {
  return trendingVideos
    .map((v) => {
      const product = products.find((p) => p.slug === v.productSlug);
      if (!product) return null;
      return { ...v, product };
    })
    .filter(Boolean) as Array<TrendingVideoItem & { product: Product }>;
};