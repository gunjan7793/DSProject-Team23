var siteApp = new Vue({
	el: '#siteContainer',
	data: {
		sites: []
	},
	computed: {},
	methods: {
		goToTurbines(siteId){
			window.location='turbineKPI.html?siteId='+siteId;
		}
	},

	created() {
		const url = new URL(window.location.href);
    	const clientId = url.searchParams.get('clientId');
    	console.log('Client: '+ clientId);

		fetch('api/site.php?clientId=' + clientId)
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
