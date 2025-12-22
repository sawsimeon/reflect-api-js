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
    │ │ ├── health_check.ts 
    │ │ └── index.ts 
    │ ├── stablecoin/ 
    │ │ ├── generate_burn_transaction.ts 
    │ │ ├── generate_mint_transaction.ts 
    │ │ ├── get_all_apy.ts 
    │ │ ├── get_available_stablecoins.ts 
    │ │ ├── get_historical_apy.ts 
    │ │ ├── get_historical_exchange_rates.ts 
    │ │ ├── get_latest_exchnage_rates.ts 
    │ │ ├── get_mint_redeem_quote.ts 
    │ │ ├── get_realtiem_exchange_rate.ts 
    │ │ ├── get_specific_apy.ts 
    │ │ ├── get_supply_caps.ts 
    │ │ └── index.ts 
    │ ├── integration/ 
    │ │ ├── generate_claim_tx.ts 
    │ │ ├── generate_integration_mint_tx.ts 
    │ │ ├── generate_redemption_tx.ts 
    │ │ ├── get_current_exchange_rate.ts 
    │ │ ├── get_historical_integration_stats.ts 
    │ │ ├── get_integration_config_.ts 
    │ │ ├── get_integration_events.ts 
    │ │ ├── get_integration_statistics.ts 
    │ │ ├── get_integration_by_authority.ts 
    │ │ ├── initialize_integration_flow.ts 
    │ │ ├── initialize_integration_vault.ts 
    │ │ ├── initialize_integration.ts 
    │ │ ├── initialize_stablecoin_token.ts 
    │ │ ├── initialize_user_branded_token.ts 
    │ │ ├── mint_and_whitelabel.ts 
    │ │ ├── index.ts 
    │ │ ├── redeem_whitelabeled.ts 
    │ │ ├── reveal_api_key.ts 
    │ │ ├── rotate_api_key.ts 
    │ │ ├── transfer_mint_authority.ts 
    │ │ ├── update_integration_config.ts 
    │ │ ├── upload_integration_metadata.ts 
    │ │ └── whitelist_users.ts 
    │ ├── stats/ 
    │ │ ├── get_historical_tvl_and_volume.ts 
    │ │ ├── get_protocol_statistics.ts 
    │ │ └── index.ts 
    │ └── events/ 
    │ ├── get_events_by_signer.ts 
    │ ├── get_recent_events.ts 
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


