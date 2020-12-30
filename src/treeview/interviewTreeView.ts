import {
  ProviderResult,
  Command,
  TreeItem,
  TreeDataProvider,
  Event,
} from "vscode";
import * as path from "path";
import { getProblemList } from "../service";

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
      let result = await getProblemList();
      let arr = result.data.map(
        (ele, index) =>
          new Question(ele.name, {
            command: "interview.openQuestion",
            title: "",
            arguments: [ele],
          })
      );
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
}
