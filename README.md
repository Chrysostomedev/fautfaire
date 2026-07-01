# 🌅 Yelen — Organise ta vie, illumine ton ambition

> *"Yelen"* = lumière en dioula. Une appli web mobile-first (Next.js) qui combine **organisation personnelle** (tâches, rappels, bilan du soir) et **gestion financière** (dépenses/revenus, KPI, objectifs), saupoudrée de **citations quotidiennes** de figures africaines et tech inspirantes — pensée pour les jeunes ivoiriens.

---

## 📌 1. Vision du produit

| Module | Ce que ça fait |
|---|---|
| ✅ **Tâches & Rappels** | Créer, organiser, planifier des tâches avec rappels (heure, récurrence) |
| 🌙 **Bilan du soir** | Chaque nuit, l'utilisateur coche ce qu'il a fait dans la journée → score de complétion, série (streak), note d'humeur |
| 💰 **Finances** | Enregistrer dépenses/revenus du jour, catégories adaptées au quotidien des jeunes (transport, forfait, maquis, tontine...) |
| 📊 **KPI & Objectifs** | Taux d'épargne, solde net, dépense moyenne/jour, progression vers un objectif (ex: acheter un PC, payer un loyer) |
| 🔔 **Rappels quotidiens** | Notification/push pour : remplir le bilan, enregistrer ses dépenses, consulter la citation du jour |
| ✨ **Citations & conseils** | Base JSON de milliers de citations (leadership, entrepreneuriat) de personnalités africaines et figures tech mondiales |

**Phase 1 (actuelle) :** tout en local — `localStorage` / fichiers JSON statiques, zéro backend.
**Phase 2 :** bascule transparente vers **Firebase** (Auth + Firestore + Cloud Messaging) sans réécrire les composants, grâce à la couche `services/` abstraite dès le départ.

---

## 🎨 2. Design system

