const fs = require("fs"),
      path = __dirname + "/bot/antibox.json";

module.exports.config = {
	name: "antinamebox",
	version: "beta",
	hasPermssion: 1,
	credits: "Milo",
	description: "Cấm đổi tên nhóm!",
	commandCategory: "Hệ thống quản trị viên",
	usages: "antinamebot on/off",
	cooldowns: 0
};
module.exports.languages = {
  "vi": {},
  "en": {}
};
module.exports.onLoad = () => {   
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
};

module.exports.handleEvent = async function ({ api, event, Threads, permssion }) {
const { threadID, messageID, senderID, isGroup, author } = event;
  
  if (isGroup == true) {
  let data = JSON.parse(fs.readFileSync(path))
  let dataThread = (await Threads.getData(threadID)).threadInfo||{};
  const threadName = dataThread.threadName;
   if (!data[threadID]) {
    data[threadID] = {
  namebox: threadName,
  status: true
}
fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }
    if (data[threadID].namebox == null || threadName == undefined || threadName == null) return
     
    else if (threadName != data[threadID].namebox && data[threadID].status == false) {
    data[threadID].namebox = threadName
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  }
 
 if (threadName != data[threadID].namebox && data[threadID].status == true) {
   return api.setTitle(
     data[threadID].namebox,
       threadID, () => {
         api.sendMessage(
      `[ Cảnh Báo Người Dùng ]\n──────────────────\n❗ Hiện tại nhóm đang bật chế độ cấm đổi tên nhóm.\n⚡ Dùng: ${PREFIX(threadID)}antibox để tắt!`,
       threadID)
       });
      }
    }
  };

module.exports.run = async function ({ api, event, permssion, Threads }) {
  const { threadID, messageID } = event;
 if (permssion == 0) return api.sendMessage("⚡ Chỉ quản trị viên được bật/tắt!", threadID);
  let data = JSON.parse(fs.readFileSync(path))
  let dataThread = (await Threads.getData(threadID)).threadInfo
  const threadName = dataThread.threadName;

    if (data[threadID].status == false) {
       data[threadID] = {
         namebox: threadName,
         status: true
       }
    } else data[threadID].status = false
         fs.writeFileSync(path, JSON.stringify(data, null, 2));
          api.sendMessage(
        `✅ Đã ${data[threadID].status == true ? `bật` : `tắt`} chế độ cấm đổi tên nhóm!`,
     threadID)
    } 
function PREFIX(t) {
var dataThread = global.data.threadData.get(t) || {}
  return dataThread.PREFIX || global.config.PREFIX
                     }