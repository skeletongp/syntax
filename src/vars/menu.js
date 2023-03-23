import * as icons from '@mdi/js'
import HomePage from '@/views/HomePage.vue';
import NewTask from '@/views/NewTask.vue';
import TaskPage from '@/views/TaskPage.vue';


const menuItems=[
    {
        key: 'home',
        icon: icons.mdiHomeOutline,
        path: '/home',
    },
    {
        key: 'new',
        icon: icons.mdiPlusCircleOutline,
        path: '/new',
    },
    {
        key: 'tasks',
        icon: icons.mdiCalendarCheckOutline,
        path: '/tasks',

    },
   
    {
        key: 'completed',
        icon: icons.mdiPoll,
        path: '/completed',
    }
]


export default menuItems