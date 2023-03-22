
import {
    Tabs,
    TabPane,
    Calendar,
    Image,
    Popconfirm
} from "ant-design-vue"

 function antd (app){
    app.component(Tabs.name,Tabs)
    app.component(TabPane.name,TabPane)
    app.component(Calendar.name, Calendar);
    app.component(Image.name, Image);
    app.component(Popconfirm.name, Popconfirm);
}

export default antd