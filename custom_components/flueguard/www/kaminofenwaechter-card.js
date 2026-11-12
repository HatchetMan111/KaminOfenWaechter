function Xf(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var Ri = { exports: {} }, Y = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fa;
function Zf() {
  if (Fa) return Y;
  Fa = 1;
  var h = Symbol.for("react.element"), v = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), O = Symbol.for("react.provider"), E = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), ee = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), H = Symbol.iterator;
  function V(c) {
    return c === null || typeof c != "object" ? null : (c = H && c[H] || c["@@iterator"], typeof c == "function" ? c : null);
  }
  var M = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Q = Object.assign, A = {};
  function K(c, w, G) {
    this.props = c, this.context = w, this.refs = A, this.updater = G || M;
  }
  K.prototype.isReactComponent = {}, K.prototype.setState = function(c, w) {
    if (typeof c != "object" && typeof c != "function" && c != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, c, w, "setState");
  }, K.prototype.forceUpdate = function(c) {
    this.updater.enqueueForceUpdate(this, c, "forceUpdate");
  };
  function ae() {
  }
  ae.prototype = K.prototype;
  function ce(c, w, G) {
    this.props = c, this.context = w, this.refs = A, this.updater = G || M;
  }
  var ie = ce.prototype = new ae();
  ie.constructor = ce, Q(ie, K.prototype), ie.isPureReactComponent = !0;
  var te = Array.isArray, ne = Object.prototype.hasOwnProperty, oe = { current: null }, we = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _e(c, w, G) {
    var X, J = {}, q = null, ue = null;
    if (w != null) for (X in w.ref !== void 0 && (ue = w.ref), w.key !== void 0 && (q = "" + w.key), w) ne.call(w, X) && !we.hasOwnProperty(X) && (J[X] = w[X]);
    var re = arguments.length - 2;
    if (re === 1) J.children = G;
    else if (1 < re) {
      for (var pe = Array(re), Ye = 0; Ye < re; Ye++) pe[Ye] = arguments[Ye + 2];
      J.children = pe;
    }
    if (c && c.defaultProps) for (X in re = c.defaultProps, re) J[X] === void 0 && (J[X] = re[X]);
    return { $$typeof: h, type: c, key: q, ref: ue, props: J, _owner: oe.current };
  }
  function pt(c, w) {
    return { $$typeof: h, type: c.type, key: w, ref: c.ref, props: c.props, _owner: c._owner };
  }
  function be(c) {
    return typeof c == "object" && c !== null && c.$$typeof === h;
  }
  function kt(c) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + c.replace(/[=:]/g, function(G) {
      return w[G];
    });
  }
  var je = /\/+/g;
  function Oe(c, w) {
    return typeof c == "object" && c !== null && c.key != null ? kt("" + c.key) : w.toString(36);
  }
  function Ue(c, w, G, X, J) {
    var q = typeof c;
    (q === "undefined" || q === "boolean") && (c = null);
    var ue = !1;
    if (c === null) ue = !0;
    else switch (q) {
      case "string":
      case "number":
        ue = !0;
        break;
      case "object":
        switch (c.$$typeof) {
          case h:
          case v:
            ue = !0;
        }
    }
    if (ue) return ue = c, J = J(ue), c = X === "" ? "." + Oe(ue, 0) : X, te(J) ? (G = "", c != null && (G = c.replace(je, "$&/") + "/"), Ue(J, w, G, "", function(Ye) {
      return Ye;
    })) : J != null && (be(J) && (J = pt(J, G + (!J.key || ue && ue.key === J.key ? "" : ("" + J.key).replace(je, "$&/") + "/") + c)), w.push(J)), 1;
    if (ue = 0, X = X === "" ? "." : X + ":", te(c)) for (var re = 0; re < c.length; re++) {
      q = c[re];
      var pe = X + Oe(q, re);
      ue += Ue(q, w, G, pe, J);
    }
    else if (pe = V(c), typeof pe == "function") for (c = pe.call(c), re = 0; !(q = c.next()).done; ) q = q.value, pe = X + Oe(q, re++), ue += Ue(q, w, G, pe, J);
    else if (q === "object") throw w = String(c), Error("Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead.");
    return ue;
  }
  function mt(c, w, G) {
    if (c == null) return c;
    var X = [], J = 0;
    return Ue(c, X, "", "", function(q) {
      return w.call(G, q, J++);
    }), X;
  }
  function He(c) {
    if (c._status === -1) {
      var w = c._result;
      w = w(), w.then(function(G) {
        (c._status === 0 || c._status === -1) && (c._status = 1, c._result = G);
      }, function(G) {
        (c._status === 0 || c._status === -1) && (c._status = 2, c._result = G);
      }), c._status === -1 && (c._status = 0, c._result = w);
    }
    if (c._status === 1) return c._result.default;
    throw c._result;
  }
  var ge = { current: null }, C = { transition: null }, $ = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: C, ReactCurrentOwner: oe };
  function P() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Y.Children = { map: mt, forEach: function(c, w, G) {
    mt(c, function() {
      w.apply(this, arguments);
    }, G);
  }, count: function(c) {
    var w = 0;
    return mt(c, function() {
      w++;
    }), w;
  }, toArray: function(c) {
    return mt(c, function(w) {
      return w;
    }) || [];
  }, only: function(c) {
    if (!be(c)) throw Error("React.Children.only expected to receive a single React element child.");
    return c;
  } }, Y.Component = K, Y.Fragment = f, Y.Profiler = _, Y.PureComponent = ce, Y.StrictMode = T, Y.Suspense = F, Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $, Y.act = P, Y.cloneElement = function(c, w, G) {
    if (c == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
    var X = Q({}, c.props), J = c.key, q = c.ref, ue = c._owner;
    if (w != null) {
      if (w.ref !== void 0 && (q = w.ref, ue = oe.current), w.key !== void 0 && (J = "" + w.key), c.type && c.type.defaultProps) var re = c.type.defaultProps;
      for (pe in w) ne.call(w, pe) && !we.hasOwnProperty(pe) && (X[pe] = w[pe] === void 0 && re !== void 0 ? re[pe] : w[pe]);
    }
    var pe = arguments.length - 2;
    if (pe === 1) X.children = G;
    else if (1 < pe) {
      re = Array(pe);
      for (var Ye = 0; Ye < pe; Ye++) re[Ye] = arguments[Ye + 2];
      X.children = re;
    }
    return { $$typeof: h, type: c.type, key: J, ref: q, props: X, _owner: ue };
  }, Y.createContext = function(c) {
    return c = { $$typeof: E, _currentValue: c, _currentValue2: c, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, c.Provider = { $$typeof: O, _context: c }, c.Consumer = c;
  }, Y.createElement = _e, Y.createFactory = function(c) {
    var w = _e.bind(null, c);
    return w.type = c, w;
  }, Y.createRef = function() {
    return { current: null };
  }, Y.forwardRef = function(c) {
    return { $$typeof: U, render: c };
  }, Y.isValidElement = be, Y.lazy = function(c) {
    return { $$typeof: W, _payload: { _status: -1, _result: c }, _init: He };
  }, Y.memo = function(c, w) {
    return { $$typeof: ee, type: c, compare: w === void 0 ? null : w };
  }, Y.startTransition = function(c) {
    var w = C.transition;
    C.transition = {};
    try {
      c();
    } finally {
      C.transition = w;
    }
  }, Y.unstable_act = P, Y.useCallback = function(c, w) {
    return ge.current.useCallback(c, w);
  }, Y.useContext = function(c) {
    return ge.current.useContext(c);
  }, Y.useDebugValue = function() {
  }, Y.useDeferredValue = function(c) {
    return ge.current.useDeferredValue(c);
  }, Y.useEffect = function(c, w) {
    return ge.current.useEffect(c, w);
  }, Y.useId = function() {
    return ge.current.useId();
  }, Y.useImperativeHandle = function(c, w, G) {
    return ge.current.useImperativeHandle(c, w, G);
  }, Y.useInsertionEffect = function(c, w) {
    return ge.current.useInsertionEffect(c, w);
  }, Y.useLayoutEffect = function(c, w) {
    return ge.current.useLayoutEffect(c, w);
  }, Y.useMemo = function(c, w) {
    return ge.current.useMemo(c, w);
  }, Y.useReducer = function(c, w, G) {
    return ge.current.useReducer(c, w, G);
  }, Y.useRef = function(c) {
    return ge.current.useRef(c);
  }, Y.useState = function(c) {
    return ge.current.useState(c);
  }, Y.useSyncExternalStore = function(c, w, G) {
    return ge.current.useSyncExternalStore(c, w, G);
  }, Y.useTransition = function() {
    return ge.current.useTransition();
  }, Y.version = "18.3.1", Y;
}
var Da;
function Ai() {
  return Da || (Da = 1, Ri.exports = Zf()), Ri.exports;
}
var Le = Ai();
const Ka = /* @__PURE__ */ Xf(Le);
var Dl = {}, Li = { exports: {} }, Ge = {}, Oi = { exports: {} }, Mi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ia;
function Jf() {
  return Ia || (Ia = 1, (function(h) {
    function v(C, $) {
      var P = C.length;
      C.push($);
      e: for (; 0 < P; ) {
        var c = P - 1 >>> 1, w = C[c];
        if (0 < _(w, $)) C[c] = $, C[P] = w, P = c;
        else break e;
      }
    }
    function f(C) {
      return C.length === 0 ? null : C[0];
    }
    function T(C) {
      if (C.length === 0) return null;
      var $ = C[0], P = C.pop();
      if (P !== $) {
        C[0] = P;
        e: for (var c = 0, w = C.length, G = w >>> 1; c < G; ) {
          var X = 2 * (c + 1) - 1, J = C[X], q = X + 1, ue = C[q];
          if (0 > _(J, P)) q < w && 0 > _(ue, J) ? (C[c] = ue, C[q] = P, c = q) : (C[c] = J, C[X] = P, c = X);
          else if (q < w && 0 > _(ue, P)) C[c] = ue, C[q] = P, c = q;
          else break e;
        }
      }
      return $;
    }
    function _(C, $) {
      var P = C.sortIndex - $.sortIndex;
      return P !== 0 ? P : C.id - $.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var O = performance;
      h.unstable_now = function() {
        return O.now();
      };
    } else {
      var E = Date, U = E.now();
      h.unstable_now = function() {
        return E.now() - U;
      };
    }
    var F = [], ee = [], W = 1, H = null, V = 3, M = !1, Q = !1, A = !1, K = typeof setTimeout == "function" ? setTimeout : null, ae = typeof clearTimeout == "function" ? clearTimeout : null, ce = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ie(C) {
      for (var $ = f(ee); $ !== null; ) {
        if ($.callback === null) T(ee);
        else if ($.startTime <= C) T(ee), $.sortIndex = $.expirationTime, v(F, $);
        else break;
        $ = f(ee);
      }
    }
    function te(C) {
      if (A = !1, ie(C), !Q) if (f(F) !== null) Q = !0, He(ne);
      else {
        var $ = f(ee);
        $ !== null && ge(te, $.startTime - C);
      }
    }
    function ne(C, $) {
      Q = !1, A && (A = !1, ae(_e), _e = -1), M = !0;
      var P = V;
      try {
        for (ie($), H = f(F); H !== null && (!(H.expirationTime > $) || C && !kt()); ) {
          var c = H.callback;
          if (typeof c == "function") {
            H.callback = null, V = H.priorityLevel;
            var w = c(H.expirationTime <= $);
            $ = h.unstable_now(), typeof w == "function" ? H.callback = w : H === f(F) && T(F), ie($);
          } else T(F);
          H = f(F);
        }
        if (H !== null) var G = !0;
        else {
          var X = f(ee);
          X !== null && ge(te, X.startTime - $), G = !1;
        }
        return G;
      } finally {
        H = null, V = P, M = !1;
      }
    }
    var oe = !1, we = null, _e = -1, pt = 5, be = -1;
    function kt() {
      return !(h.unstable_now() - be < pt);
    }
    function je() {
      if (we !== null) {
        var C = h.unstable_now();
        be = C;
        var $ = !0;
        try {
          $ = we(!0, C);
        } finally {
          $ ? Oe() : (oe = !1, we = null);
        }
      } else oe = !1;
    }
    var Oe;
    if (typeof ce == "function") Oe = function() {
      ce(je);
    };
    else if (typeof MessageChannel < "u") {
      var Ue = new MessageChannel(), mt = Ue.port2;
      Ue.port1.onmessage = je, Oe = function() {
        mt.postMessage(null);
      };
    } else Oe = function() {
      K(je, 0);
    };
    function He(C) {
      we = C, oe || (oe = !0, Oe());
    }
    function ge(C, $) {
      _e = K(function() {
        C(h.unstable_now());
      }, $);
    }
    h.unstable_IdlePriority = 5, h.unstable_ImmediatePriority = 1, h.unstable_LowPriority = 4, h.unstable_NormalPriority = 3, h.unstable_Profiling = null, h.unstable_UserBlockingPriority = 2, h.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, h.unstable_continueExecution = function() {
      Q || M || (Q = !0, He(ne));
    }, h.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : pt = 0 < C ? Math.floor(1e3 / C) : 5;
    }, h.unstable_getCurrentPriorityLevel = function() {
      return V;
    }, h.unstable_getFirstCallbackNode = function() {
      return f(F);
    }, h.unstable_next = function(C) {
      switch (V) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = V;
      }
      var P = V;
      V = $;
      try {
        return C();
      } finally {
        V = P;
      }
    }, h.unstable_pauseExecution = function() {
    }, h.unstable_requestPaint = function() {
    }, h.unstable_runWithPriority = function(C, $) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var P = V;
      V = C;
      try {
        return $();
      } finally {
        V = P;
      }
    }, h.unstable_scheduleCallback = function(C, $, P) {
      var c = h.unstable_now();
      switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? c + P : c) : P = c, C) {
        case 1:
          var w = -1;
          break;
        case 2:
          w = 250;
          break;
        case 5:
          w = 1073741823;
          break;
        case 4:
          w = 1e4;
          break;
        default:
          w = 5e3;
      }
      return w = P + w, C = { id: W++, callback: $, priorityLevel: C, startTime: P, expirationTime: w, sortIndex: -1 }, P > c ? (C.sortIndex = P, v(ee, C), f(F) === null && C === f(ee) && (A ? (ae(_e), _e = -1) : A = !0, ge(te, P - c))) : (C.sortIndex = w, v(F, C), Q || M || (Q = !0, He(ne))), C;
    }, h.unstable_shouldYield = kt, h.unstable_wrapCallback = function(C) {
      var $ = V;
      return function() {
        var P = V;
        V = $;
        try {
          return C.apply(this, arguments);
        } finally {
          V = P;
        }
      };
    };
  })(Mi)), Mi;
}
var Aa;
function qf() {
  return Aa || (Aa = 1, Oi.exports = Jf()), Oi.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $a;
function bf() {
  if ($a) return Ge;
  $a = 1;
  var h = Ai(), v = qf();
  function f(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var T = /* @__PURE__ */ new Set(), _ = {};
  function O(e, t) {
    E(e, t), E(e + "Capture", t);
  }
  function E(e, t) {
    for (_[e] = t, e = 0; e < t.length; e++) T.add(t[e]);
  }
  var U = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), F = Object.prototype.hasOwnProperty, ee = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, W = {}, H = {};
  function V(e) {
    return F.call(H, e) ? !0 : F.call(W, e) ? !1 : ee.test(e) ? H[e] = !0 : (W[e] = !0, !1);
  }
  function M(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Q(e, t, n, r) {
    if (t === null || typeof t > "u" || M(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function A(e, t, n, r, l, o, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
  }
  var K = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    K[e] = new A(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    K[t] = new A(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    K[e] = new A(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    K[e] = new A(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    K[e] = new A(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    K[e] = new A(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    K[e] = new A(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    K[e] = new A(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    K[e] = new A(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var ae = /[\-:]([a-z])/g;
  function ce(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      ae,
      ce
    );
    K[t] = new A(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(ae, ce);
    K[t] = new A(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(ae, ce);
    K[t] = new A(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    K[e] = new A(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), K.xlinkHref = new A("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    K[e] = new A(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function ie(e, t, n, r) {
    var l = K.hasOwnProperty(t) ? K[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Q(t, n, l, r) && (n = null), r || l === null ? V(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var te = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ne = Symbol.for("react.element"), oe = Symbol.for("react.portal"), we = Symbol.for("react.fragment"), _e = Symbol.for("react.strict_mode"), pt = Symbol.for("react.profiler"), be = Symbol.for("react.provider"), kt = Symbol.for("react.context"), je = Symbol.for("react.forward_ref"), Oe = Symbol.for("react.suspense"), Ue = Symbol.for("react.suspense_list"), mt = Symbol.for("react.memo"), He = Symbol.for("react.lazy"), ge = Symbol.for("react.offscreen"), C = Symbol.iterator;
  function $(e) {
    return e === null || typeof e != "object" ? null : (e = C && e[C] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var P = Object.assign, c;
  function w(e) {
    if (c === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      c = t && t[1] || "";
    }
    return `
` + c + e;
  }
  var G = !1;
  function X(e, t) {
    if (!e || G) return "";
    G = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (m) {
          var r = m;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (m) {
          r = m;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (m) {
          r = m;
        }
        e();
      }
    } catch (m) {
      if (m && r && typeof m.stack == "string") {
        for (var l = m.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; ) u--;
        for (; 1 <= i && 0 <= u; i--, u--) if (l[i] !== o[u]) {
          if (i !== 1 || u !== 1)
            do
              if (i--, u--, 0 > u || l[i] !== o[u]) {
                var s = `
` + l[i].replace(" at new ", " at ");
                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
              }
            while (1 <= i && 0 <= u);
          break;
        }
      }
    } finally {
      G = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? w(e) : "";
  }
  function J(e) {
    switch (e.tag) {
      case 5:
        return w(e.type);
      case 16:
        return w("Lazy");
      case 13:
        return w("Suspense");
      case 19:
        return w("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = X(e.type, !1), e;
      case 11:
        return e = X(e.type.render, !1), e;
      case 1:
        return e = X(e.type, !0), e;
      default:
        return "";
    }
  }
  function q(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case we:
        return "Fragment";
      case oe:
        return "Portal";
      case pt:
        return "Profiler";
      case _e:
        return "StrictMode";
      case Oe:
        return "Suspense";
      case Ue:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case kt:
        return (e.displayName || "Context") + ".Consumer";
      case be:
        return (e._context.displayName || "Context") + ".Provider";
      case je:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case mt:
        return t = e.displayName || null, t !== null ? t : q(e.type) || "Memo";
      case He:
        t = e._payload, e = e._init;
        try {
          return q(e(t));
        } catch {
        }
    }
    return null;
  }
  function ue(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return q(t);
      case 8:
        return t === _e ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function re(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function pe(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ye(e) {
    var t = pe(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var l = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(i) {
        r = "" + i, o.call(this, i);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(i) {
        r = "" + i;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Nr(e) {
    e._valueTracker || (e._valueTracker = Ye(e));
  }
  function Hi(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = pe(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function zr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Il(e, t) {
    var n = t.checked;
    return P({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function Bi(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = re(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Vi(e, t) {
    t = t.checked, t != null && ie(e, "checked", t, !1);
  }
  function Al(e, t) {
    Vi(e, t);
    var n = re(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? $l(e, t.type, n) : t.hasOwnProperty("defaultValue") && $l(e, t.type, re(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Wi(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function $l(e, t, n) {
    (t !== "number" || zr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var In = Array.isArray;
  function fn(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + re(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ul(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(f(91));
    return P({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Qi(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(f(92));
        if (In(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: re(n) };
  }
  function Ki(e, t) {
    var n = re(t.value), r = re(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Gi(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Yi(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Hl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Yi(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Pr, Xi = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Pr = Pr || document.createElement("div"), Pr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Pr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function An(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var $n = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, qa = ["Webkit", "ms", "Moz", "O"];
  Object.keys($n).forEach(function(e) {
    qa.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), $n[t] = $n[e];
    });
  });
  function Zi(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || $n.hasOwnProperty(e) && $n[e] ? ("" + t).trim() : t + "px";
  }
  function Ji(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = Zi(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }
  var ba = P({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Bl(e, t) {
    if (t) {
      if (ba[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(f(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(f(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(f(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(f(62));
    }
  }
  function Vl(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Wl = null;
  function Ql(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Kl = null, dn = null, pn = null;
  function qi(e) {
    if (e = ur(e)) {
      if (typeof Kl != "function") throw Error(f(280));
      var t = e.stateNode;
      t && (t = Jr(t), Kl(e.stateNode, e.type, t));
    }
  }
  function bi(e) {
    dn ? pn ? pn.push(e) : pn = [e] : dn = e;
  }
  function eu() {
    if (dn) {
      var e = dn, t = pn;
      if (pn = dn = null, qi(e), t) for (e = 0; e < t.length; e++) qi(t[e]);
    }
  }
  function tu(e, t) {
    return e(t);
  }
  function nu() {
  }
  var Gl = !1;
  function ru(e, t, n) {
    if (Gl) return e(t, n);
    Gl = !0;
    try {
      return tu(e, t, n);
    } finally {
      Gl = !1, (dn !== null || pn !== null) && (nu(), eu());
    }
  }
  function Un(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Jr(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(f(231, t, typeof n));
    return n;
  }
  var Yl = !1;
  if (U) try {
    var Hn = {};
    Object.defineProperty(Hn, "passive", { get: function() {
      Yl = !0;
    } }), window.addEventListener("test", Hn, Hn), window.removeEventListener("test", Hn, Hn);
  } catch {
    Yl = !1;
  }
  function ec(e, t, n, r, l, o, i, u, s) {
    var m = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, m);
    } catch (k) {
      this.onError(k);
    }
  }
  var Bn = !1, jr = null, Tr = !1, Xl = null, tc = { onError: function(e) {
    Bn = !0, jr = e;
  } };
  function nc(e, t, n, r, l, o, i, u, s) {
    Bn = !1, jr = null, ec.apply(tc, arguments);
  }
  function rc(e, t, n, r, l, o, i, u, s) {
    if (nc.apply(this, arguments), Bn) {
      if (Bn) {
        var m = jr;
        Bn = !1, jr = null;
      } else throw Error(f(198));
      Tr || (Tr = !0, Xl = m);
    }
  }
  function Zt(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function lu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function ou(e) {
    if (Zt(e) !== e) throw Error(f(188));
  }
  function lc(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Zt(e), t === null) throw Error(f(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (r = l.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return ou(l), e;
          if (o === r) return ou(l), t;
          o = o.sibling;
        }
        throw Error(f(188));
      }
      if (n.return !== r.return) n = l, r = o;
      else {
        for (var i = !1, u = l.child; u; ) {
          if (u === n) {
            i = !0, n = l, r = o;
            break;
          }
          if (u === r) {
            i = !0, r = l, n = o;
            break;
          }
          u = u.sibling;
        }
        if (!i) {
          for (u = o.child; u; ) {
            if (u === n) {
              i = !0, n = o, r = l;
              break;
            }
            if (u === r) {
              i = !0, r = o, n = l;
              break;
            }
            u = u.sibling;
          }
          if (!i) throw Error(f(189));
        }
      }
      if (n.alternate !== r) throw Error(f(190));
    }
    if (n.tag !== 3) throw Error(f(188));
    return n.stateNode.current === n ? e : t;
  }
  function iu(e) {
    return e = lc(e), e !== null ? uu(e) : null;
  }
  function uu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = uu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var su = v.unstable_scheduleCallback, au = v.unstable_cancelCallback, oc = v.unstable_shouldYield, ic = v.unstable_requestPaint, ke = v.unstable_now, uc = v.unstable_getCurrentPriorityLevel, Zl = v.unstable_ImmediatePriority, cu = v.unstable_UserBlockingPriority, Rr = v.unstable_NormalPriority, sc = v.unstable_LowPriority, fu = v.unstable_IdlePriority, Lr = null, ht = null;
  function ac(e) {
    if (ht && typeof ht.onCommitFiberRoot == "function") try {
      ht.onCommitFiberRoot(Lr, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var it = Math.clz32 ? Math.clz32 : dc, cc = Math.log, fc = Math.LN2;
  function dc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (cc(e) / fc | 0) | 0;
  }
  var Or = 64, Mr = 4194304;
  function Vn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Fr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
    if (i !== 0) {
      var u = i & ~l;
      u !== 0 ? r = Vn(u) : (o &= i, o !== 0 && (r = Vn(o)));
    } else i = n & ~l, i !== 0 ? r = Vn(i) : o !== 0 && (r = Vn(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & l) === 0 && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - it(t), l = 1 << n, r |= e[n], t &= ~l;
    return r;
  }
  function pc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function mc(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var i = 31 - it(o), u = 1 << i, s = l[i];
      s === -1 ? ((u & n) === 0 || (u & r) !== 0) && (l[i] = pc(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
    }
  }
  function Jl(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function du() {
    var e = Or;
    return Or <<= 1, (Or & 4194240) === 0 && (Or = 64), e;
  }
  function ql(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Wn(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - it(t), e[t] = n;
  }
  function hc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - it(n), o = 1 << l;
      t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
    }
  }
  function bl(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - it(n), l = 1 << r;
      l & t | e[r] & t && (e[r] |= t), n &= ~l;
    }
  }
  var le = 0;
  function pu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var mu, eo, hu, vu, gu, to = !1, Dr = [], Rt = null, Lt = null, Ot = null, Qn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), Mt = [], vc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function yu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Rt = null;
        break;
      case "dragenter":
      case "dragleave":
        Lt = null;
        break;
      case "mouseover":
      case "mouseout":
        Ot = null;
        break;
      case "pointerover":
      case "pointerout":
        Qn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Kn.delete(t.pointerId);
    }
  }
  function Gn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = ur(t), t !== null && eo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function gc(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return Rt = Gn(Rt, e, t, n, r, l), !0;
      case "dragenter":
        return Lt = Gn(Lt, e, t, n, r, l), !0;
      case "mouseover":
        return Ot = Gn(Ot, e, t, n, r, l), !0;
      case "pointerover":
        var o = l.pointerId;
        return Qn.set(o, Gn(Qn.get(o) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return o = l.pointerId, Kn.set(o, Gn(Kn.get(o) || null, e, t, n, r, l)), !0;
    }
    return !1;
  }
  function wu(e) {
    var t = Jt(e.target);
    if (t !== null) {
      var n = Zt(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = lu(n), t !== null) {
            e.blockedOn = t, gu(e.priority, function() {
              hu(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ir(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = ro(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        Wl = r, n.target.dispatchEvent(r), Wl = null;
      } else return t = ur(n), t !== null && eo(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function ku(e, t, n) {
    Ir(e) && n.delete(t);
  }
  function yc() {
    to = !1, Rt !== null && Ir(Rt) && (Rt = null), Lt !== null && Ir(Lt) && (Lt = null), Ot !== null && Ir(Ot) && (Ot = null), Qn.forEach(ku), Kn.forEach(ku);
  }
  function Yn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, to || (to = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, yc)));
  }
  function Xn(e) {
    function t(l) {
      return Yn(l, e);
    }
    if (0 < Dr.length) {
      Yn(Dr[0], e);
      for (var n = 1; n < Dr.length; n++) {
        var r = Dr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Rt !== null && Yn(Rt, e), Lt !== null && Yn(Lt, e), Ot !== null && Yn(Ot, e), Qn.forEach(t), Kn.forEach(t), n = 0; n < Mt.length; n++) r = Mt[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Mt.length && (n = Mt[0], n.blockedOn === null); ) wu(n), n.blockedOn === null && Mt.shift();
  }
  var mn = te.ReactCurrentBatchConfig, Ar = !0;
  function wc(e, t, n, r) {
    var l = le, o = mn.transition;
    mn.transition = null;
    try {
      le = 1, no(e, t, n, r);
    } finally {
      le = l, mn.transition = o;
    }
  }
  function kc(e, t, n, r) {
    var l = le, o = mn.transition;
    mn.transition = null;
    try {
      le = 4, no(e, t, n, r);
    } finally {
      le = l, mn.transition = o;
    }
  }
  function no(e, t, n, r) {
    if (Ar) {
      var l = ro(e, t, n, r);
      if (l === null) xo(e, t, r, $r, n), yu(e, r);
      else if (gc(l, e, t, n, r)) r.stopPropagation();
      else if (yu(e, r), t & 4 && -1 < vc.indexOf(e)) {
        for (; l !== null; ) {
          var o = ur(l);
          if (o !== null && mu(o), o = ro(e, t, n, r), o === null && xo(e, t, r, $r, n), o === l) break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else xo(e, t, r, null, n);
    }
  }
  var $r = null;
  function ro(e, t, n, r) {
    if ($r = null, e = Ql(r), e = Jt(e), e !== null) if (t = Zt(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = lu(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return $r = e, null;
  }
  function xu(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (uc()) {
          case Zl:
            return 1;
          case cu:
            return 4;
          case Rr:
          case sc:
            return 16;
          case fu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ft = null, lo = null, Ur = null;
  function Su() {
    if (Ur) return Ur;
    var e, t = lo, n = t.length, r, l = "value" in Ft ? Ft.value : Ft.textContent, o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
    return Ur = l.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Hr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Br() {
    return !0;
  }
  function _u() {
    return !1;
  }
  function Xe(e) {
    function t(n, r, l, o, i) {
      this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
      for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Br : _u, this.isPropagationStopped = _u, this;
    }
    return P(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Br);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Br);
    }, persist: function() {
    }, isPersistent: Br }), t;
  }
  var hn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, oo = Xe(hn), Zn = P({}, hn, { view: 0, detail: 0 }), xc = Xe(Zn), io, uo, Jn, Vr = P({}, Zn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ao, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Jn && (Jn && e.type === "mousemove" ? (io = e.screenX - Jn.screenX, uo = e.screenY - Jn.screenY) : uo = io = 0, Jn = e), io);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : uo;
  } }), Eu = Xe(Vr), Sc = P({}, Vr, { dataTransfer: 0 }), _c = Xe(Sc), Ec = P({}, Zn, { relatedTarget: 0 }), so = Xe(Ec), Cc = P({}, hn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Nc = Xe(Cc), zc = P({}, hn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Pc = Xe(zc), jc = P({}, hn, { data: 0 }), Cu = Xe(jc), Tc = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Rc = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Lc = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Oc(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Lc[e]) ? !!t[e] : !1;
  }
  function ao() {
    return Oc;
  }
  var Mc = P({}, Zn, { key: function(e) {
    if (e.key) {
      var t = Tc[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Hr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Rc[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ao, charCode: function(e) {
    return e.type === "keypress" ? Hr(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Hr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Fc = Xe(Mc), Dc = P({}, Vr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Nu = Xe(Dc), Ic = P({}, Zn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ao }), Ac = Xe(Ic), $c = P({}, hn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Uc = Xe($c), Hc = P({}, Vr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Bc = Xe(Hc), Vc = [9, 13, 27, 32], co = U && "CompositionEvent" in window, qn = null;
  U && "documentMode" in document && (qn = document.documentMode);
  var Wc = U && "TextEvent" in window && !qn, zu = U && (!co || qn && 8 < qn && 11 >= qn), Pu = " ", ju = !1;
  function Tu(e, t) {
    switch (e) {
      case "keyup":
        return Vc.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ru(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var vn = !1;
  function Qc(e, t) {
    switch (e) {
      case "compositionend":
        return Ru(t);
      case "keypress":
        return t.which !== 32 ? null : (ju = !0, Pu);
      case "textInput":
        return e = t.data, e === Pu && ju ? null : e;
      default:
        return null;
    }
  }
  function Kc(e, t) {
    if (vn) return e === "compositionend" || !co && Tu(e, t) ? (e = Su(), Ur = lo = Ft = null, vn = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return zu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Gc = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Lu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Gc[e.type] : t === "textarea";
  }
  function Ou(e, t, n, r) {
    bi(r), t = Yr(t, "onChange"), 0 < t.length && (n = new oo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var bn = null, er = null;
  function Yc(e) {
    Ju(e, 0);
  }
  function Wr(e) {
    var t = xn(e);
    if (Hi(t)) return e;
  }
  function Xc(e, t) {
    if (e === "change") return t;
  }
  var Mu = !1;
  if (U) {
    var fo;
    if (U) {
      var po = "oninput" in document;
      if (!po) {
        var Fu = document.createElement("div");
        Fu.setAttribute("oninput", "return;"), po = typeof Fu.oninput == "function";
      }
      fo = po;
    } else fo = !1;
    Mu = fo && (!document.documentMode || 9 < document.documentMode);
  }
  function Du() {
    bn && (bn.detachEvent("onpropertychange", Iu), er = bn = null);
  }
  function Iu(e) {
    if (e.propertyName === "value" && Wr(er)) {
      var t = [];
      Ou(t, er, e, Ql(e)), ru(Yc, t);
    }
  }
  function Zc(e, t, n) {
    e === "focusin" ? (Du(), bn = t, er = n, bn.attachEvent("onpropertychange", Iu)) : e === "focusout" && Du();
  }
  function Jc(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Wr(er);
  }
  function qc(e, t) {
    if (e === "click") return Wr(t);
  }
  function bc(e, t) {
    if (e === "input" || e === "change") return Wr(t);
  }
  function ef(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ut = typeof Object.is == "function" ? Object.is : ef;
  function tr(e, t) {
    if (ut(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!F.call(t, l) || !ut(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Au(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $u(e, t) {
    var n = Au(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Au(n);
    }
  }
  function Uu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Uu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Hu() {
    for (var e = window, t = zr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = zr(e.document);
    }
    return t;
  }
  function mo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function tf(e) {
    var t = Hu(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Uu(n.ownerDocument.documentElement, n)) {
      if (r !== null && mo(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = n.textContent.length, o = Math.min(r.start, l);
          r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = $u(n, o);
          var i = $u(
            n,
            r
          );
          l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var nf = U && "documentMode" in document && 11 >= document.documentMode, gn = null, ho = null, nr = null, vo = !1;
  function Bu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    vo || gn == null || gn !== zr(r) || (r = gn, "selectionStart" in r && mo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), nr && tr(nr, r) || (nr = r, r = Yr(ho, "onSelect"), 0 < r.length && (t = new oo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = gn)));
  }
  function Qr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var yn = { animationend: Qr("Animation", "AnimationEnd"), animationiteration: Qr("Animation", "AnimationIteration"), animationstart: Qr("Animation", "AnimationStart"), transitionend: Qr("Transition", "TransitionEnd") }, go = {}, Vu = {};
  U && (Vu = document.createElement("div").style, "AnimationEvent" in window || (delete yn.animationend.animation, delete yn.animationiteration.animation, delete yn.animationstart.animation), "TransitionEvent" in window || delete yn.transitionend.transition);
  function Kr(e) {
    if (go[e]) return go[e];
    if (!yn[e]) return e;
    var t = yn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Vu) return go[e] = t[n];
    return e;
  }
  var Wu = Kr("animationend"), Qu = Kr("animationiteration"), Ku = Kr("animationstart"), Gu = Kr("transitionend"), Yu = /* @__PURE__ */ new Map(), Xu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Dt(e, t) {
    Yu.set(e, t), O(t, [e]);
  }
  for (var yo = 0; yo < Xu.length; yo++) {
    var wo = Xu[yo], rf = wo.toLowerCase(), lf = wo[0].toUpperCase() + wo.slice(1);
    Dt(rf, "on" + lf);
  }
  Dt(Wu, "onAnimationEnd"), Dt(Qu, "onAnimationIteration"), Dt(Ku, "onAnimationStart"), Dt("dblclick", "onDoubleClick"), Dt("focusin", "onFocus"), Dt("focusout", "onBlur"), Dt(Gu, "onTransitionEnd"), E("onMouseEnter", ["mouseout", "mouseover"]), E("onMouseLeave", ["mouseout", "mouseover"]), E("onPointerEnter", ["pointerout", "pointerover"]), E("onPointerLeave", ["pointerout", "pointerover"]), O("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), O("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), O("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), O("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), O("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), O("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var rr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), of = new Set("cancel close invalid load scroll toggle".split(" ").concat(rr));
  function Zu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, rc(r, t, void 0, e), e.currentTarget = null;
  }
  function Ju(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i], s = u.instance, m = u.currentTarget;
          if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
          Zu(l, u, m), o = s;
        }
        else for (i = 0; i < r.length; i++) {
          if (u = r[i], s = u.instance, m = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
          Zu(l, u, m), o = s;
        }
      }
    }
    if (Tr) throw e = Xl, Tr = !1, Xl = null, e;
  }
  function fe(e, t) {
    var n = t[zo];
    n === void 0 && (n = t[zo] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (qu(t, e, 2, !1), n.add(r));
  }
  function ko(e, t, n) {
    var r = 0;
    t && (r |= 4), qu(n, e, r, t);
  }
  var Gr = "_reactListening" + Math.random().toString(36).slice(2);
  function lr(e) {
    if (!e[Gr]) {
      e[Gr] = !0, T.forEach(function(n) {
        n !== "selectionchange" && (of.has(n) || ko(n, !1, e), ko(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Gr] || (t[Gr] = !0, ko("selectionchange", !1, t));
    }
  }
  function qu(e, t, n, r) {
    switch (xu(t)) {
      case 1:
        var l = wc;
        break;
      case 4:
        l = kc;
        break;
      default:
        l = no;
    }
    n = l.bind(null, t, n, e), l = void 0, !Yl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
  }
  function xo(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || u.nodeType === 8 && u.parentNode === l) break;
        if (i === 4) for (i = r.return; i !== null; ) {
          var s = i.tag;
          if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
          i = i.return;
        }
        for (; u !== null; ) {
          if (i = Jt(u), i === null) return;
          if (s = i.tag, s === 5 || s === 6) {
            r = o = i;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
    ru(function() {
      var m = o, k = Ql(n), x = [];
      e: {
        var y = Yu.get(e);
        if (y !== void 0) {
          var N = oo, j = e;
          switch (e) {
            case "keypress":
              if (Hr(n) === 0) break e;
            case "keydown":
            case "keyup":
              N = Fc;
              break;
            case "focusin":
              j = "focus", N = so;
              break;
            case "focusout":
              j = "blur", N = so;
              break;
            case "beforeblur":
            case "afterblur":
              N = so;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Eu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = _c;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = Ac;
              break;
            case Wu:
            case Qu:
            case Ku:
              N = Nc;
              break;
            case Gu:
              N = Uc;
              break;
            case "scroll":
              N = xc;
              break;
            case "wheel":
              N = Bc;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = Pc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = Nu;
          }
          var R = (t & 4) !== 0, xe = !R && e === "scroll", d = R ? y !== null ? y + "Capture" : null : y;
          R = [];
          for (var a = m, p; a !== null; ) {
            p = a;
            var S = p.stateNode;
            if (p.tag === 5 && S !== null && (p = S, d !== null && (S = Un(a, d), S != null && R.push(or(a, S, p)))), xe) break;
            a = a.return;
          }
          0 < R.length && (y = new N(y, j, null, n, k), x.push({ event: y, listeners: R }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (y = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", y && n !== Wl && (j = n.relatedTarget || n.fromElement) && (Jt(j) || j[xt])) break e;
          if ((N || y) && (y = k.window === k ? k : (y = k.ownerDocument) ? y.defaultView || y.parentWindow : window, N ? (j = n.relatedTarget || n.toElement, N = m, j = j ? Jt(j) : null, j !== null && (xe = Zt(j), j !== xe || j.tag !== 5 && j.tag !== 6) && (j = null)) : (N = null, j = m), N !== j)) {
            if (R = Eu, S = "onMouseLeave", d = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (R = Nu, S = "onPointerLeave", d = "onPointerEnter", a = "pointer"), xe = N == null ? y : xn(N), p = j == null ? y : xn(j), y = new R(S, a + "leave", N, n, k), y.target = xe, y.relatedTarget = p, S = null, Jt(k) === m && (R = new R(d, a + "enter", j, n, k), R.target = p, R.relatedTarget = xe, S = R), xe = S, N && j) t: {
              for (R = N, d = j, a = 0, p = R; p; p = wn(p)) a++;
              for (p = 0, S = d; S; S = wn(S)) p++;
              for (; 0 < a - p; ) R = wn(R), a--;
              for (; 0 < p - a; ) d = wn(d), p--;
              for (; a--; ) {
                if (R === d || d !== null && R === d.alternate) break t;
                R = wn(R), d = wn(d);
              }
              R = null;
            }
            else R = null;
            N !== null && bu(x, y, N, R, !1), j !== null && xe !== null && bu(x, xe, j, R, !0);
          }
        }
        e: {
          if (y = m ? xn(m) : window, N = y.nodeName && y.nodeName.toLowerCase(), N === "select" || N === "input" && y.type === "file") var L = Xc;
          else if (Lu(y)) if (Mu) L = bc;
          else {
            L = Jc;
            var D = Zc;
          }
          else (N = y.nodeName) && N.toLowerCase() === "input" && (y.type === "checkbox" || y.type === "radio") && (L = qc);
          if (L && (L = L(e, m))) {
            Ou(x, L, n, k);
            break e;
          }
          D && D(e, y, m), e === "focusout" && (D = y._wrapperState) && D.controlled && y.type === "number" && $l(y, "number", y.value);
        }
        switch (D = m ? xn(m) : window, e) {
          case "focusin":
            (Lu(D) || D.contentEditable === "true") && (gn = D, ho = m, nr = null);
            break;
          case "focusout":
            nr = ho = gn = null;
            break;
          case "mousedown":
            vo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vo = !1, Bu(x, n, k);
            break;
          case "selectionchange":
            if (nf) break;
          case "keydown":
          case "keyup":
            Bu(x, n, k);
        }
        var I;
        if (co) e: {
          switch (e) {
            case "compositionstart":
              var B = "onCompositionStart";
              break e;
            case "compositionend":
              B = "onCompositionEnd";
              break e;
            case "compositionupdate":
              B = "onCompositionUpdate";
              break e;
          }
          B = void 0;
        }
        else vn ? Tu(e, n) && (B = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (B = "onCompositionStart");
        B && (zu && n.locale !== "ko" && (vn || B !== "onCompositionStart" ? B === "onCompositionEnd" && vn && (I = Su()) : (Ft = k, lo = "value" in Ft ? Ft.value : Ft.textContent, vn = !0)), D = Yr(m, B), 0 < D.length && (B = new Cu(B, e, null, n, k), x.push({ event: B, listeners: D }), I ? B.data = I : (I = Ru(n), I !== null && (B.data = I)))), (I = Wc ? Qc(e, n) : Kc(e, n)) && (m = Yr(m, "onBeforeInput"), 0 < m.length && (k = new Cu("onBeforeInput", "beforeinput", null, n, k), x.push({ event: k, listeners: m }), k.data = I));
      }
      Ju(x, t);
    });
  }
  function or(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Yr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e, o = l.stateNode;
      l.tag === 5 && o !== null && (l = o, o = Un(e, n), o != null && r.unshift(or(e, o, l)), o = Un(e, t), o != null && r.push(or(e, o, l))), e = e.return;
    }
    return r;
  }
  function wn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function bu(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
      var u = n, s = u.alternate, m = u.stateNode;
      if (s !== null && s === r) break;
      u.tag === 5 && m !== null && (u = m, l ? (s = Un(n, o), s != null && i.unshift(or(n, s, u))) : l || (s = Un(n, o), s != null && i.push(or(n, s, u)))), n = n.return;
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var uf = /\r\n?/g, sf = /\u0000|\uFFFD/g;
  function es(e) {
    return (typeof e == "string" ? e : "" + e).replace(uf, `
`).replace(sf, "");
  }
  function Xr(e, t, n) {
    if (t = es(t), es(e) !== t && n) throw Error(f(425));
  }
  function Zr() {
  }
  var So = null, _o = null;
  function Eo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Co = typeof setTimeout == "function" ? setTimeout : void 0, af = typeof clearTimeout == "function" ? clearTimeout : void 0, ts = typeof Promise == "function" ? Promise : void 0, cf = typeof queueMicrotask == "function" ? queueMicrotask : typeof ts < "u" ? function(e) {
    return ts.resolve(null).then(e).catch(ff);
  } : Co;
  function ff(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function No(e, t) {
    var n = t, r = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), Xn(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = l;
    } while (n);
    Xn(t);
  }
  function It(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function ns(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var kn = Math.random().toString(36).slice(2), vt = "__reactFiber$" + kn, ir = "__reactProps$" + kn, xt = "__reactContainer$" + kn, zo = "__reactEvents$" + kn, df = "__reactListeners$" + kn, pf = "__reactHandles$" + kn;
  function Jt(e) {
    var t = e[vt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[xt] || n[vt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ns(e); e !== null; ) {
          if (n = e[vt]) return n;
          e = ns(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function ur(e) {
    return e = e[vt] || e[xt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function xn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(f(33));
  }
  function Jr(e) {
    return e[ir] || null;
  }
  var Po = [], Sn = -1;
  function At(e) {
    return { current: e };
  }
  function de(e) {
    0 > Sn || (e.current = Po[Sn], Po[Sn] = null, Sn--);
  }
  function se(e, t) {
    Sn++, Po[Sn] = e.current, e.current = t;
  }
  var $t = {}, Me = At($t), Be = At(!1), qt = $t;
  function _n(e, t) {
    var n = e.type.contextTypes;
    if (!n) return $t;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in n) l[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function Ve(e) {
    return e = e.childContextTypes, e != null;
  }
  function qr() {
    de(Be), de(Me);
  }
  function rs(e, t, n) {
    if (Me.current !== $t) throw Error(f(168));
    se(Me, t), se(Be, n);
  }
  function ls(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(f(108, ue(e) || "Unknown", l));
    return P({}, n, r);
  }
  function br(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || $t, qt = Me.current, se(Me, e), se(Be, Be.current), !0;
  }
  function os(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(f(169));
    n ? (e = ls(e, t, qt), r.__reactInternalMemoizedMergedChildContext = e, de(Be), de(Me), se(Me, e)) : de(Be), se(Be, n);
  }
  var St = null, el = !1, jo = !1;
  function is(e) {
    St === null ? St = [e] : St.push(e);
  }
  function mf(e) {
    el = !0, is(e);
  }
  function Ut() {
    if (!jo && St !== null) {
      jo = !0;
      var e = 0, t = le;
      try {
        var n = St;
        for (le = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        St = null, el = !1;
      } catch (l) {
        throw St !== null && (St = St.slice(e + 1)), su(Zl, Ut), l;
      } finally {
        le = t, jo = !1;
      }
    }
    return null;
  }
  var En = [], Cn = 0, tl = null, nl = 0, et = [], tt = 0, bt = null, _t = 1, Et = "";
  function en(e, t) {
    En[Cn++] = nl, En[Cn++] = tl, tl = e, nl = t;
  }
  function us(e, t, n) {
    et[tt++] = _t, et[tt++] = Et, et[tt++] = bt, bt = e;
    var r = _t;
    e = Et;
    var l = 32 - it(r) - 1;
    r &= ~(1 << l), n += 1;
    var o = 32 - it(t) + l;
    if (30 < o) {
      var i = l - l % 5;
      o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, _t = 1 << 32 - it(t) + l | n << l | r, Et = o + e;
    } else _t = 1 << o | n << l | r, Et = e;
  }
  function To(e) {
    e.return !== null && (en(e, 1), us(e, 1, 0));
  }
  function Ro(e) {
    for (; e === tl; ) tl = En[--Cn], En[Cn] = null, nl = En[--Cn], En[Cn] = null;
    for (; e === bt; ) bt = et[--tt], et[tt] = null, Et = et[--tt], et[tt] = null, _t = et[--tt], et[tt] = null;
  }
  var Ze = null, Je = null, me = !1, st = null;
  function ss(e, t) {
    var n = ot(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function as(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ze = e, Je = It(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ze = e, Je = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = bt !== null ? { id: _t, overflow: Et } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ot(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ze = e, Je = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Lo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Oo(e) {
    if (me) {
      var t = Je;
      if (t) {
        var n = t;
        if (!as(e, t)) {
          if (Lo(e)) throw Error(f(418));
          t = It(n.nextSibling);
          var r = Ze;
          t && as(e, t) ? ss(r, n) : (e.flags = e.flags & -4097 | 2, me = !1, Ze = e);
        }
      } else {
        if (Lo(e)) throw Error(f(418));
        e.flags = e.flags & -4097 | 2, me = !1, Ze = e;
      }
    }
  }
  function cs(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Ze = e;
  }
  function rl(e) {
    if (e !== Ze) return !1;
    if (!me) return cs(e), me = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Eo(e.type, e.memoizedProps)), t && (t = Je)) {
      if (Lo(e)) throw fs(), Error(f(418));
      for (; t; ) ss(e, t), t = It(t.nextSibling);
    }
    if (cs(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Je = It(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        Je = null;
      }
    } else Je = Ze ? It(e.stateNode.nextSibling) : null;
    return !0;
  }
  function fs() {
    for (var e = Je; e; ) e = It(e.nextSibling);
  }
  function Nn() {
    Je = Ze = null, me = !1;
  }
  function Mo(e) {
    st === null ? st = [e] : st.push(e);
  }
  var hf = te.ReactCurrentBatchConfig;
  function sr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(f(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(f(147, e));
        var l = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
          var u = l.refs;
          i === null ? delete u[o] : u[o] = i;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(f(284));
      if (!n._owner) throw Error(f(290, e));
    }
    return e;
  }
  function ll(e, t) {
    throw e = Object.prototype.toString.call(t), Error(f(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function ds(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ps(e) {
    function t(d, a) {
      if (e) {
        var p = d.deletions;
        p === null ? (d.deletions = [a], d.flags |= 16) : p.push(a);
      }
    }
    function n(d, a) {
      if (!e) return null;
      for (; a !== null; ) t(d, a), a = a.sibling;
      return null;
    }
    function r(d, a) {
      for (d = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? d.set(a.key, a) : d.set(a.index, a), a = a.sibling;
      return d;
    }
    function l(d, a) {
      return d = Yt(d, a), d.index = 0, d.sibling = null, d;
    }
    function o(d, a, p) {
      return d.index = p, e ? (p = d.alternate, p !== null ? (p = p.index, p < a ? (d.flags |= 2, a) : p) : (d.flags |= 2, a)) : (d.flags |= 1048576, a);
    }
    function i(d) {
      return e && d.alternate === null && (d.flags |= 2), d;
    }
    function u(d, a, p, S) {
      return a === null || a.tag !== 6 ? (a = Ci(p, d.mode, S), a.return = d, a) : (a = l(a, p), a.return = d, a);
    }
    function s(d, a, p, S) {
      var L = p.type;
      return L === we ? k(d, a, p.props.children, S, p.key) : a !== null && (a.elementType === L || typeof L == "object" && L !== null && L.$$typeof === He && ds(L) === a.type) ? (S = l(a, p.props), S.ref = sr(d, a, p), S.return = d, S) : (S = Pl(p.type, p.key, p.props, null, d.mode, S), S.ref = sr(d, a, p), S.return = d, S);
    }
    function m(d, a, p, S) {
      return a === null || a.tag !== 4 || a.stateNode.containerInfo !== p.containerInfo || a.stateNode.implementation !== p.implementation ? (a = Ni(p, d.mode, S), a.return = d, a) : (a = l(a, p.children || []), a.return = d, a);
    }
    function k(d, a, p, S, L) {
      return a === null || a.tag !== 7 ? (a = an(p, d.mode, S, L), a.return = d, a) : (a = l(a, p), a.return = d, a);
    }
    function x(d, a, p) {
      if (typeof a == "string" && a !== "" || typeof a == "number") return a = Ci("" + a, d.mode, p), a.return = d, a;
      if (typeof a == "object" && a !== null) {
        switch (a.$$typeof) {
          case ne:
            return p = Pl(a.type, a.key, a.props, null, d.mode, p), p.ref = sr(d, null, a), p.return = d, p;
          case oe:
            return a = Ni(a, d.mode, p), a.return = d, a;
          case He:
            var S = a._init;
            return x(d, S(a._payload), p);
        }
        if (In(a) || $(a)) return a = an(a, d.mode, p, null), a.return = d, a;
        ll(d, a);
      }
      return null;
    }
    function y(d, a, p, S) {
      var L = a !== null ? a.key : null;
      if (typeof p == "string" && p !== "" || typeof p == "number") return L !== null ? null : u(d, a, "" + p, S);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case ne:
            return p.key === L ? s(d, a, p, S) : null;
          case oe:
            return p.key === L ? m(d, a, p, S) : null;
          case He:
            return L = p._init, y(
              d,
              a,
              L(p._payload),
              S
            );
        }
        if (In(p) || $(p)) return L !== null ? null : k(d, a, p, S, null);
        ll(d, p);
      }
      return null;
    }
    function N(d, a, p, S, L) {
      if (typeof S == "string" && S !== "" || typeof S == "number") return d = d.get(p) || null, u(a, d, "" + S, L);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case ne:
            return d = d.get(S.key === null ? p : S.key) || null, s(a, d, S, L);
          case oe:
            return d = d.get(S.key === null ? p : S.key) || null, m(a, d, S, L);
          case He:
            var D = S._init;
            return N(d, a, p, D(S._payload), L);
        }
        if (In(S) || $(S)) return d = d.get(p) || null, k(a, d, S, L, null);
        ll(a, S);
      }
      return null;
    }
    function j(d, a, p, S) {
      for (var L = null, D = null, I = a, B = a = 0, Pe = null; I !== null && B < p.length; B++) {
        I.index > B ? (Pe = I, I = null) : Pe = I.sibling;
        var b = y(d, I, p[B], S);
        if (b === null) {
          I === null && (I = Pe);
          break;
        }
        e && I && b.alternate === null && t(d, I), a = o(b, a, B), D === null ? L = b : D.sibling = b, D = b, I = Pe;
      }
      if (B === p.length) return n(d, I), me && en(d, B), L;
      if (I === null) {
        for (; B < p.length; B++) I = x(d, p[B], S), I !== null && (a = o(I, a, B), D === null ? L = I : D.sibling = I, D = I);
        return me && en(d, B), L;
      }
      for (I = r(d, I); B < p.length; B++) Pe = N(I, d, B, p[B], S), Pe !== null && (e && Pe.alternate !== null && I.delete(Pe.key === null ? B : Pe.key), a = o(Pe, a, B), D === null ? L = Pe : D.sibling = Pe, D = Pe);
      return e && I.forEach(function(Xt) {
        return t(d, Xt);
      }), me && en(d, B), L;
    }
    function R(d, a, p, S) {
      var L = $(p);
      if (typeof L != "function") throw Error(f(150));
      if (p = L.call(p), p == null) throw Error(f(151));
      for (var D = L = null, I = a, B = a = 0, Pe = null, b = p.next(); I !== null && !b.done; B++, b = p.next()) {
        I.index > B ? (Pe = I, I = null) : Pe = I.sibling;
        var Xt = y(d, I, b.value, S);
        if (Xt === null) {
          I === null && (I = Pe);
          break;
        }
        e && I && Xt.alternate === null && t(d, I), a = o(Xt, a, B), D === null ? L = Xt : D.sibling = Xt, D = Xt, I = Pe;
      }
      if (b.done) return n(
        d,
        I
      ), me && en(d, B), L;
      if (I === null) {
        for (; !b.done; B++, b = p.next()) b = x(d, b.value, S), b !== null && (a = o(b, a, B), D === null ? L = b : D.sibling = b, D = b);
        return me && en(d, B), L;
      }
      for (I = r(d, I); !b.done; B++, b = p.next()) b = N(I, d, B, b.value, S), b !== null && (e && b.alternate !== null && I.delete(b.key === null ? B : b.key), a = o(b, a, B), D === null ? L = b : D.sibling = b, D = b);
      return e && I.forEach(function(Yf) {
        return t(d, Yf);
      }), me && en(d, B), L;
    }
    function xe(d, a, p, S) {
      if (typeof p == "object" && p !== null && p.type === we && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case ne:
            e: {
              for (var L = p.key, D = a; D !== null; ) {
                if (D.key === L) {
                  if (L = p.type, L === we) {
                    if (D.tag === 7) {
                      n(d, D.sibling), a = l(D, p.props.children), a.return = d, d = a;
                      break e;
                    }
                  } else if (D.elementType === L || typeof L == "object" && L !== null && L.$$typeof === He && ds(L) === D.type) {
                    n(d, D.sibling), a = l(D, p.props), a.ref = sr(d, D, p), a.return = d, d = a;
                    break e;
                  }
                  n(d, D);
                  break;
                } else t(d, D);
                D = D.sibling;
              }
              p.type === we ? (a = an(p.props.children, d.mode, S, p.key), a.return = d, d = a) : (S = Pl(p.type, p.key, p.props, null, d.mode, S), S.ref = sr(d, a, p), S.return = d, d = S);
            }
            return i(d);
          case oe:
            e: {
              for (D = p.key; a !== null; ) {
                if (a.key === D) if (a.tag === 4 && a.stateNode.containerInfo === p.containerInfo && a.stateNode.implementation === p.implementation) {
                  n(d, a.sibling), a = l(a, p.children || []), a.return = d, d = a;
                  break e;
                } else {
                  n(d, a);
                  break;
                }
                else t(d, a);
                a = a.sibling;
              }
              a = Ni(p, d.mode, S), a.return = d, d = a;
            }
            return i(d);
          case He:
            return D = p._init, xe(d, a, D(p._payload), S);
        }
        if (In(p)) return j(d, a, p, S);
        if ($(p)) return R(d, a, p, S);
        ll(d, p);
      }
      return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, a !== null && a.tag === 6 ? (n(d, a.sibling), a = l(a, p), a.return = d, d = a) : (n(d, a), a = Ci(p, d.mode, S), a.return = d, d = a), i(d)) : n(d, a);
    }
    return xe;
  }
  var zn = ps(!0), ms = ps(!1), ol = At(null), il = null, Pn = null, Fo = null;
  function Do() {
    Fo = Pn = il = null;
  }
  function Io(e) {
    var t = ol.current;
    de(ol), e._currentValue = t;
  }
  function Ao(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function jn(e, t) {
    il = e, Fo = Pn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (We = !0), e.firstContext = null);
  }
  function nt(e) {
    var t = e._currentValue;
    if (Fo !== e) if (e = { context: e, memoizedValue: t, next: null }, Pn === null) {
      if (il === null) throw Error(f(308));
      Pn = e, il.dependencies = { lanes: 0, firstContext: e };
    } else Pn = Pn.next = e;
    return t;
  }
  var tn = null;
  function $o(e) {
    tn === null ? tn = [e] : tn.push(e);
  }
  function hs(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n, $o(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ct(e, r);
  }
  function Ct(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Ht = !1;
  function Uo(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function vs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Nt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Bt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Z & 2) !== 0) {
      var l = r.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ct(e, n);
    }
    return l = r.interleaved, l === null ? (t.next = t, $o(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ct(e, n);
  }
  function ul(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, bl(e, n);
    }
  }
  function gs(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var l = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? l = o = i : o = o.next = i, n = n.next;
        } while (n !== null);
        o === null ? l = o = t : o = o.next = t;
      } else l = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function sl(e, t, n, r) {
    var l = e.updateQueue;
    Ht = !1;
    var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
    if (u !== null) {
      l.shared.pending = null;
      var s = u, m = s.next;
      s.next = null, i === null ? o = m : i.next = m, i = s;
      var k = e.alternate;
      k !== null && (k = k.updateQueue, u = k.lastBaseUpdate, u !== i && (u === null ? k.firstBaseUpdate = m : u.next = m, k.lastBaseUpdate = s));
    }
    if (o !== null) {
      var x = l.baseState;
      i = 0, k = m = s = null, u = o;
      do {
        var y = u.lane, N = u.eventTime;
        if ((r & y) === y) {
          k !== null && (k = k.next = {
            eventTime: N,
            lane: 0,
            tag: u.tag,
            payload: u.payload,
            callback: u.callback,
            next: null
          });
          e: {
            var j = e, R = u;
            switch (y = t, N = n, R.tag) {
              case 1:
                if (j = R.payload, typeof j == "function") {
                  x = j.call(N, x, y);
                  break e;
                }
                x = j;
                break e;
              case 3:
                j.flags = j.flags & -65537 | 128;
              case 0:
                if (j = R.payload, y = typeof j == "function" ? j.call(N, x, y) : j, y == null) break e;
                x = P({}, x, y);
                break e;
              case 2:
                Ht = !0;
            }
          }
          u.callback !== null && u.lane !== 0 && (e.flags |= 64, y = l.effects, y === null ? l.effects = [u] : y.push(u));
        } else N = { eventTime: N, lane: y, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, k === null ? (m = k = N, s = x) : k = k.next = N, i |= y;
        if (u = u.next, u === null) {
          if (u = l.shared.pending, u === null) break;
          y = u, u = y.next, y.next = null, l.lastBaseUpdate = y, l.shared.pending = null;
        }
      } while (!0);
      if (k === null && (s = x), l.baseState = s, l.firstBaseUpdate = m, l.lastBaseUpdate = k, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          i |= l.lane, l = l.next;
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      ln |= i, e.lanes = i, e.memoizedState = x;
    }
  }
  function ys(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function") throw Error(f(191, l));
        l.call(r);
      }
    }
  }
  var ar = {}, gt = At(ar), cr = At(ar), fr = At(ar);
  function nn(e) {
    if (e === ar) throw Error(f(174));
    return e;
  }
  function Ho(e, t) {
    switch (se(fr, t), se(cr, e), se(gt, ar), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Hl(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Hl(t, e);
    }
    de(gt), se(gt, t);
  }
  function Tn() {
    de(gt), de(cr), de(fr);
  }
  function ws(e) {
    nn(fr.current);
    var t = nn(gt.current), n = Hl(t, e.type);
    t !== n && (se(cr, e), se(gt, n));
  }
  function Bo(e) {
    cr.current === e && (de(gt), de(cr));
  }
  var he = At(0);
  function al(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Vo = [];
  function Wo() {
    for (var e = 0; e < Vo.length; e++) Vo[e]._workInProgressVersionPrimary = null;
    Vo.length = 0;
  }
  var cl = te.ReactCurrentDispatcher, Qo = te.ReactCurrentBatchConfig, rn = 0, ve = null, Ee = null, Ne = null, fl = !1, dr = !1, pr = 0, vf = 0;
  function Fe() {
    throw Error(f(321));
  }
  function Ko(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!ut(e[n], t[n])) return !1;
    return !0;
  }
  function Go(e, t, n, r, l, o) {
    if (rn = o, ve = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, cl.current = e === null || e.memoizedState === null ? kf : xf, e = n(r, l), dr) {
      o = 0;
      do {
        if (dr = !1, pr = 0, 25 <= o) throw Error(f(301));
        o += 1, Ne = Ee = null, t.updateQueue = null, cl.current = Sf, e = n(r, l);
      } while (dr);
    }
    if (cl.current = ml, t = Ee !== null && Ee.next !== null, rn = 0, Ne = Ee = ve = null, fl = !1, t) throw Error(f(300));
    return e;
  }
  function Yo() {
    var e = pr !== 0;
    return pr = 0, e;
  }
  function yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ne === null ? ve.memoizedState = Ne = e : Ne = Ne.next = e, Ne;
  }
  function rt() {
    if (Ee === null) {
      var e = ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ee.next;
    var t = Ne === null ? ve.memoizedState : Ne.next;
    if (t !== null) Ne = t, Ee = e;
    else {
      if (e === null) throw Error(f(310));
      Ee = e, e = { memoizedState: Ee.memoizedState, baseState: Ee.baseState, baseQueue: Ee.baseQueue, queue: Ee.queue, next: null }, Ne === null ? ve.memoizedState = Ne = e : Ne = Ne.next = e;
    }
    return Ne;
  }
  function mr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Xo(e) {
    var t = rt(), n = t.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = e;
    var r = Ee, l = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var i = l.next;
        l.next = o.next, o.next = i;
      }
      r.baseQueue = l = o, n.pending = null;
    }
    if (l !== null) {
      o = l.next, r = r.baseState;
      var u = i = null, s = null, m = o;
      do {
        var k = m.lane;
        if ((rn & k) === k) s !== null && (s = s.next = { lane: 0, action: m.action, hasEagerState: m.hasEagerState, eagerState: m.eagerState, next: null }), r = m.hasEagerState ? m.eagerState : e(r, m.action);
        else {
          var x = {
            lane: k,
            action: m.action,
            hasEagerState: m.hasEagerState,
            eagerState: m.eagerState,
            next: null
          };
          s === null ? (u = s = x, i = r) : s = s.next = x, ve.lanes |= k, ln |= k;
        }
        m = m.next;
      } while (m !== null && m !== o);
      s === null ? i = r : s.next = u, ut(r, t.memoizedState) || (We = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      l = e;
      do
        o = l.lane, ve.lanes |= o, ln |= o, l = l.next;
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Zo(e) {
    var t = rt(), n = t.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, l = n.pending, o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = l = l.next;
      do
        o = e(o, i.action), i = i.next;
      while (i !== l);
      ut(o, t.memoizedState) || (We = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function ks() {
  }
  function xs(e, t) {
    var n = ve, r = rt(), l = t(), o = !ut(r.memoizedState, l);
    if (o && (r.memoizedState = l, We = !0), r = r.queue, Jo(Es.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Ne !== null && Ne.memoizedState.tag & 1) {
      if (n.flags |= 2048, hr(9, _s.bind(null, n, r, l, t), void 0, null), ze === null) throw Error(f(349));
      (rn & 30) !== 0 || Ss(n, t, l);
    }
    return l;
  }
  function Ss(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ve.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ve.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function _s(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Cs(t) && Ns(e);
  }
  function Es(e, t, n) {
    return n(function() {
      Cs(t) && Ns(e);
    });
  }
  function Cs(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ut(e, n);
    } catch {
      return !0;
    }
  }
  function Ns(e) {
    var t = Ct(e, 1);
    t !== null && dt(t, e, 1, -1);
  }
  function zs(e) {
    var t = yt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: mr, lastRenderedState: e }, t.queue = e, e = e.dispatch = wf.bind(null, ve, e), [t.memoizedState, e];
  }
  function hr(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ve.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ve.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Ps() {
    return rt().memoizedState;
  }
  function dl(e, t, n, r) {
    var l = yt();
    ve.flags |= e, l.memoizedState = hr(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function pl(e, t, n, r) {
    var l = rt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Ee !== null) {
      var i = Ee.memoizedState;
      if (o = i.destroy, r !== null && Ko(r, i.deps)) {
        l.memoizedState = hr(t, n, o, r);
        return;
      }
    }
    ve.flags |= e, l.memoizedState = hr(1 | t, n, o, r);
  }
  function js(e, t) {
    return dl(8390656, 8, e, t);
  }
  function Jo(e, t) {
    return pl(2048, 8, e, t);
  }
  function Ts(e, t) {
    return pl(4, 2, e, t);
  }
  function Rs(e, t) {
    return pl(4, 4, e, t);
  }
  function Ls(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Os(e, t, n) {
    return n = n != null ? n.concat([e]) : null, pl(4, 4, Ls.bind(null, t, e), n);
  }
  function qo() {
  }
  function Ms(e, t) {
    var n = rt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ko(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Fs(e, t) {
    var n = rt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ko(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Ds(e, t, n) {
    return (rn & 21) === 0 ? (e.baseState && (e.baseState = !1, We = !0), e.memoizedState = n) : (ut(n, t) || (n = du(), ve.lanes |= n, ln |= n, e.baseState = !0), t);
  }
  function gf(e, t) {
    var n = le;
    le = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Qo.transition;
    Qo.transition = {};
    try {
      e(!1), t();
    } finally {
      le = n, Qo.transition = r;
    }
  }
  function Is() {
    return rt().memoizedState;
  }
  function yf(e, t, n) {
    var r = Kt(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, As(e)) $s(t, n);
    else if (n = hs(e, t, n, r), n !== null) {
      var l = $e();
      dt(n, e, r, l), Us(n, t, r);
    }
  }
  function wf(e, t, n) {
    var r = Kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (As(e)) $s(t, l);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var i = t.lastRenderedState, u = o(i, n);
        if (l.hasEagerState = !0, l.eagerState = u, ut(u, i)) {
          var s = t.interleaved;
          s === null ? (l.next = l, $o(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
      n = hs(e, t, l, r), n !== null && (l = $e(), dt(n, e, r, l), Us(n, t, r));
    }
  }
  function As(e) {
    var t = e.alternate;
    return e === ve || t !== null && t === ve;
  }
  function $s(e, t) {
    dr = fl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Us(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, bl(e, n);
    }
  }
  var ml = { readContext: nt, useCallback: Fe, useContext: Fe, useEffect: Fe, useImperativeHandle: Fe, useInsertionEffect: Fe, useLayoutEffect: Fe, useMemo: Fe, useReducer: Fe, useRef: Fe, useState: Fe, useDebugValue: Fe, useDeferredValue: Fe, useTransition: Fe, useMutableSource: Fe, useSyncExternalStore: Fe, useId: Fe, unstable_isNewReconciler: !1 }, kf = { readContext: nt, useCallback: function(e, t) {
    return yt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: nt, useEffect: js, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, dl(
      4194308,
      4,
      Ls.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return dl(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return dl(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = yt();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = yt();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = yf.bind(null, ve, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = yt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: zs, useDebugValue: qo, useDeferredValue: function(e) {
    return yt().memoizedState = e;
  }, useTransition: function() {
    var e = zs(!1), t = e[0];
    return e = gf.bind(null, e[1]), yt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ve, l = yt();
    if (me) {
      if (n === void 0) throw Error(f(407));
      n = n();
    } else {
      if (n = t(), ze === null) throw Error(f(349));
      (rn & 30) !== 0 || Ss(r, t, n);
    }
    l.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return l.queue = o, js(Es.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, hr(9, _s.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = yt(), t = ze.identifierPrefix;
    if (me) {
      var n = Et, r = _t;
      n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = pr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = vf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, xf = {
    readContext: nt,
    useCallback: Ms,
    useContext: nt,
    useEffect: Jo,
    useImperativeHandle: Os,
    useInsertionEffect: Ts,
    useLayoutEffect: Rs,
    useMemo: Fs,
    useReducer: Xo,
    useRef: Ps,
    useState: function() {
      return Xo(mr);
    },
    useDebugValue: qo,
    useDeferredValue: function(e) {
      var t = rt();
      return Ds(t, Ee.memoizedState, e);
    },
    useTransition: function() {
      var e = Xo(mr)[0], t = rt().memoizedState;
      return [e, t];
    },
    useMutableSource: ks,
    useSyncExternalStore: xs,
    useId: Is,
    unstable_isNewReconciler: !1
  }, Sf = { readContext: nt, useCallback: Ms, useContext: nt, useEffect: Jo, useImperativeHandle: Os, useInsertionEffect: Ts, useLayoutEffect: Rs, useMemo: Fs, useReducer: Zo, useRef: Ps, useState: function() {
    return Zo(mr);
  }, useDebugValue: qo, useDeferredValue: function(e) {
    var t = rt();
    return Ee === null ? t.memoizedState = e : Ds(t, Ee.memoizedState, e);
  }, useTransition: function() {
    var e = Zo(mr)[0], t = rt().memoizedState;
    return [e, t];
  }, useMutableSource: ks, useSyncExternalStore: xs, useId: Is, unstable_isNewReconciler: !1 };
  function at(e, t) {
    if (e && e.defaultProps) {
      t = P({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function bo(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : P({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var hl = { isMounted: function(e) {
    return (e = e._reactInternals) ? Zt(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = $e(), l = Kt(e), o = Nt(r, l);
    o.payload = t, n != null && (o.callback = n), t = Bt(e, o, l), t !== null && (dt(t, e, l, r), ul(t, e, l));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = $e(), l = Kt(e), o = Nt(r, l);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Bt(e, o, l), t !== null && (dt(t, e, l, r), ul(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = $e(), r = Kt(e), l = Nt(n, r);
    l.tag = 2, t != null && (l.callback = t), t = Bt(e, l, r), t !== null && (dt(t, e, r, n), ul(t, e, r));
  } };
  function Hs(e, t, n, r, l, o, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !tr(n, r) || !tr(l, o) : !0;
  }
  function Bs(e, t, n) {
    var r = !1, l = $t, o = t.contextType;
    return typeof o == "object" && o !== null ? o = nt(o) : (l = Ve(t) ? qt : Me.current, r = t.contextTypes, o = (r = r != null) ? _n(e, l) : $t), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = hl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function Vs(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && hl.enqueueReplaceState(t, t.state, null);
  }
  function ei(e, t, n, r) {
    var l = e.stateNode;
    l.props = n, l.state = e.memoizedState, l.refs = {}, Uo(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? l.context = nt(o) : (o = Ve(t) ? qt : Me.current, l.context = _n(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (bo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && hl.enqueueReplaceState(l, l.state, null), sl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Rn(e, t) {
    try {
      var n = "", r = t;
      do
        n += J(r), r = r.return;
      while (r);
      var l = n;
    } catch (o) {
      l = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function ti(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function ni(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var _f = typeof WeakMap == "function" ? WeakMap : Map;
  function Ws(e, t, n) {
    n = Nt(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      Sl || (Sl = !0, gi = r), ni(e, t);
    }, n;
  }
  function Qs(e, t, n) {
    n = Nt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      n.payload = function() {
        return r(l);
      }, n.callback = function() {
        ni(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      ni(e, t), typeof r != "function" && (Wt === null ? Wt = /* @__PURE__ */ new Set([this]) : Wt.add(this));
      var i = t.stack;
      this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
    }), n;
  }
  function Ks(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new _f();
      var l = /* @__PURE__ */ new Set();
      r.set(t, l);
    } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
    l.has(n) || (l.add(n), e = If.bind(null, e, t, n), t.then(e, e));
  }
  function Gs(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ys(e, t, n, r, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Nt(-1, 1), t.tag = 2, Bt(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Ef = te.ReactCurrentOwner, We = !1;
  function Ae(e, t, n, r) {
    t.child = e === null ? ms(t, null, n, r) : zn(t, e.child, n, r);
  }
  function Xs(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return jn(t, l), r = Go(e, t, n, r, o, l), n = Yo(), e !== null && !We ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, zt(e, t, l)) : (me && n && To(t), t.flags |= 1, Ae(e, t, r, l), t.child);
  }
  function Zs(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Ei(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Js(e, t, o, r, l)) : (e = Pl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & l) === 0) {
      var i = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : tr, n(i, r) && e.ref === t.ref) return zt(e, t, l);
    }
    return t.flags |= 1, e = Yt(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Js(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (tr(o, r) && e.ref === t.ref) if (We = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (We = !0);
      else return t.lanes = e.lanes, zt(e, t, l);
    }
    return ri(e, t, n, r, l);
  }
  function qs(e, t, n) {
    var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, se(On, qe), qe |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, se(On, qe), qe |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, se(On, qe), qe |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, se(On, qe), qe |= r;
    return Ae(e, t, l, n), t.child;
  }
  function bs(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ri(e, t, n, r, l) {
    var o = Ve(n) ? qt : Me.current;
    return o = _n(t, o), jn(t, l), n = Go(e, t, n, r, o, l), r = Yo(), e !== null && !We ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, zt(e, t, l)) : (me && r && To(t), t.flags |= 1, Ae(e, t, n, l), t.child);
  }
  function ea(e, t, n, r, l) {
    if (Ve(n)) {
      var o = !0;
      br(t);
    } else o = !1;
    if (jn(t, l), t.stateNode === null) gl(e, t), Bs(t, n, r), ei(t, n, r, l), r = !0;
    else if (e === null) {
      var i = t.stateNode, u = t.memoizedProps;
      i.props = u;
      var s = i.context, m = n.contextType;
      typeof m == "object" && m !== null ? m = nt(m) : (m = Ve(n) ? qt : Me.current, m = _n(t, m));
      var k = n.getDerivedStateFromProps, x = typeof k == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      x || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== m) && Vs(t, i, r, m), Ht = !1;
      var y = t.memoizedState;
      i.state = y, sl(t, r, i, l), s = t.memoizedState, u !== r || y !== s || Be.current || Ht ? (typeof k == "function" && (bo(t, n, k, r), s = t.memoizedState), (u = Ht || Hs(t, n, u, r, y, s, m)) ? (x || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = m, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      i = t.stateNode, vs(e, t), u = t.memoizedProps, m = t.type === t.elementType ? u : at(t.type, u), i.props = m, x = t.pendingProps, y = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = nt(s) : (s = Ve(n) ? qt : Me.current, s = _n(t, s));
      var N = n.getDerivedStateFromProps;
      (k = typeof N == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== x || y !== s) && Vs(t, i, r, s), Ht = !1, y = t.memoizedState, i.state = y, sl(t, r, i, l);
      var j = t.memoizedState;
      u !== x || y !== j || Be.current || Ht ? (typeof N == "function" && (bo(t, n, N, r), j = t.memoizedState), (m = Ht || Hs(t, n, m, r, y, j, s) || !1) ? (k || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, j, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, j, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && y === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && y === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = j), i.props = r, i.state = j, i.context = s, r = m) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && y === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && y === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return li(e, t, n, r, o, l);
  }
  function li(e, t, n, r, l, o) {
    bs(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && os(t, n, !1), zt(e, t, o);
    r = t.stateNode, Ef.current = t;
    var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && i ? (t.child = zn(t, e.child, null, o), t.child = zn(t, null, u, o)) : Ae(e, t, u, o), t.memoizedState = r.state, l && os(t, n, !0), t.child;
  }
  function ta(e) {
    var t = e.stateNode;
    t.pendingContext ? rs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && rs(e, t.context, !1), Ho(e, t.containerInfo);
  }
  function na(e, t, n, r, l) {
    return Nn(), Mo(l), t.flags |= 256, Ae(e, t, n, r), t.child;
  }
  var oi = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ii(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ra(e, t, n) {
    var r = t.pendingProps, l = he.current, o = !1, i = (t.flags & 128) !== 0, u;
    if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), se(he, l & 1), e === null)
      return Oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = jl(i, r, 0, null), e = an(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = ii(n), t.memoizedState = oi, e) : ui(t, i));
    if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Cf(e, t, i, r, u, l, n);
    if (o) {
      o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
      var s = { mode: "hidden", children: r.children };
      return (i & 1) === 0 && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Yt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = Yt(u, o) : (o = an(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? ii(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = oi, r;
    }
    return o = e.child, e = o.sibling, r = Yt(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function ui(e, t) {
    return t = jl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function vl(e, t, n, r) {
    return r !== null && Mo(r), zn(t, e.child, null, n), e = ui(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Cf(e, t, n, r, l, o, i) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = ti(Error(f(422))), vl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = jl({ mode: "visible", children: r.children }, l, 0, null), o = an(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && zn(t, e.child, null, i), t.child.memoizedState = ii(i), t.memoizedState = oi, o);
    if ((t.mode & 1) === 0) return vl(e, t, i, null);
    if (l.data === "$!") {
      if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
      return r = u, o = Error(f(419)), r = ti(o, r, void 0), vl(e, t, i, r);
    }
    if (u = (i & e.childLanes) !== 0, We || u) {
      if (r = ze, r !== null) {
        switch (i & -i) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ct(e, l), dt(r, e, l, -1));
      }
      return _i(), r = ti(Error(f(421))), vl(e, t, i, r);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Af.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Je = It(l.nextSibling), Ze = t, me = !0, st = null, e !== null && (et[tt++] = _t, et[tt++] = Et, et[tt++] = bt, _t = e.id, Et = e.overflow, bt = t), t = ui(t, r.children), t.flags |= 4096, t);
  }
  function la(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Ao(e.return, t, n);
  }
  function si(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
  }
  function oa(e, t, n) {
    var r = t.pendingProps, l = r.revealOrder, o = r.tail;
    if (Ae(e, t, r.children, n), r = he.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && la(e, n, t);
        else if (e.tag === 19) la(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (se(he, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && al(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), si(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && al(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        si(t, !0, n, null, o);
        break;
      case "together":
        si(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function gl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function zt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ln |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(f(153));
    if (t.child !== null) {
      for (e = t.child, n = Yt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Yt(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Nf(e, t, n) {
    switch (t.tag) {
      case 3:
        ta(t), Nn();
        break;
      case 5:
        ws(t);
        break;
      case 1:
        Ve(t.type) && br(t);
        break;
      case 4:
        Ho(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, l = t.memoizedProps.value;
        se(ol, r._currentValue), r._currentValue = l;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (se(he, he.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? ra(e, t, n) : (se(he, he.current & 1), e = zt(e, t, n), e !== null ? e.sibling : null);
        se(he, he.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return oa(e, t, n);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), se(he, he.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, qs(e, t, n);
    }
    return zt(e, t, n);
  }
  var ia, ai, ua, sa;
  ia = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, ai = function() {
  }, ua = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
      e = t.stateNode, nn(gt.current);
      var o = null;
      switch (n) {
        case "input":
          l = Il(e, l), r = Il(e, r), o = [];
          break;
        case "select":
          l = P({}, l, { value: void 0 }), r = P({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          l = Ul(e, l), r = Ul(e, r), o = [];
          break;
        default:
          typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Zr);
      }
      Bl(n, r);
      var i;
      n = null;
      for (m in l) if (!r.hasOwnProperty(m) && l.hasOwnProperty(m) && l[m] != null) if (m === "style") {
        var u = l[m];
        for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
      } else m !== "dangerouslySetInnerHTML" && m !== "children" && m !== "suppressContentEditableWarning" && m !== "suppressHydrationWarning" && m !== "autoFocus" && (_.hasOwnProperty(m) ? o || (o = []) : (o = o || []).push(m, null));
      for (m in r) {
        var s = r[m];
        if (u = l?.[m], r.hasOwnProperty(m) && s !== u && (s != null || u != null)) if (m === "style") if (u) {
          for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
          for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
        } else n || (o || (o = []), o.push(
          m,
          n
        )), n = s;
        else m === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(m, s)) : m === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(m, "" + s) : m !== "suppressContentEditableWarning" && m !== "suppressHydrationWarning" && (_.hasOwnProperty(m) ? (s != null && m === "onScroll" && fe("scroll", e), o || u === s || (o = [])) : (o = o || []).push(m, s));
      }
      n && (o = o || []).push("style", n);
      var m = o;
      (t.updateQueue = m) && (t.flags |= 4);
    }
  }, sa = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function vr(e, t) {
    if (!me) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function De(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function zf(e, t, n) {
    var r = t.pendingProps;
    switch (Ro(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return De(t), null;
      case 1:
        return Ve(t.type) && qr(), De(t), null;
      case 3:
        return r = t.stateNode, Tn(), de(Be), de(Me), Wo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (rl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, st !== null && (ki(st), st = null))), ai(e, t), De(t), null;
      case 5:
        Bo(t);
        var l = nn(fr.current);
        if (n = t.type, e !== null && t.stateNode != null) ua(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(f(166));
            return De(t), null;
          }
          if (e = nn(gt.current), rl(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[vt] = t, r[ir] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                fe("cancel", r), fe("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                fe("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < rr.length; l++) fe(rr[l], r);
                break;
              case "source":
                fe("error", r);
                break;
              case "img":
              case "image":
              case "link":
                fe(
                  "error",
                  r
                ), fe("load", r);
                break;
              case "details":
                fe("toggle", r);
                break;
              case "input":
                Bi(r, o), fe("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, fe("invalid", r);
                break;
              case "textarea":
                Qi(r, o), fe("invalid", r);
            }
            Bl(n, o), l = null;
            for (var i in o) if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && Xr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Xr(
                r.textContent,
                u,
                e
              ), l = ["children", "" + u]) : _.hasOwnProperty(i) && u != null && i === "onScroll" && fe("scroll", r);
            }
            switch (n) {
              case "input":
                Nr(r), Wi(r, o, !0);
                break;
              case "textarea":
                Nr(r), Gi(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Zr);
            }
            r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Yi(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[vt] = t, e[ir] = r, ia(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (i = Vl(n, r), n) {
                case "dialog":
                  fe("cancel", e), fe("close", e), l = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  fe("load", e), l = r;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < rr.length; l++) fe(rr[l], e);
                  l = r;
                  break;
                case "source":
                  fe("error", e), l = r;
                  break;
                case "img":
                case "image":
                case "link":
                  fe(
                    "error",
                    e
                  ), fe("load", e), l = r;
                  break;
                case "details":
                  fe("toggle", e), l = r;
                  break;
                case "input":
                  Bi(e, r), l = Il(e, r), fe("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, l = P({}, r, { value: void 0 }), fe("invalid", e);
                  break;
                case "textarea":
                  Qi(e, r), l = Ul(e, r), fe("invalid", e);
                  break;
                default:
                  l = r;
              }
              Bl(n, l), u = l;
              for (o in u) if (u.hasOwnProperty(o)) {
                var s = u[o];
                o === "style" ? Ji(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Xi(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && An(e, s) : typeof s == "number" && An(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (_.hasOwnProperty(o) ? s != null && o === "onScroll" && fe("scroll", e) : s != null && ie(e, o, s, i));
              }
              switch (n) {
                case "input":
                  Nr(e), Wi(e, r, !1);
                  break;
                case "textarea":
                  Nr(e), Gi(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + re(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? fn(e, !!r.multiple, o, !1) : r.defaultValue != null && fn(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Zr);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return De(t), null;
      case 6:
        if (e && t.stateNode != null) sa(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(f(166));
          if (n = nn(fr.current), nn(gt.current), rl(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[vt] = t, (o = r.nodeValue !== n) && (e = Ze, e !== null)) switch (e.tag) {
              case 3:
                Xr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Xr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[vt] = t, t.stateNode = r;
        }
        return De(t), null;
      case 13:
        if (de(he), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (me && Je !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) fs(), Nn(), t.flags |= 98560, o = !1;
          else if (o = rl(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(f(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(f(317));
              o[vt] = t;
            } else Nn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            De(t), o = !1;
          } else st !== null && (ki(st), st = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (he.current & 1) !== 0 ? Ce === 0 && (Ce = 3) : _i())), t.updateQueue !== null && (t.flags |= 4), De(t), null);
      case 4:
        return Tn(), ai(e, t), e === null && lr(t.stateNode.containerInfo), De(t), null;
      case 10:
        return Io(t.type._context), De(t), null;
      case 17:
        return Ve(t.type) && qr(), De(t), null;
      case 19:
        if (de(he), o = t.memoizedState, o === null) return De(t), null;
        if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) vr(o, !1);
        else {
          if (Ce !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (i = al(e), i !== null) {
              for (t.flags |= 128, vr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return se(he, he.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && ke() > Mn && (t.flags |= 128, r = !0, vr(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = al(i), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), vr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !me) return De(t), null;
          } else 2 * ke() - o.renderingStartTime > Mn && n !== 1073741824 && (t.flags |= 128, r = !0, vr(o, !1), t.lanes = 4194304);
          o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ke(), t.sibling = null, n = he.current, se(he, r ? n & 1 | 2 : n & 1), t) : (De(t), null);
      case 22:
      case 23:
        return Si(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (qe & 1073741824) !== 0 && (De(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : De(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(f(156, t.tag));
  }
  function Pf(e, t) {
    switch (Ro(t), t.tag) {
      case 1:
        return Ve(t.type) && qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Tn(), de(Be), de(Me), Wo(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Bo(t), null;
      case 13:
        if (de(he), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(f(340));
          Nn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return de(he), null;
      case 4:
        return Tn(), null;
      case 10:
        return Io(t.type._context), null;
      case 22:
      case 23:
        return Si(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var yl = !1, Ie = !1, jf = typeof WeakSet == "function" ? WeakSet : Set, z = null;
  function Ln(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      ye(e, t, r);
    }
    else n.current = null;
  }
  function ci(e, t, n) {
    try {
      n();
    } catch (r) {
      ye(e, t, r);
    }
  }
  var aa = !1;
  function Tf(e, t) {
    if (So = Ar, e = Hu(), mo(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0, u = -1, s = -1, m = 0, k = 0, x = e, y = null;
          t: for (; ; ) {
            for (var N; x !== n || l !== 0 && x.nodeType !== 3 || (u = i + l), x !== o || r !== 0 && x.nodeType !== 3 || (s = i + r), x.nodeType === 3 && (i += x.nodeValue.length), (N = x.firstChild) !== null; )
              y = x, x = N;
            for (; ; ) {
              if (x === e) break t;
              if (y === n && ++m === l && (u = i), y === o && ++k === r && (s = i), (N = x.nextSibling) !== null) break;
              x = y, y = x.parentNode;
            }
            x = N;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (_o = { focusedElem: e, selectionRange: n }, Ar = !1, z = t; z !== null; ) if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
    else for (; z !== null; ) {
      t = z;
      try {
        var j = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (j !== null) {
              var R = j.memoizedProps, xe = j.memoizedState, d = t.stateNode, a = d.getSnapshotBeforeUpdate(t.elementType === t.type ? R : at(t.type, R), xe);
              d.__reactInternalSnapshotBeforeUpdate = a;
            }
            break;
          case 3:
            var p = t.stateNode.containerInfo;
            p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(f(163));
        }
      } catch (S) {
        ye(t, t.return, S);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, z = e;
        break;
      }
      z = t.return;
    }
    return j = aa, aa = !1, j;
  }
  function gr(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && ci(t, n, o);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function wl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function fi(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function ca(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ca(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[vt], delete t[ir], delete t[zo], delete t[df], delete t[pf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function fa(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function da(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || fa(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function di(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Zr));
    else if (r !== 4 && (e = e.child, e !== null)) for (di(e, t, n), e = e.sibling; e !== null; ) di(e, t, n), e = e.sibling;
  }
  function pi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (pi(e, t, n), e = e.sibling; e !== null; ) pi(e, t, n), e = e.sibling;
  }
  var Te = null, ct = !1;
  function Vt(e, t, n) {
    for (n = n.child; n !== null; ) pa(e, t, n), n = n.sibling;
  }
  function pa(e, t, n) {
    if (ht && typeof ht.onCommitFiberUnmount == "function") try {
      ht.onCommitFiberUnmount(Lr, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        Ie || Ln(n, t);
      case 6:
        var r = Te, l = ct;
        Te = null, Vt(e, t, n), Te = r, ct = l, Te !== null && (ct ? (e = Te, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Te.removeChild(n.stateNode));
        break;
      case 18:
        Te !== null && (ct ? (e = Te, n = n.stateNode, e.nodeType === 8 ? No(e.parentNode, n) : e.nodeType === 1 && No(e, n), Xn(e)) : No(Te, n.stateNode));
        break;
      case 4:
        r = Te, l = ct, Te = n.stateNode.containerInfo, ct = !0, Vt(e, t, n), Te = r, ct = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          l = r = r.next;
          do {
            var o = l, i = o.destroy;
            o = o.tag, i !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && ci(n, t, i), l = l.next;
          } while (l !== r);
        }
        Vt(e, t, n);
        break;
      case 1:
        if (!Ie && (Ln(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (u) {
          ye(n, t, u);
        }
        Vt(e, t, n);
        break;
      case 21:
        Vt(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Ie = (r = Ie) || n.memoizedState !== null, Vt(e, t, n), Ie = r) : Vt(e, t, n);
        break;
      default:
        Vt(e, t, n);
    }
  }
  function ma(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new jf()), t.forEach(function(r) {
        var l = $f.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
    }
  }
  function ft(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e, i = t, u = i;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              Te = u.stateNode, ct = !1;
              break e;
            case 3:
              Te = u.stateNode.containerInfo, ct = !0;
              break e;
            case 4:
              Te = u.stateNode.containerInfo, ct = !0;
              break e;
          }
          u = u.return;
        }
        if (Te === null) throw Error(f(160));
        pa(o, i, l), Te = null, ct = !1;
        var s = l.alternate;
        s !== null && (s.return = null), l.return = null;
      } catch (m) {
        ye(l, t, m);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ha(t, e), t = t.sibling;
  }
  function ha(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ft(t, e), wt(e), r & 4) {
          try {
            gr(3, e, e.return), wl(3, e);
          } catch (R) {
            ye(e, e.return, R);
          }
          try {
            gr(5, e, e.return);
          } catch (R) {
            ye(e, e.return, R);
          }
        }
        break;
      case 1:
        ft(t, e), wt(e), r & 512 && n !== null && Ln(n, n.return);
        break;
      case 5:
        if (ft(t, e), wt(e), r & 512 && n !== null && Ln(n, n.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            An(l, "");
          } catch (R) {
            ye(e, e.return, R);
          }
        }
        if (r & 4 && (l = e.stateNode, l != null)) {
          var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
          if (e.updateQueue = null, s !== null) try {
            u === "input" && o.type === "radio" && o.name != null && Vi(l, o), Vl(u, i);
            var m = Vl(u, o);
            for (i = 0; i < s.length; i += 2) {
              var k = s[i], x = s[i + 1];
              k === "style" ? Ji(l, x) : k === "dangerouslySetInnerHTML" ? Xi(l, x) : k === "children" ? An(l, x) : ie(l, k, x, m);
            }
            switch (u) {
              case "input":
                Al(l, o);
                break;
              case "textarea":
                Ki(l, o);
                break;
              case "select":
                var y = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var N = o.value;
                N != null ? fn(l, !!o.multiple, N, !1) : y !== !!o.multiple && (o.defaultValue != null ? fn(
                  l,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : fn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[ir] = o;
          } catch (R) {
            ye(e, e.return, R);
          }
        }
        break;
      case 6:
        if (ft(t, e), wt(e), r & 4) {
          if (e.stateNode === null) throw Error(f(162));
          l = e.stateNode, o = e.memoizedProps;
          try {
            l.nodeValue = o;
          } catch (R) {
            ye(e, e.return, R);
          }
        }
        break;
      case 3:
        if (ft(t, e), wt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Xn(t.containerInfo);
        } catch (R) {
          ye(e, e.return, R);
        }
        break;
      case 4:
        ft(t, e), wt(e);
        break;
      case 13:
        ft(t, e), wt(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (vi = ke())), r & 4 && ma(e);
        break;
      case 22:
        if (k = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ie = (m = Ie) || k, ft(t, e), Ie = m) : ft(t, e), wt(e), r & 8192) {
          if (m = e.memoizedState !== null, (e.stateNode.isHidden = m) && !k && (e.mode & 1) !== 0) for (z = e, k = e.child; k !== null; ) {
            for (x = z = k; z !== null; ) {
              switch (y = z, N = y.child, y.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  gr(4, y, y.return);
                  break;
                case 1:
                  Ln(y, y.return);
                  var j = y.stateNode;
                  if (typeof j.componentWillUnmount == "function") {
                    r = y, n = y.return;
                    try {
                      t = r, j.props = t.memoizedProps, j.state = t.memoizedState, j.componentWillUnmount();
                    } catch (R) {
                      ye(r, n, R);
                    }
                  }
                  break;
                case 5:
                  Ln(y, y.return);
                  break;
                case 22:
                  if (y.memoizedState !== null) {
                    ya(x);
                    continue;
                  }
              }
              N !== null ? (N.return = y, z = N) : ya(x);
            }
            k = k.sibling;
          }
          e: for (k = null, x = e; ; ) {
            if (x.tag === 5) {
              if (k === null) {
                k = x;
                try {
                  l = x.stateNode, m ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = x.stateNode, s = x.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = Zi("display", i));
                } catch (R) {
                  ye(e, e.return, R);
                }
              }
            } else if (x.tag === 6) {
              if (k === null) try {
                x.stateNode.nodeValue = m ? "" : x.memoizedProps;
              } catch (R) {
                ye(e, e.return, R);
              }
            } else if ((x.tag !== 22 && x.tag !== 23 || x.memoizedState === null || x === e) && x.child !== null) {
              x.child.return = x, x = x.child;
              continue;
            }
            if (x === e) break e;
            for (; x.sibling === null; ) {
              if (x.return === null || x.return === e) break e;
              k === x && (k = null), x = x.return;
            }
            k === x && (k = null), x.sibling.return = x.return, x = x.sibling;
          }
        }
        break;
      case 19:
        ft(t, e), wt(e), r & 4 && ma(e);
        break;
      case 21:
        break;
      default:
        ft(
          t,
          e
        ), wt(e);
    }
  }
  function wt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (fa(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(f(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (An(l, ""), r.flags &= -33);
            var o = da(e);
            pi(e, o, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo, u = da(e);
            di(e, u, i);
            break;
          default:
            throw Error(f(161));
        }
      } catch (s) {
        ye(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Rf(e, t, n) {
    z = e, va(e);
  }
  function va(e, t, n) {
    for (var r = (e.mode & 1) !== 0; z !== null; ) {
      var l = z, o = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || yl;
        if (!i) {
          var u = l.alternate, s = u !== null && u.memoizedState !== null || Ie;
          u = yl;
          var m = Ie;
          if (yl = i, (Ie = s) && !m) for (z = l; z !== null; ) i = z, s = i.child, i.tag === 22 && i.memoizedState !== null ? wa(l) : s !== null ? (s.return = i, z = s) : wa(l);
          for (; o !== null; ) z = o, va(o), o = o.sibling;
          z = l, yl = u, Ie = m;
        }
        ga(e);
      } else (l.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = l, z = o) : ga(e);
    }
  }
  function ga(e) {
    for (; z !== null; ) {
      var t = z;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ie || wl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ie) if (n === null) r.componentDidMount();
              else {
                var l = t.elementType === t.type ? n.memoizedProps : at(t.type, n.memoizedProps);
                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && ys(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                ys(t, i, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var m = t.alternate;
                if (m !== null) {
                  var k = m.memoizedState;
                  if (k !== null) {
                    var x = k.dehydrated;
                    x !== null && Xn(x);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(f(163));
          }
          Ie || t.flags & 512 && fi(t);
        } catch (y) {
          ye(t, t.return, y);
        }
      }
      if (t === e) {
        z = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, z = n;
        break;
      }
      z = t.return;
    }
  }
  function ya(e) {
    for (; z !== null; ) {
      var t = z;
      if (t === e) {
        z = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, z = n;
        break;
      }
      z = t.return;
    }
  }
  function wa(e) {
    for (; z !== null; ) {
      var t = z;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              wl(4, t);
            } catch (s) {
              ye(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                ye(t, l, s);
              }
            }
            var o = t.return;
            try {
              fi(t);
            } catch (s) {
              ye(t, o, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              fi(t);
            } catch (s) {
              ye(t, i, s);
            }
        }
      } catch (s) {
        ye(t, t.return, s);
      }
      if (t === e) {
        z = null;
        break;
      }
      var u = t.sibling;
      if (u !== null) {
        u.return = t.return, z = u;
        break;
      }
      z = t.return;
    }
  }
  var Lf = Math.ceil, kl = te.ReactCurrentDispatcher, mi = te.ReactCurrentOwner, lt = te.ReactCurrentBatchConfig, Z = 0, ze = null, Se = null, Re = 0, qe = 0, On = At(0), Ce = 0, yr = null, ln = 0, xl = 0, hi = 0, wr = null, Qe = null, vi = 0, Mn = 1 / 0, Pt = null, Sl = !1, gi = null, Wt = null, _l = !1, Qt = null, El = 0, kr = 0, yi = null, Cl = -1, Nl = 0;
  function $e() {
    return (Z & 6) !== 0 ? ke() : Cl !== -1 ? Cl : Cl = ke();
  }
  function Kt(e) {
    return (e.mode & 1) === 0 ? 1 : (Z & 2) !== 0 && Re !== 0 ? Re & -Re : hf.transition !== null ? (Nl === 0 && (Nl = du()), Nl) : (e = le, e !== 0 || (e = window.event, e = e === void 0 ? 16 : xu(e.type)), e);
  }
  function dt(e, t, n, r) {
    if (50 < kr) throw kr = 0, yi = null, Error(f(185));
    Wn(e, n, r), ((Z & 2) === 0 || e !== ze) && (e === ze && ((Z & 2) === 0 && (xl |= n), Ce === 4 && Gt(e, Re)), Ke(e, r), n === 1 && Z === 0 && (t.mode & 1) === 0 && (Mn = ke() + 500, el && Ut()));
  }
  function Ke(e, t) {
    var n = e.callbackNode;
    mc(e, t);
    var r = Fr(e, e === ze ? Re : 0);
    if (r === 0) n !== null && au(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && au(n), t === 1) e.tag === 0 ? mf(xa.bind(null, e)) : is(xa.bind(null, e)), cf(function() {
        (Z & 6) === 0 && Ut();
      }), n = null;
      else {
        switch (pu(r)) {
          case 1:
            n = Zl;
            break;
          case 4:
            n = cu;
            break;
          case 16:
            n = Rr;
            break;
          case 536870912:
            n = fu;
            break;
          default:
            n = Rr;
        }
        n = ja(n, ka.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function ka(e, t) {
    if (Cl = -1, Nl = 0, (Z & 6) !== 0) throw Error(f(327));
    var n = e.callbackNode;
    if (Fn() && e.callbackNode !== n) return null;
    var r = Fr(e, e === ze ? Re : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = zl(e, r);
    else {
      t = r;
      var l = Z;
      Z |= 2;
      var o = _a();
      (ze !== e || Re !== t) && (Pt = null, Mn = ke() + 500, un(e, t));
      do
        try {
          Ff();
          break;
        } catch (u) {
          Sa(e, u);
        }
      while (!0);
      Do(), kl.current = o, Z = l, Se !== null ? t = 0 : (ze = null, Re = 0, t = Ce);
    }
    if (t !== 0) {
      if (t === 2 && (l = Jl(e), l !== 0 && (r = l, t = wi(e, l))), t === 1) throw n = yr, un(e, 0), Gt(e, r), Ke(e, ke()), n;
      if (t === 6) Gt(e, r);
      else {
        if (l = e.current.alternate, (r & 30) === 0 && !Of(l) && (t = zl(e, r), t === 2 && (o = Jl(e), o !== 0 && (r = o, t = wi(e, o))), t === 1)) throw n = yr, un(e, 0), Gt(e, r), Ke(e, ke()), n;
        switch (e.finishedWork = l, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(f(345));
          case 2:
            sn(e, Qe, Pt);
            break;
          case 3:
            if (Gt(e, r), (r & 130023424) === r && (t = vi + 500 - ke(), 10 < t)) {
              if (Fr(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & r) !== r) {
                $e(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Co(sn.bind(null, e, Qe, Pt), t);
              break;
            }
            sn(e, Qe, Pt);
            break;
          case 4:
            if (Gt(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - it(r);
              o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
            }
            if (r = l, r = ke() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Lf(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Co(sn.bind(null, e, Qe, Pt), r);
              break;
            }
            sn(e, Qe, Pt);
            break;
          case 5:
            sn(e, Qe, Pt);
            break;
          default:
            throw Error(f(329));
        }
      }
    }
    return Ke(e, ke()), e.callbackNode === n ? ka.bind(null, e) : null;
  }
  function wi(e, t) {
    var n = wr;
    return e.current.memoizedState.isDehydrated && (un(e, t).flags |= 256), e = zl(e, t), e !== 2 && (t = Qe, Qe = n, t !== null && ki(t)), e;
  }
  function ki(e) {
    Qe === null ? Qe = e : Qe.push.apply(Qe, e);
  }
  function Of(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var l = n[r], o = l.getSnapshot;
          l = l.value;
          try {
            if (!ut(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Gt(e, t) {
    for (t &= ~hi, t &= ~xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - it(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function xa(e) {
    if ((Z & 6) !== 0) throw Error(f(327));
    Fn();
    var t = Fr(e, 0);
    if ((t & 1) === 0) return Ke(e, ke()), null;
    var n = zl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Jl(e);
      r !== 0 && (t = r, n = wi(e, r));
    }
    if (n === 1) throw n = yr, un(e, 0), Gt(e, t), Ke(e, ke()), n;
    if (n === 6) throw Error(f(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, sn(e, Qe, Pt), Ke(e, ke()), null;
  }
  function xi(e, t) {
    var n = Z;
    Z |= 1;
    try {
      return e(t);
    } finally {
      Z = n, Z === 0 && (Mn = ke() + 500, el && Ut());
    }
  }
  function on(e) {
    Qt !== null && Qt.tag === 0 && (Z & 6) === 0 && Fn();
    var t = Z;
    Z |= 1;
    var n = lt.transition, r = le;
    try {
      if (lt.transition = null, le = 1, e) return e();
    } finally {
      le = r, lt.transition = n, Z = t, (Z & 6) === 0 && Ut();
    }
  }
  function Si() {
    qe = On.current, de(On);
  }
  function un(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, af(n)), Se !== null) for (n = Se.return; n !== null; ) {
      var r = n;
      switch (Ro(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && qr();
          break;
        case 3:
          Tn(), de(Be), de(Me), Wo();
          break;
        case 5:
          Bo(r);
          break;
        case 4:
          Tn();
          break;
        case 13:
          de(he);
          break;
        case 19:
          de(he);
          break;
        case 10:
          Io(r.type._context);
          break;
        case 22:
        case 23:
          Si();
      }
      n = n.return;
    }
    if (ze = e, Se = e = Yt(e.current, null), Re = qe = t, Ce = 0, yr = null, hi = xl = ln = 0, Qe = wr = null, tn !== null) {
      for (t = 0; t < tn.length; t++) if (n = tn[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, o = n.pending;
        if (o !== null) {
          var i = o.next;
          o.next = l, r.next = i;
        }
        n.pending = r;
      }
      tn = null;
    }
    return e;
  }
  function Sa(e, t) {
    do {
      var n = Se;
      try {
        if (Do(), cl.current = ml, fl) {
          for (var r = ve.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), r = r.next;
          }
          fl = !1;
        }
        if (rn = 0, Ne = Ee = ve = null, dr = !1, pr = 0, mi.current = null, n === null || n.return === null) {
          Ce = 1, yr = t, Se = null;
          break;
        }
        e: {
          var o = e, i = n.return, u = n, s = t;
          if (t = Re, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
            var m = s, k = u, x = k.tag;
            if ((k.mode & 1) === 0 && (x === 0 || x === 11 || x === 15)) {
              var y = k.alternate;
              y ? (k.updateQueue = y.updateQueue, k.memoizedState = y.memoizedState, k.lanes = y.lanes) : (k.updateQueue = null, k.memoizedState = null);
            }
            var N = Gs(i);
            if (N !== null) {
              N.flags &= -257, Ys(N, i, u, o, t), N.mode & 1 && Ks(o, m, t), t = N, s = m;
              var j = t.updateQueue;
              if (j === null) {
                var R = /* @__PURE__ */ new Set();
                R.add(s), t.updateQueue = R;
              } else j.add(s);
              break e;
            } else {
              if ((t & 1) === 0) {
                Ks(o, m, t), _i();
                break e;
              }
              s = Error(f(426));
            }
          } else if (me && u.mode & 1) {
            var xe = Gs(i);
            if (xe !== null) {
              (xe.flags & 65536) === 0 && (xe.flags |= 256), Ys(xe, i, u, o, t), Mo(Rn(s, u));
              break e;
            }
          }
          o = s = Rn(s, u), Ce !== 4 && (Ce = 2), wr === null ? wr = [o] : wr.push(o), o = i;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var d = Ws(o, s, t);
                gs(o, d);
                break e;
              case 1:
                u = s;
                var a = o.type, p = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (Wt === null || !Wt.has(p)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var S = Qs(o, u, t);
                  gs(o, S);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Ca(n);
      } catch (L) {
        t = L, Se === n && n !== null && (Se = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function _a() {
    var e = kl.current;
    return kl.current = ml, e === null ? ml : e;
  }
  function _i() {
    (Ce === 0 || Ce === 3 || Ce === 2) && (Ce = 4), ze === null || (ln & 268435455) === 0 && (xl & 268435455) === 0 || Gt(ze, Re);
  }
  function zl(e, t) {
    var n = Z;
    Z |= 2;
    var r = _a();
    (ze !== e || Re !== t) && (Pt = null, un(e, t));
    do
      try {
        Mf();
        break;
      } catch (l) {
        Sa(e, l);
      }
    while (!0);
    if (Do(), Z = n, kl.current = r, Se !== null) throw Error(f(261));
    return ze = null, Re = 0, Ce;
  }
  function Mf() {
    for (; Se !== null; ) Ea(Se);
  }
  function Ff() {
    for (; Se !== null && !oc(); ) Ea(Se);
  }
  function Ea(e) {
    var t = Pa(e.alternate, e, qe);
    e.memoizedProps = e.pendingProps, t === null ? Ca(e) : Se = t, mi.current = null;
  }
  function Ca(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = zf(n, t, qe), n !== null) {
          Se = n;
          return;
        }
      } else {
        if (n = Pf(n, t), n !== null) {
          n.flags &= 32767, Se = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Ce = 6, Se = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Se = t;
        return;
      }
      Se = t = e;
    } while (t !== null);
    Ce === 0 && (Ce = 5);
  }
  function sn(e, t, n) {
    var r = le, l = lt.transition;
    try {
      lt.transition = null, le = 1, Df(e, t, n, r);
    } finally {
      lt.transition = l, le = r;
    }
    return null;
  }
  function Df(e, t, n, r) {
    do
      Fn();
    while (Qt !== null);
    if ((Z & 6) !== 0) throw Error(f(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(f(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (hc(e, o), e === ze && (Se = ze = null, Re = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || _l || (_l = !0, ja(Rr, function() {
      return Fn(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = lt.transition, lt.transition = null;
      var i = le;
      le = 1;
      var u = Z;
      Z |= 4, mi.current = null, Tf(e, n), ha(n, e), tf(_o), Ar = !!So, _o = So = null, e.current = n, Rf(n), ic(), Z = u, le = i, lt.transition = o;
    } else e.current = n;
    if (_l && (_l = !1, Qt = e, El = l), o = e.pendingLanes, o === 0 && (Wt = null), ac(n.stateNode), Ke(e, ke()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
    if (Sl) throw Sl = !1, e = gi, gi = null, e;
    return (El & 1) !== 0 && e.tag !== 0 && Fn(), o = e.pendingLanes, (o & 1) !== 0 ? e === yi ? kr++ : (kr = 0, yi = e) : kr = 0, Ut(), null;
  }
  function Fn() {
    if (Qt !== null) {
      var e = pu(El), t = lt.transition, n = le;
      try {
        if (lt.transition = null, le = 16 > e ? 16 : e, Qt === null) var r = !1;
        else {
          if (e = Qt, Qt = null, El = 0, (Z & 6) !== 0) throw Error(f(331));
          var l = Z;
          for (Z |= 4, z = e.current; z !== null; ) {
            var o = z, i = o.child;
            if ((z.flags & 16) !== 0) {
              var u = o.deletions;
              if (u !== null) {
                for (var s = 0; s < u.length; s++) {
                  var m = u[s];
                  for (z = m; z !== null; ) {
                    var k = z;
                    switch (k.tag) {
                      case 0:
                      case 11:
                      case 15:
                        gr(8, k, o);
                    }
                    var x = k.child;
                    if (x !== null) x.return = k, z = x;
                    else for (; z !== null; ) {
                      k = z;
                      var y = k.sibling, N = k.return;
                      if (ca(k), k === m) {
                        z = null;
                        break;
                      }
                      if (y !== null) {
                        y.return = N, z = y;
                        break;
                      }
                      z = N;
                    }
                  }
                }
                var j = o.alternate;
                if (j !== null) {
                  var R = j.child;
                  if (R !== null) {
                    j.child = null;
                    do {
                      var xe = R.sibling;
                      R.sibling = null, R = xe;
                    } while (R !== null);
                  }
                }
                z = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && i !== null) i.return = o, z = i;
            else e: for (; z !== null; ) {
              if (o = z, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  gr(9, o, o.return);
              }
              var d = o.sibling;
              if (d !== null) {
                d.return = o.return, z = d;
                break e;
              }
              z = o.return;
            }
          }
          var a = e.current;
          for (z = a; z !== null; ) {
            i = z;
            var p = i.child;
            if ((i.subtreeFlags & 2064) !== 0 && p !== null) p.return = i, z = p;
            else e: for (i = a; z !== null; ) {
              if (u = z, (u.flags & 2048) !== 0) try {
                switch (u.tag) {
                  case 0:
                  case 11:
                  case 15:
                    wl(9, u);
                }
              } catch (L) {
                ye(u, u.return, L);
              }
              if (u === i) {
                z = null;
                break e;
              }
              var S = u.sibling;
              if (S !== null) {
                S.return = u.return, z = S;
                break e;
              }
              z = u.return;
            }
          }
          if (Z = l, Ut(), ht && typeof ht.onPostCommitFiberRoot == "function") try {
            ht.onPostCommitFiberRoot(Lr, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        le = n, lt.transition = t;
      }
    }
    return !1;
  }
  function Na(e, t, n) {
    t = Rn(n, t), t = Ws(e, t, 1), e = Bt(e, t, 1), t = $e(), e !== null && (Wn(e, 1, t), Ke(e, t));
  }
  function ye(e, t, n) {
    if (e.tag === 3) Na(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Na(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Wt === null || !Wt.has(r))) {
          e = Rn(n, e), e = Qs(t, e, 1), t = Bt(t, e, 1), e = $e(), t !== null && (Wn(t, 1, e), Ke(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function If(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = $e(), e.pingedLanes |= e.suspendedLanes & n, ze === e && (Re & n) === n && (Ce === 4 || Ce === 3 && (Re & 130023424) === Re && 500 > ke() - vi ? un(e, 0) : hi |= n), Ke(e, t);
  }
  function za(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Mr, Mr <<= 1, (Mr & 130023424) === 0 && (Mr = 4194304)));
    var n = $e();
    e = Ct(e, t), e !== null && (Wn(e, t, n), Ke(e, n));
  }
  function Af(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), za(e, n);
  }
  function $f(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(f(314));
    }
    r !== null && r.delete(t), za(e, n);
  }
  var Pa;
  Pa = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Be.current) We = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return We = !1, Nf(e, t, n);
      We = (e.flags & 131072) !== 0;
    }
    else We = !1, me && (t.flags & 1048576) !== 0 && us(t, nl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        gl(e, t), e = t.pendingProps;
        var l = _n(t, Me.current);
        jn(t, n), l = Go(null, t, r, e, l, n);
        var o = Yo();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ve(r) ? (o = !0, br(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Uo(t), l.updater = hl, t.stateNode = l, l._reactInternals = t, ei(t, r, e, n), t = li(null, t, r, !0, o, n)) : (t.tag = 0, me && o && To(t), Ae(null, t, l, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (gl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Hf(r), e = at(r, e), l) {
            case 0:
              t = ri(null, t, r, e, n);
              break e;
            case 1:
              t = ea(null, t, r, e, n);
              break e;
            case 11:
              t = Xs(null, t, r, e, n);
              break e;
            case 14:
              t = Zs(null, t, r, at(r.type, e), n);
              break e;
          }
          throw Error(f(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), ri(e, t, r, l, n);
      case 1:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), ea(e, t, r, l, n);
      case 3:
        e: {
          if (ta(t), e === null) throw Error(f(387));
          r = t.pendingProps, o = t.memoizedState, l = o.element, vs(e, t), sl(t, r, null, n);
          var i = t.memoizedState;
          if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            l = Rn(Error(f(423)), t), t = na(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = Rn(Error(f(424)), t), t = na(e, t, r, n, l);
            break e;
          } else for (Je = It(t.stateNode.containerInfo.firstChild), Ze = t, me = !0, st = null, n = ms(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Nn(), r === l) {
              t = zt(e, t, n);
              break e;
            }
            Ae(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return ws(t), e === null && Oo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Eo(r, l) ? i = null : o !== null && Eo(r, o) && (t.flags |= 32), bs(e, t), Ae(e, t, i, n), t.child;
      case 6:
        return e === null && Oo(t), null;
      case 13:
        return ra(e, t, n);
      case 4:
        return Ho(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = zn(t, null, r, n) : Ae(e, t, r, n), t.child;
      case 11:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), Xs(e, t, r, l, n);
      case 7:
        return Ae(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ae(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ae(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, se(ol, r._currentValue), r._currentValue = i, o !== null) if (ut(o.value, i)) {
            if (o.children === l.children && !Be.current) {
              t = zt(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var u = o.dependencies;
            if (u !== null) {
              i = o.child;
              for (var s = u.firstContext; s !== null; ) {
                if (s.context === r) {
                  if (o.tag === 1) {
                    s = Nt(-1, n & -n), s.tag = 2;
                    var m = o.updateQueue;
                    if (m !== null) {
                      m = m.shared;
                      var k = m.pending;
                      k === null ? s.next = s : (s.next = k.next, k.next = s), m.pending = s;
                    }
                  }
                  o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Ao(
                    o.return,
                    n,
                    t
                  ), u.lanes |= n;
                  break;
                }
                s = s.next;
              }
            } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (i = o.return, i === null) throw Error(f(341));
              i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Ao(i, n, t), i = o.sibling;
            } else i = o.child;
            if (i !== null) i.return = o;
            else for (i = o; i !== null; ) {
              if (i === t) {
                i = null;
                break;
              }
              if (o = i.sibling, o !== null) {
                o.return = i.return, i = o;
                break;
              }
              i = i.return;
            }
            o = i;
          }
          Ae(e, t, l.children, n), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, r = t.pendingProps.children, jn(t, n), l = nt(l), r = r(l), t.flags |= 1, Ae(e, t, r, n), t.child;
      case 14:
        return r = t.type, l = at(r, t.pendingProps), l = at(r.type, l), Zs(e, t, r, l, n);
      case 15:
        return Js(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), gl(e, t), t.tag = 1, Ve(r) ? (e = !0, br(t)) : e = !1, jn(t, n), Bs(t, r, l), ei(t, r, l, n), li(null, t, r, !0, e, n);
      case 19:
        return oa(e, t, n);
      case 22:
        return qs(e, t, n);
    }
    throw Error(f(156, t.tag));
  };
  function ja(e, t) {
    return su(e, t);
  }
  function Uf(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ot(e, t, n, r) {
    return new Uf(e, t, n, r);
  }
  function Ei(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Hf(e) {
    if (typeof e == "function") return Ei(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === je) return 11;
      if (e === mt) return 14;
    }
    return 2;
  }
  function Yt(e, t) {
    var n = e.alternate;
    return n === null ? (n = ot(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function Pl(e, t, n, r, l, o) {
    var i = 2;
    if (r = e, typeof e == "function") Ei(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else e: switch (e) {
      case we:
        return an(n.children, l, o, t);
      case _e:
        i = 8, l |= 8;
        break;
      case pt:
        return e = ot(12, n, t, l | 2), e.elementType = pt, e.lanes = o, e;
      case Oe:
        return e = ot(13, n, t, l), e.elementType = Oe, e.lanes = o, e;
      case Ue:
        return e = ot(19, n, t, l), e.elementType = Ue, e.lanes = o, e;
      case ge:
        return jl(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case be:
            i = 10;
            break e;
          case kt:
            i = 9;
            break e;
          case je:
            i = 11;
            break e;
          case mt:
            i = 14;
            break e;
          case He:
            i = 16, r = null;
            break e;
        }
        throw Error(f(130, e == null ? e : typeof e, ""));
    }
    return t = ot(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function an(e, t, n, r) {
    return e = ot(7, e, r, t), e.lanes = n, e;
  }
  function jl(e, t, n, r) {
    return e = ot(22, e, r, t), e.elementType = ge, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function Ci(e, t, n) {
    return e = ot(6, e, null, t), e.lanes = n, e;
  }
  function Ni(e, t, n) {
    return t = ot(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Bf(e, t, n, r, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ql(0), this.expirationTimes = ql(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ql(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function zi(e, t, n, r, l, o, i, u, s) {
    return e = new Bf(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ot(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Uo(o), e;
  }
  function Vf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: oe, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Ta(e) {
    if (!e) return $t;
    e = e._reactInternals;
    e: {
      if (Zt(e) !== e || e.tag !== 1) throw Error(f(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ve(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(f(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ve(n)) return ls(e, n, t);
    }
    return t;
  }
  function Ra(e, t, n, r, l, o, i, u, s) {
    return e = zi(n, r, !0, e, l, o, i, u, s), e.context = Ta(null), n = e.current, r = $e(), l = Kt(n), o = Nt(r, l), o.callback = t ?? null, Bt(n, o, l), e.current.lanes = l, Wn(e, l, r), Ke(e, r), e;
  }
  function Tl(e, t, n, r) {
    var l = t.current, o = $e(), i = Kt(l);
    return n = Ta(n), t.context === null ? t.context = n : t.pendingContext = n, t = Nt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Bt(l, t, i), e !== null && (dt(e, l, i, o), ul(e, l, i)), i;
  }
  function Rl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function La(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Pi(e, t) {
    La(e, t), (e = e.alternate) && La(e, t);
  }
  function Wf() {
    return null;
  }
  var Oa = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function ji(e) {
    this._internalRoot = e;
  }
  Ll.prototype.render = ji.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(f(409));
    Tl(e, t, null, null);
  }, Ll.prototype.unmount = ji.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      on(function() {
        Tl(null, e, null, null);
      }), t[xt] = null;
    }
  };
  function Ll(e) {
    this._internalRoot = e;
  }
  Ll.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = vu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Mt.length && t !== 0 && t < Mt[n].priority; n++) ;
      Mt.splice(n, 0, e), n === 0 && wu(e);
    }
  };
  function Ti(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ol(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ma() {
  }
  function Qf(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var m = Rl(i);
          o.call(m);
        };
      }
      var i = Ra(t, r, e, 0, null, !1, !1, "", Ma);
      return e._reactRootContainer = i, e[xt] = i.current, lr(e.nodeType === 8 ? e.parentNode : e), on(), i;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof r == "function") {
      var u = r;
      r = function() {
        var m = Rl(s);
        u.call(m);
      };
    }
    var s = zi(e, 0, !1, null, null, !1, !1, "", Ma);
    return e._reactRootContainer = s, e[xt] = s.current, lr(e.nodeType === 8 ? e.parentNode : e), on(function() {
      Tl(t, s, n, r);
    }), s;
  }
  function Ml(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var i = o;
      if (typeof l == "function") {
        var u = l;
        l = function() {
          var s = Rl(i);
          u.call(s);
        };
      }
      Tl(t, i, e, l);
    } else i = Qf(n, t, e, l, r);
    return Rl(i);
  }
  mu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Vn(t.pendingLanes);
          n !== 0 && (bl(t, n | 1), Ke(t, ke()), (Z & 6) === 0 && (Mn = ke() + 500, Ut()));
        }
        break;
      case 13:
        on(function() {
          var r = Ct(e, 1);
          if (r !== null) {
            var l = $e();
            dt(r, e, 1, l);
          }
        }), Pi(e, 1);
    }
  }, eo = function(e) {
    if (e.tag === 13) {
      var t = Ct(e, 134217728);
      if (t !== null) {
        var n = $e();
        dt(t, e, 134217728, n);
      }
      Pi(e, 134217728);
    }
  }, hu = function(e) {
    if (e.tag === 13) {
      var t = Kt(e), n = Ct(e, t);
      if (n !== null) {
        var r = $e();
        dt(n, e, t, r);
      }
      Pi(e, t);
    }
  }, vu = function() {
    return le;
  }, gu = function(e, t) {
    var n = le;
    try {
      return le = e, t();
    } finally {
      le = n;
    }
  }, Kl = function(e, t, n) {
    switch (t) {
      case "input":
        if (Al(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var l = Jr(r);
              if (!l) throw Error(f(90));
              Hi(r), Al(r, l);
            }
          }
        }
        break;
      case "textarea":
        Ki(e, n);
        break;
      case "select":
        t = n.value, t != null && fn(e, !!n.multiple, t, !1);
    }
  }, tu = xi, nu = on;
  var Kf = { usingClientEntryPoint: !1, Events: [ur, xn, Jr, bi, eu, xi] }, xr = { findFiberByHostInstance: Jt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Gf = { bundleType: xr.bundleType, version: xr.version, rendererPackageName: xr.rendererPackageName, rendererConfig: xr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: te.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = iu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: xr.findFiberByHostInstance || Wf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Fl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fl.isDisabled && Fl.supportsFiber) try {
      Lr = Fl.inject(Gf), ht = Fl;
    } catch {
    }
  }
  return Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kf, Ge.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ti(t)) throw Error(f(200));
    return Vf(e, t, null, n);
  }, Ge.createRoot = function(e, t) {
    if (!Ti(e)) throw Error(f(299));
    var n = !1, r = "", l = Oa;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = zi(e, 1, !1, null, null, n, !1, r, l), e[xt] = t.current, lr(e.nodeType === 8 ? e.parentNode : e), new ji(t);
  }, Ge.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
    return e = iu(t), e = e === null ? null : e.stateNode, e;
  }, Ge.flushSync = function(e) {
    return on(e);
  }, Ge.hydrate = function(e, t, n) {
    if (!Ol(t)) throw Error(f(200));
    return Ml(null, e, t, !0, n);
  }, Ge.hydrateRoot = function(e, t, n) {
    if (!Ti(e)) throw Error(f(405));
    var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Oa;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = Ra(t, null, e, 1, n ?? null, l, !1, o, i), e[xt] = t.current, lr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
      n,
      l
    );
    return new Ll(t);
  }, Ge.render = function(e, t, n) {
    if (!Ol(t)) throw Error(f(200));
    return Ml(null, e, t, !1, n);
  }, Ge.unmountComponentAtNode = function(e) {
    if (!Ol(e)) throw Error(f(40));
    return e._reactRootContainer ? (on(function() {
      Ml(null, null, e, !1, function() {
        e._reactRootContainer = null, e[xt] = null;
      });
    }), !0) : !1;
  }, Ge.unstable_batchedUpdates = xi, Ge.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Ol(n)) throw Error(f(200));
    if (e == null || e._reactInternals === void 0) throw Error(f(38));
    return Ml(e, t, n, !1, r);
  }, Ge.version = "18.3.1-next-f1338f8080-20240426", Ge;
}
var Ua;
function ed() {
  if (Ua) return Li.exports;
  Ua = 1;
  function h() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h);
      } catch (v) {
        console.error(v);
      }
  }
  return h(), Li.exports = bf(), Li.exports;
}
var Ha;
function td() {
  if (Ha) return Dl;
  Ha = 1;
  var h = ed();
  return Dl.createRoot = h.createRoot, Dl.hydrateRoot = h.hydrateRoot, Dl;
}
var Ga = td(), Fi = { exports: {} }, Sr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ba;
function nd() {
  if (Ba) return Sr;
  Ba = 1;
  var h = Ai(), v = Symbol.for("react.element"), f = Symbol.for("react.fragment"), T = Object.prototype.hasOwnProperty, _ = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, O = { key: !0, ref: !0, __self: !0, __source: !0 };
  function E(U, F, ee) {
    var W, H = {}, V = null, M = null;
    ee !== void 0 && (V = "" + ee), F.key !== void 0 && (V = "" + F.key), F.ref !== void 0 && (M = F.ref);
    for (W in F) T.call(F, W) && !O.hasOwnProperty(W) && (H[W] = F[W]);
    if (U && U.defaultProps) for (W in F = U.defaultProps, F) H[W] === void 0 && (H[W] = F[W]);
    return { $$typeof: v, type: U, key: V, ref: M, props: H, _owner: _.current };
  }
  return Sr.Fragment = f, Sr.jsx = E, Sr.jsxs = E, Sr;
}
var Va;
function rd() {
  return Va || (Va = 1, Fi.exports = nd()), Fi.exports;
}
var g = rd();
const _r = {
  temperature: "sensor",
  rate_of_change: "sensor",
  phase: "sensor",
  recommendation: "sensor",
  burn_duration: "sensor",
  peak_temperature: "sensor",
  burn_active: "binary_sensor",
  overtemperature: "binary_sensor",
  stove_fan: "fan"
};
function Ii() {
  return Object.fromEntries(Object.keys(_r).map((h) => [h, null]));
}
function Ya(h, v = {}) {
  const f = Ii();
  for (const O of Object.keys(_r)) {
    const E = v.entities?.[O];
    E && h.states[E] && (f[O] = E);
  }
  if (Object.values(f).some(Boolean) && v.entities)
    return f;
  const T = {};
  for (const [O, E] of Object.entries(h.entities || {})) {
    if (E?.platform !== "flueguard") continue;
    const U = E.translation_key;
    if (!U || !(U in _r) || _r[U] !== O.split(".")[0]) continue;
    const F = E.config_entry_id || "_";
    (T[F] ||= {})[U] = O;
  }
  let _ = null;
  for (const O of Object.values(T)) {
    if (v.entity && Object.values(O).includes(v.entity)) {
      _ = O;
      break;
    }
    (!_ || Object.keys(O).length > Object.keys(_).length) && (_ = O);
  }
  return { ...f, ..._ || {} };
}
const ld = {
  title: "KaminOfenWaechter",
  phase: {
    idle: "Aus",
    ignition: "Anzünden",
    main: "Hauptabbrand",
    burnout: "Ausbrand"
  },
  recommendation: {
    wait: "Keine Aktivität",
    air_open: "Luft offen lassen",
    hold: "Halten – alles gut",
    reduce_air: "Luft drosseln",
    add_fuel: "Nachlegen",
    let_burn_out: "Ausbrennen lassen"
  },
  recHint: {
    wait: "Ofen ist kalt – Zeit für ein neues Feuer.",
    air_open: "Luftklappen offen, damit das Feuer angeht.",
    hold: "Optimales Band – nichts tun.",
    reduce_air: "Primärluft drosseln, sonst geht die Wärme hoch.",
    add_fuel: "Glut vorhanden? 1–2 Scheite nachlegen.",
    let_burn_out: "Ausbrennen lassen – Glut ausnutzen."
  },
  peak: "Spitze",
  burnTime: "Abbrand",
  rate: "Änderung",
  flue: "Rauchgas",
  fan: {
    title: "Ofenventilator",
    auto: "Automatik",
    boost: "Boost",
    off: "Aus",
    on: "Ein",
    reason: {
      off: "aus – Rauchgas zu kühl",
      ramp: "folgt der Rauchgastemperatur",
      overtemp: "Übertemperatur – volle Drehzahl",
      night: "Nachtmodus-Grenze",
      room: "Raum warm genug",
      night_room: "Nachtmodus + Raum warm",
      manual: "Handsteuerung aktiv"
    },
    override: "Handsteuerung",
    autoTarget: "Automatik-Ziel"
  },
  unavailable: "Sensor nicht verfügbar",
  history: "Verlauf",
  historyEmpty: "Noch keine Verlaufsdaten.",
  noEntry: "Keine KaminOfenWaechter-Entitäten gefunden – Entität in den Card-Optionen setzen.",
  active: "Abbrand aktiv",
  inactive: "Kein Abbrand",
  overtemp: "Übertemperatur",
  status: "Status"
}, od = {
  title: "KaminOfenWaechter",
  phase: {
    idle: "Idle",
    ignition: "Ignition",
    main: "Main burn",
    burnout: "Burnout"
  },
  recommendation: {
    wait: "No activity",
    air_open: "Keep air open",
    hold: "Hold – all good",
    reduce_air: "Reduce air",
    add_fuel: "Reload",
    let_burn_out: "Let it burn out"
  },
  recHint: {
    wait: "Stove is cold – time for a new fire.",
    air_open: "Keep the air vents open so the fire catches.",
    hold: "Optimal band – nothing to do.",
    reduce_air: "Close primary air, or heat goes up the chimney.",
    add_fuel: "Embers left? Add one or two logs.",
    let_burn_out: "Let it burn out – use the embers."
  },
  peak: "Peak",
  burnTime: "Burn",
  rate: "Change",
  flue: "Flue gas",
  fan: {
    title: "Stove fan",
    auto: "Auto",
    boost: "Boost",
    off: "Off",
    on: "On",
    reason: {
      off: "off – flue gas too cool",
      ramp: "follows flue gas temperature",
      overtemp: "overtemperature – full speed",
      night: "night mode limit",
      room: "room is warm enough",
      night_room: "night mode + warm room",
      manual: "manual override"
    },
    override: "Manual",
    autoTarget: "Auto target"
  },
  unavailable: "Sensor unavailable",
  history: "History",
  historyEmpty: "No history data yet.",
  noEntry: "No KaminOfenWaechter entities found – set an entity in the card options.",
  active: "Burn active",
  inactive: "No burn",
  overtemp: "Overtemperature",
  status: "Status"
};
function Cr(h) {
  return (h || "").toLowerCase().startsWith("de") ? ld : od;
}
function id(h) {
  const v = Math.max(0, Math.round(h || 0)), f = Math.floor(v / 3600), T = Math.floor(v % 3600 / 60), _ = v % 60;
  return f > 0 ? `${f}:${String(T).padStart(2, "0")} h` : `${T}:${String(_).padStart(2, "0")} min`;
}
function ud(h) {
  const v = Math.max(0, Math.round(h || 0)), f = Math.floor(v / 60), T = v % 60;
  return `${f}:${String(T).padStart(2, "0")}`;
}
const sd = {
  cold: 100,
  refuel: 150,
  optimal_low: 180,
  optimal_high: 350,
  warn: 450
}, Wa = {
  wait: "mdi:progress-clock",
  air_open: "mdi:weather-windy",
  hold: "mdi:check-circle-outline",
  reduce_air: "mdi:tune-vertical",
  add_fuel: "mdi:log",
  let_burn_out: "mdi:timelapse"
};
function ad(h = 1e3) {
  const [v, f] = Le.useState(0);
  return Le.useEffect(() => {
    const T = setInterval(() => f((_) => _ + 1), h);
    return () => clearInterval(T);
  }, [h]), v;
}
const cd = 300, fd = 172, Dn = 118, jt = 150, Tt = 148;
function Er(h, v) {
  const f = h * Math.PI / 180;
  return [jt + v * Math.cos(f), Tt + v * Math.sin(f)];
}
function cn(h, v) {
  return 180 + Math.max(0, Math.min(1, h / v)) * 180;
}
function dd(h, v) {
  return cn(h, v) - 270;
}
function pd(h, v, f, T) {
  const _ = Er(cn(h, f), T), O = Er(cn(v, f), T), E = cn(v, f) - cn(h, f) > 180 ? 1 : 0;
  return `M ${_[0].toFixed(2)} ${_[1].toFixed(2)} A ${T} ${T} 0 ${E} 1 ${O[0].toFixed(2)} ${O[1].toFixed(2)}`;
}
function md({ value: h, peak: v, max: f, thresholds: T, lang: _, needleFast: O }) {
  const E = Cr(_), U = new Intl.NumberFormat(_ || "de", { maximumFractionDigits: 1 }), F = [
    { from: 0, to: T.cold, color: "var(--kfw-cold)" },
    { from: T.cold, to: T.optimal_low, color: "var(--kfw-amber)" },
    { from: T.optimal_low, to: T.optimal_high, color: "var(--kfw-green)" },
    { from: T.optimal_high, to: T.warn, color: "var(--kfw-orange)" },
    { from: T.warn, to: f, color: "var(--kfw-red)" }
  ], ee = dd(h, f), W = Er(cn(v, f), Dn + 10);
  return /* @__PURE__ */ g.jsx("div", { className: "gauge-wrap", children: /* @__PURE__ */ g.jsxs(
    "svg",
    {
      className: "gauge-svg",
      viewBox: `0 0 ${cd} ${fd}`,
      role: "img",
      "aria-label": `${E.flue}: ${U.format(h)} °C`,
      children: [
        F.map(
          (H, V) => H.to > H.from ? /* @__PURE__ */ g.jsx(
            "path",
            {
              d: pd(H.from, H.to, f, Dn),
              fill: "none",
              style: { stroke: H.color },
              strokeWidth: 13,
              strokeLinecap: "butt",
              opacity: 0.85
            },
            V
          ) : null
        ),
        v > T.cold && /* @__PURE__ */ g.jsx("circle", { cx: W[0], cy: W[1], r: 4, style: { fill: "var(--kfw-text-dim)" } }),
        [0, 0.25, 0.5, 0.75, 1].map((H) => {
          const V = cn(H * f, f), [M, Q] = Er(V, Dn - 11), [A, K] = Er(V, Dn - 17);
          return /* @__PURE__ */ g.jsx(
            "line",
            {
              x1: M,
              y1: Q,
              x2: A,
              y2: K,
              strokeWidth: 1.5,
              style: { stroke: "var(--kfw-text-dim)" }
            },
            H
          );
        }),
        /* @__PURE__ */ g.jsxs(
          "g",
          {
            className: O ? "gauge-needle-fast" : "gauge-needle",
            style: { transform: `rotate(${ee}deg)`, transformOrigin: `${jt}px ${Tt}px` },
            children: [
              /* @__PURE__ */ g.jsx(
                "line",
                {
                  x1: jt,
                  y1: Tt,
                  x2: jt,
                  y2: Tt - Dn + 26,
                  strokeWidth: 3.5,
                  strokeLinecap: "round",
                  style: { stroke: "var(--kfw-text)" }
                }
              ),
              /* @__PURE__ */ g.jsx("circle", { cx: jt, cy: Tt - Dn + 26, r: 3.5, style: { fill: "var(--kfw-fire)" } })
            ]
          }
        ),
        /* @__PURE__ */ g.jsx("circle", { cx: jt, cy: Tt, r: 7, style: { fill: "var(--kfw-text)" } }),
        /* @__PURE__ */ g.jsx("text", { x: jt, y: Tt - 58, textAnchor: "middle", className: "gauge-center-temp", children: U.format(h) }),
        /* @__PURE__ */ g.jsxs("text", { x: jt, y: Tt - 42, textAnchor: "middle", className: "gauge-center-unit", children: [
          "°C · ",
          E.flue
        ] }),
        /* @__PURE__ */ g.jsxs("text", { x: jt, y: Tt + 18, textAnchor: "middle", className: "gauge-center-label", children: [
          U.format(0),
          " – ",
          U.format(f),
          " °C"
        ] })
      ]
    }
  ) });
}
function hd({ hass: h, entity: v, hours: f, thresholds: T, max: _, lang: O }) {
  const [E, U] = Le.useState(null), F = Le.useRef(!0);
  Le.useEffect(() => (F.current = !0, () => {
    F.current = !1;
  }), []), Le.useEffect(() => {
    if (!h || !v) return;
    let ae = !1;
    const ce = () => {
      const te = new Date(Date.now() - f * 36e5).toISOString();
      h.callApi("GET", `history/period/${te}?filter_entity_id=${v}&minimal_response&significant_changes_only`).then((ne) => {
        if (ae || !F.current) return;
        const we = (Array.isArray(ne?.[0]) ? ne[0] : []).map((_e) => ({ x: new Date(_e.last_changed).getTime(), v: parseFloat(_e.state) })).filter((_e) => Number.isFinite(_e.v));
        U(we.length >= 2 ? we : []);
      }).catch(() => {
        !ae && F.current && U([]);
      });
    };
    ce();
    const ie = setInterval(ce, 10 * 6e4);
    return () => {
      ae = !0, clearInterval(ie);
    };
  }, [h, v, f]);
  const ee = Cr(O);
  if (!v) return null;
  const W = 320, H = 72, V = 4;
  let M = null, Q = null, A = null;
  if (E && E.length >= 2) {
    const ae = E[0].x, ce = Date.now(), ie = Math.max(_, ...E.map((oe) => oe.v)) * 1.05, te = (oe) => [
      V + (oe.x - ae) / Math.max(1, ce - ae) * (W - 2 * V),
      H - V - Math.max(0, oe.v) / ie * (H - 2 * V)
    ], ne = E.map(te);
    M = "M " + ne.map((oe) => `${oe[0].toFixed(1)} ${oe[1].toFixed(1)}`).join(" L "), Q = `${M} L ${ne[ne.length - 1][0].toFixed(1)} ${H - V} L ${ne[0][0].toFixed(1)} ${H - V} Z`, A = E[E.length - 1].v;
  }
  const K = (ae) => {
    if (!E || E.length < 2) return 0;
    const ce = Math.max(_, ...E.map((ie) => ie.v)) * 1.05;
    return H - V - ae / ce * (H - 2 * V);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "history-block", children: [
    /* @__PURE__ */ g.jsx("div", { className: "block-title", children: ee.history }),
    E === null ? null : E.length < 2 ? /* @__PURE__ */ g.jsx("div", { className: "block-title", style: { textTransform: "none" }, children: ee.historyEmpty }) : /* @__PURE__ */ g.jsxs("svg", { className: "history-svg", viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", children: [
      /* @__PURE__ */ g.jsx("defs", { children: /* @__PURE__ */ g.jsxs("linearGradient", { id: "kfwHistGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ g.jsx("stop", { offset: "0%", style: { stopColor: "var(--kfw-fire)", stopOpacity: 0.45 } }),
        /* @__PURE__ */ g.jsx("stop", { offset: "100%", style: { stopColor: "var(--kfw-fire)", stopOpacity: 0.05 } })
      ] }) }),
      T.optimal_low < _ && /* @__PURE__ */ g.jsx("line", { x1: 0, x2: W, y1: K(T.optimal_low), y2: K(T.optimal_low), strokeDasharray: "3 4", strokeWidth: 1, opacity: 0.7, style: { stroke: "var(--kfw-green)" } }),
      T.warn < _ && /* @__PURE__ */ g.jsx("line", { x1: 0, x2: W, y1: K(T.warn), y2: K(T.warn), strokeDasharray: "3 4", strokeWidth: 1, opacity: 0.7, style: { stroke: "var(--kfw-red)" } }),
      /* @__PURE__ */ g.jsx("path", { d: Q, style: { fill: "url(#kfwHistGrad)" } }),
      /* @__PURE__ */ g.jsx("path", { d: M, fill: "none", strokeWidth: 1.8, style: { stroke: "var(--kfw-fire)" } })
    ] }),
    A !== null && /* @__PURE__ */ g.jsxs("div", { className: "block-title", style: { textTransform: "none", marginTop: 2 }, children: [
      new Intl.NumberFormat(O || "de", { maximumFractionDigits: 0 }).format(Math.max(0, A)),
      " °C"
    ] })
  ] });
}
function vd({ hass: h, fanEntity: v, lang: f, tick: T }) {
  const _ = Cr(f), [O, E] = Le.useState(!1), U = h.states[v];
  if (!U) return null;
  const F = U.attributes || {}, ee = ["unknown", "unavailable"].includes(U.state), W = typeof F.percentage == "number" ? F.percentage : null, H = F.auto !== !1, V = F.preset_mode || "auto", M = F.reason || "off", Q = !ee && (W ?? 0) > 0;
  let A = null;
  if (!H && F.override_until) {
    const ne = new Date(F.override_until).getTime();
    Number.isFinite(ne) && (A = Math.max(0, (ne - Date.now()) / 1e3));
  }
  const K = 34, ae = 2 * Math.PI * K, ce = W !== null ? Math.max(0, Math.min(100, W)) / 100 : Q ? 1 : 0, ie = (ne, oe) => {
    E(!0), Promise.resolve(
      h.callService("fan", ne, { entity_id: v, ...oe })
    ).finally(() => E(!1));
  }, te = typeof F.auto_percentage == "number" ? F.auto_percentage : null;
  return /* @__PURE__ */ g.jsxs("div", { className: "fan-block", children: [
    /* @__PURE__ */ g.jsx("div", { className: "block-title", children: _.fan.title }),
    /* @__PURE__ */ g.jsxs("div", { className: "fan-row", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "fan-ring", children: [
        /* @__PURE__ */ g.jsxs("svg", { viewBox: "0 0 84 84", width: "84", height: "84", children: [
          /* @__PURE__ */ g.jsx("circle", { cx: "42", cy: "42", r: K, fill: "none", strokeWidth: "7", style: { stroke: "var(--kfw-divider)" } }),
          ce > 0 && /* @__PURE__ */ g.jsx(
            "circle",
            {
              cx: "42",
              cy: "42",
              r: K,
              fill: "none",
              strokeWidth: "7",
              strokeLinecap: "round",
              strokeDasharray: `${(ae * ce).toFixed(1)} ${ae.toFixed(1)}`,
              style: {
                transition: "stroke-dasharray .6s ease",
                stroke: M === "overtemp" ? "var(--kfw-red)" : "var(--kfw-accent)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: "fan-center", children: [
          /* @__PURE__ */ g.jsx("span", { className: "fan-pct", children: W !== null ? `${W} %` : Q ? _.fan.on : "—" }),
          /* @__PURE__ */ g.jsx("span", { className: "fan-reason", children: _.fan.reason[M] || M })
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "fan-controls", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "fan-presets", children: [
          /* @__PURE__ */ g.jsxs(
            "button",
            {
              className: `fan-btn ${V === "auto" ? "active" : ""}`,
              disabled: O || ee,
              onClick: () => ie("set_preset_mode", { preset_mode: "auto" }),
              children: [
                /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:autorenew", style: { fontSize: "1rem" } }),
                " ",
                _.fan.auto
              ]
            }
          ),
          /* @__PURE__ */ g.jsxs(
            "button",
            {
              className: `fan-btn ${V === "boost" ? "active" : ""}`,
              disabled: O || ee,
              onClick: () => ie("set_preset_mode", { preset_mode: "boost" }),
              children: [
                /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:fast-forward", style: { fontSize: "1rem" } }),
                " ",
                _.fan.boost
              ]
            }
          ),
          /* @__PURE__ */ g.jsxs(
            "button",
            {
              className: `fan-btn ${V === "off" ? "active" : ""}`,
              disabled: O || ee,
              onClick: () => ie("set_preset_mode", { preset_mode: "off" }),
              children: [
                /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:fan-off", style: { fontSize: "1rem" } }),
                " ",
                _.fan.off
              ]
            }
          )
        ] }),
        /* @__PURE__ */ g.jsx("div", { className: "fan-meta", children: /* @__PURE__ */ g.jsxs("span", { children: [
          /* @__PURE__ */ g.jsx("ha-icon", { icon: Q ? "mdi:fan" : "mdi:fan-off", style: { fontSize: ".9rem", verticalAlign: "-2px", display: Q ? "inline" : "none" } }),
          H ? `${_.fan.autoTarget}: ${te !== null ? `${te} %` : "—"}` : `${_.fan.override}: ${A !== null ? ud(A) : "—"}${te !== null ? ` · ${_.fan.autoTarget} ${te} %` : ""}`
        ] }) })
      ] })
    ] })
  ] });
}
function gd({ hass: h, config: v }) {
  const f = ad(1e3), T = Le.useRef(null), _ = h.language || "de", O = Cr(_), E = Le.useMemo(
    () => Ya(h, v),
    // hass selbst ändert sich laufend; die Registry-Zuordnung nur bei relevanten Feldern neu bauen.
    [h && h.entities, v]
  ), U = E.temperature ? h.states[E.temperature] : null, F = { ...sd, ...v.thresholds || {} }, ee = Number(v.gauge_max) > 0 ? Number(v.gauge_max) : 600, W = Number(v.hours_to_show) > 0 ? Number(v.hours_to_show) : 12, H = v.show_history !== !1, V = v.show_fan !== !1, M = (je) => {
    const Oe = je ? h.states[je] : null;
    if (!Oe) return null;
    const Ue = parseFloat(Oe.state);
    return Number.isFinite(Ue) ? Ue : null;
  }, Q = M(E.temperature), A = M(E.rate_of_change), K = M(E.peak_temperature) ?? 0, ae = M(E.burn_duration) ?? 0, ce = E.phase ? h.states[E.phase]?.state : "idle", ie = E.recommendation ? h.states[E.recommendation]?.state : "wait", te = E.burn_active ? h.states[E.burn_active]?.state === "on" : ce !== "idle", ne = E.overtemperature ? h.states[E.overtemperature]?.state === "on" : Q !== null && Q >= F.warn, oe = !U || ["unknown", "unavailable"].includes(U.state);
  Le.useEffect(() => {
    T.current?.classList.toggle("alert", !!ne);
  }, [ne]);
  const we = U ? new Date(U.last_changed).getTime() : null, _e = ae > 0 && we && Number.isFinite(we) ? ae + Math.max(0, (Date.now() - we) / 1e3) : ae, pt = Le.useMemo(() => {
    const je = E.temperature ? h.entities?.[E.temperature] : null;
    return je?.device_id && h.devices?.[je.device_id]?.name ? h.devices[je.device_id].name : U?.attributes?.friendly_name ? String(U.attributes.friendly_name).replace(/ Rauchgastemperatur.*$/i, "").replace(/ flue gas.*$/i, "").trim() : O.title;
  }, [E.temperature, h.entities, h.devices, U, O.title]);
  if (!E.temperature)
    return /* @__PURE__ */ g.jsx("ha-card", { children: /* @__PURE__ */ g.jsxs("div", { className: "error-banner", children: [
      /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:alert-circle-outline" }),
      O.noEntry
    ] }) });
  const be = new Intl.NumberFormat(_, { maximumFractionDigits: 1, minimumFractionDigits: 1 }), kt = A === null ? "" : A >= 0.2 ? "rate-up" : A <= -0.2 ? "rate-down" : "";
  return /* @__PURE__ */ g.jsxs("ha-card", { ref: T, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "header", children: [
      /* @__PURE__ */ g.jsx("span", { className: `fire-icon ${te ? "pulse" : ""}`, children: /* @__PURE__ */ g.jsx("ha-icon", { icon: te ? "mdi:fire" : "mdi:fireplace-off" }) }),
      /* @__PURE__ */ g.jsx("span", { className: "name", children: pt }),
      /* @__PURE__ */ g.jsxs("span", { className: `phase-chip phase-${ce}`, children: [
        /* @__PURE__ */ g.jsx("span", { className: "dot" }),
        O.phase[ce] || ce
      ] })
    ] }),
    oe ? /* @__PURE__ */ g.jsxs("div", { className: "error-banner", children: [
      /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:thermometer-off" }),
      O.unavailable
    ] }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx(md, { value: Q, peak: K, max: ee, thresholds: F, lang: _, needleFast: !1 }),
      A !== null && /* @__PURE__ */ g.jsxs("div", { className: "rate-row", children: [
        /* @__PURE__ */ g.jsx("ha-icon", { icon: A >= 0 ? "mdi:arrow-up-bold" : "mdi:arrow-down-bold", style: { fontSize: ".9rem" } }),
        /* @__PURE__ */ g.jsxs("span", { className: `rate-value ${kt}`, children: [
          A >= 0 ? "+" : "",
          be.format(A),
          " °C/min"
        ] }),
        /* @__PURE__ */ g.jsxs("span", { children: [
          "· ",
          O.rate
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: `recommendation rec-${ie}`, children: [
        /* @__PURE__ */ g.jsx("ha-icon", { icon: Wa[ie] || Wa.wait }),
        /* @__PURE__ */ g.jsxs("div", { children: [
          /* @__PURE__ */ g.jsx("div", { className: "rec-text", children: O.recommendation[ie] || ie }),
          /* @__PURE__ */ g.jsx("div", { className: "rec-hint", children: O.recHint[ie] || "" })
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "stats", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "stat", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "stat-label", children: [
            /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:thermometer-high", style: { fontSize: ".8rem" } }),
            O.peak
          ] }),
          /* @__PURE__ */ g.jsxs("div", { className: "stat-value", children: [
            be.format(K),
            " °C"
          ] })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: "stat", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "stat-label", children: [
            /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:timer-outline", style: { fontSize: ".8rem" } }),
            O.burnTime
          ] }),
          /* @__PURE__ */ g.jsx("div", { className: "stat-value", children: id(_e) })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: "stat", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "stat-label", children: [
            /* @__PURE__ */ g.jsx("ha-icon", { icon: ne ? "mdi:alert-octagon" : "mdi:fire", style: { fontSize: ".8rem" } }),
            O.status
          ] }),
          /* @__PURE__ */ g.jsx("div", { className: "stat-value", children: ne ? /* @__PURE__ */ g.jsx("span", { style: { color: "var(--kfw-red)" }, children: O.overtemp }) : te ? /* @__PURE__ */ g.jsx("span", { style: { color: "var(--kfw-green)" }, children: O.active }) : /* @__PURE__ */ g.jsx("span", { children: O.inactive }) })
        ] })
      ] }),
      H && /* @__PURE__ */ g.jsx(hd, { hass: h, entity: E.temperature, hours: W, thresholds: F, max: ee, lang: _ }),
      V && E.stove_fan && /* @__PURE__ */ g.jsx(vd, { hass: h, fanEntity: E.stove_fan, lang: _, tick: f }),
      /* @__PURE__ */ g.jsx("div", { className: "footer-note", children: "KaminOfenWaechter" })
    ] })
  ] });
}
const Qa = {
  cold: 100,
  refuel: 150,
  optimal_low: 180,
  optimal_high: 350,
  warn: 450
}, yd = {
  de: {
    temperature: "Rauchgas-Temperatursensor",
    phase: "Phasen-Sensor",
    recommendation: "Empfehlungs-Sensor",
    burn_duration: "Abbranddauer-Sensor",
    peak_temperature: "Spitzentemperatur-Sensor",
    rate_of_change: "Temperaturänderungs-Sensor",
    burn_active: "Abbrand-aktiv-Binärsensor",
    overtemperature: "Übertemperatur-Binärsensor",
    stove_fan: "Ofenventilator (fan.*)",
    gaugeMax: "Skalenende des Gauges (°C)",
    hours: "Verlauf (Stunden)",
    showHistory: "Verlaufsdiagramm anzeigen",
    showFan: "Ventilator-Steuerung anzeigen",
    auto: "Entitäten automatisch erkennen",
    entities: "Entitäten",
    thresholds: "Schwellwerte (°C)"
  },
  en: {
    temperature: "Flue gas temperature sensor",
    phase: "Phase sensor",
    recommendation: "Recommendation sensor",
    burn_duration: "Burn duration sensor",
    peak_temperature: "Peak temperature sensor",
    rate_of_change: "Rate-of-change sensor",
    burn_active: "Burn active binary sensor",
    overtemperature: "Overtemperature binary sensor",
    stove_fan: "Stove fan (fan.*)",
    gaugeMax: "Gauge maximum (°C)",
    hours: "History (hours)",
    showHistory: "Show history chart",
    showFan: "Show fan control",
    auto: "Discover entities automatically",
    entities: "Entities",
    thresholds: "Thresholds (°C)"
  }
};
function Xa(h, v, f = []) {
  const T = Le.useRef(null), _ = Le.useRef(v);
  return _.current = v, Le.useEffect(() => {
    const O = T.current;
    if (!O) return;
    const E = (U) => _.current(U);
    return O.addEventListener(h, E), () => O.removeEventListener(h, E);
  }, [h, ...f]), T;
}
function wd({ hass: h, value: v, label: f, onChange: T }) {
  const _ = Xa("value-changed", (O) => T(O.detail.value));
  return Le.useEffect(() => {
    _.current && (_.current.hass = h, _.current.value = v || "");
  }), /* @__PURE__ */ g.jsx("ha-entity-picker", { ref: _, label: f, "allow-custom-entity": !0 });
}
function Di({ checked: h, label: v, onChange: f }) {
  const T = Xa("change", (_) => f(_.target.checked));
  return Le.useEffect(() => {
    T.current && (T.current.checked = !!h);
  }), /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", cursor: "pointer" }, children: [
    /* @__PURE__ */ g.jsx("ha-switch", { ref: T }),
    v
  ] });
}
function kd({ hass: h, config: v, onChange: f }) {
  const T = (h?.language || "de").toLowerCase().startsWith("de"), _ = yd[T ? "de" : "en"], O = Cr(h?.language), E = Ya(h || {}, v || {}), U = !!v.entities, F = U ? { ...Ii(), ...v.entities || {} } : E, ee = { ...Qa, ...v.thresholds || {} }, W = (M) => f({ ...v || {}, ...M }), H = (M, Q) => {
    const A = { ...v.entities || Ii() };
    Q ? A[M] = Q : delete A[M], W({ entities: A });
  }, V = (M, Q) => {
    const A = parseFloat(Q);
    Number.isFinite(A) && W({ thresholds: { ...ee, [M]: A } });
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "kfw-editor", children: [
    /* @__PURE__ */ g.jsx("style", { children: `
        .kfw-editor ha-entity-picker,
        .kfw-editor ha-textfield { display: block; width: 100%; margin-bottom: 8px; }
        .kfw-editor h4 { margin: 14px 0 6px; font-size: 0.8rem; opacity: 0.8; }
      ` }),
    /* @__PURE__ */ g.jsx(
      Di,
      {
        checked: !U,
        label: _.auto,
        onChange: (M) => {
          W(M ? { entities: void 0 } : { entities: { ...E } });
        }
      }
    ),
    /* @__PURE__ */ g.jsx("h4", { children: _.entities }),
    Object.keys(_r).map((M) => /* @__PURE__ */ g.jsx(
      wd,
      {
        hass: h,
        value: F[M],
        label: _[M],
        onChange: (Q) => H(M, Q)
      },
      M
    )),
    /* @__PURE__ */ g.jsx("h4", { children: _.thresholds }),
    /* @__PURE__ */ g.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }, children: Object.keys(Qa).map((M) => /* @__PURE__ */ g.jsx(
      "ha-textfield",
      {
        label: M,
        type: "number",
        value: String(ee[M]),
        onInput: (Q) => V(M, Q.target.value)
      },
      M
    )) }),
    /* @__PURE__ */ g.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "12px 0" }, children: [
      /* @__PURE__ */ g.jsx(
        "ha-textfield",
        {
          label: _.gaugeMax,
          type: "number",
          value: String(v.gauge_max ?? 600),
          onInput: (M) => {
            const Q = parseFloat(M.target.value);
            W({ gauge_max: Number.isFinite(Q) ? Q : void 0 });
          }
        }
      ),
      /* @__PURE__ */ g.jsx(
        "ha-textfield",
        {
          label: _.hours,
          type: "number",
          value: String(v.hours_to_show ?? 12),
          onInput: (M) => {
            const Q = parseFloat(M.target.value);
            W({ hours_to_show: Number.isFinite(Q) ? Q : void 0 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ g.jsx(
        Di,
        {
          checked: v.show_history !== !1,
          label: _.showHistory,
          onChange: (M) => W({ show_history: M })
        }
      ),
      /* @__PURE__ */ g.jsx(
        Di,
        {
          checked: v.show_fan !== !1,
          label: _.showFan,
          onChange: (M) => W({ show_fan: M })
        }
      )
    ] }),
    !E.temperature && /* @__PURE__ */ g.jsxs("div", { style: { marginTop: 12, fontSize: "0.8rem", color: "var(--warning-color, #b58b00)" }, children: [
      /* @__PURE__ */ g.jsx("ha-icon", { icon: "mdi:alert-circle-outline", style: { verticalAlign: "-3px" } }),
      " ",
      O.noEntry
    ] })
  ] });
}
const xd = `
:host {
  display: block;
  --kfw-card-bg: var(--card-background-color, #fff);
  --kfw-text: var(--primary-text-color, #212121);
  --kfw-text-dim: var(--secondary-text-color, #727272);
  --kfw-divider: var(--divider-color, rgba(0,0,0,.12));
  --kfw-accent: var(--accent-color, #ff9800);
  --kfw-state-ok: var(--state-icon-active-color, #43a047);
  --kfw-fire: #ff7043;
  --kfw-cold: var(--kfw-text-dim, #727272);
  --kfw-amber: #ffb300;
  --kfw-green: #43a047;
  --kfw-orange: #fb8c00;
  --kfw-red: #e53935;
  --kfw-blue: #1e88e5;
}
ha-card {
  padding: 14px 16px 12px;
  background: var(--kfw-card-bg);
  color: var(--kfw-text);
  transition: box-shadow .3s ease;
}
ha-card.alert {
  box-shadow: 0 0 0 2px var(--kfw-red), 0 4px 16px rgba(229,57,53,.25);
}
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.header .fire-icon {
  color: var(--kfw-fire);
  display: flex;
}
.header .fire-icon.pulse ha-icon {
  animation: kfw-pulse 1.6s ease-in-out infinite;
}
@keyframes kfw-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: .85; }
}
.header .name {
  font-weight: 600;
  font-size: 1.05rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phase-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: .78rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 14px;
  white-space: nowrap;
}
.phase-chip .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}
.phase-idle { color: var(--kfw-text-dim); background: color-mix(in srgb, var(--kfw-text-dim) 12%, transparent); }
.phase-ignition { color: var(--kfw-amber); background: color-mix(in srgb, var(--kfw-amber) 14%, transparent); }
.phase-main { color: var(--kfw-green); background: color-mix(in srgb, var(--kfw-green) 14%, transparent); }
.phase-burnout { color: var(--kfw-orange); background: color-mix(in srgb, var(--kfw-orange) 14%, transparent); }

.gauge-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
}
.gauge-svg { width: 100%; max-width: 320px; }
.gauge-needle { transition: transform .9s cubic-bezier(.4,.0,.2,1); }
.gauge-needle-fast { transition: transform .2s ease-out; }
.gauge-center-temp {
  font-size: 2.1rem;
  font-weight: 700;
  fill: var(--kfw-text);
  letter-spacing: -.02em;
}
.gauge-center-unit {
  font-size: .8rem;
  font-weight: 500;
  fill: var(--kfw-text-dim);
}
.gauge-center-label {
  font-size: .68rem;
  fill: var(--kfw-text-dim);
  text-transform: uppercase;
  letter-spacing: .08em;
}
.rate-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .85rem;
  color: var(--kfw-text-dim);
  margin-top: -6px;
  margin-bottom: 6px;
}
.rate-row .rate-value { font-weight: 600; }
.rate-up { color: var(--kfw-green); }
.rate-down { color: var(--kfw-blue); }

.recommendation {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  padding: 10px 14px;
  margin: 6px 0 10px;
  border-left: 4px solid var(--kfw-accent);
}
.recommendation .rec-text { font-weight: 600; font-size: .92rem; }
.recommendation .rec-hint { font-size: .78rem; color: var(--kfw-text-dim); }
.rec-air_open { border-left-color: var(--kfw-blue); }
.rec-hold { border-left-color: var(--kfw-green); }
.rec-reduce_air { border-left-color: var(--kfw-orange); }
.rec-add_fuel { border-left-color: var(--kfw-amber); }
.rec-let_burn_out { border-left-color: var(--kfw-text-dim); }
.rec-wait { border-left-color: var(--kfw-divider); }

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}
.stat {
  background: color-mix(in srgb, var(--kfw-text) 5%, transparent);
  border-radius: 10px;
  padding: 8px 10px;
  min-width: 0;
}
.stat .stat-label {
  font-size: .68rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--kfw-text-dim);
  display: flex;
  align-items: center;
  gap: 4px;
}
.stat .stat-value {
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 2px;
  white-space: nowrap;
}
.stat .stat-value ha-icon { font-size: .85rem; vertical-align: middle; }

.history-block { margin: 4px 0 8px; }
.block-title {
  font-size: .72rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--kfw-text-dim);
  margin-bottom: 4px;
}
.history-svg { width: 100%; height: 72px; display: block; border-radius: 8px; }

.fan-block {
  border-top: 1px solid var(--kfw-divider);
  padding-top: 10px;
  margin-top: 2px;
}
.fan-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.fan-ring { position: relative; width: 84px; height: 84px; flex-shrink: 0; }
.fan-ring svg { transform: rotate(-90deg); }
.fan-ring .fan-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fan-ring .fan-pct { font-size: 1.1rem; font-weight: 700; }
.fan-ring .fan-reason {
  font-size: .58rem;
  color: var(--kfw-text-dim);
  width: 70px;
  text-align: center;
  line-height: 1.15;
  margin-top: 1px;
}
.fan-ring ha-icon {
  animation: kfw-spin 2.4s linear infinite;
}
@keyframes kfw-spin { to { transform: rotate(360deg); } }
.fan-controls { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.fan-presets { display: flex; gap: 8px; }
.fan-btn {
  flex: 1;
  border: 1px solid var(--kfw-divider);
  background: transparent;
  color: var(--kfw-text);
  border-radius: 10px;
  padding: 7px 0;
  font-size: .82rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background .15s ease, border-color .15s ease;
}
.fan-btn:hover { background: color-mix(in srgb, var(--kfw-text) 8%, transparent); }
.fan-btn.active {
  border-color: var(--kfw-accent);
  background: color-mix(in srgb, var(--kfw-accent) 16%, transparent);
}
.fan-meta {
  font-size: .74rem;
  color: var(--kfw-text-dim);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.fan-meta ha-icon {
  --mdc-icon-size: 14px;
  font-size: 14px;
  flex-shrink: 0;
}
.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--kfw-red);
  font-size: .85rem;
  padding: 8px 0;
}
.footer-note {
  font-size: .66rem;
  color: var(--kfw-text-dim);
  text-align: right;
  margin-top: 4px;
}
`, $i = "kaminofenwaechter-card", Za = `${$i}-editor`;
window.customCards = window.customCards || [];
window.customCards.push({
  type: $i,
  name: "KaminOfenWaechter",
  description: "Kaminofen-Monitor: Rauchgastemperatur-Gauge, Abbrandphase, Empfehlung, Verlauf und Ventilator-Steuerung",
  preview: !0
});
function Ja(h, v) {
  let f = !1;
  return () => {
    f || !h._reactRoot || (f = !0, requestAnimationFrame(() => {
      f = !1, v();
    }));
  };
}
class Ui extends HTMLElement {
  constructor() {
    super(), this._hass = null, this._config = {}, this._reactRoot = null, this._renderScheduled = Ja(
      this,
      () => this._reactRoot?.render(
        Ka.createElement(gd, {
          hass: this._hass,
          config: this._config,
          key: this._config?.entities ? "manual" : "auto"
        })
      )
    );
  }
  set hass(v) {
    this._hass = v, this._renderScheduled();
  }
  get hass() {
    return this._hass;
  }
  setConfig(v) {
    this._config = typeof v == "string" ? JSON.parse(v) : v || {}, this._mount(), this._renderScheduled();
  }
  connectedCallback() {
    this._mount(), this._renderScheduled();
  }
  _mount() {
    if (this._reactRoot) return;
    this.attachShadow({ mode: "open" });
    const v = document.createElement("style");
    v.textContent = xd, this.shadowRoot.appendChild(v);
    const f = document.createElement("div");
    this.shadowRoot.appendChild(f), this._reactRoot = Ga.createRoot(f);
  }
  getCardSize() {
    return 8;
  }
  // Sowohl statisch als auch am Objekt: je nach HA-Version fragt der
  // Sections-Editor die Klassen- oder Objektmethode ab.
  static getGridOptions() {
    return { columns: 6, min_columns: 3, rows: 9, min_rows: 6 };
  }
  getGridOptions() {
    return Ui.getGridOptions();
  }
  static getConfigElement() {
    return document.createElement(Za);
  }
  static getStubConfig(v) {
    const f = {};
    for (const [, T] of Object.entries(v?.entities || {}))
      if (T?.platform === "flueguard" && T.translation_key === "temperature") {
        f.entity = Object.keys(v.entities).find(
          (_) => v.entities[_] === T
        );
        break;
      }
    return f.entity ? { entity: f.entity } : {};
  }
}
class Sd extends HTMLElement {
  constructor() {
    super(), this._hass = null, this._config = {}, this._reactRoot = null, this._renderScheduled = Ja(
      this,
      () => this._reactRoot?.render(
        Ka.createElement(kd, {
          hass: this._hass,
          config: this._config,
          onChange: (v) => {
            const f = JSON.parse(JSON.stringify(v, (T, _) => _ === void 0 ? void 0 : _));
            this._config = f, this.dispatchEvent(
              new CustomEvent("config-changed", {
                detail: { config: f },
                bubbles: !0,
                composed: !0
              })
            );
          }
        })
      )
    );
  }
  set hass(v) {
    this._hass = v, this._renderScheduled();
  }
  setConfig(v) {
    this._config = v || {}, this._mount(), this._renderScheduled();
  }
  _mount() {
    if (this._reactRoot) return;
    this.attachShadow({ mode: "open" });
    const v = document.createElement("div");
    this.shadowRoot.appendChild(v), this._reactRoot = Ga.createRoot(v);
  }
}
customElements.define($i, Ui);
customElements.define(Za, Sd);
