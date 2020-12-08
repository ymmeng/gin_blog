import Vue from 'vue'
// v-md-editor 编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// 导入代码高亮语言
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-xml-doc'
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
VueMarkdownEditor.use(vuepressTheme, {
    codeHighlightExtensionMap: {
        vue: 'xml',
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