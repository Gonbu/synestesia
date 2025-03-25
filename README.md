# Synestesia

Une application mobile construite avec React Native et Expo qui crée une expérience synesthésique unique en intégrant des cartes et de la musique. Synestesia permet aux utilisateurs d'interagir avec des lieux à travers la couleur et le son, mélangeant les expériences visuelles et auditives.

## Fonctionnalités

- **Expérience de Carte Interactive** : Explorez des lieux avec une interface de carte personnalisée
- **Intégration du Sélecteur de Couleurs** : Associez des couleurs à des lieux ou des musiques spécifiques
- **Fonctionnalités Basées sur la Localisation** : Utilisation du GPS de l'appareil pour une sensibilisation en temps réel à la localisation
- **Backend Firebase** : Stockage des données utilisateur, des préférences et des marqueurs de localisation
- **Interface Utilisateur Responsive** : Optimisée pour différentes tailles et orientations d'appareils mobiles
- **Téléchargement d'Images** : Possibilité de télécharger et d'associer des images à des lieux
- **Expérience Sonore Personnalisée** : Interagissez avec la musique en fonction des lieux et des couleurs

## Technologies Utilisées

### Dépendances Principales

- React Native (v0.76.7)
- Expo (v52.0.38)
- Firebase (v11.3.1)
- TypeScript

### Bibliothèques Clés

- **Cartes & Localisation**:
  - react-native-maps
  - react-native-map-clustering
  - expo-location

- **Composants UI**:
  - @expo/vector-icons
  - react-native-gesture-handler
  - react-native-reanimated
  - expo-blur
  - react-native-modal

- **Navigation**:
  - expo-router
  - @react-navigation/native
  - @react-navigation/stack
  - @react-navigation/bottom-tabs

- **Médias & Interaction**:
  - expo-image-picker
  - react-native-color-picker
  - react-native-wheel-color-picker
  - @react-native-community/slider
  - expo-haptics

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js (version LTS recommandée)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Pour le développement iOS : Xcode (Mac uniquement)
- Pour le développement Android : Android Studio

## Installation et Configuration

1. Clonez le dépôt :

   ```bash
   git clone <repository-url>
   cd synestesia
   ```

2. Installez les dépendances :

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurez Firebase :
   - Créez un projet Firebase sur [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Mettez à jour la configuration Firebase dans `app/services/firebaseConfig.ts` avec les identifiants de votre projet

4. Démarrez le serveur de développement :

   ```bash
   npm start
   # ou
   yarn start
   ```

5. Exécutez sur un appareil ou un émulateur :
   - Appuyez sur `a` pour exécuter sur un émulateur Android
   - Appuyez sur `i` pour exécuter sur un simulateur iOS (Mac uniquement)
   - Scannez le code QR avec l'application Expo Go sur votre appareil physique

## Scripts Disponibles

- `npm start` ou `yarn start` : Démarrer le serveur de développement Expo
- `npm run android` ou `yarn android` : Exécuter sur un appareil/émulateur Android
- `npm run ios` ou `yarn ios` : Exécuter sur un simulateur/appareil iOS
- `npm run web` ou `yarn web` : Exécuter dans un navigateur web
- `npm run test` ou `yarn test` : Exécuter les tests avec Jest
- `npm run lint` ou `yarn lint` : Effectuer des vérifications de linting
- `npm run reset-project` ou `yarn reset-project` : Réinitialiser le projet à l'aide d'un script personnalisé

## Structure du Projet

```
synestesia/
├── app/                   # Code principal de l'application
│   ├── index.tsx          # Point d'entrée
│   ├── map.tsx            # Composant de carte
│   ├── services/          # Configurations de services (Firebase, etc.)
│   └── styles/            # Définitions de style
├── assets/                # Ressources statiques (images, polices, etc.)
├── components/            # Composants UI réutilisables
├── screens/               # Composants d'écran
├── app.json               # Configuration Expo
├── firebase.json          # Configuration Firebase
├── package.json           # Dépendances du projet
└── tsconfig.json          # Configuration TypeScript
```

## Configuration Firebase

**Remarque** : Le dépôt comprend un fichier de configuration Firebase (`app/services/firebaseConfig.ts`). Pour des raisons de sécurité, il est recommandé de :

1. Créer votre propre projet Firebase pour le développement
2. Utiliser des variables d'environnement pour stocker les identifiants Firebase sensibles
3. Implémenter des règles de sécurité appropriées dans votre console Firebase
4. Ne jamais soumettre les identifiants Firebase de production réels à un dépôt public

Lors du déploiement en production, envisagez d'utiliser un pipeline CI/CD pour injecter la configuration Firebase correcte en fonction de l'environnement.

---

Créé avec ❤️ par Billie
