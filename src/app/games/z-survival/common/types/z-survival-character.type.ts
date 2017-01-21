export class ZSurvivalEffect {
  public id: string;
  public field: string;
  public value: number;
  public type: string;
  constructor(id, field, value, type){
    this.id = id;
    this.field = field;
    this.value = value;
    this.type = type;
  }
}

export class ZSurvivalTalent {
  public id: string;
  public name: string;
  public description: string;
  public effect: [ZSurvivalEffect];
  constructor(id, name, description, effects) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.effect = effects;
  }
}

export class ZSurvivalSkill {
  name: string;
  description: string;
  requiredLv: number;
  requiredSkill: [ZSurvivalSkill];  // skill id
  effect: [ZSurvivalEffect];  // effect id

  constructor(name: string, description: string, requiredLv: number, requiredSkill: [ZSurvivalSkill], effect: [ZSurvivalEffect]) {
    this.name = name;
    this.description = description;
    this.requiredLv = requiredLv;
    this.requiredSkill = requiredSkill;
    this.effect = effect;
  }
}

export class ZSurvivalAttributes {
  public id: string;
  public strength: number;
  public perception: number;
  public endurance: number;
  public charisma: number;
  public intelligence: number;
  public agility: number;
  public luck: number;

  constructor(id: string, s: number, p: number, e: number, c: number, i: number, a: number ,l: number) {
    this.id = id;
    this.strength = s;
    this.perception = p;
    this.endurance = e;
    this.charisma = c;
    this.intelligence = i;
    this.agility = a;
    this.luck = l;
  }
}

export class ZSurvivalOldjob {
  public id: string;
  public name: string;
  public description: string;
  public talent: [ZSurvivalTalent];
  public attributes: ZSurvivalAttributes;

}


export class ZSurvivalCharacter {
  private _name: string;        // Name
  private _id: string;          // Id
  private _sex: string;         // Sex


  private _cur_hp: number;      // Dead if becomes 0
  private _max_hp: number;      // max hp
  private _cur_ap: number;      // Actions in combat needs action points
  private _max_ap: number;      // max ap
  private _weight: number;      // weight currently carrying
  private _max_weight: number;  // max weight that can carry
  private _stamina: number;     // Actions out of combat need stamina. could below 0. when below 0, efficency is reduced, and need to take extra sleep to recover. items would still work the same on stamina.
  private _max_stamina: number; // max stamina = 800 + end * 100;
  private _skillpoint: number;  // use to lv up skill levels
  private _exp: number;         // get exp from combat and many other actions
  private _lv: number;          // current lv
  private _dodge_rate: number;  // 0-100, basic chance to dodge an attack. need to add lv difference with this. Dodge = agi*3% + (playerLV - enemyLv) * 1%
  private _hit_rate: number;    // 0-100, basic chance to hit a target. need to add lv difference with this. Hit Rate = 50 + pec*5 + (characterLv - enemyLv)*5
  private _crt_rate: number;    // critical hit rate 0 - 100
  private _crt_dmg: number;     // critical damage rate, basic is 50 for additional 50% of damage when critical hit happens
  private _hunger: number;      // 0-200. start to lose hp when hit 100. Die when it hit 200
  private _thirst: number;      // 0-200. start to lose hp when hit 100. Die when it hit 200
  private _health: number;      // 0-200. start to lose hp when hit 100. Die when it hit 200

  private _melee_dmg: number;   // number that affect melee damage. Need to calculate with weapons to figure out final number
  private _range_dmg: number;
  private _energy_dmg: number;

  private _persuade_rate: number; // 0-100. need to add NPC's lv difference. persuadeRate = 50 + char*5 - ToughLevel*10;

  private _food_need: number = 1;    // increase x unit of hunger per hour
  private _water_need: number = 1;   // increase x unit of thirst per hour
  private _rest_rate: number;    // restore 100 + end*10 unit of stamina per hour.
  private _recover_rate: number; // reduce x unit of sick per hour

  // resistance:
  private _fire_resist: number = 0;  // 0-100 percentage
  private _cold_resist: number = 0;
  private _energy_resist: number = 0;
  private _poison_resist: number = 0;
  private _radiation_resist: number = 0;

  // Timers for percentage effect:
  private _max_hp_timer: number = 1;
  private _max_ap_timer: number = 1;
  private _max_weight_timer: number = 1;
  private _max_stamina_timer: number = 1;
  private _skillpoint_timer: number = 1;
  private _exp_timer: number = 1;
  private _dodge_rate_timer: number = 1;
  private _hit_rate_timer: number = 1;
  private _crt_rate_timer: number = 1;
  private _crt_dmg_timer: number = 1;
  private _food_need_timer: number = 1;
  private _water_need_timer: number = 1;
  private _rest_rate_timer: number = 1;
  private _recover_rate_timer: number = 1;
  private _melee_dmg_timer: number = 1;
  private _range_dmg_timer: number = 1;
  private _energy_dmg_timer: number = 1;
  private _persuade_rate_timer: number = 1;

