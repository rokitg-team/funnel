export type FunnelLocale = 'en' | 'es' | 'de' | 'it' | 'fr';

type HeadersLike = {
  get(name: string): string | null;
};

type MarketingCopy = {
  promoAria: string;
  promoLead: string;
  promoCta: string;
  navSignals: string;
  heroBadge: string;
  heroTitleDim: string;
  heroTitlePrefix: string;
  heroTitleAccent: string;
  heroTitleLast: string;
  heroSub: string;
  sectionFeaturesTag: string;
  featuresTitle: string;
  featuresPrefix: string;
  featuresAccent: string;
  featuresSub: string;
  featureRealtimeTitle: string;
  featureRealtimeDesc: string;
  featureEntryTitle: string;
  featureEntryDesc: string;
  featureAnalysisTitle: string;
  featureAnalysisDesc: string;
  featureCommunityTitle: string;
  featureCommunityDesc: string;
  featureMemeTitle: string;
  featureMemeDesc: string;
  featureEducationTitle: string;
  featureEducationDesc: string;
  sectionSignalTag: string;
  signalTitleBefore: string;
  signalTitleAccent: string;
  signalTitleAfter: string;
  signalSub: string;
  sectionTestimonialsTag: string;
  testimonialsTitle: string;
  testimonialsAccent: string;
  testimonialsCta: string;
  newsletterTeaserTag: string;
  newsletterTeaserTitle: string;
  newsletterTeaserAccent: string;
  newsletterTeaserSub: string;
  newsletterTeaserCta: string;
  sectionPricingTag: string;
  pricingTitle: string;
  pricingAccent: string;
  pricingSub: string;
  basicPeriod: string;
  basicFeature1: string;
  basicFeature2: string;
  basicFeature3: string;
  basicFeature4: string;
  basicCta: string;
  featuredBadge: string;
  proPeriod: string;
  proFeature1: string;
  proFeature2: string;
  proFeature3: string;
  proFeature4: string;
  proFeature5: string;
  proCta: string;
  elitePeriod: string;
  eliteFeature1: string;
  eliteFeature2: string;
  eliteFeature3: string;
  eliteFeature4: string;
  eliteFeature5: string;
  eliteCta: string;
  finalTag: string;
  finalTitleBefore: string;
  finalTitleAccent: string;
  finalSub: string;
  finalCta: string;
  footerLinks: string;
  footerDisclaimer: string;
};

const localeByCountry: Partial<Record<string, FunnelLocale>> = {
  AR: 'es',
  BO: 'es',
  CL: 'es',
  CO: 'es',
  CR: 'es',
  CU: 'es',
  DE: 'de',
  DO: 'es',
  EC: 'es',
  ES: 'es',
  FR: 'fr',
  GQ: 'es',
  GT: 'es',
  HN: 'es',
  IT: 'it',
  MX: 'es',
  NI: 'es',
  PA: 'es',
  PE: 'es',
  PR: 'es',
  PY: 'es',
  SV: 'es',
  UY: 'es',
  VE: 'es',
};

const supportedLocales: FunnelLocale[] = ['en', 'es', 'de', 'it', 'fr'];

function getLocaleFromAcceptLanguage(acceptLanguage: string): FunnelLocale | null {
  for (const entry of acceptLanguage.split(',')) {
    const tag = entry.trim().split(';')[0]?.toLowerCase();
    if (!tag) continue;
    const base = tag.split('-')[0] as FunnelLocale;
    if (supportedLocales.includes(base)) {
      return base;
    }
  }

  return null;
}

export function getFunnelLocale(headersList: HeadersLike): FunnelLocale {
  const forcedLocale = headersList.get('x-rokitg-locale') as FunnelLocale | null;
  if (forcedLocale && supportedLocales.includes(forcedLocale)) {
    return forcedLocale;
  }

  const country = headersList.get('x-vercel-ip-country')?.toUpperCase();
  if (country) {
    const localeFromCountry = localeByCountry[country];
    if (localeFromCountry) {
      return localeFromCountry;
    }
  }

  return getLocaleFromAcceptLanguage(headersList.get('accept-language') ?? '') ?? 'en';
}

