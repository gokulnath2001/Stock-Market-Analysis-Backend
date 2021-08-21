const BOM = require("./BOMdb.json");
const BSE = require("./BSEindex.json");
const { default: Axios } = require("axios");
const TopGainers = require("../database/topGainerSchema");
const TopLosers = require("../database/topLoserSchema");
const Potential = require("../database/potentialSchema");
const Active = require("../database/activeSchema");
const Market = require("../database/marketSchema");
const Indices = require("../database/indexSchema");

// Stock Data : ["Date","Open","High","Low","Close","WAP","No. of Shares","No. of Trades","Total Turnover","Deliverable Quantity","% Deli. Qty to Traded Qty","Spread H-L","Spread C-O"]
// Index Data : ["Date","Open","High","Low","Close"]

const getStockData = async () => {
  try {
    console.log("getting data");
    let items = [];
    for (var i = 0; i < BOM.length; i++) {
      const data = await getFromQuandl(BOM[i].BOMcode);
      console.log(`Received ${i + 1}/${BOM.length}`);
      const item = data?.data?.dataset;
      let object = {
        id: item?.id,
        name: item?.name,
        end_date: item?.end_date,
        data: item?.data[0],
        BOMcode: BOM[i].BOMcode,
      };
      // data_indices : 145678
      items.push(object);
    }
    let validatedItems = validate(items);
    let marketAction = validatedItems; // marketAction - company name
    marketAction.forEach(async (item) => {
      const { name, end_date, data, BOMcode } = item;
      const object = {
        name,
        end_date,
        open: data[1],
        close: data[4],
        shares: data[6],
        trades: data[7],
        BOMcode,
      };
      const query = { name: item.name };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const success = await Market.findOneAndUpdate(query, object, options);
      console.log(success.end_date);
    });
    let mostActiveStocks = sortObjectArray(validatedItems, 6, "desc"); // most active - number of shares
    mostActiveStocks.forEach(async (item) => {
      const { name, end_date, data, BOMcode } = item;
      const object = {
        name,
        end_date,
        shares: data[6],
        BOMcode,
      };
      const query = { name: item.name };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const success = await Active.findOneAndUpdate(query, object, options);
    });
    let topGainers = sortObjectArray(validatedItems, 5, "desc"); // top gainers - wap
    topGainers.forEach(async (item) => {
      const { name, end_date, data, BOMcode } = item;
      const object = {
        name,
        end_date,
        high: data[2],
        low: data[3],
        wap: data[5],
        BOMcode,
      };
      const query = { name: item.name };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const success = await TopGainers.findOneAndUpdate(query, object, options);
    });
    let topLosers = sortObjectArray(validatedItems, 5, "asc"); // top losers - wap
    topLosers.forEach(async (item) => {
      const { name, end_date, data, BOMcode } = item;
      const object = {
        name,
        end_date,
        high: data[2],
        low: data[3],
        wap: data[5],
        BOMcode,
      };
      const query = { name: item.name };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const success = await TopLosers.findOneAndUpdate(query, object, options);
    });
    let upwardPotential = sortObjectArray(validatedItems, 8, "desc"); // upward potential - turnover
    upwardPotential.forEach(async (item) => {
      const { name, end_date, data, BOMcode } = item;
      const object = {
        name,
        end_date,
        shares: data[6],
        turnover: data[8],
        BOMcode,
      };
      const query = { name: item.name };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const success = await Potential.findOneAndUpdate(query, object, options);
      console.log("data retreived");
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

const getIndices = async () => {
  try {
    let items = [];
    for (var i = 0; i < BSE.length; i++) {
      const data = await getFromQuandl(BSE[i].CODE);
      console.log(`Received index of ${i + 1}/${BSE.length}`);
      const item = data?.data?.dataset;
      let object = {
        id: item?.id,
        name: item?.name,
        end_date: item?.end_date,
        data: item?.data[0],
        BSEcode: BSE[i].CODE,
      };
      // data_indices : 1234
      items.push(object);
    }
    let indices = validate(items); // Stock Indices - code name
    indices.forEach(async (item) => {
      const { name, end_date, data, BSEcode } = item;
      const object = {
        name,
        end_date,
        open: data[1],
        high: data[2],
        low: data[3],
        close: data[4],
        BSEcode,
      };
      const query = { name: item.name };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const success = await Indices.findOneAndUpdate(query, object, options);
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFromQuandl = async (code) => {
  try {
    let data = await Axios.get(
      `https://www.quandl.com/api/v3/datasets/BSE/${code}.json?api_key=${process.env.QUANDL}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const validate = (items) => {
  const validated = [];
  items.forEach((item) => {
    if (item.data) validated.push(item);
  });
  return validated;
};

const sortObjectArray = (items, condition, order) => {
  let orderIndex = order === "desc" ? -1 : 1;
  const compare = (a, b) => {
    if (a?.data[condition] < b?.data[condition]) return -1 * orderIndex;
    else if (a?.data[condition] > b?.data[condition]) return 1 * orderIndex;
    else return 0;
  };
  items.sort(compare);
  let the10 = [];
  for (var i = 0; i < 10; i++) {
    the10.push(items[i]);
  }
  return the10;
};

module.exports = {
  getStockData,
  getIndices,
};
