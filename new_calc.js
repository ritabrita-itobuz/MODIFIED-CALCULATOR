
//display when buttons clicked
let display=(inputValue) => {
    document.getElementById('result').value+= inputValue;
}

let clearScreen=()=> {
    document.getElementById('result').value = "";
}

function calculation() {
    let x = document.getElementById('result').value;
    let y = evaluation(x);
    document.getElementById('result').value = evaluation(x);
}
function back(){
    document.getElementById("result").value = document.getElementById("result").value.slice(0,-1);
}

function evaluation(expression) {
    let tokens = expression.split('');

    let digits = [];// for the numbers
    let ops = [];// for the operators

    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] == ' ') {//for whitespace,
            continue;
        }

        // we have to push digits 
        if (tokens[i] >= '0' && tokens[i] <= '9') {
            let sbuf = "";
            while (i < tokens.length &&
                tokens[i] >= '0' &&
                tokens[i] <= '9') {
                sbuf = sbuf + tokens[i++];
            }
            digits.push(parseInt(sbuf, 10));// for taking number in decimal
            // console.log(values);
            i--;
        }
        
        // for brace, we have to push in ops
        else if (tokens[i] == '(') {
            ops.push(tokens[i]);
        }

        // Closing brace encountered,
        // solve entire brace
        else if (tokens[i] == ')') {
            while (ops[ops.length - 1] != '(') {
                digits.push(operation(ops.pop(),
                    digits.pop(),
                    digits.pop()));
            }
            ops.pop();
        }

        // for operators
        else if (tokens[i] == '+' ||
            tokens[i] == '-' ||
            tokens[i] == '*' ||
            tokens[i] == '/' ||
            tokens[i] == '!' ||
            tokens[i] == '^' ||
            tokens[i] == 'l') {

            while (ops.length > 0 &&
                (precedence(tokens[i],
                    ops[ops.length - 1]))) {
                digits.push(operation(ops.pop(),
                    digits.pop(),
                    digits.pop()));
            }
            // Push current token
            ops.push(tokens[i]);
        }
    }

    while (ops.length > 0) {
        if(ops[0] == '!')
        digits.push(operate(ops.pop(),
            digits.pop()));
        // else if (ops[0] == 'l')
        // values.push(operate(ops.pop(),
        // values.pop()));
        else
        digits.push(operation(ops.pop(),
            digits.pop(),
            digits.pop()));
    }
    console.log(ops[0]);

    // Top of 'values' contains
    // result, return it
    return digits.pop();
}
function precedence(op1, op2) {
    if (op2 == '(' || op2 == ')') {
        return false;
    }
    if ((op1 == '*' || op1 == '/') &&
        (op2 == '+' || op2 == '-')) {
        return false;
    }
    else {
        return true;
    }
}

function operation(op, b, a) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) {
                document.getElementById('result').innerHTML="Invalid";
            }
            return parseInt(a / b, 10);
        case '^':
            return pow(a,b);
    }
    return 0;
}
function operate(po, c)
{
    return factorial(c);

}

// function applyOp(operator1,operator2) {
//     if(operator2 == '(' || operator2 == ')'){
//         return false;
//     }
//     if(operator1 == '*' ||)
// }
function factorial(n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
  } 

function percentage(){
    let value = document.getElementById("result").value;
    let y = parseInt(value);
    let z = percentageFunction(y);
    let x = z.toString();
    document.getElementById("result").value = x;

    function percentageFunction(val){
        return val/100;
    }
}
// function percent(c) {
//     return c*c;
// }
function pow(e,f){
 let g=1;
 while(f>=1)
 {
    g= g*e;
    f--;
 }
 return g;
}
