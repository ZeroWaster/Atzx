const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlAsia = require("../../Mysql");

module.exports = {
    name: "charucp",
    description: "Cek karakter User Control Panel",
    type: "",
    options: [
        {
            name: "ucp-account",
            description: "Nama akun UCP yang akan diperiksa karakternya!",
            type: "USER",
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const getAccount = interaction.options.getUser("ucp-account");

        MysqlAsia.query(`SELECT * FROM playerucp WHERE discordID = '${getAccount.id}'`, async(err, roww) => {
            if(roww[0]) {
                MysqlAsia.query(`SELECT * FROM players WHERE ucp = '${roww[0].ucp}' LIMIT 3`, async(err, row) => {
                    const msgChar = new MessageEmbed()
                    .setAuthor({ name: "Atzone Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Akun User Control Panel -\n• \`Karakter 1\`: ${row[0].username || "Tidak Ditemukan"}\n• \`Karakter 2\`: ${row[1].username || "Tidak Ditemukan"}\n• \`Karakter 3\`: ${row[2].username || "Tidak Ditemukan"}`)
                    .setColor("GOLD")
                    .setFooter({ text: "Atzone Development Team" })
                    .setTimestamp()
                    interaction.reply({embeds:[msgChar]})                })
            } else {
                IntError(interaction, "Maaf user yang anda tag tidak memiliki akun UCP!"); 
            }
        })
    },
};
