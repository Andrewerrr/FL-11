const MAX_AGILITY = 100;
const nameSymbol = Symbol('name');
const damageSymbol = Symbol('damage');
const hpTotalSymbol = Symbol('hpTotal');
const hpCurrentSymbol = Symbol('hpCurrent');
const agilitySymbol = Symbol('agility');
const winSymbol = Symbol('win');
const lossSymbol = Symbol('loss');

class Fighter {
    constructor({name, damage, hp, agility}) {
        this[nameSymbol] = name;
        this[damageSymbol] = damage;
        this[hpTotalSymbol] = hp;
        this[hpCurrentSymbol] = this[hpTotalSymbol];
        this[agilitySymbol] = agility;
        this[winSymbol] = 0;
        this[lossSymbol] = 0;
    }

    getName() {
        return this[nameSymbol];
    }

    getDamage() {
        return this[damageSymbol];
    }

    getAgility() {
        return this[agilitySymbol];
    }

    getHealth() {
        return this[hpCurrentSymbol];
    }

    logCombatHistory() {
        console.log(`Name: ${this[nameSymbol]}, Wins: ${this[winSymbol]} Losses: ${this[lossSymbol]}`);
    }

    addWin() {
        this[winSymbol] = this[winSymbol] + 1;
    }

    addLoss() {
        this[lossSymbol] = this[lossSymbol] + 1;
    }

    dealDamage(damage) {
        this[hpCurrentSymbol] = this[hpCurrentSymbol] > damage
            ? this[hpCurrentSymbol] - damage
            : 0;
    }

    heal(hp) {
        this[hpCurrentSymbol] = this[hpCurrentSymbol] + hp > this[hpTotalSymbol]
            ? this[hpTotalSymbol]
            : this[hpCurrentSymbol] + hp;
    }

    attack(defender) {
        if (Math.floor(Math.random() * (MAX_AGILITY + 1)) < MAX_AGILITY - defender.getAgility()) {
            defender.dealDamage(this[damageSymbol]);
            console.log(`${this[nameSymbol]} make ${this[damageSymbol]} damage to ${defender.getName()}`);
            return;
        }

        console.log(`${this[nameSymbol]} attack missed`);
    }
}

function battle(fighter1, fighter2) {
    if (!fighter1.getHealth() || !fighter2.getHealth()){
        console.log('Sorry! But fighter doesn`t have health');
        return;
    }

    while(fighter1.getHealth() && fighter2.getHealth()) {
        fighter1.attack(fighter2);
        if (fighter2.getHealth()) {
            fighter2.attack(fighter1);
        }
    }

    if (fighter1.getHealth()) {
        fighter1.addWin();
        fighter2.addLoss();
        return;
    }

    fighter2.addWin();
    fighter1.addLoss();
}

const fighter1 = new Fighter({name: 'John', damage: 20, agility: 25, hp: 100});
const fighter2 = new Fighter({name: 'Jim', damage: 10, agility: 40, hp: 120});
battle(fighter1, fighter2);
fighter1.getHealth();
fighter2.getHealth();
fighter1.logCombatHistory();
fighter2.logCombatHistory();
