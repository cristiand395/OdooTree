// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import ViewTree from './ViewTree';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "odootree" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('odootree.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		ViewTree();
		// const activeEditor = vscode.window.activeTextEditor;

		// if (activeEditor) {
		// 	const currentFilePath = activeEditor.document.uri.fsPath;
		// 	const currentDirectory = path.dirname(currentFilePath);

		// 	// Abrir el explorador de archivos del sistema en el directorio actual
		// 	if (fs.existsSync(currentDirectory)) {
		// 		console.log(`El directorio ${currentDirectory} existe.`);
		// 		vscode.workspace.openTextDocument(activeEditor.document.uri)
		// 			.then(doc => {
		// 				vscode.window.showTextDocument(doc);
		// 				vscode.window.showInformationMessage(`Current files name: ${path.basename(currentFilePath)}`);
		// 			});
		// 		// Crear y mostrar un panel webview
		// 		const panel = vscode.window.createWebviewPanel(
		// 			'odootreeview',
		// 			'Odoo Tree View',
		// 			vscode.ViewColumn.One,
		// 			{}
		// 		);

		// 		// Cargar contenido HTML en el panel webview
		// 		panel.webview.html = getWebviewContent(path.basename(currentFilePath));
		// 	} else {
		// 		console.log(`The current file ${currentDirectory} does not exist.`);
		// 		vscode.window.showErrorMessage(`The current file ${currentDirectory} does not exist.`);
		// 	}
		// } else {
		// 	vscode.window.showErrorMessage('No hay un archivo activo.');
		// }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
