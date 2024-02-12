module.exports = new Module({
    name: 'lol',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'Milo',
    description: '',
    commandCategory: 'Thông tin',
    uages: 'lol + tên tướng',
    cooldowns: 3
});

class Module {
    constructor(a) {
        this.config = a,
        this.b = null;
    };
    run(o) {
        let
        axios = require('axios');

        let
        send = msg=>o.api.sendMessage(msg, o.event.threadID, o.event.messageID),
        s = o.args.join(' '),
        b = this.b

        if (!s)return send('[⚜️]➜ Thiếu tên');

        async function info($) {
            let
            find = $.find(el=>el.name.toLowerCase().startsWith(s.toLowerCase()));

            if (!find)return send('[⚜️]➜ Không tìm thấy.');

            let
            a = Object.entries(find),
            img = a.pop();
            send({
                body: a.map(el=>`- ${el[0].replace(/_/g, ' ')}: ${el[1]}`).join('\n'),
                attachment: (await axios.get(img.pop(), {
                    responseType: 'stream'
                })).data
            });
        };

        if (!this.b)axios.get(`https://raw.githubusercontent.com/J-JRT/api2/mainV2/lol.json`).then(success=>info(b = success.data)).catch(err=>send(err)); else info(b);
    };
};


