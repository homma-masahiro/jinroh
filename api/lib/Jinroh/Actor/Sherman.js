import Actor      from './Actor';
import {Constant} from '../Constant';

export default class Sherman extends Actor {

  constructor(id) {
    super(id);
    this.actor_name = '霊媒師';
    this.team_name  = '人間';
  }

  nightAction(gameMaseter) {
    if (!this.isAlive)
      return { status: Constant.STATUS_CODE.FAILURE.CAST_NOT_ALIVE };
    let lastDeadByVote = gameMaseter.lastDeadByVote;
    if (lastDeadByVote === undefined) return { status: Constant.STATUS_CODE.FAILURE.YET_NOT_DEAD };

    this.isActioned = true;

    return { status: Constant.STATUS_CODE.SUCCESS.BASIC, body: lastDeadByVote.team_name };
  }

}
