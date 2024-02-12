module.exports.config = {
	name: "setprefix",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "Milo",
	description: "Đặt lại prefix của nhóm",
	commandCategory: "công cụ",
	usages: "[prefix/reset]",
	cooldowns: 0
};

module.exports.languages ={
	"vi": {
		"successChange": "[⚜] - Đã đặt thành công dấu lệnh hệ thống của nhóm này thành: %1\n→ Dấu lệnh mặc định của hệ thống là: /",
		"missingInput": "[Lỗi!] - Bạn chưa nhập dấu lệnh muốn đổi",
		"resetPrefix": "[SETPREFIX] - Đã đặt dấu lệnh của nhóm về mặc định của hệ thống: %1",
		"confirmChange": "[SETPREFIX] - Bạn có chắc chắn muốn đổi dấu lệnh bot của nhóm này thành: %1 hay không\n➝ Hãy thả một cảm xúc bất kì vào tin nhắn này để xác nhận đổi nhé. Xin cảm ơn!"
	},
	"en": {
		"successChange": "Changed prefix into: %1",
		"missingInput": "Prefix have not to be blank",
		"resetPrefix": "Reset prefix to: %1",
		"confirmChange": "Are you sure that you want to change prefix into: %1"
	}
}

module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		api.unsendMessage(handleReaction.messageID);
    
     api.changeNickname(`[ ${handleReaction.PREFIX} ] ${global.config.BOTNAME}`, event.threadID, event.senderID);
		return api.sendMessage(getText("successChange", handleReaction.PREFIX), threadID, messageID);
    
	} catch (e) { return console.log(e) }
}

module.exports.run = async ({ api, event, args, Threads , getText }) => {
	if (typeof args[0] == "undefined") return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	if (prefix == "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
    var uid = api.getCurrentUserID()
    api.changeNickname(`「 ${global.config.PREFIX} 」➤ ${global.config.BOTNAME}`,event.threadID, uid);
    
		return api.sendMessage(getText("resetPrefix", global.config.PREFIX), event.threadID, event.messageID);
	} else return api.sendMessage(getText("confirmChange", prefix), event.threadID, (error, info) => {
		global.client.handleReaction.push({
			name: "setprefix",
			messageID: info.messageID,
			author: event.senderID,
			PREFIX: prefix
		})
	})
}