export const marketingCopy: Record<FunnelLocale, MarketingCopy> = {
  en: {
    promoAria: 'Limited-time offer',
    promoLead: '<strong>$TON doubled after the call.</strong> The next one&apos;s loading —',
    promoCta: 'Join The Circle →',
    navSignals: 'SIGNALS ↓',
    heroBadge: 'THE CIRCLE — LIVE · 42 OPERATORS INSIDE',
    heroTitleDim: 'CRYPTO CALLS',
    heroTitlePrefix: 'THAT ',
    heroTitleAccent: 'ACTUALLY',
    heroTitleLast: 'PRINT',
    heroSub: 'Real-time memecoin &amp; altcoin signals.',
    sectionFeaturesTag: '// WHAT YOU GET',
    featuresTitle: 'EVERYTHING YOU NEED',
    featuresPrefix: 'TO ',
    featuresAccent: 'TRADE SMARTER',
    featuresSub:
      'No noise. No BS. Just clean signals with entries, targets, and stops — delivered when it matters.',
    featureRealtimeTitle: 'REAL-TIME SIGNALS',
    featureRealtimeDesc:
      'Instant alerts for memecoins and alts with precise entry zones. Never miss a setup again.',
    featureEntryTitle: 'ENTRY + TARGETS',
    featureEntryDesc:
      'Every call comes with clear entry price, multiple take-profit targets, and stop-loss levels.',
    featureAnalysisTitle: 'MARKET ANALYSIS',
    featureAnalysisDesc:
      'Daily breakdowns of market structure, macro sentiment, and which sectors are pumping.',
    featureCommunityTitle: 'PRIVATE COMMUNITY',
    featureCommunityDesc:
      'A tight-knit group of serious traders. Share setups, ask questions, learn faster together.',
    featureMemeTitle: 'MEMECOIN EDGE',
    featureMemeDesc:
      'Specialized plays in the highest-volatility assets where 5x–50x moves happen weekly.',
    featureEducationTitle: 'EDUCATION',
    featureEducationDesc:
      'Learn to read charts, understand momentum, and eventually run your own trades confidently.',
    sectionSignalTag: '// REAL TAPE',
    signalTitleBefore: 'THIS IS WHAT',
    signalTitleAccent: 'A CALL',
    signalTitleAfter: 'LOOKS LIKE',
    signalSub:
      '<strong style="color:var(--text);">$TON doubled after the tweet.</strong> A call for the books — had to be put into a banger edit. Watch it. Then read the format below.',
    sectionTestimonialsTag: '// VERIFIED ON WHOP · 5.00★',
    testimonialsTitle: 'WHAT OPERATORS',
    testimonialsAccent: 'ARE SAYING',
    testimonialsCta: 'READ ALL REVIEWS →',
    newsletterTeaserTag: '// FROM THE NEWSLETTER',
    newsletterTeaserTitle: 'LATEST LONG-FORM',
    newsletterTeaserAccent: 'BREAKDOWN',
    newsletterTeaserSub:
      'A deeper write-up from rokitg.substack.com when there&apos;s something worth reading, not just watching.',
    newsletterTeaserCta: 'OPEN NEWSLETTER →',
    sectionPricingTag: '// JOIN TODAY',
    pricingTitle: 'CHOOSE YOUR',
    pricingAccent: 'ACCESS LEVEL',
    pricingSub: 'All plans give you access to The Circle.',
    basicPeriod: 'per month',
    basicFeature1: 'All live signals',
    basicFeature2: 'Entry + stop loss levels',
    basicFeature3: 'Community access',
    basicFeature4: 'Weekly market recap',
    basicCta: 'FREE TRIAL →',
    featuredBadge: 'MOST POPULAR',
    proPeriod: 'per year',
    proFeature1: 'Everything in Basic',
    proFeature2: 'Full TP target levels',
    proFeature3: 'Early entry alerts',
    proFeature4: 'Memecoin deep dives',
    proFeature5: 'Portfolio guidance',
    proCta: 'JOIN PRO →',
    elitePeriod: 'Limited Time Offer',
    eliteFeature1: 'Everything in Pro',
    eliteFeature2: '1-on-1 monthly call',
    eliteFeature3: 'Direct DM access',
    eliteFeature4: 'Personalized strategy',
    eliteFeature5: 'Private alpha group',
    eliteCta: 'GO ELITE →',
    finalTag: '// FINAL CALL',
    finalTitleBefore: 'STOP WATCHING.',
    finalTitleAccent: 'START WINNING.',
    finalSub: 'The next call drops when you least expect it. Be inside when it does.',
    finalCta: 'JOIN THE CIRCLE →',
    footerLinks: 'X / @ROKITDOTGG',
    footerDisclaimer: '© 2026 ROKITG · NOT FINANCIAL ADVICE',
  },
  es: {
    promoAria: 'Oferta por tiempo limitado',
    promoLead: '<strong>$TON se duplicó después de la llamada.</strong> La próxima ya viene —',
    promoCta: 'Entrar al Circle →',
    navSignals: 'SEÑALES ↓',
    heroBadge: 'THE CIRCLE — EN VIVO · 42 TRADERS DENTRO',
    heroTitleDim: 'COMUNIDAD CRYPTO',
    heroTitlePrefix: '',
    heroTitleAccent: 'QUE DE VERDAD',
    heroTitleLast: 'IMPRIME',
    heroSub: 'Únete al verdadero círculo cerrado.',
    sectionFeaturesTag: '// LO QUE RECIBES',
    featuresTitle: 'TODO LO QUE NECESITAS',
    featuresPrefix: 'PARA ',
    featuresAccent: 'OPERAR MEJOR',
    featuresSub:
      'Sin ruido. Sin humo. Solo señales limpias con entradas, objetivos y stops, justo cuando importa.',
    featureRealtimeTitle: 'SEÑALES EN TIEMPO REAL',
    featureRealtimeDesc:
      'Alertas instantáneas para memecoins y alts con zonas de entrada precisas. No vuelvas a perder un setup.',
    featureEntryTitle: 'ENTRADA + OBJETIVOS',
    featureEntryDesc:
      'Cada llamada incluye precio de entrada claro, múltiples take-profits y niveles de stop-loss.',
    featureAnalysisTitle: 'ANÁLISIS DE MERCADO',
    featureAnalysisDesc:
      'Desgloses diarios de estructura de mercado, sentimiento macro y qué sectores están explotando.',
    featureCommunityTitle: 'COMUNIDAD PRIVADA',
    featureCommunityDesc:
      'Un grupo cerrado de traders serios. Comparte setups, haz preguntas y aprende más rápido.',
    featureMemeTitle: 'VENTAJA EN MEMECOINS',
    featureMemeDesc:
      'Plays especializados en los activos de mayor volatilidad, donde los movimientos 5x–50x pasan cada semana.',
    featureEducationTitle: 'EDUCACIÓN',
    featureEducationDesc:
      'Aprende a leer gráficos, entender momentum y terminar ejecutando tus propias operaciones con confianza.',
    sectionSignalTag: '// CINTA REAL',
    signalTitleBefore: 'ASÍ SE VE',
    signalTitleAccent: 'UNA LLAMADA',
    signalTitleAfter: 'DE VERDAD',
    signalSub:
      '<strong style="color:var(--text);">$TON se duplicó tras el tweet.</strong> Una llamada histórica, había que convertirla en un banger edit. Míralo y luego revisa el formato abajo.',
    sectionTestimonialsTag: '// VERIFICADO EN WHOP · 5.00★',
    testimonialsTitle: 'LO QUE DICEN',
    testimonialsAccent: 'LOS TRADERS',
    testimonialsCta: 'VER TODAS LAS RESEÑAS →',
    newsletterTeaserTag: '// DESDE EL NEWSLETTER',
    newsletterTeaserTitle: 'ÚLTIMO',
    newsletterTeaserAccent: 'DESGLOSE',
    newsletterTeaserSub:
      'Cuando hay algo que merece lectura larga, también cae en rokitg.substack.com con más contexto y tesis.',
    newsletterTeaserCta: 'ABRIR NEWSLETTER →',
    sectionPricingTag: '// ENTRA HOY',
    pricingTitle: 'ELIGE TU',
    pricingAccent: 'NIVEL DE ACCESO',
    pricingSub: 'Todos los planes te dan acceso a The Circle.',
    basicPeriod: 'por mes',
    basicFeature1: 'Todas las señales en vivo',
    basicFeature2: 'Niveles de entrada + stop loss',
    basicFeature3: 'Acceso a la comunidad',
    basicFeature4: 'Resumen semanal del mercado',
    basicCta: 'PRUEBA GRATIS →',
    featuredBadge: 'EL MÁS POPULAR',
    proPeriod: 'por año',
    proFeature1: 'Todo lo de Basic',
    proFeature2: 'Objetivos TP completos',
    proFeature3: 'Alertas de entrada temprana',
    proFeature4: 'Deep dives de memecoins',
    proFeature5: 'Guía de portafolio',
    proCta: 'ENTRAR A PRO →',
    elitePeriod: 'Oferta por tiempo limitado',
    eliteFeature1: 'Todo lo de Pro',
    eliteFeature2: 'Llamada 1 a 1 mensual',
    eliteFeature3: 'Acceso directo por DM',
    eliteFeature4: 'Estrategia personalizada',
    eliteFeature5: 'Grupo alpha privado',
    eliteCta: 'IR ELITE →',
    finalTag: '// ÚLTIMA LLAMADA',
    finalTitleBefore: 'DEJA DE MIRAR.',
    finalTitleAccent: 'EMPIEZA A GANAR.',
    finalSub: 'La próxima llamada cae cuando menos te lo esperas. Mejor estar dentro cuando pase.',
    finalCta: 'ENTRAR AL CIRCLE →',
    footerLinks: 'X / @ROKITDOTGG',
    footerDisclaimer: '© 2026 ROKITG · ESTO NO ES ASESORÍA FINANCIERA',
  },
  de: {
    promoAria: 'Zeitlich begrenztes Angebot',
    promoLead: '<strong>$TON hat sich nach dem Call verdoppelt.</strong> Der nächste lädt schon —',
    promoCta: 'In den Circle →',
    navSignals: 'SIGNALE ↓',
    heroBadge: 'THE CIRCLE — LIVE · 42 TRADER DRIN',
    heroTitleDim: 'KRYPTO CALLS',
    heroTitlePrefix: 'DIE ',
    heroTitleAccent: 'WIRKLICH',
    heroTitleLast: 'DRUCKEN',
    heroSub: 'Memecoin- und Altcoin-Signale in Echtzeit.',
    sectionFeaturesTag: '// WAS DU BEKOMMST',
    featuresTitle: 'ALLES, WAS DU BRAUCHST',
    featuresPrefix: 'UM ',
    featuresAccent: 'BESSER ZU TRADEN',
    featuresSub:
      'Kein Lärm. Kein Bullshit. Nur saubere Signale mit Entries, Targets und Stops — genau dann, wenn es zählt.',
    featureRealtimeTitle: 'ECHTZEIT-SIGNALE',
    featureRealtimeDesc:
      'Sofortige Alerts für Memecoins und Alts mit präzisen Einstiegszonen. Kein Setup mehr verpassen.',
    featureEntryTitle: 'ENTRY + TARGETS',
    featureEntryDesc:
      'Jeder Call kommt mit klarem Entry, mehreren Take-Profit-Zielen und Stop-Loss-Leveln.',
    featureAnalysisTitle: 'MARKTANALYSE',
    featureAnalysisDesc:
      'Tägliche Breakdowns zu Marktstruktur, Makro-Sentiment und den Sektoren, die gerade laufen.',
    featureCommunityTitle: 'PRIVATE COMMUNITY',
    featureCommunityDesc:
      'Eine enge Gruppe ernsthafter Trader. Setups teilen, Fragen stellen und gemeinsam schneller lernen.',
    featureMemeTitle: 'MEMECOIN-EDGE',
    featureMemeDesc:
      'Spezialisierte Plays in den volatilsten Assets, wo 5x–50x Moves jede Woche passieren.',
    featureEducationTitle: 'AUSBILDUNG',
    featureEducationDesc:
      'Lerne Charts zu lesen, Momentum zu verstehen und am Ende deine eigenen Trades sicher zu fahren.',
    sectionSignalTag: '// ECHTES TAPE',
    signalTitleBefore: 'SO SIEHT',
    signalTitleAccent: 'EIN CALL',
    signalTitleAfter: 'AUS',
    signalSub:
      '<strong style="color:var(--text);">$TON hat sich nach dem Tweet verdoppelt.</strong> Ein Call für die Bücher — musste als banger edit landen. Schau ihn dir an und lies dann das Format darunter.',
    sectionTestimonialsTag: '// VERIFIZIERT AUF WHOP · 5.00★',
    testimonialsTitle: 'WAS TRADER',
    testimonialsAccent: 'SAGEN',
    testimonialsCta: 'ALLE REVIEWS LESEN →',
    newsletterTeaserTag: '// AUS DEM NEWSLETTER',
    newsletterTeaserTitle: 'LETZTER LANGE-FORM',
    newsletterTeaserAccent: 'BREAKDOWN',
    newsletterTeaserSub:
      'Wenn etwas mehr als nur einen Chart verdient, landet es auch auf rokitg.substack.com mit voller These.',
    newsletterTeaserCta: 'NEWSLETTER ÖFFNEN →',
    sectionPricingTag: '// HEUTE BEITRETEN',
    pricingTitle: 'WÄHLE DEIN',
    pricingAccent: 'ZUGANGSLEVEL',
    pricingSub:
      'Alle Pläne geben dir Zugang zu The Circle. Sichere dir deinen Spot und empfange Signale sofort.',
    basicPeriod: 'pro Monat',
    basicFeature1: 'Alle Live-Signale',
    basicFeature2: 'Entry- + Stop-Loss-Level',
    basicFeature3: 'Community-Zugang',
    basicFeature4: 'Wöchentlicher Markt-Recap',
    basicCta: 'KOSTENLOS TESTEN →',
    featuredBadge: 'AM BELIEBTESTEN',
    proPeriod: 'pro Jahr',
    proFeature1: 'Alles aus Basic',
    proFeature2: 'Volle TP-Ziele',
    proFeature3: 'Frühe Entry-Alerts',
    proFeature4: 'Memecoin Deep Dives',
    proFeature5: 'Portfolio-Guidance',
    proCta: 'PRO HOLEN →',
    elitePeriod: 'Zeitlich begrenztes Angebot',
    eliteFeature1: 'Alles aus Pro',
    eliteFeature2: '1-zu-1 Call pro Monat',
    eliteFeature3: 'Direkter DM-Zugang',
    eliteFeature4: 'Personalisierte Strategie',
    eliteFeature5: 'Private Alpha-Gruppe',
    eliteCta: 'ELITE WERDEN →',
    finalTag: '// LETZTER CALL',
    finalTitleBefore: 'HÖR AUF ZUZUSEHEN.',
    finalTitleAccent: 'FANG AN ZU GEWINNEN.',
    finalSub:
      'Der nächste Call kommt, wenn du ihn am wenigsten erwartest. Sei drin, wenn es passiert.',
    finalCta: 'IN DEN CIRCLE →',
    footerLinks: 'X / @ROKITDOTGG',
    footerDisclaimer: '© 2026 ROKITG · KEINE FINANZBERATUNG',
  },
  it: {
    promoAria: 'Offerta a tempo limitato',
    promoLead: '<strong>$TON ha fatto 2x dopo la call.</strong> La prossima sta già arrivando —',
    promoCta: 'Entra nel Circle →',
    navSignals: 'SEGNALI ↓',
    heroBadge: 'THE CIRCLE — LIVE · 42 TRADER DENTRO',
    heroTitleDim: 'CALL CRYPTO',
    heroTitlePrefix: 'CHE ',
    heroTitleAccent: 'DAVVERO',
    heroTitleLast: 'STAMPANO',
    heroSub: 'Segnali memecoin e altcoin in tempo reale.',
    sectionFeaturesTag: '// COSA OTTIENI',
    featuresTitle: 'TUTTO QUELLO CHE TI SERVE',
    featuresPrefix: 'PER ',
    featuresAccent: 'TRADARE MEGLIO',
    featuresSub:
      'Zero rumore. Zero fumo. Solo segnali puliti con entry, target e stop — inviati quando conta davvero.',
    featureRealtimeTitle: 'SEGNALI IN TEMPO REALE',
    featureRealtimeDesc:
      'Alert istantanei per memecoin e alts con zone di ingresso precise. Nessun setup perso.',
    featureEntryTitle: 'ENTRY + TARGET',
    featureEntryDesc:
      'Ogni call include prezzo di ingresso chiaro, più take-profit e livelli di stop-loss.',
    featureAnalysisTitle: 'ANALISI DI MERCATO',
    featureAnalysisDesc:
      'Breakdown giornalieri della struttura di mercato, sentiment macro e settori in movimento.',
    featureCommunityTitle: 'COMMUNITY PRIVATA',
    featureCommunityDesc:
      'Un gruppo ristretto di trader seri. Condividi setup, fai domande e impara più in fretta.',
    featureMemeTitle: 'VANTAGGIO MEMECOIN',
    featureMemeDesc:
      'Play specializzati sugli asset più volatili, dove i movimenti 5x–50x succedono ogni settimana.',
    featureEducationTitle: 'FORMAZIONE',
    featureEducationDesc:
      'Impara a leggere i grafici, capire il momentum e arrivare a gestire i tuoi trade con fiducia.',
    sectionSignalTag: '// NASTRO REALE',
    signalTitleBefore: 'ECCO COME',
    signalTitleAccent: 'SI VEDE',
    signalTitleAfter: 'UNA CALL',
    signalSub:
      '<strong style="color:var(--text);">$TON ha fatto 2x dopo il tweet.</strong> Una call da ricordare — andava trasformata in un banger edit. Guardalo e poi leggi il formato qui sotto.',
    sectionTestimonialsTag: '// VERIFICATO SU WHOP · 5.00★',
    testimonialsTitle: 'COSA DICONO',
    testimonialsAccent: 'I TRADER',
    testimonialsCta: 'LEGGI TUTTE LE RECENSIONI →',
    newsletterTeaserTag: '// DAL NEWSLETTER',
    newsletterTeaserTitle: 'ULTIMO',
    newsletterTeaserAccent: 'APPROFONDIMENTO',
    newsletterTeaserSub:
      'Quando serve più di una call veloce, finisce anche su rokitg.substack.com con più contesto e tesi.',
    newsletterTeaserCta: 'APRI NEWSLETTER →',
    sectionPricingTag: '// ENTRA OGGI',
    pricingTitle: 'SCEGLI IL TUO',
    pricingAccent: 'LIVELLO DI ACCESSO',
    pricingSub:
      'Tutti i piani ti danno accesso a The Circle. Blocca il tuo posto e inizia a ricevere segnali subito.',
    basicPeriod: 'al mese',
    basicFeature1: 'Tutti i segnali live',
    basicFeature2: 'Livelli entry + stop loss',
    basicFeature3: 'Accesso alla community',
    basicFeature4: 'Recap settimanale del mercato',
    basicCta: 'PROVA GRATIS →',
    featuredBadge: 'PIÙ POPOLARE',
    proPeriod: 'all’anno',
    proFeature1: 'Tutto in Basic',
    proFeature2: 'Target TP completi',
    proFeature3: 'Alert di ingresso anticipato',
    proFeature4: 'Deep dive memecoin',
    proFeature5: 'Guida portfolio',
    proCta: 'ENTRA IN PRO →',
    elitePeriod: 'Offerta a tempo limitato',
    eliteFeature1: 'Tutto in Pro',
    eliteFeature2: 'Call 1:1 mensile',
    eliteFeature3: 'Accesso diretto in DM',
    eliteFeature4: 'Strategia personalizzata',
    eliteFeature5: 'Gruppo alpha privato',
    eliteCta: 'VAI ELITE →',
    finalTag: '// ULTIMA CALL',
    finalTitleBefore: 'SMETTI DI GUARDARE.',
    finalTitleAccent: 'INIZIA A VINCERE.',
    finalSub:
      'La prossima call arriva quando meno te lo aspetti. Meglio essere dentro quando succede.',
    finalCta: 'ENTRA NEL CIRCLE →',
    footerLinks: 'X / @ROKITDOTGG',
    footerDisclaimer: '© 2026 ROKITG · NON È CONSULENZA FINANZIARIA',
  },
  fr: {
    promoAria: 'Offre limitée dans le temps',
    promoLead: '<strong>$TON a fait x2 après le call.</strong> Le prochain est déjà en approche —',
    promoCta: 'Rejoindre le Circle →',
    navSignals: 'SIGNAUX ↓',
    heroBadge: 'THE CIRCLE — EN LIVE · 42 TRADERS DEDANS',
    heroTitleDim: 'CALLS CRYPTO',
    heroTitlePrefix: 'QUI ',
    heroTitleAccent: 'IMPRIMENT',
    heroTitleLast: 'VRAIMENT',
    heroSub: 'Signaux memecoin et altcoin en temps réel.',
    sectionFeaturesTag: '// CE QUE TU REÇOIS',
    featuresTitle: 'TOUT CE QU’IL TE FAUT',
    featuresPrefix: 'POUR ',
    featuresAccent: 'MIEUX TRADER',
    featuresSub:
      'Pas de bruit. Pas de bullshit. Juste des signaux propres avec entrées, objectifs et stops — au bon moment.',
    featureRealtimeTitle: 'SIGNAUX EN TEMPS RÉEL',
    featureRealtimeDesc:
      'Alertes instantanées sur memecoins et alts avec zones d’entrée précises. Ne rate plus aucun setup.',
    featureEntryTitle: 'ENTRÉE + OBJECTIFS',
    featureEntryDesc:
      'Chaque call arrive avec une entrée claire, plusieurs take-profits et des niveaux de stop-loss.',
    featureAnalysisTitle: 'ANALYSE DE MARCHÉ',
    featureAnalysisDesc:
      'Breakdowns quotidiens de la structure de marché, du sentiment macro et des secteurs qui envoient.',
    featureCommunityTitle: 'COMMUNAUTÉ PRIVÉE',
    featureCommunityDesc:
      'Un groupe serré de traders sérieux. Partage de setups, questions, apprentissage plus rapide ensemble.',
    featureMemeTitle: 'EDGE MEMECOIN',
    featureMemeDesc:
      'Des plays spécialisés sur les actifs les plus volatils, là où les mouvements 5x–50x arrivent chaque semaine.',
    featureEducationTitle: 'ÉDUCATION',
    featureEducationDesc:
      'Apprends à lire les charts, comprendre le momentum et finir par exécuter tes propres trades avec confiance.',
    sectionSignalTag: '// VRAIE BANDE',
    signalTitleBefore: 'VOILÀ À QUOI',
    signalTitleAccent: 'RESSEMBLE',
    signalTitleAfter: 'UN CALL',
    signalSub:
      '<strong style="color:var(--text);">$TON a fait x2 après le tweet.</strong> Un call historique — il fallait en faire un banger edit. Regarde-le puis lis le format juste dessous.',
    sectionTestimonialsTag: '// VÉRIFIÉ SUR WHOP · 5.00★',
    testimonialsTitle: 'CE QUE DISENT',
    testimonialsAccent: 'LES TRADERS',
    testimonialsCta: 'VOIR TOUS LES AVIS →',
    newsletterTeaserTag: '// DEPUIS LE NEWSLETTER',
    newsletterTeaserTitle: 'DERNIER',
    newsletterTeaserAccent: 'BREAKDOWN',
    newsletterTeaserSub:
      'Quand un sujet mérite plus qu’un simple signal, il finit aussi sur rokitg.substack.com avec la thèse complète.',
    newsletterTeaserCta: 'OUVRIR LE NEWSLETTER →',
    sectionPricingTag: '// REJOINS AUJOURD’HUI',
    pricingTitle: 'CHOISIS TON',
    pricingAccent: 'NIVEAU D’ACCÈS',
    pricingSub:
      'Tous les plans donnent accès à The Circle. Réserve ta place et commence à recevoir les signaux immédiatement.',
    basicPeriod: 'par mois',
    basicFeature1: 'Tous les signaux live',
    basicFeature2: 'Niveaux d’entrée + stop loss',
    basicFeature3: 'Accès à la communauté',
    basicFeature4: 'Récap hebdo du marché',
    basicCta: 'ESSAI GRATUIT →',
    featuredBadge: 'LE PLUS POPULAIRE',
    proPeriod: 'par an',
    proFeature1: 'Tout dans Basic',
    proFeature2: 'Objectifs TP complets',
    proFeature3: 'Alertes d’entrée anticipée',
    proFeature4: 'Deep dives memecoin',
    proFeature5: 'Guidance portfolio',
    proCta: 'PASSER PRO →',
    elitePeriod: 'Offre limitée',
    eliteFeature1: 'Tout dans Pro',
    eliteFeature2: 'Appel 1:1 mensuel',
    eliteFeature3: 'Accès direct en DM',
    eliteFeature4: 'Stratégie personnalisée',
    eliteFeature5: 'Groupe alpha privé',
    eliteCta: 'PASSER ELITE →',
    finalTag: '// DERNIER CALL',
    finalTitleBefore: 'ARRÊTE DE REGARDER.',
    finalTitleAccent: 'COMMENCE À GAGNER.',
    finalSub:
      'Le prochain call tombe quand tu t’y attends le moins. Sois déjà dedans quand ça part.',
    finalCta: 'REJOINDRE LE CIRCLE →',
    footerLinks: 'X / @ROKITDOTGG',
    footerDisclaimer: '© 2026 ROKITG · PAS UN CONSEIL FINANCIER',
  },
};
