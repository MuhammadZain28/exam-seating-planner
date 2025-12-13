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

if __name__ == "__main__":
    q = Queue()
    q.enqueue(10)
    q.enqueue(20)
    q.dequeue()
    q.display()