
#file = open('C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/CMPL implementation/DataVoeux.csv','r')

def readPreference(csvFileStr):
	file= open(csvFileStr,'r')
	data=[];
	lines=file.readlines()

	linedata=[];

	for line in lines:

		linedata=line.strip('\r\n').split(',')
		data.append(linedata)
	
	file.close()
	
	return {'preference' : readPreferenceFromData(data), 'students' : readStudentsFromData(data), 'projects':readProjectsFromData(data)}
	
def readPreferenceFromData(csvData):
	#tableau à deux dimension des preferences
	#On supprime juste la 1ere colonne et la 1ere ligne
	#print 'DEBUT CREATION PREFERENCES'
	preferenceLines = csvData[1:len(csvData)]
	preference =[]
	for line in preferenceLines:
	
		for prefColIndex in range(1,len(line)):
			#Conversion en int
			line[prefColIndex]=int(line[prefColIndex])
			
		preference.append(line[1:len(line)])
		
	#print preference
	#print 'FIN CREATION PREFERENCES'
	
	return preference
	
def readStudentsFromData(csvData):
	#liste des etudiants sous forme de String
	#prend la premiere ligne et récupère les
	students = []
	for lineIndex in range(1,len(csvData)):
		#students.append(csvData[lineIndex][0])
		students.append(lineIndex)
	#print students
	return students
	
def readProjectsFromData(csvData):
	#liste des etudiants sous forme de String
	#prend la premiere ligne et récupère les
	#projects = csvData[0][1:len(csvData[0])]
	projects=[]
	for i in range(1, len(csvData[0])):
		projects.append(i)
	
	#print projects
	return projects
	
print readPreference('C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/CMPL implementation/DataVoeux.csv').get('preference')