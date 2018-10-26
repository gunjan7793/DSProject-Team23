var clientApp = new Vue({
	el: '#clientContainer',
	data: {
		clients: [],
		notes:	[]
	},
	computed: {},
	methods: {
		goToSites(clientId){
			window.location='sites.html?clientId='+clientId;
		},
		getNotes:function(clientId){
			fetch('api/notesOnClients.php?clientId='+clientId)
				.then(response => response.json())
				.then(json => {
					clientApp.notes = json
				})
				.catch(err => {
					console.log('Client fetch error: ');
					console.log(err);
				})
		}
	},

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
