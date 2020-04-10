function bfs(rootNode, vertices, edges){

    function addToQueue(nodes) {
        this.push(...nodes)
    }

    rootNode.distance = 0

    const queue = [rootNode]
    const unvisitedQueue = [rootNode]

    let addToFullQueue = addToQueue.bind(queue)
    let addToDynamicQueue = addToQueue.bind(unvisitedQueue)
  
    while (unvisitedQueue.length > 0) {
        let firstNode = unvisitedQueue.shift()
        let adjacentVerticies = findAdjacent(firstNode.name, vertices, edges)
        
    
        markDistanceAndPredecessor(firstNode, adjacentVerticies)
        addToFullQueue(adjacentVerticies)
        addToDynamicQueue(adjacentVerticies)
    }

    return queue
}

function findAdjacent(nodeName, vertices, edges) {
    const adjacentNames = edges.filter(edge => nodeName === edge[0] || nodeName === edge[1]).map(edge => edge[0] === nodeName ? edge[1] : edge[0])

    
    return vertices.filter(({name, distance}) => adjacentNames.includes(name) && distance == null)
}

function markDistanceAndPredecessor(vertex, adjacentNodes) {
    return adjacentNodes.map(node => {
        node.predecessor = vertex
        node.distance += 1
        return node
    })
}