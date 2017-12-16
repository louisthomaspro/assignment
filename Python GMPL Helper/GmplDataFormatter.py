
def getGmplData():
	dat={}
	dat['params']=[]
	dat['matrices']=[]
	return dat

def setParameter(gmplData, name, value):
	gmplData['params'].append(['name']=value)
	
#def addMatrixParameter(gmplData,matrix,lineHeaders, columnHeaders):

def getParametersString(gmplData):
	
	return sdata

def writeGmplDataFile(gmplData, filename):
	f=open(filename,'w')
	f.write(gmplData)
	f.close()

g=getGmplData()
setParameter(g,'bj',1)

print g