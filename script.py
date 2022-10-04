print('\t')

codes = {
    #Monothongs

    #unused:
    "e":0.5,

    "i":1,
    "ɪ":2,
    "ʊ":3,
    "u":4,

    "ɛ":5, #bEd

    "ə":6, #teachER
    "ɐ":6,


    "ɜ":7,
    "ɔ":8,
    "æ":9,
    "ʌ":10,
    "ɑ":11,
    "ɒ":12,
    #Diphthongs
    "iə":13,
    "eɪ":14,
 
    "":15, #NEVER USED!!

    "ɔɪ":16,
    "əʊ":17,
    "eə":18,
    "aɪ":19,
    "aʊ":20,
    #Consonants
        #Unvoiced
        "p":21,
        "f":22,
        "t":23,
        "θ":24,
        "tʃ":25,
        "s":26,
        "ʃ":27,
        "k":28,
        #Voiced
        "b":29,
        "v":30,
        "d":31,
        "ð":32,
        "dʒ":33,
        "z":34,
        "ʒ":35,
        "ɡ":36,
        #Misc
        "h":37,
        "m":38,
        "n":39,
        "ŋ":40,

        "ɹ":41,
        "r":41,

        "l":42,
        "w":45,
        "j":46
}

ipaCodes = {}

file = open("en_rp.txt",'r', encoding="utf8")
for line in file:
    x = line.split('\t')
    word, ipa = x[0],x[1]
    ipa = ipa.replace('ˈ','').replace('ː','').replace('/','').replace('\n','').replace('ˌ','').replace('\u200d','')
    ipaCode = []
    i=0
    while i<len(ipa):
        if i<len(ipa)-1 and (ipa[i]+ipa[i+1] in codes):
            ipaCode.append(str(codes[ipa[i]+ipa[i+1]]))
            i+=2
        else:
            ipaCode.append(str(codes[ipa[i]]))
            i+=1
    ipaCodes[word] = ipaCode

file.close()

file = open("wordIPAs","w")
for word in ipaCodes:
    line = "[\""+word+"\","+','.join(ipaCodes[word])+'],\n'
    file.write(line)
file.close()

print("Job done!")

