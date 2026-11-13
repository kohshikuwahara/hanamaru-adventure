let hp = 120;
let enemyHp = 100;
let enemyMaxHp = 100;
let meat = 0;
let enemyDamage = 20;
let enemyMoves = [];

// =====================================
// HPゲージを更新する
// =====================================
function updateHpBar() {
  let hpPercent = (hp / 120) * 100;
  $("#hanamaru_hp_bar").css("width", hpPercent + "%");

  let enemyHpPercent = (enemyHp / enemyMaxHp) * 100;
  $("#enemy_hp_bar").css("width", enemyHpPercent + "%");
}

// =====================================
// 肉のアイコンを表示する
// =====================================
function updateMeatDisplay() {
  let meatIcons = "";

  for (let i = 0; i < meat; i++) {
    meatIcons = meatIcons + "🥩";
  }

  $("#meat_icons").text(meatIcons);
}

// =====================================
// 敵をランダムに登場させる
// =====================================
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
    enemyMoves = ["強烈な爪攻撃", "大きな口でかみつく", "地面を叩きつける"];
  }

  // 最大HPを保存
  enemyMaxHp = enemyHp;

  // 敵の登場メッセージ
  $("#result").text($("#enemy_name").text() + "が現れた！");

  // HPを更新
  $("#hp").text("HP：" + hp);
  $("#enemy_hp").text("敵HP：" + enemyHp);

  updateHpBar();
  updateMeatDisplay();

  // 技名をリセット
  $("#hanamaru_move").text("");
  $("#enemy_move").text("");

  // はなまるの画像を元に戻す
  $("#hanamaru_img")
    .removeClass("attack damage")
    .attr("src", "images/hanamaru.png");

  $("#enemy_img").removeClass("damage");
}

// =====================================
// はなまるの技
// =====================================
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

// =====================================
// 戦闘処理
// =====================================
function battle(myAttack) {
  // ゲームが終了していたら攻撃できない
  if (hp <= 0 || enemyHp <= 0 || meat >= 5) {
    return;
  }

  // BGMを初回の攻撃時に再生する
const bgm = $("#bgm")[0];

if (bgm && bgm.paused) {
    bgm.play().catch(function () {
        console.log("BGMを再生できませんでした");
    });
}

  // 攻撃音を再生
  const attackSound = $("#attack_sound")[0];
  attackSound.currentTime = 0;
  attackSound.play();

  // 敵の攻撃をランダムに決める
  const enemyAttack = Math.floor(Math.random() * 5);

  // 敵の技名を3種類から選ぶ
  const randomMove = Math.floor(Math.random() * 3);

  // はなまるの技画像に変更
  $("#hanamaru_img").attr("src", moveImages[myAttack]);

  // キャラクターの下に技名を表示
  $("#hanamaru_move").text("⚔️ " + moves[myAttack] + "！");
  $("#enemy_move").text("💥 " + enemyMoves[randomMove] + "！");

  // 攻撃アニメーション
  $("#hanamaru_img").removeClass("attack damage");
  $("#hanamaru_img")[0].offsetWidth;
  $("#hanamaru_img").addClass("attack");

  // 戦闘メッセージ
  let message =
    "はなまる：" +
    moves[myAttack] +
    " / " +
    $("#enemy_name").text() +
    "：" +
    enemyMoves[randomMove];

  // =====================================
  // 勝敗判定
  // =====================================

  if (myAttack === enemyAttack) {
    message = message + " → あいこ！";
  } else if (wins[myAttack].includes(enemyAttack)) {
    // はなまるが勝った
    enemyHp = enemyHp - 25;

    // 敵が震える
    $("#enemy_img").removeClass("damage");
    $("#enemy_img")[0].offsetWidth;
    $("#enemy_img").addClass("damage");

    message = message + " → はなまるの勝ち！";
  } else {
    // はなまるが負けた
    hp = hp - enemyDamage;

    // はなまるが震える
    $("#hanamaru_img").removeClass("attack damage");
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

  // =====================================
  // ゲーム終了判定
  // =====================================

  if (hp <= 0) {
    // ゲームオーバー
    message = message + " ゲームオーバー！";
    $("#gameover_screen").show();
  } else if (enemyHp <= 0) {
    // 敵を倒したら肉を1個獲得
    meat = meat + 1;
    $("#meat").text("肉：" + meat + "個");

    // 肉のアイコンを更新
    updateMeatDisplay();

    // 肉GETアニメーション
    $("#meat_effect").removeClass("meat-animation");
    $("#meat_effect")[0].offsetWidth;
    $("#meat_effect").addClass("meat-animation");

    message = message + " 敵を倒した！肉を1個獲得！";

    if (meat >= 5) {
      // ゲームクリア
      message = "🎉 ゲームクリア！はなまるは最強の猟犬になった！";

      // クリア画面を表示
      $("#clear_screen").show();
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

// =====================================
// 技ボタン
// =====================================

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

// ★リスタート機能
$("#restart").on("click", function () {
  meat = 0;
  $("#meat").text("肉：0個");
  $("#clear_screen").hide();
  newEnemy();
});

// =====================================
// ゲーム開始
// =====================================
// ゲームオーバー後のリスタート
$("#retry").on("click", function () {
  meat = 0;
  $("#meat").text("肉：0個");
  $("#gameover_screen").hide();
  newEnemy();
});
// BGMの再生・停止
$("#bgm_button").on("click", function () {
  const bgm = $("#bgm")[0];

  if (bgm.paused) {
    bgm.play();
    $(this).text("🔇 BGMを停止");
  } else {
    bgm.pause();
    $(this).text("🎵 BGMを再生");
  }
});
newEnemy();
