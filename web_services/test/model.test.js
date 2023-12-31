const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const User = require("../models/User");
const ProductModel = require("../models/Product");
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const ColorModel = require("../models/coloesetting");
const LogoModel = require("../models/logo");

describe("UserSchema", () => {
  // Test 1: Basic validation of required fields
  test("should have the required fields", () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };
    const user = new User(userData);
    const validationError = user.validateSync();
    expect(validationError).toBeFalsy();
  });

  // Test 2: Unique email constraint
  test("should enforce a unique email constraint", async () => {
    // Create a user with a unique email
    const uniqueUser = new User({
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password456",
    });
    await uniqueUser.save();

    // Attempt to create another user with the same email
    const duplicateUser = new User({
      name: "Another User",
      email: "janedoe@example.com", // Same email as the previous user
      password: "password789",
    });

    try {
      await duplicateUser.save();
      // The above line should not be reached; an error should be thrown
    } catch (error) {
      expect(error.name).toEqual("MongoError");
      expect(error.code).toEqual(11000); // MongoDB duplicate key error code
    }
  });

 
});

describe("ProductSchema", () => {
  test("should have the required fields", async () => {
    expect.assertions(1);
    const productData = {
      title: "Sample Product",
      description: "This is a sample product.",
      image: "sample.jpg",
    };
    const product = new ProductModel(productData);
    const validationError = product.validateSync();
    expect(validationError).toBeFalsy();
  });
});

describe("OrderSchema", () => {
  test("should have the required fields", async () => {
    expect.assertions(1);
    const orderData = {
      orderItems: [
        {
          name: "Sample Product",
          qty: 2,
          image: "sample.jpg",
          price: 9.99,
          product: mongoose.Types.ObjectId(),
        },
      ],
      shippingAddress: {
        customer_name: "John Doe",
        street1: "123 Main St",
        city: "Sample City",
        state: "Sample State",
        zip: "12345",
        country: "Sample Country",
      },
      paymentMethod: "Sample Payment Method",
      itemsPrice: 19.98,
      shippingPrice: 5.0,
      taxPrice: 2.0,
      totalPrice: 26.98,
      user: mongoose.Types.ObjectId(),
    };
    const order = new OrderModel(orderData);
    const validationError = order.validateSync();
    expect(validationError).toBeFalsy();
  });
});

describe("CartSchema", () => {
  test("should have the required fields", async () => {
    expect.assertions(1);
    const cartData = {
      userId: "sampleUserId",
      products: [
        {
          productId: "sampleProductId",
          quantity: 2,
        },
      ],
    };
    const cart = new CartModel(cartData);
    const validationError = cart.validateSync();
    expect(validationError).toBeFalsy();
  });
});

describe("ColorSchema", () => {
  test("should have the required fields", async () => {
    expect.assertions(1);
    const colorData = {
      headerColor: "#FF0000",
      bodyColor: "#00FF00",
    };
    const color = new ColorModel(colorData);
    const validationError = color.validateSync();
    expect(validationError).toBeFalsy();
  });
});

describe("LogoSchema", () => {
  test("should have the required fields", async () => {
    expect.assertions(1);
    const logoData = {
      logoUrl: "https://example.com/logo.png",
    };
    const logo = new LogoModel(logoData);
    const validationError = logo.validateSync();
    expect(validationError).toBeFalsy();
  });
});
