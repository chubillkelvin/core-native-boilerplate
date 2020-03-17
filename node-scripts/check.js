const chalk = require("chalk");
const path = require("path");
const childProcess = require("child_process");
const fs = require("fs-extra");

function runProcess(command, args) {
    console.info(chalk.white("Running: ") + chalk.yellowBright(command + " " + args.join(" ")));
    const localPath = path.resolve(__dirname, "../../node_modules/.bin/" + command);
    const canonicalCommand = fs.existsSync(localPath) ? localPath : command;
    const result = childProcess.spawnSync(canonicalCommand, args, {
        stdio: "inherit",
        shell: process.platform === "win32",
    });
    if (result.error) {
        throw new Error("Process execution error: " + result.error);
    }
    if (result.status !== 0) {
        if (command === "prettier" && result.status === 2) {
            console.info("No matched file for Prettier, but not an error. Program continuing ...");
        } else {
            throw new Error(`Process returns non-zero exit code (${result.status})`);
        }
    }
}

function format(path) {
    runProcess("prettier", ["--config", "./prettier.json", "--write", path]);
}

function lint() {
    runProcess("eslint", [".", "--ext", ".js,.jsx,.ts,.tsx"]);
}

function checkPrettier(path) {
    runProcess("prettier", ["--config", "./prettier.json", "--list-different", path]);
}

function compile() {
    runProcess("tsc", ["-p", "./tsconfig.json"]);
}

format("./*.{js,jsx,ts,tsx,json}");
format("./app/**/*.{js,jsx,ts,tsx,json}");
lint();
checkPrettier("./*.{js,jsx,ts,tsx,json}");
checkPrettier("./app/**/*.{js,jsx,ts,tsx,json}");
compile();
