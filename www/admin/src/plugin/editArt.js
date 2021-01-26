import Vue from 'vue'

// v-md-editor 编辑器
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

// 代码高亮
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import php from 'highlight.js/lib/languages/php';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import xml from 'highlight.js/lib/languages/xml';
import ruby from 'highlight.js/lib/languages/ruby';
import java from 'highlight.js/lib/languages/java';
import protobuf from 'highlight.js/lib/languages/protobuf';
import shell from 'highlight.js/lib/languages/shell';
import c from 'highlight.js/lib/languages/c';
VMdEditor.use(githubTheme, {
    codeHighlightExtensionMap: {
        vue: 'xml',
    },
    extend(md, hljs) {
        // 注册语言包
        hljs.registerLanguage('json', json);
        hljs.registerLanguage('python', python);
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('typescript', typescript);
        hljs.registerLanguage('php', php);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('go', go);
        hljs.registerLanguage('ruby', ruby);
        hljs.registerLanguage('java', java);
        hljs.registerLanguage('protobuf', protobuf);
        hljs.registerLanguage('shell', shell);
        hljs.registerLanguage('c', c);
    },
});

// 插件/扩展
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
VMdEditor.use(createCopyCodePlugin());
VMdEditor.use(createHighlightLinesPlugin());
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createTodoListPlugin());
VMdEditor.use(createEmojiPlugin());
VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme);

VMdEditor.xss.extend({
    // 扩展白名单
    whiteList: {
        source: [],//为 空，表示过滤出所有标签
        stripIgnoreTag: true,// 过滤掉不在白名单中的所有HTML
        stripIgnoreTagBody: ["script "]
    },
});

Vue.use(VMdEditor);


// mavonEditor 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
