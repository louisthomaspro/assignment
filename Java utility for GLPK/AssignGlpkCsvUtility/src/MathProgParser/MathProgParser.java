package MathProgParser;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

import java.util.regex.Pattern;

import java.util.regex.Matcher;

/**
 * Cette classe lit un fichier .mod dans lequel sont déclaré des parametre mais ne sont pas initialisés
 * L'idee et de retrouver tout les param "nom du param"; dans lequels il n'y a pas de := et de creer un fichier CSV correspondant du type parametre.
 * @author Jeremy
 *
 */
public class MathProgParser {
	
	
	/**
	 * Lire le fichier et retourner son contenu sous forme de String.
	 * @param f
	 * @return
	 * @throws FileNotFoundException
	 */
	public static String readFile(File f) throws FileNotFoundException{
		
		Scanner sc=new Scanner(f);
		String out=readFile(sc);
		sc.close();
		return out;
	}
	
	/**
	 * Lire le scanner et retourner son contenu sous forme de String
	 * @param sc
	 * @return
	 */
	public static String readFile(Scanner sc){
		
		StringBuilder sb=new StringBuilder();
		while(sc.hasNextLine()){
			sb.append(sc.nextLine()).append(System.lineSeparator());
		}
		return sb.toString();
	}
	
	/**
	 * Lit la String et cherche retourne les parametres déclarés
	 * @param mpgString
	 * @return
	 */
	public static ArrayList<Param> parseParams(String mpgString)
	{
		
		//DEBUG
		//System.out.println(mpgString);
		
		
		//Supprimer tout les commentaires 
		//match tout les /* et les */ et enleve tout ce qui est entre
		//Supprime tout les commentaires d'une seule ligne #.*
		// regex: \/\*+[^*/]*\*+\/|#.*
		
		
		//DEBUG
		//long t=System.nanoTime();
		
		mpgString=mpgString.replaceAll("\\/\\*+[^*/]*\\*+\\/|#.*", "");
		
		//861264 ns
		//DEBUG
		//System.out.println(System.nanoTime()-t);
		
		//DEBUG
		//System.out.println(mpgString);
	
		//Trouver les param et récupérer la String allant de param a ; 
		
		Pattern paramPattern= Pattern.compile("param[^;]*;");
		
		java.util.regex.Matcher m = paramPattern.matcher(mpgString) ;  
		  
		 while (m.find()) {
		    System.out.println("groupe = " + m.group()) ;
		}
		
		return null;
	}
	
	
	public static void main(String args[]) throws FileNotFoundException
	{
		parseParams(readFile(new File("assign_aggregation.mod")));
	}
}
