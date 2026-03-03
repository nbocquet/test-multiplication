# Test des tables de multiplication

## Accès à l'application

[https://multiplication.classeadeux.fr/](https://multiplication.classeadeux.fr/).

## En savoir plus 

[https://classeadeux.fr/test-tables-multiplication/](https://classeadeux.fr/test-tables-multiplication/)

## Dépôt

Ce dépôt permet le partage du code source de l'application développée par [Alan Choufa](https://alan.choufa.fr/) sur le framework Angular.

Licence GNU GPL

## Développement local

### Prérequis

- [Node.js](https://nodejs.org/) v20+
- npm v10+

### Installation

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` est nécessaire en raison de conflits de peer dependencies entre `@nx/angular` et `@angular/*`.

### Lancer le serveur de développement

```bash
npx nx serve multiplication
```

L'application est accessible sur [http://localhost:4200](http://localhost:4200).

### Build de production

```bash
npx nx build multiplication
```

Les fichiers sont générés dans `dist/apps/multiplication/`.