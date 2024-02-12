module.exports = class Dungeon {
    static getAddress() {
        var addresses = require('../data/addresses.json');
        var address = addresses[Math.floor(Math.random() * addresses.length)];
        return address;
    }

    static getRandomDungeons(level = 1) {
        var dungeons = [];
        var lengthDungeons = Math.floor(Math.random() * 4) + 1;
        for (var i = 0; i < lengthDungeons; i++) {
            var dungeon = {};
            dungeon.id = Math.random().toString(36).substring(3);
            dungeon.address = this.getAddress();
            dungeon.requiredLevel = Math.floor(Math.random() * level) + 1;
            if (dungeon.requiredLevel - Math.round(level / 4) > Math.round(level / 2)) {
                dungeon.requiredTeam = true;
            } else dungeon.requiredTeam = false;
            dungeons.push(dungeon);
        }
        return dungeons;
    }

}