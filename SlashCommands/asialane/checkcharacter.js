const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlAsia = require("../../Mysql");
const numberFormat = (value) =>
    new Intl.NumberFormat('ID', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

module.exports = {
    name: "checkcharacter",
    description: "Memeriksa statistik/harta karakter player",
    type: "",
    options: [
        {
            name: "char-name",
            description: "Nama Karakter yang akan diperiksa",
            type: "STRING",
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
        const karakter = interaction.options.getString("char-name");

        MysqlAsia.query(`SELECT * FROM players WHERE username = '${karakter}'`, async (err, row) => {
            if (row[0]) {
                const msgChar = new MessageEmbed()
                    .setAuthor({ name: "Atzone Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Karakter ${row[0].username} -\n• \`Nama\`: ${row[0].username}\n• \`UserUCP\`: ${row[0].ucp}\n\n- Harta Player \n• \`Uang\`: ${numberFormat(row[0].money)}\n• \`Saldo Bank\`: ${numberFormat(row[0].bmoney)}\n• \`Uang Merah\`: ${numberFormat(row[0].redmoney)}`)
                    .setColor("BLUE")
                    .setFooter({ text: "Atzone Roleplay Development Team " })
                    .setThumbnail(`https://gta.com.ua/img/articles/sa/sa-mp/skins-id/skin_${row[0].skin}.png`)
                    .setTimestamp()
                interaction.reply({ embeds: [msgChar], ephemeral: true })
            }
            else{
                IntError(interaction, `Karakter Yang Ingin Anda Periksa Belum Pernah Dibuat Sama Sekali!`);
            }
        })
    },
};
