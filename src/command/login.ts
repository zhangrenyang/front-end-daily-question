import * as vscode from "vscode";
import { getGithubAccount, isStudent } from "../service";

export async function login(context: vscode.ExtensionContext): Promise<void> {
	const { account, accessToken } = await vscode.authentication.getSession(
		"github",
		["user:email"],
		{
			createIfNone: true,
		}
	);

	if (!account) {
		vscode.window.showWarningMessage("请检查github账户权限");
		return;
	}

	if (!account) {
		vscode.window.showWarningMessage("请检查github账户权限");
		return;
	}
	try {
		const { data } = await getGithubAccount(accessToken);
		const res = await isStudent(data);
		if (res.isStudent) {
			// 正式学员 webview要带token
			vscode.window.showInformationMessage(`登录成功，欢迎 🌹🌹🌹`);
		} else {
			vscode.window.showInformationMessage(
				`您非正式学员 或 需等待助教后台绑定`
			);

			// const resmsg = await vscode.window.showInformationMessage('请绑定正式学员账户', '绑定', '没有账户')
			// if (resmsg === '没有账户') {
			//     vscode.env.openExternal(vscode.Uri.parse('http://www.zhufengpeixun.cn/'));
			// }
			// if (resmsg === '绑定') {
			//     const stuNum: string | undefined = await vscode.window.showInputBox({
			//         prompt: "请输入学号",
			//         ignoreFocusOut: true,
			//         validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "学号不能为空",
			//     });
			//     const pwd: string | undefined = await vscode.window.showInputBox({
			//         prompt: "请输入密码(初始密码是后四位)",
			//         password: true,
			//         ignoreFocusOut: true,
			//         validateInput: (s: string): string | undefined => s ? undefined : "密码不能为空",
			//     });
			//     instance.post(`/github/bindingStudent`, { stuNum,pwd });
			// }
		}
	} catch (e) {
		vscode.window.showInformationMessage(JSON.stringify(e));
	}

	return;
}
