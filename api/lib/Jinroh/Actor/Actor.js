import {Constant} from '../Constant';

export default class Actor {

  constructor(id) {
    this.id           = id;
    this.isAlive      = true;
    this.isSuspicious = false;
    this.isVoted      = false;
    this.isProtected  = false;
    this.isAttaced    = false;
    this.isActioned   = false;
  }

  validateNightAction(targetCast) {
    return "それぞれの役で定義してください。";
  }

  validateNoonAction(targetCast) {
    if (!this.isAlive)
      return { status: Constant.STATUS_CODE.FAILURE.CAST_NOT_ALIVE };
    if (targetCast === undefined)
      return { status: Constant.STATUS_CODE.FAILURE.TARGET_NOT_FOUND };
    if (!targetCast.isAlive)
      return { status: Constant.STATUS_CODE.FAILURE.TARGET_NOT_ALIVE };
    return false;
  }

  nightAction() {
    return "それぞれの役で定義してください。";
  }

  noonAction(gameMaseter, targetId) {
    let targetCast = gameMaseter.casts[targetId];

    let validateRes = this.validateNoonAction(targetCast);
    if (validateRes) return validateRes;

    targetCast.isProtected = true;
    this.isActioned        = true;

    return { status: Constant.STATUS_CODE.SUCCESS.BASIC };
  }

}
