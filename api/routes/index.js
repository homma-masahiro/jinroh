import express from 'express';
import GameMaster from '../lib/Jinroh/GameMaster';
import {Constant} from '../lib/Jinroh/Constant';

let router      = express.Router();
let global      = express();
let gameMaseter;
function main() {
  let res = {};
  gameMaseter = new GameMaster();
  gameMaseter.initCastsAllocation({
    [Constant.ACTOR.VILLAGER]: 3,
    [Constant.ACTOR.KNIGHT  ]: 1,
    [Constant.ACTOR.PROPHET ]: 1,
    [Constant.ACTOR.SHERMAN ]: 1,
    [Constant.ACTOR.WEREWOLF]: 2
  });

  gameMaseter.addParicipant('1');
  gameMaseter.addParicipant('2');
  gameMaseter.addParicipant('3');
  gameMaseter.addParicipant('4');
  gameMaseter.addParicipant('5');
  gameMaseter.addParicipant('6');
  gameMaseter.addParicipant('7');
  gameMaseter.addParicipant('8');

  gameMaseter.allocateCasts();

  Object.assign(res, gameMaseter.casts);
  return res;
}

function night1() {
  let res = [];
  res.push(gameMaseter.nightAction('1', '2'));
  res.push(gameMaseter.nightAction('2', '1'));
  res.push(gameMaseter.nightAction('3', '1'));
  res.push(gameMaseter.nightAction('4', '1'));
  res.push(gameMaseter.nightAction('5', '1'));
  res.push(gameMaseter.nightAction('6', '1'));
  res.push(gameMaseter.nightAction('7', '2'));
  res.push(gameMaseter.nightAction('8', '2'));
  return res;
}

function begin(req, res, next) {
  res.contentType('application/json');
  next();
};

function end(req, res) {
  res.send(JSON.stringify(global.get('obj')));
};

router.get('/', (req, res, next) => res.render('index'));

router.get('/init', begin, async (req, res, next) => {
  let jinrohRes = main();
  // jinrohRes.night1 = night1();

  global.set('obj', jinrohRes);
  next();
}, end);

router.get('/status', begin, async (req, res, next) => {
  let jinrohRes = gameMaseter.casts;

  global.set('obj', jinrohRes);
  next();
}, end);

router.post('/night_action', begin, async (req, res, next) => {
  let jinrohRes = gameMaseter.nightAction(
    req.body.id,
    req.body.target_id
  );

  global.set('obj', jinrohRes);
  next();
}, end);

router.get('/night_process', begin, async (req, res, next) => {
  let jinrohRes = gameMaseter.nightProcess();

  global.set('obj', jinrohRes);
  next();
}, end);

module.exports = router;
