export interface Translations {
  // Navigation
  home: string;
  about: string;
  articles: string;
  contribute: string;
  search: string;
  explore: string;
  navigation: string;
  pages: string;
  language: string;
  
  // Categories
  urbanTrendsGrowth: string;
  infrastructureInvestment: string;
  climateSustainability: string;
  transportMobility: string;
  smartCityTech: string;
  voicesGround: string;
  
  // Homepage sections
  featuredReads: string;
  featuredReadsSubtitle: string;
  noFeaturedArticles: string;
  editorialPillars: string;
  editorialPillarsSubtitle: string;
  featuredArticle: string;
  
  // Newsletter
  stayConnected: string;
  newsletterSubtitle: string;
  enterEmail: string;
  subscribe: string;
  thankYouSubscribe: string;
  
  // Article actions
  readArticle: string;
  viewAllArticles: string;
  backToHomepage: string;
  recently: string;
  
  // Article page
  articleNotFound: string;
  returnToHomepage: string;
  
  // Search
  searchArticles: string;
  searchPlaceholder: string;
  searchResultsFor: string;
  noArticlesFound: string;
  enterSearchTerm: string;
  
  // Tags
  tags: string;
  taggedWith: string;
  articlesFound: string;
  noArticlesWithTag: string;
  
  // General
  by: string;
  noArticles: string;
  loading: string;
  allArticles: string;
  exploreComplete: string;
  
  // Featured Articles
  featuredArticles: string;
  readMore: string;
  editorialDisclaimer: string;
  
  // Footer
  tagline: string;
  followInstagram: string;
  allRightsReserved: string;
  
  // Editorial Pillars
  urbanTrendsGrowthTitle: string;
  urbanTrendsGrowthDesc: string;
  infrastructureInvestmentTitle: string;
  infrastructureInvestmentDesc: string;
  climateSustainabilityTitle: string;
  climateSustainabilityDesc: string;
  transportMobilityTitle: string;
  transportMobilityDesc: string;
  smartCityTechTitle: string;
  smartCityTechDesc: string;
  voicesGroundTitle: string;
  voicesGroundDesc: string;
  
  // Special pages
  urbanVisionStudioAI: string;
  
  // Contribute page
  contributeToUrbanVision: string;
  contributeSubtitle: string;
  whatWereLookingFor: string;
  whatWereLookingForText: string;
  originalResearch: string;
  caseStudies: string;
  criticalPerspectives: string;
  communityStories: string;
  dataInvestigations: string;
  internationalPerspectives: string;
  submissionGuidelines: string;
  articleLength: string;
  featureArticles: string;
  analysisPieces: string;
  opinionPieces: string;
  briefReports: string;
  formatRequirements: string;
  submitInWord: string;
  includeBio: string;
  provideImages: string;
  includeCitations: string;
  suggestTags: string;
  proposalProcess: string;
  proposalProcessText: string;
  mainArgument: string;
  whyTimely: string;
  uniquePerspective: string;
  keySources: string;
  editorialStandards: string;
  editorialStandardsText: string;
  accuracy: string;
  accuracyDesc: string;
  originality: string;
  originalityDesc: string;
  relevance: string;
  relevanceDesc: string;
  clarity: string;
  clarityDesc: string;
  balance: string;
  balanceDesc: string;
  getInTouch: string;
  readyToContribute: string;
  email: string;
  responseTime: string;
  responseTimeText: string;
}

