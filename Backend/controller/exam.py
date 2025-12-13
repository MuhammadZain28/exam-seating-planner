class Exams:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size
        self.list = []

    def hash_1(self, key):
        return key % self.size
    
    def hash_2(self, key):
        return 1 + (key % (self.size - 1))
    
    def insert(self, exam):
        key = sum(ord(c) for c in exam.course)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            index = (index + steps) % self.size
            i += 1

            if i > self.size:
                raise Exception("Hash Table is Full")
            
        self.table[index] = exam
        self.list.append(exam)

    def search(self, exam):
        index = self.hash_1(exam.course)
        steps = self.hash_2(exam.course)

        i = 0
        while self.table[index] is not None:
            if self.table[index].course == exam.course:
                return self.table[index]
            
            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return None
            
    def display(self):
        for i, exam in enumerate(self.table):
            if exam is None:
                print(f"Index {i}: Empty")
            elif exam == -1:
                print(f"Index {i}: Deleted")
            else:
                print(f"Index {i}: {exam}")
