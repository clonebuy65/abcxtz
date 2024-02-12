module.exports.config = {
    name: 'busy',
    version: '1.0.02',
    hasPermssion: 1,
    credits: 'Milo',
    description: 'Tự thông báo bạn đang bận khi có người tags',
    commandCategory: 'Hệ thống quản trị viên',
    usages: '[]',
    cooldowns: 3
};
const {
    readFileSync,
    writeFileSync,
    existsSync
} = require('fs-extra')
dest = __dirname + '/cache/bận.json',
convertTime = a => new Date(a).toLocaleString();
module.exports.onLoad = function() {
    if (!existsSync(dest)) writeFileSync(dest, '{}');
};
module.exports.handleEvent = async function({
    api, event
}) {
    const out = (a, b, c) => api.sendMessage(`${a}`, event.threadID, c?c: null, b?event.messageID: null),
    data = JSON.parse(readFileSync(dest)),
    tags = Object.keys(event.mentions),
    now = Date.now(),
    z = data[event.senderID];
    if (!!z) {
        if (z.timeEnd < now){
           await out(`[⚜️]=== 『 BUSY 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ Chào mừng bạn đã quay lại👋`, true);
          out(z.dataTags.length == 0 ? '[⚜️]➜ Trong lúc bạn đi vắng không có ai tag bạn cả.': `[⚜️]➜ Danh sách ${z.dataTags.length} người vừa tags bạn!\n\n${z.dataTags.map((i, c) => `${c+1}. www.facebook.com/${i.id}\n[⚜️]➜ Thời Gian: ${convertTime(i.time)}\n[⚜️]➜ Nhóm: ${global.data.threadInfo.get(i.idT).threadName}\n[⚜️]➜ Nội Dung: ${i.msg}\n`).join('\n\n')}`);
            z.dataTags.length = 0;
        };
          z.timeEnd = now+(z.delay*(60*1000));
    };
    if (tags.length != 0) tags.forEach(i => {
        const x = data[i];
        if (!!x && x.timeEnd < now) {
            x.dataTags.push({
                id: event.senderID,
                idT: event.threadID,
                msg: event.body,
                time: Date.now()+25200000
            });
            out(`[❗]➜ Hiện tại người dùng www.facebook.com/${i} đang bận ❗\n\n[⚜️]➜ Lý Do: ${x.msg}\n[⚜️]➜ TG Tương Tác Lần Cuối: ${convertTime((x.timeEnd-(x.delay*(60*1000)))+25200000)}`, true);
        };
    });
    writeFileSync(dest, JSON.stringify(data, 0, 4));
};
module.exports.run = function({
    api, event, args
}) {
    try {
        const out = (a, b, c) => api.sendMessage(`${a}`, event.threadID, c?c: null, b?event.messageID: null),
        data = JSON.parse(readFileSync(dest));
        if (!!args[0]) {
            const str = args.join(' '),
            arg = str.split('&'),
            msg = arg[0],
            delay = arg[1];
            if (!msg || !delay || isNaN(delay)) return out(!!delay&&isNaN(delay) ? '[❗]➜ Phải là con số':`Vui lòng nhập đúng định dạng: lý do & thời gian đếm ngược tự bật(phút): `, true);
            data[event.senderID] = {
                delay,
                timeEnd: Date.now()+(delay*(60*1000)),
                msg,
                dataTags: []
            };
            out(`[⚜️]➜ Đã thiết lập ${this.config.name} với lý do: ${msg}\n\n -> tự bật sau ${delay%60} phút kể từ khi bạn ko tương tác!`, true);
        } else {
            if (!data[event.senderID]) return out(`[⚜️]➜ Bạn chưa thiết lập ${this.config.name}, để thiết lập nhập: ${event.body.split('').shift()}${this.config.name} + Lý do & thời gian(phút) tự bật sau khi bạn rời khỏi!`, true);
            out(`[⚜️]➜ Đã xóa thiết lập ${this.config.name}!`, true);
            delete data[event.senderID];
        };
        writeFileSync(dest, JSON.stringify(data, 0, 4));
    }catch(err) {
        out(err, true);
    }
};