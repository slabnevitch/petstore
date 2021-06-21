module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/petstore/' //имя проекта на gh-pages
    : '/' //путь для development mode
}