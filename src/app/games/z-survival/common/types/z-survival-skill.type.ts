export class ZSurvivalSkill {
  id: string;
  name: string;
  description: string;
  requireSpecial: number[];
  requireLv: number;
  requireSkill: string[];  // skill id
  requireJob: string[];  // job id

  constructor(id: string, name: string, description: string, special: number[], lv: number, preSkill: string[], job: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.requireSpecial = special;
    this.requireLv = lv;
    this.requireSkill = preSkill;
    this.requireJob = job;
  }
}
