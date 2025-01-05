<template>
    <div class="min-h-screen flex flex-col bg-gray-100">  
      <main class="flex-grow container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              Claim Your Marina - Coming Soon!
            </h2>
            <p class="text-xl text-blue-100 leading-relaxed">
              We're excited to announce that marina owners will soon be able to claim and manage their listings on Mooring Pin. Stay tuned for this exciting feature!
            </p>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-semibold mb-4">Why claim your marina?</h3>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Increase visibility and attract more boaters to your marina</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Highlight your marina's unique amenities and services</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Manage your listing details and keep information up-to-date</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Respond to reviews and engage with potential customers</span>
              </li>
            </ul>
  
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h4 class="text-xl font-semibold mb-4">Be the first to know!</h4>
              <p class="mb-4">Sign up to get notified when marina claiming becomes available:</p>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    required
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label for="marina-name" class="block text-sm font-medium text-gray-700">Marina name (optional)</label>
                  <input
                    type="text"
                    id="marina-name"
                    v-model="marinaName"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Marina Name"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Notify Me
                </button>
              </form>
            </div>
  
            <p class="text-center text-gray-600">
              Have questions? <NuxtLink href="/contact" class="text-blue-600 hover:underline">Contact us</NuxtLink>
            </p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { CheckCircle } from 'lucide-vue-next'
  
  const email = ref('')
  const marinaName = ref('')
  
  const submitForm = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted', { email: email.value, marinaName: marinaName.value })
    // Reset form fields
    email.value = ''
    marinaName.value = ''
    // Show a success message (you might want to use a proper notification system)
    alert('Thank you for your interest! We\'ll notify you when the feature becomes available.')
  }
  </script>
  
  <style scoped>
  /* Any component-specific styles can go here */
  </style>