var express = require('express');
var router = express.Router();

var glpk = require('glpk.js/dist/glpk.min.js');
var fs = require('fs');


function readMathprogFromString(tran, model, skip){
  var str = model;
  var pos = 0;
  glpk.glp_mpl_read_model(tran, null,
    function(){
      if (pos < str.length){
        //console.log(str[pos+1]);
        return str[pos++];
      } else
      return -1;
    },
    skip
  )
}



mathprog = function (model) {
  /* Create the problem */
  var lp = glpk.glp_create_prob();
  /* allocate the MathProg translator workspace */
  var tran = glpk.glp_mpl_alloc_wksp();
  /* read the model (string) */
  readMathprogFromString(tran, model, false);
  /* generate the model */
  glpk.glp_mpl_generate(tran, null, glpk_print);
  /* build LP/MIP problem instance from the model */
  glpk.glp_mpl_build_prob(tran, lp);
  glpk.glp_scale_prob(lp);
  // var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});
  // glpk.glp_simplex(lp, smcp);
  var iocp = new glpk.IOCP({presolve: glpk.GLP_ON});
  glpk.glp_intopt(lp, iocp);
  //console.log("obj: " + glpk.glp_mip_obj_val(lp));
  glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

  var results = [];
  for( var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
    var item = [glpk.glp_mip_col_val(lp, i)];
    results.push(item[0]);
    //console.log(glpk.glp_get_col_name(lp, i)  + " = " + glpk.glp_mip_col_val(lp, i));
  }
  //console.log(results);
  return results;
  //return [results, glpk.glp_mip_obj_val(lp)];

};

function glpk_print(string) {
  //console.log(string);
}

function minPreferenceValue(value) {
  return 'param minPreferenceValue :='+value+';\n';
}

router.post('/',function(req,res,next){
  console.log('Récupération des parametres...');
  var params = JSON.parse(req.body.params);
  var array = JSON.parse(req.body.array);
  var priority = JSON.parse(req.body.priority);

  // Inverted value of wishes (ex : 1 -> 5, 3 -> 2...) preference=nbProjet + 1 - preference
  for (var etu in array) {
    for (var project in array[etu]) {
      array[etu][project] = params.nbProjects + 1 - array[etu][project];
    }
  }

  // Generate text for .dat
  // get params
  console.log('Génération des parametres...');
  var dat = '';
  dat +=
  'param nbStudents :='+params.nbStudents+';\n'+
  'param nbProjects :='+params.nbProjects+ ';\n'+
  'param maxStudentsPerProjects :='+params.maxStudentsPerProjects+ ';\n'+
  'param minStudentsPerProjects :='+params.minStudentsPerProjects+ ';\n'+
  'param ProjectsPerStudents :='+params.ProjectsPerStudents+ ';\n';

  // Generate wish table parameters
  dat += 'param preference : ';
  for (var i=1;i<=params.nbProjects;i++) dat+=i+' ';  // ex : param preference : 1 2 3 4 5 :=
  dat += ':=\n';
  // ex :
  // 1   1 5 3 2 4
  // 2   4 5 1 2 3
  // ...
  for (var etu in array) {
    dat+=parseInt(etu)+1+'   ';
    for (var project in array[etu]) {
      dat+=array[etu][project]+' ';
    }
    dat+="\n";
  }
  dat+=";\n";


  // set priority wishes
  var priority = priority[0]; // ["","","oui","",""]..
  for (var prio in priority) {
    if(priority[prio] === "") {
      priority[prio] = 0;
    } else {
      priority[prio] = 1;
    }
  }
  // transformed in [0,0,1,0,0]..

  // Create params
  dat += 'param mandatoryProjects :=';

  dat+="\n";
  for (var prio in priority) {
    dat+=parseInt(prio)+1+'   ' + priority[prio];
    dat+="\n";
  }

  // for (var prio in priority) dat+= ' ' + priority[prio];
  dat+=";\n";
  // param mandatoryProjects := 1 0 0 1 0;

  var mod_url = __dirname + "/assign.mod";
  var mod = fs.readFileSync(mod_url).toString() + "\n";

  // On va tester
  console.log('Résolution en cours...');
  try {
    // var response;
    // for (var i=params.nbProjects;i>=1;i--) {
    //   console.log(i);
    //   var model = mod+'data;\n'+minPreferenceValue(i)+dat+"end;";
    //   response = mathprog(model);
    //   if (response[1] != 0) { // Le solver a réussi
    //     break;
    //   }
    // }
    var model = mod+'data;\n'+dat+"end;";
    response = mathprog(model);
    console.log(response);
  }
  catch(error) {
    console.log(error);
  }

  //console.log(response);
  // response : [[0],[1],[0],[0],[0],[0],[1],[0],[0],[0],[1],[0],[0],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[1],[0],[1],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[1],[0],[0],[0],[1],[0],[0],[1],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[0],[0],[1],[4],[0]]
  // convert to this type [[1,2],[2,4],[3,1]....]

  var results = [];
  var index=0;
  if (response.length > 0) {
    for (var i=1;i<=params.nbStudents;i++) {
      for (var j=1;j<=params.nbProjects;j++) {
        if (response[index]==1){
          results.push([i,j]);
        }
        index++;
      }
    }
  } else {
    console.error("Error : empty result");
  }
  console.log(results);

  //console.log(results);
  res.json(results);
});

module.exports = router;
