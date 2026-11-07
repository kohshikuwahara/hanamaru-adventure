$("#gu").on("click", function () {

  const randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber === 0) {
    $("#computer").text("グー");
    $("#result").text("あいこ");

  } else if (randomNumber === 1) {
    $("#computer").text("チョキ");
    $("#result").text("勝ち");

  } else if (randomNumber === 2) {
    $("#computer").text("パー");
    $("#result").text("負け");
  }

});

$("#choki").on("click", function () {

  const randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber === 0) {
    $("#computer").text("グー");
    $("#result").text("負け");

  } else if (randomNumber === 1) {
    $("#computer").text("チョキ");
    $("#result").text("あいこ");

  } else if (randomNumber === 2) {
    $("#computer").text("パー");
    $("#result").text("勝ち");
  }

});
$("#pa").on("click", function () {

  const randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber === 0) {
    $("#computer").text("グー");
    $("#result").text("勝ち");

  } else if (randomNumber === 1) {
    $("#computer").text("チョキ");
    $("#result").text("負け");

  } else if (randomNumber === 2) {
    $("#computer").text("パー");
    $("#result").text("あいこ");
  }

});