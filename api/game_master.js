import GameMaster from './lib/Jinroh/GameMaster';
import {Constant} from './lib/Jinroh/Constant';

let gameMaseter = new GameMaster();

function main() {
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
}

function night1() {
  console.log(gameMaseter.nightAction('1', '2'));
  console.log(gameMaseter.nightAction('2', '1'));
  console.log(gameMaseter.nightAction('3', '1'));
  console.log(gameMaseter.nightAction('4', '1'));
  console.log(gameMaseter.nightAction('5', '1'));
  console.log(gameMaseter.nightAction('6', '1'));
  console.log(gameMaseter.nightAction('7', '2'));
  console.log(gameMaseter.nightAction('8', '2'));
}

function nightProcess1() {
  console.log(gameMaseter.nightProcessWerewolf());
  gameMaseter.nightProcess();
}

function noon1() {
  console.log(gameMaseter.noonAction(1, 3));
  console.log(gameMaseter.noonAction(2, 2));
  console.log(gameMaseter.noonAction(3, 1));
  console.log(gameMaseter.noonAction(4, 1));
  console.log(gameMaseter.noonAction(5, 1));
  console.log(gameMaseter.noonAction(6, 1));
  console.log(gameMaseter.noonAction(7, 2));
  console.log(gameMaseter.noonAction(8, 2));
}

main();
night1();
nightProcess1();
noon1();
