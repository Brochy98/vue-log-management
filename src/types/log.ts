// Maintenance
export interface MaintenanceLog {
  type: 'Maintenance'
  logId: number
  date: string
  vesselId: number
  maintenanceType: string
  description?: string
  durationHours?: number
  outcome: string
  servicePerformed: string[]
}

// Operations
export interface OperationLog {
  type: 'Operation'
  logId: number
  date: string
  vesselId: number
  operationType: string
  description?: string
  durationHours?: number
  outcome: string
}

// Incidents
export interface IncidentLog {
  type: 'Incident'
  logId: number
  date: string
  vesselId: number
  incidentType: string
  description?: string
  impactLevel: string
  resolved: boolean
}

export type LogEntry = MaintenanceLog | OperationLog | IncidentLog