export const translations: Record<'EN' | 'FR', Translations> = {
  EN: {
    // Navigation
    home: "Home",
    about: "About",
    articles: "Articles",
    contribute: "Contribute",
    search: "Search",
    explore: "Explore",
    navigation: "Navigation",
    pages: "Pages",
    language: "Language",
    
    // Categories
    urbanTrendsGrowth: "Urban Trends & Growth",
    infrastructureInvestment: "Infrastructure Gaps & Investment",
    climateSustainability: "Climate Resilience & Sustainability",
    transportMobility: "Transport & Mobility",
    smartCityTech: "Smart Cities & Tech",
    voicesGround: "Voices from the Ground",
    
    // Homepage sections
    featuredReads: "Featured Reads",
    featuredReadsSubtitle: "Discover our most impactful insights on African urban development",
    noFeaturedArticles: "No featured articles available yet.",
    editorialPillars: "Editorial Pillars",
    editorialPillarsSubtitle: "Our coverage is organized around six core themes that shape the future of African cities",
    featuredArticle: "Featured Article",
    
    // Newsletter
    stayConnected: "Stay Connected",
    newsletterSubtitle: "Get the latest insights on Africa's cities. No spam.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    thankYouSubscribe: "Thank you for subscribing! Check your email to confirm.",
    
    // Article actions
    readArticle: "Read Article",
    viewAllArticles: "View All Articles",
    backToHomepage: "Back to homepage",
    recently: "Recently",
    
    // Article page
    articleNotFound: "Article not found",
    returnToHomepage: "Return to homepage",
    
    // Search
    searchArticles: "Search Articles",
    searchPlaceholder: "Search for articles...",
    searchResultsFor: "Search results for:",
    noArticlesFound: "No articles found matching your search.",
    enterSearchTerm: "Enter a search term to find articles.",
    
    // Tags
    tags: "Tags",
    taggedWith: "Tagged with",
    articlesFound: "articles found",
    noArticlesWithTag: "No articles found with this tag.",
    
    // General
    by: "By",
    noArticles: "No articles found.",
    loading: "Loading...",
    allArticles: "All Articles",
    exploreComplete: "Explore our complete collection of insights on African urban development",
    
    // Featured Articles
    featuredArticles: "Featured Articles",
    readMore: "Read More",
    editorialDisclaimer: "This article was researched and written by the UrbanVision Editorial Team using a combination of human insight and AI-assisted tools.",
    
    // Footer
    tagline: "Insights on African Urban Development",
    followInstagram: "Follow us on Instagram",
    allRightsReserved: "All rights reserved.",
    
    // Editorial Pillars
    urbanTrendsGrowthTitle: "Urban Trends and Growth",
    urbanTrendsGrowthDesc: "Analyzing population dynamics, urbanization patterns, and emerging city development models across Sub-Saharan Africa.",
    infrastructureInvestmentTitle: "Infrastructure Gaps and Investment",
    infrastructureInvestmentDesc: "Examining funding mechanisms, public-private partnerships, and innovative financing for essential urban infrastructure.",
    climateSustainabilityTitle: "Climate Resilience and Sustainability",
    climateSustainabilityDesc: "Exploring adaptation strategies, green infrastructure, and sustainable development practices for African cities.",
    transportMobilityTitle: "Transport and Mobility",
    transportMobilityDesc: "Investigating sustainable transportation solutions, urban mobility innovations, and infrastructure development.",
    smartCityTechTitle: "Smart City and Tech in Planning",
    smartCityTechDesc: "Covering digital transformation, data-driven governance, and technology adoption in urban planning.",
    voicesGroundTitle: "Voices from the Ground",
    voicesGroundDesc: "Featuring community perspectives, grassroots initiatives, and local solutions to urban challenges.",
    
    // Special pages
    urbanVisionStudioAI: "Urban Vision Studio AI",
    
    // Contribute page
    contributeToUrbanVision: "Contribute to UrbanVision",
    contributeSubtitle: "We welcome contributions from urban planners, researchers, policymakers, community advocates, and anyone passionate about creating better cities.",
    whatWereLookingFor: "What We're Looking For",
    whatWereLookingForText: "UrbanVision publishes a variety of content formats, including in-depth analyses, case studies, opinion pieces, photo essays, and data visualizations. We particularly value:",
    originalResearch: "Original research and analysis on urban development trends",
    caseStudies: "Case studies of innovative urban projects or policies",
    criticalPerspectives: "Critical perspectives on current urban planning practices",
    communityStories: "Stories that highlight community voices and experiences",
    dataInvestigations: "Data-driven investigations into urban challenges",
    internationalPerspectives: "International perspectives on global urban issues",
    submissionGuidelines: "Submission Guidelines",
    articleLength: "Article Length",
    featureArticles: "Feature articles: 2,000-4,000 words",
    analysisPieces: "Analysis pieces: 1,200-2,500 words",
    opinionPieces: "Opinion pieces: 800-1,500 words",
    briefReports: "Brief reports: 500-800 words",
    formatRequirements: "Format Requirements",
    submitInWord: "Submit articles in Microsoft Word or Google Docs format",
    includeBio: "Include a brief author bio (50-100 words)",
    provideImages: "Provide high-resolution images when relevant (with proper attribution)",
    includeCitations: "Include citations and references for all claims and data",
    suggestTags: "Suggest relevant tags and categories for your piece",
    proposalProcess: "Proposal Process",
    proposalProcessText: "Before submitting a full article, we recommend sending a brief pitch (200-300 words) that outlines:",
    mainArgument: "The main argument or focus of your piece",
    whyTimely: "Why this topic is timely and relevant",
    uniquePerspective: "Your unique perspective or expertise on the subject",
    keySources: "The key sources or data you plan to reference",
    editorialStandards: "Editorial Standards",
    editorialStandardsText: "All submissions undergo a thorough editorial review process. We evaluate articles based on:",
    accuracy: "Accuracy:",
    accuracyDesc: "All factual claims must be supported by credible sources",
    originality: "Originality:",
    originalityDesc: "We prioritize fresh perspectives and original analysis",
    relevance: "Relevance:",
    relevanceDesc: "Content should address current urban challenges or opportunities",
    clarity: "Clarity:",
    clarityDesc: "Articles should be accessible to a broad, educated audience",
    balance: "Balance:",
    balanceDesc: "We value nuanced perspectives that acknowledge complexity",
    getInTouch: "Get in Touch",
    readyToContribute: "Ready to contribute? We'd love to hear from you.",
    email: "Email:",
    responseTime: "Response time:",
    responseTimeText: "We aim to respond to all pitches and submissions within 1 week."
  },
  FR: {
    // Navigation
    home: "Accueil",
    about: "À Propos",
    articles: "Articles",
    contribute: "Contribuer",
    search: "Rechercher",
    explore: "Explorer",
    navigation: "Navigation",
    pages: "Pages",
    language: "Langue",
    
    // Categories
    urbanTrendsGrowth: "Tendances et Croissance Urbaines",
    infrastructureInvestment: "Lacunes d'Infrastructure et Investissement",
    climateSustainability: "Résilience Climatique et Durabilité",
    transportMobility: "Transport et Mobilité",
    smartCityTech: "Villes Intelligentes et Technologie",
    voicesGround: "Voix du Terrain",
    
    // Homepage sections
    featuredReads: "Lectures en Vedette",
    featuredReadsSubtitle: "Découvrez nos analyses les plus marquantes sur le développement urbain africain",
    noFeaturedArticles: "Aucun article en vedette disponible pour le moment.",
    editorialPillars: "Piliers Éditoriaux",
    editorialPillarsSubtitle: "Notre couverture s'organise autour de six thèmes centraux qui façonnent l'avenir des villes africaines",
    featuredArticle: "Article en Vedette",
    
    // Newsletter
    stayConnected: "Restez Connecté",
    newsletterSubtitle: "Recevez les dernières analyses sur les villes d'Afrique. Pas de spam.",
    enterEmail: "Entrez votre email",
    subscribe: "S'abonner",
    thankYouSubscribe: "Merci pour votre inscription ! Vérifiez votre email pour confirmer.",
    
    // Article actions
    readArticle: "Lire l'Article",
    viewAllArticles: "Voir Tous les Articles",
    backToHomepage: "Retour à l'accueil",
    recently: "Récemment",
    
    // Article page
    articleNotFound: "Article non trouvé",
    returnToHomepage: "Retourner à l'accueil",
    
    // Search
    searchArticles: "Rechercher des Articles",
    searchPlaceholder: "Rechercher des articles...",
    searchResultsFor: "Résultats de recherche pour :",
    noArticlesFound: "Aucun article trouvé correspondant à votre recherche.",
    enterSearchTerm: "Entrez un terme de recherche pour trouver des articles.",
    
    // Tags
    tags: "Étiquettes",
    taggedWith: "Étiquetés avec",
    articlesFound: "articles trouvés",
    noArticlesWithTag: "Aucun article trouvé avec cette étiquette.",
    
    // General
    by: "Par",
    noArticles: "Aucun article trouvé.",
    loading: "Chargement...",
    allArticles: "Tous les Articles",
    exploreComplete: "Explorez notre collection complète d'analyses sur le développement urbain africain",
    
    // Featured Articles
    featuredArticles: "Articles en Vedette",
    readMore: "Lire Plus",
    editorialDisclaimer: "Cet article a été recherché et rédigé par l'équipe éditoriale d'UrbanVision en utilisant une combinaison d'insights humains et d'outils assistés par l'IA.",
    
    // Footer
    tagline: "Analyses sur le Développement Urbain Africain",
    followInstagram: "Suivez-nous sur Instagram",
    allRightsReserved: "Tous droits réservés.",
    
    // Editorial Pillars
    urbanTrendsGrowthTitle: "Tendances et Croissance Urbaines",
    urbanTrendsGrowthDesc: "Analyse des dynamiques démographiques, des modèles d'urbanisation et des modèles émergents de développement urbain en Afrique subsaharienne.",
    infrastructureInvestmentTitle: "Lacunes d'Infrastructure et Investissement",
    infrastructureInvestmentDesc: "Examen des mécanismes de financement, des partenariats public-privé et du financement innovant pour les infrastructures urbaines essentielles.",
    climateSustainabilityTitle: "Résilience Climatique et Durabilité",
    climateSustainabilityDesc: "Exploration des stratégies d'adaptation, des infrastructures vertes et des pratiques de développement durable pour les villes africaines.",
    transportMobilityTitle: "Transport et Mobilité",
    transportMobilityDesc: "Investigation des solutions de transport durable, des innovations en mobilité urbaine et du développement d'infrastructures.",
    smartCityTechTitle: "Villes Intelligentes et Technologie dans la Planification",
    smartCityTechDesc: "Couverture de la transformation numérique, de la gouvernance basée sur les données et de l'adoption technologique dans la planification urbaine.",
    voicesGroundTitle: "Voix du Terrain",
    voicesGroundDesc: "Perspectives communautaires, initiatives populaires et solutions locales aux défis urbains.",
    
    // Special pages
    urbanVisionStudioAI: "Studio IA UrbanVision",
    
    // Contribute page
    contributeToUrbanVision: "Contribuer à UrbanVision",
    contributeSubtitle: "Nous accueillons les contributions d'urbanistes, de chercheurs, de décideurs politiques, de défenseurs communautaires et de toute personne passionnée par la création de meilleures villes.",
    whatWereLookingFor: "Ce que nous recherchons",
    whatWereLookingForText: "UrbanVision publie une variété de formats de contenu, notamment des analyses approfondies, des études de cas, des articles d'opinion, des essais photographiques et des visualisations de données. Nous valorisons particulièrement :",
    originalResearch: "Recherches originales et analyses sur les tendances du développement urbain",
    caseStudies: "Études de cas de projets ou politiques urbaines innovants",
    criticalPerspectives: "Perspectives critiques sur les pratiques actuelles d'urbanisme",
    communityStories: "Histoires qui mettent en lumière les voix et expériences communautaires",
    dataInvestigations: "Enquêtes basées sur les données concernant les défis urbains",
    internationalPerspectives: "Perspectives internationales sur les enjeux urbains mondiaux",
    submissionGuidelines: "Directives de soumission",
    articleLength: "Longueur des articles",
    featureArticles: "Articles de fond : 2 000-4 000 mots",
    analysisPieces: "Articles d'analyse : 1 200-2 500 mots",
    opinionPieces: "Articles d'opinion : 800-1 500 mots",
    briefReports: "Rapports courts : 500-800 mots",
    formatRequirements: "Exigences de format",
    submitInWord: "Soumettez les articles au format Microsoft Word ou Google Docs",
    includeBio: "Incluez une brève biographie d'auteur (50-100 mots)",
    provideImages: "Fournissez des images haute résolution si pertinentes (avec attribution appropriée)",
    includeCitations: "Incluez des citations et références pour toutes les affirmations et données",
    suggestTags: "Suggérez des étiquettes et catégories pertinentes pour votre article",
    proposalProcess: "Processus de proposition",
    proposalProcessText: "Avant de soumettre un article complet, nous recommandons d'envoyer une brève proposition (200-300 mots) qui décrit :",
    mainArgument: "L'argument principal ou le focus de votre article",
    whyTimely: "Pourquoi ce sujet est opportun et pertinent",
    uniquePerspective: "Votre perspective unique ou expertise sur le sujet",
    keySources: "Les sources clés ou données que vous prévoyez référencer",
    editorialStandards: "Standards éditoriaux",
    editorialStandardsText: "Toutes les soumissions font l'objet d'un processus d'examen éditorial approfondi. Nous évaluons les articles sur la base de :",
    accuracy: "Précision :",
    accuracyDesc: "Toutes les affirmations factuelles doivent être soutenues par des sources crédibles",
    originality: "Originalité :",
    originalityDesc: "Nous priorisons les perspectives fraîches et l'analyse originale",
    relevance: "Pertinence :",
    relevanceDesc: "Le contenu devrait aborder les défis ou opportunités urbains actuels",
    clarity: "Clarté :",
    clarityDesc: "Les articles devraient être accessibles à un public large et éduqué",
    balance: "Équilibre :",
    balanceDesc: "Nous valorisons les perspectives nuancées qui reconnaissent la complexité",
    getInTouch: "Nous contacter",
    readyToContribute: "Prêt à contribuer ? Nous aimerions avoir de vos nouvelles.",
    email: "Email :",
    responseTime: "Temps de réponse :",
    responseTimeText: "Nous visons à répondre à toutes les propositions et soumissions dans un délai d'une semaine."
  }
};

export type TranslationKey = keyof Translations;
