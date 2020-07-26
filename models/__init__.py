import os

for module in os.listdir(os.path.dirname(__file__)):
    if module == "__init__.py" or module == "_connector_.py" or module[:-3] != ".py":
        continue
    mod = __import__(module[:-3], locals(), globals(), fromlist=[module[:-3]])
    getattr(mod, module[:-3])
    del mod

del module
del os