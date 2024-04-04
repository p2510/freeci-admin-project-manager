<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

// Données du formulaire
let form = ref({
  projectName: '',
  recrutorName: '',
  freelancerName: '',
  description: '',
  currency: 'CFA',
  budget: '',
  typeProject: 'Mission',
  recurrence: 'unique',
  paymentMode: 'Monnaie électronique',
  deadline: 'Maximum 3 Jours',
  commission: 10,
  deposit: 25
})
const showModal = ref(false)
let currentDate = ref(new Date())

// Méthode pour soumettre le contrat
const submitContract = () => {
  showModal.value = true
  console.log(form.value)
}

// Fonction pour imprimer la page
const printPage = () => {
  const printContent = document.getElementById('print-modal').innerHTML
  const originalContent = document.body.innerHTML

  // Afficher seulement le contenu du modal
  document.body.innerHTML = printContent

  // Imprimer le contenu
  window.print()

  // Restaurer le contenu original
  document.body.innerHTML = originalContent
}
</script>

<template>
  <div class="bg-white w-full p-4">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <form @submit.prevent="submitContract">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Information du personnel
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              Rensignez les informations du projet , du recruteur , du freelancer ...
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >Nom du projet</label
                >
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      v-model="form.projectName"
                      type="text"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div class="col-span-full sm:col-span-3">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >Nom du recruteur
                </label>
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      v-model="form.recrutorName"
                      type="text"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-full sm:col-span-3">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >Nom du freelancer
                </label>
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      v-model="form.freelancerName"
                      type="text"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-full">
                <label for="about" class="block text-sm font-medium leading-6 text-gray-900"
                  >Description du projet</label
                >
                <div class="mt-2">
                  <textarea
                    v-model="form.description"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">Bref et concis</p>
              </div>
            </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Information budgetaire</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              Renseignez les informations de paiement ...
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full sm:col-span-2">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900"
                  >Devise</label
                >
                <div class="mt-2">
                  <select
                    v-model="form.currency"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="CFA" selected>CFA</option>
                    <option value="Euro">Euro</option>
                  </select>
                </div>
              </div>
              <div class="col-span-full sm:col-span-2">
                <label class="block text-sm font-medium leading-6 text-gray-900">Budget </label>
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      v-model="form.budget"
                      type="number"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900"
                  >Mission ou Contrat</label
                >
                <div class="mt-2">
                  <select
                    v-model="form.typeProject"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Mission" selected>Mission</option>
                    <option value="Contrat">Contrat</option>
                  </select>
                </div>
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900"
                  >Récurrence</label
                >
                <div class="mt-2">
                  <select
                    v-model="form.recurrence"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="unique" selected>Unique</option>
                    <option value="Par jour">Par jour</option>
                    <option value="Par semaine">Par semaine</option>
                    <option value="Par mois">Par Mois</option>
                  </select>
                </div>
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900"
                  >Mode paiement</label
                >
                <div class="mt-2">
                  <select
                    v-model="form.paymentMode"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Monnaie électronique" selected>Monnaie électronique</option>
                    <option value="En espèce">En espèce</option>
                  </select>
                </div>
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900"
                  >Délai de paiement</label
                >
                <div class="mt-2">
                  <select
                    v-model="form.deadline"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Maximum 3 Jours">Maximum 3 Jours</option>
                    <option value="Maximum 5 Jours">Maximum 5 Jours</option>
                  </select>
                </div>
              </div>

              <fieldset class="col-span-full sm:col-span-3">
                <legend class="text-sm font-semibold leading-6 text-gray-900">
                  Commission Freeci
                </legend>
                <p class="mt-1 text-sm leading-6 text-gray-600">Calcul des commissions de freeci</p>
                <div class="mt-6 space-y-6">
                  <div class="flex items-center gap-x-3">
                    <input
                      v-model="form.commission"
                      value="20"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-everything"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >20%</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      v-model="form.commission"
                      value="10"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-everything"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >10%</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      v-model="form.commission"
                      value="5"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >5%</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      v-model="form.commission"
                      value="3.5"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-nothing"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >3,5%</label
                    >
                  </div>
                </div>
              </fieldset>
              <fieldset class="col-span-full sm:col-span-3">
                <legend class="text-sm font-semibold leading-6 text-gray-900">Accompte</legend>
                <p class="mt-1 text-sm leading-6 text-gray-600">Définir la valeur de l'accompte</p>
                <div class="mt-6 space-y-6">
                  <div class="flex items-center gap-x-3">
                    <input
                      v-model="form.deposit"
                      value="15"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label class="block text-sm font-medium leading-6 text-gray-900">15%</label>
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      value="25"
                      v-model="form.deposit"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label class="block text-sm font-medium leading-6 text-gray-900">25%</label>
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      v-model="form.deposit"
                      value="40"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label class="block text-sm font-medium leading-6 text-gray-900">40%</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">
            Annulez
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confimer
          </button>
        </div>
      </form>
    </div>

    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <!-- Overlay foncé -->
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <!-- Conteneur du modal -->
        <div class="relative bg-white w-1/2 mx-auto rounded-lg p-8" id="print-modal">
          <!-- Contenu du modal -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Contrat Freeci – Freelancer – Recruteur</h3>
            <!-- Bouton de fermeture du modal -->

            <button
              @click="showModal = false"
              class="text-gray-500 hover:text-gray-700 focus:outline-none hide-on-print"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Informations supplémentaires -->
          <p class="mb-4">
            <strong>Montant du Projet :</strong> {{ form.budget }} {{ form.currency }}
          </p>
          <p class="mb-4"><strong>Récurrence :</strong> {{ form.recurrence }}</p>
          <p class="mb-4">
            <strong>Mode de Paiement :</strong> {{ form.paymentMode }} ({{ form.currency }})
          </p>
          <!-- Contenu du modal -->
          <p class="mb-4">
            Ce contrat est conclu entre <strong>{{ form.recrutorName }}</strong
            >, ci-après désigné(e) le "Recruteur", et <strong>{{ form.freelancerName }}</strong
            >, ci-après désigné(e) le "Freelancer", pour la réalisation d'un projet de
            <strong>"{{ form.projectName }}"</strong>, conformément aux termes et conditions
            suivants de Freeci :
          </p>
          <p class="mb-4">
            <strong>Description du Projet :</strong> Le Freelancer s'engage à réaliser
            <strong>"{{ form.description }}"</strong> conformément aux spécifications convenues
            entre les parties.
          </p>
          <p class="mb-4">
            <strong>Paiement Initial :</strong> Le Recruteur s'engage à verser
            <strong>{{ form.deposit }}%</strong> du montant total convenu avant le début effectif du
            projet.
          </p>
          <p class="mb-4">
            <strong>Paiement Final :</strong> Le Recruteur s'engage à payer le Freelancer dans un
            délai <strong>{{ form.deadline }}</strong> à compter de la date de finalisation du
            projet.
          </p>
          <p class="mb-4">
            <strong>Commission Freeci :</strong> Le Freelancer s'engage à verser la commission à
            Freeci de <strong>{{ form.commission }}%</strong> après réception du paiement total du
            Recruteur.
          </p>
          <p class="mb-4">
            <strong>Qualité du Travail :</strong> Le Freelancer s'engage à fournir un travail de
            qualité conforme aux attentes du Recruteur, dans les délais convenus.
          </p>
          <p class="mb-4">
            <strong>Propriété Intellectuelle :</strong> Le Recruteur détient les droits de propriété
            intellectuelle sur le travail final une fois que le paiement total est effectué.
          </p>
          <p class="mb-4">
            <strong>Confidentialité :</strong> Les deux parties s'engagent à maintenir la
            confidentialité des informations échangées dans le cadre de ce projet.
          </p>
          <p class="mb-4">
            <strong>Litiges :</strong> En cas de litige, les parties s'engagent à rechercher d'abord
            une solution à l'amiable. En cas d'échec, le litige sera soumis à la juridiction
            compétente la plus proche.
          </p>
          <p class="mb-4">
            <strong>Durée du Contrat :</strong> Ce contrat entre en vigueur à la date de signature
            par les deux parties et reste en vigueur jusqu'à la réalisation complète du projet.
          </p>
          <p class="mb-4">
            En signant ce contrat, les parties reconnaissent avoir lu, compris et accepté les termes
            et conditions énoncés ci-dessus.
          </p>
          <p class="mb-4">Signé et accepté par :</p>
          <div class="flex justify-between">
            <p><strong>Recruteur :</strong> ----------------------</p>
            <p><strong>Freelancer :</strong> ----------------------</p>
          </div>
          <div class="flex justify-between">
            <p>
              <strong>{{ form.recrutorName }}</strong>
            </p>
            <p>
              <strong>{{ form.freelancerName }}</strong>
            </p>
          </div>
          <div class="flex justify-around">
            <p><strong>Date :</strong></p>
            <p><strong>Date :</strong></p>
          </div>
          <div class="mt-8 border-t pt-4 flex justify-between">
            <p><strong>RCCM :</strong> CI-GRDBSM-2023-B-12849</p>
            <p><strong>Téléphone :</strong> +225 0161333655</p>
          </div>
          <div class="pt-4 flex justify-between mb-4">
            <p><strong>Date d'émission :</strong>{{ currentDate }}</p>
          </div>
          <div class="flex justify-between mb-4">
            <p><strong>Email :</strong> support@freeci.ci</p>
            <p><strong>Contact :</strong> +225 0160485654</p>
          </div>
          <!-- Bouton Imprimer -->
          <button @click="printPage" class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
            Imprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media print {
  .hide-on-print {
    display: none !important;
  }
}
</style>
