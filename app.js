const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');
const movieRouter = require('./routers/movieRouter');

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/movies', movieRouter)

app.use(errorsHandler)

app.use(notFound)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
