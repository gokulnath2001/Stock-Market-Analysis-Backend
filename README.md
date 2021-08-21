# Stock Market Analysis Backend

The purpose of this website enables the users to analyse the trend of the market by displaying the daily ups and downs, the statistics of stocks on any particular data and other details regarding the stocks depending on the user requests. It also enables the investors to identify the intrinsic worth of a market even before investing in it. By studying and evaluating past and current data, investors and traders arrive at equity buying and selling decisions and also gain an edge in the markets to make informed decisions.

Server makes call from the Quandl API everyday at 22hrs IST.

## Developing

### Built with
1. Nodejs
2. MongoDB
#### APIs
1. QUANDL
### Pre-requisites
- node >= 14
- npm >= 6
### Setting up Dev

```
git clone https://github.com/aashritha070/Stock-Market-Analysis-Backend
cd stock-market-analysis-backend
npm install
mkdir config
touch config/.env
```

Setup environment variables

- PORT
- MONGODB
- QUANDL

```
npm start
```
