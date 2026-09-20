export const SITE_NAME = 'Zoplit';
export const TAGLINE = 'CREATIVE EXECUTION • MADE SIMPLE';
export const CITY = '[YOUR CITY]';
export const WHATSAPP_NUMBER = '919381678069';
export const WHATSAPP_PRESET_MESSAGE =
  "Hi Zoplit! I'd like to start a creative project. My requirement is: ";
export const WHATSAPP = WHATSAPP_NUMBER;

export type ServiceSlug =
  | 'photography'
  | 'videography'
  | 'video-editing'
  | 'reels-shortform'
  | 'product-shoots';

export interface ServiceConfig {
  slug: ServiceSlug;
  name: string;
  shortDesc: string;
  icon: string;
  intro: string;
  offerings: string[];
  audience: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES: ServiceConfig[] = [
  {
    slug: 'photography',
    name: 'Photography',
    shortDesc: 'Event, brand and commercial shoots at your location.',
    icon: 'Camera',
    intro:
      'Professional photography for events, brands, products and commercial use. Our verified photographers arrive on time, understand your brief, and deliver polished images ready for use across web, social and print.',
    offerings: [
      'Event coverage — conferences, launches, ceremonies and corporate gatherings',
      'Brand photography — lifestyle, team, office and behind-the-scenes shoots',
      'Commercial photography — ad campaigns, product-in-use and lifestyle imagery',
      'On-location shoots — we come to your venue, studio or outdoor location',
      'Edited and colour-graded images delivered in high resolution',
    ],
    audience: [
      'Businesses launching a product or campaign',
      'Event organisers needing full coverage',
      'Brands refreshing their visual identity',
      'Teams needing professional headshots and culture shots',
    ],
    process: [
      'Share your brief — event type, date, location and shot list',
      'We match you with a photographer whose portfolio fits your style',
      'You approve a fixed quote — no back-and-forth negotiation',
      'The photographer shoots on the scheduled day with your brief in hand',
      'Edited photos are delivered, checked by us, and handed over to you',
    ],
    faqs: [
      {
        question: 'How many photos do I receive?',
        answer:
          'The number depends on the scope of your shoot. Your fixed quote will mention the deliverable count upfront — typically 30–80 edited images for events and 15–40 for brand shoots.',
      },
      {
        question: 'Do you provide raw files?',
        answer:
          'Deliverables are edited, colour-graded high-resolution JPEGs. Raw files can be requested as an add-on — mention it in your brief and we will include it in your quote.',
      },
    ],
  },
  {
    slug: 'videography',
    name: 'Videography',
    shortDesc: 'Reels, event films, brand videos — shot and delivered end to end.',
    icon: 'Video',
    intro:
      'End-to-end video production — from concept to final cut. Our creators handle filming, direction, editing and delivery so you receive a finished video ready to publish or present.',
    offerings: [
      'Event films — highlights, after-movies and full coverage',
      'Brand videos — company profiles, culture films and explainer videos',
      'Ad films — short promotional videos for campaigns and launches',
      'Reels and short-form content — shot and edited for social platforms',
      'On-location filming with professional audio and lighting setup',
    ],
    audience: [
      'Brands producing a promotional or explainer video',
      'Event organisers wanting a cinematic recap',
      'Startups needing a company or product film',
      'Marketing teams running video campaigns',
    ],
    process: [
      'Share your brief — video type, duration, date and location',
      'We match you with a videographer whose reel fits your vision',
      'You approve a fixed quote with deliverables and timeline',
      'Filming happens on schedule with the agreed equipment and crew',
      'The edited video is delivered, reviewed by us, and handed over',
    ],
    faqs: [
      {
        question: 'What is the typical turnaround time?',
        answer:
          'Event highlight reels are usually delivered in 3–5 working days. Longer brand or ad films can take 7–14 days depending on length and complexity. Your quote will include a delivery date.',
      },
      {
        question: 'Can I request changes after delivery?',
        answer:
          'Yes — one revision round is included with every project. If something does not match your brief, we revise until it does.',
      },
    ],
  },
  {
    slug: 'video-editing',
    name: 'Video Editing',
    shortDesc: 'Send us your raw footage. Get clean, ready-to-post edits.',
    icon: 'Film',
    intro:
      'Already have footage but no time to edit? Send us your raw files and our editors deliver clean, platform-ready videos — cuts, transitions, colour, captions and audio sync all handled.',
    offerings: [
      'Long-form video editing — YouTube, podcasts, interviews and talks',
      'Short-form editing — reels, shorts and TikTok-ready vertical cuts',
      'Colour correction and grading for a consistent cinematic look',
      'Audio cleanup — noise reduction, levelling and background music sync',
      'Subtitles and captions burned in or delivered as separate files',
    ],
    audience: [
      'Content creators with raw footage and no editing time',
      'Businesses repurposing webinars, talks or event footage',
      'Podcasters needing video clips for social media',
      'Marketing teams producing video at scale',
    ],
    process: [
      'Upload your raw footage and share your editing brief',
      'We match you with an editor experienced in your content type',
      'You approve a fixed quote based on footage length and complexity',
      'The editor cuts, grades and polishes your video to the brief',
      'The final edit is delivered, checked by us, and handed over',
    ],
    faqs: [
      {
        question: 'How do I send my footage?',
        answer:
          'You can share via Google Drive, Dropbox or any file transfer link. After you submit your project, we will send you a upload link and instructions.',
      },
      {
        question: 'What if I need a specific editing style?',
        answer:
          'Share reference videos or a style guide in your brief. Your editor will follow it and you get one revision round to fine-tune the result.',
      },
    ],
  },
  {
    slug: 'reels-shortform',
    name: 'Reels & Short-form',
    shortDesc: 'Scroll-stopping short videos built for Instagram and YouTube.',
    icon: 'Smartphone',
    intro:
      'Short-form video is how brands get discovered. Our creators produce scroll-stopping reels and shorts — scripted, shot and edited for maximum retention on Instagram, YouTube and beyond.',
    offerings: [
      'Scripted reels with hooks, transitions and trending formats',
      'Product showcase reels for launches and e-commerce',
      'Talking-head and explainer shorts for thought leadership',
      'Batch production — multiple reels shot in one session',
      'Vertical editing with captions, text overlays and sound design',
    ],
    audience: [
      'Brands building presence on Instagram and YouTube Shorts',
      'E-commerce sellers showcasing products in motion',
      'Founders and executives creating thought-leadership content',
      'Marketing teams needing a steady pipeline of short-form content',
    ],
    process: [
      'Share your goals — platform, quantity, style and content themes',
      'We match you with a creator who specialises in short-form video',
      'You approve a fixed quote covering scripting, shooting and editing',
      'The creator shoots and edits the reels to the agreed brief',
      'Finished reels are delivered, checked by us, and handed over',
    ],
    faqs: [
      {
        question: 'Can I get multiple reels in one project?',
        answer:
          'Yes — batch production is one of our most popular options. You can request 4, 8 or 12 reels in a single project. Your quote will reflect the quantity and complexity.',
      },
      {
        question: 'Do you write the scripts?',
        answer:
          'Yes, scriptwriting is included. Share your topic, key points and tone, and the creator will write hooks and scripts before shooting.',
      },
    ],
  },
  {
    slug: 'product-shoots',
    name: 'Product Shoots',
    shortDesc: 'Catalogue, e-commerce and social-ready product photography.',
    icon: 'Package',
    intro:
      'Clean, consistent product photography that makes your catalogue look premium. From e-commerce white-background shots to lifestyle product images — we handle styling, lighting and editing.',
    offerings: [
      'E-commerce catalogue shots — clean white or coloured backgrounds',
      'Lifestyle product photography — products in real-world settings',
      'Social media product imagery — creative flat-lays and styled shots',
      '360-degree product spins and detail close-ups',
      'Bulk editing — consistent lighting, cropping and retouching across sets',
    ],
    audience: [
      'E-commerce brands needing catalogue imagery',
      'D2C sellers launching new product lines',
      'Marketplace sellers needing platform-compliant images',
      'Social media managers needing product content',
    ],
    process: [
      'Share your product list, shot requirements and reference images',
      'We match you with a product photographer whose style fits your brand',
      'You approve a fixed quote based on product count and shot type',
      'Products are shot in studio or on location with proper lighting',
      'Edited images are delivered, checked by us, and handed over',
    ],
    faqs: [
      {
        question: 'Do I need to send my products to a studio?',
        answer:
          'Not necessarily. We can shoot at your location or you can ship products to the photographer. The best option depends on your product type and quantity — mention your preference in the brief.',
      },
      {
        question: 'How many angles per product?',
        answer:
          'Standard e-commerce packages include 3–5 angles per product. Lifestyle and creative shots are quoted separately. Your quote will list the exact deliverables per product.',
      },
    ],
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'For Creators', href: '/become-a-creator' },
  { label: 'About', href: '/about' },
];

export const FOOTER_EXPLORE: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_GET_STARTED: NavLink[] = [
  { label: 'Start a Project', href: '/start-project' },
  { label: 'Become a Creator', href: '/become-a-creator' },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
];

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'CLIENTS',
    question: 'What is Zoplit?',
    answer:
      'Zoplit is a creative execution platform. You tell us what you need — photography, video, editing, reels or product shoots — and we match you with a verified creator, manage the project and deliver finished work.',
  },
  {
    category: 'CLIENTS',
    question: 'How does booking work?',
    answer:
      'Submit a project through our form or WhatsApp. We match you with a creator, send you a fixed quote, and once you approve, the project is scheduled and managed end to end.',
  },
  {
    category: 'CLIENTS',
    question: 'How do payments work?',
    answer: 'You pay Zoplit directly, never the creator.',
  },
  {
    category: 'CLIENTS',
    question: 'What if I don\'t like the work?',
    answer:
      'One revision round is included. Confirmed booking issues lead to a replacement creator — we make it right.',
  },
  {
    category: 'CLIENTS',
    question: 'Who owns the content?',
    answer: 'You do. Full usage rights are transferred to you upon delivery.',
  },
  {
    category: 'CLIENTS',
    question: 'Can I request a specific creator?',
    answer:
      'Yes, mention it in your brief and we will do our best to match you with that creator based on their availability.',
  },
  {
    category: 'CREATORS',
    question: 'Who can join?',
    answer:
      'Any creative professional with a portfolio — photographers, videographers, editors and content creators. You need to pass our verification process, which includes an ID check, portfolio review and a paid test project.',
  },
  {
    category: 'CREATORS',
    question: 'How do I get projects?',
    answer:
      'Once verified, you receive project briefs that match your skills and location. You accept the ones that work for you — we handle the client side.',
  },
  {
    category: 'CREATORS',
    question: 'When am I paid?',
    answer:
      'Payment is released after the project is delivered and approved by the client. We handle collection so you never have to chase payments.',
  },
  {
    category: 'GENERAL',
    question: 'Where is Zoplit available?',
    answer: `Currently ${CITY} and nearby areas.`,
  },
  {
    category: 'GENERAL',
    question: 'How do I get support?',
    answer: 'WhatsApp is the fastest way to reach us.',
  },
];

export const BUDGET_OPTIONS = [
  'Under ₹5,000',
  '₹5,000–10,000',
  '₹10,000–25,000',
  '₹25,000+',
];

export const EXPERIENCE_OPTIONS = ['0–1yr', '1–3yrs', '3yrs+'];

export const CREATOR_SKILLS = [
  'Photography',
  'Videography',
  'Video Editing',
  'Reels & Short-form',
  'Product Shoots',
];

export const CONTACT_SUBJECTS = [
  'General Enquiry',
  'Project Question',
  'Creator Application',
  'Partnership',
  'Other',
];
