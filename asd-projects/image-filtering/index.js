function resetAndRender() { reset(), render(document.getElementById("display"), image) }

function applyAndRender() { applyFilter(reddify), applyFilterNoBackground(decreaseBlue), applyFilterNoBackground(increaseGreenByBlue), render(document.getElementById("display"), image) }

function applyFilter(e) { for (const n of image)
    for (let r = 0; r < n.length; r++) { let t = n[r],
        i = rgbStringToArray(t);
      e(i), t = rgbArrayToString(i), n[r] = t } }

function reddify(e) { e[RED] = 200 }

function decreaseBlue(e) { e[BLUE] = keepInBounds(e[BLUE] - 50) }

function increaseGreenByBlue(e) { e[GREEN] = keepInBounds(e[GREEN] + e[BLUE]) }

function keepInBounds(e) { return Math.min(255, Math.max(0, e)) }

function applyFilterNoBackground(e) { let n = image[0][0]; for (const r of image)
    for (let t = 0; t < r.length; t++)
      if (r[t] !== n) { let n = r[t],
          i = rgbStringToArray(n);
        e(i), n = rgbArrayToString(i), r[t] = n } } render(document.getElementById("display"), image);
