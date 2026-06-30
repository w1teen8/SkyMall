const KEY = 'skymall_parking'

export function getParkedCars() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function generateSpot() {
  return `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${String(Math.floor(Math.random() * 100) + 1).padStart(2, '0')}`
}

export function addParkedCar(plate, spot) {
  const cars = getParkedCars()
  const car = { plate: plate.toUpperCase(), spot: spot ?? generateSpot(), time: Date.now() }
  const updated = [...cars, car]
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function removeParkedCar(plate) {
  const updated = getParkedCars().filter(c => c.plate !== plate)
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function formatTime(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
}
