module.exports.config = {
    name: "hunter",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Milo",
    description: "Trở thành thợ săn và cùng những người đồng đội chiến đấu với quái vật trong hầm ngục",
    commandCategory: "Game",
    usages: "create/-c: Để đăng kí người mới\n➜ delete: Hủy đăng ký\n➜ info/-i: Xem thông tin nhân vật \n➜ autotraining/-at: Tự động luyện tập khi AFK\n➜ dungeon/-d: Tham gia đánh phó bản Dungeon\n➜ team/-t: Đăng ký team guild\n➜ changetype/-ct: Đăng ký trở thành thợ săn\n➜ top: Xem top level trên server",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": ""
    }
};

module.exports.createHunterCard = async function create({ experience, hunter }) {
    const Canvas = require('canvas');
    const fs = require('fs-extra');
    const path = require('path');
    const axios = require('axios');
    const jimp = require('jimp');
    Canvas.registerFont(path.resolve(__dirname, 'hunter', 'data', 'fonts', 'Nunito-Light.ttf'), { family: 'Nunito', weight: "regular" });
    Canvas.registerFont(path.resolve(__dirname, 'hunter', 'data', 'fonts', 'Nunito-Black.ttf'), { family: 'Nunito', weight: "bold" });
    var statsCard = await Canvas.loadImage(path.resolve(__dirname, 'hunter', 'data', 'img', 'bg_3.png'));
    var pathImg = path.resolve(__dirname, 'hunter', 'data', 'img', 'card.png');
    var canvas = Canvas.createCanvas(1920, 1080);
    var ctx = canvas.getContext('2d');
    var hunterInfo = hunter.get();
    var experienceInfo = experience.info();
    hunter.autoTraining();
    hunter.updatePoints();
    var avatarSrc = {
        "gladiator": {
            "src": path.resolve(__dirname, 'hunter', 'data', 'img', 'gladiator.png'),
            "size": [655, 800]
        },
        "healer": {
            "src": path.resolve(__dirname, 'hunter', 'data', 'img', 'healer.png'),
            "size": [700, 800]
        },
        "archer": {
            "src": path.resolve(__dirname, 'hunter', 'data', 'img', 'archer.png'),
            "size": [571, 606],
            "down": 120
        },
        "magican": {
            "src": path.resolve(__dirname, 'hunter', 'data', 'img', 'magican.png'),
            "size": [800, 800],
            "down": 10
        }
    }
    // var { data: avatar } = await axios.get(avatarSrc[hunterInfo.type].src, { responseType: 'arraybuffer' });
    ctx.drawImage(statsCard, 0, 0, canvas.width, canvas.height);

    /**
     * Draw avatar hunter
     */
    var choose = avatarSrc[hunterInfo.type];
    var avatar = await jimp.read(choose.src);
    avatar = await avatar.resize(choose.size[0], choose.size[1]);
    avatar = await avatar.getBufferAsync(jimp.MIME_PNG);
    avatar = await Canvas.loadImage(avatar);
    ctx.drawImage(avatar, (canvas.width / 2) - (avatar.width / 2), 150 + (choose.down || 0));

    var nextHeight = 50;

    /**
     * Draw title
     */
    let titleText = `★ Hunter Information ★`;
    ctx.font = `bold 70px Nunito`;
    ctx.fillStyle = '#F25CBD';
    ctx.textAlign = 'start';
    let firstTitleText = titleText.split(/\s/).slice(0, 2).join(" ");
    ctx.fillText(firstTitleText, (canvas.width / 2) - (ctx.measureText(titleText).width / 2), 100);
    ctx.fillStyle = '#91D2FF';
    ctx.textAlign = 'end';
    let secondTitleText = " " + titleText.split(/\s/).slice(2).join(" ");
    ctx.fillText(secondTitleText, (canvas.width / 2) - ((canvas.width / 2) - (ctx.measureText(titleText).width / 2)), 100);
    /**
     * Left Pane
     */
    var LeftHeightStart = 300;
    var LeftStartFill = 100;
    var fullStar = `★ `;
    var emptyStar = `☆ `;
    var fullStarColor = `#3494E6`;
    var emptyStarColor = `#EC6EAD`;
    var textColor = `#F79D00`;
    var titleTextKeyColor = `#64F38C`;
    var descGradient = ctx.createLinearGradient(0, LeftStartFill - ctx.measureText(fullStar).width, 0, LeftHeightStart + LeftStartFill);

    // ctx.fillStyle = '#fff';
    ctx.font = `bold 30px Nunito`;
    ctx.textAlign = 'start';

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Health Points: ${hunterInfo.health_point}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Mana Points: ${hunterInfo.mana_point}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Physical Damage: ${hunterInfo.physical_attack}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Magical Damage: ${hunterInfo.magical_attack}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Physical Defense: ${hunterInfo.physical_defense}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Magical Defense: ${hunterInfo.magical_defense}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Attack Speed: ${hunterInfo.attack_speed}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Recovery Mana: ${hunterInfo.recovery_mana} / 10s`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Skill Normal: ${hunterInfo.skills[0].name}`, LeftStartFill + 2, LeftHeightStart);

    ctx.fillStyle = fullStarColor;
    ctx.fillText(fullStar, LeftStartFill - ctx.measureText(fullStar).width, LeftHeightStart += nextHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(`Skill Ultimate: ${hunterInfo.skills[1].name}`, LeftStartFill + 2, LeftHeightStart);

    /**
     * Right Pane
     */
    var RightHeightStart = 300;
    var RightStartFill = canvas.width / 2 + 400;

    ctx.fillText(`☆ Name: ${hunterInfo.name}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ ID: ${hunterInfo.id}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Career: ${hunterInfo.type.slice(0, 1).toUpperCase()}${hunterInfo.type.slice(1, hunterInfo.type.length)}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Rank: ${experienceInfo.rank}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Level: ${experienceInfo.level}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Points: ${hunterInfo.points}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Experience: ${experienceInfo.current} / ${experienceInfo.next}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Guild: ${hunterInfo.guild || 'None'}`, RightStartFill, RightHeightStart += nextHeight);
    ctx.fillText(`☆ Auto Training: ${hunter.autoTraining('check') ? 'Enable' : 'Disable'}`, RightStartFill, RightHeightStart += nextHeight);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);

    return pathImg;
}

