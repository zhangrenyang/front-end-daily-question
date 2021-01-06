import * as vscode from "vscode";

export class CustomCodeLensProvider implements vscode.CodeLensProvider {
	private onDidChangeCodeLensesEmitter: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();

	get onDidChangeCodeLenses(): vscode.Event<void> {
		return this.onDidChangeCodeLensesEmitter.event;
	}

	public refresh(): void {
		this.onDidChangeCodeLensesEmitter.fire();
	}

	public provideCodeLenses(
		document: vscode.TextDocument
	): vscode.ProviderResult<vscode.CodeLens[]> {
		const content: string = document.getText();

		let codeLensLine: number = document.lineCount - 1;
		for (let i: number = document.lineCount - 1; i >= 0; i--) {
			const lineContent: string = document.lineAt(i).text;
			if (lineContent.indexOf("*[interview]: end") >= 0) {
				codeLensLine = i;
				break;
			}
		}

		if (
			content.indexOf("*[interview]: start") < 0 ||
			content.indexOf("*[interview]: end") < 0
		) {
			return [];
		}

		const range: vscode.Range = new vscode.Range(
			codeLensLine,
			0,
			codeLensLine,
			0
		);
		const codeLens: vscode.CodeLens[] = [];

		codeLens.push(
			new vscode.CodeLens(range, {
				title: "☑️提交答案",
				command: "interview.postAnswer",
				arguments: [document, content],
			})
		);

		codeLens.push(
			new vscode.CodeLens(range, {
				title: "👀查看题解",
				command: "interview.openAnswer",
				arguments: [document],
			})
		);
		return codeLens;
	}
}

export const customCodeLensProvider: CustomCodeLensProvider = new CustomCodeLensProvider();