- **Mobile-first strict** : conçu d'abord pour petits écrans Android bas de gamme (zones tactiles ≥ 48px)
- **Mode sombre par défaut** (économie batterie + préférence UX CI)
- **Navigation mobile** : bottom tab bar (pas de sidebar sur mobile, sidebar réservée au desktop ≥ 1024px)
- **Icônes** : [lucide-react](https://lucide.dev) partout — légères, cohérentes, tree-shakable
- **Palette** (`styles/colors.ts`) — à ajuster selon ta charte existante :

```ts
export const colors = {
  primary: "#f97316",      // orange — cohérent avec CAPEC, énergie/action
  primaryDark: "#c2410c",
  background: "#0B0E14",   // fond sombre par défaut
  surface: "#151A23",
  surfaceLight: "#1F2530",
  success: "#22C55E",      // revenus / tâches faites
  danger: "#EF4444",       // dépenses / tâches en retard
  warning: "#F59E0B",
  text: "#F8F5F0",
  textMuted: "#9AA3B2",
  border: "#262C38",
};
```

- **Typographie** (`styles/typo.css`) : une police lisible et moderne (ex: `Satoshi` ou `Inter`), tailles généreuses, line-height aéré pour la lecture mobile.

---

## 🗂️ 3. Arborescence complète

```
yelen/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # layout avec navbar + bottom tab nav
│   │   ├── page.tsx                    # accueil = vue KPI + citation du jour
│   │   ├── taches/
│   │   │   ├── page.tsx                # liste des tâches (todo list)
│   │   │   └── [id]/
│   │   │       └── page.tsx            # détail / édition tâche
│   │   ├── bilan/
│   │   │   ├── page.tsx                # bilan du soir (checklist + humeur)
│   │   │   └── historique/
│   │   │       └── page.tsx            # historique des bilans + streak
│   │   ├── finances/
│   │   │   ├── page.tsx                # vue d'ensemble (solde, graphes)
│   │   │   ├── depenses/
│   │   │   │   └── page.tsx
│   │   │   └── revenus/
│   │   │       └── page.tsx
│   │   ├── objectifs/
│   │   │   └── page.tsx                # objectifs financiers + progression
│   │   ├── citations/
│   │   │   └── page.tsx                # bibliothèque de citations (filtrable)
│   │   └── profil/
│   │       └── page.tsx
│   ├── api/
│   │   └── citations/
│   │       └── random/
│   │           └── route.ts            # endpoint local (lit le JSON statique)
│   ├── layout.tsx                      # root layout (theme, fonts, providers)
│   ├── globals.css
│   ├── manifest.ts                     # PWA manifest
│   └── icon.tsx                        # favicon généré
│
├── components/
│   ├── form/
│   │   ├── Input.tsx
│   │   ├── Button.tsx
│   │   ├── Select.tsx
│   │   ├── DatePicker.tsx
│   │   ├── Checkbox.tsx
│   │   └── ReusableForm.tsx
│   ├── cards/
│   │   ├── StatCard.tsx                # KPI (montant, %, icône, tendance)
│   │   ├── TaskCard.tsx
│   │   ├── TransactionCard.tsx
│   │   ├── QuoteCard.tsx
│   │   ├── GoalCard.tsx
│   │   └── Cards.tsx                   # barrel export
│   ├── sections/
│   │   ├── DashboardHeader.tsx
│   │   ├── KPISection.tsx
│   │   ├── QuoteOfTheDay.tsx
│   │   ├── BilanChecklist.tsx
│   │   └── ExpenseChart.tsx
│   ├── ui/
│   │   ├── DataTable.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── layout/
│   │   ├── Navbar.tsx                  # desktop
│   │   ├── Sidebar.tsx                 # desktop ≥ 1024px
│   │   └── BottomTabNav.tsx            # mobile — icônes : Accueil, Tâches, Finances, Bilan, Profil
│   └── modals/
│       ├── ConfirmModal.tsx
│       ├── SideModal.tsx
│       ├── AddTaskModal.tsx
│       ├── AddTransactionModal.tsx
│       └── AddGoalModal.tsx
│
├── styles/
│   ├── typo.css
│   ├── colors.ts
│   └── globals.css
│
├── contexts/
│   ├── AuthContext.tsx                 # mock auth phase 1 → Firebase Auth phase 2
│   ├── ThemeContext.tsx
│   └── ReminderContext.tsx             # gère les rappels actifs (notif locales)
│
├── hooks/
│   ├── useTasks.ts
│   ├── useBilan.ts
│   ├── useFinances.ts
│   ├── useKPI.ts
│   ├── useQuotes.ts
│   ├── useReminders.ts
│   └── useLocalStorage.ts
│
├── lib/
│   ├── utils.ts                        # cn(), formatters
│   ├── constants.ts                    # catégories dépenses/revenus, routes
│   ├── validators.ts                   # schémas Zod (tâche, transaction, objectif)
│   ├── date.ts                         # helpers date/heure (dayjs)
│   └── storage.ts                      # wrapper localStorage (clé unique par module)
│
├── services/
│   ├── task.service.ts                 # CRUD tâches (local → Firestore plus tard)
│   ├── bilan.service.ts
│   ├── finance.service.ts
│   ├── kpi.service.ts                  # calculs KPI à partir des transactions
│   ├── quote.service.ts                # tirage aléatoire / filtrage citations
│   ├── notification.service.ts         # Notification API web + (futur FCM)
│   └── firebase/                       # 🔒 vide en phase 1, activé en phase 2
│       ├── firebase.config.ts
│       ├── auth.service.ts
│       └── firestore.service.ts
│
├── store/                              # Zustand
│   ├── useTaskStore.ts
│   ├── useFinanceStore.ts
│   ├── useBilanStore.ts
│   └── useUserStore.ts
│
├── types/
│   ├── task.types.ts
│   ├── finance.types.ts
│   ├── bilan.types.ts
│   ├── quote.types.ts
│   └── user.types.ts
│
├── data/
│   ├── mock/
│   │   ├── tasks.mock.json
│   │   └── transactions.mock.json
│   └── json/
│       ├── citations.json              # 🎯 milliers de citations
│       └── conseils.json               # conseils journaliers (entrepreneuriat/leadership)
│
├── public/
│   ├── icons/
│   ├── manifest.json
│   └── sw.js                           # service worker (PWA / offline)
│
├── middleware.ts                       # i18n fr/en (option) + protection routes
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env.local.example
└── package.json
```

---

## 🧩 4. Modèles de données

```ts
// types/task.types.ts
export interface Task {
  id: string;
  titre: string;
  description?: string;
  dateEcheance?: string;        // ISO
  heureRappel?: string;         // "HH:mm"
  recurrence?: "aucune" | "quotidienne" | "hebdomadaire";
  statut: "a_faire" | "en_cours" | "terminee";
  priorite: "basse" | "moyenne" | "haute";
  createdAt: string;
}

// types/bilan.types.ts
export interface BilanJournalier {
  id: string;
  date: string;                 // ISO (jour)
  tachesCochees: string[];      // ids des tâches validées
  tauxCompletion: number;       // %
  humeur: "excellent" | "bien" | "moyen" | "difficile";
  note?: string;
  streak: number;               // jours consécutifs avec bilan rempli
}

// types/finance.types.ts
export type CategorieDepense =
  | "transport" | "nourriture" | "forfait_internet" | "loisirs"
  | "logement" | "sante" | "etudes" | "tontine" | "famille" | "autre";

export type CategorieRevenu =
  | "stage_emploi" | "freelance" | "bourse" | "famille" | "side_hustle" | "tontine_recue" | "autre";

export interface Transaction {
  id: string;
  type: "depense" | "revenu";
  montant: number;              // FCFA
  categorie: CategorieDepense | CategorieRevenu;
  date: string;
  note?: string;
}

export interface KPIFinancier {
  soldeNet: number;
  totalDepensesMois: number;
  totalRevenusMois: number;
  tauxEpargne: number;          // %
  depenseMoyenneJour: number;
  categorieTopDepense: string;
}

export interface Objectif {
  id: string;
  titre: string;                // ex: "Acheter un laptop"
  montantCible: number;
  montantActuel: number;
  dateLimite?: string;
  icone: string;                // nom icône lucide
}

// types/quote.types.ts
export interface Citation {
  id: string;
  texte: string;
  auteur: string;
  origine: "afrique" | "tech" | "les_deux";
  domaine: ("leadership" | "entrepreneuriat" | "resilience" | "innovation" | "discipline")[];
  langue: "fr" | "en";
}
```

### Exemple `data/json/citations.json`

```json
[
  {
    "id": "q0001",
    "texte": "On peut tuer un homme mais pas ses idées.",
    "auteur": "Thomas Sankara",
    "origine": "afrique",
    "domaine": ["leadership", "resilience"],
    "langue": "fr"
  },
  {
    "id": "q0002",
    "texte": "Stay hungry, stay foolish.",
    "auteur": "Steve Jobs",
    "origine": "tech",
    "domaine": ["entrepreneuriat", "innovation"],
    "langue": "en"
  }
]
```
*(Personnalités à couvrir : Sankara, Nkrumah, Aliko Dangote, Tony Elumelu, Strive Masiyiwa, Wangari Maathai, Chimamanda Ngozi Adichie, Patrice Motsepe côté africain ; Jobs, Musk, Bill Gates, Sam Altman, Satya Nadella côté tech — à toi de constituer le corpus, je peux t'aider à le générer en masse si tu veux.)*

---

## 💸 5. Catégories de dépenses pensées "jeunes ivoiriens"

| Dépenses | Revenus |
|---|---|
| 🚕 Transport (gbaka, taxi, woro-woro) | 💼 Stage / Emploi |
| 🍲 Nourriture / Maquis | 💻 Freelance |
| 📶 Forfait internet (Orange/MTN/Moov) | 🎓 Bourse |
| 🎉 Loisirs / Sorties | 👨‍👩‍👧 Famille |
| 🏠 Logement | 🚀 Side hustle |
| 🏥 Santé | 🔄 Tontine reçue |
| 📚 Études / Formation | |
| 🤝 Tontine / Épargne groupe | |
| 👨‍👩‍👧 Transferts famille | |

---

## 🚀 6. Stack technique

- **Next.js 14+** (App Router, Server Components par défaut, `'use client'` ciblé)
- **TypeScript strict**
- **TailwindCSS** + composants déjà existants (form, cards, modals, sections, ui, layout)
- **Zustand** pour l'état global léger (tâches, finances, user)
- **Zod** pour la validation de tous les formulaires
- **lucide-react** pour les icônes
- **dayjs** pour les dates
- **PWA** (manifest + service worker) pour usage offline-first et notifications locales
- **Firebase** (Auth, Firestore, Cloud Messaging) → activé en phase 2 via `services/firebase/`

---

## 🛣️ 7. Roadmap

**Phase 1 — Statique (actuelle)**
- [ ] CRUD tâches en `localStorage`
- [ ] Bilan du soir avec calcul de streak
- [ ] CRUD transactions + calcul KPI en local
- [ ] Citation du jour tirée de `citations.json`
- [ ] Rappels via `Notification` API du navigateur
- [ ] PWA installable

**Phase 2 — Firebase**
- [ ] Auth Firebase (email + Google)
- [ ] Migration `services/*.service.ts` vers Firestore (interfaces identiques, zéro refonte des composants)
- [ ] Cloud Messaging pour push réels (bilan du soir, rappel dépenses)
- [ ] Sync multi-appareil

---

## 💰 8. Déployer en CI — coûts estimés

| Service | Usage | Coût |
|---|---|---|
| Vercel Hobby | Hébergement Next.js | Gratuit |
| Firebase Spark (phase 2) | Auth + Firestore + FCM | Gratuit jusqu'à quotas généreux |
| Domaine `.ci` ou `.com` | Optionnel | ~5 000–15 000 FCFA/an |

→ **MVP à coût zéro**, scalable progressivement.

---

## ▶️ 9. Démarrage

```bash
npx create-next-app@latest yelen --typescript --tailwind --app
cd yelen
npm install zustand zod dayjs lucide-react
```

```bash
npm run dev
```

---

## 📎 10. Voir aussi
#   f a u t f a i r e  
 