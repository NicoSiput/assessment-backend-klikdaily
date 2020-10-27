/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const Product = require('../models/Product');
const Log = require('../models/Log');
const response = require('../utils/response');

module.exports = {
  getStocks: async (req, res) => {
    try {
      const products = await Product.getProducts();

      const responseData = {
        stocks: products,
      };
      response.success(res, responseData);
    } catch (error) {
      console.log(error);
      response.failed();
    }
  },

  adjustment: async (req, res) => {
    try {
      const payloads = req.body;
      const requests = payloads.length;
      const results = [];
      let adjusted = 0;

      for (let index = 0; index < payloads.length; index += 1) {
        const property = payloads[index];

        const { location_id, product, adjustment } = property;
        const resultAdjust = {};

        // Search product by location id
        const productById = await Product.getProductByLocationId(location_id);
        if (productById.length > 0) {
          const productName = productById[0].name;

          if (productName === product) {
            await Product.updateProduct(property);

            adjusted += 1;

            const currentStock = productById[0].qty + adjustment;
            resultAdjust.status = 'Success';
            resultAdjust.updated_at = new Date();
            resultAdjust.location_id = location_id;
            resultAdjust.location_name = productById[0].location;
            resultAdjust.product = productName;
            resultAdjust.adjustment = adjustment;
            resultAdjust.stock_quantity = currentStock;
            results.push(resultAdjust);

            // Create log
            let typeAdjustment = 'Inbound';
            if (adjustment < 0) {
              typeAdjustment = 'Outbound';
            }
            const logData = {
              typeAdjustment,
              adjustment,
              currentStock,
              location_id,
            };
            await Log.insertLog(logData);
          } else {
            resultAdjust.status = 'Failed';
            resultAdjust.error_message = 'Invalid Product';
            resultAdjust.updated_at = new Date();
            resultAdjust.location_id = location_id;
            results.push(resultAdjust);
          }
        } else {
          resultAdjust.status = 'Failed';
          resultAdjust.error_message = 'Invalid Location Id';
          resultAdjust.updated_at = new Date();
          resultAdjust.location_id = location_id;
          results.push(resultAdjust);
        }
      }

      const responseData = {
        requests,
        adjusted,
        results,
      };
      response.success(res, responseData);
    } catch (error) {
      console.log(error);
    }
  },

  logs: async (req, res) => {
    try {
      const idLocation = req.params.location_id;

      const productData = await Product.getProductByLocationId(idLocation);
      if (productData.length > 0) {
        const product = productData[0];

        const logs = await Log.getLogsByLocationId(idLocation);
        if (logs.length > 0) {
          const responseData = {
            ...product,
            logs,
          };
          response.success(res, responseData, 'Success, logs found');
        } else {
          response.failed(res, 'Failed', 403);
        }
      } else {
        response.failed(res, 'Failed, location id not found', 403);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
