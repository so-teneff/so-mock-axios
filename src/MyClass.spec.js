const axios = require("axios");
const MyClass = require("./MyClass");

jest.mock("axios");

describe("MyClass", () => {
  let myClass;
  beforeAll(() => {
    myClass = new MyClass({});
  });

  describe("getUsers", () => {
    describe("returning data", () => {
      let result;
      const url = "https://example.com/users";
      const params = {
        a: "b"
      };
      const mockSuccessHandler = jest.fn();

      beforeAll(async () => {
        result = await myClass.getUsers(url, params, mockSuccessHandler);
      });

      it("should send POST request", () => {
        expect(axios.post).toHaveBeenCalledWith(url, params);
      });

      it("should return empty data", () => {
        expect(result).toEqual(
          expect.objectContaining({
            data: {}
          })
        );
      });

      it("should call the successHandler", () => {
        expect(mockSuccessHandler).toHaveBeenCalledWith();
      });
    });

    describe("returning error", () => {
      let result;
      const url = "https://example.com/users";
      const params = {
        a: "b"
      };
      const mockSuccessHandler = jest.fn();
      const mockErrorHandler = jest
        .fn()
        .mockReturnValue("error handled properly");

      beforeAll(async () => {
        axios.post.mockRejectedValue({
          // some dummy error representation
          error: true
        });
        result = await myClass.getUsers(
          url,
          params,
          mockSuccessHandler,
          mockErrorHandler
        );
      });

      it("should send POST request", () => {
        expect(axios.post).toHaveBeenCalledWith(url, params);
      });

      it("should not call the successHandler", () => {
        expect(mockSuccessHandler).not.toHaveBeenCalled();
      });

      it("should return empty data", () => {
        expect(result).toEqual("error handled properly");
      });

      it("should call the errorHandler", () => {
        expect(mockErrorHandler).toHaveBeenCalledWith({
          error: true
        });
      });
    });
  });
});