module.exports.run = async function ({ api, event, args, Users, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const Hunter = require('./hunter/src/Hunter.js');
    const Experience = require('./hunter/src/Experience.js');
    const Dungeon = require('./hunter/src/Dungeon.js');
    const Guild = require('./hunter/src/Guild.js');
    const Team = require('./hunter/src/Team.js');
    const fs = require('fs-extra');
    const axios = require("axios");
    const hunter = new Hunter(event.senderID);
    const config = this.config;
    switch (args[0]) {
        case "create":
        case "-c":
            if (hunter.get()) return api.sendMessage("[⚜️] ➜ Bạn đã đăng ký trở thành thợ săn trước đó!", event.threadID);
            else {
                return api.sendMessage("[⚜️] ➜ Bạn sẽ được hoá thân vào các nhân vật, chiến đấu với quái vật và tăng cấp cho bản thân.", event.threadID, () => {
                    return api.sendMessage(
                        "Có 4 loại thợ săn:\n\n" +
                        "1. Kiếm sĩ\n" +
                        "2. Xạ thủ\n" +
                        "3. Pháp sư\n" +
                        "4. Mục sư\n\n" +
                        "[⚜️] ➜ Bạn muốn đăng ký trở thành thợ săn nào?\nReply theo số tương ứng.",
                        event.threadID, (e, r) => {
                            return global.client.handleReply.push({
                                name: config.name,
                                messageID: r.messageID,
                                author: event.senderID,
                                type: "hunter_create"
                            })
                        });
                }, event.messageID);
            }
            break;
        case "info":
        case "-i":
            if (hunter.get()) {
                var experience = new Experience(event.senderID);
                var pathImg = await this.createHunterCard({ experience, hunter });
                return api.sendMessage({
                    attachment: fs.createReadStream(pathImg),
                }, event.threadID, () => fs.unlinkSync(pathImg));
            } else return api.sendMessage("[⚜️] ➜ Bạn chưa đăng ký trở thành thợ săn!", event.threadID);
            break;
        case "delete":
            hunter.delete();
            return api.sendMessage("[⚜️] ➜ Bạn đã hủy đăng ký trở thành thợ săn!", event.threadID);
            break;
        case "autotraining":
        case "-at":
            if (hunter.get()) {
                switch (args[1]) {
                    case "on":
                        hunter.autoTraining(true);
                        return api.sendMessage("[⚜️] ➜ Bạn đã bật chế độ tự động luyện tập khi afk với 10 exp / 1 phút!", event.threadID, event.messageID);
                        break;
                    case "off":
                        hunter.autoTraining(false);
                        return api.sendMessage("[⚜️] ➜ Bạn đã tắt chế độ tự động luyện tập khi afk!", event.threadID, event.messageID);
                        break;
                    default:
                        return api.sendMessage("[⚜️] ➜ Bạn cần chọn on hoặc off!", event.threadID, event.messageID);
                        break;
                }
            } else return api.sendMessage("[⚜️] ➜ Bạn chưa đăng ký trở thành thợ săn!", event.threadID, event.messageID);
            break;
        case "dungeon":
        case "-d":
            if (hunter.get()) {
                var experience = new Experience(event.senderID);
                var msg = '';
                var dungeons = Dungeon.getRandomDungeons(experience.info().level);
                msg += `‎\t★ Dungeons ★\n\n`;
                for (const i in dungeons) {
                    msg += `${parseInt(i) + 1}. ${dungeons[i].address}\n`;
                    msg += `    ● Required Level: ${dungeons[i].requiredLevel}\n`;
                    msg += `    ● Required Team: ${dungeons[i].requiredTeam ? "Yes" : "No"}\n\n`;
                };
                msg += `[⚜️] ➜ Reply số tầng dungeon để tham gia`;
                return api.sendMessage(msg, event.threadID, (e, r) => {
                    return global.client.handleReply.push({
                        name: config.name,
                        messageID: r.messageID,
                        author: event.senderID,
                        type: "hunter_dungeon",
                        data: dungeons
                    })
                }, event.messageID);
            } else return api.sendMessage("[⚜️] ➜ Bạn chưa đăng ký trở thành thợ săn!", event.threadID);
            break;
        case "team":
        case "-t":
            //TODO add team
            if (hunter.get()) {
                var msg = '';
                var hunterInfo = hunter.get();
                var experienceInfo = new Experience(event.senderID).info();
                var team = new Team();
            } else return api.sendMessage("[⚜️] ➜ Bạn chưa đăng ký trở thành thợ săn!", event.threadID);
            break;
        case "changetype":
        case "-ct":
            if (hunter.get()) {
                var allHunters = ["gladiator", "archer", "magican", "healer"];
                if (allHunters.includes(args[1])) {
                    var a = hunter.update({ type: args[1] });
                    return api.sendMessage(`${a == true ? "done" : "fail"}`, event.threadID);
                } else return api.sendMessage("[⚜️] ➜ Bạn cần chọn 1 trong các loại thợ săn sau: " + allHunters.join(", "), event.threadID);
            } else return api.sendMessage("[⚜️] ➜ Bạn chưa đăng ký trở thành thợ săn!", event.threadID);
        default: { 
            const fs = require('fs-extra');
	const img1 = ["https://i.imgur.com/ZdtdFnA.jpg"]
	var path1 = __dirname + "/noprefix/hunter.jpg"
	var rdimg1 = img1[Math.floor(Math.random() * img1.length)]; 
	const imgP1 = []
	let dowloadIMG1 = (await axios.get(rdimg1, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path1, Buffer.from(dowloadIMG1, "utf-8") );
	imgP1.push(fs.createReadStream(path1))
  var msg1 = '===== [ HUNTER ] =====\n\n➜ create/-c: Để đăng kí người mới\n➜ delete: Hủy đăng ký\n➜ info/-i: Xem thông tin nhân vật \n➜ autotraining/-at: Tự động luyện tập khi AFK\n➜ dungeon/-d: Tham gia đánh phó bản Dungeon\n➜ team/-t: Đăng ký team guild\n➜ changetype/-ct: Đăng ký trở thành thợ săn\n➜ top: Xem top level trên server'
	var msgg1 = {body: msg1, attachment: imgP1}   
            return api.sendMessage(msgg1, threadID, messageID)
        };
    }
}
module.exports.handleReply = async function ({ api, event, client, handleReply, Currencies }) {
    const Hunter = require('./hunter/src/Hunter.js');
    const Experience = require('./hunter/src/Experience.js');
    const generateName = require('japanese-name-generator')
    var { name: randomName } = generateName({ gender: 'female' })

    const axios = require('axios');
    const fs = require('fs-extra');
    const config = this.config;
    switch (handleReply.type) {
        case "hunter_create":
            var allHunters = ["gladiator", "archer", "magican", "healer"];
            var hunter = handleReply.hunter;
            var body = event.body;
            console.log(body);
            if (!isNaN(body) && body <= allHunters.length && body > 0) {
                var hunterType = allHunters[body - 1];
                return api.sendMessage(
                    "[⚜️] ➜ Bạn hãy đặt tên cho thợ săn giả tưởng.\n\n" +
                    "[⚜️] ➜ Reply 0 để sử dụng tên ngẫu nhiên: " + randomName + "\n" +
                    "[⚜️] ➜ Hoặc reply tên của bạn (có phân biệt chữ hoa)",
                    event.threadID, (e, r) => {
                        return global.client.handleReply.push({
                            name: config.name,
                            messageID: r.messageID,
                            author: event.senderID,
                            type: "hunter_create_name",
                            defaultName: randomName,
                            hunter: hunter,
                            hunterType: hunterType
                        });
                    }, event.messageID);
            } else {
                return api.sendMessage("[⚜️] ➜ Bạn đã nhập sai số, vui lòng nhập lại!", event.threadID);
            }
            break;
        case "hunter_create_name":
            var allSkills = require('./hunter/data/defaultData.json').skills;
            var hunter = new Hunter(event.senderID);
            var hunterType = handleReply.hunterType;
            var body = event.body == "0" ? handleReply.defaultName : event.body;
            return api.sendMessage("[⚜️] ➜ Đã thiết lập tên " + body + " cho thợ săn.", event.threadID, () => {
                hunter.create(hunterType, body);
                var skillsForHunter = allSkills[hunterType];
                var skills = [];
                var msg = '';
                for (var skill in skillsForHunter) {
                    let type = skillsForHunter[skill].type;
                    if (skills.map(e => e.type).indexOf(type) == -1) {
                        skillsForHunter[skill].skillType = 'normal';
                        skills.push({
                            type: type,
                            skills: [skillsForHunter[skill]]
                        });
                    } else {
                        skillsForHunter[skill].skillType = 'ultimate';
                        skills[skills.map(e => e.type).indexOf(type)].skills.push(skillsForHunter[skill]);
                    }
                }
                for (var i in skills) {
                    msg += `${parseInt(i) + 1}. ${skills[i].type.toUpperCase()}\n`;
                    for (var j in skills[i].skills) {
                        msg += `${['★ Normal - ', '☆ Ultimate - '][j]} ${skills[i].skills[j].name}: ${skills[i].skills[j].description.replace(/{name}/g, body)}\n`;
                    }
                    msg += "\n";
                }
                return api.sendMessage("[⚜️] ➜ Hãy chọn một bộ kỹ năng cho thợ săn:\n\n" + msg, event.threadID, (e, r) => {
                    return global.client.handleReply.push({
                        name: config.name,
                        messageID: r.messageID,
                        type: "hunter_create_skill",
                        author: event.senderID,
                        skills: skills,
                    });
                });
            }, event.messageID);
            break;
        case "hunter_create_skill":
            var hunter = new Hunter(event.senderID);
            var experience = new Experience(event.senderID);
            var body = event.body;
            var allSkills = handleReply.skills;
            if (!isNaN(body) && body <= allSkills.length && body > 0) {
                hunter.update({ skills: allSkills[body - 1].skills });
                api.sendMessage('[⚜️] ➜ Đã thiết lập kỹ năng thành công!\n[⚜️] ➜ Vui lòng đợi khởi tạo bảng thông tin.', event.threadID, event.messageID);
                var pathImg = await this.createHunterCard({ experience, hunter });
                return api.sendMessage({
                    attachment: fs.createReadStream(pathImg),
                }, event.threadID, () => fs.unlinkSync(pathImg));
            } else {
                return api.sendMessage("[⚜️] ➜ Bạn đã nhập sai số, vui lòng nhập lại!", event.threadID);
            }
            break;
        case "hunter_dungeon":
            var hunter = new Hunter(event.senderID);
            var experience = new Experience(event.senderID);

            var hunterInfo = hunter.get();
            var dungeonData = handleReply.data;
            var body = event.body;
            if (!isNaN(body) && body <= dungeonData.length && body > 0) {
                if (dungeonData[body - 1].requiredLevel <= experience.info().level) {
                    if (dungeonData[body - 1].requiredTeam) {
                        if (!hunterInfo.team) {
                            return api.sendMessage('[⚜️] ➜ Dungeon này yêu cầu thợ săn có team, vui lòng tạo team trước khi tham gia!', event.threadID, event.messageID);
                        } else {
                            if (hunterInfo.team.members >= 2) {
                                return api.sendMessage('[⚜️] ➜ Đã xác nhận tham gia dungeon!', event.threadID, event.messageID);
                            }
                        }
                    }
                } else {
                    return api.sendMessage('[⚜️] ➜ Bạn chưa đạt đủ level để tham gia dungeon này!', event.threadID, event.messageID);
                }
            }
    }
}