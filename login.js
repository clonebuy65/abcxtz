const fs = require("fs-extra");
const login = require("./data/fca-jrt");
const readline = require("readline");
const totp = require("totp-generator");

let configPath = "";
let argv = process.argv.slice(2);
if (argv.length !== 0) configPath = argv[0];
else configPath = "config.json";

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
console.log(`                      ╭╮▒╱▔▔▔▔╲▒╭╮
                      ╰╲╲▏▂╲╱▂▕╱╱╯
                      ▒▒▒▏▇▏▕▇▕▒▒▒
                      ▒▒▒╲▔▕▍▔╱▒▒▒
                      ╭╱╱▒╋╋╋╋▒╲╲╮
                      ╰╯╯▒╲▂▂╱▒╰╰╯

            ███╗░░░███╗██╗██╗░░██╗░█████╗░
            ████╗░████║██║██║░██╔╝██╔══██╗
            ██╔████╔██║██║█████═╝░███████║
            ██║╚██╔╝██║██║██╔═██╗░██╔══██║
            ██║░╚═╝░██║██║██║░╚██╗██║░░██║
            ╚═╝░░░░░╚═╝╚═╝╚═╝░░╚═╝╚═╝░░╚═╝
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
→ Tools Get Appstate - Author: Milo\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n
→ Owner - Moder: Đặng Hoàng Bảo Huy
→ Source Project by kanhhackert1`);
console.log("𓂄𓆩𑁍𓆪𓂁 𝐌𝐢𝐥𝐨 𑁍 𓂄𓆩𑁍𓆪𓂁 ");
console.log("Code by danghoangbaohuy - Mod by Milo")
console.log(" —————————————————————————————————————————————");

const option = {
	logLevel: "silent",
	forceLogin: true,
	userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
};

const config = require(`./${configPath}`);
let email = config.EMAIL;
let password = config.PASSWORD;
let otpkey = config.OTPKEY.replace(/\s+/g, '').toLowerCase();
console.log(" =========ĐANG TIẾN HÀNH LẤY APPSTATE=========");
console.log(" —————————————————————————————————————————————")
login({ email, password }, option, (err, api) => {
	if (err) {
		switch (err.error) {
			case "login-approval":
				if (otpkey) err.continue(totp(otpkey));
				else {
					console.log("> 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 𝐦𝐚̃ 𝐱𝐚́𝐜 𝐦𝐢𝐧𝐡 𝟐 𝐥𝐨̛́𝐩 𝐡𝐨𝐚̣̆𝐜 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐢𝐞̂́𝐭 𝐛𝐢̣ 𝐡𝐨𝐚̣̆𝐜 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐛𝐢̣ 𝐤𝐡𝐨𝐚́ 📝");
					rl.on("line", line => {
						err.continue(line);
						rl.close();
					});
				}
				break;
			default:
			console.error(err);
			process.exit(1);
		}
		return;
	}
	const json = JSON.stringify(api.getAppState());
 fs.writeFileSync(`./${config.APPSTATEPATH}`, json);
	console.log("> 🦖 𝐃𝐚̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐚𝐩𝐩𝐬𝐭𝐚𝐭𝐞 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐚̂̀𝐧 𝐤𝐢𝐰𝐢, 𝐡𝐚̃𝐲 𝐯𝐚̀𝐨 𝐦𝐮̣𝐜 𝐚𝐩𝐩𝐬𝐭𝐚𝐭𝐞 𝐭𝐞̂𝐧 𝐚𝐩𝐩𝐬𝐭𝐚𝐭𝐞.𝐣𝐬𝐨𝐧 đ𝐞̂̉ 𝐬𝐚𝐨 𝐜𝐡𝐞́𝐩 📑");
	process.exit(0);
});
