from Queue import Queue
from Stack import Stack

def BFS(graph, start):
    visited = set()
    nodes = Queue()
    nodes.enqueue(start)
    visited.add(start)

    while nodes.isEmpty():
        node = nodes.dequeue()
        print(node, end=" -> ")
        for neighbor in graph[node]:
            if neighbor not in visited:
                nodes.enqueue(neighbor)
                visited.add(neighbor)

def DFS(graph, start):
    visited = set()
    nodes = Stack()

    nodes.push(start)

    while not nodes.isEmpty():
        node = nodes.pop()
        if node not in visited:
            print(node, end=" -> ")
            visited.add(node)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    nodes.push(neighbor)


if __name__ == "__main__":
    g = {
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    }
    print("BFS", end=":")
    BFS(g, 'A')
    print("")
    print("DFS", end=":")
    DFS(g, 'A')

