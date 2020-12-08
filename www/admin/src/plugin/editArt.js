import Vue from 'vue'
// v-md-editor 编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdEditor from '@kangc/v-md-editor';
// 引入主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress';
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
// 导入代码高亮语言
// import 'prismjs/components/prism-go'
// import 'prismjs/components/prism-python'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-php'
// import 'prismjs/components/prism-css'
// import 'prismjs/components/prism-xml-doc'
// import 'prismjs/components'

import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import xml from 'highlight.js/lib/languages/xml';
import ruby from 'highlight.js/lib/languages/ruby';
import java from 'highlight.js/lib/languages/java';
// 插件
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createHighlightLinesPlugin());
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createEmojiPlugin());
VueMarkdownEditor.use(githubTheme, {
    codeHighlightExtensionMap: {
        vue: 'xml',
    },
    extend(md, hljs) {
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
        // md.set(option).use(plugin);
        // 注册语言包
        hljs.registerLanguage('json', json);
        hljs.registerLanguage('python', python);
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('php', php);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('go', go);
        hljs.registerLanguage('ruby', ruby);
        hljs.registerLanguage('java', java);
    },
});

VMdEditor.xss.extend({
    // 扩展白名单
    whiteList: {
        source: [],//为 空，表示过滤出所有标签  
        stripIgnoreTag: true,// 过滤掉不在白名单中的所有HTML  
        stripIgnoreTagBody: ["script "]
    },
});

Vue.use(VueMarkdownEditor);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mavonEditor 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)