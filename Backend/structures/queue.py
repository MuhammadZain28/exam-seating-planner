class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def enqueue(self, data):
        node = Node(data)

        if self.head is None:
            self.head = self.tail = node
        else:
            node.prev = self.tail
            self.tail.next = node
            self.tail = node

        self.size += 1

    def dequeue(self):
        if self.size == 0:
            return -1

        data = self.head.data

        if self.head == self.tail:
            self.head = self.tail = None
        else:
            self.head = self.head.next
            self.head.prev = None

        self.size -= 1
        return data

    def isEmpty(self):
        if self.head is None:
            return False
        return True
    def count(self):
        return self.size

    def display(self):
        curr = self.tail
        while curr:
            print(curr.data, end=" -> ")
            curr = curr.prev

    def to_list(self):
        result = []
        curr = self.head
        while curr:
            q = curr.data.to_dict()
            result.append(q)
            curr = curr.next
        return result

class PriorityQueue:
    def __init__(self):
        self.heap = []

    def push(self, data, priority):
        self.heap.append((priority, data))
        self.heapify_up(len(self.heap) - 1)

    def pop(self):
        self.heap[0], self.heap[len(self.heap) - 1] = self.heap[len(self.heap) - 1], self.heap[0]
        priority, item = self.heap.pop()
        self.heapify_down(0)

        return f"{item} ({priority})"
    def heapify_up(self, index):
        parent = (index - 1) // 2
        if index > 0 and self.heap[index][0] > self.heap[parent][0]:
            self.heap[parent], self.heap[index] = self.heap[index], self.heap[parent]
            self.heapify_up(parent)

    def heapify_down(self, index):
        smallest = index
        left = 2 * index + 1
        right = 2 * index + 2
        if left < len(self.heap) and self.heap[left][0] > self.heap[smallest][0]:
            smallest = left
        if right < len(self.heap) and self.heap[right][0] > self.heap[smallest][0]:
            smallest = right

        if smallest != index:
            self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
            self.heapify_down(smallest)

    def __str__(self):
        return str([f"{item} ({priority})" for priority, item in self.heap])

if __name__ == "__main__":
    pq = PriorityQueue()
    pq.push(10, 2)
    pq.push(20, 1)
    pq.push(30, 3)
    pq.push(40, 0)
    print(pq)
    print(pq.pop())
    print(pq.pop())
    print(pq.pop())
    print(pq.pop())