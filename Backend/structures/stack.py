class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

    def __repr__(self):
        return f"{self.data}"

class Stack:
    def __init__(self):
        self.head = None
        self.size = 0

    def push(self, data):
        self.size += 1
        node = Node(data)
        node.next = self.head
        self.head = node

    def pop(self):
        if self.size == 0:
            return

        data = self.head.data
        self.head = self.head.next

        return data

    def isEmpty(self):
        if self.head is None:
            return True
        return False

    def display(self):
        curr = self.head
        while curr:
            print(curr.data, end=" -> ")
            curr = curr.next

if __name__ == "__main__":
    q = Stack()
    q.push(10)
    q.push(20)
    q.display()