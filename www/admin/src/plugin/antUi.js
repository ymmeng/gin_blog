import Vue from 'vue'
import {
    Button,
    FormModel,
    Input,
    Icon,
    message,
    Layout,
    Menu,
    Card,
    Table,
    Row,
    Col,
    ConfigProvider,
    Avatar,
    Badge,
    Calendar,
    Modal,
    Select,
    Switch,
    Radio,
    Upload,

} from 'ant-design-vue'

message.config({
    top: '100px',
    duration: 2,
    maxCount: 3
})

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.use(Button)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Card)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(ConfigProvider)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Calendar)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Radio)
