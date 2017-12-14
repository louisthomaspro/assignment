var express = require('express');
var router = express.Router();

var glpk = require('glpk.js/dist/glpk.min.js');
var fs = require('fs');


function saveToFile(lp, filename){
    var fd = fs.openSync(filename, 'w');
    if (fd){
        glpk.glp_write_lp(lp, null,
            function(str){
                var buf = new Buffer(str + '\n');
                fs.writeSync(fd, buf, 0, buf.length, null);
            }
        );
        fs.closeSync(fd);
    }
}

function readCplexFromFile(lp, filename){
    var str = fs.readFileSync(filename).toString();
    var pos = 0;
    glpk.glp_read_lp(lp, null,
        function(){
            if (pos < str.length){
                return str[pos++];
            } else
                return -1;
        }
    )
}

function readMathprogFromFile(tran, filename, skip, dat){
    var str = fs.readFileSync(filename).toString() + "\n" + dat;
		//console.log(str);
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


cplex = function(file, datas){
    var lp = glpk.glp_create_prob();
    readCplexFromFile(lp, __dirname + "/" + file);
    var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});
    glpk.glp_simplex(lp, smcp);

    var iocp = new glpk.IOCP({presolve: glpk.GLP_ON});
    glpk.glp_intopt(lp, iocp);

    //console.log("obj: " + glpk.glp_mip_obj_val(lp));
    for( var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
        //console.log(glpk.glp_get_col_name(lp, i)  + " = " + glpk.glp_mip_col_val(lp, i));
    }
};

mathprog = function (file, dat){
    var lp = glpk.glp_create_prob();
    var tran = glpk.glp_mpl_alloc_wksp();
    glpk._glp_mpl_init_rand(tran, 1);
    readMathprogFromFile(tran, __dirname + "/" + file, false, dat);

    glpk.glp_mpl_generate(tran, null, glpk_print);
    /* build the problem instance from the model */
    glpk.glp_mpl_build_prob(tran, lp);

    //saveToFile(lp, __dirname + '/todd.lpt');

    glpk.glp_scale_prob(lp);

    var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});

    glpk.glp_simplex(lp, smcp);

    var iocp = new glpk.IOCP({
        presolve: glpk.GLP_ON,
        cb_func: function(tree){
            if (glpk.glp_ios_reason(tree) == glpk.GLP_IBINGO){
                var objective = glpk.glp_mip_obj_val(glpk.glp_ios_get_prob(tree));
                //console.log("@@@" + objective);

            }
        }
    });

    glpk.glp_intopt(lp, iocp);
    glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);
    //console.log("obj: " + glpk.glp_mip_obj_val(lp));
		var results = [];
    for( var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
		var item = [glpk.glp_mip_col_val(lp, i)];
		results.push(item );
        //console.log(glpk.glp_get_col_name(lp, i)  + " = " + glpk.glp_mip_col_val(lp, i));
    }
		return results;

};

function glpk_print(string) {
	console.log(string);
}

router.post('/',function(req,res,next){
	var params = JSON.parse(req.body.params);
	var array = JSON.parse(req.body.array);
	
	// Inverted value of wishes (ex : 1 -> 5, 3 -> 2...) preference=nbProjet + 1 - wishvalue
	for (var etu in array) {
		for (var project in array[etu]) {
			array[etu][project] = params.nbProjects + 1 - array[etu][project];
		}
	}
	
	// Generate .dat text
  var dat ='data;\n'+
    'param nbStudents :='+params.nbStudents+';\n'+
		'param nbProjects :='+params.nbProjects+ ';\n'+
		'param maxStudentsPerProjects :='+params.maxStudentsPerProjects+ ';\n'+
		'param minStudentsPerProjects :='+params.minStudentsPerProjects+ ';\n'+
		'param ProjectsPerStudents :='+params.ProjectsPerStudents+ ';\n'+
		'param preference : ';
		
	
	for (var i=1;i<=params.nbProjects;i++) dat+=i+' ';  // ex : param preference : 1 2 3 4 5 :=
  dat += ':=\n';
  
  // Generate wish table parameters
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
  dat+=";\nend;";
	
	
	// require("repl").start("");
	// glpk.glp_set_print_func(console.log);
	var response = mathprog("assign.mod", dat);
	
	// response : [[0],[1],[0],[0],[0],[0],[1],[0],[0],[0],[1],[0],[0],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[1],[0],[1],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[1],[0],[0],[0],[1],[0],[0],[1],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[0],[0],[1],[4],[0]]
  // convert to this type [[1,2],[2,4],[3,1]....]
	var results = [];
  var index=0;
	for (var i=1;i<=params.nbStudents;i++) {
    for (var j=1;j<=params.nbProjects;j++) {
      if (response[index]==1){
        results.push([i,j]);
      }
      index++;
    }
  }
	
	res.json(results);
});

module.exports = router;
