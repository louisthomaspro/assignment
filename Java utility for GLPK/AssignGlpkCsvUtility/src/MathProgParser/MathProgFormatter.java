package MathProgParser;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;

public class MathProgFormatter {

	/**
	 * Returns the start string of a .dat file
	 * @return
	 */
	public static String mathProgDataStart() {
		
		return "data;";
	}
	
	/**
	 * Returns the end string of a .dat file
	 * @return
	 */
	public static String mathProgDataEnd() {
		
		return "end;";
	}
	
	/**
	 * Prints the start string of the dat file
	 * @param out
	 */
	public static void printDataStart(PrintStream out){
		
		out.println(mathProgDataStart());
	}
	
	/**
	 * Prints the end string of the dat file
	 * @param out
	 */
	public static void printDataEnd(PrintStream out){
		
		out.println(mathProgDataEnd());
	}
	
	/**
	 * Prints a line using the mathprog syntax to initialize a variable
	 * @param out
	 * @param name
	 * @param value
	 */
	public static void printlnIntegerParam(PrintStream out, String name, int value) {
		
		out.println(formatIntegerParam(name, value));
		
	}
	
	/**
	 * Returns the string using the mathprog syntax to initialize a variable
	 * @param name
	 * @param value
	 * @return
	 */
	public static String formatIntegerParam(String name, int value) {
		
		return String.format("param %s :=%d;",name,value);
		
	}
	
	/**
	 *  Prints a matrix initialization of using the first row and column of "matrix" as headers
	 * @param out
	 * @param matrixName
	 * @param matrix
	 */
	public static void printlnMatrix(PrintStream out,String matrixName,ArrayList<ArrayList<String>> matrix) {
		
		
		out.printf("param %s : ",matrixName);
		
		for(int i=1;i<matrix.get(0).size();i++) {

			out.printf("%d ",i);
		}
		out.println(":=");
		
		for(int i=1;i<matrix.size();i++) {
			
			out.printf("\t\t   %d   ",i);
			
			for(int j=1;j<matrix.get(i).size();j++) {
				out.printf("%s ",matrix.get(i).get(j));
			}
			
			if(i==(matrix.size() -1)) {
				out.println(";");
			}
			else{
				out.println();
			}
		}
		
	}
	
	/**
	 * Returns the string representation in Mathprog of the matrix
	 * @param matrix_name
	 * @param matrix
	 * @return
	 */
	public static String formatMatrixParam(String matrix_name,ArrayList<ArrayList<String>> matrix) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		PrintStream out=new PrintStream(baos);
		printlnMatrix(out, matrix_name, matrix);
		String formattedMtx= baos.toString();
		out.close();
		try {
			baos.close();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		return formattedMtx;
		
	}
	
	/**
	 * Prints the content of paramSetData in mathprog format
	 * @param out: the printstream to print the data on
	 * @param set_name: the name of the variable
	 * @param paramSetData:the arraylist containing the data
	 */
	public static void printlnParamSet(PrintStream out,String set_name, ArrayList<String> paramSetData) {
		
		out.printf("param %s:=",set_name);
		out.println();
		for(int i=0; i<paramSetData.size();i++)
		{
			out.printf("%d\t%s%s",i,paramSetData.get(i),System.lineSeparator());
		}
		out.println(";");
	}
}
