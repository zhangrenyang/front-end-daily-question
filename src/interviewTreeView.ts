import {
  ProviderResult,
  TreeItemCollapsibleState,
  Command,
  TreeItem,
  TreeDataProvider,
  Event,
} from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as globby from "globby";
import  client  from "./mock";

export class Interview implements TreeDataProvider<Question> {
  onDidChangeTreeData?: Event<void | Question | null | undefined> | undefined;
  getTreeItem(element: Question): TreeItem {
    return element;
  }
  getChildren(element?: Question): ProviderResult<Question[]> {
    return this.getQuestions();
    throw new Error("Method not implemented.");
  }
  async getQuestions() {
    try {
      let result = client.list();
      let arr = result.objects.map(
        (ele: any, index: number) =>
          new Question(ele.name, {
            command: "interview.openQuestion",
            title: "",
            arguments: [ele.name, index],
          })
      );
      arr.sort((a: Question, b: Question): number => {
        return Number(a.label.split(".")[0]) - Number(b.label.split(".")[0]);
      });
      return arr;
    } catch (e) {
      console.log(e);
    }
  }
}

export class Question extends TreeItem {
  constructor(
    public readonly label: string,
    // public readonly url: string,
    public readonly command?: Command
  ) {
    super(label);
    this.tooltip = `${this.label}`;
  }

  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "light",
      "dependency.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "dark",
      "dependency.svg"
    ),
  };

  contextValue = "dependency";
}
