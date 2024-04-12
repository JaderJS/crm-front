const apiUrl = process.env.GRAPHQL_ENDPOINT;

module.exports = {
	client: {

		service: {
			name: "FWO",
			// url: "http://192.168.0.67:8080/graphql",
			localSchemaFile: "../Fwo-FrontEnd/src/schema.json",
		},
	},
};

// // vpn
// module.exports = {
//   client: {
//     service: {
//       name: "FWO",
//       url: "http://26.161.33.38:5001/graphql",
//     },
//   },
// };

