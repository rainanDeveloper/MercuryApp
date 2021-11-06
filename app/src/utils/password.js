
const match = (str, strItems)=>{
	for (let i = 0; i < str.length; i++) {
		if (strItems.indexOf(str.charAt(i)) > -1){
			return true
		}
	}

	return false
}

const passwordStrength = (password)=>{

	if(typeof password !== "string"){
		throw new Error("Password given is invalid!")
	}

	const pools = []

	pools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	pools.push("abcdefghijklmnopqrstuvwxyz")
	pools.push("0123456789")
	pools.push("!@#$%^&*+-/\\?_~{}[]()<>:;`\"\'")	

	var score = 0
	var poolSize = 0

	pools.forEach(pool => {
		if(match(password, pool)){
			poolSize+=pool.length
		}
	});	

	score = Math.log2(Math.pow(poolSize, password.length))

	
	return score

}

export {
	passwordStrength
}