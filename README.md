# Customer Operations Portal

Bienvenue dans le dépôt du **Customer Operations Portal**. Ce portail est conçu pour les équipes de support, d'opérations et les Account Managers afin de centraliser la gestion des clients et de réaliser des opérations métier sensibles de manière sécurisée et réactive.

---

## 🛠️ Architecture & Choix Techniques

Le projet s'appuie sur une pile technologique moderne et robuste, garantissant de hautes performances et une type-safety stricte :

1. **Framework & Setup** : React 19 + TypeScript + Vite.
2. **Design System & Styling** : Tailwind CSS v4 + Composants **shadcn/ui** (Preset Nova) pour une esthétique moderne et une UI soignée.
3. **Routing Type-safe** : **TanStack Router** v1 pour une validation stricte des routes et une synchronisation automatique des filtres dans l'URL.
4. **Gestion du Cache & État Asynchrone** : **TanStack Query** v5 (React Query) pour les requêtes de données, la mise en cache intelligente, la gestion des erreurs réseau et les optimistic updates.
5. **Formulaires & Validation** : **React Hook Form** combiné à **Zod** pour la validation dynamique des saisies (ex: justification d'une action opérationnelle).
6. **Simulation API (Mocking)** : **Mock Service Worker (MSW)** v2 en mode navigateur pour intercepter les requêtes HTTP, simuler de la latence réseau (250-500ms) et des pannes intermittentes.

---

## 💎 Implémentations Qualitatives

### ♿ Accessibilité (Keyboard Navigation & ARIA)
*   **En-têtes triables accessibles** : Les colonnes de la table des clients disposent des rôles ARIA (`role="columnheader"`), d'attributs dynamiques de tri (`aria-sort="ascending|descending|none"`) et d'un support clavier complet (`tabIndex={0}` avec gestion de la touche `Enter` et de l'espace).
*   **Focus Trapping** : Les fenêtres de confirmation opérationnelles (`ActionConfirmDialog` basé sur Radix UI) piègent le focus clavier pour une navigation fluide au clavier pour les malvoyants.
*   **Sémantique HTML** : Utilisation stricte des balises structurées (`<main>`, `<header>`, `<nav>`, `<section>`).

### ⚡ Performance & Rendu
*   **Recherche debouncée** : Utilisation d'un hook personnalisé `useDebounce` sur l'input de recherche pour éviter les requêtes HTTP redondantes.
*   **Pagination côté serveur** : Les 200 clients générés sont découpés en pages limitées à 10 par défaut. Le tri et le filtrage sont délégués au mock backend pour un rendu instantané.
*   **Synchronisation d'input sans effet** : L'état local du champ de recherche utilise la prop `key` de React branchée sur le paramètre d'URL pour forcer un démontage propre, éliminant les rendus en cascade causés par les `useEffect` synchrones (bonne pratique React 19).

### 🛡️ Robustesse & Gestion d'Erreurs
*   **Error Boundaries** : Intégration de composants `ErrorFallback` sur chaque route majeure via la propriété `errorComponent` de TanStack Router. Si une section plante, le reste de l'application reste fonctionnel.
*   **Mises à jour optimistes (Optimistic Updates)** : En cas d'action opérationnelle (ex: suspension d'un compte), le statut du client passe instantanément à l'état visé sur l'écran. En cas d'erreur de requête d'API, l'état précédent est restauré automatiquement (rollback).
*   **Type-safety 100%** : Typage TypeScript strict avec `"strict": true` et `"strictNullChecks": true` activés. Aucun mot-clé `any` n'est présent dans le projet.

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
Le projet utilise `pnpm`. Installez les packages via :

```bash
pnpm install
```

* **Installer l'écosystème Playwright si nécessaire :**
```bash
pnpm playwright install
```

### 2. Démarrer le serveur de développement local
Pour lancer l'application en mode local :
```bash
pnpm dev
```
Ouvrez l'adresse indiquée (généralement `http://localhost:5173`). MSW démarrera automatiquement pour simuler l'API REST.

### 3. Validation Globale (Qualité & DevOps)
Pour exécuter toutes les vérifications locales (eslint, tsc, vitest, playwright chromium et build storybook) en une seule fois :
```bash
pnpm run test:all
```

### 4. Exécuter la suite de tests
* **Tests unitaires (Vitest)** :
  ```bash
  pnpm test
  ```
* **Lancer les tests unitaires avec interface graphique (Vitest UI) :**
  ```bash
  pnpm test:ui
  ```
* **Lancer les tests End-to-End (Playwright) :**
  ```bash
  pnpm test:e2e
  ```
* **Lancer les tests End-to-End avec interface graphique (Playwright UI) :**
  ```bash
  pnpm test:e2e:ui
  ```
* **Afficher le rapport de tests Playwright :**
  ```bash
  pnpm test:e2e:show
  ```
* **Lancer le serveur de développement :**
  ```bash
  pnpm preview
  ```

### 5. Storybook (Documentation visuelle)
Storybook documente l'ensemble de nos composants réutilisables.
* **Lancer l'interface interactive** :
  ```bash
  pnpm storybook
  ```
* **Compiler le site statique** :
  ```bash
  pnpm build-storybook
  ```

### 6. Hooks de Commit (Husky & lint-staged)
Husky et lint-staged sont configurés pour s'exécuter automatiquement à chaque commit :
* Ils formatent et valident uniquement les fichiers indexés par Git (`eslint --fix` et `tsc --noEmit`).
* Si une erreur est détectée, le commit est bloqué afin de maintenir le dépôt toujours propre.

* **Hooks de Commit (Husky & lint-staged) :**
  ```bash
  pnpm prepare
  ```
