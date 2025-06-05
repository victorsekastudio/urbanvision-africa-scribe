export const translations = {
  EN: {
    // Navigation
    home: "Home",
    about: "About",
    articles: "Articles",
    contribute: "Contribute",
    search: "Search",
    
    // Homepage sections
    featuredReads: "Featured Reads",
    featuredReadsSubtitle: "Discover our most impactful insights on African urban development",
    noFeaturedArticles: "No featured articles available yet.",
    editorialPillars: "Editorial Pillars",
    editorialPillarsSubtitle: "Our coverage is organized around six core themes that shape the future of African cities",
    
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
    backToHomepage: "Back to homepage",
    articleNotFound: "Article not found",
    returnToHomepage: "Return to homepage",
    editorialDisclaimer: "This article was researched and written by the UrbanVision Editorial Team using a combination of human insight and AI-assisted tools."
  },
  FR: {
    // Navigation
    home: "Accueil",
    about: "À Propos",
    articles: "Articles",
    contribute: "Contribuer",
    search: "Rechercher",
    
    // Homepage sections
    featuredReads: "Lectures en Vedette",
    featuredReadsSubtitle: "Découvrez nos analyses les plus marquantes sur le développement urbain africain",
    noFeaturedArticles: "Aucun article en vedette disponible pour le moment.",
    editorialPillars: "Piliers Éditoriaux",
    editorialPillarsSubtitle: "Notre couverture s'organise autour de six thèmes centraux qui façonnent l'avenir des villes africaines",
    
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
    backToHomepage: "Retour à l'accueil",
    articleNotFound: "Article non trouvé",
    returnToHomepage: "Retour à l'accueil",
    editorialDisclaimer: "Cet article a été recherché et rédigé par l'équipe éditoriale d'UrbanVision en utilisant une combinaison d'insights humains et d'outils assistés par l'IA."
  }
};

export type TranslationKey = keyof typeof translations.EN;
