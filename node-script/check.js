const {runProcess} = require("./utility");

function lint() {
    runProcess("eslint", [".", "--ext", ".js,.jsx,.ts,.tsx"]);
}

function checkPrettier(path) {
    runProcess("prettier", ["--config", "./prettier.json", "--list-different", path]);
}

function compile() {
    runProcess("tsc", ["-p", "./tsconfig.json"]);
}

lint();
checkPrettier("./*.{js,jsx,ts,tsx,json}");
checkPrettier("./app/**/*.{js,jsx,ts,tsx,json}");
compile();
