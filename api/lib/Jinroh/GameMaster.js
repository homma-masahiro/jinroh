import shuffle from 'shuffle-array';

import Villager   from './Actor/Villager';
import Knight     from './Actor/Knight';
import Prophet    from './Actor/Prophet';
import Sherman    from './Actor/Sherman';
import Madman     from './Actor/Madman';
import Werewolf   from './Actor/Werewolf';
import {Constant} from './Constant';

export default class GameMaster {

  constructor() {
    this.isPlayning      = false;
    this.castsAllcation  = {};
    this.participants    = [];
    this.casts           = {};
    this.lastDeadByVote  = undefined;
  }

  // {actor: XXXX, count: X}
  initCastsAllocation(castsAllcation) {
    this.castsAllcation = castsAllcation;
  }

  addParicipant(id) {
    this.participants.push(id);
  }

  allocateCasts() {
    // shuffle(this.participants);
    for (let actor_name in this.castsAllcation) {
      for (let i = 0; i < this.castsAllcation[actor_name]; i++) {
        let id = this.participants.shift();
        switch (actor_name) {
          case Constant.ACTOR.VILLAGER:
            this.casts[id] = new Villager(id);
            break;
          case Constant.ACTOR.KNIGHT:
            this.casts[id] = new Knight(id);
            break;
          case Constant.ACTOR.PROPHET:
            this.casts[id] = new Prophet(id);
            break;
          case Constant.ACTOR.SHERMAN:
            this.casts[id] = new Sherman(id);
            break;
          case Constant.ACTOR.MADMAN:
            this.casts[id] = new Madman(id);
            break;
          case Constant.ACTOR.WEREWOLF:
            this.casts[id] = new Werewolf(id);
            break;
        }
      }
    }
  }

  getActors() {
    return Object.keys(this.casts).map(id => this.casts[id]);
  }

  getActionedAll() {
    return this.getActors().filter(actor => actor.isActioned);
  }

  getActionedWerewolf() {
    return this.getActionedAll().filter(actor => actor.team_name === Constant.TEAM.WEREWOLF);
  }

  getActionedHuman() {
    return this.getActionedAll().filter(actor => actor.team_name === Constant.TEAM.HUMAN);
  }

  getAliveAll() {
    return this.getActors().filter(actor => actor.isAlive);
  }

  getAliveWerewolf() {
    return this.getAliveAll().filter(actor => actor.team_name === Constant.TEAM.WEREWOLF);
  }

  getAliveHuman() {
    return this.getAliveAll().filter(actor => actor.team_name === Constant.TEAM.HUMAN);
  }

  initNightActionStatus() {
    this.getAliveAll().forEach(actor => {
      actor.isSuspicious = false;
      actor.isProtected  = false;
      actor.isAttaced    = false;
      actor.isActioned   = false;
    });
  }

  initWerewolfNightActionStatus() {
    this.getAliveWerewolf().forEach(actorOfWerewolf => {
      actorOfWerewolf.targetId   = undefined,
      actorOfWerewolf.isActioned = false
    });
  }

  initNoonActionStatus() {
    this.getAliveAll().forEach(actor => {
      actor.isVoted = false;
    });
  }

  isAllActioned() {
    return this.getAliveAll().length === this.getActionedAll().length;
  }

  matchAllAtackCandidates() {
    let actorsOfWerewolf = this.getAliveWerewolf();
    let matchAllAtackCandidates = actorsOfWerewolf
      .reduce((a, b) => a.targetId === b.targetId);

    if (matchAllAtackCandidates)
      return { status: Constant.STATUS_CODE.SUCCESS.MATCH_ALL_ATACK_CANDIDATES };
    else
      return {
        status: Constant.STATUS_CODE.FAILURE.UNMATCH_ALL_ATACK_CANDIDATES,
        body: actorsOfWerewolf.map(actorOfWerewolf => { return { proposerId: actorOfWerewolf.id, targetId: actorOfWerewolf.targetId } })
      };
  }

  nightAction(id, targetId) {
    return this.casts[id].nightAction(this, targetId);
  }

  noonAction(id, targetId) {
    return this.casts[id].noonAction(this, targetId);
  }

  nightProcessWerewolf() {
    if (this.getActionedWerewolf().length !== this.getAliveWerewolf().length)
      return { status: Constant.STATUS_CODE.FAILURE.NOT_COMPLETED_ACTION_WEREWOLF };

    return this.matchAllAtackCandidates();
  }

  nightProcess() {
    for (let id in this.casts) {
      let cast = this.casts[id];
      if (!cast.isAlive) continue;
      cast.isAlive = cast.isProtected || !cast.isAttaced;
      if (!cast.isAlive) {
        this.lastDeadByVote = cast;
        return { status: Constant.STATUS_CODE.SUCCESS.ATACKED, body: cast.id };
      }
    }
    this.lastDeadByVote = undefined;
    return { status: Constant.STATUS_CODE.SUCCESS.PROTECTED };
  }
}
