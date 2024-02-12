const fs = require('fs-extra');
const path = require('path');

module.exports = class Hunter {
    constructor(id) {
        this.id = id;
        this.defaultData = require('../data/defaultData.json');
        this.allHunters = require('../data/hunters.json');
        this.hunter = this.allHunters[id];
    }

    get() {
        return this.hunter || false;
    }
    create(type = "gladiator", name = null) {
        if (this.get()) return false;
        this.hunter = {
            id: this.id,
            type: type,
            name: name,
            points_used: 0,
            ...this.defaultData.defaultHunter[type]
        }
        this.allHunters[this.id] = this.hunter;
        return this.save(this.hunter);
    }
    update(data = {}) {
        if (!this.get()) return false;
        Object.keys(data).forEach(key => {
            this.hunter[key] = data[key];
        });
        return this.save(this.hunter);
    }
    delete() {
        if (!this.get()) return false;
        delete this.allHunters[this.id];
        return this.save();
    }
    save(data = true) {
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'hunters.json'), JSON.stringify(this.allHunters, null, 4));
        return data;
    }
    updatePoints() {
        if (!this.get()) return false;
        this.hunter.points = Math.floor((Math.sqrt(1 + (4 * this.hunter.exp) / 500) + 1) / 2) * 10 - this.hunter.points_used;
        return this.save(this.hunter);
    }
    autoTraining(boolean) {
        if (!this.get()) return false;
        if (typeof boolean === 'undefined') {
            if (!this.hunter.auto_traning) return false;
            var offlineTime = Date.now() - this.hunter.auto_traning.offline_time;
            var times = Math.floor(offlineTime / (this.hunter.auto_traning.time_to_increase * 1000));
            var increase = times * Math.floor((Math.sqrt(1 + (4 * this.hunter.exp) / 500) + 1) / 2) * 2;
            this.hunter.exp += increase;
            this.hunter.auto_traning.offline_time = Date.now();
            return this.save(this.hunter);
        }
        else if (boolean === 'check') {
            if (!this.hunter.auto_traning) return false;
            if (!this.hunter.auto_traning.straw_man) return false;
            else return true;
        }
        else {
            this.hunter.auto_traning = {
                straw_man: boolean,
                time_to_increase: 60, //? seconds
                offline_time: boolean ? Date.now() : null
            }
            return this.save({ enable: boolean });
        }
    }
}