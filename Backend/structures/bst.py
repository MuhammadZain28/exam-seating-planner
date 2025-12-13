from Queue import Queue
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def __repr__(self):
        return f"{self.data}"

class BST:
    def __init__(self):
        self.root = None

    def insert(self, data):
        self.root = self.insertHelper(self.root, data)

    def insertHelper(self, node, data):
        if node is None:
            return Node(data)

        if node.data > data:
            node.left = self.insertHelper(node.left, data)
        else:
            node.right = self.insertHelper(node.right, data)

        return node

    def delete(self, data):
        self.root = self.deleteHelper(self.root, data)

    def deleteHelper(self, node, data):
        if node is None:
            return None
        elif data < node.data:
            node.left = self.deleteHelper(node.left, data)
        elif data > node.data:
            node.right = self.deleteHelper(node.right, data)
        else:
            if node.left is None or node.right is None:
                return None
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            else:
                curr = node.right
                while curr.left:
                    curr = curr.left
                node.data = curr.data
                node.right = self.deleteHelper(node.right, curr.data)

        return node


    def inorder(self, node):
        if node is None:
            return
        self.inorder(node.left)
        print(node.data, end=" -> ")
        self.inorder(node.right)

    def levelOrder(self):
        levels = Queue()
        levels.enqueue(self.root)
        while levels.isEmpty():
            node = levels.dequeue()
            print(node.data)
            if node.left:
                levels.enqueue(node.left)
            if node.right:
                levels.enqueue(node.right)



if __name__ == "__main__":
    tree = BST()
    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    tree.levelOrder()

