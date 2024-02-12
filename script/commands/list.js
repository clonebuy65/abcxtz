module.exports.config = {
    name: "list",
    version: "2.0.0",
    credits: "Milo",
    hasPermssion: 3,
    description: "List thread or user",
    commandCategory: "Hệ thống admin-bot",
    usages: "[thread/user]",
    cooldowns: 5
}, module.exports.handleEvent = async ({
    event: e,
    api: n,
    Threads: a
}) => {
    const t = ((await a.getData(e.threadID)).data || {}).banOut || [];
    t.includes(t[0]) && n.removeUserFromGroup(n.getCurrentUserID(), e.threadID);
}, module.exports.handleReaction = async ({
    event: e,
    api: n,
    handleReaction: a
}) => {
    parseInt(e.userID) === parseInt(a.author) && n.unsendMessage(a.messageID);
}, module.exports.handleReply = async function({
    api: e,
    event: n,
    Threads: a,
    handleReply: t,
    Currencies: s
}) {
    if (t.author != n.senderID) return;
    const r = global.nodemodule["fs-extra"],
        o = global.nodemodule.request;
    var i = n.body.split(" ");
    switch (console.log(i), t.type) {
        case "reply":
            var d = t.groupid[i[1] - 1];
            if ("ban" == i[0] || "Ban" == i[0]) {
                (h = i.slice(2).join(" ")) || (h = "[⚜️]➜ Không có lý do nào được đưa ra"), e.sendMessage("◆━━◆THÔNG BÁO◆━━◆\n\n[⚜️]➜ Đã nhận lệnh BAN nhóm từ admin\nVới lý do: " + h, d);
                let s = (g = await e.getThreadInfo(d)).threadName;
                const r = (await a.getData(d)).data || {};
                r.banned = 1, await a.setData(d, {
                    data: r
                }), global.data.threadBanned.set(parseInt(d), 1), e.sendMessage("[" + d + "] :\n" + s + "\n[⚜️]➜ Đã ban thành công!\nvới lý do: " + h, n.threadID, () => e.unsendMessage(t.messageID));
            }
            if ("banout" == i[0] || "Banout" == i[0]) {
                (h = i.slice(2).join(" ")) || (h = "[⚜️]➜ Không có lý do nào được đưa ra"), e.sendMessage("◆━━◆THÔNG BÁO◆━━◆\n\n[⚜️]➜ Đã nhận lệnh BANOUT nhóm từ admin\nVới lý do: " + h, d);
                let s = (g = await e.getThreadInfo(d)).threadName;
                const r = (await a.getData(d)).data || {};
                r.banOut = d, await a.setData(d, {
                    data: r
                }), e.sendMessage("[" + d + "] :\n" + s + "\n[⚜️]➜ Đã banout thành công!\n[⚜️]➜ Lý do: " + h, n.threadID, () => e.unsendMessage(t.messageID));
            }
            if ("out" == i[0] || "Out" == i[0]) {
                (h = i.slice(2).join(" ")) || (h = "[⚜️]➜ Không có lý do nào được đưa ra");
                let a = (g = await e.getThreadInfo(d)).threadName;
                e.sendMessage("◆━━◆THÔNG BÁO◆━━◆\n\n[⚜️]➜ Đã nhận lệnh out nhóm từ admin\n[⚜️]➜ Lý do: " + h, d, () => e.removeUserFromGroup("" + e.getCurrentUserID(), d)), e.sendMessage("[⚜️]➜ Đã out thread có id: " + d + "\n" + a + "\n[⚜️]➜ Lý do: " + h, n.threadID, () => e.unsendMessage(t.messageID));
            }
            if ("Sendbox" == i[0] || "sendbox" == i[0]) {
                var h;
                if (!(h = i.slice(2).join(" "))) return e.sendMessage("[⚜️]➜ Nội dung thông báo không được để trống!", n.threadID, () => e.unsendMessage(t.messageID));
                let a = (g = await e.getThreadInfo(d)).threadName;
                e.sendMessage("◆━━◆THÔNG BÁO◆━━◆\n\n[⚜️]➜ Thông Báo Từ ADMINBOT Gửi Đến Nhóm Bạn!\n◆━━━━━━━━━━━━━◆\n\n" + h, d), e.sendMessage("[⚜️]➜ Đã gửi thông báo tới thread có id:\n[" + d + "]\n" + a, n.threadID, () => e.unsendMessage(t.messageID));
            }
            if ("Info" == i[0] || "info" == i[0]) {
                var g;
                let a = (g = await e.getThreadInfo(d)).participantIDs.length;
                var l = [],
                    u = [],
                    m = [];
                for (let e in g.userInfo) {
                    var I = g.userInfo[e].gender,
                        c = g.userInfo[e].name;
                    "MALE" == I ? l.push(e + I) : "FEMALE" == I ? u.push(I) : m.push(c);
                }
                var f = l.length,
                    p = u.length;
                let s = g.adminIDs.length,
                    r = g.messageCount,
                    o = g.emoji,
                    i = g.threadName,
                    h = g.threadID;
                var D = "",
                    v = g.adminIDs;
                for (let n = 0; n < v.length; n++) {
                    D += "•" + (await e.getUserInfo(v[n].id))[v[n].id].name + "\n";
                }
                let y = g.approvalMode;
                var b = 0 == y ? "tắt" : 1 == y ? "bật" : "Kh",
                    T = 0 == y ? "❎" : 1 == y ? "✅" : "⭕";
                return e.sendMessage("[⚜️]=== 『 INFORMATION 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n[⚜️]➜ Tên box: " + i + "\n[⚜️]➜ ID Box: " + h + "\n" + T + "[⚜️]➜ Phê duyệt: " + b + "\n[⚜️]➜ Emoji: " + o + "\n[⚜️]➜ Tổng " + a + " thành viên\n👨‍🦰Nam: " + f + " thành viên \n[⚜️]➜ Nữ: " + p + " thành viên\n\n[⚜️]➜ Với " + s + " quản trị viên gồm:\n" + D + "\n[⚜️]➜ Tổng số tin nhắn: " + r + " tin.", n.threadID, () => e.unsendMessage(t.messageID));
            }
            break;
        case "replyuser":
            var y = t.userid[i[1] - 1];
            if ("Info" == i[0] || "info" == i[0]) {
                let a = await e.getUserInfo(y),
                    i = a[y].profileUrl,
                    d = 0 == a[y].isFriend ? "Chưa kết bạn với FB Bot😶." : 1 == a[y].isFriend ? "Đã kết bạn với FB Bot😚." : "Đéo",
                    h = a[y].vanity,
                    g = (await s.getData(y)).money,
                    l = await a[y].name;
                var M = await a[y].gender,
                    w = 2 == M ? "Nam" : 1 == M ? "Nữ" : "Trần Đức Bo";
                e.unsendMessage(t.messageID);
                o(encodeURI("https://graph.facebook.com/" + y + "/picture?width=512&height=512&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9")).pipe(r.createWriteStream(__dirname + "/cache/1.png")).on("close", () => (() => e.sendMessage({
                    body: "[⚜️]=== 『 INFORMATION 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n[⚜️]➜ Tên: " + l + "\n[⚜️]➜ UID: " + y + "\n[⚜️]➜ Link FB: " + i + "\n[⚜️]➜ Giới tính: " + w + "\n[⚜️]➜ Username: " + h + "\n[⚜️]➜ Tình trạng: " + d + "\n[⚜️]➜ Số tiền: " + g + " đô.",
                    attachment: r.createReadStream(__dirname + "/cache/1.png")
                }, n.threadID, () => r.unlinkSync(__dirname + "/cache/1.png")))());
            }
    }
}, module.exports.run = async function({
    api: e,
    event: n,
    args: a
}) {
    if ("thread" == a[0]) {
        const g = global.data.threadData.get(parseInt(n.threadID)) || {},
            l = g.hasOwnProperty("PREFIX") ? g.PREFIX : global.config.PREFIX;
        var t = await e.getThreadList(100, null, ["INBOX"]);
        let u = [...t].filter(e => e.isSubscribed && e.isGroup),
            m = [...t].filter(e => e.isSubscribed && e.isGroup);
        var s = function(e, n) {
                var a = 0,
                    t = e.length,
                    s = [];
                for (a = 0; a < t; a += n) myChunk = e.slice(a, a + n), s.push(myChunk);
                return s;
            }(u, 10),
            r = [];
        if (1 == a.length || !a) return e.sendMessage("[⚜️]➜ Tổng nhóm đã tham gia : " + m.length + "\n[⚜️]➜ Số Trang : " + s.length + "\n\n[⚜️]➜ " + l + "list thread (số trang)!", n.threadID, n.messageID);
        for (var o of s[a[1] - 1]) {
            let n = await e.getThreadInfo(o.threadID);
            r.push({
                id: o.threadID,
                name: o.name,
                sotv: n.userInfo.length
            });
        }
        var i = r.sort((e, n) => e.sotv > n.sotv ? -1 : e.sotv < n.sotv ? 1 : void 0);
        let I = "",
            c = 1;
        var d = [];
        for (var h of i) I += c++ + ". " + h.name + "\n[⚜️]➜ TID: " + h.id + "\n[⚜️]➜ Thành viên: " + h.sotv + "\n\n", d.push(h.id);
        e.sendMessage(I + "[⚜️]➜ Trang(" + a[1] + "/" + s.length + ")\n\n[⚜️]➜ Reply [out, ban, banout, info, sendbox]\nSố thứ tự để [out, ban, banout, info, sendbox] thread đó!!", n.threadID, (e, a) => {
            global.client.handleReply.push({
                name: this.config.name,
                author: n.senderID,
                messageID: a.messageID,
                groupid: d,
                type: "reply"
            }), global.client.handleReaction.push({
                name: this.config.name,
                messageID: a.messageID,
                author: n.senderID
            });
        });
    }
    if ("user" == a[0]) {
        const t = global.data.threadData.get(parseInt(n.threadID)) || {},
            s = t.hasOwnProperty("PREFIX") ? t.PREFIX : global.config.PREFIX;
        var g = function(e, n) {
            var a = 0,
                t = e.length,
                s = [];
            for (a = 0; a < t; a += n) myChunk1 = e.slice(a, a + n), s.push(myChunk1);
            return s;
        }(data.allUserID, 5);
        if (1 == a.length || !a) return e.sendMessage("[⚜️]➜ Tổng user sử dụng BOT : " + global.data.allCurrenciesID.length + "\n[⚜️]➜ Số Trang : " + g.length + "\n\n[⚜️]➜ " + s + "list user (số trang)!", n.threadID, n.messageID);
        let r = "",
            o = 1;
        var l = [];
        for (var u of g[a[1] - 1]) {
            let n = await e.getUserInfo(u),
                a = await n[u].name;
            var m = await n[u].gender;
            r += o++ + ". Tên: " + a + "\n[⚜️]➜ TID: " + u + "\n[⚜️]➜ Giới tính: " + (2 == m ? "🙋‍♂️ Nam" : 1 == m ? "🙋‍♀️ Nữ" : "🤦‍♀️ Trần Đức Bo") + "\n\n", l.push(u);
        }
        e.sendMessage(r + "[⚜️]➜ Trang(" + a[1] + "/" + g.length + ")\n\n[⚜️]➜ Reply [info]\nSố thứ tự để [info] user đó!!", n.threadID, (e, a) => {
            global.client.handleReply.push({
                name: this.config.name,
                author: n.senderID,
                messageID: a.messageID,
                userid: l,
                type: "replyuser"
            }), global.client.handleReaction.push({
                name: this.config.name,
                messageID: a.messageID,
                author: n.senderID
            });
        });
    }
};