(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  // ---- Arithmetic ----
  function arithmetic(a, op, b) {
    switch (op) {
      case "+":  return a + b;
      case "-":  return a - b;
      case "*":  return a * b;
      case "/":  return a / b;
      case "%":  return a % b;
      case "**": return a ** b;
    }
  }
  $("calc1").addEventListener("click", function () {
    var a = parseFloat($("a1").value);
    var b = parseFloat($("b1").value);
    var op = $("op1").value;
    if (isNaN(a) || isNaN(b)) {
      $("out1").innerHTML = '<span class="bad">Enter two numbers.</span>';
      return;
    }
    $("out1").textContent = a + " " + op + " " + b + " = " + arithmetic(a, op, b);
  });

  // ---- Assignment ----
  var x = 5;
  function showX(msg) {
    $("xval").textContent = x;
    $("out2").textContent = msg;
  }
  $("apply2").addEventListener("click", function () {
    var b = parseFloat($("b2").value);
    var op = $("op2").value;
    if (isNaN(b)) { $("out2").innerHTML = '<span class="bad">Enter a number.</span>'; return; }
    var before = x;
    switch (op) {
      case "=":  x = b;  break;
      case "+=": x += b; break;
      case "-=": x -= b; break;
      case "*=": x *= b; break;
      case "/=": x /= b; break;
    }
    showX("x " + op + " " + b + "   (x was " + before + ", now " + x + ")");
  });
  $("reset2").addEventListener("click", function () {
    x = 5;
    showX("x reset to 5");
  });

  // ---- Comparison ----
  function parse(v, forceText) {
    if (!forceText && v.trim() !== "" && !isNaN(Number(v))) return Number(v);
    return v;
  }
  function compare(a, op, b) {
    switch (op) {
      case "==":  return a == b;
      case "===": return a === b;
      case "!=":  return a != b;
      case "!==": return a !== b;
      case ">":   return a > b;
      case "<":   return a < b;
      case ">=":  return a >= b;
      case "<=":  return a <= b;
    }
  }
  function fmt(v) { return typeof v === "string" ? JSON.stringify(v) : String(v); }
  $("cmp3").addEventListener("click", function () {
    var text = $("asText").checked;
    var a = parse($("a3").value, text);
    var b = parse($("b3").value, text);
    var op = $("op3").value;
    var r = compare(a, op, b);
    var el = $("out3");
    el.innerHTML = "";
    var line = document.createElement("div");
    line.textContent = fmt(a) + " " + op + " " + fmt(b) + "  →  ";
    var res = document.createElement("strong");
    res.textContent = r;
    res.className = r ? "ok" : "bad";
    line.appendChild(res);
    el.appendChild(line);
  });

  // ---- Reference table ----
  var rows = [
    ["10 % 3", 10 % 3],
    ["2 ** 10", 2 ** 10],
    ["\"Hi \" + \"there\"", "Hi " + "there"],
    ["5 == \"5\"", 5 == "5"],
    ["5 === \"5\"", 5 === "5"],
    ["5 != \"5\"", 5 != "5"],
    ["5 !== \"5\"", 5 !== "5"],
    ["0 == \"\"", 0 == ""],
    ["null == undefined", null == undefined],
    ["7 >= 7", 7 >= 7]
  ];
  var tbody = $("ref");
  rows.forEach(function (r) {
    var tr = document.createElement("tr");
    var c1 = document.createElement("td");
    var c2 = document.createElement("td");
    c1.textContent = r[0];
    c2.textContent = typeof r[1] === "string" ? JSON.stringify(r[1]) : String(r[1]);
    tr.appendChild(c1); tr.appendChild(c2);
    tbody.appendChild(tr);
  });
})();
