<template>
<nav class="bg-blue-700 text-white py-4">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div class="flex justify-center md:justify-start items-center w-full md:w-auto">
            <NuxtLink to="/" class="flex items-center justify-center">
                <img src="/assets/images/logo.png" width="70" alt="Logo">
                <h1 class="text-white text-2xl font-bold">Mooring Pin</h1>
            </NuxtLink>
        </div>
        <nav class="hidden md:flex space-x-4 font-bold text-xl">
            <ul class="flex space-x-4">
                <li>
                    <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/blog" class="hover:underline">Blog</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/claim-marina" class="hover:underline">Claim Marina</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</nav>
</template>

<script setup lang="ts">
</script>