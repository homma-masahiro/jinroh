import Actor      from './Actor';
import {Constant} from '../Constant';

export default class Madman extends Actor {

  constructor(id) {
    super(id);
    this.actor_name = '狂人';
    this.team_name  = '人間';
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
    return false;
  }

  nightAction(gameMaseter, targetId) {
    let targetCast = gameMaseter.casts[targetId];

    let validateRes = this.validatetNightAction(targetCast);
    if (validateRes) return validateRes;

    targetCast.isSuspicious = true;
    this.isActioned         = true;

    return { status: Constant.STATUS_CODE.SUCCESS.BASIC };
  }

}
