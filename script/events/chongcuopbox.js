module.exports.config = {
    name: "chongcuopbox",
    eventType: ["log:thread-admins"],
    version: "1.0.0",
    credits: "Milo",
    description: "Ngăn chặn việc thay đổi admin",
};

module.exports.run = async function ({ event, api, Threads, Users }) {
    const { logMessageType, logMessageData, senderID } = event;
 	let data = (await Threads.getData(event.threadID)).data
 	if (data.guard == false) return;
    if (data.guard == true ) {
        switch (logMessageType) {
          case "log:thread-admins": {
            if (logMessageData.ADMIN_EVENT == "add_admin") {
              if(event.author == api.getCurrentUserID()) return
              if(logMessageData.TARGET_ID == api.getCurrentUserID()) return
              else {
                api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback)
                api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, false)
                function editAdminsCallback(err) {
                  if (err) return api.sendMessage("[⚜️]➜ Bot đã gỡ quản trị viên của bạn!", event.threadID, event.messageID);
                    return api.sendMessage(`[🚫] Cảnh báo hành vi cướp box!!! [🚫]\n====================\n[📝] Hệ thống đã phát hiện hành vi cướp vị trí admin box\nĐể đảm bảo tính toàn vẹn và trong sạch cho nhóm, hệ thống sẽ gỡ quản trị viên của người có ý định cướp nhóm. Xin cảm ơn!\n\n[👑] Đã gửi thông báo cho các quản trị viên nhóm\n====================\n✅ Đã kích hoạt thành công chế độ bảo vệ hội nhóm`, event.threadID, event.messageID);
                }
              }
            }
            else if (logMessageData.ADMIN_EVENT == "remove_admin") {
              if(event.author == api.getCurrentUserID()) return
              if(logMessageData.TARGET_ID == api.getCurrentUserID()) return
              else {
                api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback)
                api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, true)
                function editAdminsCallback(err) {
                if (err) return api.sendMessage("[⚜️]➜ Bot đã thêm bạn lên lại quản trị viên!", event.threadID, event.messageID);
                return api.sendMessage(`[🚫] Cảnh báo hành vi cướp box!!! [🚫]\n====================\n[📝] Hệ thống đã phát hiện hành vi cướp vị trí admin box\nĐể đảm bảo tính toàn vẹn và trong sạch cho nhóm, hệ thống sẽ gỡ quản trị viên của người có ý định cướp nhóm. Xin cảm ơn!\n\n[👑] Đã gửi thông báo cho các quản trị viên nhóm\n====================\n✅ Đã kích hoạt thành công chế độ bảo vệ hội nhóm`, event.threadID, event.messageID);
              }
            }
          }
        }
      }
    }
}
