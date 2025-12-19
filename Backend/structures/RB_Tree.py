class Node:
    RED = "red"
    BLACK = "black"
    def __init__(self, key, data, color=RED):
        self.key = key
        self.data = data
        self.color = color  # Node.RED or Node.BLACK
        self.left = None
        self.right = None
        self.parent = None

class RB_Tree:
    def __init__(self):
        self.NIL = Node(key=None, data=None, color=Node.BLACK)
        self.root = self.NIL

    def insert(self, key, data):
        new_node = Node(key, data)
        new_node.left = self.NIL
        new_node.right = self.NIL

        parent = None
        current = self.root

        while current != self.NIL:
            parent = current
            if new_node.key < current.key:
                current = current.left
            else:
                current = current.right

        new_node.parent = parent

        if parent is None:
            self.root = new_node
        elif new_node.key < parent.key:
            parent.left = new_node
        else:
            parent.right = new_node

        new_node.color = Node.RED
        self.fix_insert(new_node)

    def fix_insert(self, node):
        while node != self.root and node.parent.color == Node.RED:
            if node.parent == node.parent.parent.left:
                uncle = node.parent.parent.right
                if uncle.color == Node.RED:
                    node.parent.color = Node.BLACK
                    uncle.color = Node.BLACK
                    node.parent.parent.color = Node.RED
                    node = node.parent.parent
                else:
                    if node == node.parent.right:
                        node = node.parent
                        self.left_rotate(node)
                    node.parent.color = Node.BLACK
                    node.parent.parent.color = Node.RED
                    self.right_rotate(node.parent.parent)
            else:
                uncle = node.parent.parent.left
                if uncle.color == Node.RED:
                    node.parent.color = Node.BLACK
                    uncle.color = Node.BLACK
                    node.parent.parent.color = Node.RED
                    node = node.parent.parent
                else:
                    if node == node.parent.left:
                        node = node.parent
                        self.right_rotate(node)
                    node.parent.color = Node.BLACK
                    node.parent.parent.color = Node.RED
                    self.left_rotate(node.parent.parent)
        self.root.color = Node.BLACK

    def left_rotate(self, x):
        y = x.right
        x.right = y.left
        if y.left != self.NIL:
            y.left.parent = x

        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y

        y.left = x
        x.parent = y
    def right_rotate(self, x):
        y = x.left
        x.left = y.right
        if y.right != self.NIL:
            y.right.parent = x

        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y

        y.right = x
        x.parent = y

    def transplant(self, u, v):
        if u.parent is None:
            self.root = v
        elif u == u.parent.left:
            u.parent.left = v
        else:
            u.parent.right = v
        v.parent = u.parent


    def minimum(self, node):
        while node.left != self.NIL:
            node = node.left
        return node


    def search(self, node, key):
        if node == self.NIL or key == node.key:
            return node
        if key < node.key:
            return self.search(node.left, key)
        return self.search(node.right, key)

    def inorder(self):
        result = []
        self.inorder_helper(self.root, result)
        return result
    def inorder_helper(self, node, result):
        if node != self.NIL:
            self.inorder_helper(node.left, result)
            result.append(node.data)
            self.inorder_helper(node.right, result)
    def delete(self, key):
        z = self.search(self.root, key)
        if z == self.NIL:
            return

        y = z
        y_original_color = y.color

        if z.left == self.NIL:
            x = z.right
            self.transplant(z, z.right)

        elif z.right == self.NIL:
            x = z.left
            self.transplant(z, z.left)

        else:
            y = self.minimum(z.right)
            y_original_color = y.color
            x = y.right

            if y.parent == z:
                x.parent = y
            else:
                self.transplant(y, y.right)
                y.right = z.right
                y.right.parent = y

            self.transplant(z, y)
            y.left = z.left
            y.left.parent = y
            y.color = z.color

        if y_original_color == Node.BLACK:
            self.delete_fix(x)

    def delete_fix(self, x):
        while x != self.root and x.color == Node.BLACK:
            if x == x.parent.left:
                w = x.parent.right

                if w.color == Node.RED:
                    w.color = Node.BLACK
                    x.parent.color = Node.RED
                    self.left_rotate(x.parent)
                    w = x.parent.right

                if w.left.color == Node.BLACK and w.right.color == Node.BLACK:
                    w.color = Node.RED
                    x = x.parent
                else:
                    if w.right.color == Node.BLACK:
                        w.left.color = Node.BLACK
                        w.color = Node.RED
                        self.right_rotate(w)
                        w = x.parent.right

                    w.color = x.parent.color
                    x.parent.color = Node.BLACK
                    w.right.color = Node.BLACK
                    self.left_rotate(x.parent)
                    x = self.root
            else:
                w = x.parent.left

                if w.color == Node.RED:
                    w.color = Node.BLACK
                    x.parent.color = Node.RED
                    self.right_rotate(x.parent)
                    w = x.parent.left

                if w.right.color == Node.BLACK and w.left.color == Node.BLACK:
                    w.color = Node.RED
                    x = x.parent
                else:
                    if w.left.color == Node.BLACK:
                        w.right.color = Node.BLACK
                        w.color = Node.RED
                        self.left_rotate(w)
                        w = x.parent.left

                    w.color = x.parent.color
                    x.parent.color = Node.BLACK
                    w.left.color = Node.BLACK
                    self.right_rotate(x.parent)
                    x = self.root

        x.color = Node.BLACK


if __name__ == "__main__":
    rb_tree = RB_Tree()
    rb_tree.insert(10)
    rb_tree.insert(20)
    rb_tree.insert(15)
    print("Inorder traversal after insertions:", rb_tree.inorder())
    rb_tree.delete(15)
    print("Inorder traversal after deletion of 15:", rb_tree.inorder())