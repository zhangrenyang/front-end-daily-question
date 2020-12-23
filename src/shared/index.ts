import { QuickPickItem, workspace, WorkspaceConfiguration } from "vscode";

export interface IQuickItemEx<T> extends QuickPickItem {
  value: T;
}

export function getWorkspaceConfiguration(): WorkspaceConfiguration {
  return workspace.getConfiguration("front-end-interview");
}

export function getWorkspaceFolder(): string {
  return getWorkspaceConfiguration().get<string>("workspaceFolder", "");
}

export enum DescriptionConfiguration {
  InWebView = "In Webview",
  InFileComment = "In File Comment",
  Both = "Both",
  None = "None",
}
