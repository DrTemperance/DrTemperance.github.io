var Chance = require("../chance.js");
var argv = require("minimist")(process.argv.slice(2), { string: "pool" });

var generator = process.argv[2];
var options = argv;
var chance = new Chance(new Date().getTime().toString());
if (generator && chance[generator]) {
  process.stdout.write(chance[generator](options));
} else {
  process.stderr.write('Unknown generator "' + generator + '"');
}
