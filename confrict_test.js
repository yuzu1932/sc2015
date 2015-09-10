/*
 * 提出課題です，心の声を作成するプログラムを作成してください。
 * 「。」「，」の文字を「...」に変換し，「？の後ろ」と，ランダムな位置に「...」を挿入するプログラムを作成しなさい。
 * とは言っても，４箇所のTODOの部分のコードを書くだけです。コードの中のヒントを見落とさないように。
 * 提出はpushで行ってもらいますが，いつpushするかはこちらから指示しますので，勝手にpushしないように。
 * この注意を守れない場合は，提出課題の採点を行いませんので，しっかり守ってください。
 */

String.prototype.insertDots = function(str, index) {
    str = str.substring(0, index + 1) + (str.substring(index, str.length)).replace(str.charAt(index), '...');
  // TODO: この変数の中身を作ってください
  return　str;
};

var word = "ゆずる君，ゆずる君，聞こえますか？今，あなたの心に,直接話しかけています。このリポジトリをpullするのです。pullするのです。"
var myVoice = toVoiceInsideYourHeart(word);
console.log(myVoice);

function toVoiceInsideYourHeart(phrase) {
  var max_num = 20;
  var num = max_num;
  for (var i = 0; i < phrase.length; i++) {
    if (phrase.charAt(i) == '。' || phrase.charAt(i) == '，') {
      phrase = phrase.substring(0, i) + (phrase.substring(i, phrase.length)).replace(phrase.charAt(i), '...');
      num = max_num;
      i += 2; // TODO: 0の代わりに，正しい数値を入れてください
    } else if (phrase.charAt(i - 1) == '？' || Math.floor(Math.random() * num) < 2) {　// TODO: 条件式の右辺の -1 を自分が最適だと感じる数値に調整してください。
      phrase = phrase.insertDots(phrase, i);
      num = max_num;
      i += 2; // TODO: 0の代わりに，正しい数値を入れてください
    }
    num--;
  }
  return phrase;
}
