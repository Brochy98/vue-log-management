<template>
  <div class="w-full bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:24px_24px]">
    <div class="min-h-screen flex flex-col items-center py-4 md:px-10 px-4">
      <h1
        class="text-3xl font-bold mb-6 w-full text-center p-2 border border-gray-400 text-white bg-cyan-950 shadow-lg"
      >
        Fleet Logs
      </h1>
      <MaintenanceTable :logs="logs" :vessels="vessels" />
      <OperationTable :logs="logs" :vessels="vessels" />
      <IncidentTable :logs="logs" :vessels="vessels" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { LogEntry } from './types/log'
import type { Vessel } from './types/vessel'
import MaintenanceTable from './components/MaintenanceTable.vue'
import OperationTable from './components/OperationTable.vue'
import IncidentTable from './components/IncidentTable.vue'

const logs = ref<LogEntry[]>([])
const vessels = ref<Record<number, string>>({})

onMounted(async () => {
  const [logsRes, vesselsRes] = await Promise.all([
    fetch('http://localhost:8888/logs'),
    fetch('http://localhost:8888/vessels'),
  ])

  logs.value = await logsRes.json()

  const vesselArray: Vessel[] = await vesselsRes.json()
  vessels.value = Object.fromEntries(vesselArray.map((v) => [v.vesselId, v.name]))
})
</script>

<style scoped></style>
