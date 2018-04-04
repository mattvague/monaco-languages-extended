'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	defaultToken: '',
	tokenPostfix: '.python',

	storageTypeClassPython: ['class'],
	constantLanguagePython: ['True', 'False', 'None', 'Notimplemented'],
	storageTypeFunctionPython: ['def'],
	variableLanguageSpecial: ['self'],
	keywordsControlFlow: ['as', 'async', 'continue', 'del', 'assert', 'break', 'finally', 'for', 'from', 'elif', 'else', 'if', 'except', 'pass', 'raise', 'return', 'try', 'while', 'with'],

	supportFunctionBuiltin: ['__import__', 'abs', 'all', 'any', 'ascii', 'bin', 'callable', 'chr', 'compile', 'copyright', 'credits', 'delattr', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'exit', 'filter', 'format', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'isinstance', 'issubclass', 'iter', 'len', 'license', 'locals', 'map', 'max', 'memoryview', 'min', 'next', 'oct', 'open', 'ord', 'pow', 'print', 'quit', 'range', 'reload', 'repr', 'reversed', 'round', 'setattr', 'sorted', 'sum', 'vars', 'zip'],

	keywords: ['and', 'as', 'assert', 'break', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'self', 'try', 'while', 'with', 'yield', 'int', 'float', 'long', 'complex', 'hex', 'abs', 'all', 'any', 'apply', 'basestring', 'bin', 'bool', 'buffer', 'bytearray', 'callable', 'chr', 'classmethod', 'cmp', 'coerce', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'execfile', 'file', 'filter', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'id', 'input', 'intern', 'isinstance', 'issubclass', 'iter', 'len', 'locals', 'list', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'reversed', 'range', 'raw_input', 'reduce', 'reload', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'unichr', 'unicode', 'vars', 'xrange', 'zip'],

	brackets: [{ open: '{', close: '}', token: 'delimiter.curly' }, { open: '[', close: ']', token: 'delimiter.bracket' }, { open: '(', close: ')', token: 'delimiter.parenthesis' }],

	tokenizer: {
		root: [{ include: '@whitespace' }, { include: '@numbers' }, { include: '@strings' }, [/[,:;]/, 'delimiter'], [/[{}[\]()]/, '@brackets'], [/\b(class\s+)([A-Za-z|_][A-Za-z0-9_]+)/, ['storage.type.class', 'entity.name.type.class']], [/\b[-_A-Z0-9]{2,}\b/, 'constant.other.caps'], [/@[a-zA-Z]\w*/, 'tag'], [/[a-zA-Z]\w*/, {
			cases: {
				'@keywords': 'keyword',
				'@keywordsControlFlow': 'keyword.control.flow',
				'@constantLanguagePython': 'constant.language',
				'@supportFunctionBuiltin': 'support.function.builtin',
				'@storageTypeFunctionPython': 'storage.type.function',
				'@default': 'identifier'
			}
		}]],

		// Deal with white space, including single and multi-line comments
		whitespace: [[/\s+/, 'white'], [/(^#.*$)/, 'comment'], [/('''.*''')|(""".*""")/, 'string'], [/'''.*$/, 'string', '@endDocString'], [/""".*$/, 'string', '@endDblDocString']],
		endDocString: [[/\\'/, 'string'], [/.*'''/, 'string', '@popall'], [/.*$/, 'string']],
		endDblDocString: [[/\\"/, 'string'], [/.*"""/, 'string', '@popall'], [/.*$/, 'string']],

		// Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
		numbers: [[/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'], [/-?(\d*\.)?\d+([eE][+-]?\d+)?[jJ]?[lL]?/, 'number']],

		// Recognize strings, including those broken across lines with \ (but not without)
		strings: [[/'$/, 'string.escape', '@popall'], [/'/, 'string.escape', '@stringBody'], [/"$/, 'string.escape', '@popall'], [/"/, 'string.escape', '@dblStringBody']],
		stringBody: [[/\\./, 'string'], [/'/, 'string.escape', '@popall'], [/.(?=.*')/, 'string'], [/.*\\$/, 'string'], [/.*$/, 'string', '@popall']],
		dblStringBody: [[/\\./, 'string'], [/"/, 'string.escape', '@popall'], [/.(?=.*")/, 'string'], [/.*\\$/, 'string'], [/.*$/, 'string', '@popall']]
	}
};