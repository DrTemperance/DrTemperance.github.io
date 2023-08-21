!(function (l) {
  "use strict";
  l.opspark = l.opspark || {};
  let p = l.opspark;
  (l.opspark.platform = l.opspark.platform || {}),
    (p.platform.factory = function (l) {
      (l.platforms = l.add.group()), (l.platforms.enableBody = !0);
      let a = (p, a, o = 1, r = 1, t = !0) =>
        l.platforms.create(
          p,
          a,
          "platform",
          null,
          !0,
          !1,
          null,
          null,
          o,
          r,
          null,
          null,
          t
        );
      p.platform.create = a;
    });
})(window);
