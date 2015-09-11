// Node.jsでの通信などの簡単なサンプル
// Node.js単体での作業はHTMLの出力において，
// 割とめんどくさいことになる

// 必要なモジュールをロードする
var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

// 出力するHTMLコードを用意する
var htmlHeader = '<!DOCTYPE html>\
<html lang="ja">\
<head>\
  <meta charset="utf-8">\
  <title>単位ください</title>\
  <link rel="stylesheet" type="text/css" href="style.css">\
</head>\
<body>\
<div class="content">\
<h1>卒業できるか否か</h1>';

var htmlMainForm = '<div class="main-form">\
  <form name="syutoku" method="post" action="/">\
    <div>\
      サマーコース単位数：\
      <label><input type="text" name="tanni" id="suuzi" size="5"></label>\
    </div>\
    <input type="submit" value="Go">\
  </form>\
</div>';

var htmlFooter = '</div></body></html>';

// 「<」や「>」、「&」といった文字列をエンティティに変換する
function escapeHtmlSpecialChar(html) {
  if (html === undefined) {
    return '';
  } else {
    html = html.replace(/&/g, '&amp;');
    html = html.replace(/</g, '&lt;');
    html = html.replace(/>/g, '&gt;');
    return html;
  }
};

// http.Serverオブジェクトを作成する
var server = http.createServer(onRequest);

// requestイベントハンドラを定義する
function onRequest(request, response) {
  // リクエストされたパスが「/」以外の場合、404エラーを返す
  if (request.url != '/') {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Error 404: Not Found.');
    return;
  }

  // POST以外のリクエストの場合、メインフォームを送信する
  if (request.method != 'POST') {
    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    response.write(htmlHeader);
    response.write(htmlMainForm);
    response.write(htmlFooter);
    response.end();
    return;
  }

  // POSTリクエストの場合、送信されたデータから占い結果を生成する
  if (request.method == 'POST') {
    // 送信されたデータを取得する
    request.data = '';
    request.on('data', function (chunk) {
      request.data += chunk;
    });
    request.on('end', sendResponse);
    return;
  }

  // データの受信が完了したら実行される関数
  function sendResponse() {
    var query = querystring.parse(request.data);

    var tannisuu = parseInt(query.tanni);
    var result = '';
    if (tannisuu < 2) {
      result = '<span style="font-size:256px;color:#ff5433">留年</span>';
    } else if (tannisuu >= 2) {
      result = '<span style="font-size:256px;color:#4477ff">卒業</span>';
    }


    var resultStr = '<div>'
      + result
      + 'です。</div>'
      + '<a href="/">トップに戻る</a>';

    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    response.write(htmlHeader);
    response.write(resultStr);
    response.write(htmlFooter);
    response.end();
  }
}

// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';

// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');
