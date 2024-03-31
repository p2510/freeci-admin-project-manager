<template>
  <main class="w-full mx-0 p-4">
    <div class="flex h-full items-center mx-auto w-full sm:w-1/2 md:w-2/5">
      <form @submit.prevent="signIn" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div v-if="errorCode" class="text-center text-red-500 font-semibold">
          Informations incorrectes , Réesayez
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Mot de passe"
            v-model="password"
          />
        </div>

        <button
          class="bg-base1 hover:bg-base1/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isSubmitting"
        >
          <!-- Texte conditionnel basé sur l'état de soumission -->
          <template v-if="!isSubmitting"> Connexion </template>
          <template v-else> En cours... </template>
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useCurrentUser, useFirebaseAuth, useFirestore } from 'vuefire'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'

const db = useFirestore()

const email = ref('')
const password = ref('')
const auth = getAuth()
const router = useRouter()
let errorCode = ref(null)
let isSubmitting = ref(false) // Ajout d'un indicateur de soumission

const signIn = async () => {
  try {
    isSubmitting.value = true // Activer l'indicateur de soumission

    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    const docRef = doc(db, 'users', user.uid)
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        localStorage.setItem('user', JSON.stringify(docSnap.data()))
        router.push('/apercu')
      } else {
        console.log('No such document!')
        errorCode.value = 'error'
      }
    } catch (error) {
      console.error('Error getting document:', error)
    }
  } catch (error) {
    errorCode.value = error.code
  } finally {
    isSubmitting.value = false // Désactiver l'indicateur de soumission une fois le traitement terminé
  }
}
</script>