  // Status after timer:
  private _max_hp_timed: number;
  private _max_ap_timed: number;
  private _max_weight_timed: number;
  private _max_stamina_timed: number;
  private _dodge_rate_timed: number;
  private _hit_rate_timed: number;
  private _crt_rate_timed: number;
  private _crt_dmg_timed: number;
  private _food_need_timed: number;
  private _water_need_timed: number;
  private _rest_rate_timed: number;
  private _recover_rate_timed: number;
  private _melee_dmg_timed: number;
  private _range_dmg_timed: number;
  private _energy_dmg_timed: number;
  private _persuade_rate_timed: number;

  private _attributes: ZSurvivalAttributes;
  private _job: ZSurvivalOldjob;
  private _talent: ZSurvivalTalent[];
  private _skill: ZSurvivalSkill[];
  private _status: any;

  constructor(
    id: string, name: string, sex: string,
    job: ZSurvivalOldjob, talent: [ZSurvivalTalent],
    skill: [ZSurvivalSkill], attributes: ZSurvivalAttributes, status: any
  ) {
    this._name = name; this._id = id; this._sex = sex;
    this._job = job; this._talent = talent;
    this._skill = skill; this._attributes = attributes; this._status = status;
  }

  calculateCharacterStatus() {
    this._max_hp = 25 + this._attributes.endurance * 5;
    this._max_ap = 25 + this._attributes.agility * 5;
    this._max_weight = 20 + this._attributes.strength*10;
    this._max_stamina = 800 + this._attributes.endurance * 100;
    this._dodge_rate = this._attributes.agility*3;
    this._hit_rate = 50 + this._attributes.perception*5;
    this._crt_rate = 10 + this._attributes.luck * 5;
    this._crt_dmg = 1.5 + this._attributes.luck * 0.1;
    this._melee_dmg = 1 + this._attributes.strength*0.1;
    this._range_dmg = 1 + this._attributes.perception*0.1;
    this._energy_dmg = 1 + this._attributes.intelligence*0.1;
    this._persuade_rate = 40 + this._attributes.charisma*5;
    this._rest_rate = 100 + this._attributes.endurance*10;
    this._recover_rate = 1 + this._attributes.endurance*0.1;

    this._max_hp_timed = this._max_hp * this._max_hp_timer;
    this._max_ap_timed = this._max_ap * this._max_ap_timer;
    this._max_stamina_timed = this._max_stamina * this._max_stamina_timer;
    this._dodge_rate_timed = this._dodge_rate * this._dodge_rate_timer;
    this._hit_rate_timed = this._hit_rate * this._hit_rate_timer;
    this._crt_rate_timed = this._crt_rate * this._crt_rate_timer;
    this._crt_dmg_timed = this._crt_dmg * this._crt_dmg_timer;
    this._food_need_timed = this._food_need * this._food_need_timer;
    this._water_need_timed = this._water_need * this._water_need_timer;
    this._rest_rate_timed = this._rest_rate * this._rest_rate_timer;
    this._recover_rate_timed = this._recover_rate * this._recover_rate_timer;
    this._melee_dmg_timed = this._melee_dmg * this._melee_dmg_timer;
    this._range_dmg_timed = this._range_dmg * this._range_dmg_timer;
    this._energy_dmg_timed = this._energy_dmg * this._energy_dmg_timer;
    this._persuade_rate_timed = this._persuade_rate * this._persuade_rate_timer;
  }

  // =============================== Accessors: ===============================
  get name():string { return this._name; }
  get id():string { return this._id; }
  get attributes():ZSurvivalAttributes { return this._attributes; }
  get job():ZSurvivalOldjob { return this._job; }
  get talent():ZSurvivalTalent[] { return this._talent; } set talent(d) { this._talent = d; }
  get skill():ZSurvivalSkill[] { return this._skill; } set skill(d) { this._skill = d; }
  get skillpoint():number { return this._skillpoint; } set skillpoint(d) { this._skillpoint = d; }
  get exp():number { return this._exp; } set exp(d) { this._exp = d; }
  get lv():number { return this._lv; } set lv(d) { this._lv = d; }
  get hunger():number { return this._hunger; } set hunger(d) { this._hunger = d; }
  get thirst():number { return this._thirst; } set thirst(d) { this._thirst = d; }
  get health():number { return this._health; } set health(d) { this._health = d; }
  get cur_hp():number { return this._cur_hp; } set cur_hp(d) { this._cur_hp = d; }
  get cur_ap():number { return this._cur_ap; } set cur_ap(d) { this._cur_ap = d; }
  get weight():number { return this._weight; } set weight(d) { this._weight = d; }
  get stamina():number { return this._stamina; } set stamina(d) { this._stamina = d; }

