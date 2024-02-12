module.exports.config = {
    name: "google",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Milo",
    description: "Tìm kiếm kết quả trên google!",
    commandCategory: "Công cụ",
    usages: "google [Text]",
    cooldowns: 5,
    dependencies: {
        "request":"",
        "fs":""
    }
};

module.exports.run = function({ api, event, args }) {
    let textNeedSearch = "";
    const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))($)/;
    (event.type == "message_reply") ? textNeedSearch = event.messageReply.attachments[0].url: textNeedSearch = args.join(" ");
(regex.test(textNeedSearch)) ? api.sendMessage(`[⚜️]=== 『 GOOGLE SEARCH 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[🔍]➜ Kết quả tìm kiếm của bạn, ấn vào link bên dưới để xem!\n https://www.google.com/searchbyimage?&image_url=${textNeedSearch}`, event.threadID, event.messageID): api.sendMessage(`[⚜️]=== 『 GOOGLE SEARCH 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[🔍]➜ Kết quả tìm kiếm của bạn, ấn vào link bên dưới để xem!\n https://www.google.com.vn/search?q=${encodeURIComponent(textNeedSearch)}`, event.threadID, event.messageID);
} 