<script setup>
import { ref, onMounted } from 'vue'
import { apiRoutes } from './../../utils/api.js'
import axios from 'axios'
import NothingResource from '@/components/NothingResource.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'

let data = ref(null)
let loading = ref(true)
let loadingBtn = ref(false)
let getData = () => {
  axios
    .get(apiRoutes['freelancer.unauthorize'])
    .then(function (response) {
      data.value = response.data
      loading.value = false
    })
    .catch(function (error) {
      // handle error
      loading.value = true
    })
}

//Authorize freelancer

let authorize = (id) => {
  loadingBtn.value = true
  axios
    .post(apiRoutes['freelancer.confirmed'] + `/${id}`)
    .then(function (response) {
      loadingBtn.value = false
      getData()
    })
    .catch(function (error) {
      // handle error
      loadingBtn.value = false
    })
}

let cleanUp = () => {
  loadingBtn.value = true
  axios
    .get(apiRoutes['freelancer.cleanup'])
    .then(function (response) {
      loadingBtn.value = false
      getData()
    })
    .catch(function (error) {
      // handle error
      loadingBtn.value = false
    })
}

let deleteAccount = (name) => {
  loadingBtn.value = true
  axios
    .delete(apiRoutes['freelancer.destroy'] + `/${name}`)
    .then(function (response) {
      loadingBtn.value = false
      getData()
    })
    .catch(function (error) {
      // handle error
      loadingBtn.value = false
    })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <main class="w-full mx-0 p-4">
    <h3
      class="font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      <span> Authorisation de compte </span>
      <button
        @click="cleanUp"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-none hover:bg-red-700 sm:mt-0 sm:w-auto"
      >
        Clean Up
      </button>
    </h3>

    <div class="relative overflow-x-auto w-full bg-white dark:bg-slate-800 mt-6 rounded-lg h-3/4">
      <div v-if="loadingBtn" class="fixed w-full max-w-7xl h-full">
        <div class="flex justify-center items-center h-full w-full" role="status">
          <svg
            aria-hidden="true"
            class="w-1/3 h-1/3 text-base1 animate-spin dark:text-base1 fill-white"
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
        </div>
      </div>

      <table
        v-if="loading"
        class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
        >
          <tr>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Nom</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Pays</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Téléphone</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Email</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Inscrit</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr class="bg-white dark:bg-gray-800 border-b dark:border-gray-600">
            <td class="pt-4">
              <span
                class="block p-4 bg-base1/20 rounded-full dark:bg-white/50 animate-pulse"
              ></span>
            </td>
            <td class="pt-4">
              <span
                class="block p-4 bg-base1/20 rounded-full dark:bg-white/50 animate-pulse"
              ></span>
            </td>

            <td class="pt-4">
              <span
                class="block p-4 bg-base1/20 rounded-full dark:bg-white/50 animate-pulse"
              ></span>
            </td>
            <td class="pt-4">
              <span
                class="block p-4 bg-base1/20 rounded-full dark:bg-white/50 animate-pulse"
              ></span>
            </td>
            <td class="pt-4">
              <span
                class="block p-4 bg-base1/20 rounded-full dark:bg-white/50 animate-pulse"
              ></span>
            </td>

            <td class="pt-4">
              <span
                class="block p-4 bg-base1/20 rounded-full dark:bg-white/50 animate-pulse"
              ></span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else>
        <NothingResource v-if="data?.data.length == 0" />
        <table
          v-else
          :class="loadingBtn ? 'blur-sm ' : ''"
          class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
          >
            <tr>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Nom</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Pays</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Téléphone</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Email</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Inscrit</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Action</th>
            </tr>
          </thead> 

          <tbody>
            <tr
              v-for="(item, index) in data?.data"
              :key="index"
              class="bg-white dark:bg-gray-800 border-b dark:border-gray-600"
            >
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ item.name }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                
                <img
                  v-if="item.country === 'CI'"
                  src="./../../assets/img/flag_country/ci.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="item.country === 'France'"
                  src="./../../assets/img/flag_country/fr.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="item.country === 'RDC'"
                  src="./../../assets/img/flag_country/cd.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="item.country === 'Bénin'"
                  src="./../../assets/img/flag_country/bj.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="item.country === 'Mali'"
                  src="./../../assets/img/flag_country/ml.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="item.country === 'Maroc'"
                  src="./../../assets/img/flag_country/ma.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="item.country === 'Sénégal'"
                  src="./../../assets/img/flag_country/sn.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
              </td>

              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ item.phone }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ item.email }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ item.created_at }}
              </td>

              <td class="px-6 py-4 gap-4 flex justify-start items-center">
                <button
                  @click="deleteAccount(item.name)"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-none hover:bg-red-800 sm:mt-0 sm:w-auto"
                >
                  Réfuser
                </button>
                <PrimaryBtn @click="authorize(item.id)"> Authoriser </PrimaryBtn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
</style>
