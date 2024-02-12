const fs = require('fs-extra');
const path = require('path');

module.exports = class Team {
    constructor(id) {
        this.allTeams = require('../data/teams.json');
        this.team = this.allTeams[id];
    }

    get() {
        return this.team || false;
    }

    create() {
        if (!this.get()) {
            this.team = {
                id: this.id,
                members: []
            }
            this.allTeams[this.id] = this.team;
            return this.save();
        }
        return false;
    }

    save(data = true) {
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'teams.json'), JSON.stringify(this.allTeams, null, 4));
        return data;
    }

    addMember(id) {
        if (!this.get()) return false;
        if (this.team.members.includes(id)) return false;
        this.team.members.push(id);
        return this.save();
    }
}