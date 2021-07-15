

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
	const strCharacters = "!@#$%^&*+-/\\?_~{}[]()<>:;`\"\'"

	var score = 0

	var uppercaseCount = matchCount(password, strUpperCase)
	var lowercaseCount = matchCount(password, strLowerCase)
	var numberCount = matchCount(password, strNumber)
	var charCount = matchCount(password, strCharacters)


	score += Math.log2(strUpperCase.length) * uppercaseCount
	score += Math.log2(strNumber.length) * numberCount
	score += Math.log2(strCharacters.length) * charCount
	score += Math.log2(strLowerCase.length) * lowercaseCount

	return score

}

export {
	passwordStrength
}