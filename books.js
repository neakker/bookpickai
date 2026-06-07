export default async function handler(req, res) {
  const query = req.query.q || "children books";

  const url =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    encodeURIComponent(query) +
    "&maxResults=10";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const books = (data.items || []).map((item) => ({
      title: item.volumeInfo.title || "제목 없음",
      authors: item.volumeInfo.authors || [],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
      description: item.volumeInfo.description || "",
    }));

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: "책 정보를 가져오지 못했습니다." });
  }
}