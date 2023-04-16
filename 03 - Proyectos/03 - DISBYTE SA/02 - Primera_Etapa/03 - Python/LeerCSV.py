import csv
with open('03CSV_Normalizado.csv', newline='') as csvfile:
    leercsv = csv.reader(csvfile, delimiter=';', quotechar='|')
    for row in leercsv:
        print(', '.join(row))
