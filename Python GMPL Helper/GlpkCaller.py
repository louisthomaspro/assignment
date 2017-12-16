from subprocess import check_output,call
from parseCsv import *
import time


ValeurPrefMin=1



def getDatStr(csvData):
	global ValeurPrefMin

	toWriteStr= "data;\r\n"
	toWriteStr+=formatParam("nbStudents",len(data.get("students")))
	toWriteStr+=formatParam("nbProjects",len(data.get("projects")))
	toWriteStr+=formatParam("maxStudentsPerProjects",1)
	toWriteStr+=formatParam("minStudentsPerProjects",0)
	toWriteStr+=formatParam("ProjectsPerStudents",1)


	preference=data.get('preference')
	students=data.get('students')
	projects=data.get('projects')

	toWriteStr+="param preference:"

	for i in range(0,len(projects)):
		toWriteStr+= str(i+1) + " "

	toWriteStr+= ":=\r\n"

	for stud in range(len(preference)):
		
		prefStud=preference[stud]
		
		toWriteStr+= "        "+str(stud +1)+" "	
		
		for pref in prefStud:
			toWriteStr+= str(pref) + " "
		
		if(stud < (len(preference) -1) ):
			toWriteStr += "\r\n"
		else:
			toWriteStr += ";\r\n"
	
	toWriteStr+="end;\r\n"
	return toWriteStr

def writeDatStr(fileOutStr,data):
	fileOut= open(fileOutStr,'w')

	toWStr=getDatStr(data)

	fileOut.write(toWStr)

	fileOut.close()
	
	
def formatParam(name, value):
	return "param %s:=%d;\r\n" % (name,value)
	
def publishMinPrefValue(fileData2str):
	global ValeurPrefMin
	
	fileData2=open(fileData2str,'w')

	st="data;\r\n"
	st+=formatParam("minPreferenceValue",ValeurPrefMin)
	st+="end;\r\n"

	fileData2.write(st)
	fileData2.close()
	
fileInStr = 'C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/GMPL-AMPL implementation/DataAffectElec.csv'

fileDataStr ='C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/GMPL-AMPL implementation/data.dat'

fileData2str ='C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/GMPL-AMPL implementation/data2.dat'

modelFileStr='C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/GMPL-AMPL implementation/assign_simple.mod'
	
data=readPreference(fileInStr)

#déja ecrit
#writeDatStr(fileDataStr,data)



print "APPEL GLPK"
ValeurPrefMin=len(data.get('projects'))
while ValeurPrefMin >=1:

	publishMinPrefValue(fileData2str)
	
	print check_output('glpsol -m "%s" -d "%s" -d "%s"' % (modelFileStr,fileDataStr,fileData2str))
	call('echo %ERRORLEVEL%')
	time.sleep(10)
	ValeurPrefMin -= 1
	
print "FIN APPEL GLPK"