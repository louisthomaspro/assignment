/* ASSIGN, Assignment Problem */

/* Written in GNU MathProg by Andrew Makhorin <mao@gnu.org> */

/* The assignment problem is one of the fundamental combinatorial
   optimization problems.

   In its most general form, the problem is as follows:

   There are a number of agents and a number of tasks. Any agent can be
   assigned to perform any task, incurring some cost that may vary
   depending on the agent-task assignment. It is required to perform all
   tasks by assigning exactly one agent to each task in such a way that
   the total cost of the assignment is minimized.

   (From Wikipedia, the free encyclopedia.) */

param m, integer, > 0;
/* number of agents */

param n, integer, > 0;
/* number of tasks */

set I := 1..m;
/* set of agents */

set J := 1..n;
/* set of tasks */

param c{i in I, j in J}, >= 0;
/* cost of allocating task j to agent i */

var x{i in I, j in J}, >= 0;
/* x[i,j] = 1 means task j is assigned to agent i
   note that variables x[i,j] are binary, however, there is no need to
   declare them so due to the totally unimodular constraint matrix */

s.t. phi{i in I}: sum{j in J} x[i,j] = 1;
/* each agent can perform at most one task */

s.t. psi{j in J}: sum{i in I} x[i,j] <= 2;
/* each task must be assigned exactly to one agent */

maximize obj: sum{i in I, j in J} c[i,j] * x[i,j];
/* the objective is to find a cheapest assignment */

solve;

printf "\n";
printf "Agent  Task       Cost\n";
printf{i in I} "%5d %5d %10g\n", i, sum{j in J} j * x[i,j],
   sum{j in J} c[i,j] * x[i,j];
printf "----------------------\n";
printf "     Total: %10g\n", sum{i in I, j in J} c[i,j] * x[i,j];
printf "\n";

data;

param m := 10;

param n := 5;

param c : 1 2 3 4 5 :=
		   1   1 5 3 2 4 
		   2   4 5 1 2 3 
		   3   5 2 3 1 4 
		   4   3 4 2 1 5 
		   5   2 3 1 4 5 
		   6   3 5 4 2 1 
		   7   4 2 3 5 1 
		   8   2 3 1 4 5 
		   9   3 4 5 1 2 
		   10   5 1 2 3 4 ;

end;
