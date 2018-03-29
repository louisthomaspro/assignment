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

param nbStudents, integer, > 0;
/* number of students */

param nbProjects, integer, > 0;
/* number of projects */

param maxStudentsPerProjects, integer, >0;

param ProjectsPerStudents, integer, >=0;

set I := 1..nbStudents;
/* set of students */

set J := 1..nbProjects;
/* set of projects */

param preference{i in I ,j in J}, >= 0;
/* cost of allocating project j to student i */

param mandatoryProjects{j in J}, binary, >=0;
/* set of mandatory projects, 1 means mandatory project, 0 optional */

var affectation{i in I, j in J}, binary, >= 0;
/* affectation[i,j] = 1 means projects j is assigned to student i
   note that variables affectation[i,j] are binary, however, there is no need to
   declare them so due to the totally unimodular constraint matrix */


var minPreferenceValue, integer, >=0, <=nbProjects;


s.t. howManyProjectsPerStudents{i in I}: sum{j in J} affectation[i,j] = ProjectsPerStudents;
/* each student can perform at most one project */

s.t. howManyStudentsPerProjectsMax{j in J}: sum{i in I} affectation[i,j] <= maxStudentsPerProjects;
/* each project must be assigned exactly to one student */


s.t. minPreference{i in I}: sum{j in J} affectation[i,j]*preference[i,j] >= minPreferenceValue;


s.t. mandatoryProjectsST{j in J}: mandatoryProjects[j] * (sum{i in I} affectation[i,j]) >= mandatoryProjects[j];

maximize obj:  minPreferenceValue + sum{i in I, j in J} preference[i,j] * affectation[i,j] ;

/* the objective is to find a best solution in term of mean preference and justice*/

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
