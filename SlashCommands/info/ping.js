// const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "credits",
//     description: "Server Credit",
//     type: "",
//     /**
//      *
//      * @param {Client} client
//      * @param {CommandInteraction} interaction
//      * @param {String[]} args
//      */
//     run: async (client, interaction, args) => {
//         // Membuat pesan embed untuk kredit server
//         const embed = new MessageEmbed()
//             .setTitle("Server Credit")
//             .setDescription("Berikut Staff Yang Berkontribusi Di Server Asia Lane:")
//             .setColor("#0099ff")
//             .addField("Owner", "Gyu")
//             .addField("Developer", "Gyu")
//             .addField("Staff", "1. Arul\n2. Fikri\n3. Kenzy\n4. Emy\n5. Jaelani\n6. Super");

//         // Mengirim pesan embed ke saluran interaksi
//         await interaction.reply({ embeds: [embed] });
//     },
// };
