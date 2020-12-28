import * as vscode from "vscode";
import { commands, window } from "vscode";
import { openQuestion } from "./command/openQuestion";
import { Interview } from "./treeview/interviewTreeView";
export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  try {
    // -------- interview 相关 -------------
    const interviewProvider = new Interview();
    window.createTreeView("interview", {
      treeDataProvider: interviewProvider,
    });
    commands.registerCommand("interview.openQuestion", (ele) => {
      openQuestion(ele);
    });
    commands.registerCommand("interview.refresh", (name, index) => {
      vscode.window.showInformationMessage("刷新数据");
    });
    commands.registerCommand("interview.openAnswer", (name, index) => {
      vscode.window.showInformationMessage("查看答案");
    });
    commands.registerCommand("interview.postAnswer", (name, index) => {
      vscode.window.showInformationMessage("提交答案");
    });
    // -------- interview 相关 -------------
  } catch (error) {
    window.showInformationMessage(error);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
