import { Command } from "commander";
import { version, name, description } from "../package.json";

new Command()
  .name(name)
  .version(version)
  .description(description)
  .option("-c, --config", "config file path", "config.json")
  .requiredOption("-n, --name <string>", "name")
  .argument("<dir>", "dir")
  .action(function (dir, options) {
    console.log(dir, options);
  })
  .parse();
