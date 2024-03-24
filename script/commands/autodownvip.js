const fs = require("fs-extra"),
    axios = require("axios")
module.exports.config = {
    name: "autodownvip",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Milo",
    description: "Tự động tải xuống ảnh/video trong nhóm",
    commandCategory: "group",
    usages: "autodownvip",
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

        var { type, url, typeapi } = this.checkLink(event.body);
        this.downLoad(url, type, typeapi, api, event);
    }
}

module.exports.downLoad = function (url, type, typeapi, api, event) {
    var time = Date.now();
    var path = __dirname + `/cache/${time}.${type}`;

    if (url.includes("reel")) var check_rl_wt = 'REEL';
    else if (url.includes("watch")) var check_rl_wt = 'WATCH';
    var body = '';
    this.getLink(url).then(res => {
        if (type == 'mp4') {
            if (typeapi == 'aio') {
                url = res.result.medias[0].url
                title = res.result.title
                var body = `=== 『 AUTO DOWN ${check_rl_wt} 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Tiêu đề: ${title}\n\n[🤡] ➜ Tool được làm bởi Admin Milo!\n[👻] ➜ Liên hệ:https://www.facebook.com/danghoangbaohuy.milo`
            }
            else if (typeapi == 'fb') {
                url = res.attachment[0].browser_native_hd_url;
                console.log(url);
                var body = `=== 『 AUTO DOWN STORY 』 ===\n━━━━━━━━━━━━━━━━\n\n[🤡] ➜ Tool được làm bởi Admin Milo!\n[👻] ➜ Liên hệ:https://www.facebook.com/danghoangbaohuy.milo`
            }
            else if (typeapi == 'tt') {
                url = res.data.play;
                title = res.data.title;
                view = res.data.play_count;
                tym = res.data.digg_count;
                comment = res.data.comment_count;
                share = res.data.share_count;

                var body = `=== 『 AUTO DOWN TIKTOK 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Tiêu đề: ${title}\n[👀] ➜ Lượt xem: ${view}\n[❤️] ➜ Lượt tym: ${tym}\n[💬] ➜ Lượt comment: ${comment}\n[📎] ➜ Lượt share: ${share}\n\n[🤡] ➜ Tool được làm bởi Admin Milo!\n[👻] ➜ Liên hệ:https://www.facebook.com/danghoangbaohuy.milo`
            }
            else  url = res.result.video.hd || res.result.video.sd || res.result.video.nowatermark || res.result.video.watermark;
            
        }
          
        else if (type == 'mp3') url = res.result.music.play_url
        axios({
            method: "GET",
            url: url,
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
            url: url,
        }).then(res => resolve(res.data)).catch(err => reject(err));
    });
}

module.exports.checkLink = function (url) {
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    const found = (url).match(regex);
    var media = ['douyin', 'youtube', 'youtu', 'twitter', 'instagram', 'kuaishou', 'fb'];
    if (this.isVaildUrl(String(found))) {
        if (String(found).includes("reel")) {
            return {
                type: "mp4",
                url: `https://api.phungtuanhai.online/aio/download?apikey=PTH&url=${String(found)}`,
                typeapi: 'aio'
            };
        }
        else if (String(found).includes("watch")) {
            return {
                type: "mp4",
                url: `https://api.phungtuanhai.online/aio/download?apikey=PTH&url=${String(found)}`,
                typeapi: 'aio'
            };
        }
        else if (String(found).includes("stories")) {
            return {
                type: "mp4",
                url: `https://api.phungtuanhai.online/Facebook/fbdl?apikey=PTH&url=${String(found)}`,
                typeapi: 'fb'
            };
        }
        else if (String(found).includes("tiktok")) {
            return {
                type: "mp4",
                url: `https://api.phungtuanhai.online/tiktok/download?apikey=PTH&url=${String(found)}&is_from_webapp=v1&q=lofi&t=1657523268368`,
                typeapi: 'tt'
            };
        }
        else if (media.some(item => String(found).includes(item))) {
            return {
                type: "mp4",
                url: `https://nguyenmanh.name.vn/api/autolink?url=${String(found)}&apikey=CEXE4aeu`,
                typeapi: ''
            };
        }
        else if (String(found).includes("soundcloud") || String(found).includes("zingmp3")) {
            return {
                type: "mp3",
                url: `https://nguyenmanh.name.vn/api/autolink?url=${String(found)}&apikey=CEXE4aeu`,
                typeapi: ''
            }
        }
    }
    return !1;
}

module.exports.isVaildUrl = function (url) {
    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (url.match(regex) == null) return !1;
    return !0;
}