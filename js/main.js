let hp = 120;
let enemyHp = 100;
let enemyMaxHp = 100;
let meat = 0;
let enemyDamage = 20;
let enemyMoves = [];

function updateHpBar() {
  // はなまるのHPゲージ
  let hpPercent = (hp / 120) * 100;
  $("#hanamaru_hp_bar").css("width", hpPercent + "%");

  // 敵のHPゲージ
  let enemyHpPercent = (enemyHp / enemyMaxHp) * 100;
  $("#enemy_hp_bar").css("width", enemyHpPercent + "%");
}
// 敵をランダムに登場させる
function newEnemy() {
  const randomNumber2 = Math.floor(Math.random() * 5);

  // はなまるのHPを全回復
  hp = 120;

  if (randomNumber2 === 0) {
    $("#enemy_name").text("イノシシ");
    $("#enemy_img").attr("src", "images/inoshishi.png");
    enemyHp = 100;
    enemyDamage = 20;
    enemyMoves = ["猛突進", "牙で突き上げる", "威嚇する"];
  } else if (randomNumber2 === 1) {
    $("#enemy_name").text("野良犬");
    $("#enemy_img").attr("src", "images/norainu.png");
    enemyHp = 80;
    enemyDamage = 15;
    enemyMoves = ["かみつく", "激しく吠える", "飛びかかる"];
  } else if (randomNumber2 === 2) {
    $("#enemy_name").text("野良猫");
    $("#enemy_img").attr("src", "images/noraneko.png");
    enemyHp = 60;
    enemyDamage = 10;
    enemyMoves = ["猫パンチ", "引っかく", "シャーッと威嚇"];
  } else if (randomNumber2 === 3) {
    $("#enemy_name").text("鹿");
    $("#enemy_img").attr("src", "images/shika.png");
    enemyHp = 100;
    enemyDamage = 20;
    enemyMoves = ["後ろ蹴り", "角で突く", "華麗にかわす"];

  } else if (randomNumber2 === 4) {
    $("#enemy_name").text("クマ");
    $("#enemy_img").attr("src", "images/kuma.png");
    enemyHp = 160;
    enemyDamage = 30;
    enemyMoves = ["強烈な爪攻撃", "大きな口でかみつく", "地面を叩きつける"];  }

  // 敵の最大HPを保存
  enemyMaxHp = enemyHp;
  // 敵の登場メッセージ
  $("#result").text($("#enemy_name").text() + "が現れた！");

  // HPを表示
  $("#hp").text("HP：" + hp);
  $("#enemy_hp").text("敵HP：" + enemyHp);
  updateHpBar();

  // はなまるの画像を元に戻す
  $("#hanamaru_img").attr("src", "images/hanamaru.png");
}

// 技の名前
const moves = ["かみつく", "うなる", "おしっこ", "うんこ", "可愛いポーズ"];

// 技の画像
const moveImages = [
  "images/bite.png",
  "images/growl.png",
  "images/pee.png",
  "images/poop.png",
  "images/cute.png",
];

// 技の相性
const wins = [
  [1, 4],
  [2, 3],
  [0, 4],
  [0, 2],
  [1, 3],
];

// 戦闘処理
function battle(myAttack) {
  // ゲーム終了時は攻撃できない
  if (hp <= 0 || enemyHp <= 0 || meat >= 5) {
    return;
  }

  // 敵の技をランダムに決める
  const enemyAttack = Math.floor(Math.random() * 5);
// 敵の技を3種類からランダムに選ぶ
const randomMove = Math.floor(Math.random() * 3);
  // はなまるの画像を変更
  $("#hanamaru_img").attr("src", moveImages[myAttack]);
// 攻撃アニメーションを実行
$("#hanamaru_img").removeClass("attack");
$("#hanamaru_img")[0].offsetWidth;
$("#hanamaru_img").addClass("attack");
  // 戦闘メッセージ
  let message = "はなまる：" + moves[myAttack] +
    " / " + $("#enemy_name").text() + "：" + enemyMoves[randomMove];
  // 勝敗判定
  if (myAttack === enemyAttack) {
    message = message + " → あいこ！";
  } else if (wins[myAttack].includes(enemyAttack)) {
    // はなまるの攻撃力は25
    enemyHp = enemyHp - 25;
// 敵がダメージを受けたときに震える
$("#enemy_img").removeClass("damage");
$("#enemy_img")[0].offsetWidth;
$("#enemy_img").addClass("damage");
    message = message + " → はなまるの勝ち！";
  } else {
    // 敵の攻撃
    hp = hp - enemyDamage;
    // はなまるがダメージを受けたら震える
$("#hanamaru_img").removeClass("damage");
$("#hanamaru_img")[0].offsetWidth;
$("#hanamaru_img").addClass("damage");

    message = message + " → はなまるの負け！";
  }

  // HPがマイナスにならないようにする
  if (hp < 0) {
    hp = 0;
  }

  if (enemyHp < 0) {
    enemyHp = 0;
  }

  // HPを表示
  $("#hp").text("HP：" + hp);
  $("#enemy_hp").text("敵HP：" + enemyHp);
  updateHpBar();

  // ゲーム終了判定
  if (hp <= 0) {
    // はなまるが負けた
    message = message + " ゲームオーバー！";
  } else if (enemyHp <= 0) {
    // 敵を倒したら肉を獲得
    meat = meat + 1;
    $("#meat").text("肉：" + meat + "個");

    message = message + " 敵を倒した！肉を1個獲得！";

    // 肉が5個になったらゲームクリア
    if (meat >= 5) {
      message = "🎉 ゲームクリア！はなまるは最強の猟犬になった！";
    } else {
      // 1.5秒後に次の敵が登場
      setTimeout(function () {
        newEnemy();
      }, 1500);
    }
  }

  // 戦闘結果を表示
  $("#result").text(message);
}

// かみつく
$("#bite").on("click", function () {
  battle(0);
});

// うなる
$("#growl").on("click", function () {
  battle(1);
});

// おしっこ
$("#pee").on("click", function () {
  battle(2);
});

// うんこ
$("#poop").on("click", function () {
  battle(3);
});

// 可愛いポーズ
$("#cute").on("click", function () {
  battle(4);
});

// おまかせ技
$("#random").on("click", function () {
  const randomAttack = Math.floor(Math.random() * 5);

  battle(randomAttack);
});

// 最初の敵を登場させる
newEnemy();
