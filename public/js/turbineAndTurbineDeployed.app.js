var turbineAndTurbineDeployedApp = new Vue({
	el: '#turbineDetailsContainer',
	data: {
		turbines: []
	},
	computed: {},
	methods: {},

	created() {
		const url = new URL(window.location.href);
    const siteId = url.searchParams.get('siteId');
    console.log('Site: '+ siteId);

		fetch('api/turbineAndTurbineDeployed.php?siteId='+siteId)
			.then(response => response.json())
			.then(json => {
				turbineAndTurbineDeployedApp.turbines = json
			})
			.catch(err => {
				console.log('Turbine fetch error: ');
				console.log(err);
			})
	}
});
