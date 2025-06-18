// main.js - Vue com roteamento simples e 4 jogos educativos
const { createApp, ref } = Vue;

// SVGs inline para substituir imagens externas
const SVG_ICONS = {
  // Lixeiras oficiais da coleta seletiva brasileira
  bins: {
    plastic: `<svg viewBox="0 0 100 100" class="bin-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="redPlasticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E53935;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B71C1C;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Lixeira vermelha para plástico (padrão brasileiro) -->
      <rect x="20" y="25" width="60" height="70" rx="8" fill="url(#redPlasticGrad)" stroke="#B71C1C" stroke-width="2" filter="url(#shadow)"/>
      <rect x="15" y="20" width="70" height="8" rx="4" fill="#B71C1C"/>
      <rect x="35" y="10" width="30" height="15" rx="2" fill="#B71C1C"/>
      <!-- Símbolo de reciclagem do plástico -->
      <path d="M35 45 L40 35 L50 40 L60 35 L65 45 L60 50 L65 60 L55 65 L50 55 L45 65 L35 60 L40 50 Z" fill="white" stroke="white" stroke-width="1"/>
      <text x="50" y="78" text-anchor="middle" fill="white" font-size="10" font-weight="bold">PLÁSTICO</text>
    </svg>`,
    paper: `<svg viewBox="0 0 100 100" class="bin-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bluePaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E88E5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0D47A1;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Lixeira azul para papel (padrão brasileiro) -->
      <rect x="20" y="25" width="60" height="70" rx="8" fill="url(#bluePaperGrad)" stroke="#0D47A1" stroke-width="2" filter="url(#shadow)"/>
      <rect x="15" y="20" width="70" height="8" rx="4" fill="#0D47A1"/>
      <rect x="35" y="10" width="30" height="15" rx="2" fill="#0D47A1"/>
      <!-- Símbolo de papel -->
      <rect x="35" y="40" width="30" height="35" rx="3" fill="white" stroke="white" stroke-width="1"/>
      <path d="M40 50 L70 50 M40 55 L70 55 M40 60 L65 60 M40 65 L60 65" stroke="#1E88E5" stroke-width="2"/>
      <text x="50" y="85" text-anchor="middle" fill="white" font-size="8" font-weight="bold">PAPEL</text>
    </svg>`,
    organic: `<svg viewBox="0 0 100 100" class="bin-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brownOrganicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6D4C41;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Lixeira marrom para orgânico (padrão brasileiro) -->
      <rect x="20" y="25" width="60" height="70" rx="8" fill="url(#brownOrganicGrad)" stroke="#3E2723" stroke-width="2" filter="url(#shadow)"/>
      <rect x="15" y="20" width="70" height="8" rx="4" fill="#3E2723"/>
      <rect x="35" y="10" width="30" height="15" rx="2" fill="#3E2723"/>
      <!-- Símbolo de orgânico (maçã com folha) -->
      <path d="M50 40 C45 40, 40 45, 40 50 C40 60, 45 65, 50 65 C55 65, 60 60, 60 50 C60 45, 55 40, 50 40" fill="#4CAF50"/>
      <path d="M50 35 C48 35, 47 37, 48 38 C49 37, 51 37, 52 38 C53 37, 52 35, 50 35" fill="#2E7D32"/>
      <text x="50" y="82" text-anchor="middle" fill="white" font-size="8" font-weight="bold">ORGÂNICO</text>
    </svg>`,
    metal: `<svg viewBox="0 0 100 100" class="bin-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="yellowMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD600;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F57F17;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Lixeira amarela para metal (padrão brasileiro) -->
      <rect x="20" y="25" width="60" height="70" rx="8" fill="url(#yellowMetalGrad)" stroke="#F57F17" stroke-width="2" filter="url(#shadow)"/>
      <rect x="15" y="20" width="70" height="8" rx="4" fill="#F57F17"/>
      <rect x="35" y="10" width="30" height="15" rx="2" fill="#F57F17"/>
      <!-- Símbolo de metal (lata) -->
      <ellipse cx="50" cy="40" rx="12" ry="4" fill="#424242"/>
      <rect x="38" y="40" width="24" height="25" fill="#616161"/>
      <ellipse cx="50" cy="65" rx="12" ry="4" fill="#424242"/>
      <rect x="42" y="48" width="16" height="4" rx="2" fill="#FFD600"/>
      <text x="50" y="82" text-anchor="middle" fill="#424242" font-size="8" font-weight="bold">METAL</text>
    </svg>`,
    glass: `<svg viewBox="0 0 100 100" class="bin-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="greenGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Lixeira verde para vidro (padrão brasileiro) -->
      <rect x="20" y="25" width="60" height="70" rx="8" fill="url(#greenGlassGrad)" stroke="#1B5E20" stroke-width="2" filter="url(#shadow)"/>
      <rect x="15" y="20" width="70" height="8" rx="4" fill="#1B5E20"/>
      <rect x="35" y="10" width="30" height="15" rx="2" fill="#1B5E20"/>
      <!-- Símbolo de vidro (garrafa) -->
      <path d="M45 38 L55 38 L55 42 L57 42 L57 68 L43 68 L43 42 L45 42 Z" fill="white" opacity="0.9"/>
      <ellipse cx="50" cy="35" rx="3" ry="2" fill="white" opacity="0.9"/>
      <path d="M47 48 L53 48 M47 55 L53 55 M47 62 L53 62" stroke="#4CAF50" stroke-width="1"/>
      <text x="50" y="82" text-anchor="middle" fill="white" font-size="8" font-weight="bold">VIDRO</text>
    </svg>`,
  },

  // Materiais recicláveis brasileiros realistas
  materials: {
    plastic_bottle: `<svg viewBox="0 0 60 80" class="material-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E3F2FD;stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:#BBDEFB;stop-opacity:0.9" />
        </linearGradient>
        <filter id="bottleShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Garrafa PET realista -->
      <path d="M22 15 L38 15 L38 22 L42 22 L42 70 L18 70 L18 22 L22 22 Z" fill="url(#bottleGrad)" stroke="#1976D2" stroke-width="1.5" filter="url(#bottleShadow)"/>
      <ellipse cx="30" cy="10" rx="4" ry="3" fill="#1976D2"/>
      <rect x="26" y="5" width="8" height="8" rx="1" fill="#1976D2"/>
      <!-- Rótulo da garrafa -->
      <rect x="20" y="35" width="20" height="15" rx="2" fill="#FF5722" opacity="0.8"/>
      <text x="30" y="43" text-anchor="middle" fill="white" font-size="6" font-weight="bold">2L</text>
      <!-- Sulcos da garrafa -->
      <path d="M20 25 L40 25 M20 55 L40 55" stroke="#1565C0" stroke-width="0.5" opacity="0.5"/>
    </svg>`,
    paper: `<svg viewBox="0 0 60 80" class="material-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F5F5F5;stop-opacity:1" />
        </linearGradient>
        <filter id="paperShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Jornal/revista dobrado -->
      <rect x="8" y="10" width="44" height="60" fill="url(#paperGrad)" stroke="#1976D2" stroke-width="1" filter="url(#paperShadow)"/>
      <path d="M42 5 L42 15 L52 15" fill="none" stroke="#1976D2" stroke-width="1.5"/>
      <!-- Texto simulado do jornal -->
      <rect x="12" y="15" width="36" height="8" fill="#1976D2" opacity="0.2"/>
      <path d="M15 25 L45 25 M15 30 L40 30 M15 35 L48 35 M15 40 L35 40" stroke="#666" stroke-width="1" opacity="0.6"/>
      <path d="M15 45 L25 45 M30 45 L48 45 M15 50 L42 50 M15 55 L38 55" stroke="#666" stroke-width="0.8" opacity="0.5"/>
      <!-- Marca de dobra -->
      <path d="M30 10 L30 70" stroke="#DDD" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,
    banana_peel: `<svg viewBox="0 0 60 80" class="material-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFF176;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFB300;stop-opacity:1" />
        </linearGradient>
        <filter id="bananaShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Casca de banana realista -->
      <path d="M30 15 C28 20, 25 30, 20 40 C18 50, 22 60, 25 68 C28 70, 32 68, 30 65" fill="url(#bananaGrad)" filter="url(#bananaShadow)"/>
      <path d="M30 15 C32 20, 35 30, 40 40 C42 50, 38 60, 35 68 C32 70, 28 68, 30 65" fill="#FFB300"/>
      <path d="M25 18 C23 25, 18 35, 15 45 C13 55, 17 65, 20 68" fill="#FF8F00"/>
      <path d="M35 18 C37 25, 42 35, 45 45 C47 55, 43 65, 40 68" fill="#FF8F00"/>
      <!-- Ponta da banana -->
      <ellipse cx="30" cy="12" rx="3" ry="4" fill="#795548"/>
      <!-- Manchas da casca -->
      <ellipse cx="25" cy="25" rx="1.5" ry="3" fill="#FF8F00" opacity="0.7"/>
      <ellipse cx="35" cy="35" rx="1" ry="2" fill="#FF8F00" opacity="0.7"/>
    </svg>`,
    can: `<svg viewBox="0 0 60 80" class="material-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="canGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E0E0E0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#BDBDBD;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="canTop" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#F5F5F5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#BDBDBD;stop-opacity:1" />
        </radialGradient>
        <filter id="canShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Lata de alumínio realista -->
      <ellipse cx="30" cy="15" rx="15" ry="4" fill="url(#canTop)"/>
      <rect x="15" y="15" width="30" height="50" fill="url(#canGrad)" filter="url(#canShadow)"/>
      <ellipse cx="30" cy="65" rx="15" ry="4" fill="#9E9E9E"/>
      <!-- Rótulo da lata -->
      <rect x="17" y="25" width="26" height="18" rx="2" fill="#4CAF50"/>
      <rect x="19" y="27" width="22" height="4" fill="#2E7D32"/>
      <text x="30" y="38" text-anchor="middle" fill="white" font-size="8" font-weight="bold">350ml</text>
      <!-- Sulcos da lata -->
      <path d="M16 20 L44 20 M16 50 L44 50" stroke="#757575" stroke-width="0.5"/>
      <!-- Anel de abertura -->
      <ellipse cx="30" cy="13" rx="2" ry="1" fill="#616161"/>
    </svg>`,
    glass_bottle: `<svg viewBox="0 0 60 80" class="material-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#C8E6C9;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#A5D6A7;stop-opacity:0.8" />
        </linearGradient>
        <filter id="glassShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Garrafa de vidro realista -->
      <path d="M25 15 L35 15 L35 22 L37 22 L37 68 L23 68 L23 22 L25 22 Z" fill="url(#glassGrad)" stroke="#2E7D32" stroke-width="1.5" filter="url(#glassShadow)"/>
      <ellipse cx="30" cy="10" rx="4" ry="3" fill="#2E7D32"/>
      <rect x="27" y="5" width="6" height="8" rx="1" fill="#2E7D32"/>
      <!-- Reflexo do vidro -->
      <path d="M26 20 L28 20 L28 65 L26 65" fill="white" opacity="0.4"/>
      <!-- Rótulo da garrafa -->
      <rect x="25" y="35" width="10" height="20" rx="1" fill="#FF9800" opacity="0.9"/>
      <text x="30" y="43" text-anchor="middle" fill="white" font-size="5" font-weight="bold">600ml</text>
      <text x="30" y="50" text-anchor="middle" fill="white" font-size="4">VIDRO</text>
    </svg>`,
    cardboard: `<svg viewBox="0 0 60 80" class="material-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardboardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#D7CCC8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8D6E63;stop-opacity:1" />
        </linearGradient>
        <filter id="cardboardShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Caixa de papelão -->
      <rect x="10" y="20" width="40" height="40" fill="url(#cardboardGrad)" stroke="#5D4037" stroke-width="1.5" filter="url(#cardboardShadow)"/>
      <!-- Abas da caixa -->
      <path d="M10 20 L5 15 L15 10 L20 15 L20 20" fill="#A1887F" stroke="#5D4037" stroke-width="1"/>
      <path d="M50 20 L55 15 L45 10 L40 15 L40 20" fill="#A1887F" stroke="#5D4037" stroke-width="1"/>
      <!-- Linhas do papelão ondulado -->
      <path d="M12 25 L48 25 M12 30 L48 30 M12 35 L48 35 M12 40 L48 40 M12 45 L48 45 M12 50 L48 50 M12 55 L48 55" stroke="#6D4C41" stroke-width="0.5" opacity="0.5"/>
      <!-- Fita adesiva -->
      <rect x="25" y="18" width="10" height="44" fill="#FFC107" opacity="0.8"/>
      <text x="30" y="70" text-anchor="middle" fill="#5D4037" font-size="6" font-weight="bold">PAPELÃO</text>
    </svg>`,
  },

  // Avatares temáticos de meio ambiente brasileiro
  avatars: {
    leaf: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="leafShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Folha de árvore brasileira -->
      <path d="M50 15 C65 20, 75 35, 75 50 C75 65, 65 80, 50 85 C35 80, 25 65, 25 50 C25 35, 35 20, 50 15" fill="url(#leafGrad)" filter="url(#leafShadow)"/>
      <path d="M50 15 L50 85" stroke="#2E7D32" stroke-width="2"/>
      <path d="M35 35 Q50 40, 65 35 M30 50 Q50 55, 70 50 M35 65 Q50 70, 65 65" stroke="#2E7D32" stroke-width="1.5" fill="none"/>
    </svg>`,
    tree: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
        </linearGradient>
        <filter id="treeShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Árvore da Mata Atlântica -->
      <rect x="42" y="55" width="16" height="35" fill="url(#trunkGrad)" filter="url(#treeShadow)"/>
      <circle cx="50" cy="40" r="25" fill="url(#treeGrad)" filter="url(#treeShadow)"/>
      <circle cx="35" cy="35" r="18" fill="#2E7D32"/>
      <circle cx="65" cy="35" r="18" fill="#2E7D32"/>
      <circle cx="50" cy="25" r="15" fill="#388E3C"/>
      <!-- Textura do tronco -->
      <path d="M45 60 L45 85 M52 60 L52 85" stroke="#5D4037" stroke-width="1"/>
    </svg>`,
    water_drop: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00BCD4;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#006064;stop-opacity:1" />
        </linearGradient>
        <filter id="waterShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Gota d'água preservação -->
      <path d="M50 20 C60 30, 75 45, 75 60 C75 75, 62 85, 50 85 C38 85, 25 75, 25 60 C25 45, 40 30, 50 20" fill="url(#waterGrad)" filter="url(#waterShadow)"/>
      <circle cx="42" cy="45" r="3" fill="white" opacity="0.6"/>
      <circle cx="45" cy="38" r="2" fill="white" opacity="0.8"/>
      <path d="M35 55 Q50 65, 65 55" stroke="#B2EBF2" stroke-width="2" fill="none" opacity="0.7"/>
    </svg>`,
    ipê: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF8F00;stop-opacity:1" />
        </linearGradient>
        <filter id="ipeShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Ipê amarelo (árvore símbolo do Brasil) -->
      <rect x="45" y="60" width="10" height="30" fill="#8D6E63"/>
      <circle cx="50" cy="45" r="20" fill="#2E7D32"/>
      <!-- Flores do ipê -->
      <circle cx="40" cy="35" r="4" fill="url(#ipeGrad)" filter="url(#ipeShadow)"/>
      <circle cx="60" cy="35" r="4" fill="url(#ipeGrad)" filter="url(#ipeShadow)"/>
      <circle cx="50" cy="30" r="4" fill="url(#ipeGrad)" filter="url(#ipeShadow)"/>
      <circle cx="35" cy="50" r="3" fill="url(#ipeGrad)" filter="url(#ipeShadow)"/>
      <circle cx="65" cy="50" r="3" fill="url(#ipeGrad)" filter="url(#ipeShadow)"/>
      <circle cx="50" cy="55" r="3" fill="url(#ipeGrad)" filter="url(#ipeShadow)"/>
    </svg>`,
    onca: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oncaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFB74D;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF8F00;stop-opacity:1" />
        </linearGradient>
        <filter id="oncaShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Onça-pintada (símbolo da fauna brasileira) -->
      <ellipse cx="50" cy="55" rx="25" ry="20" fill="url(#oncaGrad)" filter="url(#oncaShadow)"/>
      <circle cx="50" cy="35" r="15" fill="url(#oncaGrad)"/>
      <circle cx="43" cy="30" r="2" fill="#333"/>
      <circle cx="57" cy="30" r="2" fill="#333"/>
      <path d="M45 38 L50 42 L55 38" stroke="#333" stroke-width="2" fill="none"/>
      <!-- Manchas da onça -->
      <circle cx="40" cy="45" r="2" fill="#E65100" opacity="0.7"/>
      <circle cx="60" cy="45" r="2" fill="#E65100" opacity="0.7"/>
      <circle cx="45" cy="60" r="3" fill="#E65100" opacity="0.7"/>
      <circle cx="55" cy="60" r="3" fill="#E65100" opacity="0.7"/>
      <!-- Orelhas -->
      <ellipse cx="42" cy="25" rx="4" ry="6" fill="#FF8F00"/>
      <ellipse cx="58" cy="25" rx="4" ry="6" fill="#FF8F00"/>
    </svg>`,
    tucano: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tucanoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#333;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="bicoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD600;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF8F00;stop-opacity:1" />
        </linearGradient>
        <filter id="tucanoShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Tucano (ave símbolo do Brasil) -->
      <ellipse cx="55" cy="50" rx="20" ry="15" fill="url(#tucanoGrad)" filter="url(#tucanoShadow)"/>
      <circle cx="45" cy="40" r="12" fill="#333"/>
      <circle cx="42" cy="38" r="2" fill="white"/>
      <circle cx="41" cy="37" r="1" fill="#333"/>
      <!-- Bico colorido -->
      <path d="M30 40 Q20 38, 15 42 Q20 46, 30 44 Z" fill="url(#bicoGrad)"/>
      <!-- Peito amarelo -->
      <ellipse cx="55" cy="55" rx="12" ry="8" fill="#FFD600"/>
      <!-- Cauda -->
      <ellipse cx="70" cy="45" rx="8" ry="12" fill="#1B5E20"/>
    </svg>`,
    araucaria: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="araucariaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2E7D32;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="araucariaShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Araucária (pinheiro brasileiro) -->
      <rect x="47" y="40" width="6" height="50" fill="#8D6E63"/>
      <!-- Copa em formato de guarda-chuva -->
      <path d="M50 40 L25 25 L30 30 L35 25 L40 30 L45 25 L50 30 L55 25 L60 30 L65 25 L70 30 L75 25 L50 40" fill="url(#araucariaGrad)" filter="url(#araucariaShadow)"/>
      <!-- Galhos característicos -->
      <path d="M50 35 L35 20 M50 35 L65 20" stroke="#2E7D32" stroke-width="2"/>
      <path d="M50 30 L30 15 M50 30 L70 15" stroke="#2E7D32" stroke-width="1.5"/>
    </svg>`,
    capivara: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="capivaraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#5D4037;stop-opacity:1" />
        </linearGradient>
        <filter id="capivaraShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Capivara (animal símbolo da fauna brasileira) -->
      <ellipse cx="50" cy="60" rx="30" ry="18" fill="url(#capivaraGrad)" filter="url(#capivaraShadow)"/>
      <ellipse cx="45" cy="40" rx="18" ry="12" fill="#8D6E63"/>
      <circle cx="40" cy="35" r="2" fill="#333"/>
      <circle cx="50" cy="35" r="2" fill="#333"/>
      <ellipse cx="45" cy="42" rx="3" ry="2" fill="#333"/>
      <!-- Orelhas pequenas -->
      <ellipse cx="38" cy="28" rx="3" ry="5" fill="#6D4C41"/>
      <ellipse cx="52" cy="28" rx="3" ry="5" fill="#6D4C41"/>
      <!-- Patas -->
      <ellipse cx="35" cy="75" rx="4" ry="8" fill="#6D4C41"/>
      <ellipse cx="65" cy="75" rx="4" ry="8" fill="#6D4C41"/>
    </svg>`,
    acai: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2E7D32;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="acaiShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Açaizeiro (palmeira amazônica) -->
      <rect x="47" y="50" width="6" height="40" fill="#8D6E63"/>
      <!-- Folhas de palmeira -->
      <path d="M50 50 Q30 30, 25 20 Q35 25, 50 40" fill="url(#acaiGrad)" filter="url(#acaiShadow)"/>
      <path d="M50 50 Q70 30, 75 20 Q65 25, 50 40" fill="url(#acaiGrad)" filter="url(#acaiShadow)"/>
      <path d="M50 45 Q35 15, 30 5 Q40 10, 50 35" fill="#2E7D32"/>
      <path d="M50 45 Q65 15, 70 5 Q60 10, 50 35" fill="#2E7D32"/>
      <!-- Cachos de açaí -->
      <circle cx="42" cy="45" r="2" fill="#4A148C"/>
      <circle cx="58" cy="45" r="2" fill="#4A148C"/>
      <circle cx="45" cy="48" r="1.5" fill="#4A148C"/>
      <circle cx="55" cy="48" r="1.5" fill="#4A148C"/>
    </svg>`,
    brasil: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brasilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="brasilShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Símbolo do Brasil verde -->
      <circle cx="50" cy="50" r="35" fill="url(#brasilGrad)" filter="url(#brasilShadow)"/>
      <path d="M20 50 L50 25 L80 50 L50 75 Z" fill="#FFD600"/>
      <circle cx="50" cy="50" r="12" fill="#1976D2"/>
      <path d="M40 45 Q50 42, 60 45 M42 50 Q50 47, 58 50 M42 55 Q50 52, 58 55" stroke="white" stroke-width="1"/>
    </svg>`,
    flower: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF9800;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF5722;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E91E63;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#AD1457;stop-opacity:1" />
        </linearGradient>
        <filter id="flowerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Flor tropical brasileira -->
      <circle cx="50" cy="50" r="8" fill="url(#flowerGrad)" filter="url(#flowerShadow)"/>
      <!-- Pétalas -->
      <ellipse cx="50" cy="35" rx="8" ry="15" fill="url(#petalGrad)" transform="rotate(0 50 50)"/>
      <ellipse cx="65" cy="50" rx="8" ry="15" fill="url(#petalGrad)" transform="rotate(72 50 50)"/>
      <ellipse cx="59" cy="68" rx="8" ry="15" fill="url(#petalGrad)" transform="rotate(144 50 50)"/>
      <ellipse cx="41" cy="68" rx="8" ry="15" fill="url(#petalGrad)" transform="rotate(216 50 50)"/>
      <ellipse cx="35" cy="50" rx="8" ry="15" fill="url(#petalGrad)" transform="rotate(288 50 50)"/>
      <!-- Caule -->
      <rect x="47" y="50" width="6" height="35" fill="#4CAF50"/>
      <!-- Folha -->
      <ellipse cx="40" cy="65" rx="5" ry="10" fill="#2E7D32" transform="rotate(-45 40 65)"/>
    </svg>`,
    sun: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#FFEB3B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF9800;stop-opacity:1" />
        </radialGradient>
        <filter id="sunShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Sol energético -->
      <circle cx="50" cy="50" r="20" fill="url(#sunGrad)" filter="url(#sunShadow)"/>
      <!-- Raios do sol -->
      <path d="M50 10 L50 25 M50 75 L50 90 M10 50 L25 50 M75 50 L90 50" stroke="#FF8F00" stroke-width="4" stroke-linecap="round"/>
      <path d="M21 21 L32 32 M68 68 L79 79 M79 21 L68 32 M32 68 L21 79" stroke="#FF8F00" stroke-width="3" stroke-linecap="round"/>
      <!-- Face sorridente -->
      <circle cx="42" cy="42" r="3" fill="#FF6F00"/>
      <circle cx="58" cy="42" r="3" fill="#FF6F00"/>
      <path d="M40 58 Q50 68, 60 58" stroke="#FF6F00" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,
    cloud: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E3F2FD;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#90CAF9;stop-opacity:1" />
        </linearGradient>
        <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Nuvem do ciclo da água -->
      <ellipse cx="35" cy="55" rx="18" ry="12" fill="url(#cloudGrad)" filter="url(#cloudShadow)"/>
      <ellipse cx="50" cy="45" rx="20" ry="15" fill="url(#cloudGrad)" filter="url(#cloudShadow)"/>
      <ellipse cx="65" cy="55" rx="16" ry="10" fill="url(#cloudGrad)" filter="url(#cloudShadow)"/>
      <!-- Gotas de chuva -->
      <path d="M35 70 C32 72, 30 75, 32 78 C34 80, 36 78, 38 75 C36 72, 35 70, 35 70" fill="#2196F3" opacity="0.7"/>
      <path d="M50 73 C47 75, 45 78, 47 81 C49 83, 51 81, 53 78 C51 75, 50 73, 50 73" fill="#2196F3" opacity="0.7"/>
      <path d="M65 71 C62 73, 60 76, 62 79 C64 81, 66 79, 68 76 C66 73, 65 71, 65 71" fill="#2196F3" opacity="0.7"/>
    </svg>`,
    mountain: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#5D4037;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="snowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E3F2FD;stop-opacity:1" />
        </linearGradient>
        <filter id="mountainShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Montanha brasileira -->
      <path d="M10 85 L30 40 L50 15 L70 40 L90 85 Z" fill="url(#mountainGrad)" filter="url(#mountainShadow)"/>
      <!-- Pico nevado -->
      <path d="M40 25 L50 15 L60 25 L55 30 L45 30 Z" fill="url(#snowGrad)"/>
      <!-- Vegetação na base -->
      <ellipse cx="25" cy="80" rx="8" ry="5" fill="#4CAF50"/>
      <ellipse cx="50" cy="83" rx="12" ry="4" fill="#4CAF50"/>
      <ellipse cx="75" cy="81" rx="10" ry="6" fill="#4CAF50"/>
      <!-- Nuvem no topo -->
      <ellipse cx="65" cy="25" rx="12" ry="6" fill="#E3F2FD" opacity="0.8"/>
    </svg>`,
    mushroom: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mushroomCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#F44336;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B71C1C;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="mushroomStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFDE7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F5F5F5;stop-opacity:1" />
        </linearGradient>
        <filter id="mushroomShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Cogumelo decompositor -->
      <ellipse cx="50" cy="45" rx="25" ry="15" fill="url(#mushroomCapGrad)" filter="url(#mushroomShadow)"/>
      <rect x="42" y="45" width="16" height="30" rx="8" fill="url(#mushroomStemGrad)" filter="url(#mushroomShadow)"/>
      <!-- Pontos brancos no chapéu -->
      <circle cx="40" cy="40" r="3" fill="white"/>
      <circle cx="55" cy="38" r="2" fill="white"/>
      <circle cx="47" cy="50" r="2.5" fill="white"/>
      <circle cx="62" cy="45" r="2" fill="white"/>
      <!-- Base com folhas -->
      <ellipse cx="45" cy="78" rx="8" ry="3" fill="#4CAF50"/>
      <ellipse cx="55" cy="80" rx="6" ry="2" fill="#2E7D32"/>
    </svg>`,
    cactus: `<svg viewBox="0 0 100 100" class="avatar-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cactusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="flowerCactusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E91E63;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#AD1457;stop-opacity:1" />
        </linearGradient>
        <filter id="cactusShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Cacto mandacaru (Brasil) -->
      <ellipse cx="50" cy="55" rx="12" ry="30" fill="url(#cactusGrad)" filter="url(#cactusShadow)"/>
      <!-- Braços do cacto -->
      <ellipse cx="30" cy="45" rx="8" ry="20" fill="url(#cactusGrad)" transform="rotate(-20 30 45)"/>
      <ellipse cx="70" cy="40" rx="6" ry="15" fill="url(#cactusGrad)" transform="rotate(30 70 40)"/>
      <!-- Espinhos -->
      <path d="M42 35 L44 33 M46 40 L48 38 M44 50 L46 48 M42 60 L44 58 M46 70 L48 68" stroke="#8D6E63" stroke-width="2"/>
      <path d="M58 35 L56 33 M54 45 L52 43 M58 55 L56 53 M54 65 L52 63" stroke="#8D6E63" stroke-width="2"/>
      <!-- Flor do cacto -->
      <circle cx="50" cy="25" r="5" fill="url(#flowerCactusGrad)"/>
      <path d="M45 20 L50 25 L55 20 M47 30 L50 25 L53 30" stroke="#E91E63" stroke-width="2"/>
      <!-- Base -->
      <ellipse cx="50" cy="85" rx="15" ry="4" fill="#8D6E63"/>
    </svg>`,
  },

  // Ícones de navegação e feedback contextualizados
  ui: {
    trophy: `<svg viewBox="0 0 100 100" class="ui-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF8F00;stop-opacity:1" />
        </linearGradient>
        <filter id="trophyShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Troféu ecológico -->
      <path d="M35 30 L65 30 L65 50 C65 60, 57 68, 50 68 C43 68, 35 60, 35 50 Z" fill="url(#trophyGrad)" filter="url(#trophyShadow)"/>
      <rect x="20" y="25" width="15" height="20" rx="5" fill="#4CAF50"/>
      <rect x="65" y="25" width="15" height="20" rx="5" fill="#4CAF50"/>
      <rect x="45" y="68" width="10" height="15" fill="#8D6E63"/>
      <ellipse cx="50" cy="85" rx="15" ry="3" fill="#8D6E63"/>
      <rect x="40" y="20" width="20" height="8" rx="2" fill="#FF8F00"/>
      <!-- Símbolo ecológico no troféu -->
      <path d="M45 40 C45 35, 50 30, 55 35 C55 40, 50 45, 45 40" fill="#4CAF50"/>
      <text x="50" y="55" text-anchor="middle" fill="#2E7D32" font-size="10" font-weight="bold">ECO</text>
    </svg>`,
    star: `<svg viewBox="0 0 100 100" class="ui-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </radialGradient>
        <filter id="starShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Estrela verde ecológica -->
      <path d="M50 10 L60 35 L85 35 L67 52 L75 78 L50 65 L25 78 L33 52 L15 35 L40 35 Z" fill="url(#starGrad)" stroke="#2E7D32" stroke-width="2" filter="url(#starShadow)"/>
      <circle cx="50" cy="45" r="8" fill="#FFD700"/>
      <path d="M45 40 C45 35, 50 30, 55 35 C55 40, 50 45, 45 40" fill="#4CAF50"/>
    </svg>`,
    recycle: `<svg viewBox="0 0 100 100" class="ui-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="recycleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="recycleShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Símbolo de reciclagem brasileiro oficial -->
      <path d="M50 20 L35 40 L45 45 L50 35 L55 45 L65 40 Z" fill="url(#recycleGrad)" filter="url(#recycleShadow)"/>
      <path d="M65 40 L50 60 L55 65 L70 50 L60 45 L65 35 Z" fill="url(#recycleGrad)" filter="url(#recycleShadow)"/>
      <path d="M50 60 L35 40 L25 45 L40 60 L45 50 L50 55 Z" fill="url(#recycleGrad)" filter="url(#recycleShadow)"/>
      <!-- Setas curvas -->
      <path d="M40 35 Q50 25, 60 35" stroke="#2E7D32" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
      <path d="M65 45 Q70 55, 60 65" stroke="#2E7D32" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
      <path d="M45 65 Q35 55, 45 45" stroke="#2E7D32" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
      <circle cx="50" cy="50" r="5" fill="white"/>
    </svg>`,
    heart: `<svg viewBox="0 0 100 100" class="ui-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E53935;stop-opacity:1" />
        </linearGradient>
        <filter id="heartShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Coração verde pelo meio ambiente -->
      <path d="M50 75 C30 60, 15 40, 25 25 C35 15, 45 20, 50 30 C55 20, 65 15, 75 25 C85 40, 70 60, 50 75" fill="#4CAF50" filter="url(#heartShadow)"/>
      <circle cx="40" cy="35" r="3" fill="#2E7D32"/>
      <circle cx="60" cy="35" r="3" fill="#2E7D32"/>
      <path d="M45 50 C45 45, 50 40, 55 45 C55 50, 50 55, 45 50" fill="#1B5E20"/>
    </svg>`,
    shield: `<svg viewBox="0 0 100 100" class="ui-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1B5E20;stop-opacity:1" />
        </linearGradient>
        <filter id="shieldShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Escudo de proteção ambiental -->
      <path d="M50 10 C65 15, 75 25, 80 40 C80 60, 70 75, 50 85 C30 75, 20 60, 20 40 C25 25, 35 15, 50 10" fill="url(#shieldGrad)" filter="url(#shieldShadow)"/>
      <path d="M35 35 L45 45 L65 25" stroke="white" stroke-width="4" fill="none"/>
      <circle cx="50" cy="55" r="8" fill="white" opacity="0.3"/>
      <path d="M45 50 C45 45, 50 40, 55 45 C55 50, 50 55, 45 50" fill="#FFD700"/>
    </svg>`,
    home: `<svg viewBox="0 0 100 100" class="ui-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#5D4037;stop-opacity:1" />
        </linearGradient>
        <filter id="homeShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Casa sustentável -->
      <path d="M15 50 L50 20 L85 50 L75 50 L75 80 L25 80 L25 50 Z" fill="url(#homeGrad)" filter="url(#homeShadow)"/>
      <path d="M15 50 L50 20 L85 50" stroke="#6D4C41" stroke-width="3" fill="none"/>
      <rect x="35" y="55" width="15" height="25" fill="#4CAF50"/>
      <rect x="55" y="55" width="15" height="15" fill="#2196F3"/>
      <!-- Painéis solares no telhado -->
      <rect x="40" y="25" width="20" height="15" fill="#1976D2" opacity="0.8"/>
      <path d="M42 27 L58 27 M42 32 L58 32 M42 37 L58 37" stroke="#0D47A1" stroke-width="1"/>
    </svg>`,
  },
};

// Jogo 1: Quiz de perguntas e respostas
const GameQuiz = {
  props: ["addPoints"],
  data() {
    return {
      questions: [
        {
          q: "Qual dessas atitudes ajuda a salvar o meio ambiente?",
          options: [
            "Jogar lixo no chão",
            "Plantar árvores",
            "Desperdiçar água",
            "Queimar lixo",
          ],
          answer: 1,
          svg: SVG_ICONS.avatars.tree,
        },
        {
          q: "Qual é a cor da lixeira para papel?",
          options: ["Azul", "Vermelha", "Verde", "Amarela"],
          answer: 0,
          svg: SVG_ICONS.bins.paper,
        },
        {
          q: "O que devemos fazer com pilhas usadas?",
          options: [
            "Jogar no lixo comum",
            "Levar a ponto de coleta",
            "Enterrar",
            "Jogar no vaso sanitário",
          ],
          answer: 1,
          svg: SVG_ICONS.materials.can,
        },
        {
          q: "Qual dessas ações economiza água?",
          options: [
            "Deixar torneira aberta",
            "Tomar banhos longos",
            "Consertar vazamentos",
            "Lavar calçada com mangueira",
          ],
          answer: 2,
          svg: SVG_ICONS.avatars.water_drop,
        },
        // Novas perguntas
        {
          q: "Qual material deve ser descartado na lixeira verde?",
          options: ["Vidro", "Metal", "Papel", "Plástico"],
          answer: 0,
          svg: SVG_ICONS.bins.glass,
        },
        {
          q: "Qual dessas atitudes NÃO é sustentável?",
          options: [
            "Reutilizar sacolas",
            "Desperdiçar energia",
            "Reciclar papel",
            "Economizar água",
          ],
          answer: 1,
          svg: SVG_ICONS.materials.can,
        },
        {
          q: "O que é compostagem?",
          options: [
            "Queimar lixo",
            "Transformar resíduos orgânicos em adubo",
            "Jogar lixo no rio",
            "Misturar lixo reciclável",
          ],
          answer: 1,
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          q: "Qual é a melhor forma de economizar energia em casa?",
          options: [
            "Deixar luzes acesas",
            "Usar lâmpadas LED",
            "Ligar aparelhos sem necessidade",
            "Abrir a geladeira toda hora",
          ],
          answer: 1,
          svg: SVG_ICONS.avatars.sun,
        },
        {
          q: "Qual dessas ações ajuda a proteger os animais?",
          options: [
            "Jogar lixo em rios",
            "Preservar florestas",
            "Desmatar",
            "Poluir o ar",
          ],
          answer: 1,
          svg: SVG_ICONS.avatars.leaf,
        },
        {
          q: "O que significa reciclar?",
          options: [
            "Reutilizar materiais",
            "Jogar fora",
            "Queimar lixo",
            "Enterrar resíduos",
          ],
          answer: 0,
          svg: SVG_ICONS.ui.recycle,
        },
        {
          q: "Qual é a cor da lixeira para metal?",
          options: ["Vermelha", "Verde", "Azul", "Amarela"],
          answer: 0,
          svg: SVG_ICONS.bins.metal,
        },
        {
          q: "Por que devemos plantar árvores?",
          options: [
            "Para poluir o ar",
            "Para aumentar o lixo",
            "Para melhorar o meio ambiente",
            "Para gastar água",
          ],
          answer: 2,
          svg: SVG_ICONS.avatars.tree,
        },
        {
          q: "Qual dessas atitudes reduz a produção de lixo?",
          options: [
            "Usar produtos descartáveis",
            "Reutilizar embalagens",
            "Jogar lixo na rua",
            "Desperdiçar comida",
          ],
          answer: 1,
          svg: SVG_ICONS.ui.recycle,
        },
        {
          q: "O que devemos fazer com óleo de cozinha usado?",
          options: [
            "Jogar na pia",
            "Descartar no lixo comum",
            "Levar a ponto de coleta",
            "Jogar no vaso sanitário",
          ],
          answer: 2,
          svg: SVG_ICONS.materials.can,
        },
      ],
      current: 0,
      selected: null,
      feedback: "",
      showNext: false,
      answeredQuestions: new Set(), // Controle de perguntas respondidas
      availableQuestions: [], // Array de perguntas disponíveis
      currentQuestion: null, //
      isGameOver: false, // Controle de fim de jogo
      correctAnswers: 0, // Contador de respostas corretas
      totalAnswered: 0, // Total de perguntas respondidas
      streakCount: 0, // Sequência de acertos
    };
  },
  created() {
    // Inicializa o jogo com perguntas aleatórias
    this.initializeGame();
  },
  methods: {
    initializeGame() {
      // Embaralha todas as perguntas
      this.availableQuestions = [...this.questions]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Seleciona a primeira pergunta
      this.selectNextQuestion();
    },
    selectNextQuestion() {
      if (this.availableQuestions.length === 0) {
        this.isGameOver = true;
        return;
      }

      // Seleciona uma pergunta aleatória das disponíveis
      const randomIndex = Math.floor(
        Math.random() * this.availableQuestions.length
      );
      this.currentQuestion = this.availableQuestions[randomIndex];

      // Remove a pergunta selecionada das disponíveis
      this.availableQuestions.splice(randomIndex, 1);

      // Reseta o estado da pergunta
      this.selected = null;
      this.feedback = "";
      this.showNext = false;
    },
    selectOption(idx) {
      if (this.selected !== null) return;

      this.selected = idx;
      this.totalAnswered++;

      if (idx === this.currentQuestion.answer) {
        this.correctAnswers++;
        this.streakCount++;

        // Calcula pontos bônus baseado na sequência
        let bonusPoints = 0;
        if (this.streakCount >= 3) bonusPoints = 5;
        if (this.streakCount >= 5) bonusPoints = 10;
        if (this.streakCount >= 7) bonusPoints = 15;

        this.feedback = `Correto! +10 pontos ${
          bonusPoints > 0 ? `+ ${bonusPoints} bônus!` : ""
        }`;
        this.addPoints(10 + bonusPoints, "quiz");

        // Adiciona efeitos visuais para feedback positivo
        this.$nextTick(() => {
          const element = document.querySelector(".feedback-message");
          if (element) {
            element.classList.add("animate__animated", "animate__bounceIn");
          }
        });
      } else {
        this.streakCount = 0;
        this.feedback =
          "Ops! A resposta correta era: " +
          this.currentQuestion.options[this.currentQuestion.answer];
      }

      // Marca a pergunta como respondida
      this.answeredQuestions.add(this.currentQuestion.id);
      this.showNext = true;
    },
    nextQuestion() {
      this.selectNextQuestion();
    },
    restartGame() {
      this.answeredQuestions.clear();
      this.correctAnswers = 0;
      this.totalAnswered = 0;
      this.streakCount = 0;
      this.isGameOver = false;
      this.initializeGame();
    },
  },
  template: `
    <div class="quiz-container text-center">
      <div v-if="!isGameOver">
        <!-- Progresso -->
        <div class="progress mb-4" style="height: 10px;">
          <div class="progress-bar bg-success" role="progressbar"
               :style="{ width: (answeredQuestions.size / questions.length * 100) + '%' }">
          </div>
        </div>

        <!-- Contador -->
        <div class="mb-4">
          <span class="badge bg-primary">Pergunta {{ totalAnswered + 1 }} de {{ questions.length }}</span>
          <span class="badge bg-success ms-2">{{ correctAnswers }} Corretas</span>
          <span v-if="streakCount >= 3" class="badge bg-warning ms-2">
            <i class="bi bi-lightning-fill"></i> {{ streakCount }}x
          </span>
        </div>

        <!-- Pergunta atual -->
        <div class="card mb-4 question-card animate__animated animate__fadeIn">
          <div class="card-body">
            <div class="quiz-image mb-4" v-html="currentQuestion.svg"></div>
            <h3 class="mb-4">{{ currentQuestion.q }}</h3>

            <div class="row justify-content-center">
              <div class="col-12 col-md-6" v-for="(opt, idx) in currentQuestion.options" :key="idx">
                <button class="btn btn-outline-primary w-100 mb-3 p-3 option-button"
                        :class="{
                          'btn-success': selected === idx && idx === currentQuestion.answer,
                          'btn-danger': selected === idx && idx !== currentQuestion.answer,
                          'disabled': selected !== null
                        }"
                        @click="selectOption(idx)">
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback -->
        <div v-if="feedback"
             class="alert feedback-message"
             :class="feedback.includes('Correto') ? 'alert-success' : 'alert-danger'">
          {{ feedback }}
        </div>

        <!-- Próxima pergunta -->
        <button v-if="showNext"
                class="btn btn-primary btn-lg animate__animated animate__bounceIn"
                @click="nextQuestion">
          <i class="bi bi-arrow-right-circle-fill me-2"></i>
          Próxima Pergunta
        </button>
      </div>

      <!-- Fim de jogo -->
      <div v-else class="game-over animate__animated animate__fadeIn">
        <div class="card">
          <div class="card-body">
            <h2 class="mb-4">
              <i class="bi bi-trophy-fill text-warning me-2"></i>
              Parabéns!
            </h2>
            <p class="lead">Você completou o quiz!</p>
            <p class="mb-4">
              Acertou {{ correctAnswers }} de {{ questions.length }} perguntas
              ({{ Math.round(correctAnswers/questions.length*100) }}%)
            </p>
            <button class="btn btn-primary btn-lg" @click="restartGame">
              <i class="bi bi-arrow-repeat me-2"></i>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Jogo 2: Clique no lixo correto
const GameClick = {
  props: ["addPoints"],
  data() {
    return {
      items: [
        {
          name: "Garrafa PET",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Jornal",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Casca de Banana",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Lata",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        // Novos itens
        {
          name: "Garrafa de Vidro",
          type: "Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
        {
          name: "Caixa de Papelão",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Restos de Verdura",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Pote de Iogurte",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Revista",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Tampa de Garrafa",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Guardanapo Sujo",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Saco Plástico",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Jornal Velho",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Prego",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Copo de Vidro",
          type: "Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
        {
          name: "Latinha de Refrigerante",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Papelão",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Casca de Ovo",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Embalagem de Plástico",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Frasco de Perfume",
          type: "Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
      ],
      bins: [
        {
          name: "Plástico",
          color: "warning",
          svg: SVG_ICONS.bins.plastic,
        },
        {
          name: "Papel",
          color: "primary",
          svg: SVG_ICONS.bins.paper,
        },
        {
          name: "Orgânico",
          color: "success",
          svg: SVG_ICONS.bins.organic,
        },
        {
          name: "Metal",
          color: "danger",
          svg: SVG_ICONS.bins.metal,
        },
      ],
      current: 0,
      feedback: "",
      showNext: false,
    };
  },
  methods: {
    selectBin(bin) {
      if (this.showNext) return;
      if (bin.name === this.items[this.current].type) {
        this.feedback = "Correto! +10 pontos";
        this.addPoints(10);
      } else {
        this.feedback = "Ops! Tente novamente!";
      }
      this.showNext = true;
    },
    nextItem() {
      this.current++;
      this.feedback = "";
      this.showNext = false;
    },
  },
  template: `
    <div class="text-center">
      <!-- Jogo 2: Clique no lixo correto -->
      <!-- SVG DO ITEM: -->
      <div class="click-image" v-html="items[current].svg"></div>
      <h4 class="mb-3">Em qual lixeira este item deve ser jogado?</h4>
      <div class="row justify-content-center mb-3">
        <div class="col-6 col-md-3" v-for="bin in bins" :key="bin.name">
          <button class="btn w-100 mb-2" :class="'btn-' + bin.color" @click="selectBin(bin)">
            <div class="d-inline-block me-2" style="width:32px; height:32px;" v-html="bin.svg"></div>
            {{ bin.name }}
          </button>
        </div>
      </div>
      <div v-if="feedback" class="alert" :class="feedback.includes('Correto') ? 'alert-success' : 'alert-danger'">{{ feedback }}</div>
      <button v-if="showNext && current < items.length - 1" class="btn btn-primary" @click="nextItem">Próximo</button>
      <div v-if="current === items.length - 1 && showNext" class="mt-3 fw-bold text-success">Fim do jogo! Parabéns!</div>
    </div>
  `,
};

// Jogo 3: Arraste e solte (simples)
const GameDrag = {
  props: ["addPoints"],
  data() {
    return {
      items: [
        {
          name: "Garrafa PET",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Jornal",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Casca de Banana",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Lata",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Garrafa de Vidro",
          type: "Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
        {
          name: "Caixa de Papelão",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Restos de Verdura",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Pote de Iogurte",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Revista",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Tampa de Garrafa",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Guardanapo Sujo",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Saco Plástico",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Jornal Velho",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Prego",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Copo de Vidro",
          type: "Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
        {
          name: "Latinha de Refrigerante",
          type: "Metal",
          svg: SVG_ICONS.materials.can,
        },
        {
          name: "Papelão",
          type: "Papel",
          svg: SVG_ICONS.materials.paper,
        },
        {
          name: "Casca de Ovo",
          type: "Orgânico",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          name: "Embalagem de Plástico",
          type: "Plástico",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          name: "Frasco de Perfume",
          type: "Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
      ],
      bins: [
        {
          name: "Plástico",
          svg: SVG_ICONS.bins.plastic,
          color: "Amarelo",
          description: "Amarelo - Plásticos",
        },
        {
          name: "Papel",
          svg: SVG_ICONS.bins.paper,
          color: "Azul",
          description: "Azul - Papéis",
        },
        {
          name: "Orgânico",
          svg: SVG_ICONS.bins.organic,
          color: "Marrom",
          description: "Marrom - Orgânicos",
        },
        {
          name: "Metal",
          svg: SVG_ICONS.bins.metal,
          color: "Vermelho",
          description: "Vermelho - Metais",
        },
        {
          name: "Vidro",
          svg: SVG_ICONS.bins.glass,
          color: "Verde",
          description: "Verde - Vidros",
        },
      ],
      dragging: null,
      feedback: "",
      done: false,
    };
  },
  methods: {
    onDragStart(idx) {
      this.dragging = idx;
    },
    onDrop(bin, event) {
      // Remove o efeito visual de drag over
      event.target.classList.remove("drag-over");

      if (this.dragging === null) return;
      const item = this.items[this.dragging];
      if (item.type === bin.name) {
        this.feedback = `Correto! ${
          item.name
        } vai para a lixeira ${bin.color.toLowerCase()}! +10 pontos`;
        this.addPoints(10, "drag");
        this.items.splice(this.dragging, 1);
      } else {
        this.feedback = `Ops! ${
          item.name
        } não vai na lixeira ${bin.color.toLowerCase()}. Tente novamente!`;
      }
      this.dragging = null;
      if (this.items.length === 0) this.done = true;
    },
    getBinBorderColor(color) {
      const colors = {
        Amarelo: "#ffc107",
        Azul: "#007bff",
        Marrom: "#8b4513",
        Vermelho: "#dc3545",
        Verde: "#28a745",
      };
      return colors[color] || "#6c757d";
    },
  },
  template: `
    <div class="text-center">
      <!-- Jogo 3: Arraste e solte -->
      <!-- SVG DO JOGO: -->
      <div class="drag-image" v-html="$parent.SVG_ICONS.ui.recycle"></div>
      <h4 class="mb-4">Arraste o lixo para a lixeira correta!</h4>

      <!-- Itens para arrastar -->
      <div class="game-section">
        <h5>
          <i class="bi bi-box-seam me-2"></i>Itens para separar:
        </h5>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div v-for="(item, idx) in items" :key="item.name"
               class="draggable-item"
               draggable="true"
               @dragstart="onDragStart(idx)">
            <div v-html="item.svg"></div>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>

      <!-- Lixeiras de coleta seletiva -->
      <div class="game-section">
        <h5>
          <i class="bi bi-recycle me-2"></i>Lixeiras de Coleta Seletiva:
        </h5>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div v-for="bin in bins" :key="bin.name"
               class="drop-zone"
               :data-color="bin.color"
               :style="{borderColor: getBinBorderColor(bin.color)}"
               @dragover.prevent
               @dragenter.prevent="$event.target.classList.add('drag-over')"
               @dragleave.prevent="$event.target.classList.remove('drag-over')"
               @drop="onDrop(bin, $event)">
            <div v-html="bin.svg"></div>
            <div class="fw-bold">{{ bin.name }}</div>
            <small>{{ bin.color }}</small>
          </div>
        </div>
      </div>

      <div v-if="feedback"
           class="alert animate__animated animate__fadeIn"
           :class="feedback.includes('Correto') ? 'alert-success' : 'alert-danger'">
        {{ feedback }}
      </div>

      <div v-if="done" class="mt-4">
        <div class="alert alert-success animate__animated animate__bounceIn">
          <h5 class="mb-3">
            <i class="bi bi-check-circle-fill me-2"></i>
            Parabéns! Você separou todo o lixo corretamente!
          </h5>
          <p class="mb-0">Você está ajudando a preservar o meio ambiente! 🌱</p>
        </div>
      </div>
    </div>
  `,
};

// Jogo 4: Memória ecológica
const GameMemory = {
  props: ["addPoints"],
  data() {
    return {
      cards: [
        {
          id: 1,
          name: "Árvore",
          svg: SVG_ICONS.avatars.tree,
        },
        {
          id: 2,
          name: "Água",
          svg: SVG_ICONS.avatars.water_drop,
        },
        {
          id: 3,
          name: "Reciclagem",
          svg: SVG_ICONS.ui.recycle,
        },
        {
          id: 4,
          name: "Lixeira",
          svg: SVG_ICONS.bins.paper,
        },
        {
          id: 5,
          name: "Folha",
          svg: SVG_ICONS.avatars.leaf,
        },
        {
          id: 6,
          name: "Garrafa PET",
          svg: SVG_ICONS.materials.plastic_bottle,
        },
        {
          id: 7,
          name: "Jornal",
          svg: SVG_ICONS.materials.paper,
        },
        {
          id: 8,
          name: "Casca de Banana",
          svg: SVG_ICONS.materials.banana_peel,
        },
        {
          id: 9,
          name: "Lata",
          svg: SVG_ICONS.materials.can,
        },
        {
          id: 10,
          name: "Garrafa de Vidro",
          svg: SVG_ICONS.materials.glass_bottle,
        },
      ],
      deck: [],
      flipped: [],
      matched: [],
      feedback: "",
      isLocked: false,
      moves: 0,
      startTime: null,
      endTime: null,
      isGameOver: false,
      difficulty: "medium", // easy, medium, hard
      difficultySettings: {
        easy: { pairs: 6, timeLimit: 120 },
        medium: { pairs: 8, timeLimit: 180 },
        hard: { pairs: 10, timeLimit: 240 },
      },
      timeLeft: 0,
      timer: null,
    };
  },
  computed: {
    gameStats() {
      if (!this.endTime) return null;
      const timeSpent = Math.floor((this.endTime - this.startTime) / 1000);
      const minutes = Math.floor(timeSpent / 60);
      const seconds = timeSpent % 60;
      return {
        moves: this.moves,
        time: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        score: this.calculateScore(),
      };
    },
  },
  created() {
    this.initializeGame();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    initializeGame() {
      // Seleciona cartas baseado na dificuldade
      const numPairs = this.difficultySettings[this.difficulty].pairs;
      const selectedCards = [...this.cards]
        .sort(() => Math.random() - 0.5)
        .slice(0, numPairs);

      // Duplica e embaralha
      this.deck = [...selectedCards, ...selectedCards]
        .map((card) => ({ ...card, isFlipped: false, isMatched: false }))
        .sort(() => Math.random() - 0.5);

      this.flipped = [];
      this.matched = [];
      this.moves = 0;
      this.feedback = "";
      this.isLocked = false;
      this.isGameOver = false;
      this.startTime = Date.now();
      this.timeLeft = this.difficultySettings[this.difficulty].timeLimit;

      this.startTimer();
    },
    startTimer() {
      this.stopTimer();
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.endGame(false);
        }
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    flipCard(idx) {
      if (
        this.isLocked ||
        this.flipped.length === 2 ||
        this.flipped.includes(idx) ||
        this.matched.includes(idx) ||
        this.isGameOver
      )
        return;

      this.deck[idx].isFlipped = true;
      this.flipped.push(idx);

      if (this.flipped.length === 2) {
        this.moves++;
        this.isLocked = true;
        this.checkMatch();
      }
    },
    checkMatch() {
      const [firstIdx, secondIdx] = this.flipped;
      const firstCard = this.deck[firstIdx];
      const secondCard = this.deck[secondIdx];

      if (firstCard.id === secondCard.id) {
        // Match encontrado
        this.matched.push(...this.flipped);
        this.feedback = "Par encontrado! +10 pontos";
        this.addPoints(10, "memory");

        // Bônus por velocidade
        if (this.moves === 2) {
          this.feedback = "Incrível! Primeiro par! +15 pontos";
          this.addPoints(15, "memory");
        }

        // Verifica vitória
        if (this.matched.length === this.deck.length) {
          this.endGame(true);
        }
      } else {
        // Sem match
        setTimeout(() => {
          this.deck[firstIdx].isFlipped = false;
          this.deck[secondIdx].isFlipped = false;
        }, 1000);
      }

      setTimeout(() => {
        this.flipped = [];
        this.isLocked = false;
        this.feedback = "";
      }, 1000);
    },
    calculateScore() {
      const baseScore = this.matched.length * 5;
      const timeBonus = Math.max(0, this.timeLeft);
      const movesPenalty = Math.max(0, this.moves - this.deck.length);
      return baseScore + timeBonus - movesPenalty;
    },
    endGame(won) {
      this.stopTimer();
      this.endTime = Date.now();
      this.isGameOver = true;

      if (won) {
        const score = this.calculateScore();
        this.feedback = `Parabéns! Você venceu! +${score} pontos`;
        this.addPoints(score, "memory");
      } else {
        this.feedback = "Tempo esgotado! Tente novamente!";
      }
    },
    changeDifficulty(level) {
      this.difficulty = level;
      this.initializeGame();
    },
  },
  template: `
    <div class="memory-game-container text-center">
      <!-- Controles do jogo -->
      <div class="controls mb-4">
        <div class="difficulty-selector btn-group">
          <button class="btn"
                  v-for="level in ['easy', 'medium', 'hard']"
                  :key="level"
                  :class="{
                    'btn-primary': difficulty === level,
                    'btn-outline-primary': difficulty !== level
                  }"
                  @click="changeDifficulty(level)">
            {{ level.charAt(0).toUpperCase() + level.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Status do jogo -->
      <div class="status-bar mb-4">
        <div class="row align-items-center">
          <div class="col">
            <span class="badge bg-primary">
              <i class="bi bi-clock"></i>
              {{ Math.floor(timeLeft / 60) }}:{{ (timeLeft % 60).toString().padStart(2, '0') }}
            </span>
          </div>
          <div class="col">
            <span class="badge bg-success">
              <i class="bi bi-arrow-repeat"></i>
              {{ moves }} Jogadas
            </span>
          </div>
          <div class="col">
            <span class="badge bg-info">
              <i class="bi bi-check2-circle"></i>
              {{ matched.length/2 }}/{{ deck.length/2 }} Pares
            </span>
          </div>
        </div>
      </div>

      <!-- Tabuleiro -->
      <div class="memory-board">
        <div v-for="(card, idx) in deck"
             :key="idx"
             class="memory-card"
             :class="{
               'flipped': card.isFlipped,
               'matched': matched.includes(idx)
             }"
             @click="flipCard(idx)">
          <div class="card-inner">
            <div class="card-front">
              <i class="bi bi-question-lg"></i>
            </div>
            <div class="card-back">
              <div v-html="card.svg"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div v-if="feedback"
           class="alert mt-4"
           :class="feedback.includes('Parabéns') ? 'alert-success' : 'alert-info'">
        {{ feedback }}
      </div>

      <!-- Modal de fim de jogo -->
      <div v-if="isGameOver" class="game-over-modal">
        <div class="card animate__animated animate__bounceIn">
          <div class="card-body">
            <h3 class="card-title mb-4">
              <i class="bi bi-trophy-fill text-warning me-2"></i>
              {{ matched.length === deck.length ? 'Parabéns!' : 'Fim de Jogo' }}
            </h3>
            <div class="stats">
              <p class="mb-2">Tempo: {{ gameStats.time }}</p>
              <p class="mb-2">Jogadas: {{ gameStats.moves }}</p>
              <p class="mb-4">Pontuação: {{ gameStats.score }}</p>
            </div>
            <button class="btn btn-primary btn-lg" @click="initializeGame">
              <i class="bi bi-arrow-repeat me-2"></i>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

// App principal
createApp({
  data() {
    return {
      points: 0,
      currentPage: "quiz",
      ranking: [],
      games: [
        { name: "Quiz", route: "quiz", icon: "bi bi-question-circle" },
        { name: "Arraste e Solte", route: "drag", icon: "bi bi-arrows-move" },
        { name: "Memória", route: "memory", icon: "bi bi-grid-3x3-gap" },
        { name: "Ranking", route: "ranking", icon: "bi bi-trophy-fill" },
      ],
      // Usuário
      userName: "",
      userClass: "",
      userIcon: "",
      userIcons: [
        SVG_ICONS.avatars.leaf, // folha
        SVG_ICONS.avatars.tree, // árvore
        SVG_ICONS.avatars.water_drop, // gota
        SVG_ICONS.materials.plastic_bottle, // garrafa reciclável
        SVG_ICONS.materials.can, // pilha/lata
        SVG_ICONS.bins.paper, // lixeira azul
        SVG_ICONS.ui.recycle, // reciclagem
        SVG_ICONS.avatars.flower, // flor
        SVG_ICONS.avatars.sun, // sol
        SVG_ICONS.avatars.cloud, // nuvem
        SVG_ICONS.avatars.mountain, // montanha
        SVG_ICONS.avatars.mushroom, // cogumelo
        SVG_ICONS.avatars.cactus, // cacto
        // Variações de flores e natureza
        SVG_ICONS.avatars.flower,
        SVG_ICONS.avatars.leaf,
        SVG_ICONS.avatars.tree,
        SVG_ICONS.avatars.water_drop,
        SVG_ICONS.avatars.sun,
        SVG_ICONS.avatars.cloud,
        SVG_ICONS.avatars.mountain,
        SVG_ICONS.avatars.mushroom,
        SVG_ICONS.avatars.cactus,
      ],
      streak: 0, // Para o sistema de pontos em sequência
      anosEscolares: [
        "1º Ano",
        "2º Ano",
        "3º Ano",
        "4º Ano",
        "5º Ano",
        "6º Ano",
        "7º Ano",
        "8º Ano",
        "9º Ano",
        "1º EM",
        "2º EM",
        "3º EM",
      ],
      userClassYear: "",
      userClassLetter: "",
      isOnline: true, // Status de conexão com a API
      connectionStatus: "checking", // checking, online, offline
    };
  },
  mounted() {
    // Exibe o modal ao carregar
    const modal = new bootstrap.Modal(document.getElementById("welcomeModal"));
    if (!this.userName || !this.userClass || !this.userIcon) {
      setTimeout(() => modal.show(), 200);
    }
    this.loadRanking();
    this.checkConnection();
  },
  computed: {
    currentComponent() {
      switch (this.currentPage) {
        case "quiz":
          return GameQuiz;
        case "drag":
          return GameDrag;
        case "memory":
          return GameMemory;
        default:
          return GameQuiz;
      }
    },
    SVG_ICONS() {
      return SVG_ICONS;
    },
  },
  methods: {
    addPoints(pts, type = "jogo") {
      // Sistema de pontos mais complexo
      // type pode ser: 'quiz', 'click', 'drag', 'memory', 'bonus', etc
      let bonus = 0;
      if (type === "quiz") bonus = 2; // Quiz vale mais
      if (type === "click") bonus = 1;
      if (type === "drag") bonus = 3; // Arraste vale mais
      if (type === "memory") bonus = 2;
      if (type === "bonus") bonus = 5;
      // Pontuação baseada em acertos seguidos
      if (!this.streak) this.streak = 0;
      this.streak++;
      let streakBonus = Math.floor(this.streak / 3) * 2; // a cada 3 acertos, +2 pontos
      this.points += pts + bonus + streakBonus;
      this.saveRanking();
    },
    async saveRanking() {
      try {
        // URL da API (detecta automaticamente)
        // Lógica mais robusta para funcionar na internet
        const API_URL = this.getApiUrl();

        // Verifica se o usuário já existe no ranking
        const response = await fetch(`${API_URL}/ranking`);
        const ranking = await response.json();

        const existingUser = ranking.find(
          (u) => u.name === this.userName && u.class === this.userClass
        );

        if (existingUser) {
          // Atualiza pontos apenas se for maior (mantém o melhor resultado)
          if (this.points > existingUser.points) {
            await fetch(`${API_URL}/ranking/${existingUser.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...existingUser,
                points: this.points,
                avatar: this.userIcon,
                lastUpdate: new Date().toISOString(),
              }),
            });
          }
        } else {
          // Adiciona novo usuário
          await fetch(`${API_URL}/ranking`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.userName,
              class: this.userClass,
              points: this.points,
              avatar: this.userIcon,
              createdAt: new Date().toISOString(),
              lastUpdate: new Date().toISOString(),
            }),
          });
        }

        // Recarrega o ranking após salvar
        await this.loadRanking();
      } catch (error) {
        console.warn(
          "Erro ao salvar ranking na API, usando localStorage como fallback:",
          error
        );
        // Fallback para localStorage se a API não estiver disponível
        this.saveRankingLocal();
      }
    },

    saveRankingLocal() {
      // Fallback para localStorage (método original)
      let ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
      const idx = ranking.findIndex(
        (u) => u.name === this.userName && u.class === this.userClass
      );
      if (idx >= 0) {
        // Atualiza pontos apenas se for maior (mantém o melhor resultado)
        if (this.points > ranking[idx].points) {
          ranking[idx].points = this.points;
          ranking[idx].avatar = this.userIcon;
        }
      } else {
        ranking.push({
          name: this.userName,
          class: this.userClass,
          points: this.points,
          avatar: this.userIcon,
        });
      }
      ranking.sort((a, b) => b.points - a.points);
      localStorage.setItem("ranking", JSON.stringify(ranking));
      this.ranking = ranking;
    },
    async loadRanking() {
      try {
        // URL da API (detecta automaticamente)
        // Lógica mais robusta para funcionar na internet
        const API_URL = this.getApiUrl();

        const response = await fetch(`${API_URL}/ranking`);
        const ranking = await response.json();

        // Ordena por pontuação (maior primeiro)
        this.ranking = ranking.sort((a, b) => b.points - a.points);

        // Salva como backup no localStorage
        localStorage.setItem("ranking_backup", JSON.stringify(this.ranking));
      } catch (error) {
        console.warn(
          "Erro ao carregar ranking da API, usando localStorage como fallback:",
          error
        );
        // Fallback para localStorage se a API não estiver disponível
        this.loadRankingLocal();
      }
    },

    loadRankingLocal() {
      // Fallback para localStorage (método original)
      const ranking = JSON.parse(
        localStorage.getItem("ranking") ||
          localStorage.getItem("ranking_backup") ||
          "[]"
      );
      this.ranking = ranking.sort((a, b) => b.points - a.points);
    },
    openRanking() {
      this.loadRanking();
      const modal = new bootstrap.Modal(
        document.getElementById("rankingModal")
      );
      modal.show();
    },
    navigate(route) {
      if (route !== this.currentPage) {
        if (route !== "ranking") this.streak = 0;
        this.currentPage = route;
      }
    },
    saveUserInfo() {
      if (
        this.userName &&
        this.userClassYear &&
        this.userClassLetter &&
        this.userIcon
      ) {
        this.userClass = this.userClassYear + " " + this.userClassLetter;
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("welcomeModal")
        );
        modal.hide();
      }
    },

    formatDate(dateString) {
      if (!dateString) return "Local";
      const date = new Date(dateString);
      const now = new Date();
      const diffMinutes = Math.floor((now - date) / (1000 * 60));

      if (diffMinutes < 1) return "Agora";
      if (diffMinutes < 60) return `${diffMinutes}min atrás`;

      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h atrás`;

      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays}d atrás`;

      return date.toLocaleDateString("pt-BR");
    },

    async checkConnection() {
      try {
        // Lógica mais robusta para funcionar na internet
        const API_URL = this.getApiUrl();

        this.connectionStatus = "checking";

        // Tenta fazer uma requisição simples
        const response = await fetch(`${API_URL}/ranking`, {
          method: "GET",
          timeout: 5000,
        });

        if (response.ok) {
          this.connectionStatus = "online";
          this.isOnline = true;
        } else {
          throw new Error("API não respondeu corretamente");
        }
      } catch (error) {
        console.warn("Servidor offline, usando modo local:", error);
        this.connectionStatus = "offline";
        this.isOnline = false;
      }
    },
  },
}).mount("#app");
