module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "0.0.1",
    credits: "Milo",
    description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (!data.antiout) return;
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đuổi";
    if (type == "tự rời") {
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
            if (error) {
                api.sendMessage(`=== 『 ANTIOUT 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Không mời lại được đứa thích out chùa ${name} vào nhóm !!!`, event.threadID)
            } else api.sendMessage(`=== 『 ANTIOUT 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Đã mời lại  ${name} là đứa thích out chùa. Chuẩn bị tinh thần đi !!!`, event.threadID);
        })
    }
}