const mockAxios = jest.genMockFromModule("axios");

mockAxios.post.mockResolvedValue({ data: {} });

module.exports = mockAxios;
