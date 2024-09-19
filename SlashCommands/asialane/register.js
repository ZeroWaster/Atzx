const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlAsia = require("../../Mysql");

module.exports = {
    name: "register",
    description: "Cek karakter User Control Panel",
    type: "",
    options: [
        {
            name: "ucp-name",
            description: "Nama akun UCP yang akan didaftarkan",
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
        await interaction.deferReply();
        const userid = interaction.user.id;
        const currentDate = new Date();
        const inputName = interaction.options.getString('ucp-name');
        var randCode = Math.floor(Math.random() * 99999) + 1;

        if(inputName.includes("_") || inputName.includes(" ")) 
            return IntError(interaction, "Nama akun User Control Panel tidak boleh mengandung spasi atau simbol \"_\"");
        
        if(!/^[a-z]+$/i.test(inputName)) 
            return IntError(interaction, "Nama akun User Control Panel hanya boleh mengandung huruf tanpa spasi atau simbol");

        MysqlAsia.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (err, row) => {
            if (row.length < 1) {
                MysqlAsia.query(`SELECT * FROM playerucp WHERE ucp = '${userid}'`, async (err, row) => {
                    if(row.length < 1) {
                        await MysqlAsia.query(`INSERT INTO playerucp SET ucp = '${inputName}', DiscordID = '${userid}', VerifyCode = '${randCode}'`);
                        const msgEmbed = new MessageEmbed()
                            .setAuthor("Atzone Roleplay", client.config.ICON_URL)
                            .setTitle("Registrasi Akun UCP")
                            .setDescription(`Hallo **${interaction.user.ucp}**! Selamat Akun UCP Anda Telah Terdaftar di Kota Atzone. Silahkan Gunakan Kode/Pin Verifikasi Berikut untuk Pendaftaran Lebih Lanjut di Dalam Game Anda.\n **Selamat Beroleplay!**`)
                            .addFields(
                                { name: "Data Akun User Control Panel", value: "\u200B" },
                                { name: "• Pemilik Akun:", value: `<@${userid}>`, inline: false },
                                { name: "• Nama UCP:", value: inputName, inline: false },
                                { name: "• Kode Verifikasi:", value: `\`\`\`${randCode}\`\`\``, inline: false },
                                { name: "• Waktu Pendaftaran:", value: `<t:${Math.round(currentDate.getTime() / 1000)}:R>`, inline: false }
                            )
                            .setColor("#00FFF3")
                            .setFooter("Atzone Roleplay Development Team")
                            .setTimestamp();
                        
                        await interaction.user.send({ embeds: [msgEmbed] })
                            .catch(error => {
                                interaction.reply({ 
                                    content: "Tidak dapat mengirimkan kode/pin verifikasi akun UCP Anda. Pastikan Anda telah mengizinkan pesan langsung (Direct Message) dari pengguna server ini.", 
                                    ephemeral: true 
                                });
                            });
        
                        console.log(`\x1b[36m[BOT]: \x1b[0mUser \x1b[36m(${interaction.user.tag}) \x1b[0mTelah berhasil mendaftarkan akun UCP dengan Nama \x1b[36m(${inputName}) \x1b[0mDan Pin \x1b[36m(${randCode})`);
                        IntSucces(interaction, `Akun User Control Panel Anda telah berhasil didaftarkan. Silahkan cek pesan langsung (Direct Message/DM) Anda untuk mendapatkan kode/pin verifikasi!`);
        
                        const rUCP = await interaction.guild.roles.cache.get(client.config.ROLE_UCP);
                        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
                            interaction.member.roles.add(rUCP);
                            interaction.member.setNickname(`[ Warga ] ${inputName}`);
                        }
                    }
                    else {
                        IntError(interaction, "Maaf, nama akun yang Anda masukkan sudah terdaftar. Silahkan coba nama akun lain.");
                    }
                });
            }
            else return IntError(interaction, `Anda telah memiliki akun UCP dengan nama "${row[0].ucp}"`);
        })

    },
};
