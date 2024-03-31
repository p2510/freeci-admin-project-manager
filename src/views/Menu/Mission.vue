<script setup>
import { ref, onMounted, computed } from 'vue'
import { apiRoutes, baseUrl } from '../../utils/api.js'
import axios from 'axios'
import NothingResource from '@/components/NothingResource.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'
import SecondaryBtn from '@/components/SecondaryBtn.vue'
import SkeletonUser from '@/components/SkeletonUser.vue'
import { ArrowLeftIcon, ArrowRightIcon, EyeIcon } from '@heroicons/vue/24/outline'

let missions = ref([])
let links = ref([])
let loading = ref(true)
let loadingBtn = ref(false)
let getData = (link) => {
  axios
    .get(link || apiRoutes['mission.index'])
    .then(function (response) {
      missions.value = response.data?.data

      links.value = response.data.data?.links
      loading.value = false
    })
    .catch(function (error) {
      // handle error
      loading.value = true
    })
}

onMounted(() => {
  getData()
})

// show freelancer informations

let missionId = ref(null)
const filteredMission = computed(() => {
  return missions.value?.data.filter((item) => {
    return item.id == missionId.value
  })
})

let confirmed = (id) => {
  axios
    .patch(apiRoutes['mission.confirmed'] + `/${id}`)
    .then(function (response) {
      loadingBtn.value = false
      getData()
    })
    .catch(function (error) {
      // handle error
      loadingBtn.value = false
    })
}

// Action for freelancer
let showActionModal = ref(false)

let showActionModalFunction = (id) => {
  showActionModal.value = true
  missionId.value = id
}
let closeActionModale = () => {
  showActionModal.value = false
}

// delete account

let deleteMission = (title) => {
  loadingBtn.value = true
  showActionModal.value = false
  axios
    .delete(apiRoutes['mission.destroy'] + `/${title}`)
    .then(function (response) {
      loadingBtn.value = false
      getData()
    })
    .catch(function (error) {
      // handle error
      loadingBtn.value = false
    })
}

let changeStatut = (id) => {
  loadingBtn.value = true
  showActionModal.value = false
  axios
    .patch(apiRoutes['mission.changestatut'] + `/${id}`)
    .then(function (response) {
      loadingBtn.value = false
      getData()
    })
    .catch(function (error) {
      // handle error
      loadingBtn.value = false
    })
}
</script>

