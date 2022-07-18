# Python 推导式
列表(list)推导式
字典(dict)推导式
集合(set)推导式
元组(tuple)推导式


## 列表推导式
```python
# [表达式 for 变量 in 列表] 
[out_exp_res for out_exp in input_list]

# 或者 

# [表达式 for 变量 in 列表 if 条件]
[out_exp_res for out_exp in input_list if condition]

>>> names = ['Bob','Tom','alice','Jerry','Wendy','Smith']
>>> new_names = [name.upper()for name in names if len(name)>3]
>>> print(new_names)
['ALICE', 'JERRY', 'WENDY', 'SMITH']

>>> multiples = [i for i in range(30) if i % 3 == 0]
>>> print(multiples)
[0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

```