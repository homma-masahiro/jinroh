export const Constant = {
  STATUS_CODE: {
    SUCCESS: {
      BASIC: 200,
      MATCH_ALL_ATACK_CANDIDATES: 201,
      PROTECTED: 202,
      ATACKED: 203
    },
    FAILURE: {
      CAST_NOT_ALIVE: 400,
      TARGET_NOT_FOUND: 401,
      TARGET_NOT_ALIVE: 402,
      TARGET_IS_SAME_ID: 403,
      TARGET_IS_SAME_TEAM: 404,
      YET_NOT_DEAD: 405,
      NOT_COMPLETED_ACTION_WEREWOLF: 406,
      UNMATCH_ALL_ATACK_CANDIDATES: 407
    }
  },
  ACTOR:  {
    VILLAGER: '村人',
    KNIGHT:   '騎士',
    PROPHET:  '預言者',
    SHERMAN:  '霊媒師',
    MADMAN:   '狂人',
    WEREWOLF: '人狼'
  },
  TEAM: {
    HUMAN:    '人間',
    WEREWOLF: '人狼'
  }
}
