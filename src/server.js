"use strict";
// import * as vscode from 'vscode';
Object.defineProperty(exports, "__esModule", { value: true });
// export function activate(context: vscode.ExtensionContext) {
//     // Register a completion item provider for component and style templates
//     const completionProvider = vscode.languages.registerCompletionItemProvider(
//         ['template-rt-component', 'template-rt-style'], // target languages
//         {
//             provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
//                 const line = document.lineAt(position).text;
//                 const openingBrackets = line.lastIndexOf('{{', position.character);
//                 const closingBrackets = line.indexOf('}}', position.character);
//                 // Check if the cursor is between the opening {{ and closing }} brackets
//                 // if (openingBrackets !== -1 && closingBrackets !== -1 && openingBrackets < position.character && closingBrackets > position.character) {
//                 // Provide the three variable suggestions only inside {{ }}
//                 const functionNameCompletion = new vscode.CompletionItem('functionName', vscode.CompletionItemKind.Variable);
//                 const componentNameCompletion = new vscode.CompletionItem('componentName', vscode.CompletionItemKind.Variable);
//                 const styleFileNameCompletion = new vscode.CompletionItem('styleFileName', vscode.CompletionItemKind.Variable);
//                 return [functionNameCompletion, componentNameCompletion, styleFileNameCompletion];
//                 // }
//                 // Return no completions outside of {{ }}
//                 return undefined;
//             }
//         },
//         '{' // Trigger on typing {{
//     );
//     context.subscriptions.push(completionProvider);
//     // Diagnostic logic remains unchanged
//     const diagnosticCollection = vscode.languages.createDiagnosticCollection('template-rt-diagnostics');
//     context.subscriptions.push(diagnosticCollection);
//     // Function to check diagnostics when documents are opened or edited
//     function checkDiagnostics(document: vscode.TextDocument) {
//         if (document.languageId !== 'template-rt-component' && document.languageId !== 'template-rt-style') {
//             return; // Skip if not the correct language
//         }
//         const diagnostics: vscode.Diagnostic[] = [];
//         const allowedVariables = ['functionName', 'componentName', 'styleFileName'];
//         // Regex to find everything inside {{ }}
//         const regex = /{{(.*?)}}/g;
//         for (let i = 0; i < document.lineCount; i++) {
//             const line = document.lineAt(i).text;
//             let match;
//             // Find all {{ }} patterns in the line
//             while ((match = regex.exec(line)) !== null) {
//                 const innerContent = match[1].trim();
//                 // If the inner content is not one of the allowed variables, mark as an error
//                 if (!allowedVariables.includes(innerContent)) {
//                     const startPos = new vscode.Position(i, match.index);
//                     const endPos = new vscode.Position(i, match.index + match[0].length);
//                     const range = new vscode.Range(startPos, endPos);
//                     // Create a diagnostic error for invalid content inside {{ }}
//                     const diagnostic = new vscode.Diagnostic(
//                         range,
//                         `Invalid variable "${innerContent}" inside {{}}. Only 'functionName', 'componentName', and 'styleFileName' are allowed.`,
//                         vscode.DiagnosticSeverity.Error
//                     );
//                     diagnostics.push(diagnostic);
//                 }
//             }
//         }
//         // Set diagnostics for the current document
//         diagnosticCollection.set(document.uri, diagnostics);
//     }
//     // Listen for document changes and trigger diagnostics
//     context.subscriptions.push(
//         vscode.workspace.onDidOpenTextDocument(checkDiagnostics),
//         vscode.workspace.onDidChangeTextDocument(e => checkDiagnostics(e.document)),
//         vscode.workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri))
//     );
// }
// export function deactivate() {
//     // Clean up resources on deactivation if necessary
// }
//# sourceMappingURL=server.js.map