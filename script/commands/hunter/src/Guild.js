const fs = require('fs-extra');
const path = require('path');

module.exports = class Guild {
    constructor(id) {
        this.allGuilds = require('../data/guilds.json');
        this.guild = this.allGuilds[id];
    }

    create(name) {
        if (this.guild) return false;
        this.guild = {
            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
            name: name,
            members: []
        };
        this.allGuilds[this.guild.id] = this.guild;
        return this.save();
    }

    get() {
        return this.guild || false;
    }

    update(data = {}) {
        if (!this.guild) return false;
        Object.keys(data).forEach(key => {
            this.guild[key] = data[key];
        });
        return this.save();
    }

    save(data = true) {
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'guilds.json'), JSON.stringify(this.allGuilds, null, 4));
        return data;
    }

}