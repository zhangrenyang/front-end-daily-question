import * as vscode from "vscode";
import { AbstractWebview, IWebviewOption } from "./AbstractWebview";
import { getAnswers, IGetAnswersRes } from "../service";

export class AnswersWebview extends AbstractWebview {
  protected readonly viewType: string = "answers.preview";
  private answersRes: IGetAnswersRes | undefined;

  constructor(private dayId: string) {
    super();
  }

  public async init(gitId:number) {
    this.answersRes = await getAnswers(this.dayId, gitId);
  }

  public show(): void {
    this.showWebviewInternal();
  }

  protected getWebviewOption(): IWebviewOption {
    return {
      title: `题目${this.dayId}答案`,
      viewColumn: vscode.ViewColumn.One,
      preserveFocus: true,
    };
  }

  protected getWebviewContent(): string {
    const defaultErrorMsg = "资源加载失败";
    if (!this.answersRes) return `<h2>${defaultErrorMsg}</h2>`;
    const {
      success,
      errorMsg = defaultErrorMsg,
      subject_name,
      subject_content,
      refer_answer,
      data,
    } = this.answersRes;
    if (!success) return `<h2>${errorMsg}</h2>`;
    const prefix = `
            <h2>${subject_name}</h2>
            <blockquote>${subject_content}</blockquote>
            <h2>参考答案：</h2>
            <pre>${refer_answer}</pre>
            <h2>大家的答案：</h2>`;
    const list = data.map((it) => {
      return `<li><pre>${it.answer_content}</pre></li>`;
    });

    const html = `<html>
            <head>
            <style>
                pre {
                    word-wrap: normal;
                    padding: 16px;
                    overflow: auto;
                    font-size: 85%;
                    line-height: 1.45;
                    background-color: #f6f8fa;
                    color: #000;
                    border-radius: 3px; 
                }
                blockquote {
                    padding: 10px;
                    color: #777;
                    border-left: 4px solid #ddd;
                    margin-left: 0;
                }
                ul { padding-left: 0; }
                li { list-style: none; }
            </style>
            </head>
                <body>
                    ${prefix}
                    <ul>${list.join("")}</ul>
                </body>
            </html>`;
    return html;
  }

  protected onDidDisposeWebview(): void {
    super.onDidDisposeWebview();
  }
}
