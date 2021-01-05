import * as vscode from "vscode";
import { commands, window } from "vscode";
import { codeLensController } from "./codelens/codelenController";
import { openQuestion } from "./command/openQuestion";
import { openAnswer } from "./command/openAnswer";
import { postAnswer } from "./command/postAnswer";
import { Interview } from "./treeview/interviewTreeView";
import { login } from "./command/login";
import { SidebarProvider } from "./webview/EnglishSiderBarWebview";
export async function activate(
	context: vscode.ExtensionContext
): Promise<void> {
	try {
		// -------- interview 相关 -------------
		const interviewProvider = new Interview(context);
		window.createTreeView("interview", {
			treeDataProvider: interviewProvider,
		});
		commands.registerCommand("interview.openQuestion", (ele) => {
			openQuestion(ele);
		});
		commands.registerCommand("interview.refresh", () => {
			interviewProvider.refresh();
			vscode.window.showInformationMessage("刷新");
		});
		commands.registerCommand("interview.openAnswer", (doc) => {
			openAnswer(doc, context);
		});
		commands.registerCommand("interview.openAnswerByInline", (node) => {
			openAnswer(Object.assign({}, node, { fileName: node.label }), context);
		});
		commands.registerCommand("interview.postAnswer", (doc, content) => {
			postAnswer(doc, content, context);
		});
		commands.registerCommand("zffe.login", () => {
			login(context);
		});
		context.subscriptions.push(codeLensController);
		// -------- interview 相关 -------------
		// -------- English 相关 -----------
		const sidebarProvider = new SidebarProvider(context.extensionUri);
		context.subscriptions.push(
			vscode.window.registerWebviewViewProvider("dailyEnglish", sidebarProvider)
		);
		// -------- English 相关 -----------
	} catch (error) {
		window.showInformationMessage(error);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
