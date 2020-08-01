/* eslint-disable import/no-dynamic-require */
import path from "path";
import yargs from "yargs";
import {Utility} from "./Utility";

export class CodeChecker {
    private readonly projectPath: string;
    private readonly isFastMode: boolean;

    constructor({projectPath}: {projectPath: string}) {
        this.projectPath = projectPath;
        this.isFastMode = yargs.argv.mode === "fast";
    }

    run() {
        if (!this.isFastMode) {
            this.checkPackageDeps();
            this.checkCodeStyle();
            this.checkLint();
        }
        this.checkTypeScript();
    }

    private checkPackageDeps() {
        Utility.print("Checking package.json");
        const localDeps = require(`${this.projectPath}/package.json`).dependencies;
        if (Object.values(localDeps).some(version => !/^\d/.test(String(version)))) {
            Utility.printErrorThenExit("Local project dependency must be a valid npm version");
        }
        const devDeps = require(`${this.projectPath}/package.json`).devDependencies;
        if (Object.values(devDeps).some(version => !/^\d/.test(String(version)))) {
            Utility.printErrorThenExit("Dev dependency in shared library must be a valid npm version");
        }
    }

    private checkCodeStyle() {
        Utility.print("Checking code styles (both current project and shared)");
        Utility.prettier(`${this.projectPath}/app/**/*.{ts,tsx}`, true);
        Utility.prettier(`${this.projectPath}/index.js`, true);
    }

    private checkTypeScript() {
        Utility.print("Checking TypeScript");
        Utility.runProcess("tsc", ["-p", this.projectPath]);
    }

    private checkLint() {
        Utility.print("Checking Lint");
        Utility.runProcess("eslint", [`${this.projectPath}/app/**/*.{ts,tsx}`]);
        Utility.runProcess("eslint", [`${this.projectPath}/index.js`]);
    }
}

new CodeChecker({projectPath: path.resolve(__dirname, "../")}).run();
