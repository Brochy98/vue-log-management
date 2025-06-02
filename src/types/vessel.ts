// Vessel
export type Vessel = {
  vesselId: number
  name: string
  type: string
  capacityTons: number
  powerManagement: {
    systemType: string
    status: string
  }
}
