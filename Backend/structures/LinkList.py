class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

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
        self.head = node

    def push_back(self, data):
        node = Node(data)
        if self.head is None:
            self.head = self.tail = node
            self.size += 1
            return

        self.tail.next = node
        self.tail = node

    def search(self, key):
        current = self.head
        while current:
            if current.data.course == key:
                return current
            current = current.next
        return None

    def delete(self, key):
        current = self.head
        while current:
            if current.data.course == key:
                if current == self.head:
                    self.head = current.next
                self.size -= 1
                return True
            current = current.next
        return False

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

    def get_list(self):
        node = self.head
        result = []
        while node:
            result.append(node.data.to_dict())
            node = node.next
        return result

    def mergeSort(self, head):
        if head is None or head.next is None:
            return head

        mid = self.getMiddle(head)
        nextToMid = mid.next
        mid.next = None

        left = self.mergeSort(head)
        right = self.mergeSort(nextToMid)
        sortedList = self.merge(left, right)
        return sortedList

    def getMiddle(self, head):
        if head is None:
            return head

        slow = head
        fast = head.next

        while fast is not None:
            fast = fast.next
            if fast is not None:
                slow = slow.next
                fast = fast.next

        return slow

    def merge(self, left, right):
        if left is None:
            return right
        if right is None:
            return left

        if left.data.date < right.data.date:
            list = left
            list.next = self.merge(left.next, right)
        else:
            list = right
            list.next = self.merge(left, right.next)
        return list


if __name__ == "__main__":
    ll = LinkList()
    ll.push_back({"date": "2024-12-01"})
    ll.push_back({"date": "2024-11-01"})
    ll.push_back({"date": "2024-10-01"})
    ll.push_back({"date": "2024-09-01"})

    ll.head = ll.mergeSort(ll.head)
    print("Sorted Linked List:", ll.get_list())