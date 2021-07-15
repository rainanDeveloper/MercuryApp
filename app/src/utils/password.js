

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

	var uppercaseCount = matchCount(password, strUpperCase)
	var lowercaseCount = matchCount(password, strLowerCase)
	var numberCount = matchCount(password, strNumber)
	var charCount = matchCount(password, strCharacters)


	if(uppercaseCount>0){
		score += 32 * Math.pow(2, (-1/uppercaseCount))
	}

	if(numberCount>0){
		score += 32 * Math.pow(2, (-1/numberCount))
	}

	if(charCount>0){
		score += 32 * Math.pow(2, (-1/charCount))
	}

	if(lowercaseCount>0){
		score += 30 * Math.pow(2, (-1/lowercaseCount))
	}

	return score

}

export {
	passwordStrength
}