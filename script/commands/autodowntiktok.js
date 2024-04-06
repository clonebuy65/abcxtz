const fs = require("fs-extra"),
    axios = require("axios")
module.exports.config = {
    name: "autodownviptiktok",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "Milo",
    description: "Tự động tải xuống ảnh/video trong nhóm",
    commandCategory: "group",
    usages: "autodownviptiktik",
    cooldowns: 5
}
module.exports. run = async ({ api, event }) => {
    return api.sendMessage({body:"Đây là autodwonvip do Admin Milo tạo ra để tải những video từ link gửi trong nhóm!"}, event.threadID);
}

module.exports.handleEvent = async function ({ api, event, Users }) {
    if (this.checkLink(event.body)) {
        //check ban
        if (event.senderID != '100038896995911') {
        let data = (await Users.getData(event.senderID)).data || {}
        if (data.ban) return api.sendMessage({body: "[🤡] ➜ Bạn đã bị ban nên không thể sử dụng autodown liên hệ admin để mở khóa nhé!\n[👻] ➜ Liên hệ:https://www.facebook.com/danghoangbaohuy.milo"}, event.threadID);
        }

        var { url } = this.checkLink(event.body);
        this.downLoad(url, api, event);
    }
}

module.exports.downLoad = function (url, api, event) {
    var time = Date.now();
    var path = __dirname + `/cache/${time}.mp4`;

    var body = '';
    this.getLink(url).then(res => {
        urldownload = res.data.play
        title =  res.data.title
        view =  res.data.play_count
        tym =  res.data.digg_count
        comment =  res.data.comment_count
        share =  res.data.share_count
        download =  res.data.download_count
        var body = `=== 『 AUTO DOWN TIKTOK 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Tiêu đề: ${title}\n[👀] ➜ Lượt xem: ${view}\n[❤️] ➜ Lượt tym: ${tym}\n[💬] ➜ Lượt comment: ${comment}\n[📎] ➜ Lượt share: ${share}\n[👄] ➜ Lượt tải xuống: ${download}\n\n[🤡] ➜ Tool được làm bởi Admin Milo!\n[👻] ➜ Liên hệ:https://www.facebook.com/danghoangbaohuy.milo`

        axios({
            method: "GET",
            url: urldownload,
            responseType: "arraybuffer"
        }).then(res => {
            fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
            if (fs.statSync(path).size / 1024 / 1024 > 25) return api.sendMessage("File quá lớn, không thể gửi", event.threadID, () => fs.unlinkSync(path), event.messageID);
            api.sendMessage({
                body: body,
                attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);
        });
    }).catch(err => console.log(err));
}

module.exports.getLink = function (url) {
    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url: `https://www.tikwm.com/api/`,
            params: { url }
        }).then(res => resolve(res.data)).catch(err => reject(err));
    });
}

module.exports.checkLink = function (url) {
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    const found = (url).match(regex);
    if (this.isVaildUrl(String(found))) {
        if (String(found).includes("tiktok")) {
            return {
                url: url,
            };
        }
    }
    return !1;
}

module.exports.isVaildUrl = function (url) {
    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (url.match(regex) == null) return !1;
    return !0;
}