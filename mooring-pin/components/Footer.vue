<template>
  <footer class="bg-blue-700 p-4 pt-8">
    <div class="container mx-auto p-4">
      <div class="md:flex md:justify-between">
        <div class="mb-5 md:mb-0">
          <a href="https://www.mooringpin.co.uk" class="flex items-center">
            <img src="/assets/images/logo.png" class="h-12 me-0 ml-[-6px]" alt="Mooring Pin Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Mooring Pin</span>
          </a>
          <p class="mt-3 text-gray-300 text-sm leading-relaxed max-w-prose md:mr-4">
            Mooring Pin helps canal boaters easily find marinas and moorings with the services they need, like water, electricity, and waste disposal. Built by two independent developers, our goal is to keep this platform free, helping you navigate your journey with confidence.
          </p>

        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold uppercase text-[#facc15]">Resources</h2>
            <ul class="text-gray-300 font-medium">
              <li class="mb-4">
                <a href="/feedback" class="hover:underline">Feedback Form</a>
              </li>
              <li class="mb-4">
                <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/cookie-policy" class="hover:underline">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold uppercase text-[#facc15]">Follow us</h2>
            <ul class="text-gray-300 font-medium">
              <li class="mb-4">
                <a href="https://www.instagram.com/mooringpin/" target="_blank" class="hover:underline">Instagram</a>
              </li>
              <li class="mb-4">
                <a href="https://www.tiktok.com/@mooringpin" target="_blank" class="hover:underline">TikTok</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold uppercase text-[#facc15]">Discover More</h2>
            <ul class="text-gray-300 font-medium">
              <li class="mb-4">
                <a href="/about" class="hover:underline">Our Story</a>
              </li>
              <li class="mb-4">
                <a href="/blog" class="hover:underline">Our Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-300 sm:text-center">© {{currentYear}} <a href="https://mooringpin.co.uk/" class="hover:underline">Mooring Pin</a>. All Rights Reserved.</span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <!-- Instagram Icon -->
          <a href="https://www.instagram.com/mooringpin/" target="_blank" class="text-[#facc15] hover:text-[#e3ba16] mr-3">
            <font-awesome-icon icon="fa-brands fa-instagram" />
            <span class="sr-only">Instagram page</span>
          </a>
          <!-- TikTok Icon -->
          <a href="https://www.tiktok.com/@mooringpin" target="_blank" class="text-[#facc15] hover:text-[#e3ba16]">
            <font-awesome-icon icon="fa-brands fa-tiktok" />
            <span class="sr-only">Instagram page</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = useState('currentYear', () => new Date().getFullYear());
</script>
