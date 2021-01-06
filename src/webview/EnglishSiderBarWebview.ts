import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import { getDailyEnglish, IEnglishDailyRes } from "../service";

export class SidebarProvider implements vscode.WebviewViewProvider {
	_view?: vscode.WebviewView;
	_doc?: vscode.TextDocument;

	constructor(private readonly _extensionUri: vscode.Uri) {}

	public async resolveWebviewView(webviewView: vscode.WebviewView) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [this._extensionUri],
		};
		try {
			const res = await getDailyEnglish();
			webviewView.webview.html = this._getHtmlForWebview(
				webviewView.webview,
				res
			);
		} catch (error) {
			return;
		}
	}
	private _getHtmlForWebview(
		webview: vscode.Webview,
		res: AxiosResponse<IEnglishDailyRes>
	) {
		return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h2>每日一句😊</h2>
            <h3>${res.data.sentenceViewList[0]?.dailysentence?.content}</h3>
            <h3>${res.data.sentenceViewList[0]?.dailysentence?.note}</h3>
            <h2>每日单词🌟</h2>
            ${res.data.sentenceViewList[0]?.sentenceLecture?.lectureConfigList[0]?.paraphraseList
							?.map((ele) => {
								return `<h3>${ele.sentence} ${ele.symbol}</h3>
                <h3>${ele.paraphrase}</h3>
                `;
							})
							.join("\n----------")}
        </body>
        </html>`;
	}
}
