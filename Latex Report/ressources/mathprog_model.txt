/* Projet DII12 problème d'affectation aux projets étudiants, LOCHE Jérémy, THOMAS Louis*/

/* Ce modèle mathématique est écrit en GNU Mathprog pour le solver linéaire GLPK

	Il permet d'affecter des étudiants à des projets avec un petit jeu de paramètres.
	L'utilisateur peut forcer où non l'affectation de projets dans le cas où plus de projets que d'étudiants sont dispo.
	
	Ce modèle maximise la préférence des étudiants affectés à leur projets aussi maximise une variable servant de borne inférieure aux affectations.
	Ainsi, on recherche la meilleure solution qui maximise à la fois la préférence mais offre une solution dont l'étendue est faible pour ajouter
	cet effet de justice aux affectations.
	
*/

param nbStudents, integer, > 0;
/* number of students */
/* Nombre d'étudiants */

param nbProjects, integer, > 0;
/* number of projects */
/* nombre de projets */

param maxStudentsPerProjects, integer, >0;
/* Maximum number of students per projects */
/* Nombre maxi d'étudiants par projets */

param ProjectsPerStudents, integer, >=0;
/* Nombre de projets par étudiants*/

set I := 1..nbStudents;
/* set of students */
/* ensemble des étudiants*/

set J := 1..nbProjects;
/* set of projects */
/* ensemble des projets */

param preference{i in I ,j in J}, >= 0;
/* cost of allocating project j to student i */

param mandatoryProjects{j in J}, binary, >=0;
/* set of mandatory projects, 1 means mandatory project, 0 optional */
/* Ensemble des projets obligatoires, 1= obligatoirement affecté à au moins 1 étudiant, 0=optionnel*/

var affectation{i in I, j in J}, binary, >= 0;
/* affectation[i,j] = 1 means projects j is assigned to student i
   note that variables affectation[i,j] are binary */
/* Variable de décision des affectation[i,j] = 1 correspond à projet j affecté à l'étudiant i, remarquez qu ces valeurs sont binaires*/


var minPreferenceValue, integer, >=0, <=nbProjects;
/* variable to optimize, represents the lowest preference value used for an assignement, this is to be maximised*/
/* Variable à optimiser, c'est la borne inférieure des préférences utilisés pour une affectation, elle sera maximisée*/

s.t. howManyProjectsPerStudents{i in I}: sum{j in J} affectation[i,j] = ProjectsPerStudents;
/* each student can only perform at most "ProjectsPerStudents" projects*/
/* Chaque étudiant ne peut faire au plus que "ProjectsPerStudents" projets*/

s.t. howManyStudentsPerProjectsMax{j in J}: sum{i in I} affectation[i,j] <= maxStudentsPerProjects;
/* each project must be assigned to at most maxStudentsPerProjects */


s.t. minPreference{i in I}: sum{j in J} affectation[i,j]*preference[i,j] >= minPreferenceValue;
/* each assigned student should be assigned with a preference higher than "minPreferenceValue"*/
/* chaque préférence utilisé pour chaque affectation doit être supérieure ou égale à "minPreferenceValue"*/

s.t. mandatoryProjectsST{j in J}: mandatoryProjects[j] * (sum{i in I} affectation[i,j]) >= mandatoryProjects[j];
/* each mandatory projects if it is one should be assigned to at least 1 student */
/* chque projets obligatoire doit être affecté a au moins un étudiant */

maximize obj:  minPreferenceValue + sum{i in I, j in J} preference[i,j] * affectation[i,j] ;

/* the objective is to find a best solution in term of mean preference and justice*/
/* La fonction objectif cherche la meilleur solution en terme de preference et de justice*/

solve;

printf "\n";
printf "Student\tProject-Number Preference\n";
printf{i in I} "%7d\t%7d\t%10g\n", i, sum{j in J} j * affectation[i,j],
   sum{j in J} preference[i,j] * affectation[i,j];
printf "----------------------------\n";
printf "          Total: %10g\n", sum{i in I, j in J} preference[i,j] * affectation[i,j];
printf "Min  Preference: %10g\n",minPreferenceValue;
printf "Total Objective: %10g\n", obj;
printf "----------------------------\n";
printf "Project\tNb Students\tMandatory\n";
printf {j in J} "%7d\t%7d\t%7d\n" , j, sum{i in I} affectation[i,j],mandatoryProjects[j];
printf "\n";


/* jeu de données exemple*/
data;

param nbStudents :=10;

param nbProjects :=5;

param maxStudentsPerProjects := 2;

param ProjectsPerStudents := 1;

param mandatoryProjects := 
1	1
2	0
3	0
4 	1
5	0
;

param preference : 1 2 3 4 5 :=
		   1   1 5 3 2 4
		   2   1 2 3 5 4
		   3   5 2 3 1 4
		   4   3 4 2 1 5
		   5   2 3 1 4 5
		   6   3 5 4 2 1
		   7   4 2 3 5 1
		   8   2 3 1 4 5
		   9   3 4 5 1 2
		   10  5 1 2 3 4 ;


end;
