expect.extend({
  nullOrAny(received, expected) {
    if (received === null) {
      return {
        pass: true,
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }

    if (expected == String) {
      return {
        pass: typeof received == "string" || received instanceof String,
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }

    if (expected == Number) {
      return {
        pass: typeof received == "number" || received instanceof Number,
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }

    if (expected == Function) {
      return {
        pass: typeof received == "function" || received instanceof Function,
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }

    if (expected == Object) {
      return {
        pass: received !== null && typeof received == "object",
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }

    if (expected == Boolean) {
      return {
        pass: typeof received == "boolean",
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }

    /* jshint -W122 */
    /* global Symbol */
    if (typeof Symbol != "undefined" && this.expectedObject == Symbol) {
      return {
        pass: typeof received == "symbol",
        message: () =>
          `expected null or instance of ${this.utils.printExpected(
            expected
          )}, but received ${this.utils.printReceived(received)}`,
      };
    }
    /* jshint +W122 */

    return {
      pass: received instanceof expected,
      message: () =>
        `expected null or instance of ${this.utils.printExpected(
          expected
        )}, but received ${this.utils.printReceived(received)}`,
    };
  },
});

exports.paginationMatcher = expect.objectContaining({
  currentPage: expect.any(Number),
  pageCount: expect.any(Number),
  pageSize: expect.any(Number),
  count: expect.any(Number),
});

exports.productMatcher = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  price: expect.any(Number),
});

exports.categoryMatcher = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  parent_id: expect.nullOrAny(String),
});

exports.orderMatcher = expect.objectContaining({
  id: expect.any(String),
  status: expect.any(String),
  payment_status: expect.any(String),
  shipping_status: expect.any(String),
  email: expect.any(String),
});

exports.validItemMacher = expect.objectContaining({
  product_id: expect.any(String),
  product_name: expect.any(String),
  price: expect.any(Number),
  quantity: expect.any(Number),
  buy_able: expect.any(Boolean),
});

exports.shippingMethodMatcher = expect.objectContaining({
  id: expect.any(Number),
  name: expect.any(String),
  enable: expect.any(Boolean),
  detail: expect.nullOrAny(String),
  fee: expect.any(Number),
});

exports.paymentMethodMatcher = expect.objectContaining({
  id: expect.any(Number),
  name: expect.any(String),
  enable: expect.any(Boolean),
  detail: expect.nullOrAny(String),
});

exports.userMatcher = expect.objectContaining({
  id: expect.any(String),
  username: expect.any(String),
  email: expect.any(String),
  role: expect.any(String),
});
