const {runProcess} = require("./utility");

function format(path) {
    runProcess("prettier", ["--config", "./prettier.json", "--write", path]);
}

format("./*.{js,jsx,ts,tsx,json}");
format("./node-script/**/*.{js,jsx,ts,tsx,json}");
format("./app/**/*.{js,jsx,ts,tsx,json}");
