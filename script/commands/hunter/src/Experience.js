const Hunter = require('./Hunter');

module.exports = class Experience extends Hunter {
    constructor(id) {
        super(id);
        this.hunter = this.get();
        this.ranksData = ["Super Ultra Pro Vip Luxury Real God", "Real God", "Half God", "God", "SSS", "SS", "S", "A", "B", "C", "D", "E", "F"].reverse();
        this.scoreData = [Number.MAX_SAFE_INTEGER, 1000, 500, 300, 200, 150, 120, 100, 80, 60, 40, 20, 10].reverse();
    }
    getRank(score) {
        for (var i in this.scoreData) {
            if (this.scoreData[i] >= score) {
                return this.ranksData[i];
            }
        }
        return null;
    }
    rankToLevel(rank) {
        for (var i in this.ranksData) {
            if (this.ranksData[i] === rank) {
                return this.scoreData[i];
            }
        }
        return null;
    }
    expToLevel(point) {
        if (point < 0) return 0;
        return Math.floor((Math.sqrt(1 + (4 * point) / 500) + 1) / 2);
    }
    levelToExp(level) {
        if (level <= 0) return 0;
        return 500 * level * (level - 1);
    }
    info() {
        const point = this.hunter.exp;
        const level = this.expToLevel(point);
        const current = point - this.levelToExp(level);
        const next = this.levelToExp(level + 1) - this.levelToExp(level);
        const rank = this.getRank(level);
        return {
            level,
            current,
            next,
            rank,
        }
    }
}