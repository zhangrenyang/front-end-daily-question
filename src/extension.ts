import * as vscode from "vscode";
import { commands, ExtensionContext, window, workspace } from "vscode";
import { openQuestion } from "./command/openQuestion";
import { Interview } from "./interviewTreeView";
export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  try {
		// -------- interview 相关 ！！！ 才是重点！！！！！！！！！！！！！！！！！！！！！！！！！-------------
		const interviewProvider = new Interview();
    window.createTreeView("interview", {
      treeDataProvider: interviewProvider,
    });
    commands.registerCommand("interview.openQuestion", (name, index) => {
      openQuestion(name, index);
    });

		// -------- interview 相关 ！！！ 才是重点！！！！！！！！！！！！！！！！！！！！！！！！！-------------
  } catch (error) {
    window.showInformationMessage(error);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
