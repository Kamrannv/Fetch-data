let state;

 function useState(e){
	state=e;
	let setState = (x)=>{
		state = x
	}
 return setState;
}

export {state, useState};




 