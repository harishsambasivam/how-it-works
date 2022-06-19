function payment(){
    throw new Error("Payment Failed");
}


function buy() {
    try{
        payment();
    } catch(err) {
        throw new Error("unable to complete the purchase", { cause: err});
    }
}

console.error(buy());
