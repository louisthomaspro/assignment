/* ASSIGN, Assignment Problem */

/* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

/* The assignment problem is one of the fundamental combinatorial
   optimization problems.

   In its most general form, the problem is as follows:

   There are a number of students and a number of projects. Any student can be
   assigned to perform any project, incurring some cost that may vary
   depending on the student-project assignment. It is required to perform all
   projects by assigning exactly one student to each project in such a way that
   the total cost of the assignment is minimized.

   (From Wikipedia, the free encyclopedia.) */

set students;
/*Students super set, basically the name of the students*/

set projects;
/*Projects super set, basically the name of the projects*/

param maxStudentsPerProjects, integer, >0;

param minStudentsPerProjects, integer, >=0;
/* Not used yet to determine how much students we want per projects*/

param ProjectsPerStudents, integer, >=0;


param nbStudents:=card(students);

param nbProjects:=card(projects);

set I:= students;
/* set of students */

set J:= projects;
/* set of projects */

param preference{i in I ,j in J};
/* cost of allocating project j to student i */

var affectation{i in I, j in J}, binary, >= 0;
/* affectation[i,j] = 1 means projects j is assigned to student i
   note that variables affectation[i,j] are binary, however, there is no need to
   declare them so due to the totally unimodular constraint matrix */
   

var minPreferenceValue, integer, >=0, <=nbProjects;

var minStudentsPP, integer, >=0 , <= nbProjects;
/* Faire au mieux pour eviter que quelqu'un soit seul sur un projet*/
   
s.t. howManyProjectsPerStudents{i in I}: sum{j in J} affectation[i,j] = ProjectsPerStudents;
/* each student can perform at most one project */

s.t. howManyStudentsPerProjectsMax{j in J}: sum{i in I} affectation[i,j] <= maxStudentsPerProjects;
/* each project must be assigned exactly to one student */

#s.t. howManyStudentsPerProjectsMin{j in J}: sum{i in I} affectation[i,j] >= minStudentsPerProjects;

s.t. minPreference{i in I}: sum{j in J} affectation[i,j]*preference[i,j] >= minPreferenceValue;

s.t. howManyStudentsPerProjectsMin{j in J}: sum{i in I} affectation[i,j] >= minStudentsPP;

maximize obj: minPreferenceValue + sum{i in I, j in J} preference[i,j] * affectation[i,j] ;
/* the objective is to find a best solution in term of mean preference and justice*/

solve;

printf "\n";
printf "Student\tProject-Number Students\n";
printf{i in I} "%10s\t%10s\t%10g\n",i,
	{j in J} if affectation[i,j]=1 then i,
   sum{j in J} preference[i,j] * affectation[i,j];
printf "----------------------------\n";
printf "          Total: %10g\n", sum{i in I, j in J} preference[i,j] * affectation[i,j];
printf "Min  Preference: %10g\n",minPreferenceValue;
printf "Total Objective: %10g\n", obj;
printf "----------------------------\n";
printf "Project\tNb Students\n";
printf {j in J} "%10s\t%7d\n" , j, sum{i in I} affectation[i,j];
printf "\n";


data;

set projects := A B C D E;

set students := O P Q R S T U V W X;

param maxStudentsPerProjects := 2;

param minStudentsPerProjects := 0;

param ProjectsPerStudents := 1;

param preference : A B C D E :=
		   O   1 5 3 2 4 
		   P   1 2 3 5 4
		   Q   1 2 3 1 4 
		   R   3 4 2 1 5 
		   S   2 3 1 4 5 
		   T   3 5 4 2 1 
		   U   4 2 3 5 1 
		   V   2 3 1 4 5 
		   W   3 4 5 1 2 
		   X  5 1 2 3 4 ;

end;
