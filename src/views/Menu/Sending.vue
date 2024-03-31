<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import AvionIcon from '@/components/icons/Discord.vue'
import BoatIcon from '@/components/icons/Linkedin.vue'
import { ref, watch, onMounted } from 'vue'
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  limit,
  startAfter,
  orderBy
} from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const db = useFirestore()
let agencyId = ref(null)
let packagesQueryFirst = ref(null)

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('user'))
  agencyId.value = data[1]
})
// Utilisation de useCollection pour écouter les packages en temps réel
watch(agencyId, (newAgencyId) => {
  if (newAgencyId) {
    packagesQueryFirst.value = query(
      collection(db, 'packages'),
      where('agencies_id', '==', newAgencyId)
    )
  }
})
const packages = useCollection(packagesQueryFirst)

let showClientInfoModal = ref(false)
let showPackageInfoModal = ref(false)
let selectedPackageClientInfo = ref(null)
let selectedPackageInfo = ref(null)
let showStatusModal = ref(false)
let selectedPackageId = ref('')
let selectedStatus = ref('')

const openClientInfoModal = async (item) => {
  const docRef = doc(db, 'users', item?.users_id)
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      selectedPackageClientInfo.value = docSnap.data()
      showClientInfoModal.value = true
    } else {
      console.log('No such document!')
      // Gérez le cas où le document n'existe pas
    }
  } catch (error) {
    console.error('Error getting document:', error)
    // Gérez les erreurs ici
  }
  showClientInfoModal.value = true
}

const openPackageInfoModal = (item) => {
  selectedPackageInfo.value = item
  showPackageInfoModal.value = true
}
const openStatusModal = (packageId) => {
  selectedPackageId.value = packageId
  showStatusModal.value = true
}
const changeStatus = async () => {
  if (selectedStatus.value && selectedPackageId.value) {
    try {
      const packageRef = doc(db, 'packages', selectedPackageId.value)
      await updateDoc(packageRef, { status: selectedStatus.value })
      showStatusModal.value = false // Fermer le modal après la mise à jour
      // Ici, vous pouvez ajouter une logique pour afficher un message de succès ou actualiser les données affichées à l'utilisateur.
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      // Gérer l'erreur (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  }
}
</script>

<template>
  <main class="w-full mx-0 p-4">
    <h3 class="font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6">
      Transaction
    </h3>

    <div class="relative overflow-x-auto w-full bg-white dark:bg-slate-800 mt-6 rounded-lg h-3/4">
      <table class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
        >
          <tr>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Depart</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Arrivée</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Statut</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Envoyé par</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Informations clients</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Informations Colis</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in packages"
            :key="index"
            class="bg-white dark:bg-gray-800 border-b dark:border-gray-600"
          >
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
              <div class="flex items-center">
                <ArrowRightIcon class="w-10 h-6 animate-pulse text-base1" />
                <span>{{ item.departure_country }} , {{ item.departure_city }}</span>
              </div>
            </td>

            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
              <ArrowDownTrayIcon class="w-10 h-6" />
              <span class="font-semibold"
                >{{ item.arrival_country }} , {{ item.arrival_city }}</span
              >
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
              <span
                :class="
                  item?.status === 'En cours'
                    ? 'bg-yellow-400/40 py-1 px-2 rounded-full shadow-md text-slate-900 animate-pulse'
                    : item?.status === 'Échoué'
                      ? 'bg-red-400/40 py-1 px-2 rounded-full shadow-md text-slate-900 '
                      : item?.status === 'Réussi'
                        ? 'bg-green-400/40 py-1 px-2 rounded-full shadow-md text-slate-900 '
                        : ''
                "
              >
                {{ item?.status }}</span
              >
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
              <AvionIcon v-if="item.is_avion" class="w-6 h-6 text-base2" />
              <BoatIcon v-else class="w-6 h-6 text-base2" />
            </td>

            <td class="px-6 py-4 gap-4">
              <button
                @click="openClientInfoModal(item)"
                class="rounded-lg p-2 bg-base1 hover:bg-opacity-70 transition duration-300 ease-in-out text-white shadow-md"
              >
                Aperçu
              </button>
            </td>
            <td class="px-6 py-4 gap-4">
              <button
                @click="openPackageInfoModal(item)"
                class="rounded-lg p-2 bg-base2 hover:bg-opacity-70 transition duration-300 ease-in-out text-white shadow-md"
              >
                Aperçu
              </button>
            </td>
            <td class="px-6 py-4 gap-4">
              <button
                @click="openStatusModal(item.id)"
                class="rounded-lg p-2 bg-slate-800 hover:bg-opacity-70 transition duration-300 ease-in-out text-white shadow-md"
              >
                Changer le statut
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal pour les informations du client -->
    <div v-if="showClientInfoModal" class="modal">
      <div class="modal-content">
        <span @click="showClientInfoModal = false" class="close cursor-pointer">&times;</span>
        <h2 class="font-semibold pb-4 pt-2 underline underline-offset-2">Informations Client</h2>
        <p>Nom : {{ selectedPackageClientInfo?.name }}</p>
        <p>Email : {{ selectedPackageClientInfo?.email }}</p>
        <p>Contact : {{ selectedPackageClientInfo?.contact }}</p>
        <!-- Ajoutez d'autres informations du client ici -->
      </div>
    </div>

    <!-- Modal pour les informations du colis -->
    <div v-if="showPackageInfoModal" class="modal">
      <div class="modal-content">
        <span @click="showPackageInfoModal = false" class="close cursor-pointer">&times;</span>
        <h2 class="font-semibold pb-4 pt-2 underline underline-offset-2">Informations Colis</h2>
        <div v-if="selectedPackageInfo?.is_avion">
          <p>Masse : {{ selectedPackageInfo?.mass }} Kg</p>
        </div>
        <div v-else>
          <p>Largeur : {{ selectedPackageInfo?.width }} Cm</p>
          <p>Longeur : {{ selectedPackageInfo?.length }} Cm</p>
          <p>Hauteur : {{ selectedPackageInfo?.height }} Cm</p>
        </div>

        <p>Code colis : {{ selectedPackageInfo?.colis_id }}</p>
        <p>
          Livraison à domicile : <span v-if="selectedPackageInfo?.home_delivery">Oui</span>
          <span v-else>Non</span>
        </p>

        <img class="w-40 h-40 object-cover" :src="selectedPackageInfo?.photo" alt="" />
        <!-- Ajoutez d'autres informations du colis ici -->
      </div>
    </div>
    <!-- Modal pour changer le statut -->
    <div
      v-if="showStatusModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    >
      <div class="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Changer le statut du colis</h3>
          <div class="mt-2">
            <select
              v-model="selectedStatus"
              class="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-base1 focus:border-base1 sm:text-sm rounded-md"
            >
              <option value="">Sélectionner un statut</option>
              <option value="En cours">En cours</option>
              <option value="Échoué">Échoué</option>
              <option value="Réussi">Réussi</option>
            </select>
          </div>
          <button class="mt-3 px-4 py-2 bg-gray-800 text-white rounded" @click="changeStatus">
            Appliquer
          </button>
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
</style>
