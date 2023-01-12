// Try accessing it at http://localhost:3000/api/hello.

export default function handler(req, res) {
  // You should see {"text":"Hello"}.
  res.status(200).json({ text: 'Hello' });
}
