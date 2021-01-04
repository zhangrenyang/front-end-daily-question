import * as vscode from "vscode";
import { AnswersWebview } from "../webview/AnswersWebview";
import { getDayId } from "../utils/getDayId";

export async function openAnswer(
	document: vscode.TextDocument,
	context: vscode.ExtensionContext
): Promise<void> {
	if (!context.globalState.get("login", false)) {
		vscode.window.showWarningMessage("请先登录");
		return;
	}

	const dayId = getDayId(document.fileName);
	if (!+dayId) {
		vscode.window.showErrorMessage("问题id不存在");
		return;
	}
	const answersWebview: AnswersWebview = new AnswersWebview(dayId);
	await answersWebview.init();
	answersWebview.show();
	return;
}
