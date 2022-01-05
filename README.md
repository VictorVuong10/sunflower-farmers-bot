# Farming Bot for Sunflower Farmer
This repository includes a farming bot. **I don't provide any support.**

## How to Use

```shell
git clone --recursive https://github.com/mikoim/sunflower-farmers-bot.git

# install deps
yarn

# set your private keys
vim hardhat.config.ts 

# Step 1: Send MATIC and SFF to your farm wallet

# Step 2: Create farm
# The wallet must have 0.1 MATIC (for charity) and few SFF (for leveling)
env WALLET=1 npx hardhat run scripts/createFarm.ts --network polygon

# Step 3: Earn without playing 
# indicate the maximum amount of gwei (by default this parameter is set to 80 gwei): GWEI=80
# Indicate which fruits you want to plant: 1 = sunflower, 2 potatoes, 3 = pumpkin, 4 = beetroot, 5 cauliflower, 6 = parsnip, 7 = radish. (by default this parameter is set on the cauliflower) = FRUIT=5
env WALLET=1 GWEI=80 FRUIT=5 npx hardhat run scripts/harvest.ts --network polygon
```

## FAQ
If you want to donate for the work here is my Matic or SFF address: 0xFf083f5198C4e95B18F9331EF7f93e844eD1482e

### Why do you publish bot?
Sunflower Farmer is a funny blockchain game that reminds me of legacy browser games. But Play-To-Earn is awful. That's everything.

## Licenses
- scripts/*.ts: me (MIT License) No wannary
- contracts/*.sol: [Sunflower Farmer](https://github.com/sunflower-farmers/sunflower-farmers) (MIT License)


# Français


# Farming Bot pour SunFlower Farmer
Ce référentiel comprend un bot agricole. **Je ne fournis aucun support.**

## Comment utiliser

```shell
git clone --recursive https://github.com/mikoim/sunflower-farmers-bot.git

# installer les dependances
yarn

# définir vos clés privées
vim hardhat.config.ts

# Étape 1 : Envoyez MATIC et SFF dans votre portefeuille de ferme

# Étape 2 : Créer une ferme
# Le portefeuille doit avoir 0,1 MATIC (pour la charité) et quelques SFF (pour le nivellement)
env WALLET = 1 npx hardhat run scripts/createFarm.ts --network polygon

# Étape 3 : Gagnez sans jouer
# indiquez la quantité maximale de gwei (par défaut ce paramètre est fixé à 80 gwei) : GWEI=80
# Indiquez quels fruits vous souhaitez planter : 1 = tournesol, 2 pommes de terre, 3 = potiron, 4 = betterave rouge, 5 chou-fleur, 6 = panais, 7 = radis. (par défaut ce paramètre est réglé sur le chou-fleur) = FRUIT=5
env WALLET=1 GWEI=80 FRUIT=5 npx hardhat run scripts/harvest.ts --network polygon
```

## FAQ
Si vous voulez faire un don pour le travail voici mon adresse Matic ou SFF : 0xFf083f5198C4e95B18F9331EF7f93e844eD1482e

### Pourquoi publiez-vous un bot ?
Sunflower Farmer est un jeu de blockchain amusant qui me rappelle les anciens jeux par navigateur. Mais Play-To-Earn est affreux. C'est tout.

## Licenses
- scripts/*.ts: me (MIT License) Aucune pretention
- contracts/*.sol: [Sunflower Farmer](https://github.com/sunflower-farmers/sunflower-farmers) (MIT License)

