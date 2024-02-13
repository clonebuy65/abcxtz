module.exports.config = {
	name: "downfile", 
	version: "1.0.0",
	hasPermssion: 3, 
	credits: "Milo", 
	description: "tải xuống file hệ thống", 
	commandCategory: "system", 
	usages: "downfile [file muốn tải]",
	cooldowns: 1, 
	dependencies: {
		"fs": ""
	}
};

const fs = require('fs');
const path = require('path');

module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
	const databasePath = path.join(__dirname, '..', '..', 'data', 'data.sqlite');// Đường dẫn đến cơ sở dữ liệu
	const { threadID } = event;
	try {
		const attachmentData = await fs.createReadStream(databasePath);

		return api.sendMessage({ body: "file nè: ", attachment: attachmentData }, threadID);
	} catch (error) {
		return api.sendMessage({ body: error}, threadID);

	}

}