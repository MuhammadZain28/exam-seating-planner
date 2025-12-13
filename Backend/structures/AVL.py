from Queue import Queue
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class AVL:
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

        balance = self.getBalance(node)

        if balance > 1 and data < node.left.data:
            return self.right_rotation(node)
        if balance < -1 and data > node.right.data:
            return self.left_rotation(node)
        if balance > 1 and data > node.left.data:
            node.left = self.left_rotation(node.left)
            return self.right_rotation(node)
        if balance < -1 and data < node.right.data:
            node.right = self.right_rotation(node.right)
            return self.left_rotation(node)

        return node

    
    def getHeight(self, node):
        if not node:
            return 0
        return 1 + max(self.getHeight(node.left), self.getHeight(node.right))

    def getBalance(self, node):
        if node is None:
            return 0
        return self.getHeight(node.left) - self.getHeight(node.right)

    def left_rotation(self, x):
        y = x.right
        T2 = y.left
        y.left = x  
        x.right = T2

        return y

    def right_rotation(self, x):
        y = x.left
        T2 = y.right
        y.right = x
        x.left = T2

        return y

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

        balance = self.getBalance(node)

        if balance > 1 and data < node.left.data:
            return self.right_rotation(node)
        if balance < -1 and data > node.right.data:
            return self.left_rotation(node)
        if balance > 1 and data > node.left.data:
            node.left = self.left_rotation(node.left)
            return self.right_rotation(node)
        if balance < -1 and data < node.right.data:
            node.right = self.right_rotation(node.right)
            return self.left_rotation(node)

        return node


    def leaf_nodes(self, node):
        if node is None:
            return
        self.leaf_nodes(node.left)
        if node.left is None and node.right is None:
            print(node.data, end=", ")
        self.leaf_nodes(node.right)

    def levelOrder(self):
        levels = Queue()
        levels.enqueue(self.root)
        while levels.isEmpty():
            for i in range(0, levels.count()):
                node = levels.dequeue()
                print(node.data, end="   ")
                if node.left:
                    levels.enqueue(node.left)
                if node.right:
                    levels.enqueue(node.right)
            print("")




if __name__ == "__main__":
    tree = AVL()
    tree.insert(50)
    tree.insert(40)
    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    tree.insert(60)
    tree.insert(70)
    tree.delete(40)
    tree.leaf_nodes(tree.root)
    print()
    tree.levelOrder()

