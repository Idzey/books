import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "localhost:3000";

const BooksService = {
  async getListBooks(
    startIndex: number = 0,
    limit: number = 12,
    q: string | null,
    filter: string | null
  ) {
    const response = await axios.get(baseUrl, {
      params: {
        startIndex,
        maxResults: limit,
        q: q || "1",
        filter: filter,
      },
    });

    return response.data.items || [];
  },

  async getBookById(bookId: string) {
    const response = await axios.get(`${baseUrl}/${bookId}`);

    return response.data;
  },
};

export default BooksService;
