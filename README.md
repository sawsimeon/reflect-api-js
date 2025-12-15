# Reflect API (reflect-api-js) <img src="https://pbs.twimg.com/profile_images/1915772772770291712/WXX_G2-J_400x400.jpg" alt="Reflect Logo" width="150" height="150">

**Unofficial TypeScript Library for the Reflect API**

This repository provides a modular, production-ready scaffold for building a backend or client-side integration compatible with the **Reflect API** — the programmable infrastructure behind [Reflect](https://docs.reflect.money/reflect-api/), autonomous money designed for the stablecoin era.

Reflect issues income-generating stablecoins (such as **rUSD**, with future support for rEUR and others) that automatically farm the best DeFi rates on Solana while remaining fully liquid, fully insured on-chain, and non-custodial. Every stablecoin earns continuous yield with no lockups, no claims process, and built-in real-time insurance.

The official Reflect API (base URL: [https://prod.api.reflect.money](https://prod.api.reflect.money) enables developers and protocols to:
- Mint and redeem stablecoins
- Retrieve real-time/historical APYs and exchange rates
- Set up whitelabeled integrations with branded tokens
- Manage API keys, vaults, metadata, and user whitelists
- Generate on-chain transactions securely
- Access protocol statistics and events

This TypeScript implementation uses **Express.js** (or any Node.js HTTP framework) and is structured for clarity, maintainability, and future extension (e.g., adding database integration, authentication middleware, or on-chain interactions).

All endpoints are currently stubbed with placeholder/mock JSON responses, making this an ideal starting point for:
- Local development and testing
- Building a mirror/proxy server
- Creating a custom backend for Reflect integrations
- Learning the Reflect API structure

---

## Project scaffold


    ├── package.json 
    ├── tsconfig.json 
    ├── src/ 
    │ ├── health/ 
    │ │ ├── healthCheck.ts 
    │ │ └── index.ts 
    │ ├── stablecoin/ 
    │ │ ├── generateBurnTransaction.ts 
    │ │ ├── generateMintTransaction.ts 
    │ │ ├── getAllApy.ts 
    │ │ ├── getAvailableStablecoins.ts 
    │ │ ├── getHistoricalApy.ts 
    │ │ ├── getHistoricalExchangeRates.ts 
    │ │ ├── getLatestExchangeRates.ts 
    │ │ ├── getMintRedeemQuote.ts 
    │ │ ├── getRealtimeExchangeRate.ts 
    │ │ ├── getSpecificApy.ts 
    │ │ ├── getSupplyCaps.ts 
    │ │ └── index.ts 
    │ ├── integration/ 
    │ │ ├── generateClaimTx.ts 
    │ │ ├── generateIntegrationMintTx.ts 
    │ │ ├── generateRedemptionTx.ts 
    │ │ ├── getCurrentExchangeRate.ts 
    │ │ ├── getHistoricalIntegrationStats.ts 
    │ │ ├── getIntegrationConfig.ts 
    │ │ ├── getIntegrationEvents.ts 
    │ │ ├── getIntegrationStatistics.ts 
    │ │ ├── getIntegrationsByAuthority.ts 
    │ │ ├── initializeIntegrationFlow.ts 
    │ │ ├── initializeIntegrationVault.ts 
    │ │ ├── initializeIntegration.ts 
    │ │ ├── initializeStablecoinToken.ts 
    │ │ ├── initializeUserBrandedToken.ts 
    │ │ ├── mintAndWhitelabel.ts 
    │ │ ├── index.ts 
    │ │ ├── redeemWhitelabeled.ts 
    │ │ ├── revealApiKey.ts 
    │ │ ├── rotateApiKey.ts 
    │ │ ├── transferMintAuthority.ts 
    │ │ ├── updateIntegrationConfig.ts 
    │ │ ├── uploadIntegrationMetadata.ts 
    │ │ └── whitelistUsers.ts 
    │ ├── stats/ 
    │ │ ├── getHistoricalTvlAndVolume.ts 
    │ │ ├── getProtocolStatistics.ts 
    │ │ └── index.ts 
    │ └── events/ 
    │ ├── getEventsBySigner.ts 
    │ ├── getRecentEvents.ts 
    │ └── index.ts 
    ├── README.md

Each endpoint lives in its own file for easy navigation and modification.

---

## Quick start

1. Clone and install dependencies:
```bash
git clone https://github.com/your-username/reflect-api-js.git
cd reflect-api-js
npm install
```
2. Build the project:
```bash
npm run build
```
3. Start the server:
```bash
npm start
```

4. The server listens on 0.0.0.0:3000 by default. Try some endpoints:

```bash
# Root health
GET http://localhost:3000/ → { "status": "reflect api running" }

# Health
GET http://localhost:3000/health/ → { "status": "ok" }

# Stablecoins
GET http://localhost:3000/stablecoins/ → list of available stablecoins
GET http://localhost:3000/stablecoins/supply-caps → supply caps
POST http://localhost:3000/stablecoins/quote → body { "stablecoin": "rUSD", "amount": 10.0, "side": "mint" }
```

Endpoints are grouped by functionality.

- /health
- /stablecoins
- /integrations
- /stats
- /events

## Official Resources

- Website: [https://reflect.money](https://reflect.money)
- Official API Documentation: [https://docs.reflect.money/reflect-api](https://docs.reflect.money/reflect-api)
- Full Documentation: [https://docs.reflect.money/](https://docs.reflect.money/)

Note: This mirros the official API structure but is a TypeScript implementation. It is unofficial and not affiliated with Reflect. Use the official API in prediction. 

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

## Contact

For questions or feedback, please contact [Saw Simeon](mailto:sawsimeon@hotmail.com).


