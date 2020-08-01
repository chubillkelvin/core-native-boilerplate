import {Utility} from "./Utility";
import fs from "fs-extra";
import yargs from "yargs";
import path from "path";

/**
 * ModuleGenerator is to generate a module template sources quickly.
 *
 * @moduleName: Canonical name for a module, e.g: system/setting, if not specified, it will use command line first argument.
 * @moduleBasePath: Path for module folder, used to generate new module, and retrieve existing module structure.
 */
export class ModuleGenerator {
    private readonly moduleName: string;
    private readonly moduleBasePath: string;
    private readonly reduxStateTypePath: string;
    private readonly templatePath: string;

    constructor({moduleName, moduleBasePath, reduxStateTypePath}: {moduleName?: string; moduleBasePath: string; reduxStateTypePath: string}) {
        this.moduleName = moduleName || yargs.argv._[0];
        this.moduleBasePath = moduleBasePath;
        this.reduxStateTypePath = reduxStateTypePath;
        this.templatePath = path.resolve(__dirname, "./module-template");
    }

    async run() {
        try {
            this.checkPreCondition();
            this.copyTemplate();
            this.updateTemplateContent();
            this.updateReduxState();
            this.formatSources();
        } catch (e) {
            try {
                fs.removeSync(this.moduleBasePath + "/" + this.moduleName);
            } catch (e) {
                // Do nothing
            }
            Utility.printErrorThenExit(e);
        }
    }

    private checkPreCondition() {
        Utility.print("Checking pre-conditions");

        const splitModuleNames = this.moduleName.split("/");
        const availableTopLevelModuleNames = fs
            .readdirSync(this.moduleBasePath, {withFileTypes: true})
            .filter(dirent => dirent.isDirectory() && dirent.name !== "main")
            .map(dirent => dirent.name);

        if (!fs.existsSync(this.reduxStateTypePath)) throw new Error(`Redux state file [${this.reduxStateTypePath}] does not exist`);
        if (!this.moduleName) throw new Error("Module name must be specified (via command line, or constructor)");
        if (splitModuleNames.length !== 2) throw new Error("Module name must be of parent/child format");
        if (!availableTopLevelModuleNames.includes(splitModuleNames[0])) throw new Error(`Module [${splitModuleNames[0]}] must be one of ${availableTopLevelModuleNames.join("/")}`);
        if (!/^[a-z]+?((-[a-z]+?)|(-v[0-9]+?))*$/.test(splitModuleNames[1])) throw new Error(`Module name [${splitModuleNames[1]}] does not conform to naming convention`);
        if (fs.existsSync(this.moduleBasePath + "/" + this.moduleName)) throw new Error(`Module [${this.moduleName}] already exists`);
    }

    private copyTemplate() {
        const path = this.moduleBasePath + "/" + this.moduleName;
        Utility.print("Copying template to target", path);
        fs.copySync(this.templatePath, path);
    }

    private updateTemplateContent() {
        const indexPath = this.moduleBasePath + "/" + this.moduleName + "/index.ts";
        Utility.print("Updating index.ts", indexPath);
        Utility.replaceTemplate(indexPath, [
            this.getModuleNameInFormat("camel"), // {1}
            this.getModuleNameInFormat("pascal", "Main"), // {2}
            this.getModuleNameInFormat("pascal", "Module"), // {3}
        ]);

        const mainComponentPath = this.moduleBasePath + "/" + this.moduleName + "/component/Main.tsx";
        Utility.print("Updating Main Component", mainComponentPath);
        Utility.replaceTemplate(mainComponentPath, [this.getModuleNameInFormat("pascal", "Main")]);

        const hooksPath = this.moduleBasePath + "/" + this.moduleName + "/hooks.ts";
        Utility.print("Updating hooks.ts", hooksPath);
        Utility.replaceTemplate(hooksPath, [
            this.getModuleNameInFormat("pascal", "State"), // {1}
            this.getModuleNameInFormat("camel"), // {2}
        ]);
    }

    private updateReduxState() {
        Utility.print("Updating redux state definition", this.reduxStateTypePath);

        const stateFileContent = fs.readFileSync(this.reduxStateTypePath).toString();
        const lastStateDeclarationIndex = stateFileContent.lastIndexOf("};");
        if (lastStateDeclarationIndex === -1) throw new Error("Cannot find state declaration");

        const moduleFullName = this.getModuleNameInFormat("camel");
        const moduleStateName = this.getModuleNameInFormat("pascal", "State");
        const newStateFileContent =
            `import {State as ${moduleStateName}} from "app/module/${this.moduleName}/type";\n` +
            stateFileContent.substr(0, lastStateDeclarationIndex) +
            `${moduleFullName}: ${moduleStateName};\n` +
            stateFileContent.substr(lastStateDeclarationIndex);

        fs.writeFileSync(this.reduxStateTypePath, newStateFileContent);
    }

    private formatSources() {
        Utility.formatFile(`${this.moduleBasePath}/${this.moduleName}/**/*.{ts,tsx}`, this.reduxStateTypePath);
    }

    /**
     * Create a name based on this.moduleName.
     *
     * @param format: can be "pascal" or "camel" (default).
     *
     * For example: this.moduleName is "account/order-detail"
     * (format = "pascal", postfix = "State") => AccountOrderDetailState
     * (format = "camel", postfix = "Foo") => accountOrderDetailFoo
     *
     * Special case: for common/some-name module, common will be omitted.
     */
    private getModuleNameInFormat(format: "pascal" | "camel", postfix = "") {
        const replaceHyphen = (name: string, alwaysPascal: boolean) => {
            return name
                .split("-")
                .map((_, index) => (alwaysPascal || index > 0 ? _.substr(0, 1).toUpperCase() + _.slice(1) : _))
                .join("");
        };

        const [moduleName, subModuleName] = this.moduleName.split("/");
        const camelNameWithoutPostfix = moduleName === "common" ? replaceHyphen(subModuleName, false) : replaceHyphen(moduleName, false) + replaceHyphen(subModuleName, true);

        if (format === "pascal") {
            return camelNameWithoutPostfix.charAt(0).toUpperCase() + camelNameWithoutPostfix.slice(1) + postfix;
        } else {
            return camelNameWithoutPostfix + postfix;
        }
    }
}

new ModuleGenerator({
    moduleBasePath: path.resolve(__dirname, "../app/module"),
    reduxStateTypePath: path.resolve(__dirname, "../app/type/state.ts"),
}).run();
