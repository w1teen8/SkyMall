import { graphNodes } from '../data/graphNodes'
import { graphEdges } from '../data/graphEdges'

function buildGraph() {
  const nodeMap = {}
  for (const n of graphNodes) nodeMap[n.id] = n

  const graph = {}
  for (const n of graphNodes) graph[n.id] = {}

  for (const [a, b] of graphEdges) {
    const na = nodeMap[a]
    const nb = nodeMap[b]
    if (!na || !nb) continue
    const d = Math.hypot(na.x - nb.x, na.y - nb.y)
    graph[a][b] = d
    graph[b][a] = d
  }

  return graph
}

const GRAPH = buildGraph()

export function dijkstra(startId, endId) {
  const start = String(startId)
  const end = String(endId)

  const dist = {}
  const prev = {}

  for (const id in GRAPH) {
    dist[id] = Infinity
    prev[id] = null
  }
  dist[start] = 0

  const visited = new Set()
  const unvisited = new Set(Object.keys(GRAPH))

  while (unvisited.size > 0) {
    let u = null
    for (const id of unvisited) {
      if (u === null || dist[id] < dist[u]) u = id
    }

    if (u === null || dist[u] === Infinity) break
    if (u === end) break

    unvisited.delete(u)
    visited.add(u)

    for (const v in GRAPH[u]) {
      if (visited.has(v)) continue
      const alt = dist[u] + GRAPH[u][v]
      if (alt < dist[v]) {
        dist[v] = alt
        prev[v] = u
      }
    }
  }

  if (dist[end] === Infinity) return []

  const path = []
  let cur = end
  while (cur !== null) {
    path.unshift(Number(cur))
    cur = prev[cur]
  }

  return path
}

// Returns array of {x, y} points for a path on a specific floor
export function pathToPoints(path) {
  const nodeMap = {}
  for (const n of graphNodes) nodeMap[n.id] = n
  return path.map(id => nodeMap[id]).filter(Boolean).map(n => ({ x: n.x, y: n.y }))
}

// Returns the floors traversed in a path
export function getFloorsInPath(path) {
  const nodeMap = {}
  for (const n of graphNodes) nodeMap[n.id] = n
  const floors = [...new Set(path.map(id => nodeMap[id]?.floor).filter(Boolean))]
  return floors
}

// Filter path to only nodes on a given floor
export function filterPathByFloor(path, floor) {
  const nodeMap = {}
  for (const n of graphNodes) nodeMap[n.id] = n
  return path.filter(id => nodeMap[id]?.floor === floor)
}
