const connection = require('../data/db')

function index(req, res) {

	let sql = `SELECT * FROM movies`

	connection.query(sql, (err, movies) => {
		if (err) return res.status(500).json({ message: err.message })
		res.json(movies)
	})
}

function show(req, res) {
	const id = req.params.id

	const sql = `SELECT * FROM movies WHERE id = ?`

	connection.query(sql, [id], (err, results) => {
		if (err) return res.status(500).json({ message: err.message })
		if (results.length === 0)
			return res.status(404).json({
				error: 'Not Found',
				message: 'Movie not found',
			})

		const movie = results[0]

		const sql = `SELECT * FROM reviews WHERE movie_id = ?`

		connection.query(sql, [id], (err, results) => {
			if (err) return res.status(500).json({ message: err.message })

			movie.reviews = results
			res.json(movie)
		})
	})
}

function storeReview(req, res) {
	const id = req.params.id

	const { text, vote, name } = req.body
	const intVote = parseInt(vote)

	if (
		!name ||
		!intVote ||
		isNaN(intVote) ||
		intVote < 1 ||
		intVote > 5 ||
		name?.length > 255 ||
		typeof name !== 'string'
	) {
		return res.status(400).json({ message: 'Invalid data' })
	}

	const sql =
		'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

	connection.query(sql, [text, name, intVote, id], (err, results) => {
		if (err) return res.status(500).json({ message: err.message })
		res.status(201).json({ message: 'Review added', id: results.insertId })
	})
}

module.exports = { index, show, storeReview }
