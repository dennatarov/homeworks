# 1) Get a string from a given string where all occurrences of its
# first char have been changed to '$', except the first char itself.

f_word = "rar123"
f_symb = f_word[0]
f_word = f_symb + f_word[1:].replace(f_symb, "$")

print(f_word)

# 2)Add 'ing' at the end of a given string (length should be at least 3).
# If the given string already ends with 'ing' then add 'ly' instead.
# If the string length of the given string is less than 3, leave it unchanged.

print("Input string")
word_in = input()
#print(word_in[-3:])
if len(word_in) < 3:
    print(word_in)
if word_in[-3:] == "ing":
    word_in = word_in.replace(word_in[-3:],"ly")
    print(word_in)
else:
    print(word_in + "ing")


#print(word_in)