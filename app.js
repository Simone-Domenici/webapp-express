const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
