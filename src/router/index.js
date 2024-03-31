import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import Authorize from '../views/Menu/Authorize.vue'
import Document from '../views/Menu/Document.vue'
import Mission from '../views/Menu/Mission.vue'
import Contract from '../views/Menu/Contract.vue'
import Login from '../views/Auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/apercu',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },

    {
      path: '/mission',
      name: 'mission',
      component: Mission,
      meta: { requiresAuth: true }
    },
    {
      path: '/contrat',
      name: 'contract',
      component: Contract,
      meta: { requiresAuth: true }
    },
    {
      path: '/authorisation',
      name: 'authorize',
      component: Authorize,
      meta: { requiresAuth: true }
    },

    {
      path: '/document',
      name: 'document',
      component: Document,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (!requiresAuth) {
    next()
    return
  }

  const auth = getAuth()
  // Convertir onAuthStateChanged en une promesse pour attendre la vérification de l'état d'authentification
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(next())
      } else {
        resolve(next('/'))
      }
    })
  })
})

export default router
