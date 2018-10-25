var turbineDeployedApp = new Vue({
	el: '#turbineContainer',
	data: {
		turbines: []
	},
	computed: {},
	methods: {},

	created() {
		const url = new URL(window.location.href);
    const siteId = url.searchParams.get('siteId');
    console.log('Site: '+ siteId);

		fetch('api/turbineDeployed.php?siteId='+siteId)
			.then(response => response.json())
			.then(json => {
				turbineDeployedApp.turbines = json
			})
			.catch(err => {
				console.log('Turbine fetch error: ');
				console.log(err);
			})
	}
});
