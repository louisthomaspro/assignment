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

function readMathprogFromFile(tran, filename, skip, datas){
    var str = fs.readFileSync(filename).toString() + "\n" + datas;
		console.log(str);
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

    console.log("obj: " + glpk.glp_mip_obj_val(lp));
    for( var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
        console.log(glpk.glp_get_col_name(lp, i)  + " = " + glpk.glp_mip_col_val(lp, i));
    }
};

mathprog = function (file, datas){
    var lp = glpk.glp_create_prob();
    var tran = glpk.glp_mpl_alloc_wksp();
    glpk._glp_mpl_init_rand(tran, 1);
    readMathprogFromFile(tran, __dirname + "/" + file, false, datas);

    glpk.glp_mpl_generate(tran, null, console.log);
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
    console.log("obj: " + glpk.glp_mip_obj_val(lp));
		var results = [];
    for( var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
		var item = [glpk.glp_mip_col_val(lp, i)];
		results.push(item );
        //console.log(glpk.glp_get_col_name(lp, i)  + " = " + glpk.glp_mip_col_val(lp, i));
    }
		return results;

};

router.post('/',function(req,res,next){
	var datas = req.body.datas;
	require("repl").start("");
	glpk.glp_set_print_func(console.log);
	var f = mathprog("assign.mod", datas);
	res.json(f);
});

module.exports = router;
