
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
  
  // About page
  aboutUrbanVision: string;
  aboutSubtitle: string;
  ourEditorialMission: string;
  aboutEditorialMissionText1: string;
  aboutEditorialMissionText2: string;
  whatWeCover: string;
  ourApproach: string;
  aboutApproachText1: string;
  aboutApproachText2: string;
  
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
  
  // Studio AI page
  studioAITitle: string;
  studioAISubtitle: string;
  studioAIIntro1: string;
  studioAIIntro2: string;
  studioAIIntro3: string;
  studioAIImageCaption: string;
  studioAIFeaturesList: string;
  studioAIFeature1: string;
  studioAIFeature2: string;
  studioAIFeature3: string;
  studioAIFeature4: string;
  studioAIFeature5: string;
  studioAIConclusion: string;
  stayTuned: string;
  studioAILaunchingSoon: string;
  
  // Events
  upcomingEventsWebinars: string;
  upcomingEventsSubtitle: string;
  viewAllEvents: string;
  noUpcomingEvents: string;
  registerNow: string;
  registered: string;
  
  // Editor's Note
  editorsNote: string;
  editorsNoteQuote: string;
  editorsNoteAttribution: string;
  
  // Category page specific translations
  latestTrendsAfricanUrban: string;
  infrastructureGapsInvestmentDesc: string;
  climateResilienceSustainabilityDesc: string;
  smartCityTechPlanningDesc: string;
  voicesFromGroundDesc: string;
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
    
    // About page
    aboutUrbanVision: "About UrbanVision",
    aboutSubtitle: "UrbanVision is a forward-thinking digital magazine dedicated to exploring the evolving landscape of urban development, sustainability, and innovation.",
    ourEditorialMission: "Our Editorial Mission",
    aboutEditorialMissionText1: "We believe that cities are the laboratories of our future. As more than half of the world's population now lives in urban areas, the decisions we make about how to build, sustain, and govern our cities will determine the trajectory of human civilization for generations to come.",
    aboutEditorialMissionText2: "UrbanVision serves as a platform for thought leaders, practitioners, researchers, and citizens to share insights, challenge assumptions, and propose solutions for the complex challenges facing urban communities worldwide.",
    whatWeCover: "What We Cover",
    ourApproach: "Our Approach",
    aboutApproachText1: "We are committed to publishing evidence-based, nuanced reporting that goes beyond surface-level analysis. Our content combines rigorous research with accessible storytelling, making complex urban issues understandable to a broad audience while maintaining the depth necessary for meaningful discourse.",
    aboutApproachText2: "UrbanVision champions inclusive urban development that prioritizes equity, sustainability, and community well-being. We amplify diverse voices and perspectives, particularly those of communities that are often marginalized in urban planning discussions.",
    
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
    responseTimeText: "We aim to respond to all pitches and submissions within 1 week.",
    
    // Studio AI page
    studioAITitle: "UrbanVision AI Studio",
    studioAISubtitle: "Coming Soon – The Intelligence Engine Behind Africa's Urban Future",
    studioAIIntro1: "UrbanVision AI Studio is the next evolution of our mission — transforming how African cities are planned, built, and experienced through data, technology, and design.",
    studioAIIntro2: "While UrbanVision Magazine brings you stories, insights, and voices from across the continent, AI Studio will provide the tools to act on those insights. It will be a platform where real-time geospatial data meets predictive analytics, giving city leaders, planners, and developers the intelligence they need to make informed decisions — fast.",
    studioAIIntro3: "As urban growth accelerates across Africa, challenges like infrastructure deficits, climate vulnerability, and unplanned sprawl demand smarter, more responsive solutions. UrbanVision AI Studio is built to meet that need.",
    studioAIImageCaption: "Complex urban dynamics require intelligent data-driven solutions",
    studioAIFeaturesList: "Using a blend of satellite imagery, open urban datasets, and machine learning, AI Studio will help users:",
    studioAIFeature1: "Map infrastructure gaps in transport, health, education, and housing.",
    studioAIFeature2: "Forecast urban expansion before it happens, especially in informal and peri-urban areas.",
    studioAIFeature3: "Identify climate risks including flood zones, pollution clusters, and heat islands.",
    studioAIFeature4: "Pinpoint areas of opportunity for investment, public-private partnerships, and innovation.",
    studioAIFeature5: "Access all insights through a conversational AI assistant, built to respond to urban planning queries in real time and across multiple languages.",
    studioAIConclusion: "Whether you're building a transport corridor, investing in real estate, or designing inclusive housing policy — AI Studio will be your intelligence companion for urban strategy. Pilot cities include Kigali, Accra, and Nairobi.",
    stayTuned: "Stay tuned.",
    studioAILaunchingSoon: "UrbanVision AI Studio is launching soon",
    
    // Events
    upcomingEventsWebinars: "Upcoming Events & Webinars",
    upcomingEventsSubtitle: "Join our community discussions and expert panels on African urban development",
    viewAllEvents: "View All Events",
    noUpcomingEvents: "No upcoming events scheduled at the moment. Check back soon for new events and webinars!",
    registerNow: "Register Now",
    registered: "registered",
    
    // Editor's Note
    editorsNote: "Editor's Note",
    editorsNoteQuote: "As African cities prepare to house over 750 million people by 2030, the conversations we're having today about infrastructure, sustainability, and innovation will determine the quality of life for generations to come.",
    editorsNoteAttribution: "UrbanVision team",
    
    // Category page specific translations
    latestTrendsAfricanUrban: "Latest trends in African urban development",
    infrastructureGapsInvestmentDesc: "Funding mechanisms, public-private partnerships, and innovative financing for essential urban infrastructure",
    climateResilienceSustainabilityDesc: "Adaptation strategies, green infrastructure, and sustainable development practices for African cities",
    smartCityTechPlanningDesc: "Digital transformation, data-driven governance, and technology adoption in urban planning",
    voicesFromGroundDesc: "Community perspectives, grassroots initiatives, and local solutions to urban challenges"
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
    
    // About page
    aboutUrbanVision: "À Propos d'UrbanVision",
    aboutSubtitle: "UrbanVision est un magazine numérique avant-gardiste dédié à l'exploration du paysage évolutif du développement urbain, de la durabilité et de l'innovation.",
    ourEditorialMission: "Notre Mission Éditoriale",
    aboutEditorialMissionText1: "Nous croyons que les villes sont les laboratoires de notre avenir. Alors que plus de la moitié de la population mondiale vit maintenant dans les zones urbaines, les décisions que nous prenons sur la façon de construire, maintenir et gouverner nos villes détermineront la trajectoire de la civilisation humaine pour les générations à venir.",
    aboutEditorialMissionText2: "UrbanVision sert de plateforme pour les leaders d'opinion, les praticiens, les chercheurs et les citoyens pour partager des idées, défier les suppositions et proposer des solutions aux défis complexes auxquels font face les communautés urbaines du monde entier.",
    whatWeCover: "Ce que nous couvrons",
    ourApproach: "Notre Approche",
    aboutApproachText1: "Nous nous engageons à publier des reportages fondés sur des preuves et nuancés qui vont au-delà de l'analyse superficielle. Notre contenu combine une recherche rigoureuse avec une narration accessible, rendant les questions urbaines complexes compréhensibles pour un large public tout en maintenant la profondeur nécessaire pour un discours significatif.",
    aboutApproachText2: "UrbanVision défend un développement urbain inclusif qui priorise l'équité, la durabilité et le bien-être communautaire. Nous amplifions les voix et perspectives diverses, particulièrement celles des communautés souvent marginalisées dans les discussions de planification urbaine.",
    
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
    responseTimeText: "Nous visons à répondre à toutes les propositions et soumissions dans un délai d'une semaine.",
    
    // Studio AI page
    studioAITitle: "Studio IA UrbanVision",
    studioAISubtitle: "Bientôt Disponible – Le Moteur d'Intelligence Derrière l'Avenir Urbain de l'Afrique",
    studioAIIntro1: "Le Studio IA UrbanVision est la prochaine évolution de notre mission — transformer la façon dont les villes africaines sont planifiées, construites et vécues grâce aux données, à la technologie et au design.",
    studioAIIntro2: "Alors qu'UrbanVision Magazine vous apporte des histoires, des analyses et des voix de tout le continent, le Studio IA fournira les outils pour agir sur ces insights. Ce sera une plateforme où les données géospatiales en temps réel rencontrent l'analytique prédictive, donnant aux dirigeants urbains, planificateurs et développeurs l'intelligence nécessaire pour prendre des décisions éclairées — rapidement.",
    studioAIIntro3: "Alors que la croissance urbaine s'accélère en Afrique, des défis comme les déficits d'infrastructure, la vulnérabilité climatique et l'étalement non planifié exigent des solutions plus intelligentes et plus réactives. Le Studio IA UrbanVision est conçu pour répondre à ce besoin.",
    studioAIImageCaption: "Complexes dynamiques urbaines nécessitent des solutions intelligentes basées sur les données",
    studioAIFeaturesList: "En utilisant un mélange d'imagerie satellite, de jeux de données urbaines ouvertes et d'apprentissage automatique, le Studio IA aidera les utilisateurs à :",
    studioAIFeature1: "Cartographier les lacunes d'infrastructure dans les transports, la santé, l'éducation et le logement.",
    studioAIFeature2: "Prévoir l'expansion urbaine avant qu'elle ne se produise, en particulier dans les zones informelles et périurbaines.",
    studioAIFeature3: "Identifier les risques climatiques, y compris les zones inondables, les clusters de pollution et les îlots de chaleur.",
    studioAIFeature4: "Localiser les zones d'opportunité pour l'investissement, les partenariats public-privé et l'innovation.",
    studioAIFeature5: "Accéder à tous les insights via un assistant IA conversationnel, conçu pour répondre aux requêtes de planification urbaine en temps réel et dans plusieurs langues.",
    studioAIConclusion: "Que vous construisiez un corridor de transport, investissiez dans l'immobilier ou conceviez une politique de logement inclusif — le Studio IA sera votre compagnon d'intelligence pour la stratégie urbaine. Les villes pilotes incluent Kigali, Accra et Nairobi.",
    stayTuned: "Restez à l'écoute.",
    studioAILaunchingSoon: "Le Studio IA UrbanVision sera bientôt lancé",
    
    // Events
    upcomingEventsWebinars: "Événements et Webinaires à Venir",
    upcomingEventsSubtitle: "Rejoignez nos discussions communautaires et panels d'experts sur le développement urbain africain",
    viewAllEvents: "Voir Tous les Événements",
    noUpcomingEvents: "Aucun événement à venir prévu pour le moment. Revenez bientôt pour de nouveaux événements et webinaires !",
    registerNow: "S'inscrire Maintenant",
    registered: "inscrits",
    
    // Editor's Note
    editorsNote: "Note de l'Éditeur",
    editorsNoteQuote: "Alors que les villes africaines se préparent à accueillir plus de 750 millions de personnes d'ici 2030, les conversations que nous avons aujourd'hui sur l'infrastructure, la durabilité et l'innovation détermineront la qualité de vie pour les générations à venir.",
    editorsNoteAttribution: "Équipe UrbanVision",
    
    // Category page specific translations
    latestTrendsAfricanUrban: "Dernières tendances du développement urbain africain",
    infrastructureGapsInvestmentDesc: "Mécanismes de financement, partenariats public-privé et financement innovant pour les infrastructures urbaines essentielles",
    climateResilienceSustainabilityDesc: "Stratégies d'adaptation, infrastructures vertes et pratiques de développement durable pour les villes africaines",
    smartCityTechPlanningDesc: "Transformation numérique, gouvernance basée sur les données et adoption technologique dans la planification urbaine",
    voicesFromGroundDesc: "Perspectives communautaires, initiatives populaires et solutions locales aux défis urbains"
  }
};

export type TranslationKey = keyof Translations;
