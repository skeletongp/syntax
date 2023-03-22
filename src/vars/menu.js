import * as icons from '@mdi/js'
import HomePage from '@/views/HomePage.vue';
import NewTask from '@/views/NewTask.vue';
import TaskPage from '@/views/TaskPage.vue';


const menuItems=[
    {
        key: 'home',
        icon: icons.mdiHomeOutline,
        path: '/home',
        component: HomePage
    },
    {
        key: 'new',
        icon: icons.mdiPlusCircleOutline,
        path: '/new',
        component: NewTask
    },
    {
        key: 'pending',
        icon: icons.mdiCalendarCheckOutline,
        path: '/pending',
        component: TaskPage

    },
   
    {
        key: 'completed',
        icon: icons.mdiPoll,
        path: '/completed',
        component: TaskPage
    }
]


export default menuItems