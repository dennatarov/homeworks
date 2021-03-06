#1)Дан массив из словарей 
data = [
    {'name': 'Viktor', 'city': 'Kiev', 'age': 30 },
    {'name': 'Maksim', 'city': 'Dnepr', 'age': 20},
    {'name': 'Vladimir', 'city': 'Lviv', 'age': 32},
    {'name': 'Andrey', 'city': 'Kiev', 'age': 34},
    {'name': 'Artem', 'city': 'Dnepr', 'age': 50},
    {'name': 'Dmitriy', 'city': 'Lviv', 'age': 21}]

#1.1) отсортировать массив из словарей по значению ключа ‘age' 
#1.2) сгруппировать данные по значению ключа 'city' 
# вывод должен быть такого вида :
result = {
   'Kiev': [
      {'name': 'Viktor', 'age': 30 },
      {'name': 'Andrey', 'age': 34}],

   'Dnepr': [ {'name': 'Maksim', 'age': 20 },
              {'name': 'Artem', 'age': 50}],
   'Lviv': [ {'name': 'Vladimir', 'age': 32 },
             {'name': 'Dmitriy', 'age': 21}]
}
# =======================================================
# 2) У вас есть последовательность строк. Необходимо определить наиболее часто встречающуюся строку в последовательности.
# Например:

def most_frequent(list_var):
    #your code is here
    return

most_frequent(['a', 'a', 'bi', 'bi', 'bi']) == 'bi'
# =======================================================
# 3) Дано целое число. Необходимо подсчитать произведение всех цифр в этом числе, за исключением нулей.
# Например:
# Дано число 123405. Результат будет: 1*2*3*4*5=120.

# =======================================================
# 4) Есть массив с положительными числами и число n (def some_function(array, n)).
# Необходимо найти n-ую степень элемента в массиве с индексом n. Если n за границами массива, тогда вернуть -1.

# =======================================================
# 5) Есть строка со словами и числами, разделенными пробелами (один пробел между словами и/или числами).
# Слова состоят только из букв. Вам нужно проверить есть ли в исходной строке три слова подряд.
# Для примера, в строке "hello 1 one two three 15 world" есть три слова подряд.