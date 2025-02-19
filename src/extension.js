"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    // Register a completion item provider for component and style templates
    const completionProvider = vscode.languages.registerCompletionItemProvider(['template-rt-component', 'template-rt-style'], // target languages
    {
        provideCompletionItems(document, position) {
            const line = document.lineAt(position).text;
            const openingBrackets = line.lastIndexOf('_{', position.character);
            const closingBrackets = line.indexOf('}_', position.character);
            // Check if the cursor is between the opening _{ and closing }_ brackets
            // if (openingBrackets !== -1 && closingBrackets !== -1 && openingBrackets < position.character && closingBrackets > position.character) {
            // Provide the three variable suggestions only inside _{ }_
            const functionNameCompletion = new vscode.CompletionItem('functionName', vscode.CompletionItemKind.Variable);
            const componentNameCompletion = new vscode.CompletionItem('componentName', vscode.CompletionItemKind.Variable);
            const styleFileNameCompletion = new vscode.CompletionItem('styleFileName', vscode.CompletionItemKind.Variable);
            return [functionNameCompletion, componentNameCompletion, styleFileNameCompletion];
            // }
            // Return no completions outside of _{ }_
            return undefined;
        }
    }, '{' // Trigger on typing _{
    );
    context.subscriptions.push(completionProvider);
    // Diagnostic logic remains unchanged
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('template-rt-diagnostics');
    context.subscriptions.push(diagnosticCollection);
    // Function to check diagnostics when documents are opened or edited
    function checkDiagnostics(document) {
        if (document.languageId !== 'template-rt-component' && document.languageId !== 'template-rt-style') {
            return; // Skip if not the correct language
        }
        const diagnostics = [];
        const allowedVariables = ['functionName', 'componentName', 'styleFileName'];
        // Regex to find everything inside _{ }_
        const regex = /_{(.*?)}_/g;
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i).text;
            let match;
            // Find all _{ }_ patterns in the line
            while ((match = regex.exec(line)) !== null) {
                const innerContent = match[1].trim();
                // If the inner content is not one of the allowed variables, mark as an error
                if (!allowedVariables.includes(innerContent)) {
                    const startPos = new vscode.Position(i, match.index);
                    const endPos = new vscode.Position(i, match.index + match[0].length);
                    const range = new vscode.Range(startPos, endPos);
                    // Create a diagnostic error for invalid content inside _{ }_
                    const diagnostic = new vscode.Diagnostic(range, `Invalid variable "${innerContent}" inside _{}_. Only 'functionName', 'componentName', and 'styleFileName' are allowed.`, vscode.DiagnosticSeverity.Error);
                    diagnostics.push(diagnostic);
                }
            }
        }
        // Set diagnostics for the current document
        diagnosticCollection.set(document.uri, diagnostics);
    }
    // Listen for document changes and trigger diagnostics
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(checkDiagnostics), vscode.workspace.onDidChangeTextDocument(e => checkDiagnostics(e.document)), vscode.workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri)));
}
function deactivate() {
    // Clean up resources on deactivation if necessary
}
//# sourceMappingURL=extension.js.map