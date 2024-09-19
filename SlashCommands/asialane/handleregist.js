const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "handleregist",
    description: "Menampilkan Panel Register Atzone Roleplay",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const msgEmbed = new MessageEmbed()
        .setAuthor({ name:"Atzone Roleplay", iconURL:client.config.ICON_URL })
        .setColor("BLUE")

        .setTitle("Atzone Roleplay")
        .setDescription("Halo Semua, Mohon Perhatiannya, Saya Harap Kalian Semua Telah Membaca Rules Game Dan Rules Discord Yang Telah disediakan")
        .addField("Kegunaan Tombol", "• [ 📃 | Register ] Untuk Register Akun Baru UCP \n• [ 🔐 | Resend Code ]", true)					  
        .setFooter({ text:"Atzone Roleplay Development Team " })
        .setTimestamp()

        const Buttons = new MessageActionRow()
        .addComponents(

            new MessageButton()
            .setCustomId("button-register")
            .setLabel("Register UCP")
            .setStyle("SUCCESS")
            .setEmoji("📃"),

            new MessageButton()
            .setCustomId("button-resendcode")
            .setLabel("Resend Code")
            .setStyle("PRIMARY")
            .setEmoji("🔒"),

            new MessageButton()
            .setCustomId("button-reset-password")
            .setLabel("Reset Password")
            .setStyle("DANGER")
            .setEmoji("🔒")
            
        )

        interaction.reply({  embeds: [msgEmbed], components: [Buttons]})
    },
};
