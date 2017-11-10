
param maxEtuProj := 2;

param voeuxMinimum := 4;

set etudiants, string;
#Ensemble des etudiants


set projets, string;
#Ensemble des projets


param preferenceProjet{etu in etudiants,proj in projets}, integer, >= 0;
#voeux d'un etudiant pour un projet


var EtuAffecteProj{etu in etudiants, proj in projets}, binary >= 0;
#Variable qui dit si un etudiant est affecté au projet proj
#c'est un nombre soit 0 soit 1


s.t. unProjParEtu{etu in etudiants}: sum{proj in projets} EtuAffecteProj[etu,proj] = 1;
#Contrainte qui dit qu'un etudiant ne doit être affecté qu'a 1 projet.


s.t. maxEtuParProj{proj in projets}: sum{etu in etudiants} EtuAffecteProj[etu,proj] <= maxEtuProj;
#Contrainte qui dit qu'un projet peut avoir au plus n etudiants

maximize objectif: sum{etu in etudiants,proj in projets} EtuAffecteProj[etu,proj]*preferenceProjet[etu,proj] ;
#Maximiser les preferences en globalité

solve;

display EtuAffecteProj;

end;