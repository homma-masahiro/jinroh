import Actor      from './Actor';
import {Constant} from '../Constant';

export default class Werewolf extends Actor {

  constructor(id) {
    super(id);
    this.actor_name = '人狼';
    this.team_name  = '人狼';
    this.targetId   = undefined;
  }

  validateNightAction(targetCast) {
    if (!this.isAlive)
      return { status: Constant.STATUS_CODE.FAILURE.CAST_NOT_ALIVE };
    if (targetCast === undefined)
      return { status: Constant.STATUS_CODE.FAILURE.TARGET_NOT_FOUND };
    if (!targetCast.isAlive)
      return { status: Constant.STATUS_CODE.FAILURE.TARGET_NOT_ALIVE };
    if (this.id === targetCast.id)
      return { status: Constant.STATUS_CODE.FAILURE.TARGET_IS_SAME_ID };
    if (this.team_name === targetCast.team_name)
      return { status: Constant.STATUS_CODE.FAILURE.TARGET_IS_SAME_TEAM };
    return false;
  }

  nightAction(gameMaseter, targetId) {
    let targetCast = gameMaseter.casts[targetId];

    let validateRes = this.validateNightAction(targetCast);
    if (validateRes) return validateRes;

    this.targetId   = targetId;
    this.isActioned = true;

    return { status: Constant.STATUS_CODE.SUCCESS.BASIC };
  }

}
