import { RPClient, Presence } from "rpcord";

const rpc = new RPClient("1328831656311656559")

let connected = false

rpc.on("ready", () => {
	console.log("Connected to Discord and waiting for updates")
	connected = true
})

const startTimestamp = Date.now()

rpc.connect().catch((err) => {
	console.error("Failed to connect to Discord", err)
  });

const server = Bun.serve({
	fetch(req, server) {
		const success = server.upgrade(req);
		if (success) {
			return undefined;
		}

		// handle HTTP request normally
		return new Response("OK");
	},
	websocket: {
		// this is called when a message is received
		async message(ws, message) {
			if (!connected) {
				console.log("⚠️ Update received before a connection with Discord could be established.")
			}
			console.log(message);
			const data = JSON.parse(message);
			if (data.idle) {
				rpc.setActivity(
					new Presence()
					.setState("Idle")
					.setStartTimestamp(startTimestamp)
				);
				ws.send(`OK`);
				return;
			}
			rpc.setActivity(
				new Presence()
				.setDetails(`Grade: ${data.grade}%`)
				.setState(data.section + ` [${data.score[0]}/${data.score[1]}]`)
				.setStartTimestamp(startTimestamp)
			);
			ws.send(`OK`);
		},
	},
});

console.log(`Server running on on ${server.hostname}:${server.port}`);