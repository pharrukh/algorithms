declare global {
  interface Date {
    isNotInPast(): boolean
  }
}

Date.prototype.isNotInPast = function (): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Clear the time portion for an accurate comparison
  return this >= today
}

// Ensure to import this module to apply the extension
export {}
