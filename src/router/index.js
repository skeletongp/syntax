import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import { useUserStore } from '../stores';
const routes=[
  {
    path: '/',
    redirect: '/pages/home'
  },
 
  {
    path: '/pages/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/pages/home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'new',
        name: 'new',
        component: () => import('@/views/NewTask.vue')
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/views/TaskPage.vue')
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/TaskView.vue')

      }
      
      
    ]
  },
  {
    path: '/auth/login',
    component: () => import('@/views/auth/LoginPage.vue')

  },
  {
    path: '/auth/register',
    component: () => import('@/views/auth/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//set beforeEnter to check if user is logged in
router.beforeEach((to, from, next) => {
  const userStore=useUserStore();
  const isLogged = userStore.isLoggedIn;
  if (to.path === "/auth/login") {
    if (isLogged) {
      next("/pages/home");
    } else {
      next();
    }
  } else  {
    if (isLogged || to.path === "/auth/register") {
      next();
    } else {
      console.log(to.path)
      next("/auth/login");
    }
  }
})

export default router
