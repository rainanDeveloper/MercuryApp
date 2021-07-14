

const matchCount = (str, strItems)=>{
	var count = 0

	for (let i = 0; i < str.length; i++) {
		if (strItems.indexOf(str.charAt(i)) > -1){
			count++
		}
	}

	return count
}

const passwordStrength = (password)=>{
	const strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const strLowerCase = "abcdefghijklmnopqrstuvwxyz"
	const strNumber = "0123456789"
	const strCharacters = "!@#$%^&*?_~"

	var score = 0

	// Calculates initial score according with password length

	if(password.length==0){
		score = 0
	}
	else if(password.length < 8){
		score += 20
	}
	else if(password.length < 12){
		score += 30
	}
	else if(password.length >= 12){
		score += 40
	}

	var uppercaseCount = matchCount(password, strUpperCase)
	var lowercaseCount = matchCount(password, strLowerCase)
	var numberCount = matchCount(password, strNumber)
	var charCount = matchCount(password, strCharacters)


	if(uppercaseCount>0){
		score += 15
	}

	if(lowercaseCount>0){
		score += 10
	}

	if(numberCount>0){
		score += 15
	}

	if(charCount>0){
		score += 20
	}

	return score

}

export {
	passwordStrength
}