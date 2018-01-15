This folder contains JAVA source files to process a model with GLPK.

You can give a .mod file to the software and it will generate CSV files that you need to complete.

Then restart the utility software and the solver will give the solution


How it is composed:

Mathprog model (.mod) reader and parser to generate .csv files to complete
{
Reads a Mathprog model, finds all the parameters that are not initialised and creates a .csv file if it needs to be initialised.
}



CSV to Mathprog DAT file converter
{
Can read a .mod file and associated CSV file to build a .dat file.


Can generate parameters with mathprog syntax

Single integer Mathprog syntax/format: 
-> String.format("param %s :=%d;\r\n", VARIABLE_NAME, VARIABLE_VALUE)

Matrix/Table Mathprog syntax:

out.printf("param %s : ",tableName);
		
		for(int i=1;i<parsedCsv.get(0).size();i++) {
			//out.printf("\"%s\" ",parsedCsv.get(0).get(i));
			out.printf("%d ",i);
		}
		out.println(":=");
		
		for(int i=1;i<parsedCsv.size();i++) {
			
			//out.printf("\t\t   \"%s\"   ",parsedCsv.get(i).get(0));
			out.printf("\t\t   %d   ",i);
			
			for(int j=1;j<parsedCsv.get(i).size();j++) {
				out.printf("%s ",parsedCsv.get(i).get(j));
			}
			
			
			
			if(i==(parsedCsv.size() -1)) {
				out.println(";");
			}
			else{
				out.println();
			}
		}
		
		out.println("end;");
}