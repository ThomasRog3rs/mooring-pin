<template>
    <div class="search-container shadow-xl border-4 border-yellow-400 rounded-lg">
        <form class="mx-w-md mx-auto" @submit.prevent="">
            <label for="search-location" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative bg-transparent">
                <div class="relative form-border-bottom">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        autocomplete="off"
                        id="search-location"
                        class="block p-6 pl-11 pr-12 text-lg text-gray-900 bg-transparent w-full"
                        placeholder="Location, Marina or Canal"
                        required
                    />
                    
                    <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <span class="flex-shrink-0 p-2 bg-gray-300 rounded">Icon</span>
                    </div>
                </div>
            </div>
            <!-- <div style="width: 100%;">
                <label for="" style="text-align: left; display: block; width: 90%; margin: 0 auto; margin-top: 20px;">
                    Search Radius: x Miles
                </label>
                <input
                    type="range"
                    placeholder="Radius (miles)"
                    max="30"
                    min="1"
                    value="1"
                    style="display: block; width: 90%; margin: 0 auto; margin-bottom: 12px; margin-top: 12px;"
                />
            </div> -->
        </form>
        <div class="container-footer">
            <button class="bg-blue-700 text-white w-full font-medium p-4 rounded-bl-[4px] rounded-br-[4px]" @click="">Search</button>
        </div>
    </div>
</template>