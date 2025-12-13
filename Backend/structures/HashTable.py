class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size

    def hash_1(self, key):
        return key % self.size
    
    def hash_2(self, key):
        return 1 + (key % (self.size - 1))
    
    def insert(self, data):
        key = data
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            index = (index + steps) % self.size
            i += 1

            if i > self.size:
                raise Exception("Hash Table is Full")
            
        self.table[index] = data

    def search(self, data):
        index = self.hash_1(data)
        steps = self.hash_2(data)

        i = 0
        while self.table[index] is not None:
            if self.table[index] == data:
                return self.table[index]
            
            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return None
            
    def display(self):
        for i, data in enumerate(self.table):
            if data is None:
                print(f"Index {i}: Empty")
            elif data == -1:
                print(f"Index {i}: Deleted")
            else:
                print(f"Index {i}: {data}")
if __name__ == "__main__":
    table = HashTable()
    table.insert(10)
    table.insert(40)
    table.insert(282)
    table.insert(32)

    table.display()

