const routes = [
	{
		method: 'GET',
		path: '/',
		handler: (req, h) => {
			return 'Homepage';
		},
	},
	{
		method: '*',
		path: '/',
		handler: (req, h) => {
			return 'Halaman tidak dapat diakses dengan method tersebut';
		},
	},
	{
		method: 'GET',
		path: '/about',
		handler: (req, h) => {
			return 'About page';
		},
	},
	{
		method: '*',
		path: '/about',
		handler: (req, h) => {
			return 'Halaman tidak dapat diakses dengan method tersebut';
		},
	},
	{
		method: "GET",
		path: '/hello/{username?}',
		handler: (req, h) => {
			const { username = "asrofilnadib "} = req.params
			const { lang } = req.query
			const { firstname, lastname } = req.payload
			
			if (lang === 'id') {
				return `Hai, ${username}`
			}
			
			return h.response('success').type('text/plain').header('X-type', 'some-value')
			
			return `Hello ${username}!`
		}
	},
	{
		method: '*',
		path: '/{any*}',
		handler: (req, h) => {
			return 'Halaman tidak ditemukan';
		},
	},
];

module.exports = routes