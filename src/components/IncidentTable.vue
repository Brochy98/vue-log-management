<template>
  <div class="w-full mb-8 bg-cyan-950 border border-gray-400 shadow-lg">
    <div class="flex items-center justify-between mx-4 my-6">
      <h2 class="text-2xl font-semibold text-white">Incidents</h2>
      <div class="block md:hidden border border-white rounded px-1">
        <button
          class="text-xs bg-cyan-950 text-white py-2 rounded font-semibold flex items-center gap-2"
          @click="sortLog('date', sortDirection === 'asc' ? 'desc' : 'asc')"
        >
          Sort by date
        </button>
      </div>
    </div>

    <table class="w-full bg-white table-auto md:table md:table-fixed">
      <thead class="hidden md:table-header-group">
        <tr class="text-left bg-gray-300 border-b border-gray-400">
          <th class="p-4 flex items-center">
            Date
            <button
              class="text-xs rounded cursor-pointer ml-2 flex items-center gap-1"
              @click="sortLog('date', sortDirection === 'asc' ? 'desc' : 'asc')"
            >
              <p
                v-if="sortDirection === 'asc'"
                class="text bg-cyan-950 text-white px-1 py-2 font-semibold rounded cursor-pointer ml-2 flex items-center gap-1"
              >
                Ascending
              </p>
              <p
                v-else
                class="text bg-cyan-950 text-white px-1 py-2 font-semibold rounded cursor-pointer ml-2 flex items-center gap-1"
              >
                Descending
              </p>
            </button>
          </th>
          <th class="">Vessel</th>
          <th class="">Incident</th>
          <th class="">Description</th>
          <th class="">Impact Level</th>
          <th class="">Resolved</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white text-sm shadow-sm md:table-row md:shadow-none overflow-hidden flex flex-col md:flex-row p-4 md:p-0 md:mb-0"
          v-for="(log, idx) in sortedIncidentsLogs"
          :key="log.logId"
          :class="idx % 2 === 0 ? 'bg-white' : 'bg-zinc-100'"
        >
          <td class="p-1 md:table-cell">
            <span class="font-semibold block md:hidden">Date</span>{{ log.date }}
          </td>
          <td class="p-1 md:table-cell">
            <span class="font-semibold block md:hidden">Vessel</span>
            {{ vessels[log.vesselId] || log.vesselId }}
          </td>
          <td class="p-1 md:table-cell">
            <span class="font-semibold block md:hidden">Type</span>
            {{ log.incidentType }}
          </td>
          <td class="p-1 md:table-cell" :title="log.description">
            <span class="font-semibold block md:hidden">Description</span>
            {{ log.description }}
          </td>
          <td class="p-1 md:table-cell">
            <span class="font-semibold block md:hidden">Impact Level</span>
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-xs font-semibold',
                log.impactLevel === 'High'
                  ? 'bg-red-200 text-red-800'
                  : log.impactLevel === 'Moderate'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-green-200 text-green-800',
              ]"
            >
              {{ log.impactLevel }}
            </span>
          </td>
          <td class="p-1 md:table-cell">
            <span class="font-semibold block md:hidden">Resolved</span>
            {{ log.resolved ? 'Yes' : 'No' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { LogEntry } from '@/types/log'

const props = defineProps<{
  logs: LogEntry[]
  vessels: Record<number, string>
}>()

const sortKey = ref<'date'>('date')
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortedIncidentsLogs = computed(() => {
  const filtered = props.logs.filter((log) => log.type === 'Incident')

  return filtered.sort((a, b) => {
    const aDate = new Date(a[sortKey.value])
    const bDate = new Date(b[sortKey.value])

    return sortDirection.value === 'asc'
      ? aDate.getTime() - bDate.getTime()
      : bDate.getTime() - aDate.getTime()
  })
})

function sortLog(key: 'date', direction: 'asc' | 'desc') {
  sortKey.value = key
  sortDirection.value = direction
}
</script>
