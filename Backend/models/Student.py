class Student:
    def __init__(self, name, reg):
        self.name = name
        self.reg = reg

    def __repr__(self):
        return f"{self.name} ({self.reg})"