  get hp_timer():number { return this._max_hp_timer; } set hp_timer(d) { this._max_hp_timer = d; }
  get ap_timer():number { return this._max_ap_timer; } set ap_timer(d) { this._max_ap_timer = d; }
  get weight_timer():number { return this._max_weight_timer; } set weight_timer(d) { this._max_weight_timer = d; }
  get stamina_timer():number { return this._max_stamina_timer; } set stamina_timer(d) { this._max_stamina_timer = d; }
  get skillpoint_timer():number { return this._skillpoint_timer; } set skillpoint_timer(d) { this._skillpoint_timer = d; }
  get exp_timer():number { return this._exp_timer; } set exp_timer(d) { this._exp_timer = d; }
  get dodge_rate_timer():number { return this._dodge_rate_timer; } set dodge_rate_timer(d) { this._dodge_rate_timer = d; }
  get hit_rate_timer():number { return this._hit_rate_timer; } set hit_rate_timer(d) { this._hit_rate_timer = d; }
  get crt_rate_timer():number { return this._crt_rate_timer; } set crt_rate_timer(d) { this._crt_rate_timer = d; }
  get crt_dmg_timer():number { return this._crt_dmg_timer; } set crt_dmg_timer(d) { this._crt_dmg_timer = d; }
  get food_need_timer():number { return this._food_need_timer; } set food_need_timer(d) { this._food_need_timer = d; }
  get water_need_timer():number { return this._water_need_timer; } set water_need_timer(d) { this._water_need_timer = d; }
  get rest_rate_timer():number { return this._rest_rate_timer; } set rest_rate_timer(d) { this._rest_rate_timer = d; }
  get recover_rate_timer():number { return this._recover_rate_timer; } set recover_rate_timer(d) { this._recover_rate_timer = d; }
  get melee_dmg_timer():number { return this._melee_dmg_timer; } set melee_dmg_timer(d) { this._melee_dmg_timer = d; }
  get range_dmg_timer():number { return this._range_dmg_timer; } set range_dmg_timer(d) { this._range_dmg_timer = d; }
  get energy_dmg_timer():number { return this._energy_dmg_timer; } set energy_dmg_timer(d) { this._energy_dmg_timer = d; }
  get persuade_rate_timer():number { return this._persuade_rate_timer; } set persuade_rate_timer(d) { this._persuade_rate_timer = d; }

  get fire_resist():number { return this._fire_resist; } set fire_resist(d) { this._fire_resist = d; }
  get cold_resist():number { return this._cold_resist; } set cold_resist(d) { this._cold_resist = d; }
  get energy_resist():number { return this._energy_resist; } set energy_resist(d) { this._energy_resist = d; }
  get poison_resist():number { return this._poison_resist; } set poison_resist(d) { this._poison_resist = d; }
  get radiation_resist():number { return this._radiation_resist; } set radiation_resist(d) { this._radiation_resist = d; }

  get max_ap():number { return this._max_ap_timed; }
  get max_hp():number { return this._max_hp_timed; }
  get max_weight():number { return this._max_weight_timed; }
  get max_stamina():number { return this._max_stamina_timed; }
  get dodge_rate():number { return this._dodge_rate_timed; }
  get hit_rate():number { return this._hit_rate_timed; }
  get crt_rate():number { return this._crt_rate_timed; }
  get crt_dmg():number { return this._crt_dmg_timed; }
  get food_need():number { return this._food_need_timed; }
  get water_need():number { return this._water_need_timed; }
  get rest_rate():number { return this._rest_rate_timed; }
  get recover_rate():number { return this._recover_rate_timed; }
  get melee_dmg():number { return this._melee_dmg_timed; }
  get range_dmg():number { return this._range_dmg_timed; }
  get energy_dmg():number { return this._energy_dmg_timed; }
  get persuade_rate():number { return this._persuade_rate_timed; }
}


export class CharacterStatus {
  public id: string;
  public created: string;
  public name: string;
  public sex: string;
  public oldJob: any;
  public talent: Array<any>;
  public skill: Array<any>;
  public status: any;
  public attributes: any;
  public owner: string;
}
