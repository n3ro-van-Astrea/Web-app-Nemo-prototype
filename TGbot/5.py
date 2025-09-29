# print('x y w z')

# for x in range(0, 2):
#     for y in range(0, 2):
#         for w in range(0, 2):
#             for z in range(0, 2):
#                 if not(((not x) and (not y)) or (y == z) or w):
#                     print(x, y, w, z)



# for n in range(1, 1000):
#     n2 = bin(n)[2:]

#     if n % 2 != 0:
#         n2 += '0'
#     else: 
#          n2 = '1' + n2
    
#     if n2.count('1') % 2 == 0:
#         n2 += '1'
#     else:
#         n2 += '0'

#     R = int(n2, 2)

#     if R > 300: 
#         print(n)
#         break


# 3 ЗАДАЧА

# for n in range(1, 1000):
#     n2 = bin(n)[2:]

#     if n % 2 == 0:
#         n2 = '1' + n2 + '10'
#     else:
#         n2 = '11' + n2 + '0'


#     R = int(n2, 2)

#     if R > 130: 
#         print(R)
#         break


# 4 ЗАДАЧА

# for n in range(1, 1000):
#     n2 = bin(n)[2:]

#     if n % 2 == 0:
#         n2 += bin(n2.count('1'))[2:]
    
#     else:
#         n2 += '1' + n2 + '00'

#     R = int(n2, 2)

#     if R > 401: 
#         print(n)
#         break


#5 ЗАДАЧА

# for n in range(1,1000):
#     n2 = bin(n)[2:]

#     if sum(map(int, str(n))) % 2 != 0:
#         n2 += '1'
#     else:
#         n2 += '0'

#     if sum(map(int, str(int(n2, 2)))) % 2 != 0:
#         n2 += '1'
#     else:
#         n2 += '0'

#     R = int(n2, 2)

#     if R > 1234:
#         print(R)


#6 ЗАДАЧА
for n in range(1, 1000):
    n2 = bin(n)[2:]

    if int(n2, 2) % 3 == 0:
        n2 += n2[-3:]
    else:
        n2 += bin((n % 3) * 3)[2:]

    R = int(n2, 2)
    if R > 99:
        print(n)
        break

#7 ЗАДАЧА

