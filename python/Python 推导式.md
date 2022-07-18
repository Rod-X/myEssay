# Python 推导式
列表(list)推导式
字典(dict)推导式
集合(set)推导式
元组(tuple)推导式


## 列表推导式 (相当于for循环)
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


## 字典推导式
```python
{ key_expr: value_expr for value in collection }

# 或

{ key_expr: value_expr for value in collection if condition }

listdemo = ['Google','Runoob', 'Taobao']
# 将列表中各字符串值为键，各字符串的长度为值，组成键值对
>>> newdict = {key:len(key) for key in listdemo}
>>> newdict
{'Google': 6, 'Runoob': 6, 'Taobao': 6}

>>> dic = {x: x**2 for x in (2, 4, 6)}
>>> dic
{2: 4, 4: 16, 6: 36}
>>> type(dic)
<class 'dict'>

```
