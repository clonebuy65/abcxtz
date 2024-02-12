module.exports.config = {
	name: "search",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Milo",
	description: "Tìm kiếm kết quả trên google!",
	commandCategory: "Công cụ",
	usages: "search [Text]",
	cooldowns: 5,
	dependencies: {
		"google-it": ""
	}
};

  module.exports.run = async function({ api, event, args }) {
        let textNeedSearch = "";
        const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))($)/;
        (event.type == "message_reply") ? textNeedSearch = event.messageReply.attachments[0].url : textNeedSearch = event.args.join(" ");
        if (regex.test(textNeedSearch)) {
            api.sendMessage("[⚜️]➜ Không thể tìm kiếm ảnh!", event.threadID, event.messageID);
        }
        else {
            api.sendMessage(`[⚜️]➜ Đang tìm kiếm kết quả cho từ khóa: ${textNeedSearch}`, event.threadID, (err, info) =>
                setTimeout(() => {
                    api.unsendMessage(info.messageID)
                }, 3000));
            const google = require('google-it');
            (async () => {
                const results = await google({ query: textNeedSearch });
                let body = "[⚜️]=== 『 SEARCH SUCCESS 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n";
                for (var i = 0; i < 5; i++) {
                    body += `${i + 1}. ${results[i].title}\n${results[i].link}\n\n`;
                }
                api.sendMessage(body, event.threadID, event.messageID);
            })();
        }
    }
    