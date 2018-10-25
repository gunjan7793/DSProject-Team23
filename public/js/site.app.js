var siteApp = new Vue({
	el: '#siteContainer',
	data: {
		sites: []
	},
	computed: {},
	methods: {},

	created() {
		fetch('api/site.php')
			.then(response => response.json())
			.then(json => {
				siteApp.sites = json
			})
			.catch(err => {
				console.log('Site fetch error: ');
				console.log(err);
			})
	}
});
