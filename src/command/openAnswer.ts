import * as vscode from "vscode";
import { AnswersWebview } from "../webview/AnswersWebview";
import { getDayId } from "../utils/getDayId";

export async function openAnswer(document: vscode.TextDocument): Promise<void> {
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
