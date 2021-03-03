const db = require("../config/connection");
var collection = require("../config/collections");
const collections = require("../config/collections");
var objectId = require("mongodb").ObjectID;

module.exports = {
  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      let orders = await db
        .get()
        .collection(collection.ORDER_COLLECTION)
        .find()
        .toArray();
      console.log(orders);
      resolve(orders);
    });
  },
  
  getOrderDetails: (orderId) => {
    return new Promise(async (resolve, reject) => {
      let orderDetails = await db
        .get()
        .collection(collections.ORDER_COLLECTION)
        .findOne({ _id: objectId(orderId) });
      resolve(orderDetails);
    });
  },
  updateProductStatus: (details) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ORDER_COLLECTION)
        .updateOne(
          { _id: objectId(details.orderId) },
          {
            $set: {
              status: details.newStatus,
            },
          }
        )
        .then(() => {
          resolve({ status: true });
        });
    });
  },
  getAllUrders: () => {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .find()
        .toArray();
      console.log(users);
      resolve(users);
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      if (
        userData.email == "admin@admin.com" &&
        userData.password == "admin123"
      ) {
        resolve({ status: true });
      } else {
        reject({ status: false });
      }
    });
  },
  addCoupon: (details) => {
    return new Promise((resolve, reject) => {
      console.log(details);
      couponObj = {
        title: details.title,
        couponCode: details.coupon_code,
        offerPercentage: details.offer_percentage,
        maximumAmount: details.max_amount,
        minPurchase: details.min_purchase,
        description: details.des,
      };
      db.get()
        .collection(collection.COUPON_COLLECTION)
        .insertOne(couponObj)
        .then(() => {
          resolve();
        });
    });
  },

  addSlideImage: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SLIDE_IMAGE)
        .insertOne({ name: "SlideImage" })
        .then((data) => {
          resolve(data.ops[0]._id);
          console.log(data.ops[0]);
        });
    });
  },

  getAllSlideImages: () => {
    return new Promise(async (resolve, reject) => {
      let slideImages = await db
        .get()
        .collection(collection.SLIDE_IMAGE)
        .find()
        .toArray();

      resolve(slideImages);
    });
  },

  getSlideDetails: (slide_id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SLIDE_IMAGE)
        .findOne()
        .then((response) => {
          resolve(response);
        });
    });
  },
};
