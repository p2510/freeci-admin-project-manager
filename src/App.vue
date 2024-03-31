<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'
import 'animate.css'
import {
  Squares2X2Icon,
  MoonIcon,
  BuildingOffice2Icon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  EyeIcon,
  SunIcon,
  BriefcaseIcon,
  LockClosedIcon,
  LifebuoyIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/vue/24/outline'
import Discord from '@/components/icons/Discord.vue'
import Linkedin from '@/components/icons/Linkedin.vue'
import { useDark, useToggle } from '@vueuse/core'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = getAuth()

let logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('userInfo')
      router.push('/')
    })
    .catch((error) => {
      // An error happened.
    })
}

const isDark = useDark()
const toggleDark = useToggle(isDark)

let showMenu = ref(true)
let hide = () => {
  showMenu.value = !showMenu.value
}

let currentUser = ref('')
let dataUser = ref([])
const isLoading = ref(true)

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user.email
    setTimeout(() => {
      dataUser.value = JSON.parse(localStorage.getItem('user'))
      isLoading.value = false
    }, 1000)
    // Données chargées
  } else {
    currentUser.value = ''
  }
})
onMounted(() => {
  setTimeout(() => {
    dataUser.value = JSON.parse(localStorage.getItem('user'))
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div
    class="md:fixed grid grid-cols-1 md:grid-cols-12 gap-x-4 w-full h-screen bg-slate-100 dark:bg-slate-800 bg-opacity-55"
  >
    <!-- Bouton hamburger pour afficher/cacher le menu en mobile -->
    <div class="md:hidden w-full p-4 flex justify-end z-50 fixed">
      <button @click="hide" class="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 dark:text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>

    <header
      v-if="$route.name !== 'login'"
      class="hidden h-full overflow-auto col-span-1 md:col-span-3 lg:col-span-2 md:flex flex-col divide-y-[1px] divide-slate-200 dark:divide-slate-700"
    >
      <div class="flex flex-col w-full p-4 gap-4">
        <div class="flex flex-col flex-start gap-x-2 items-center">
          <div>
            <img src="@/assets/img/logo.png" class="hidden md:block" alt="" />
          </div>

          <h2 class="">
            <p role="status" v-if="isLoading">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-base1"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </p>

            <p
              v-else
              class="font-bold text-sm md:text-lg text-gray-900 dark:text-slate-50 capitalize"
            >
              {{ dataUser?.name }}
            </p>
          </h2>
        </div>
        <div
          v-if="isLoading"
          class="w-full px-2 py-4 bg-base1/20 rounded-lg text-base1 shadow-lg animate-pulse"
        ></div>
        <p
          v-else
          class="w-full p-2 bg-base1/30 rounded-lg text-base1 shadow-lg text-center font-semibold"
        >
          {{ dataUser?.category }}
        </p>
      </div>

      <nav class="p-4 h-3/5 overflow-y-scroll">
        <div class="flex flex-col gap-2">
          <h3 class="text-xs font-semibold text-slate-700 dark:text-white opacity-60 mb-2">
            GÉNÉRAL
          </h3>
          <RouterLink
            to="/apercu"
            class="flex items-center gap-x-2 px-5 py-2 rounded-lg bg-opacity-30 opacity-80 transition ease-in-out duration-300"
          >
            <Squares2X2Icon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
            <span class="text-slate-700 dark:text-slate-500">Aperçu</span>
          </RouterLink>
          <RouterLink
            to="/mission"
            class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
          >
            <BriefcaseIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
            <span class="text-slate-700 dark:text-slate-500">Mission</span>
          </RouterLink>
          <RouterLink
            to="/contrat"
            class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
          >
            <BuildingOffice2Icon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
            <span class="text-slate-700 dark:text-slate-500">Contrat</span>
          </RouterLink>
          <RouterLink
            to="/document"
            class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
          >
            <ClipboardDocumentListIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
            <span class="text-slate-700 dark:text-slate-500">Document</span>
          </RouterLink>
 
        </div>

        <div class="flex flex-col gap-2 mt-6">
          <h3 class="text-xs font-semibold text-slate-700 dark:text-white opacity-60 mb-2">
            LIENS EXTERNES
          </h3>
          <a
            href="https://discord.com/channels/1199644155836645416/1199645611985743872"
            target="__blank"
            class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
          >
            <Discord />
          </a>
          <a
            href="https://www.linkedin.com/company/freeci/"
            target="__blank"
            class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg text-green-500"
          >
            <Linkedin />
          </a>
        </div>
        <div class="flex flex-col gap-2 mt-6">
          <h3 class="text-xs font-semibold text-slate-700 dark:text-white opacity-60 mb-2">
            DECONNEXION
          </h3>

          <button
            @click="logout"
            class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
          >
            <ArrowLeftStartOnRectangleIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
            <span class="text-slate-700 dark:text-slate-500">Fermé</span>
          </button>
        </div>
        <div class="flex flex-col gap-2 mt-6">
          <div class="bg-slate-700 bg-opacity-30 mt-4 p-1 flex gap-2">
            <button
              v-if="isDark"
              @click="toggleDark()"
              class="bg-white flex justify-center gap-x-2 p-2 w-full"
            >
              <SunIcon class="w-5 h-5 text-slate-900" />
              <span class="font-semibold">Thème Clair</span>
            </button>
            <button v-else @click="toggleDark()" class="flex justify-center gap-x-2 p-2 w-full">
              <MoonIcon class="w-5 h-5 text-slate-900" />
              <span class="font-semibold">Thème Sombre</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
    <transition
      v-if="$route.name !== 'login'"
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutLeft"
      mode="out-in"
    >
      <header
        v-if="showMenu && $route.name !== 'login'"
        class="h-screen w-full z-40 fixed bg-white flex col-span-1 md:col-span-3 lg:col-span-2 md:hidden flex-col divide-y-[1px] divide-slate-200 dark:divide-slate-700"
      >
        <div class="flex flex-col w-full p-4 gap-4">
          <div class="flex flex-start gap-x-2 items-center">
            <img
              src="@/assets/img/logo.png"
              class="hidden md:block w-6 sm:w-10 h-6 sm:h-10"
              alt=""
            />
            <h2 class="">
              <p v-if="isLoading">...</p>

              <p
                v-else
                class="font-bold text-sm md:text-lg text-gray-900 dark:text-slate-50 capitalize"
              >
                {{ dataUser?.name }}
              </p>
            </h2>
          </div>
          <p class="dark:text-slate-300">{{ currentUser }}</p>
        </div>

        <nav class="p-4">
          <div class="flex flex-col gap-2">
            <h3 class="text-xs font-semibold text-slate-700 dark:text-white opacity-60 mb-2">
              MENU
            </h3>
            <RouterLink
              @click="hide"
              to="/apercu"
              class="flex items-center gap-x-2 px-5 py-2 rounded-lg bg-opacity-30 opacity-80 transition ease-in-out duration-300"
            >
              <Squares2X2Icon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
              <span class="text-slate-700 dark:text-slate-500">Aperçu</span>
            </RouterLink>

            <RouterLink
              @click="hide"
              to="/mission"
              class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
            >
              <BriefcaseIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
              <span class="text-slate-700 dark:text-slate-500">Mission</span>
            </RouterLink>

            <RouterLink
              @click="hide"
              to="/authorisation"
              class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
            >
              <KeyIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
              <span class="text-slate-700 dark:text-slate-500">Authorisation</span>
            </RouterLink>
    
            <RouterLink
              @click="hide"
              to="/document"
              class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
            >
              <ClipboardDocumentListIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
              <span class="text-slate-700 dark:text-slate-500">Document</span>
            </RouterLink>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <h3 class="text-xs font-semibold text-slate-700 dark:text-white opacity-60 mb-2">
              LIENS EXTERNES
            </h3>
            <a
              href="https://discord.com/channels/1199644155836645416/1199645611985743872"
              target="__blank"
              class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
            >
              <Discord />
            </a>
            <a
              href="https://www.linkedin.com/company/freeci/"
              target="__blank"
              class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg text-green-500"
            >
              <Linkedin />
            </a>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <h3 class="text-xs font-semibold text-slate-700 dark:text-white opacity-60 mb-2">
              DECONNEXION
            </h3>

            <button
              @click="logout"
              class="flex items-center gap-x-2 px-5 py-2 opacity-80 transition ease-in-out duration-300 rounded-lg"
            >
              <ArrowLeftStartOnRectangleIcon class="w-5 h-5 text-slate-800 dark:text-slate-500" />
              <span class="text-slate-700 dark:text-slate-500">Fermé</span>
            </button>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <div class="bg-slate-700 bg-opacity-30 mt-4 p-1 flex gap-2">
              <button
                v-if="isDark"
                @click="toggleDark()"
                class="bg-white flex justify-center gap-x-2 p-2 w-full"
              >
                <SunIcon class="w-5 h-5 text-slate-900" />
                <span class="font-semibold">Thème Clair</span>
              </button>
              <button v-else @click="toggleDark()" class="flex justify-center gap-x-2 p-2 w-full">
                <MoonIcon class="w-5 h-5 text-slate-900" />
                <span class="font-semibold">Thème Sombre</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </transition>

    <RouterView
      :class="
        $route.name !== 'login'
          ? ' col-span-1 md:col-span-9 lg:col-span-10 bg-white dark:bg-slate-900 p-6 overflow-auto'
          : ' col-span-1 md:col-span-12 bg-white dark:bg-slate-900 p-6 overflow-auto'
      "
      v-slot="{ Component }"
    >
      <Component :is="Component" />
    </RouterView>
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  background-color: rgb(229 231 235);
}
a.router-link-exact-active:hover {
  background-color: rgb(229 231 235);
}
a.router-link-exact-active span {
  font-weight: 600;
}
/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(231, 229, 229);
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #354899;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #354880;
}
</style>
