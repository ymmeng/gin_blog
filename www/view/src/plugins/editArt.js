// import Vue from 'vue'
import Vue from 'vue';

// v-md-editor 编辑器
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';

// githubTheme 代码高亮
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
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
import dockerfile from 'highlight.js/lib/languages/dockerfile';
VMdEditor.use(githubTheme, {
    codeHighlightExtensionMap: {
        vue: 'xml',
        sh: 'shell',
    },
    extend(rm, hljs) {
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
        hljs.registerLanguage('dockerfile', dockerfile);
    },
});
VMdEditor.use(githubTheme);

// vuepressTheme 主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-http';
// import 'prismjs/components/prism-php';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-yaml';
VMdEditor.use(vuepressTheme);

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

// 插件/扩展
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/creator';

import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import '@kangc/v-md-editor/lib/plugins/todo-list/toolbar';
// 代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// 代码行与行区分
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';

// 代码快速拷贝
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VMdEditor.use(createCopyCodePlugin());
VMdEditor.use(createHighlightLinesPlugin());
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createTodoListPlugin());
VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createKatexPlugin());
VMdEditor.Codemirror = Codemirror;

VMdEditor.xss.extend({
    // 扩展白名单
    whiteList: {
        source: [],//为 空，表示过滤出所有标签  
        stripIgnoreTag: true,// 过滤掉不在白名单中的所有HTML  
        stripIgnoreTagBody: ["script "]
    },
});


Vue.use(VMdEditor);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
