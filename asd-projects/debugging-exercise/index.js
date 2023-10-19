$(document).ready(() => {
  let e = 10,
    t = $("#board"),
    n = $(t).width(),
    d = $(t).height(),
    o = [];
  for (let t = 0; t < e; t++) {o.push(s(`circle${t}`)), i(s(`circle${t}`), `circle${t}`)}

  function s(e) {
    let t = {};
    return t.id = "#" + e, t.x = 10 + (n - 20) * Math.random(), t.y = 10 + (d - 20) * Math.random(), t.speedX = c(), t.speedY = c(), t
  }

  function c() {return 5 * Math.random() / 2 - 5}
  function i(e, n) {$("<div>").attr("id", n).css("left", e.x).css("top", e.y).addClass("circle").appendTo(t)}
  function r(e) {e.x += e.speedX, e.y += e.speedY}
  function a(e) {(e.x < 0 || e.x > n) && (e.x -= e.speedX, e.speedX *= -1), (e.y < 0 || e.y > d) && (e.y -= e.speedY, e.speedY *= -1)}
  function f({id: t, x: n, y: d}) {e = 10, $(t).css("left", n), $(t).css("top", d)}
  
  setInterval((function() {for (let e of o) r(e), a(e), f(e)}), 25)})
