module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`âœ… Bot online como ${client.user.tag}`);
        console.log(`í³Š Em ${client.guilds.cache.size} servidores`);
        client.user.setActivity("NX Store", { type: "WATCHING" });
    }
};