<template>
  <main class="w-full mx-0 p-4 h-screen">
    <h3
      class="font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Gérer les missions
    </h3>

    <div class="relative overflow-auto w-full bg-white dark:bg-slate-800 mt-6 rounded-lg h-4/5">
      <div v-if="loadingBtn" class="fixed w-full max-w-7xl h-full z-20">
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
      <SkeletonUser v-if="loading" />

      <div v-else>
        <NothingResource v-if="missions.length == 0" />

        <table
          v-else
          :class="loadingBtn ? 'blur-sm ' : ''"
          class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
          >
            <tr>
              <th scope="col" class="px-6 py-3 font-semibold text-start">ID</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Titre</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Email</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Pays</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Téléphone</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Code de suivi</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Publié le</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Statut</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Authoriser</th>
              <th scope="col" class="px-6 py-3 font-semibold text-start">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="mission in missions?.data"
              :key="mission.id"
              class="bg-white dark:bg-gray-800 border-b dark:border-gray-600"
            >
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ mission.id }}
              </td>

              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white break-normal">
                {{ mission.title.substring(0, 30) }} [...]
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ mission.email }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <img
                  v-if="mission.country === 'CI'"
                  src="./../../assets/img/flag_country/ci.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="mission.country === 'France'"
                  src="./../../assets/img/flag_country/fr.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="mission.country === 'RDC'"
                  src="./../../assets/img/flag_country/cd.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="mission.country === 'Bénin'"
                  src="./../../assets/img/flag_country/bj.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="mission.country === 'Mali'"
                  src="./../../assets/img/flag_country/ml.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="mission.country === 'Maroc'"
                  src="./../../assets/img/flag_country/ma.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
                <img
                  v-if="mission.country === 'Sénégal'"
                  src="./../../assets/img/flag_country/sn.svg"
                  alt=""
                  class="w-5 h-5 rounded-md"
                />
              </td>

              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ mission.phone }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ mission.code }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {{ mission.created_at }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <span v-if="mission.statut"> Ouvert</span>
                <span v-else> Fermé </span>
              </td>

              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <p
                  v-if="mission.authorize"
                  class="text-center text-white bg-green-700/80 rounded-full"
                >
                  OK
                </p>
                <SecondaryBtn v-else @click="confirmed(mission.id)"> Authoriser </SecondaryBtn>
              </td>

              <td class="px-6 py-4 gap-4 flex justify-start items-center">
                <PrimaryBtn @click="showActionModalFunction(mission.id)"> Gérer </PrimaryBtn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- paginate -->
    <div v-if="missions.length !== 0" class="mt-4 flex justify-center">
      <ul class="flex items-center space-x-2">
        <li
          v-for="link in links"
          :key="link.label"
          @click.prevent="getData(link.url)"
          class="w-full flex cursor-pointer"
        >
          <span
            v-if="link.label !== 'Précédent' && link.label !== 'Suivant'"
            :class="
              link.active
                ? 'w-8 h-8 bg-base1 flex justify-center items-center  text-white rounded-full '
                : 'w-8 h-8 bg-white flex justify-center  items-center border-2 border-base1 text-base1   rounded-full hover:bg-base1 hover:text-white transition duration-200 ease-in-out'
            "
          >
            {{ link.label }}
          </span>

          <span
            v-else-if="link.label == 'Précédent'"
            class="bg-slate-800 text-white px-4 py-1 rounded-lg shadow-md"
          >
            <ArrowLeftIcon class="w-8 h-4 inline" />
          </span>
          <span
            v-else-if="link.label == 'Suivant'"
            class="bg-slate-800 text-white px-4 py-1 rounded-lg shadow-md"
          >
            <ArrowRightIcon class="w-8 h-4 inline" />
          </span>
        </li>
      </ul>
    </div>

    <!--Action for this profil -->
    <div
      v-if="showActionModal"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Contenu de la modale -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-3xl"
          >
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <!-- Contenu de la modale -->
              <h3 class="text-lg font-medium text-gray-900" id="modal-title">Gestion de mission</h3>
              <div class="mt-5 sm:mt-4" v-for="item in filteredMission" :key="item.id">
                <div class="space-y-4 w-full p-4">
                  <p class="font-semibold text-lg">{{ item.title }}</p>
                  <p class="text-md">{{ item.email }}</p>
                  <p class="text-md">
                    Type de mission : <span v-if="item.type_mission">En ligne</span>
                    <span v-else>Sur place</span>
                  </p>
                  <p class="text-md">
                    Type de paiement : <span v-if="item.type_budget">En une fois </span>
                    <span v-else>Par jour</span>
                  </p>
                  <p class="text-md">Budget Max : {{ item.budget_max }} F</p>
                  <p class="text-md">Budget Min : {{ item.budget_min }} F</p>
                  <p class="text-md">Catégorie : {{ item.category }}</p>
                  <p class="text-md">
                    Compétences requis :
                    <span v-for="tag in item.tags" :key="tag">{{ tag }} ,</span>
                  </p>
                  <p class="text-md">
                    Affilié : <span v-if="item.affiliate_id">{{ item.affiliate_id }}</span>
                    <span v-else>Non</span>
                  </p>
                  <p class="text-md">
                    Statut de paiement : <span v-if="item.payment_statut == 0">En cours </span>
                    <span v-else-if="item.payment_statut == 1">Payé </span>
                    <span v-else-if="item.payment_statut == 2">Échoué </span>
                    <span v-else>Rétiré</span>
                  </p>
                </div>

                <PrimaryBtn
                  class="w-full sm:w-auto mt-3 sm:ml-3 sm:mt-0 bg-red-500"
                  @click="deleteMission(item.title)"
                  >Supprimer la mission</PrimaryBtn
                >
                <SecondaryBtn
                  v-if="item.statut"
                  class="w-full sm:w-auto mt-3 sm:ml-3 sm:mt-0"
                  @click="changeStatut(item.id)"
                  >Fermer</SecondaryBtn
                >
                <SecondaryBtn
                  v-else
                  class="w-full sm:w-auto mt-3 sm:ml-3 sm:mt-0 bg-green-700"
                  @click="changeStatut(item.id)"
                  >Ouvrir</SecondaryBtn
                >
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                @click="closeActionModale"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
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
ol::-webkit-scrollbar {
  width: 7px;
  height: 4px;
}

/* Track */
ol::-webkit-scrollbar-track {
  background: rgb(231, 229, 229);
  border-radius: 5px;
}

/* Handle */
ol::-webkit-scrollbar-thumb {
  background: #354899;
  border-radius: 5px;
}

/* Handle on hover */
ol::-webkit-scrollbar-thumb:hover {
  background: #354880;
}
</style>
