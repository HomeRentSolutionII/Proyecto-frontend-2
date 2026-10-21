import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Después de cada prueba: desmonta lo renderizado y borra localStorage,
// para que ninguna prueba dependa de lo que dejó la anterior.
afterEach(() => {
  cleanup()
  localStorage.clear()
})
