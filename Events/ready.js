const client = require("../index");
const mongoose = require("mongoose")
const samp = require("samp-query");

var connection = {
    host: client.config.SERVER_IP,
    port: client.config.SERVER_PORT
}

function StatusActivityUpdate() {
    samp(connection, function (error, response) {
        if (error) {
            client.user.setActivity("Atzone Roleplay Ucp Bot", { type: "standby" });
        } else {
            client.user.setActivity(`Players: ${response.online}`, { type: "standby" });
        }
    })
}

client.on("ready", () => {
    console.log(`\x1b[36m[BOT]: \x1b[0m(${client.user.tag}) Telah berhasil diluncurkan!`)
    setInterval(StatusActivityUpdate, 20000);
    
    if (!client.config.mongooseConnectionString) return;
    mongoose.connect(client.config.mongooseConnectionString).then(() => console.log('\x1b[36m[MONGODB]: \x1b[0mDatabase MongoDB telah berhasil terhubung!'));
});
