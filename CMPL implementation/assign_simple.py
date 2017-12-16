#!/usr/bin/python 

from pyCmpl import *
from parseCsv import *

csvDataFile='C:/Users/JLH/Documents/Cours Apprentissage Polytech/GitRepo/assignment/CMPL implementation/DataVoeux.csv'

try: 
	m = Cmpl("assign_simple.cmpl")
	
	data=readPreference(csvDataFile)
	print data.get("students")
	print data.get("projects")
	print data.get("preference")
	setStudents = CmplSet("students")
	setStudents.setValues(data.get("students"))
	
	setProjects = CmplSet("projects")
	setProjects.setValues(data.get("projects"))
	
	paramPreference = CmplParameter("preference", setStudents,setProjects)
	paramPreference.setValues(data.get("preference"))
		
	paramPrefValue = CmplParameter("minPreferenceValue")
	paramPrefValue.setValues(1)
	
	m.setSets(setStudents,setProjects)
	m.setParameters(paramPrefValue,paramPreference)
	
	m.solve()

	print "Objective value: " , m.solution.value
 	print "Objective status: " , m.solution.status
 	
 	print "Variables:"  		
	for v in m.solution.variables:
		print "%10s %3s %8i %8i %8i" % (v.name, v.type, v.activity,v.lowerBound,v.upperBound  )
	
	print "Constraints:" 
	for c in m.solution.constraints:
		print "%10s %3s %8.0f %8.0f %8.0f" % (c.name, c.type, c.activity,c.lowerBound,c.upperBound)
except CmplException, e:
	print e.msg
	
	