

set students;

set projects;


param preference{s in students, p in projects}, default 0;


printf {s in students} "somme ref:%10g\n", sum{p in projects} preference[s,p];

end;