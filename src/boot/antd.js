
import {
    Tabs,
    TabPane,
    Calendar,
    Image,
    Popconfirm,
    Popover,
    Button
} from "ant-design-vue"

 function antd (app){
    app.component(Tabs.name,Tabs)
    app.component(TabPane.name,TabPane)
    app.component(Calendar.name, Calendar);
    app.component(Image.name, Image);
    app.component(Popconfirm.name, Popconfirm);
    app.component(Popover.name, Popover);
    app.component(Button.name, Button);
}

export default antd