module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Milo",//Mod by H.Thanh
	description: "Thông báo Bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};
const checkttPath = __dirname + '/../commands/cache/checktt/'


module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "randomimg");
    if (existsSync(path)) mkdirSync(path, { recursive: true });

    const path2 = join(__dirname, "cache", "randomimg");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function ({ api, event, Users, Threads }) {
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
  var fullYear = global.client.getTime("fullYear");
  	var getHours = await global.client.getTime("hours");
    const moment = require("moment-timezone");
    /*var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'*/
    const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
    const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
    const iduser = event.logMessageData.leftParticipantFbId;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝑟𝑜̛̀𝑖" : "𝑏𝑖̣ 𝑞𝑢𝑎̉𝑛 𝑙𝑖́ đ𝑢𝑜̂̉𝑖";
	const path = join(__dirname, "cache", "randomimg");
	const pathGif = join(path, `${threadID}`);
	var msg, formPush

	if (existsSync(checkttPath + threadID + '.json')) {
        const threadData = JSON.parse(readFileSync(checkttPath + threadID + '.json'));
        const userData_week_index = threadData.week.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
        const userData_day_index = threadData.day.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
        const userData_total_index = threadData.total.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
        if (userData_total_index != -1) {
            threadData.total.splice(userData_total_index, 1);
        }
        if (userData_week_index != -1) {
            threadData.week.splice(userData_week_index, 1);
        }
        if (userData_day_index != -1) {
            threadData.day.splice(userData_day_index, 1);
        }

        writeFileSync(checkttPath + threadID + '.json', JSON.stringify(threadData, null, 4));
    }
    if (existsSync(path)) mkdirSync(path, { recursive: true });

(typeof data.customLeave == "undefined") ? msg = "=== 𝐋𝐄𝐀𝐕𝐄 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ {name} đã {type} khỏi băng đảng !!!\n[🔎] ➜ ID của nó: {iduser}\n◆━━━━━━━━━━━━━◆\n[⏰] ➜ Cút vào: buổi {session} || {time}" : msg = data.customLeave;
	msg = msg
    .replace(/\{iduser}/g, iduser)
    .replace(/\{name}/g, name)
    .replace(/\{type}/g, type)
    .replace(/\{session}/g, hours <= 10 ? "sáng" : 
    hours > 10 && hours <= 12 ? "trưa" :
    hours > 12 && hours <= 18 ? "chiều" : "tối")
    .replace(/\{fullYear}/g, fullYear)
    .replace(/\{time}/g, time);  

	const randomPath = readdirSync(join(__dirname, "cache", "randomimg"));

	if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "randomimg",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}