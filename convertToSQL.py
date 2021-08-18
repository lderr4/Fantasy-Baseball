import csv
sql = open("sql.txt", "w")
sql.write('DROP TABLE IF EXISTS batters; \n')

sql.write('CREATE TABLE IF NOT EXISTS batters(')
sql.write('\nname VARCHAR(50),\n team VARCHAR(50),\n position VARCHAR(50),\n age INT,\n gamesPlayed INT,\n atBats INT,\n RunsScored INT,\n Hits INT,\n Doubles INT,\n Triples INT,\n homeRuns INT,\n RBIs INT,\n stolenBases INT,\n caughtStealing INT,\n walks INT,\n strikeouts INT,\n sacBunts INT,\n sacFlies INT,\n hitbypitch INT,\n AVG,\n OBP,\n SLUG,\n OPS);')
sql.write('\n INSERT INTO batters(name, team, position, age, gamesPlayed, atBats, RunsScored, Hits, Doubles, Triples, homeRuns, RBIs, stolenBases, caughtStealing, walks, strikeouts, sacBunts, sacFlies, hitbypitch)\n')
sql.write('\nCREATE TABLE IF NOT EXISTS pitchers(')
sql.write('\nname VARCHAR(50),\n team VARCHAR(50),\n position VARCHAR(50),\n age INT,\n gamesPlayed INT, gamesStarted INT,\n completeGames INT,\n shutouts INT,\n IP INT,\n hits INT,\n earnedRuns INT,\n Ks INT,\n BBs INT,\n HRs INT,\n Ws INT,\n Ls INT,\n SVs INT,\n BSs INT,\n holds INT\n);')

sql.write('VALUES')
with open('batters2019.csv') as file:
    fileReader = csv.reader(file, delimiter=',')
    for row in fileReader:
        sql.write("('%s', '%s', '%s',%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s),\n" % (row[0], row[1], row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],row[13],row[14],row[15],row[16],row[17],row[18],row[19],row[20],row[21],row[22])) 
