class Node:
    def __init__(self, data):
        self.data = data
        self.next = self.prev = None

class LinkList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def push(self, data):
        node = Node(data)
        if self.head is None:
            self.head = self.tail = node
            self.size += 1
            return
        
        node.next = self.head
        self.head.prev = node
        self.head = node

    def push_back(self, data):
        node = Node(data)
        if self.head is None:
            self.head = self.tail = node
            self.size += 1
            return

        self.tail.next = node
        node.prev = self.tail
        self.tail = node

    def get(self, index):
        node = self.head
        for i in range(0, index):
            if node is None:
                break
            node = node.next

        return node.data
    
    def set(self, index, data):
        node = self.head
        newNode = Node(data)
        for i in range(0, index):
            if node is None:
                break
            node = node.next

        node.data = newNode.data
        
    def display(self):
        node = self.head
        while node:
            print(node.data, end=" -> ")
            node = node.next
        
