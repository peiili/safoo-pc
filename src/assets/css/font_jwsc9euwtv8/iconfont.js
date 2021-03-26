!(function (e) {
  var t,
    n,
    o,
    i,
    d,
    c,
    l =
      '<svg><symbol id="icon-guizi_o" viewBox="0 0 1024 1024"><path d="M682.666667 597.333333h170.666666v42.666667h-170.666666v128h-42.666667v-213.333333h-213.333333v213.333333H384v-128H213.333333v-42.666667h170.666667v-128H213.333333v-42.666666h170.666667V298.666667h42.666667v213.333333h213.333333V298.666667h42.666667v128h170.666666v42.666666h-170.666666v128z m213.333333-341.333333v554.666667H170.666667V256h725.333333zM213.333333 298.666667v469.333333h640V298.666667H213.333333z" fill="#444444" ></path></symbol></svg>',
    s = (s = document.getElementsByTagName('script'))[s.length - 1].getAttribute('data-injectcss');
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  function a() {
    d || ((d = !0), o());
  }
  (t = function () {
    var e, t, n, o;
    ((o = document.createElement('div')).innerHTML = l),
      (l = null),
      (n = o.getElementsByTagName('svg')[0]) &&
        (n.setAttribute('aria-hidden', 'true'),
        (n.style.position = 'absolute'),
        (n.style.width = 0),
        (n.style.height = 0),
        (n.style.overflow = 'hidden'),
        (e = n),
        (t = document.body).firstChild
          ? ((o = e), (n = t.firstChild).parentNode.insertBefore(o, n))
          : t.appendChild(e));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), t();
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = t),
        (i = e.document),
        (d = !1),
        (c = function () {
          try {
            i.documentElement.doScroll('left');
          } catch (e) {
            return void setTimeout(c, 50);
          }
          a();
        })(),
        (i.onreadystatechange = function () {
          'complete' == i.readyState && ((i.onreadystatechange = null), a());
        }));
})(window);
