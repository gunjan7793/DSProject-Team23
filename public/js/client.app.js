

var clientApp = new Vue({
	el: '#clientContainer',
	data: {
		clients: []
	},
	computed: {},
	methods: {},

	created() {
		fetch('api/client.php')
			.then(response => response.json())
			.then(json => {
				clientApp.clients = json
			})
			.catch(err => {
				console.log('Client fetch error: ');
				console.log(err);
			})
	}
});
